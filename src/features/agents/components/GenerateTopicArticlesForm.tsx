import { Box, TextField, Button, Typography, Paper, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import Flex from '@/components/Elements/Flex/Flex';
import { LookupFormSelect } from '@/components/Selects/LookupFormSelect';
import { useGenerateTopicArticles } from '../hooks/useGenerateTopicArticles';
import type { GenerateArticleSummaryRequest } from '../api-types';

interface Props {
    onSubmit: (data: GenerateArticleSummaryRequest) => Promise<void>;
}

export const GenerateTopicArticlesForm = ({ onSubmit }: Props) => {
    const { form, options, loading, watched } = useGenerateTopicArticles();
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = form;
    const filteredCategories = options.categories?.filter(c => c.id !== -1) ?? [];
    const filteredTopics = options.topics?.filter(t => t.id !== -1) ?? [];

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Instructions</Typography>
                <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li>Select an AI model provider, category and topic.</li>
                        <li>A job will be dispatched to generate summaries, then articles, and a final topic summary.</li>
                    </ul>
                </Typography>
            </Paper>

            <Flex width="100%" gap={12}>
                <LookupFormSelect
                    name="provider"
                    control={control}
                    label="AI Provider"
                    options={options.providerOptions}
                    isDisabled={loading.isLoadingModels}
                    required="Provider is required"
                />
                <LookupFormSelect
                    name="model"
                    control={control}
                    label="AI Model"
                    options={options.currentModelOptions}
                    isDisabled={loading.isLoadingModels || !watched.watchedProvider}
                    required="Model is required"
                    placeholder={watched.watchedProvider ? "Select a model" : "Select provider first"}
                />
                <Controller
                    name="articleCount"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="No. of Articles"
                            type="number"
                            sx={{ width: '300px' }}
                            error={!!errors.articleCount}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
            </Flex>

            <LookupFormSelect
                name="categoryId"
                control={control}
                label="Category"
                options={filteredCategories}
                isDisabled={loading.isLoadingCategories}
                required="Category is required"
            />

            <Controller
                name="topic"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                        freeSolo
                        options={filteredTopics.map((t) => t.name)}
                        disabled={!watched.watchedCategoryId || loading.isLoadingTopics}
                        value={value || ''}
                        onChange={(_, val) => onChange(val)}
                        onInputChange={(_, val) => onChange(val)}
                        renderInput={(params) => (
                            <TextField {...params} label="Topic Title" error={!!error} helperText={error?.message} fullWidth />
                        )}
                    />
                )}
            />

            <TextField label="Topic Image URL" {...register('topicUrl')} fullWidth disabled={!watched.watchedCategoryId} />

            <TextField
                label="Topic Description"
                multiline
                rows={3}
                {...register('topicDescription')}
                fullWidth
                disabled={!watched.watchedCategoryId}
            />

            <TextField
                label="User Prompt"
                multiline
                rows={3}
                {...register('userPrompt')}
                fullWidth
                disabled={!watched.watchedCategoryId}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                    {isSubmitting ? 'Dispatching...' : 'Dispatch Job'}
                </Button>
            </Box>
        </Box>
    );
};