import { Box, Typography, List, ListItem, ListItemText, Paper, ListItemButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SidebarArticle } from "../types";
import { Link } from 'react-router-dom';

type TopicSidebarProps = {
    topicId: number;
    name: string;
    description: string;
    imageUrl: string;
    topicArticles: SidebarArticle[];
}

// 1. Sidebar Container with fixed height and internal scrolling
const SidebarContainer = styled(Paper)(({ theme }) => ({
    width: 300,
    height: '100%',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],

    // Custom Scrollbar Styling (Webkit)
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.divider,
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

const HeaderImage = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
});

export const TopicSidebar = ({ topicId, name, description, imageUrl, topicArticles }: TopicSidebarProps) => {
    return (
        <SidebarContainer id="topic-sidebar" elevation={0}>
            <HeaderImage
                src={imageUrl || "https://ih1.redbubble.net/image.5582017600.4418/st,small,507x507-pad,600x600,f8f8f8.webp"}
                alt={name}
            />

            <Box sx={{ mt: 2, flexShrink: 0 }}>
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
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
                            sx={{ padding: 0 }}
                        >
                            <ListItemText
                                primary={article.title}
                                title={article.description}
                                slotProps={{
                                    primary: {
                                        variant: 'subtitle2',
                                        color: 'primary.main',
                                        sx: {
                                            cursor: 'pointer',
                                            '&:hover': { textDecoration: 'underline' }
                                        }
                                    }
                                }}

                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </SidebarContainer>
    );
}