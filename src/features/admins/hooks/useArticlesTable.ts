import { useState, useEffect } from 'react';
import { apiArticlesGetList } from '@/features/articles/api';
import type { ArticleListRequest } from '@/features/articles/api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useArticlesTable = () => {
    const [query, setQuery] = useState<ArticleListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'updatedAt',
        isAscending: false,
        // articleTitle: '',
        // topicId: undefined,
        // isHidden: undefined,
    });

    const { data, isLoading, execute } = useAsync(apiArticlesGetList);
    const [cachedTotalCount, setCachedTotalCount] = useState(0);
    useEffect(() => {
        if (data?.totalCount !== undefined) {
            setTimeout(() => {
                setCachedTotalCount(data.totalCount);
            }, 0);
        }
    }, [data?.totalCount]);

    useEffect(() => {
        execute(query);
    }, [query, execute]);

    const updateQuery = (updates: Partial<ArticleListRequest>) => {
        setQuery(prev => ({
            ...prev,
            ...updates,
        }));
    };
    
    const refresh = () => execute(query);

    return {
        // Data & State
        articles: data?.data ?? [],
        totalCount: data?.totalCount ?? cachedTotalCount, 
        isLoading,
        query,

        // Actions
        updateQuery,
        refresh
    };
};