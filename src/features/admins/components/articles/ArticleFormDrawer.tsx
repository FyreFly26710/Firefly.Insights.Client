import React from 'react';
import {
    Stack,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useArticleForm } from '../../hooks/useArticleForm';
import { UpsertDrawer } from '../common/UpsertDrawer';

interface ArticleFormDrawerProps {
    open: boolean;
    articleId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const ArticleFormDrawer: React.FC<ArticleFormDrawerProps> = ({
    open,
    articleId,
    onClose,
    onSuccess
}) => {
    const { form, onSubmit, isLoading, isSubmitting, isEdit } = useArticleForm({
        articleId: articleId,
        onSuccess
    });

    const { register, control, formState: { errors } } = form;

    return (
        <UpsertDrawer
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit Article' : 'Create New Article'}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            formId="article-form"
            submitLabel={isEdit ? 'Update Article' : 'Create Article'}
        >
            <Stack spacing={3} component="form" id="article-form" onSubmit={onSubmit}>

                <TextField
                    label="Article Title"
                    fullWidth
                    {...register('title', { required: 'Title is required' })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />

                <TextField
                    label="Topic ID"
                    fullWidth
                    {...register('topicId', { required: 'Topic is required' })}
                    error={!!errors.topicId}
                    helperText={errors.topicId?.message}
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

                <TextField
                    label="Content"
                    fullWidth
                    multiline
                    rows={8}
                    {...register('content', { required: 'Content is required' })}
                    error={!!errors.content}
                    helperText={errors.content?.message}
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
                                    label="Hide Article"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Controller
                    name="isTopicSummary"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Mark as Topic Summary"
                        />
                    )}
                />
            </Stack>
        </UpsertDrawer>
    );
};