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
import { useArticleForm } from '../hooks/useArticleForm';
import type { ArticleDto } from '../types';

interface ArticleFormDrawerProps {
    open: boolean;
    article: ArticleDto | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const ArticleFormDrawer: React.FC<ArticleFormDrawerProps> = ({
    open,
    article,
    onClose,
    onSuccess
}) => {
    const { form, onSubmit, isLoading, isSubmitting, isEdit } = useArticleForm({
        articleId: article?.articleId,
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
                        {isEdit ? 'Edit Article' : 'Create New Article'}
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
                            form="article-form"
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                            disabled={isSubmitting || isLoading}
                        >
                            {isEdit ? 'Update Article' : 'Create Article'}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};