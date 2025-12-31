import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    Stack,
} from '@mui/material';
import { SearchFilter } from '../common/SearchFilter';
import { VisibilityFilter } from '../common/VisibilityFilter';

interface CategoryFiltersProps {
    categoryName?: string;
    isHidden?: boolean;
    onFilterChange: (updates: { categoryName?: string; isHidden?: boolean }) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    categoryName,
    isHidden,
    onFilterChange
}) => {
    // Local state for the search text to handle debouncing
    const [searchTerm, setSearchTerm] = useState(categoryName || '');

    // Debounce Logic: Only trigger API call after user stops typing for 500ms
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== categoryName) {
                onFilterChange({ categoryName: searchTerm });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, categoryName, onFilterChange]);

    // Clear Search Helper
    const handleClearSearch = () => {
        setSearchTerm('');
        onFilterChange({ categoryName: '' });
    };

    return (
        <Paper id="category-filters" variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* Title Search */}
                <SearchFilter
                    label="Search Categories"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClearSearch={handleClearSearch}
                />

                {/* Visibility Filter */}
                <VisibilityFilter
                    isHidden={isHidden}
                    onFilterChange={(isHidden) => onFilterChange({ isHidden })}
                />
            </Stack>
        </Paper>
    );
};
