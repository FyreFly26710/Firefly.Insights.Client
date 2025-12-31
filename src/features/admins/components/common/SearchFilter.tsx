import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";

interface SearchFilterProps {
    label: string;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    handleClearSearch: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ label, searchTerm, setSearchTerm, handleClearSearch }) => {
    return (
        <TextField
            label={label}
            size="small"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
            slotProps={{
                input: {
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
                }
            }}
        />
    );
};