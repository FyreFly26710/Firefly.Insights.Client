import { useState, useEffect } from 'react';
import { apiTopicsGetList } from '@/features/articles/api';
import type { TopicListRequest } from '@/features/articles/api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useTopicsTable = () => {
    const [query, setQuery] = useState<TopicListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'updatedAt',
        isAscending: false,
    });

    const { data, isLoading, execute } = useAsync(apiTopicsGetList);

    useEffect(() => {
        execute(query);
    }, [query, execute]);

    const updateQuery = (updates: Partial<TopicListRequest>) => {
        setQuery((prev) => ({
            ...prev,
            ...updates,
            pageNumber: updates.pageNumber ?? (Object.keys(updates).some(k => !['pageNumber', 'pageSize', 'sortField', 'isAscending'].includes(k)) ? 1 : prev.pageNumber)
        }));
    };

    const refresh = () => execute(query);

    return {
        // Data & State
        topics: data?.data ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading,
        query,

        // Actions
        updateQuery,
        refresh
    };
};