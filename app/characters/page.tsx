import client from '@/lib/apolloClient';
import CharacterList from './characterList';
import { GET_CHARACTERS } from '@/graphql/characters/queries';

export const dynamic = 'force-dynamic'; // Ensure server-side rendering

interface CharactersPageProps {
    searchParams: {
        page?: string;
    };
}

async function fetchPageData(page: number) {
    const { data } = await client.query({
        query: GET_CHARACTERS,
        variables: { page },
    });
    return data;
}

export default async function CharactersPage({ searchParams }: CharactersPageProps) {
    const page = parseInt(searchParams.page as string || '1', 10);
    const initialData = await fetchPageData(page);

    return (
        <CharacterList
            initialData={initialData}
            initialPage={page}
        />
    );
}