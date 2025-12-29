import { TextField, Button, Alert, Box, Typography, CircularProgress } from '@mui/material';
import { useLoginUser } from '../hooks/useLoginUser';

export const LoginForm = () => {
    const { values, handleChange, onSubmit, error, isSubmitting } = useLoginUser();

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                width: '100%'
            }}
        >
            <TextField
                name="userAccount"
                label="Account ID"
                variant="outlined"
                fullWidth
                value={values.userAccount}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="username"
            />

            <TextField
                name="userPassword"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={values.userPassword}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="current-password"
            />

            {error && (
                <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    boxShadow: 3
                }}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
        </Box>
    );
};