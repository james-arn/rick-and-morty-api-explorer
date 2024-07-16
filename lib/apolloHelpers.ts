import { ApolloClient } from '@apollo/client';
import { initializeApollo } from './apolloClient';

// Add the cached content to the component properties. Next.js 
export function addApolloState(client: ApolloClient<any>, pageProps: any) {

    pageProps.props.__APOLLO_STATE__ = client.extract();
    
  return pageProps;
}

// Access the client through a hook called useApollo that’s purpose is to return the same instance 
// of apollo client if it was already created. 
// The hook takes component props with the cache inside as an argument.
export function useApollo(pageProps: any) {
  const state = pageProps.__APOLLO_STATE__;

  const store = initializeApollo(state);
  return store;
}