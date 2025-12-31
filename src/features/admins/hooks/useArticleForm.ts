import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    apiArticlesGetById,
    apiArticlesCreate,
    apiArticlesUpdate,
    apiTopicsGetLookupList,
} from '@/features/articles/api';
import type { ArticleCreateRequest, ArticleUpdateRequest } from '@/features/articles/api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

interface UseArticleFormProps {
    articleId?: number | null;
    onSuccess: () => void;
}

export const useArticleForm = ({ articleId, onSuccess }: UseArticleFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Topics lookup list
    const { data: topics, isLoading: isLoadingTopics, execute: fetchTopics } = useAsync(apiTopicsGetLookupList);

    // Article details
    const { data: articleData, isLoading, execute: fetchArticle } = useAsync(apiArticlesGetById);

    // Initialize React Hook Form
    const form = useForm<ArticleCreateRequest>({
        defaultValues: {
            title: '',
            content: '',
            description: '',
            imageUrl: '',
            topicId: '',
            isTopicSummary: false,
            sortNumber: 0,
            isHidden: false,
            tags: [],
        }
    });

    const { reset, handleSubmit } = form;

    // Fetch topics lookup list on mount
    useEffect(() => {
        fetchTopics();
    }, [fetchTopics]);

    // Fetch data if in Edit Mode
    useEffect(() => {
        if (articleId) {
            fetchArticle(articleId);
        } else {
            // Reset to defaults if creating new
            reset({
                title: '',
                content: '',
                description: '',
                imageUrl: '',
                topicId: '',
                isTopicSummary: false,
                sortNumber: 0,
                isHidden: false,
                tags: [],
            });
        }
    }, [articleId, fetchArticle, reset]);

    // Update form when article data loads
    useEffect(() => {
        if (articleData) {
            reset({
                title: articleData.title,
                content: articleData.content,
                description: articleData.description,
                imageUrl: articleData.imageUrl,
                topicId: articleData.topicId,
                isTopicSummary: articleData.isTopicSummary,
                sortNumber: articleData.sortNumber,
                isHidden: articleData.isHidden,
                tags: articleData.tags.map(t => t.name) // Convert TagDto[] to string[]
            });
        }
    }, [articleData, reset]);

    // Handle Submission
    const onSubmit = async (values: ArticleCreateRequest) => {
        setIsSubmitting(true);
        try {
            if (articleId) {
                // Update Mode: Construct ArticleUpdateRequest
                const updateRequest: ArticleUpdateRequest = {
                    articleId,
                    ...values,
                };
                await apiArticlesUpdate(articleId, updateRequest);
            } else {
                // Create Mode
                await apiArticlesCreate(values);
            }
            onSuccess();
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        onSubmit: handleSubmit(onSubmit),
        isLoading,
        isSubmitting,
        isEdit: !!articleId,
        topics: topics ?? [], 
        isLoadingTopics,
    };
};