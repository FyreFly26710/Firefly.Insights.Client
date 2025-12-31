import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    apiCategoriesGetById,
    apiCategoriesCreate,
    apiCategoriesUpdate,
    apiTopicsGetLookupList,
} from '@/features/articles/api';
import type { CategoryCreateRequest, CategoryUpdateRequest } from '@/features/articles/api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

interface UseCategoryFormProps {
    categoryId?: number | null;
    onSuccess: () => void;
}

export const useCategoryForm = ({ categoryId, onSuccess }: UseCategoryFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Topics lookup list
    const { data: topics, isLoading: isLoadingTopics, execute: fetchTopics } = useAsync(apiTopicsGetLookupList);

    // Category details
    const { data: categoryData, isLoading, execute: fetchCategory } = useAsync(apiCategoriesGetById);

    // Initialize React Hook Form
    const form = useForm<CategoryUpdateRequest>({
        defaultValues: {
            categoryId: categoryId ?? 0,
            name: '',
            description: '',
            imageUrl: '',
            sortNumber: 0,
            isHidden: false,
            topics: [],
        }
    });

    const { reset, handleSubmit } = form;

    // Fetch topics lookup list on mount
    useEffect(() => {
        fetchTopics();
    }, [fetchTopics]);

    // Fetch data if in Edit Mode
    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        } else {
            // Reset to defaults if creating new
            reset({
                categoryId: 0,
                name: '',
                description: '',
                imageUrl: '',
                sortNumber: 0,
                isHidden: false,
                topics: [],
            });
        }
    }, [categoryId, fetchCategory, reset]);

    // Update form when category data loads
    useEffect(() => {
        if (categoryData) {
            reset({
                categoryId: categoryData.categoryId,
                name: categoryData.name,
                description: categoryData.description,
                imageUrl: categoryData.imageUrl,
                sortNumber: categoryData.sortNumber,
                isHidden: categoryData.isHidden,
                topics: categoryData.categoryTopics.map(topic => ({
                    topicId: topic.topicId,
                    name: topic.name,
                    sortNumber: topic.sortNumber,
                    isHidden: topic.isHidden,
                })),
            });
        }
    }, [categoryData, reset]);

    // Handle Submission
    const onSubmit = async (values: CategoryUpdateRequest) => {
        setIsSubmitting(true);
        try {
            if (categoryId) {
                // Update Mode
                await apiCategoriesUpdate(categoryId, values);
            } else {
                // Create Mode
                const createRequest: CategoryCreateRequest = {
                    name: values.name ?? '',
                    description: values.description ?? '',
                    imageUrl: values.imageUrl ?? '',
                    sortNumber: values.sortNumber ?? 0,
                    isHidden: values.isHidden ?? false,
                };
                await apiCategoriesCreate(createRequest);
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
        isEdit: !!categoryId,
        topics: topics ?? [],
        isLoadingTopics,
    };
};
