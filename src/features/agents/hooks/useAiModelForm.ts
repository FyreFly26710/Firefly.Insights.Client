import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { aiModelsApi } from '../api/aiModelsApi';
import type { AiModelCreateRequest } from '../api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

interface UseAiModelFormProps {
    aiModelId?: number | null;
    onSuccess: () => void;
}

export const useAiModelForm = ({ aiModelId, onSuccess }: UseAiModelFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // AI Model details
    const { data: modelData, isLoading, execute: fetchModel } = useAsync(aiModelsApi.getById);

    // Initialize React Hook Form
    const form = useForm<AiModelCreateRequest>({
        defaultValues: {
            // provider: '',
            aiProviderId: 0,
            model: '',
            modelId: '',
            inputPrice: 0,
            outputPrice: 0,
            isActive: true,
            displayName: '',
            avatar: '',
            description: '',
        }
    });

    const { reset, handleSubmit } = form;

    // Fetch data if in Edit Mode
    useEffect(() => {
        if (aiModelId) {
            fetchModel(aiModelId);
        } else {
            // Reset to defaults if creating new
            reset({
                // provider: '',
                aiProviderId: 0,
                model: '',
                modelId: '',
                inputPrice: 0,
                outputPrice: 0,
                isActive: true,
                displayName: '',
                avatar: '',
                description: '',
            });
        }
    }, [aiModelId, fetchModel, reset]);

    // Update form when model data loads
    useEffect(() => {
        if (modelData) {
            reset({
                // provider: modelData.provider,
                aiProviderId: modelData.aiProviderId,
                model: modelData.model,
                modelId: modelData.modelId,
                inputPrice: modelData.inputPrice,
                outputPrice: modelData.outputPrice,
                isActive: modelData.isActive,
                displayName: modelData.displayName,
                avatar: modelData.avatar,
                description: modelData.description,
            });
        }
    }, [modelData, reset]);

    // Handle Submission
    const onSubmit = async (values: AiModelCreateRequest) => {
        setIsSubmitting(true);
        try {
            if (aiModelId) {
                // Update Mode
                await aiModelsApi.update(aiModelId, values);
            } else {
                // Create Mode
                await aiModelsApi.create(values);
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
        isEdit: !!aiModelId,
    };
};

