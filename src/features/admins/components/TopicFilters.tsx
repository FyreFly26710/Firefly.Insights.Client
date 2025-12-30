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
import type { TopicListRequest } from '@/features/articles/api-types';

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
                <TextField
                    label="Search Topics"
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

            </Stack>
        </Paper>
    );
};