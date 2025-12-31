import React from 'react';
import {
    Paper,
    Chip,
    Typography
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
} from '@mui/x-data-grid';
import type { CategoryDto } from '@/features/articles/api-types';
import { TableActions } from '../common/TableActions';

interface CategoryTableProps {
    categories: CategoryDto[];
    isLoading: boolean;
    onEdit: (categoryId: number) => void;
    onDelete: (categoryId: number) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
    categories,
    isLoading,
    onEdit,
    onDelete
}) => {

    const columns: GridColDef<CategoryDto>[] = [
        {
            field: 'categoryId',
            headerName: 'ID',
            width: 130,
            sortable: true
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 200,
            sortable: true,
            renderCell: (params) => (
                <Typography variant="body2" fontWeight={500}>
                    {params.value}
                </Typography>
            )
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
            sortable: true
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
                    id={params.row.categoryId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    const handleRowDoubleClick = (params: { row: CategoryDto }) => {
        onEdit(params.row.categoryId);
    };

    return (
        <Paper id="category-table" sx={{ width: '100%', height: '100%', minHeight: 400 }}>
            <DataGrid
                rows={categories}
                columns={columns}
                getRowId={(row) => row.categoryId}
                loading={isLoading}

                // Client-side sorting (no pagination)
                paginationMode="client"
                sortingMode="client"

                // Style & Polish
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                onRowDoubleClick={handleRowDoubleClick}
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                }}
            />
        </Paper>
    );
};
