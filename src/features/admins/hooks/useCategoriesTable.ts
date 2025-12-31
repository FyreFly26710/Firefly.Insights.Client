import { useState, useEffect, useCallback } from 'react';
import { apiCategoriesGetList } from '@/features/articles/api';
import type { CategoryDto } from '@/features/articles/api-types';

export const useCategoriesTable = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await apiCategoriesGetList();
            setCategories(result);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const refresh = () => fetchCategories();

    return {
        // Data & State
        categories,
        isLoading,

        // Actions
        refresh
    };
};
