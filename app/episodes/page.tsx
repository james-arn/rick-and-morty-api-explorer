import { GET_EPISODES } from '@/graphql/episodes/queries';
import { initializeApollo } from '@/lib/apolloClient';
import { Container } from '@mui/material';
import EpisodeList from './episodesList';

export const dynamic = 'force-dynamic'; // Ensure server-side rendering

interface EpisodesPageProps {
    searchParams: {
        page?: string;
    };
}

export default async function EpisodesPage({ searchParams }: EpisodesPageProps) {
    const page = parseInt(searchParams.page as string || '1', 10);
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GET_EPISODES,
        variables: { page, pageSize: 5 },
    });

    const initialApolloState = JSON.parse(JSON.stringify(apolloClient.cache.extract()));

    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            <EpisodeList
                initialPage={page}
                initialApolloState={initialApolloState}
            />
        </Container>
    );
}