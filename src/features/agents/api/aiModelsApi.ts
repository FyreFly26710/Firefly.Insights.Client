import type { LookupItemDto } from "@/features/shared";
import type { AiModelDto } from "../api-types";
import { axiosClient } from '@/features/shared/utils/axiosClient';


export const aiModelsApi = {
    getList: async () => {
        const response = await axiosClient.get('/api/ai/ai-models');
        return response.data as AiModelDto[];
    },
    getById: async (id: number) => {
        const response = await axiosClient.get(`/api/ai/ai-models/${id}`);
        return response.data as AiModelDto;
    },
    getLookupList: async () => {
        const response = await axiosClient.get('/api/ai/ai-models/lookup-list');
        return response.data as LookupItemDto[];
    }
}