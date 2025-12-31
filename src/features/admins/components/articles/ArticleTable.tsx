import React from 'react';
import {
    Paper,
    Chip,
    Typography
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridPaginationModel,
    type GridSortModel
} from '@mui/x-data-grid';
import type { ArticleDto, ArticleListRequest } from '@/features/articles/api-types';
import { TableActions } from '../common/TableActions';

interface ArticleTableProps {
    articles: ArticleDto[];
    totalCount: number;
    isLoading: boolean;
    query: ArticleListRequest;
    onQueryChange: (updates: Partial<ArticleListRequest>) => void;
    onEdit: (articleId: number) => void;
    onDelete: (articleId: number) => void;
}

// 1. Column Definitions
export const ArticleTable: React.FC<ArticleTableProps> = ({
    articles,
    totalCount,
    isLoading,
    query,
    onQueryChange,
    onEdit,
    onDelete
}) => {

    // 1. Column Definitions refined for .NET Backend constraints
    const columns: GridColDef<ArticleDto>[] = [
        {
            field: 'articleId',
            headerName: 'ID',
            width: 130,
            sortable: true
        },
        {
            field: 'title',
            headerName: 'Title',
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
            field: 'topicName',
            headerName: 'Topic Name',
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
                <TableActions
                    id={params.row.articleId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
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
        <Paper id="article-table" sx={{ width: '100%', height: '100%', minHeight: 400 }}>
            <DataGrid
                rows={articles}
                columns={columns}
                getRowId={(row) => row.articleId}
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
