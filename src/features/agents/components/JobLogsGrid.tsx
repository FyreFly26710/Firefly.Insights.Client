import React from 'react';
import { Chip, Paper, Typography } from '@mui/material';
import { DataGrid, type GridColDef, type GridPaginationModel, type GridSortModel } from '@mui/x-data-grid';
import type { JobLogDto, JobLogListRequest } from '../api-types';
import { StatusChip } from '@/components/Tags/StatusChip';
import { format, parseISO } from 'date-fns';
interface JobLogsGridProps {
    jobLogs: JobLogDto[];
    totalCount: number;
    isLoading: boolean;
    query: JobLogListRequest;
    onQueryChange: (updates: Partial<JobLogListRequest>) => void;
}

export const JobLogsGrid: React.FC<JobLogsGridProps> = ({ jobLogs, totalCount, isLoading, query, onQueryChange }) => {
    const columns: GridColDef<JobLogDto>[] = [
        {
            field: 'jobLogId',
            headerName: 'ID',
            width: 110,
            sortable: false,
        },
        {
            field: 'userName',
            headerName: 'User',
            width: 150,
            sortable: false,
        },
        {
            field: 'jobType',
            headerName: 'Job Type',
            width: 250,
            sortable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                // <Chip label={params.value} size="small" variant="outline/d" />
                <StatusChip value={params.value === 'Completed'} trueLabel="Completed" falseLabel={params.value} />
            ),
        },
        {
            field: 'aiModel',
            headerName: 'AI Model',
            width: 200,
            sortable: false,
            valueGetter: (_, row) => (row.aiModel ? `${row.aiModel.model}` : 'Not found'),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 180,
            sortable: false,
            valueFormatter: (value) => (value ? format(parseISO(value), 'MMM d, yyyy HH:mm:ss') : ''),
        },
        {
            field: 'startedAt',
            headerName: 'Started At',
            width: 180,
            sortable: false,
            valueFormatter: (value) => (value ? format(parseISO(value), 'MMM d, yyyy HH:mm:ss') : ''),
        },
        {
            field: 'completedAt',
            headerName: 'Completed At',
            width: 180,
            sortable: false,
            valueFormatter: (value) => (value ? format(parseISO(value), 'MMM d, yyyy HH:mm:ss') : ''),
        },
    ];

    // Map MUI events back to our custom Hook
    const handlePaginationModelChange = (model: GridPaginationModel) => {
        onQueryChange({
            pageNumber: model.page + 1, // Convert 0-indexed to 1-indexed
            pageSize: model.pageSize,
        });
    };

    const handleSortModelChange = (model: GridSortModel) => {
        if (model.length > 0) {
            onQueryChange({
                sortField: model[0].field,
                isAscending: model[0].sort === 'asc',
            });
        }
    };

    return (
        <Paper id="job-logs-grid" sx={{ width: '100%', height: '100%', minHeight: 400 }}>
            <DataGrid
                rows={jobLogs}
                columns={columns}
                getRowId={(row) => row.jobLogId}
                loading={isLoading}
                // Server-side Logic
                paginationMode="server"
                sortingMode="server"
                rowCount={totalCount}
                // State Mapping
                paginationModel={{
                    page: query.pageNumber - 1, // Convert 1-indexed to 0-indexed for MUI
                    pageSize: query.pageSize,
                }}
                onPaginationModelChange={handlePaginationModelChange}
                onSortModelChange={handleSortModelChange}
                // Style & Polish
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                }}
            />
        </Paper>
    );
};
