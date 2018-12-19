export interface Address {
  name: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
}

export interface JobCenter {
  id: string;
  code: string;
  email: string;
  phone: string;
  fax: string;
  address: Address;
}
