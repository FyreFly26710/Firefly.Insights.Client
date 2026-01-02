import { useState, useEffect } from 'react';
import { executionLogsApi } from '../api/executionLogsApi';
import type { ExecutionLogListRequest } from '../api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useExecutionLogsTable = () => {
    const [query, setQuery] = useState<ExecutionLogListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'executedAt',
        isAscending: false,
    });

    const { data, isLoading, execute } = useAsync(executionLogsApi.getList);

    useEffect(() => {
        execute(query);
    }, [query, execute]);

    const updateQuery = (updates: Partial<ExecutionLogListRequest>) => {
        setQuery((prev) => ({
            ...prev,
            ...updates,
            pageNumber: updates.pageNumber ?? (Object.keys(updates).some(k => !['pageNumber', 'pageSize', 'sortField', 'isAscending'].includes(k)) ? 1 : prev.pageNumber)
        }));
    };

    const refresh = () => execute(query);

    return {
        // Data & State
        executionLogs: data?.data ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading,
        query,

        // Actions
        updateQuery,
        refresh
    };
};
