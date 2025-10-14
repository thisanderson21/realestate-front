
export interface Property {
  _id: string;
  idOwner: string;
  name: string;
  addressProperty: string;
  image: string | null;
  priceProperty: number;
}


export interface RealEstateRepository {
  getPropertiesFilter(queryParams:Record<string, string | number>): Promise<Property[]>;
}
