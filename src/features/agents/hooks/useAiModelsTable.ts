import { useEffect } from 'react';
import { aiModelsApi } from '../api/aiModelsApi';
import { useAsync } from '@/features/shared/hooks/useAsync';

export const useAiModelsTable = () => {
    const { data: models, error, isLoading, execute } = useAsync(aiModelsApi.getList);

    useEffect(() => {
        execute();
    }, [execute]);

    const refresh = () => execute();

    return {
        // Data & State
        models: models ?? [],
        isLoading,
        error,
        // Actions
        refresh
    };
};

