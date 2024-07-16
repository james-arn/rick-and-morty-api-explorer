"use client";

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { EpisodesData } from '@/graphql/episodes/types';
import { GET_EPISODES } from '@/graphql/episodes/queries';
import { useApollo } from '@/lib/apolloHelpers';
import DataTable from '@/components/DataTable';

interface EpisodeListProps {
    initialPage: number;
    initialApolloState: any;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ initialPage, initialApolloState }) => {
    const [page, setPage] = useState(initialPage);
    const client = useApollo({ __APOLLO_STATE__: initialApolloState });
    const { data, error, loading } = useQuery<EpisodesData>(GET_EPISODES, {
        variables: { page },
        client,
        fetchPolicy: 'cache-first',
    });

    if (error) return <p>Error: {error.message}</p>;

    const columns = ['name', 'air_date', 'episode', 'actions'];
    const columnHeaders: Record<typeof columns[number], string> = {
        name: 'Name',
        air_date: 'Air Date',
        episode: 'Episode',
        actions: 'Actions'
    };

    const totalEntries = data?.episodes.info.count || 0;
    const entriesPerPage = data?.episodes.results.length || 0;

    const mappedData = data?.episodes.results.map(episode => ({
        ...episode,
        actions: (
            <Button variant="outlined" color="success">
                View
            </Button>
        )
    })) || [];

    return (
        <div>
            <Box sx={{ paddingBottom: 2 }}>
                <h1>Episodes</h1>
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

export default EpisodeList;