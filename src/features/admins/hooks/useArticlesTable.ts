import { useState, useEffect, useCallback } from 'react';
import { apiArticlesGetList } from '@/features/articles/api';
import type { ArticleDto, ArticleListRequest } from '@/features/articles/api-types';

export const useArticlesTable = () => {
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [query, setQuery] = useState<ArticleListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'updatedAt',
        isAscending: false,
        // articleTitle: '',
        // topicId: undefined,
        // isHidden: undefined,
    });

    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await apiArticlesGetList(query);
            setArticles(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const updateQuery = (updates: Partial<ArticleListRequest>) => {
        setQuery((prev) => ({
            ...prev,
            ...updates,
            pageNumber: updates.pageNumber ?? (Object.keys(updates).some(k => !['pageNumber', 'pageSize', 'sortField', 'isAscending'].includes(k)) ? 1 : prev.pageNumber)
        }));
    };

    const refresh = () => fetchArticles();

    return {
        // Data & State
        articles,
        totalCount,
        isLoading,
        query,

        // Actions
        updateQuery,
        refresh
    };
};