import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { CategoryDto } from '../types';

export const apiCategoriesGetList = async () => {
    const response = await axiosClient.get(`/contents/categories`);
    return response.data as CategoryDto[];
}

export const apiCategoriesGetById = async (categoryId: number) => {
    const response = await axiosClient.get(`/contents/categories/${categoryId}`);
    return response.data as CategoryDto;
}