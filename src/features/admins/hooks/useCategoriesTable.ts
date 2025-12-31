import { useEffect } from 'react';
import { apiCategoriesGetList } from '@/features/articles/api';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useCategoriesTable = () => {
    const { data: categories, isLoading, execute } = useAsync(apiCategoriesGetList);

    useEffect(() => {
        execute();
    }, [execute]);

    const refresh = () => execute();

    return {
        // Data & State
        categories: categories ?? [],
        isLoading,

        // Actions
        refresh
    };
};
