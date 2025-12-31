import React from 'react';
import {
    Stack,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    MenuItem
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useArticleForm } from '../../hooks/useArticleForm';
import { UpsertDrawer } from '../common/UpsertDrawer';
import Flex from '@/components/Elements/Flex/Flex';

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
    const { form, onSubmit, isLoading, isSubmitting, isEdit, topics, isLoadingTopics } = useArticleForm({
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
            width={560}
        >
            <Stack spacing={3} component="form" id="article-form" onSubmit={onSubmit}>

                <TextField
                    label="Article Title"
                    fullWidth
                    {...register('title', { required: 'Title is required' })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />

                <Controller
                    name="topicId"
                    control={control}
                    rules={{ required: 'Topic is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            label="Topic"
                            fullWidth
                            disabled={isLoadingTopics}
                            error={!!errors.topicId}
                            helperText={errors.topicId?.message}
                            value={field.value || ''}
                        >
                            <MenuItem value="">
                                <em>Select a topic</em>
                            </MenuItem>
                            {topics.map((topic) => (
                                <MenuItem key={topic.id} value={topic.id.toString()}>
                                    {topic.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
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

                <Flex direction="row" gap={24}>
                    <TextField
                        label="Sort Order"
                        type="number"
                        {...register('sortNumber', { valueAsNumber: true })}
                    />
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
                </Flex>

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