import { useState, useMemo } from 'react';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Internal Imports
import { useCategoriesTable } from '../hooks/useCategoriesTable';
import { CategoryTable } from '../components/categories/CategoryTable';
import { CategoryFilters } from '../components/categories/CategoryFilters';
import { CategoryFormDrawer } from '../components/categories/CategoryFormDrawer';
import { FormNotification } from '../components/common/FormNotification';
import { DeleteDialog } from '../components/common/DeleteDialog';
import { apiCategoriesDelete } from '@/features/articles/api';
import { PageHeader } from '@/components/Header/PageHeader';

export const Categories = () => {
    // Data Engine Hook (Handles API fetch)
    const {
        categories,
        isLoading,
        refresh
    } = useCategoriesTable();

    // Filter state
    const [categoryName, setCategoryName] = useState<string>('');
    const [isHidden, setIsHidden] = useState<boolean | undefined>(undefined);

    // Filtered categories
    const filteredCategories = useMemo(() => {
        return categories.filter(category => {
            const matchesName = !categoryName || category.name.toLowerCase().includes(categoryName.toLowerCase());
            const matchesHidden = isHidden === undefined || category.isHidden === isHidden;
            return matchesName && matchesHidden;
        });
    }, [categories, categoryName, isHidden]);

    // UI State for Dialogs and Drawers
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Delete Dialog State
    const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; title: string } | null>(null);

    // Notification State
    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Action Handlers
    const handleCreate = () => {
        setSelectedCategoryId(null);
        setIsFormOpen(true);
    };

    const handleEdit = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        notify('Category saved successfully');
        refresh();
    };

    const handleDeleteClick = (id: number) => {
        const category = categories.find(c => c.categoryId === id);
        if (category) {
            setCategoryToDelete({ id: category.categoryId, title: category.name });
        }
    };

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete) return;

        try {
            await apiCategoriesDelete(categoryToDelete.id);
            notify('Category deleted successfully', 'success');
            refresh();
        } catch (error) {
            notify('Failed to delete category', 'error');
        } finally {
            setCategoryToDelete(null);
        }
    };

    const handleFilterChange = (updates: { categoryName?: string; isHidden?: boolean }) => {
        if (updates.categoryName !== undefined) {
            setCategoryName(updates.categoryName);
        }
        if (updates.isHidden !== undefined) {
            setIsHidden(updates.isHidden);
        }
    };

    const notify = (message: string, severity: 'success' | 'error' = 'success') => {
        setNotification({ open: true, message, severity });
    };

    return (
        <Container id="categories-page" component="main" maxWidth="xl" sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <PageHeader
                title="Categories"
                action={
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                    >
                        New Category
                    </Button>
                }
            />

            <CategoryFilters
                categoryName={categoryName}
                isHidden={isHidden}
                onFilterChange={handleFilterChange}
            />

            <CategoryTable
                categories={filteredCategories}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <CategoryFormDrawer
                open={isFormOpen}
                categoryId={selectedCategoryId}
                onClose={() => setIsFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            <DeleteDialog
                open={Boolean(categoryToDelete)}
                title={categoryToDelete?.title || ''}
                entityLabel="Category"
                onClose={() => setCategoryToDelete(null)}
                onConfirmFn={handleDeleteConfirm}
            />

            <FormNotification
                {...notification}
                onClose={() => setNotification(prev => ({ ...prev, open: false }))}
            />
        </Container>
    );
};
