import { axiosClient } from '@/features/shared/utils/axiosClient';
import type { TopicDto } from '../types';

export const apiTopicsGetList = async () => {
    const response = await axiosClient.get(`/contents/topics`);
    return response.data as TopicDto[];
}

export const apiTopicsGetById = async (topicId: number) => {
    const response = await axiosClient.get(`/contents/topics/${topicId}`);
    return response.data as TopicDto;
}
