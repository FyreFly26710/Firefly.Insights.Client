import { useState, useEffect } from 'react';
import { apiCategoriesGetLookupList } from '@/features/articles/api';
import type { LookupItemDto } from '@/features/shared/types';

export const useTopicFilter = () => {
    const [categories, setCategories] = useState<LookupItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const categoriesList = await apiCategoriesGetLookupList();
                setCategories(categoriesList);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return {
        categories,
        isLoading,
    };
};
