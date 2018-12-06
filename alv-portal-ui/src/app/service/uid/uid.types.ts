export interface Company {
  name: string;
  additionalName: string;
  chId: string; // e.g. CHE-123.456.789
  uidPrefix: string; // e.g. CHE
  uid: number; // e.g. 123456789
  active: string;
  commercialRegisterEntryDate: string;
  address: CompanyAddress;
  mwst: string; // VAT Nr
  vatEntryStatus: string;
  vatLiquidationDate: string;
  uidPublic: string;
}

export interface CompanyAddress {
  street: string;
  buildingNum: string;
  streetAddOn: string;
  zip: string;
  city: string;
  canton: string;
  country: string;
  communityNumber: string;
}
