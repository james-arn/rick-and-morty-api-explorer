import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;