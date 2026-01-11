import React, { useState, useEffect } from 'react';
import { Paper, TextField, MenuItem, Stack } from '@mui/material';
import type { ArticleListRequest } from '@/features/articles/api-types';
import { SearchFilter } from '@/features/shared/components/SearchFilter';
import { useArticleFilter } from '../hooks/useArticleFilter';

interface ArticlesFilterProps {
    query: ArticleListRequest;
    onFilterChange: (updates: Partial<ArticleListRequest>) => void;
}

export const ArticlesFilter: React.FC<ArticlesFilterProps> = ({ query, onFilterChange }) => {
    // Local state for the search text to handle debouncing
    const [searchTerm, setSearchTerm] = useState(query.articleTitle || '');

    // Topics lookup list state
    const { topics, isLoading } = useArticleFilter();

    // Debounce Logic: Only trigger API call after user stops typing for 500ms
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== (query.articleTitle || '')) {
                onFilterChange({ articleTitle: searchTerm });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, query.articleTitle, onFilterChange]);

    // Clear Search Helper
    const handleClearSearch = () => {
        setSearchTerm('');
        onFilterChange({ articleTitle: '' });
    };

    return (
        <Paper id="articles-filter" variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Title Search */}
                <SearchFilter label="Search Articles" searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleClearSearch={handleClearSearch} />

                {/* Topic Filter */}
                <TextField
                    select
                    label="Topic"
                    size="small"
                    value={query.topicId === undefined ? 'all' : query.topicId.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        onFilterChange({
                            topicId: val === 'all' ? undefined : Number(val),
                        });
                    }}
                    disabled={isLoading}
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="all">All Topics</MenuItem>
                    {topics.map((topic) => (
                        <MenuItem key={topic.id} value={topic.id.toString()}>
                            {topic.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
        </Paper>
    );
};
