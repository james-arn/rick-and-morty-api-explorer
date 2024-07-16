import { GET_CHARACTERS } from '@/graphql/characters/queries';
import { fetchData } from '@/lib/fetchData';

export const fetchCharacters = async (page: number) => {
  const { props } = await fetchData(GET_CHARACTERS, { page });
  return props.__APOLLO_STATE__;
};