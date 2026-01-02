import GmailLoginBtn from "@/features/auth/components/GmailLoginBtn";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useRedirectAfterLogin } from "@/features/auth/hooks/useRedirectAfterLogin";
import { Box, Divider, Paper, Typography, Container } from "@mui/material";

export const Login = () => {
    const redirectAfterLogin = useRedirectAfterLogin();

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                px: 2,
                transition: 'background-color 0.3s ease'
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                        backgroundImage: 'none'
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Please enter your details to sign in
                    </Typography>

                    <GmailLoginBtn />

                    <Divider sx={{ my: 3, typography: 'caption', color: 'text.disabled' }}>
                        OR
                    </Divider>

                    <LoginForm onSuccess={redirectAfterLogin} />

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                            Don't have an account?
                            <Box
                                component="span"
                                sx={{
                                    color: 'primary.main',
                                    cursor: 'pointer',
                                    ml: 0.5,
                                    fontWeight: 600,
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Sign up for free
                            </Box>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};