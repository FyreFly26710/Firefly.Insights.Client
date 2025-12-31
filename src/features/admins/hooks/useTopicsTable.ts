import { useState, useEffect, useCallback } from 'react';
import { apiTopicsGetList } from '@/features/articles/api';
import type { TopicDto, TopicListRequest } from '@/features/articles/api-types';

export const useTopicsTable = () => {
    const [topics, setTopics] = useState<TopicDto[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [query, setQuery] = useState<TopicListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'updatedAt',
        isAscending: false,
    });

    const fetchTopics = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await apiTopicsGetList(query);
            setTopics(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            console.error('Failed to fetch topics:', error);
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchTopics();
    }, [fetchTopics]);

    const updateQuery = (updates: Partial<TopicListRequest>) => {
        setQuery((prev) => ({
            ...prev,
            ...updates,
            pageNumber: updates.pageNumber ?? (Object.keys(updates).some(k => !['pageNumber', 'pageSize', 'sortField', 'isAscending'].includes(k)) ? 1 : prev.pageNumber)
        }));
    };

    const refresh = () => fetchTopics();

    return {
        // Data & State
        topics,
        totalCount,
        isLoading,
        query,

        // Actions
        updateQuery,
        refresh
    };
};