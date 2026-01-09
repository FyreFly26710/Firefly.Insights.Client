import { useEffect } from 'react';
import { categoriesApi } from '@/features/articles/api/categoriesApi';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useCategoriesTable = () => {
    const { data: categories, isLoading, execute } = useAsync(categoriesApi.getList);

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
