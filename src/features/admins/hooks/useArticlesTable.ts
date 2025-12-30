// src/features/admin/hooks/useArticlesTable.ts
import { useState, useEffect, useCallback } from 'react';
import { apiArticlesGetList } from '../api/articleApi';
import type { ArticleDto, ArticleListRequest } from '../types';

export const useArticlesTable = () => {
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Initial State for the .NET API request
    const [query, setQuery] = useState<ArticleListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'updatedAt',
        isAscending: false,
        // articleTitle: '',
        // topicId: undefined,
        // isHidden: undefined,
    });

    // 2. The Fetcher Function
    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await apiArticlesGetList(query);
            setArticles(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            // In a real app, you might trigger a global notification/toast here
            console.error('Failed to fetch articles:', error);
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    // 3. Re-run whenever the query object changes
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    // 4. Update helpers to keep the UI components "dumb"
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