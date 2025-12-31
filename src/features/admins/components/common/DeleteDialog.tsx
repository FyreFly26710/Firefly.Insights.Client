import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface DeleteDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirmFn: () => Promise<void>;
  entityLabel?: string; // optional: "Article", "User", etc.
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  title,
  onClose,
  onConfirmFn,
  entityLabel = 'item',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirmFn();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      slotProps={{
        paper: { sx: { borderRadius: 2, p: 1 } },
      }}
    >
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}
      >
        <WarningAmberRoundedIcon color="error" />
        Delete {entityLabel}?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>"{title}"</strong>?  
          This action cannot be undone and the content will be permanently removed.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} disabled={isLoading} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
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
