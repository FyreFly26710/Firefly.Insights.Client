import { useEffect } from 'react';
import { topicsApi } from '@/features/articles/api/topicsApi';
import { useAsync } from '@/features/shared/hooks/useAsync';

export const useArticleFilter = () => {
    const { data: topics, isLoading, execute } = useAsync(topicsApi.getLookupList);

    useEffect(() => {
        execute();
    }, [execute]);

    return {
        topics: topics ?? [],
        isLoading,
    };
};
