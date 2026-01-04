import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Flex from "@/components/Elements/Flex/Flex";
import { useAsync } from "@/features/shared/hooks/useAsync ";
import { apiTopicsGetById } from "@/features/articles/api";
import { TopicSidebar } from "@/features/articles/components/TopicSidebar";
import { PageSpinner } from "@/components/Elements/Spinner/PageSpinner";
import { ErrorPageLayout } from "./ErrorPageLayout";
import { Box, Container, IconButton } from "@mui/material";
import type { SidebarArticle } from "@/features/articles/types";
import MenuIcon from '@mui/icons-material/Menu';

export const ArticleLayout = () => {
    const { topicId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { data, isLoading, error, execute } = useAsync(apiTopicsGetById);

    useEffect(() => {
        if (topicId) {
            execute(Number(topicId));
        }
    }, [topicId, execute]);

    const topicArticles: SidebarArticle[] = useMemo(() => {
        if (!data) return [];

        return data.topicArticles
            .filter((article) => !article.isHidden)
            // .filter((article) => !article.isTopicSummary)
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

            <Box sx={{ flexGrow: 1, height: '100%', overflowY: 'auto', minWidth: 0, position: 'relative' }}>
                {/* Floating Toggle Button */}
                <IconButton
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    sx={{
                        position: 'fixed',
                        left: isSidebarOpen ? 310 : 10, // Adjust based on sidebar width
                        top: 70,
                        zIndex: 10,
                        transition: 'left 0.3s ease',
                        bgcolor: 'background.paper',
                        boxShadow: 2,
                        '&:hover': { bgcolor: 'action.hover' }
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