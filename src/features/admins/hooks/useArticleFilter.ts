import { useEffect } from 'react';
import { apiTopicsGetLookupList } from '@/features/articles/api';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useArticleFilter = () => {
    const { data: topics, isLoading, execute } = useAsync(apiTopicsGetLookupList);

    useEffect(() => {
        execute();
    }, [execute]);

    return {
        topics: topics ?? [],
        isLoading,
    };
};
