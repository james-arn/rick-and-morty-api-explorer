"use client";

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Skeleton, Box, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CharactersData } from '@/graphql/characters/types';
import { GET_CHARACTERS } from '@/graphql/characters/queries';
import { useApollo } from '@/lib/apolloHelpers';

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

    const totalEntries = data?.characters.info.count || 0;
    const entriesPerPage = data?.characters.results.length || 0;
    const startEntry = (page - 1) * entriesPerPage + 1;
    const endEntry = startEntry + entriesPerPage - 1;

    return (
        <div>
            <Box sx={{ paddingBottom: 2 }}>
                <h1>Characters</h1>
            </Box>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Species</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Origin</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            data?.characters.results.map((character) => (
                                <TableRow key={character.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    <TableCell>{character.name}</TableCell>
                                    <TableCell>{character.species}</TableCell>
                                    <TableCell>{character.origin.name}</TableCell>
                                    <TableCell>{character.location.name}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="success" sx={{ margin: '0 5px' }}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <span>Showing {startEntry} to {endEntry} of {totalEntries} entries</span>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => setPage(page - 1)} disabled={!data?.characters.info.prev} variant="outlined" color="success">
                        Previous
                    </Button>
                    <Button onClick={() => setPage(page + 1)} disabled={!data?.characters.info.next} variant="outlined" color="success">
                        Next
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default CharacterList;