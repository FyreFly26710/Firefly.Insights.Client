import { useEffect } from 'react';
import { apiCategoriesGetLookupList } from '@/features/articles/api';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useTopicFilter = () => {
    const { data: categories, isLoading, execute } = useAsync(apiCategoriesGetLookupList);

    useEffect(() => {
        execute();
    }, [execute]);

    return {
        categories: categories ?? [],
        isLoading,
    };
};
