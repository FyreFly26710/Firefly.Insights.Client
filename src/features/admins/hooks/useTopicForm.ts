import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    apiTopicsGetById,
    apiTopicsCreate,
    apiTopicsUpdate,
} from '@/features/articles/api';
import type { TopicCreateRequest, TopicUpdateRequest } from '@/features/articles/api-types';

interface UseTopicFormProps {
    topicId?: number | null;
    onSuccess: () => void;
}

export const useTopicForm = ({ topicId, onSuccess }: UseTopicFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Initialize React Hook Form
    const form = useForm<TopicCreateRequest>({
        defaultValues: {
            name: '',
            description: '',
            categoryId: undefined,
            imageUrl: '',
            sortNumber: 0,
            isHidden: false,
        }
    });

    const { reset, handleSubmit } = form;

    // 2. Fetch data if in Edit Mode
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
                name: '',
                description: '',
                categoryId: undefined,
                imageUrl: '',
                sortNumber: 0,
                isHidden: false,
            });
        }
    }, [topicId, reset]);

    // 3. Handle Submission
    const onSubmit = async (values: TopicCreateRequest) => {
        setIsSubmitting(true);
        try {
            if (topicId) {
                // Update Mode: Construct TopicUpdateRequest
                const updateRequest: TopicUpdateRequest = {
                    topicId,
                    ...values,
                };
                await apiTopicsUpdate(topicId, updateRequest);
            } else {
                // Create Mode
                await apiTopicsCreate(values);
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
        isEdit: !!topicId
    };
};