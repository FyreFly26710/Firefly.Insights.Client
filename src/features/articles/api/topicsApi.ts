import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { TopicDto, PagedTopicDto, TopicListRequest, TopicCreateRequest, TopicUpdateRequest } from '../api-types';

export const apiTopicsGetList = async (request: TopicListRequest) => {
    const response = await axiosClient.get(`/contents/topics`, {
        params: {
            ...request,
        },
    });
    return response.data as PagedTopicDto;
}
export const apiTopicsGetById = async (topicId: number) => {
    const response = await axiosClient.get(`/contents/topics/${topicId}`);
    return response.data as TopicDto;
}
export const apiTopicsCreate = async (request: TopicCreateRequest) => {
    const response = await axiosClient.post(`/contents/topics`, request);
    return response.data as number;
}
export const apiTopicsUpdate = async (topicId: number, request: TopicUpdateRequest) => {
    const response = await axiosClient.put(`/contents/topics/${topicId}`, request);
    return response.data as boolean;
}
export const apiTopicsDelete = async (topicId: number) => {
    const response = await axiosClient.delete(`/contents/topics/${topicId}`);
    return response.data as boolean;
}