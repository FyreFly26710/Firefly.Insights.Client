import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    topicsApi,
    categoriesApi,
} from '@/features/articles/api';
import type { TopicCreateRequest, TopicUpdateRequest } from '@/features/articles/api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

interface UseTopicFormProps {
    topicId?: number | null;
    onSuccess: () => void;
}

export const useTopicForm = ({ topicId, onSuccess }: UseTopicFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories lookup list
    const { data: categories, isLoading: isLoadingCategories, execute: fetchCategories } = useAsync(categoriesApi.getLookupList);

    // Topic details
    const { data: topicData, isLoading, execute: fetchTopic } = useAsync(topicsApi.getById);

    // Initialize React Hook Form
    const form = useForm<TopicUpdateRequest>({
        defaultValues: {
            topicId: topicId ?? 0,
            name: '',
            description: '',
            categoryId: undefined,
            imageUrl: '',
            sortNumber: 0,
            isHidden: false,
        }
    });

    const { reset, handleSubmit } = form;

    // Fetch categories lookup list on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Fetch data if in Edit Mode
    useEffect(() => {
        if (topicId) {
            fetchTopic(topicId);
        } else {
            // Reset to defaults if creating new
            reset({
                topicId: 0,
                name: '',
                description: '',
                categoryId: undefined,
                imageUrl: '',
                sortNumber: 0,
                isHidden: false,
                topicArticles: [],
            });
        }
    }, [topicId, fetchTopic, reset]);

    // Update form when topic data loads
    useEffect(() => {
        if (topicData) {
            reset({
                name: topicData.name,
                description: topicData.description,
                categoryId: topicData.categoryId,
                imageUrl: topicData.imageUrl,
                sortNumber: topicData.sortNumber,
                isHidden: topicData.isHidden,
                topicArticles: topicData.topicArticles,
            });
        }
    }, [topicData, reset]);

    // Handle Submission
    const onSubmit = async (values: TopicUpdateRequest) => {
        setIsSubmitting(true);
        try {
            if (topicId) {
                // Update Mode
                await topicsApi.update(topicId, values);
            } else {
                // Create Mode
                const createRequest: TopicCreateRequest = {
                    name: values.name ?? '',
                    categoryId: values.categoryId ?? 0,
                    description: values.description ?? '',
                    imageUrl: values.imageUrl ?? '',
                    sortNumber: values.sortNumber ?? 0,
                    isHidden: values.isHidden ?? false,
                }
                await topicsApi.create(createRequest);
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
        isEdit: !!topicId,
        categories: categories ?? [],
        isLoadingCategories,
    };
};