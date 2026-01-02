import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorageIcon from '@mui/icons-material/Storage';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Flex from '@/components/Elements/Flex/Flex';

const SIDEBAR_WIDTH = 280;

const Sidebar = styled(Box)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
}));

const MainContent = styled('main')(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
}));

export const AgentLayout = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'Execution Logs', path: '/agents/execution-logs', icon: <AssignmentIcon /> },
        { text: 'Job Logs', path: '/agents/job-logs', icon: <StorageIcon /> },
        { text: 'AI Models', path: '/agents/ai-models', icon: <SmartToyIcon /> },
        { text: 'Generate', path: '/agents/agents/generate', icon: <AutoFixHighIcon /> },
    ];

    return (
        <Flex id="agent-layout" height="100%" width="100%" overflow="hidden">
            {/* Sidebar */}
            <Sidebar>
                <Box sx={{ p: 1, mx: 'auto' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                        Dashboard
                    </Typography>
                </Box>

                <Divider />

                <List sx={{ px: 1, mt: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={isActive}
                                    sx={{
                                        borderRadius: 1,
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.light',
                                            color: 'primary.contrastText',
                                            '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Sidebar>

            {/* Page Content */}
            <MainContent>
                <Outlet />
            </MainContent>
        </Flex>
    );
};