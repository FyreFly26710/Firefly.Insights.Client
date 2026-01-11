import { useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GOOGLE_CLIENT_ID, API_URL } from '@/config';
import { useUserStore } from '@/stores/useUserStore';

const GoogleIcon = () => (
    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);

const StyledButton = styled(Button)(({ theme }) => {
    const isDark = theme.palette.mode === 'dark';
    return {
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1.5),
        backgroundColor: isDark ? theme.palette.grey[900] : theme.palette.common.white,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: Number(theme.shape.borderRadius) * 2,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.95rem',
        boxShadow: isDark ? 'none' : theme.shadows[1],
        transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: isDark ? theme.palette.action.hover : theme.palette.grey[50],
            borderColor: isDark ? theme.palette.primary.main : theme.palette.grey[400],
            boxShadow: theme.shadows[2],
        },
    };
});

const GoogleLoginButton = () => {

    const handleGoogleLogin = () => {
        const redirectUri = encodeURIComponent(`${API_URL}/api/identity/auth/signin-google`);
        const scope = encodeURIComponent('profile email');
        const stateData = {
            origin: encodeURIComponent(window.location.origin),
            apiUrl: API_URL
        };
        const statePayload = btoa(JSON.stringify(stateData));
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${statePayload}`;

        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            authUrl,
            "google_login",
            `width=${width},height=${height},left=${left},top=${top},status=no,location=no,toolbar=no,menubar=no`
        );

        if (popup) popup.focus();
    };

    return (
        <StyledButton
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            variant="outlined"
            fullWidth
        >
            Continue with Google
        </StyledButton>
    );
};

export default GoogleLoginButton;