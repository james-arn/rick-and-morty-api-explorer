"use client";

import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { HttpLink } from "@apollo/client";

function makeClient() {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_ENDPOINT,
            fetchOptions: { cache: "no-store" },
        }),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren<{}>) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
