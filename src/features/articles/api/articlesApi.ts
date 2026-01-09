import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { ArticleDto, ArticleListRequest, PagedArticleDto, ArticleCreateRequest, ArticleUpdateRequest } from '../api-types';

export const articlesApi = {
    getList: async (request: ArticleListRequest) => {
        const response = await axiosClient.get(`/api/contents/articles`, {
            params: {
                ...request,
            },
        });
        return response.data as PagedArticleDto;
    },
    getById: async (articleId: number) => {
        const response = await axiosClient.get(`/api/contents/articles/${articleId}`);
        return response.data as ArticleDto;
    },
    create: async (request: ArticleCreateRequest) => {
        const response = await axiosClient.post(`/api/contents/articles`, request);
        return response.data as number;
    },
    update: async (articleId: number, request: ArticleUpdateRequest) => {
        const response = await axiosClient.put(`/api/contents/articles/${articleId}`, request);
        return response.data as boolean;
    },
    delete: async (articleId: number) => {
        const response = await axiosClient.delete(`/api/contents/articles/${articleId}`);
        return response.data as boolean;
    }
}

// export const apiArticlesGetList = async (request: ArticleListRequest) => {
//     const response = await axiosClient.get(`/api/contents/articles`, {
//         params: {
//             ...request,
//         },
//     });
//     return response.data as PagedArticleDto;
// }
// export const apiArticlesGetById = async (articleId: number) => {
//     const response = await axiosClient.get(`/api/contents/articles/${articleId}`);
//     return response.data as ArticleDto;
// }
// export const apiArticlesCreate = async (request: ArticleCreateRequest) => {
//     const response = await axiosClient.post(`/api/contents/articles`, request);
//     return response.data as number;
// }
// export const apiArticlesUpdate = async (articleId: number, request: ArticleUpdateRequest) => {
//     const response = await axiosClient.put(`/api/contents/articles/${articleId}`, request);
//     return response.data as boolean;
// }
// export const apiArticlesDelete = async (articleId: number) => {
//     const response = await axiosClient.delete(`/api/contents/articles/${articleId}`);
//     return response.data as boolean;
// }