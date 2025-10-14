import {
  Property, RealEstateRepository
} from './real-estate.repository';
import axiosIntance from '../../core/axios-config';
import { injectable } from 'inversify';
import { objectToQueryString } from '@/helpers/object-to-query';

@injectable()
export class RealEstateRepositoryService implements RealEstateRepository {
  async getPropertiesFilter(
    querySearch:Record<string, string>,
  ): Promise<Property[]> {
    const query = objectToQueryString(querySearch);
    const {data} = await axiosIntance.get<Property[]>(`/api/Properties${query}`);

    return data;
  }
}
