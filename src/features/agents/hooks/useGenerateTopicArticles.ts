import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAsync } from '@/features/shared/hooks/useAsync';
import { aiModelsApi } from '../api/aiModelsApi';
import { categoriesApi } from '@/features/articles/api/';
import type { GenerateArticleSummaryRequest, AiModelDto } from '../api-types';

export type GenerateArticleSummaryFormValues = GenerateArticleSummaryRequest & {
    provider: string;
};

export const useGenerateTopicArticles = () => {
    const { data: aiModels = [], isLoading: isLoadingModels, execute: fetchAiModels } = useAsync(aiModelsApi.getList);
    const { data: categories = [], isLoading: isLoadingCategories, execute: fetchCategories } = useAsync(categoriesApi.getLookupList);
    const { data: topics = [], isLoading: isLoadingTopics, execute: fetchTopics } = useAsync(categoriesApi.getTopicLookupListById);

    const form = useForm<GenerateArticleSummaryFormValues>({
        defaultValues: {
            provider: '',
            // model: '',
            aiModelId: 0,
            userPrompt: '',
            articleCount: 10,
            categoryId: undefined,
            category: '',
            topic: '',
            topicDescription: '',
            topicUrl: ''
        }
    });

    const { watch, setValue } = form;
    const watchedCategoryId = watch('categoryId');
    const watchedProvider = watch('provider');

    // Logic: Grouping and Options
    const groupedModels = useMemo(() => (aiModels || []).reduce((acc, model) => {
        if (!acc[model.provider]) acc[model.provider] = [];
        acc[model.provider].push(model);
        return acc;
    }, {} as Record<string, AiModelDto[]>), [aiModels]);

    const providerOptions = useMemo(() =>
        Object.keys(groupedModels).map(name => ({ id: name, name })), [groupedModels]);

    const currentModelOptions = useMemo(() => {
        if (!watchedProvider) return [];
        return (groupedModels[watchedProvider] || []).map(m => ({
            id: m.aiModelId,
            name: m.model,
            description: `Output Price: $${m.outputPrice.toFixed(2)}; Input Price: $${m.inputPrice.toFixed(2)};`
        }));
    }, [watchedProvider, groupedModels]);

    // Side Effects
    useEffect(() => {
        fetchCategories();
        fetchAiModels();
    }, [fetchCategories, fetchAiModels]);

    useEffect(() => {
        if (watchedCategoryId && watchedCategoryId > 0) {
            fetchTopics(watchedCategoryId);
            const category = (categories || []).find(c => c.id === watchedCategoryId);
            if (category) setValue('category', category.name);
        } else {
            setValue('category', '');
            setValue('topic', '');
        }
    }, [watchedCategoryId, categories, fetchTopics, setValue]);

    useEffect(() => {
        setValue('aiModelId', 0);
    }, [watchedProvider, setValue]);

    return {
        form,
        options: {
            categories,
            topics,
            providerOptions,
            currentModelOptions
        },
        loading: {
            isLoadingModels,
            isLoadingCategories,
            isLoadingTopics
        },
        watched: {
            watchedCategoryId,
            watchedProvider
        }
    };
};