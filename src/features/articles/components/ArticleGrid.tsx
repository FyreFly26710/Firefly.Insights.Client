import React from 'react';
import { Paper, useTheme } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { PagedArticleDto, ArticleDto } from '@/features/articles/api-types';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
    pagedData: PagedArticleDto | null;
    isLoading?: boolean;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ pagedData, isLoading }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    if (!pagedData?.data) return null;

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
                // overflow: 'hidden',
            }}
        >
            <DataGrid
                rows={pagedData.data}
                columns={columns}
                columnHeaderHeight={0}
                getRowId={(row) => row.articleId}
                loading={isLoading}
                autoHeight
                getRowHeight={() => 'auto'}
                disableColumnMenu
                disableRowSelectionOnClick
                hideFooter
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
