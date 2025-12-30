import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    apiArticlesGetById,
    apiArticlesCreate,
    apiArticlesUpdate
} from '../api/articleApi';
import type { ArticleCreateRequest, ArticleUpdateRequest, ArticleDto } from '../types';

interface UseArticleFormProps {
    articleId?: number | null;
    onSuccess: () => void;
}

export const useArticleForm = ({ articleId, onSuccess }: UseArticleFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Initialize React Hook Form
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

    // 2. Fetch data if in Edit Mode
    useEffect(() => {
        if (articleId) {
            const fetchDetail = async () => {
                setIsLoading(true);
                try {
                    const data = await apiArticlesGetById(articleId);
                    // Map DTO to Form Fields
                    reset({
                        title: data.title,
                        content: data.content,
                        description: data.description,
                        imageUrl: data.imageUrl,
                        topicId: data.topicId,
                        isTopicSummary: data.isTopicSummary,
                        sortNumber: data.sortNumber,
                        isHidden: data.isHidden,
                        tags: data.tags.map(t => t.name) // Convert TagDto[] to string[]
                    });
                } catch (error) {
                    console.error("Failed to load article details", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDetail();
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
    }, [articleId, reset]);

    // 3. Handle Submission
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
        isLoading, // Initial loading for edit mode
        isSubmitting, // Submission loading
        isEdit: !!articleId
    };
};