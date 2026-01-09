import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { TopicDto, PagedTopicDto, TopicListRequest, TopicCreateRequest, TopicUpdateRequest, ArticleDto } from '../api-types';
import type { LookupItemDto } from '@/features/shared/types';

export const apiTopicsGetList = async (request: TopicListRequest) => {
    const response = await axiosClient.get(`/api/contents/topics`, {
        params: {
            ...request,
        },
    });
    return response.data as PagedTopicDto;
}
export const apiTopicsGetById = async (topicId: number) => {
    const response = await axiosClient.get(`/api/contents/topics/${topicId}`);
    return response.data as TopicDto;
}
export const apiTopicsGetLookupList = async () => {
    const response = await axiosClient.get(`/api/contents/topics/lookup-list`);
    return response.data as LookupItemDto[];
}
export const apiTopicsCreate = async (request: TopicCreateRequest) => {
    const response = await axiosClient.post(`/api/contents/topics`, request);
    return response.data as number;
}
export const apiTopicsUpdate = async (topicId: number, request: TopicUpdateRequest) => {
    const response = await axiosClient.put(`/api/contents/topics/${topicId}`, request);
    return response.data as boolean;
}
export const apiTopicsDelete = async (topicId: number) => {
    const response = await axiosClient.delete(`/api/contents/topics/${topicId}`);
    return response.data as boolean;
}
export const apiTopicsGetSummaryArticleId = async (topicId: number) => {
    const response = await axiosClient.get(`/api/contents/topics/${topicId}/summary-article-id`);
    return response.data as number;
}