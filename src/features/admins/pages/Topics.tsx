import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Internal Imports
import { useTopicsTable } from '../hooks/useTopicsTable';
import { TopicTable } from '../components/topics/TopicTable';
import { TopicFilters } from '../components/topics/TopicFilters';
import { TopicFormDrawer } from '../components/topics/TopicFormDrawer';
import { FormNotification } from '../components/common/FormNotification';
import { DeleteDialog } from '../components/common/DeleteDialog';
import { apiTopicsDelete } from '@/features/articles/api';
import { AdminPageHeader } from '../components/common/AdminPageHeader';

export const Topics = () => {
    // Data Engine Hook (Handles API fetch, pagination, sorting, filtering)
    const {
        topics,
        totalCount,
        isLoading,
        query,
        updateQuery,
        refresh
    } = useTopicsTable();

    // UI State for Dialogs and Drawers
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Delete Dialog State
    const [topicToDelete, setTopicToDelete] = useState<{ id: number; title: string } | null>(null);

    // Notification State
    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Action Handlers
    const handleCreate = () => {
        setSelectedTopicId(null);
        setIsFormOpen(true);
    };

    const handleEdit = (topicId: number) => {
        setSelectedTopicId(topicId);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        notify('Topic saved successfully');
        refresh();
    };

    const handleDeleteClick = (id: number) => {
        const topic = topics.find(t => t.topicId === id);
        if (topic) {
            setTopicToDelete({ id: topic.topicId, title: topic.name });
        }
    };

    const handleDeleteConfirm = async () => {
        if (!topicToDelete) return;

        try {
            await apiTopicsDelete(topicToDelete.id);
            notify('Topic deleted successfully', 'success');
            refresh();
        } catch (error) {
            notify('Failed to delete topic', 'error');
        } finally {
            setTopicToDelete(null);
        }
    };

    const notify = (message: string, severity: 'success' | 'error' = 'success') => {
        setNotification({ open: true, message, severity });
    };

    return (
        <Container id="topics-page" component="main" maxWidth="xl" sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <AdminPageHeader
                title="Topics"
                action={
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                    >
                        New Topic
                    </Button>
                }
            />

            <TopicFilters
                query={query}
                onFilterChange={updateQuery}
            />

            <TopicTable
                topics={topics}
                totalCount={totalCount}
                isLoading={isLoading}
                query={query}
                onQueryChange={updateQuery}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <TopicFormDrawer
                open={isFormOpen}
                topicId={selectedTopicId}
                onClose={() => setIsFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            <DeleteDialog
                open={Boolean(topicToDelete)}
                title={topicToDelete?.title || ''}
                entityLabel="Topic"
                onClose={() => setTopicToDelete(null)}
                onConfirmFn={handleDeleteConfirm}
            />

            <FormNotification
                {...notification}
                onClose={() => setNotification(prev => ({ ...prev, open: false }))}
            />
        </Container>
    );
};