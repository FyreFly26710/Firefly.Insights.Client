import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Container, Alert, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Internal Imports
import { TopicTable } from '../components/TopicTable';
import { TopicFormDrawer } from '../components/TopicFormDrawer';
import { TopicDeleteDialog } from '../components/TopicDeleteDialog';
import type { TopicDto } from '@/features/articles/api-types';
import { apiTopicsDelete } from '@/features/articles/api';
import { useTopicsTable } from '../hooks/useTopicsTable';
import { TopicFilters } from '../components/TopicFilters';

export const Topics = () => {
    // 1. Data Engine Hook (Handles API fetch, pagination, sorting, filtering)
    const {
        topics,
        totalCount,
        isLoading,
        query,
        updateQuery,
        refresh
    } = useTopicsTable();

    // 2. UI State for Dialogs and Drawers
    const [selectedTopic, setSelectedTopic] = useState<TopicDto | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Delete Dialog State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [topicToDelete, setTopicToDelete] = useState<{ id: number; title: string } | null>(null);
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
        setSelectedTopic(null);
        setIsFormOpen(true);
    };

    const handleEdit = (topic: TopicDto) => {
        setSelectedTopic(topic);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setNotification({ open: true, message: 'Topic saved successfully', severity: 'success' });
        refresh(); // Reload table data
    };

    // --- Delete ---
    const handleDeleteClick = (id: number) => {
        const topic = topics.find(a => a.topicId === id);
        if (topic) {
            setTopicToDelete({ id: topic.topicId, title: topic.name });
            setDeleteDialogOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (!topicToDelete) return;

        setIsDeleting(true);
        try {
            await apiTopicsDelete(topicToDelete.id);
            setNotification({
                open: true,
                message: 'Topic deleted successfully',
                severity: 'success'
            });
            setDeleteDialogOpen(false);
            refresh(); // Reload table data
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to delete topic',
                severity: 'error'
            });
        } finally {
            setIsDeleting(false);
            setTopicToDelete(null);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header Section */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" fontWeight={800} color="text.primary">
                        Topics
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                >
                    New Topic
                </Button>
            </Stack>

            {/* 1. Filtering UI */}
            <TopicFilters
                query={query}
                onFilterChange={updateQuery}
            />

            {/* 2. Data Table UI */}
            <TopicTable
                topics={topics}
                totalCount={totalCount}
                isLoading={isLoading}
                query={query}
                onQueryChange={updateQuery}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* 3. Sliding Form Drawer (Create/Edit) */}
            <TopicFormDrawer
                open={isFormOpen}
                topic={selectedTopic}
                onClose={() => setIsFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            {/* 4. Confirmation Dialog (Delete) */}
            <TopicDeleteDialog
                open={deleteDialogOpen}
                title={topicToDelete?.title || ''}
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