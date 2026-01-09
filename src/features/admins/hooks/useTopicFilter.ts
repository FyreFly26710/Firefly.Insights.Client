import { useEffect } from 'react';
import { categoriesApi } from '@/features/articles/api/categoriesApi';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useTopicFilter = () => {
    const { data: categories, isLoading, execute } = useAsync(categoriesApi.getLookupList);

    useEffect(() => {
        execute();
    }, [execute]);

    return {
        categories: categories ?? [],
        isLoading,
    };
};
