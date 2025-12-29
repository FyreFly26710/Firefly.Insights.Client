import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box, Typography, IconButton, Avatar, Menu,
    MenuItem, Tooltip, Button, Divider, ListItemIcon
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

import { useUserStore } from "@/stores/useUserStore";

export const UserHeaderAction = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useUserStore();

    // Menu State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleCloseMenu();
        logout();
        navigate("/login");
    };

    if (!isAuthenticated || !user) {
        return (
            <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                startIcon={<LoginIcon />}
                sx={{ borderRadius: 2, textTransform: 'none' }}
            >
                Sign In
            </Button>
        );
    }

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton onClick={handleOpenMenu} size="small" sx={{ ml: 1 }}>
                    <Avatar
                        src={user.userAvatar}
                        alt={user.userName}
                        sx={{ width: 32, height: 32, border: (theme) => `1px solid ${theme.palette.divider}` }}
                    >
                        {user.userName.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 3,
                    sx: { borderRadius: 2, mt: 1.5, minWidth: 200 }
                }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>{user.userName}</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                        {user.userEmail}
                    </Typography>
                </Box>

                <Divider />

                <MenuItem onClick={() => { handleCloseMenu(); navigate('/profile'); }}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    My Profile
                </MenuItem>

                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};