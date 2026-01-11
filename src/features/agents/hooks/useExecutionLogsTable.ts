import { useState, useEffect } from 'react';
import { executionLogsApi } from '../api/executionLogsApi';
import type { ExecutionLogListRequest, ExecutionLogDto } from '../api-types';
import { useAsync } from '@/features/shared/hooks/useAsync';

export const useExecutionLogsTable = () => {
    const [query, setQuery] = useState<ExecutionLogListRequest>({
        pageNumber: 1,
        pageSize: 25,
        sortField: 'executedAt',
        isAscending: false,
    });

    const { data, isLoading, execute } = useAsync(executionLogsApi.getList);

    // Drawer state
    const [selectedLog, setSelectedLog] = useState<ExecutionLogDto | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [cachedTotalCount, setCachedTotalCount] = useState(0);
    const totalCount = data?.totalCount ?? cachedTotalCount;

    if (data?.totalCount !== undefined && data.totalCount !== cachedTotalCount) {
        setCachedTotalCount(data.totalCount);
    }
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

    const handleRowDoubleClick = (log: ExecutionLogDto) => {
        setSelectedLog(log);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedLog(null);
    };

    const refresh = () => execute(query);

    return {
        // Data & State
        executionLogs: data?.data ?? [],
        totalCount: totalCount,
        isLoading,
        query,

        // Drawer
        selectedLog,
        isDrawerOpen,

        // Actions
        updateQuery,
        handleRowDoubleClick,
        closeDrawer,
        refresh
    };
};
