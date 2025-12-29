import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { ArticleDto, ArticleListRequest, PagedArticleDto } from '../types';

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