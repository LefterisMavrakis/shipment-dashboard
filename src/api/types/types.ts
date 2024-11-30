/**
 * API types
 */
export type Company = {
  companyId: string;
  name: string;
  registrationNumber: string;
  countryOfIncorporation: string;
  businessType: string;
  addressCountry: string;
  addressStreet: string;
  addressStreetNumber: string;
  addressZipCode: string;
  addressCity: string;
  verifiedDate: string;
  createdAt: string;
};

export type CompaniesList = Company[];

export type Shipment = {
  shipmentId: string;
  partnerCompanyId: Company["companyId"];
  referenceName: string;
  status: string;
  destinationName: string;
  departureName: string;
  plannedDeparture: string;
  plannedDestination: string;
};

export type ShipmentsList = Shipment[];

export type TimestampValuePair = { t: number; v: number | null };

export type ShipmentDetails = {
  shipmentId: string;
  lat: number;
  lng: number;
  temperature: TimestampValuePair[];
  humidity: TimestampValuePair[];
};
