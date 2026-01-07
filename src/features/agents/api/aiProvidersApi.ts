import type { LookupItemDto } from "@/features/shared";
import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { AiProviderDto, UpdateAiProviderRequest } from "../api-types/aiProviders";

export const aiProvidersApi = {
    getList: async () => {
        const response = await axiosClient.get('/api/ai/ai-providers');
        return response.data as AiProviderDto[];
    },
    update: async (id: number, request: UpdateAiProviderRequest) => {
        const response = await axiosClient.put(`/api/ai/ai-providers/${id}`, request);
        return response.data as boolean;
    },
}