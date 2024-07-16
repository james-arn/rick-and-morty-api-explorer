import { GET_LOCATIONS } from '@/graphql/locations/queries';
import { fetchData } from '@/lib/fetchData';

export const fetchLocations = async (page: number) => {
  return fetchData(GET_LOCATIONS, { page });
};