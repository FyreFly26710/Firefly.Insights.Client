import React from 'react';
import { Drawer, Box, Typography, Stack, Button, IconButton, Divider, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface UpsertDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    isLoading?: boolean;
    isSubmitting?: boolean;
    formId: string; // To link the footer button to the internal form
    children: React.ReactNode; // The "Body" (your text fields)
    submitLabel: string;
}

export const UpsertDrawer: React.FC<UpsertDrawerProps> = ({
    open,
    onClose,
    title,
    isLoading,
    isSubmitting,
    formId,
    children,
    submitLabel
}) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{ paper: { sx: { width: { xs: '100%', sm: 560 } } } }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight={700}>{title}</Typography>
                    <IconButton onClick={onClose} edge="end"><CloseIcon /></IconButton>
                </Box>
                <Divider />

                {/* Body */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
                    ) : (
                        children
                    )}
                </Box>
                <Divider />

                {/* Footer */}
                <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth variant="outlined" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            form={formId}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                            disabled={isSubmitting || isLoading}
                        >
                            {submitLabel}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};