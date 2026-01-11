import { Suspense, useEffect, useMemo, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Flex from '@/components/Elements/Flex/Flex';
import { useAsync } from '@/features/shared/hooks/useAsync';
import { topicsApi } from '@/features/articles/api/topicsApi';
import { TopicSidebar } from '@/features/articles/components/TopicSidebar';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { ErrorPageLayout } from './ErrorPageLayout';
import { Box, Container, IconButton } from '@mui/material';
import type { SidebarArticle } from '@/features/articles/types';
import MenuIcon from '@mui/icons-material/Menu';

export const ArticleLayout = () => {
    const { topicId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { data, isLoading, error, execute } = useAsync(topicsApi.getById);

    useEffect(() => {
        if (topicId) {
            execute(Number(topicId));
        }
    }, [topicId, execute]);

    const topicArticles: SidebarArticle[] = useMemo(() => {
        if (!data) return [];

        return data.topicArticles
            .filter((article) => !article.isHidden && !article.isTopicSummary)
            .sort((a, b) => a.sortNumber - b.sortNumber)
            .map((article) => ({
                articleId: article.articleId,
                title: article.title,
            }));
    }, [data]);

    if (error) {
        return <ErrorPageLayout title="Error" message={error.message} />;
    }

    return (
        <Flex id="article-layout" height="100%" width="100%" overflow="hidden">
            {/* Sidebar now receives the open state */}
            <TopicSidebar
                isOpen={isSidebarOpen}
                topicId={data?.topicId ?? 0}
                name={data?.name ?? ''}
                imageUrl={data?.imageUrl ?? ''}
                topicArticles={topicArticles}
                isLoading={isLoading}
            />

            <Box
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    overflowY: 'auto',
                    minWidth: 0,
                    position: 'relative',
                }}
            >
                {/* Floating Toggle Button */}
                <IconButton
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    sx={{
                        position: 'fixed',
                        left: isSidebarOpen ? 280 : 10,
                        top: 80,
                        zIndex: 1200,
                        transition: (theme) =>
                            theme.transitions.create(['left'], {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: 3,
                        '&:hover': { bgcolor: 'primary.main', color: 'white' },
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <Suspense fallback={<PageSpinner />}>
                        <Outlet />
                    </Suspense>
                </Container>
            </Box>
        </Flex>
    );
};
