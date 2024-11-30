import companiesMock from "./data/companies.json";
import shipmentsMock from "./data/shipments.json";
import shipmentDetails1Mock from "./data/shipments_details_1.json";
import shipmentDetails2Mock from "./data/shipments_details_2.json";
import { Company, CompaniesList, ShipmentsList, Shipment } from "./types/types";

const shipmentsAPI = {
  getCompanies: async () => {
    return new Promise<CompaniesList>((resolve) => {
      resolve(companiesMock);
    });
  },
  getCompanyShipments: async (companyId: Company["companyId"]) => {
    const companyShipments = shipmentsMock.filter(
      (shipment) => shipment.partnerCompanyId === companyId
    );

    return new Promise<ShipmentsList>((resolve) => {
      resolve(companyShipments);
    });
  },
  getShipmentDetails: async (shipmentId: Shipment["shipmentId"]) => {
    let extendedShipment = shipmentsMock.find(
      (shipment) => shipment.shipmentId === shipmentId
    );

    const shipmentDetails =
      shipmentDetails1Mock.find(
        (shipment) => shipment.shipmentId === shipmentId
      ) ||
      shipmentDetails2Mock.find(
        (shipment) => shipment.shipmentId === shipmentId
      );

    if (!!extendedShipment) {
      extendedShipment = { ...extendedShipment, ...shipmentDetails };
    }

    return new Promise((resolve, reject) => {
      if (!extendedShipment || !shipmentDetails) {
        reject({ message: "Shipment not found" });
        return;
      }

      resolve(extendedShipment);
    });
  },
};

export default shipmentsAPI;
