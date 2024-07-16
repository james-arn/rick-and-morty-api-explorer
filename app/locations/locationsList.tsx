"use client";

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { LocationsData } from '@/graphql/locations/types';
import { GET_LOCATIONS } from '@/graphql/locations/queries';
import { useApollo } from '@/lib/apolloHelpers';
import DataTable from '@/components/DataTable';

interface LocationsListProps {
    initialPage: number;
    initialApolloState: any;
}

const LocationsList: React.FC<LocationsListProps> = ({ initialPage, initialApolloState }) => {
    const [page, setPage] = useState(initialPage);
    const client = useApollo({ __APOLLO_STATE__: initialApolloState });
    const { data, error, loading } = useQuery<LocationsData>(GET_LOCATIONS, {
        variables: { page },
        client,
        fetchPolicy: 'cache-first',
    });

    if (error) return <p>Error: {error.message}</p>;

    const columns = ['name', 'type', 'dimension', 'actions']
    const columnHeaders: Record<typeof columns[number], string> = {
        name: 'Name',
        type: 'Type',
        dimension: 'Dimension',
        actions: 'Actions'
    };

    const totalEntries = data?.locations.info.count || 0;
    const entriesPerPage = data?.locations.results.length || 0;

    const mappedData = data?.locations.results.map(location => ({
        ...location,
        actions: (
            <Button variant="outlined" color="success">
                View
            </Button>
        )
    })) || [];

    return (
        <div>
            <Box sx={{ paddingBottom: 2 }}>
                <h1>Locations</h1>
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

export default LocationsList;