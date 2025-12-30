import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    Stack,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
    Divider,
    CircularProgress,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Controller } from 'react-hook-form';
import { useTopicForm } from '../hooks/useTopicForm';
import type { TopicDto } from '@/features/articles/api-types';

interface TopicFormDrawerProps {
    open: boolean;
    topic: TopicDto | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const TopicFormDrawer: React.FC<TopicFormDrawerProps> = ({
    open,
    topic,
    onClose,
    onSuccess
}) => {
    const { form, onSubmit, isLoading, isSubmitting, isEdit } = useTopicForm({
        topicId: topic?.topicId,
        onSuccess
    });

    const { register, control, formState: { errors } } = form;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: { xs: '100%', sm: 560 } } }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                {/* Header */}
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight={700}>
                        {isEdit ? 'Edit Topic' : 'Create New Topic'}
                    </Typography>
                    <IconButton onClick={onClose} edge="end">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider />

                {/* Content Area */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Stack spacing={3} component="form" id="topic-form" onSubmit={onSubmit}>

                            <TextField
                                label="Topic Title"
                                fullWidth
                                {...register('name', { required: 'Name is required' })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />

                            <TextField
                                label="Category ID"
                                fullWidth
                                {...register('categoryId', { required: 'Category is required' })}
                                error={!!errors.categoryId}
                                helperText={errors.categoryId?.message}
                            />

                            <TextField
                                label="Image URL"
                                fullWidth
                                {...register('imageUrl')}
                                placeholder="https://example.com/image.jpg"
                            />

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={2}
                                {...register('description')}
                            />

                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <TextField
                                        label="Sort Order"
                                        type="number"
                                        fullWidth
                                        {...register('sortNumber', { valueAsNumber: true })}
                                    />
                                </Grid>
                                <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Controller
                                        name="isHidden"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={<Checkbox {...field} checked={!!field.value} />}
                                                label="Hide Topic"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    )}
                </Box>

                <Divider />

                {/* Action Footer */}
                <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            form="topic-form"
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                            disabled={isSubmitting || isLoading}
                        >
                            {isEdit ? 'Update Topic' : 'Create Topic'}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};