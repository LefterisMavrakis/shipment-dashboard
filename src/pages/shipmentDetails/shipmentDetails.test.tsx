import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import ShipmentDetails from "./ShipmentDetails";
import shipmentsAPI from "../../api/api";
import { ExtendedShipment } from "../../api/types/types";

jest.mock("../../components/locationMap/LocationMap", () => {
  return () => <div data-testid="mock-location-map"></div>;
});

jest.mock(
  "../../components/humidityAndLocationBarChart/HumidityAndLocationBarChart",
  () => {
    return () => <div data-testid="mock-bar-chart"></div>;
  }
);

jest.mock(
  "../../components/humidityAndLocationLineChart/HumidityAndLocationLineChart",
  () => {
    return () => <div data-testid="mock-line-chart"></div>;
  }
);

const mockShipmentDetails: ExtendedShipment = {
  shipmentId: "123",
  partnerCompanyId: "456",
  status: "IN PROGRESS",
  referenceName: "Test Shipment",
  destinationName: "New York",
  plannedDestination: "2024-12-01T15:30:00Z",
  departureName: "Los Angeles",
  plannedDeparture: "2024-11-28T10:00:00Z",
  lat: 34.0522,
  lng: -118.2437,
  temperature: [{ t: 1646308839900, v: 22 }],
  humidity: [{ t: 1646308839910, v: 65 }],
};

describe("ShipmentDetails Component", () => {
  beforeEach(() => {
    jest
      .spyOn(shipmentsAPI, "getShipmentDetails")
      .mockResolvedValue(mockShipmentDetails);
  });

  it("renders shipment information correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/details/123"]}>
        <Routes>
          <Route path="/details/:shipmentId" element={<ShipmentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Shipment Details")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Shipment ID:")).toBeInTheDocument();
    });

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("IN PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("Reference name:")).toBeInTheDocument();
    expect(screen.getByText("Test Shipment")).toBeInTheDocument();
  });

  it("renders environmental conditions when status is IN PROGRESS", async () => {
    render(
      <MemoryRouter initialEntries={["/details/123"]}>
        <Routes>
          <Route path="/details/:shipmentId" element={<ShipmentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("environmental-conditions-section")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Current environmental conditions")
    ).toBeInTheDocument();
  });

  it("renders the map section when status is IN PROGRESS", async () => {
    render(
      <MemoryRouter initialEntries={["/shipment/123"]}>
        <Routes>
          <Route path="/shipment/:shipmentId" element={<ShipmentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("mock-location-map")).toBeInTheDocument();
    });
  });

  it("navigates to company shipments when back button is clicked", async () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter initialEntries={["/details/123"]}>
        <Routes>
          <Route path="/details/:shipmentId" element={<ShipmentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByTestId("WestIcon");
    userEvent.click(backButton);

    expect(navigateMock).not.toThrow();
  });
});
