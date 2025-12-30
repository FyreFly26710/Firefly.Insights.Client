import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Container, Alert, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Internal Imports
import { useArticlesTable } from '../hooks/useArticlesTable';
import { ArticleTable } from '../components/ArticleTable';
import { ArticleFilters } from '../components/ArticleFilters';
import { ArticleFormDrawer } from '../components/ArticleFormDrawer';
import { ArticleDeleteDialog } from '../components/ArticleDeleteDialog'; // Added
import type { ArticleDto } from '../types';
import { apiArticlesDelete } from '../api/articleApi';

export const Articles = () => {
    // 1. Data Engine Hook (Handles API fetch, pagination, sorting, filtering)
    const {
        articles,
        totalCount,
        isLoading,
        query,
        updateQuery,
        refresh
    } = useArticlesTable();

    // 2. UI State for Dialogs and Drawers
    const [selectedArticle, setSelectedArticle] = useState<ArticleDto | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Delete Dialog State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<{ id: number; title: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Notification State
    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // 3. Action Handlers

    // --- Create/Edit ---
    const handleCreate = () => {
        setSelectedArticle(null);
        setIsFormOpen(true);
    };

    const handleEdit = (article: ArticleDto) => {
        setSelectedArticle(article);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setNotification({ open: true, message: 'Article saved successfully', severity: 'success' });
        refresh(); // Reload table data
    };

    // --- Delete ---
    const handleDeleteClick = (id: number) => {
        const article = articles.find(a => a.articleId === id);
        if (article) {
            setArticleToDelete({ id: article.articleId, title: article.title });
            setDeleteDialogOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (!articleToDelete) return;

        setIsDeleting(true);
        try {
            await apiArticlesDelete(articleToDelete.id);
            setNotification({
                open: true,
                message: 'Article deleted successfully',
                severity: 'success'
            });
            setDeleteDialogOpen(false);
            refresh(); // Reload table data
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to delete article',
                severity: 'error'
            });
        } finally {
            setIsDeleting(false);
            setArticleToDelete(null);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header Section */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" fontWeight={800} color="text.primary">
                        Articles
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your content, summaries, and visibility.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                >
                    New Article
                </Button>
            </Stack>

            {/* 1. Filtering UI */}
            <ArticleFilters
                query={query}
                onFilterChange={updateQuery}
            />

            {/* 2. Data Table UI */}
            <ArticleTable
                articles={articles}
                totalCount={totalCount}
                isLoading={isLoading}
                query={query}
                onQueryChange={updateQuery}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* 3. Sliding Form Drawer (Create/Edit) */}
            <ArticleFormDrawer
                open={isFormOpen}
                article={selectedArticle}
                onClose={() => setIsFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            {/* 4. Confirmation Dialog (Delete) */}
            <ArticleDeleteDialog
                open={deleteDialogOpen}
                title={articleToDelete?.title || ''}
                isLoading={isDeleting}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            {/* 5. Feedback Notifications */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={() => setNotification({ ...notification, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setNotification({ ...notification, open: false })}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};