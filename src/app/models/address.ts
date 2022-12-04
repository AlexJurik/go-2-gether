export interface Address {
  features: AddressFeature[];
}

export interface AddressFeature {
  id: string;
  place_name: string;
  center: [number, number]
}
