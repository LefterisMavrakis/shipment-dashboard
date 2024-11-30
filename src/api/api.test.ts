import shipmentsAPI from "./api";
import companiesMock from "./data/companies.json";
import shipmentsMock from "./data/shipments.json";
import shipmentDetails1Mock from "./data/shipments_details_1.json";
import shipmentDetails2Mock from "./data/shipments_details_2.json";
import { CompaniesList, ShipmentsList } from "./types/types";

describe("shipmentsAPI", () => {
  describe("getCompanies", () => {
    it("should return the list of companies", async () => {
      const companies: CompaniesList = await shipmentsAPI.getCompanies();
      expect(companies).toEqual(companiesMock);
    });
  });

  describe("getCompanyShipments", () => {
    it("should return shipments for a given companyId", async () => {
      const companyId = companiesMock[0].companyId;
      const expectedShipments = shipmentsMock.filter(
        (shipment) => shipment.partnerCompanyId === companyId
      );

      const shipments: ShipmentsList = await shipmentsAPI.getCompanyShipments(
        companyId
      );
      expect(shipments).toEqual(expectedShipments);
    });

    it("should return an empty array if no shipments match the companyId", async () => {
      const companyId = "nonexistentCompany";
      const shipments: ShipmentsList = await shipmentsAPI.getCompanyShipments(
        companyId
      );
      expect(shipments).toEqual([]);
    });
  });

  describe("getShipmentDetails", () => {
    it("should return extended shipment details for a valid shipmentId", async () => {
      const shipmentId = shipmentsMock[shipmentsMock.length - 1].shipmentId;
      const extendedShipment = shipmentsMock.find(
        (shipment) => shipment.shipmentId === shipmentId
      );

      const shipmentDetails =
        shipmentDetails1Mock.find(
          (shipment) => shipment.shipmentId === shipmentId
        ) ||
        shipmentDetails2Mock.find(
          (shipment) => shipment.shipmentId === shipmentId
        );

      const expectedShipment = { ...extendedShipment, ...shipmentDetails };

      const result = await shipmentsAPI.getShipmentDetails(shipmentId);
      expect(result).toEqual(expectedShipment);
    });

    it("should reject with an error if the shipmentId is not found", async () => {
      const shipmentId = "nonexistentShipment";

      await expect(shipmentsAPI.getShipmentDetails(shipmentId)).rejects.toEqual(
        {
          message: "Shipment not found",
        }
      );
    });
  });
});
