import CharacterList from './characterList';
import { GET_CHARACTERS } from '@/graphql/characters/queries';
import { initializeApollo } from '@/lib/apolloClient';
import { Container } from '@mui/material';

export const dynamic = 'force-dynamic'; // Ensure server-side rendering

interface CharactersPageProps {
    searchParams: {
        page?: string;
    };
}

export default async function CharactersPage({ searchParams }: CharactersPageProps) {
    const page = parseInt(searchParams.page as string || '1', 10);
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GET_CHARACTERS,
        variables: { page, pageSize: 5 },
    });

    const initialApolloState = JSON.parse(JSON.stringify(apolloClient.cache.extract()));

    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            <CharacterList
                initialPage={page}
                initialApolloState={initialApolloState}
            />
        </Container>
    );
}