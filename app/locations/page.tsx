import { GET_LOCATIONS } from '@/graphql/locations/queries';
import { initializeApollo } from '@/lib/apolloClient';
import { Container } from '@mui/material';
import LocationsList from './locationsList';

export const dynamic = 'force-dynamic'; // Ensure server-side rendering

interface LocationsPageProps {
    searchParams: {
        page?: string;
    };
}

export default async function LocationsPage({ searchParams }: LocationsPageProps) {
    const page = parseInt(searchParams.page as string || '1', 10);
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GET_LOCATIONS,
        variables: { page, pageSize: 5 },
    });

    const initialApolloState = JSON.parse(JSON.stringify(apolloClient.cache.extract()));

    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            <LocationsList
                initialPage={page}
                initialApolloState={initialApolloState}
            />
        </Container>
    );
}