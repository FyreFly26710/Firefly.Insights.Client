import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    apiTopicsGetById,
    apiTopicsCreate,
    apiTopicsUpdate,
    apiCategoriesGetLookupList,
} from '@/features/articles/api';
import type { TopicCreateRequest, TopicUpdateRequest } from '@/features/articles/api-types';
import type { LookupItemDto } from '@/features/shared/types';

interface UseTopicFormProps {
    topicId?: number | null;
    onSuccess: () => void;
}

export const useTopicForm = ({ topicId, onSuccess }: UseTopicFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories lookup list state
    const [categories, setCategories] = useState<LookupItemDto[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    // 1. Initialize React Hook Form
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

    // 2. Fetch categories lookup list on mount
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const categoriesList = await apiCategoriesGetLookupList();
                setCategories(categoriesList);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    // 3. Fetch data if in Edit Mode
    useEffect(() => {
        if (topicId) {
            const fetchDetail = async () => {
                setIsLoading(true);
                try {
                    const data = await apiTopicsGetById(topicId);
                    // Map DTO to Form Fields
                    reset({
                        name: data.name,
                        description: data.description,
                        categoryId: data.categoryId,
                        imageUrl: data.imageUrl,
                        sortNumber: data.sortNumber,
                        isHidden: data.isHidden,
                        topicArticles: data.topicArticles,
                    });
                } catch (error) {
                    console.error("Failed to load topic details", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDetail();
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
    }, [topicId, reset]);

    // 4. Handle Submission
    const onSubmit = async (values: TopicUpdateRequest) => {
        setIsSubmitting(true);
        try {
            if (topicId) {
                // Update Mode
                await apiTopicsUpdate(topicId, values);
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
                await apiTopicsCreate(createRequest);
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
        categories,
        isLoadingCategories,
    };
};