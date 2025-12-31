import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Stack,
} from '@mui/material';
import type { TopicListRequest } from '@/features/articles/api-types';
import { SearchFilter } from '../common/SearchFilter';
import { VisibilityFilter } from '../common/VisibilityFilter';

interface TopicFiltersProps {
    query: TopicListRequest;
    onFilterChange: (updates: Partial<TopicListRequest>) => void;
}

export const TopicFilters: React.FC<TopicFiltersProps> = ({
    query,
    onFilterChange
}) => {
    // Local state for the search text to handle debouncing
    const [searchTerm, setSearchTerm] = useState(query.topicName || '');

    // 1. Debounce Logic: Only trigger API call after user stops typing for 500ms
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== query.topicName) {
                onFilterChange({ topicName: searchTerm });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // 2. Clear Search Helper
    const handleClearSearch = () => {
        setSearchTerm('');
        onFilterChange({ topicName: '' });
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                {/* Title Search */}
                <SearchFilter
                    label="Search Topics"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClearSearch={handleClearSearch}
                />

                {/* Visibility Filter */}
                <VisibilityFilter
                    isHidden={query.isHidden}
                    onFilterChange={(isHidden) => onFilterChange({ isHidden })}
                />
            </Stack>
        </Paper>
    );
};