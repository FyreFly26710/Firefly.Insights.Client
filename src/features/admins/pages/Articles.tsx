import { useState } from 'react';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Internal Imports
import { useArticlesTable } from '../hooks/useArticlesTable';
import { ArticleTable } from '../components/articles/ArticleTable';
import { ArticleFilters } from '../components/articles/ArticleFilters';
import { ArticleFormDrawer } from '../components/articles/ArticleFormDrawer';
import { FormNotification } from '../components/common/FormNotification';
import { DeleteDialog } from '../components/common/DeleteDialog';
import { articlesApi } from '@/features/articles/api/articlesApi';
import { PageHeader } from '@/components/Header/PageHeader';

export const Articles = () => {
    // Data Engine Hook (Handles API fetch, pagination, sorting, filtering)
    const { articles, totalCount, isLoading, query, updateQuery, refresh } = useArticlesTable();

    // UI State for Dialogs and Drawers
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Delete Dialog State
    const [articleToDelete, setArticleToDelete] = useState<{ id: number; title: string } | null>(null);

    // Notification State
    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Action Handlers
    const handleCreate = () => {
        setSelectedArticleId(null);
        setIsFormOpen(true);
    };

    const handleEdit = (articleId: number) => {
        setSelectedArticleId(articleId);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        notify('Article saved successfully');
        refresh();
    };

    const handleDeleteClick = (id: number) => {
        const article = articles.find((a) => a.articleId === id);
        if (article) {
            setArticleToDelete({ id: article.articleId, title: article.title });
        }
    };
    const handleDeleteConfirm = async () => {
        if (!articleToDelete) return;

        try {
            await articlesApi.delete(articleToDelete.id);
            notify('Article deleted successfully', 'success');
            refresh();
        } catch (error) {
            notify('Failed to delete article', 'error');
        } finally {
            setArticleToDelete(null);
        }
    };

    const notify = (message: string, severity: 'success' | 'error' = 'success') => {
        setNotification({ open: true, message, severity });
    };

    return (
        <Container id="articles-page" component="main" maxWidth="xl" sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <PageHeader
                title="Articles"
                action={
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                    >
                        New Article
                    </Button>
                }
            />

            <ArticleFilters query={query} onFilterChange={updateQuery} />

            <ArticleTable
                articles={articles}
                totalCount={totalCount}
                isLoading={isLoading}
                query={query}
                onQueryChange={updateQuery}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <ArticleFormDrawer open={isFormOpen} articleId={selectedArticleId} onClose={() => setIsFormOpen(false)} onSuccess={handleFormSuccess} />

            <DeleteDialog
                open={Boolean(articleToDelete)}
                title={articleToDelete?.title || ''}
                entityLabel="Article"
                onClose={() => setArticleToDelete(null)}
                onConfirmFn={handleDeleteConfirm}
            />

            <FormNotification {...notification} onClose={() => setNotification((prev) => ({ ...prev, open: false }))} />
        </Container>
    );
};
