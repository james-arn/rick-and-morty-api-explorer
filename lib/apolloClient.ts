import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

let apolloClient: ApolloClient<any> | null = null;

export function createApolloClient(initialState = {}, headers = {}) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables force-fetching on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_ENDPOINT,
      credentials: 'same-origin',
      headers: headers,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

export function initializeApollo(initialState = {}, headers = {}) {
  const _apolloClient = apolloClient ?? createApolloClient(initialState, headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}