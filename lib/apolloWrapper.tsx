'use client'

import { ApolloProvider } from '@apollo/client';
import { useApollo } from './apolloHelpers';

export function ApolloWrapper({ children, initialApolloState }: React.PropsWithChildren<{ initialApolloState: any }>) {
    const client = useApollo({ __APOLLO_STATE__: initialApolloState });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}