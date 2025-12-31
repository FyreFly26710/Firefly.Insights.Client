import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { CategoryDto } from '../api-types';
import type { LookupItemDto } from '@/features/shared/types';

export const apiCategoriesGetList = async () => {
    const response = await axiosClient.get(`/contents/categories`);
    return response.data as CategoryDto[];
}

export const apiCategoriesGetById = async (categoryId: number) => {
    const response = await axiosClient.get(`/contents/categories/${categoryId}`);
    return response.data as CategoryDto;
}

export const apiCategoriesGetLookupList = async () => {
    const response = await axiosClient.get(`/contents/categories/lookup-list`);
    return response.data as LookupItemDto[];
}
export const apiCategoriesGetTopicLookupListById = async (categoryId: number) => {
    const response = await axiosClient.get(`/contents/categories/${categoryId}/topic-lookup-list`);
    return response.data as LookupItemDto[];
}