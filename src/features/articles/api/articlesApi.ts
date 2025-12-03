import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { ArticleListRequest, PagedArticleDto } from '../types';

export const apiArticlesGetList = async (request: ArticleListRequest) => {
    const response = await axiosClient.get(`/contents/articles`, {
        params: {
            ...request,
        },
    });
    return response.data as PagedArticleDto;
}