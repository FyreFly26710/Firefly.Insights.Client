import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface ArticleDeleteDialogProps {
    open: boolean;
    title: string;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ArticleDeleteDialog: React.FC<ArticleDeleteDialogProps> = ({
    open,
    title,
    isLoading,
    onClose,
    onConfirm
}) => {
    return (
        <Dialog
            open={open}
            onClose={isLoading ? undefined : onClose}
            PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
                <WarningAmberRoundedIcon color="error" />
                Delete Article?
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>"{title}"</strong>?
                    This action cannot be undone and the content will be permanently removed from the system.
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button
                    onClick={onClose}
                    disabled={isLoading}
                    sx={{ color: 'text.secondary' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {isLoading ? 'Deleting...' : 'Delete Permanently'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};