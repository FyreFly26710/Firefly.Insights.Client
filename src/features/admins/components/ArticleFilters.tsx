import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Stack,
    InputAdornment,
    IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { ArticleListRequest } from '../types';

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
                <TextField
                    label="Search Articles"
                    size="small"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={handleClearSearch}>
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {/* Visibility Filter */}
                <TextField
                    select
                    label="Status"
                    size="small"
                    value={query.isHidden === undefined ? 'all' : query.isHidden.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        onFilterChange({
                            isHidden: val === 'all' ? undefined : val === 'true'
                        });
                    }}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="false">Visible Only</MenuItem>
                    <MenuItem value="true">Hidden Only</MenuItem>
                </TextField>

                {/* Topic Summary Filter */}
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