import { Snackbar, Alert, type AlertColor } from '@mui/material';

interface FormNotificationProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
}

export const FormNotification: React.FC<FormNotificationProps> = ({ open, message, severity, onClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
        <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
);