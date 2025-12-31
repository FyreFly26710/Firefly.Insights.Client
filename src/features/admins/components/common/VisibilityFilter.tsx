import { MenuItem, TextField } from "@mui/material";

interface VisibilityFilterProps {
    isHidden?: boolean | undefined;
    onFilterChange: (isHidden: boolean | undefined) => void;
}

export const VisibilityFilter: React.FC<VisibilityFilterProps> = ({ isHidden, onFilterChange }) => {
    return (
        <TextField
            id="visibility-filter"
            select
            label="Status"
            size="small"
            value={isHidden === undefined ? 'all' : isHidden.toString()}
            onChange={(e) => {
                const val = e.target.value;
                onFilterChange(val === 'all' ? undefined : val === 'true');
            }}
            sx={{ minWidth: 150 }}
        >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="false">Visible Only</MenuItem>
            <MenuItem value="true">Hidden Only</MenuItem>
        </TextField>

    );
};