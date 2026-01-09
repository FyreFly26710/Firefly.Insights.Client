import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { TopicDto, PagedTopicDto, TopicListRequest, TopicCreateRequest, TopicUpdateRequest, ArticleDto } from '../api-types';
import type { LookupItemDto } from '@/features/shared/types';

export const topicsApi = {
    getList: async (request: TopicListRequest) => {
        const response = await axiosClient.get(`/api/contents/topics`, {
            params: {
                ...request,
            },
        });
        return response.data as PagedTopicDto;
    },
    getById: async (topicId: number) => {
        const response = await axiosClient.get(`/api/contents/topics/${topicId}`);
        return response.data as TopicDto;
    },
    getLookupList: async () => {
        const response = await axiosClient.get(`/api/contents/topics/lookup-list`);
        return response.data as LookupItemDto[];
    },
    getSummaryArticleId: async (topicId: number) => {
        const response = await axiosClient.get(`/api/contents/topics/${topicId}/summary-article-id`);
        return response.data as number;
    },
    create: async (request: TopicCreateRequest) => {
        const response = await axiosClient.post(`/api/contents/topics`, request);
        return response.data as number;
    },
    update: async (topicId: number, request: TopicUpdateRequest) => {
        const response = await axiosClient.put(`/api/contents/topics/${topicId}`, request);
        return response.data as boolean;
    },
    delete: async (topicId: number) => {
        const response = await axiosClient.delete(`/api/contents/topics/${topicId}`);
        return response.data as boolean;
    }
}