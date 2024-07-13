"use client";

import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import client from '@/lib/apolloClient';
import { GET_CHARACTERS } from '@/graphql/characters/queries';
import { Location } from '@/graphql/locations/types';

interface CharacterListProps {
    initialData: any;
    initialPage: number;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'species', headerName: 'Species', width: 150 },
    { field: 'origin', headerName: 'Origin', width: 150, valueGetter: (origin: Location) => origin.name },
    { field: 'location', headerName: 'Location', width: 150, valueGetter: (location: Location) => location.name },
];

const CharacterList: React.FC<CharacterListProps> = ({ initialData, initialPage }) => {
    const [page, setPage] = useState(initialPage);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await client.query({
                query: GET_CHARACTERS,
                variables: { page },
            });
            setData(data);
        };
        fetchData();
    }, [page]);

    return (
        <div>
            <h1>Characters</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={data.characters.results} columns={columns} />
            </div>
            <Button onClick={() => setPage(page - 1)} disabled={!data.characters.info.prev}>
                Previous
            </Button>
            <Button onClick={() => setPage(page + 1)} disabled={!data.characters.info.next}>
                Next
            </Button>
        </div>
    );
};

export default CharacterList;
