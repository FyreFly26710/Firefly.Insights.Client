import React from 'react';
import { Paper, Tooltip, Chip, Typography, Box } from '@mui/material';
import { DataGrid, type GridColDef, type GridPaginationModel, type GridSortModel, type GridRowParams } from '@mui/x-data-grid';
import type { ExecutionLogDto, ExecutionLogListRequest } from '../api-types';
import Flex from '@/components/Elements/Flex/Flex';
import { format, parseISO } from 'date-fns';
interface ExecutionLogsGridProps {
    executionLogs: ExecutionLogDto[];
    totalCount: number;
    isLoading: boolean;
    query: ExecutionLogListRequest;
    onQueryChange: (updates: Partial<ExecutionLogListRequest>) => void;
    onRowDoubleClick: (log: ExecutionLogDto) => void;
}

export const ExecutionLogsGrid: React.FC<ExecutionLogsGridProps> = ({
    executionLogs,
    totalCount,
    isLoading,
    query,
    onQueryChange,
    onRowDoubleClick,
}) => {
    const columns: GridColDef<ExecutionLogDto>[] = [
        {
            field: 'executionLogId',
            headerName: 'ID',
            width: 110,
            sortable: false,
        },
        {
            field: 'jobLog',
            headerName: 'Job',
            width: 150,
            sortable: false,
            valueGetter: (_value, row) => (row.jobLog ? `Job #${row.jobLog.jobLogId}` : ''),
        },
        {
            field: 'userName',
            headerName: 'User',
            width: 150,
            sortable: false,
            valueGetter: (_value, row) => (row.jobLog ? row.jobLog.userName : ''),
        },
        {
            field: 'aiModel',
            headerName: 'AI Model',
            width: 200,
            sortable: false,
            valueGetter: (_value, row) => (row.jobLog?.aiModel ? `${row.jobLog.aiModel.model}` : 'Not found'),
        },
        {
            field: 'executedAt',
            headerName: 'Executed At',
            width: 180,
            valueFormatter: (value) => (value ? format(parseISO(value), 'MMM d, yyyy HH:mm:ss') : ''),
        },
        {
            field: 'tokens',
            headerName: 'Tokens',
            width: 80,
            sortable: false,
            type: 'number',
            valueGetter: (_value, row) => (row.inputTokens || 0) + (row.outputTokens || 0),
            renderCell: (params) => {
                const { inputTokens = 0, outputTokens = 0, reasoningTokens = 0 } = params.row;
                const totalTokens = inputTokens + outputTokens;

                return (
                    <Tooltip
                        arrow
                        title={
                            <Flex direction="column" gap={1} padding="2px">
                                <Typography variant="caption">Input: {inputTokens}</Typography>
                                <Typography variant="caption">Output: {outputTokens}</Typography>
                                <Typography variant="caption">Reasoning: {reasoningTokens}</Typography>
                            </Flex>
                        }
                    >
                        <Box component="span">{totalTokens}</Box>
                    </Tooltip>
                );
            },
        },
        {
            field: 'cost',
            headerName: 'Cost',
            width: 100,
            sortable: false,
            type: 'number',
            valueFormatter: (value) => (value ? `$${(value as number).toFixed(4)}` : '$0.0000'),
        },
        {
            field: 'durationSeconds',
            headerName: 'Duration (s)',
            width: 120,
            type: 'number',
            sortable: false,
        },
        {
            field: 'isSuccessful',
            headerName: 'Status',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const errorMessage = params.row.errorMessage;
                const isSuccessful = params.value;
                const label = isSuccessful ? 'Success' : 'Failed';

                const chip = <Chip label={label} color={isSuccessful ? 'success' : 'default'} size="small" variant="outlined" />;

                if (!isSuccessful && errorMessage) {
                    return (
                        <Tooltip title={errorMessage} arrow>
                            {chip}
                        </Tooltip>
                    );
                }

                return chip;
            },
        },
    ];

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        onQueryChange({
            pageNumber: model.page + 1, // Convert 0-indexed to 1-indexed
            pageSize: model.pageSize,
        });
    };

    const handleRowDoubleClick = (params: GridRowParams<ExecutionLogDto>) => {
        onRowDoubleClick(params.row);
    };

    return (
        <Paper id="execution-logs-grid" sx={{ width: '100%', height: '100%', minHeight: 400 }}>
            <DataGrid
                rows={executionLogs}
                columns={columns}
                getRowId={(row) => row.executionLogId}
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
                onRowDoubleClick={handleRowDoubleClick}
                // Style & Polish
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                    '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
                }}
            />
        </Paper>
    );
};
