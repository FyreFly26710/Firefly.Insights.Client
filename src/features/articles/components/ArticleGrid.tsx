import React from 'react';
import { Paper, useTheme, Pagination, Box } from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridPaginationModel,
    useGridApiContext,
    useGridSelector,
    gridPageSelector,
    gridPageCountSelector,
} from '@mui/x-data-grid';
import type { ArticleDto, ArticleListRequest } from '@/features/articles/api-types';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
    articles: ArticleDto[];
    totalCount: number;
    isLoading: boolean;
    query: ArticleListRequest;
    onQueryChange: (updates: Partial<ArticleListRequest>) => void;
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
                color="primary"
                shape="rounded"
                count={pageCount}
                page={page + 1}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        </Box>
    );
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, totalCount, isLoading, query, onQueryChange }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const columns: GridColDef<ArticleDto>[] = [
        {
            field: 'title',
            headerName: 'Articles',
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                const article = params.row;
                return <ArticleCard article={article} />;
            },
        },
    ];

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        onQueryChange({
            pageNumber: model.page + 1, // Convert 0-indexed to 1-indexed
            pageSize: model.pageSize,
        });
    };

    return (
        <Paper
            id="paged-article-grid"
            elevation={0}
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <DataGrid
                rows={articles}
                columns={columns}
                columnHeaderHeight={0}
                getRowId={(row) => row.articleId}
                loading={isLoading}
                autoHeight
                getRowHeight={() => 'auto'}
                disableColumnMenu
                disableRowSelectionOnClick
                // Server-side Logic
                paginationMode="server"
                rowCount={totalCount}
                // State Mapping
                paginationModel={{
                    page: query.pageNumber - 1, // Convert 1-indexed to 0-indexed for MUI
                    pageSize: query.pageSize,
                }}
                onPaginationModelChange={handlePaginationModelChange}
                // Custom Pagination
                slots={{
                    pagination: CustomPagination,
                }}
                sx={{
                    border: 'none',
                    // Header styling
                    '& .MuiDataGrid-columnHeaders': {
                        bgcolor: isLight ? 'grey.50' : 'rgba(255,255,255,0.05)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    },
                    // Cell and Row styling
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        alignItems: 'flex-start',
                        p: 0,
                        '&:focus': { outline: 'none' },
                    },
                    '& .MuiDataGrid-row': {
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            bgcolor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
                        },
                    },
                    // Customizing Scrollbar for Dark Mode
                    '& ::-webkit-scrollbar': { width: '8px' },
                    '& ::-webkit-scrollbar-thumb': {
                        bgcolor: isLight ? '#ccc' : '#444',
                        borderRadius: '4px',
                    },
                }}
            />
        </Paper>
    );
};
