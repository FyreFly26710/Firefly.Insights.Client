import { Box, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                px: 3,
                bgcolor: 'background.default'
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: '5rem', md: '8rem' },
                    fontWeight: 900,
                    letterSpacing: -4,
                    color: 'text.disabled',
                    opacity: 0.2,
                    mb: -2
                }}
            >
                403
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                Access Restricted
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 400, mb: 4, lineHeight: 1.6 }}
            >
                You don't have permission to access this area.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Button
                    onClick={() => navigate('/')}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                    }}
                >
                    Back to Home
                </Button>

                <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/login')}
                    sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' }
                    }}
                >
                    Sign in as Admin
                </Link>
            </Box>
        </Box>
    );
};