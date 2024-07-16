import { DocumentNode } from '@apollo/client';
import { addApolloState } from './apolloHelpers';
import { initializeApollo } from './apolloClient';

export const fetchData = async (query: DocumentNode, variables: Record<string, any>, context = undefined) => {
  const client = initializeApollo();
  await client.query({
    query,
    variables,
  });

  const documentProps = addApolloState(client, {
    props: {},
  });

  // Will be passed to the page component as props
  return { props: documentProps.props };
};

