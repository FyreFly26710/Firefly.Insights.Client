import { useState, useEffect } from 'react';
import { articlesApi } from '@/features/articles/api/articlesApi';
import type { ArticleListRequest } from '@/features/articles/api-types';
import { useAsync } from '@/features/shared/hooks/useAsync';

export const useArticles = () => {
    const [query, setQuery] = useState<ArticleListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'updatedAt',
        isAscending: false,
        isHidden: false, // Readers only see visible articles by default
    });

    const { data, isLoading, execute } = useAsync(articlesApi.getList);
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
        setQuery((prev) => ({
            ...prev,
            ...updates,
            pageNumber: updates.pageNumber ?? (Object.keys(updates).some(k => !['pageNumber', 'pageSize', 'sortField', 'isAscending'].includes(k)) ? 1 : prev.pageNumber)
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
