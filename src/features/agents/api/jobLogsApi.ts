import type { Paged } from "@/features/shared";
import { axiosClient } from "@/features/shared/utils/axiosClient";
import type { JobLogDto, JobLogListRequest } from "../api-types";

export const jobLogsApi = {
    getList: async (request: JobLogListRequest) => {
        const response = await axiosClient.get('/api/ai/job-logs', { params: request });
        return response.data as Paged<JobLogDto>;
    },
    getById: async (id: number) => {
        const response = await axiosClient.get(`/api/ai/job-logs/${id}`);
        return response.data as JobLogDto;
    }
}