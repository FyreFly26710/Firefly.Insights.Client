import React from 'react';
import {
    Paper,
    IconButton,
    Stack,
    Chip,
    Tooltip,
    Typography
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridPaginationModel,
    type GridSortModel
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { TopicDto, TopicListRequest } from '@/features/articles/api-types';

interface TopicTableProps {
    topics: TopicDto[];
    totalCount: number;
    isLoading: boolean;
    query: TopicListRequest;
    onQueryChange: (updates: Partial<TopicListRequest>) => void;
    onEdit: (topic: TopicDto) => void;
    onDelete: (topicId: number) => void;
}

// 1. Column Definitions
export const TopicTable: React.FC<TopicTableProps> = ({
    topics,
    totalCount,
    isLoading,
    query,
    onQueryChange,
    onEdit,
    onDelete
}) => {

    const columns: GridColDef<TopicDto>[] = [
        {
            field: 'topicId',
            headerName: 'ID',
            width: 130,
            sortable: true
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => (
                <Typography variant="body2" fontWeight={500}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'categoryName',
            headerName: 'Category Name',
            width: 150,
            sortable: false
        },
        {
            field: 'isHidden',
            headerName: 'Status',
            width: 120,
            sortable: true,
            renderCell: (params) => (
                <Chip
                    label={params.value ? "Hidden" : "Visible"}
                    color={params.value ? "default" : "success"}
                    size="small"
                    variant="outlined"
                />
            )
        },
        {
            field: 'sortNumber',
            headerName: 'Order',
            type: 'number',
            width: 90,
            sortable: false
        },
        {
            field: 'updatedAt',
            headerName: 'Last Updated',
            width: 160,
            sortable: false,
            valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : ''
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Edit">
                        <IconButton size="small" color="primary" onClick={() => onEdit(params.row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => onDelete(params.row.topicId)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    // 2. Map MUI events back to our custom Hook
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
        <Paper sx={{ width: '100%', height: 'calc(100vh - 300px)', minHeight: 400 }}>
            <DataGrid
                rows={topics}
                columns={columns}
                getRowId={(row) => row.topicId}
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
