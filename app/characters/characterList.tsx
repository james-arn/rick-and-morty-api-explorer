"use client";

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CharactersData } from '@/graphql/characters/types';
import { GET_CHARACTERS } from '@/graphql/characters/queries';
import { useApollo } from '@/lib/apolloHelpers';
import DataTable from '@/components/DataTable';

interface CharacterListProps {
    initialPage: number;
    initialApolloState: any;
}

const CharacterList: React.FC<CharacterListProps> = ({ initialPage, initialApolloState }) => {
    const [page, setPage] = useState(initialPage);
    const client = useApollo({ __APOLLO_STATE__: initialApolloState });
    const { data, error, loading } = useQuery<CharactersData>(GET_CHARACTERS, {
        variables: { page },
        client,
        fetchPolicy: 'cache-first',
    });

    if (error) return <p>Error: {error.message}</p>;

    const columns = ['name', 'species', 'origin.name', 'location.name', 'actions'];
    const columnHeaders: Record<typeof columns[number], string> = {
        name: 'Name',
        species: 'Species',
        'origin.name': 'Origin Name',
        'location.name': 'Location Name',
        actions: 'Actions'
    };

    const totalEntries = data?.characters.info.count || 0;
    const entriesPerPage = data?.characters.results.length || 0;

    const mappedData = data?.characters.results.map(character => ({
        ...character,
        'origin.name': character.origin.name,
        'location.name': character.location.name,
        actions: (
            <Button variant="outlined" color="success">
                View
            </Button>
        )
    })) || [];

    return (
        <div>
            <Box sx={{ paddingBottom: 2 }}>
                <h1>Characters</h1>
            </Box>
            <DataTable
                data={mappedData}
                loading={loading}
                columns={columns}
                columnHeaders={columnHeaders}
                onPageChange={setPage}
                page={page}
                totalEntries={totalEntries}
                entriesPerPage={entriesPerPage}
            />
        </div>
    );
};

export default CharacterList;