import { axiosClient } from "@/features/shared/utils/axiosClient";
import type { ExecutionLogDto, ExecutionLogListRequest } from "../api-types";
import type { Paged } from "@/features/shared";

export const executionLogsApi = {
    getList: async (request: ExecutionLogListRequest) => {
        const response = await axiosClient.get('/api/ai/execution-logs', { params: request });
        return response.data as Paged<ExecutionLogDto>;
    },
    getById: async (id: number) => {
        const response = await axiosClient.get(`/api/ai/execution-logs/${id}`);
        return response.data as ExecutionLogDto;
    }
}