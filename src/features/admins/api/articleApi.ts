import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { ArticleCreateRequest, ArticleDto, ArticleListRequest, ArticleUpdateRequest, PagedArticleDto } from '../types';

export const apiArticlesGetList = async (request: ArticleListRequest) => {
    const response = await axiosClient.get(`/contents/articles`, {
        params: {
            ...request,
        },
    });
    return response.data as PagedArticleDto;
}
export const apiArticlesGetById = async (articleId: number) => {
    const response = await axiosClient.get(`/contents/articles/${articleId}`);
    return response.data as ArticleDto;
}
export const apiArticlesCreate = async (request: ArticleCreateRequest) => {
    const response = await axiosClient.post(`/contents/articles`, request);
    return response.data as number;
}
export const apiArticlesUpdate = async (articleId: number, request: ArticleUpdateRequest) => {
    const response = await axiosClient.put(`/contents/articles/${articleId}`, request);
    return response.data as boolean;
}
export const apiArticlesDelete = async (articleId: number) => {
    const response = await axiosClient.delete(`/contents/articles/${articleId}`);
    return response.data as boolean;
}