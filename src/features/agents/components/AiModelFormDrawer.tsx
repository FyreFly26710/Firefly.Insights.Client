import React, { useEffect } from 'react';
import { TextField, FormControlLabel, Checkbox, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useAiModelForm } from '../hooks/useAiModelForm';
import { UpsertDrawer } from '@/components/Drawers/UpsertDrawer';
import Flex from '@/components/Elements/Flex/Flex';
import { LookupFormSelect } from '@/components/Selects/LookupFormSelect';
import { useAsync } from '@/features/shared/hooks/useAsync';
import { aiProvidersApi } from '../api';

interface AiModelFormDrawerProps {
    open: boolean;
    aiModelId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const AiModelFormDrawer: React.FC<AiModelFormDrawerProps> = ({ open, aiModelId, onClose, onSuccess }) => {
    const { form, onSubmit, isLoading, isSubmitting, isEdit } = useAiModelForm({
        aiModelId,
        onSuccess,
    });
    const { data: aiProviders = [], isLoading: isLoadingAiProviders, execute: fetchAiProviders } = useAsync(aiProvidersApi.getList);
    
    useEffect(() => {
        fetchAiProviders();
    }, [fetchAiProviders]);

    const {
        register,
        control,
        formState: { errors },
    } = form;

    return (
        <UpsertDrawer
            open={open}
            onClose={onClose}
            title={isEdit ? 'Edit AI Model' : 'Create New AI Model'}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            formId="ai-model-form"
            submitLabel={isEdit ? 'Update AI Model' : 'Create AI Model'}
            width={560}
        >
            <Box component="form" id="ai-model-form" onSubmit={onSubmit} sx={{ height: '100%' }}>
                <Flex direction="column" gap={24} width="100%">
                    <LookupFormSelect
                        name="aiProviderId"
                        control={control}
                        label="AI Provider"
                        options={aiProviders?.map((provider) => ({ id: provider.aiProviderId, name: provider.name })) ?? []}
                        isDisabled={isLoadingAiProviders}
                        required="Provider is required"
                    />

                    <TextField
                        label="Model Name"
                        fullWidth
                        {...register('model', { required: 'Model name is required' })}
                        error={!!errors.model}
                        helperText={errors.model?.message}
                        placeholder="e.g. GPT-4, Claude 3"
                    />

                    <TextField
                        label="Model ID"
                        fullWidth
                        {...register('modelId', { required: 'Model ID is required' })}
                        error={!!errors.modelId}
                        helperText={errors.modelId?.message}
                        placeholder="e.g. gpt-4-turbo-preview"
                    />

                    <TextField label="Display Name" fullWidth {...register('displayName')} placeholder="e.g. GPT-4, Claude 3" />

                    <TextField label="Avatar URL" fullWidth {...register('avatar')} placeholder="https://example.com/avatar.png" />

                    <Flex direction="row" gap={24}>
                        <TextField
                            label="Input Price"
                            type="number"
                            fullWidth
                            {...register('inputPrice', { valueAsNumber: true })}
                            inputProps={{ step: 'any' }}
                        />
                        <TextField
                            label="Output Price"
                            type="number"
                            fullWidth
                            {...register('outputPrice', { valueAsNumber: true })}
                            inputProps={{ step: 'any' }}
                        />
                    </Flex>

                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="Active" />}
                    />
                </Flex>
            </Box>
        </UpsertDrawer>
    );
};
