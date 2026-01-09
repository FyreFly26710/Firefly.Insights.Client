import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { CategoryDto, CategoryCreateRequest, CategoryUpdateRequest } from '../api-types';
import type { LookupItemDto } from '@/features/shared/types';

export const categoriesApi = {
    getList: async () => {
        const response = await axiosClient.get(`/api/contents/categories`);
        return response.data as CategoryDto[];
    },
    getById: async (categoryId: number) => {
        const response = await axiosClient.get(`/api/contents/categories/${categoryId}`);
        return response.data as CategoryDto;
    },
    getLookupList: async () => {
        const response = await axiosClient.get(`/api/contents/categories/lookup-list`);
        return response.data as LookupItemDto[];
    },
    getTopicLookupListById: async (categoryId: number) => {
        const response = await axiosClient.get(`/api/contents/categories/${categoryId}/topic-lookup-list`);
        return response.data as LookupItemDto[];
    },
    create: async (request: CategoryCreateRequest) => {
        const response = await axiosClient.post(`/api/contents/categories`, request);
        return response.data as number;
    },
    update: async (categoryId: number, request: CategoryUpdateRequest) => {
        const response = await axiosClient.put(`/api/contents/categories/${categoryId}`, request);
        return response.data as boolean;
    },
    delete: async (categoryId: number) => {
        const response = await axiosClient.delete(`/api/contents/categories/${categoryId}`);
        return response.data as boolean;
    }
}