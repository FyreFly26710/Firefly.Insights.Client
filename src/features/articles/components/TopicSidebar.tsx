import { Box, Typography, List, ListItem, ListItemText, Paper, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SidebarArticle } from "../types";
import { Link } from 'react-router-dom';

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
type TopicSidebarProps = {
    topicId: number;
    name: string;
    imageUrl: string;
    topicArticles: SidebarArticle[];
    isOpen: boolean;
}
export const TopicSidebar = ({ isOpen, topicId, name, imageUrl, topicArticles }: TopicSidebarProps) => {
    return (
        <SidebarContainer id="topic-sidebar" elevation={0} isOpen={isOpen}>
            <HeaderImage
                src={imageUrl || "https://ih1.redbubble.net/image.5582017600.4418/st,small,507x507-pad,600x600,f8f8f8.webp"}
                alt={name}
            />

            <Box sx={{ mt: 2, flexShrink: 0 }}>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                    {name}
                </Typography>
            </Box>

            <List sx={{ width: '100%', mt: 1 }}>
                {topicArticles.map((article) => (
                    <ListItem
                        key={article.articleId}
                        disablePadding
                    >
                        <ListItemButton
                            component={Link}
                            to={`/topics/${topicId}/articles/${article.articleId}`}
                            sx={{ p: 0 }}
                        >
                            <ListItemText
                                primary={article.title}
                                title={article.title}
                                slotProps={{
                                    primary: {
                                        variant: 'subtitle2',
                                        color: 'primary.main',
                                        noWrap: true,
                                        sx: {
                                            minWidth: 0,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            cursor: 'pointer',
                                            '&:hover': { textDecoration: 'underline' },
                                        },
                                    },
                                }}
                            />
                        </ListItemButton>

                    </ListItem>
                ))}
            </List>
        </SidebarContainer>
    );
}