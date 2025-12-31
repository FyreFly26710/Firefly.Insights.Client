import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Stack,
} from '@mui/material';
import type { TopicListRequest } from '@/features/articles/api-types';
import { useTopicFilter } from '../../hooks/useTopicFilter';
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

    // Categories lookup list from hook
    const { categories, isLoading } = useTopicFilter();

    // Debounce Logic: Only trigger API call after user stops typing for 500ms
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== query.topicName) {
                onFilterChange({ topicName: searchTerm });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, query.topicName, onFilterChange]);

    // Clear Search Helper
    const handleClearSearch = () => {
        setSearchTerm('');
        onFilterChange({ topicName: '' });
    };

    return (
        <Paper id="topic-filters" variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                {/* Title Search */}
                <SearchFilter
                    label="Search Topics"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClearSearch={handleClearSearch}
                />

                {/* Category Filter */}
                <TextField
                    select
                    label="Category"
                    size="small"
                    value={query.categoryId === undefined ? 'all' : query.categoryId.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        onFilterChange({
                            categoryId: val === 'all' ? undefined : Number(val)
                        });
                    }}
                    disabled={isLoading}
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id.toString()}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Visibility Filter */}
                <VisibilityFilter
                    isHidden={query.isHidden}
                    onFilterChange={(isHidden) => onFilterChange({ isHidden })}
                />
            </Stack>
        </Paper>
    );
};