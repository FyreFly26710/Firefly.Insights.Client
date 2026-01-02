import { useState, useEffect } from 'react';
import { jobLogsApi } from '../api/jobLogsApi';
import type { JobLogListRequest } from '../api-types';
import { useAsync } from '@/features/shared/hooks/useAsync ';

export const useJobLogsTable = () => {
    const [query, setQuery] = useState<JobLogListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'createdAt',
        isAscending: false,
    });

    const { data, isLoading, execute } = useAsync(jobLogsApi.getList);

    useEffect(() => {
        execute(query);
    }, [query, execute]);

    const updateQuery = (updates: Partial<JobLogListRequest>) => {
        setQuery((prev) => ({
            ...prev,
            ...updates,
            pageNumber: updates.pageNumber ?? (Object.keys(updates).some(k => !['pageNumber', 'pageSize', 'sortField', 'isAscending'].includes(k)) ? 1 : prev.pageNumber)
        }));
    };

    const refresh = () => execute(query);

    return {
        // Data & State
        jobLogs: data?.data ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading,
        query,

        // Actions
        updateQuery,
        refresh
    };
};
