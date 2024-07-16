import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Box, Stack, Button, LinearProgress } from '@mui/material';

interface DataTableProps {
    data: any[];
    loading: boolean;
    columns: string[];
    columnHeaders: Record<string, string>;
    onPageChange: (newPage: number) => void;
    page: number;
    totalEntries: number;
    entriesPerPage: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading, columns, columnHeaders, onPageChange, page, totalEntries, entriesPerPage }) => {
    const startEntry = (page - 1) * entriesPerPage + 1;
    const endEntry = Math.min(startEntry + entriesPerPage - 1, totalEntries);

    const renderCellContent = (row: any, column: string) => {
        const keys = column.split('.');
        let value = row;

        keys.forEach(key => {
            value = value[key];
        });

        return value;
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column} sx={{ fontWeight: 'bold' }}>{columnHeaders[column]}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(20)).map((_, index) => (
                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex}><Skeleton /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    {columns.map((column) => (
                                        <TableCell key={column}>{renderCellContent(row, column)}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <div style={{ minWidth: '200px' }}>
                    {loading ? (
                        <LinearProgress color='success' />
                    ) : (
                        <span>Showing {startEntry} to {endEntry} of {totalEntries} entries</span>
                    )}
                </div>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => onPageChange(page - 1)} disabled={page === 1} variant="outlined" color="success">
                        Previous
                    </Button>
                    <Button onClick={() => onPageChange(page + 1)} disabled={endEntry >= totalEntries} variant="outlined" color="success">
                        Next
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default DataTable;