import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    apiCategoriesGetById,
    apiCategoriesCreate,
    apiCategoriesUpdate,
    apiTopicsGetLookupList,
} from '@/features/articles/api';
import type { CategoryCreateRequest, CategoryUpdateRequest } from '@/features/articles/api-types';
import type { LookupItemDto } from '@/features/shared/types';

interface UseCategoryFormProps {
    categoryId?: number | null;
    onSuccess: () => void;
}

export const useCategoryForm = ({ categoryId, onSuccess }: UseCategoryFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Topics lookup list state
    const [topics, setTopics] = useState<LookupItemDto[]>([]);
    const [isLoadingTopics, setIsLoadingTopics] = useState(false);

    // 1. Initialize React Hook Form
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

    // 2. Fetch topics lookup list on mount
    useEffect(() => {
        const fetchTopics = async () => {
            setIsLoadingTopics(true);
            try {
                const topicsList = await apiTopicsGetLookupList();
                setTopics(topicsList);
            } catch (error) {
                console.error('Failed to fetch topics:', error);
            } finally {
                setIsLoadingTopics(false);
            }
        };
        fetchTopics();
    }, []);

    // 3. Fetch data if in Edit Mode
    useEffect(() => {
        if (categoryId) {
            const fetchDetail = async () => {
                setIsLoading(true);
                try {
                    const data = await apiCategoriesGetById(categoryId);
                    // Map DTO to Form Fields
                    reset({
                        categoryId: data.categoryId,
                        name: data.name,
                        description: data.description,
                        imageUrl: data.imageUrl,
                        sortNumber: data.sortNumber,
                        isHidden: data.isHidden,
                        topics: data.categoryTopics.map(topic => ({
                            topicId: topic.topicId,
                            name: topic.name,
                            sortNumber: topic.sortNumber,
                            isHidden: topic.isHidden,
                        })),
                    });
                } catch (error) {
                    console.error("Failed to load category details", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDetail();
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
    }, [categoryId, reset]);

    // 4. Handle Submission
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
        topics,
        isLoadingTopics,
    };
};
