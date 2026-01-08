import { Box, Typography, List, ListItem, ListItemText, Paper, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SidebarArticle } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { alpha } from '@mui/material/styles';
type TopicSidebarProps = {
    topicId: number;
    name: string;
    imageUrl: string;
    topicArticles: SidebarArticle[];
    isOpen: boolean;
    isLoading: boolean;
};

const SidebarContainer = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen?: boolean }>(({ theme, isOpen }) => ({
    width: isOpen ? 300 : 0,
    height: '100%',
    padding: isOpen ? theme.spacing(1) : 0,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: isOpen ? theme.shadows[3] : 'none',
    flexShrink: 0,
    transition: theme.transitions.create(['width', 'padding'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}));

const HeaderImage = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
});
export const TopicSidebar = ({ isOpen, topicId, name, imageUrl, topicArticles, isLoading }: TopicSidebarProps) => {
    const location = useLocation();

    return (
        <SidebarContainer id="topic-sidebar" elevation={0} isOpen={isOpen}>
            {isLoading ? (
                <PageSpinner />
            ) : (
                <>
                    {imageUrl && <HeaderImage src={imageUrl} alt={name} />}

                    <Box sx={{ px: 1, mt: 1, flexShrink: 0 }}>
                        <Typography variant="overline" color="text.secondary" fontWeight="bold">
                            Topic
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom fontWeight="800" sx={{ lineHeight: 1.2 }}>
                            {name}
                        </Typography>
                    </Box>

                    <List sx={{ width: '100%', mt: 1, px: 1 }}>
                        {topicArticles.map((article) => {
                            const targetPath = `/topics/${topicId}/articles/${article.articleId}`;
                            const isSelected = location.pathname === targetPath;

                            return (
                                <ListItem key={article.articleId} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        component={Link}
                                        to={targetPath}
                                        selected={isSelected}
                                        sx={{
                                            borderRadius: '8px',
                                            py: 0.5,
                                            px: 1.5,
                                            // Custom styling for the "Selected" state
                                            '&.Mui-selected': {
                                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                                color: 'primary.main',
                                                '&:hover': {
                                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                                                },
                                                // Left "Active" indicator bar
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: 0,
                                                    height: '60%',
                                                    width: '4px',
                                                    borderRadius: '0 4px 4px 0',
                                                    backgroundColor: 'primary.main',
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={article.title}
                                            slotProps={{
                                                primary: {
                                                    variant: 'body2',
                                                    fontWeight: isSelected ? 600 : 400,
                                                    noWrap: true,
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </>
            )}
        </SidebarContainer>
    );
};
