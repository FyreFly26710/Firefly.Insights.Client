import React from 'react';
import {
    Paper,
    Alert
} from '@mui/material';
import {
    DataGrid,
    type GridColDef
} from '@mui/x-data-grid';
import type { AiModelDto } from '../api-types';
import { StatusChip } from '@/components/Tags/StatusChip';

interface AiModelsGridProps {
    models: AiModelDto[];
    isLoading: boolean;
    error: Error | null;
}

export const AiModelsGrid: React.FC<AiModelsGridProps> = ({
    models,
    isLoading,
    error
}) => {
    const columns: GridColDef<AiModelDto>[] = [
        {
            field: 'aiModelId',
            headerName: 'ID',
            width: 100,
            sortable: false
        },
        {
            field: 'provider',
            headerName: 'Provider',
            width: 120,
            sortable: false
        },
        {
            field: 'model',
            headerName: 'Model',
            flex: 1,
            minWidth: 200,
            sortable: false
        },
        {
            field: 'modelId',
            headerName: 'Model ID',
            width: 300,
            sortable: false
        },
        {
            field: 'inputPrice',
            headerName: 'Input Price',
            width: 120,
            sortable: false,
            type: 'number',
            valueFormatter: (value) => value ? `$${(value as number).toFixed(2)}` : '$0.00'
        },
        {
            field: 'outputPrice',
            headerName: 'Output Price',
            width: 120,
            sortable: false,
            type: 'number',
            valueFormatter: (value) => value ? `$${(value as number).toFixed(2)}` : '$0.00'
        },
        {
            field: 'isActive',
            headerName: 'Status',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <StatusChip
                    value={params.value}
                    trueLabel="Active"
                    falseLabel="Inactive"
                />
            )
        }
    ];

    if (error) {
        return (
            <Paper sx={{ p: 3 }}>
                <Alert severity="error">
                    Failed to load AI models: {error.message}
                </Alert>
            </Paper>
        );
    }

    return (
        <Paper id="ai-models-grid" sx={{ width: '100%', height: '100%', minHeight: 400 }}>
            <DataGrid
                rows={models}
                columns={columns}
                getRowId={(row) => row.aiModelId}
                loading={isLoading}

                // Client-side pagination (since server doesn't support it)
                paginationMode="client"
                sortingMode="client"

                // Style & Polish
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 25 }
                    }
                }}
            />
        </Paper>
    );
};
