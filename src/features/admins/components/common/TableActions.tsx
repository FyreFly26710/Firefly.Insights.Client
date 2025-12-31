import React from 'react';
import { IconButton, Stack, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface TableActionsProps {
    id: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TableActions: React.FC<TableActionsProps> = ({ id, onEdit, onDelete }) => {
    return (
        <Stack id="table-actions" direction="row" spacing={1} justifyContent="flex-end" sx={{ width: '100%' }}>
            <Tooltip title="Edit">
                <IconButton size="small" color="primary" onClick={() => onEdit(id)}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton size="small" color="error" onClick={() => onDelete(id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
};