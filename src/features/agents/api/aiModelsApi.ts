import type { LookupItemDto } from "@/features/shared";
import type { AiModelCreateRequest, AiModelDto, AiModelUpdateRequest } from "../api-types";
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
    },
    create: async (request: AiModelCreateRequest) => {
        const response = await axiosClient.post('/api/ai/ai-models', request);
        return response.data as AiModelDto;
    },
    update: async (id: number, request: AiModelUpdateRequest) => {
        const response = await axiosClient.put(`/api/ai/ai-models/${id}`, request);
        return response.data as AiModelDto;
    },
    delete: async (id: number) => {
        const response = await axiosClient.delete(`/api/ai/ai-models/${id}`);
        return response.data as boolean;
    }
}