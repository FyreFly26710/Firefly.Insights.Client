import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Stack,
} from '@mui/material';
import type { ArticleListRequest } from '@/features/articles/api-types';
import { SearchFilter } from '../common/SearchFilter';
import { VisibilityFilter } from '../common/VisibilityFilter';

interface ArticleFiltersProps {
    query: ArticleListRequest;
    onFilterChange: (updates: Partial<ArticleListRequest>) => void;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({
    query,
    onFilterChange
}) => {
    // Local state for the search text to handle debouncing
    const [searchTerm, setSearchTerm] = useState(query.articleTitle || '');

    // 1. Debounce Logic: Only trigger API call after user stops typing for 500ms
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== query.articleTitle) {
                onFilterChange({ articleTitle: searchTerm });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // 2. Clear Search Helper
    const handleClearSearch = () => {
        setSearchTerm('');
        onFilterChange({ articleTitle: '' });
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                {/* Title Search */}
                <SearchFilter
                    label="Search Articles"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClearSearch={handleClearSearch}
                />

                {/* Visibility Filter */}
                <VisibilityFilter
                    isHidden={query.isHidden}
                    onFilterChange={(isHidden) => onFilterChange({ isHidden })}
                />

                {/* Topic Type Filter */}
                <TextField
                    select
                    label="Topic Type"
                    size="small"
                    value={query.isTopicSummary === undefined ? 'all' : query.isTopicSummary.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        onFilterChange({
                            isTopicSummary: val === 'all' ? undefined : val === 'true'
                        });
                    }}
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="all">Any Type</MenuItem>
                    <MenuItem value="true">Topic Summaries</MenuItem>
                    <MenuItem value="false">Standard Articles</MenuItem>
                </TextField>

            </Stack>
        </Paper>
    );
};