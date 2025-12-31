import React from 'react';
import {
    Stack,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTopicForm } from '../../hooks/useTopicForm';
import { UpsertDrawer } from '../common/UpsertDrawer';

interface TopicFormDrawerProps {
    open: boolean;
    topicId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const TopicFormDrawer: React.FC<TopicFormDrawerProps> = ({
    open,
    topicId,
    onClose,
    onSuccess
}) => {
    const { form, onSubmit, isLoading, isSubmitting, isEdit } = useTopicForm({
        topicId: topicId,
        onSuccess
    });

    const { register, control, formState: { errors } } = form;

    return (
        <UpsertDrawer
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit Topic' : 'Create New Topic'}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            formId="topic-form"
            submitLabel={isEdit ? 'Update Topic' : 'Create Topic'}
        >
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
        </UpsertDrawer>
    );
};