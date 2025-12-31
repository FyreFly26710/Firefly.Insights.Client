import { useState, useEffect } from 'react';
import { apiTopicsGetLookupList } from '@/features/articles/api';
import type { LookupItemDto } from '@/features/shared/types';

export const useArticleFilter = () => {
    const [topics, setTopics] = useState<LookupItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTopics = async () => {
            setIsLoading(true);
            try {
                const topicsList = await apiTopicsGetLookupList();
                setTopics(topicsList);
            } catch (error) {
                console.error('Failed to fetch topics:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopics();
    }, []);

    return {
        topics,
        isLoading,
    };
};
