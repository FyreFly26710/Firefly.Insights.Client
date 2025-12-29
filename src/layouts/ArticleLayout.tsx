import { useEffect, useMemo } from "react";
import { useParams, Outlet } from "react-router-dom";
import Flex from "@/components/Elements/Flex/Flex";
import { useAsync } from "@/features/shared/hooks/useAsync ";
import { apiTopicsGetById } from "@/features/articles/api";
import type { SidebarArticle } from "@/features/articles/types";
import { TopicSidebar } from "@/features/articles/components/TopicSidebar";
import { PageSpinner } from "@/components/Elements/Spinner/PageSpinner";
import { ErrorPageLayout } from "./ErrorPageLayout";
import { Container } from "@mui/material";

export const ArticleLayout = () => {
    const { topicId } = useParams();

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
                description: article.description,
            }));
    }, [data]);
    if (isLoading) {
        return <PageSpinner />;
    }
    if (error || !data) {
        return <ErrorPageLayout title="Error" message={error?.message ?? "Failed to load topic"} />;
    }

    return (

        <Flex id="article-layout" height="100%" width="100%">
            <TopicSidebar
                topicId={data?.topicId ?? 0}
                name={data?.name ?? ''}
                description={data?.description ?? ''}
                imageUrl={data?.imageUrl ?? ''}
                topicArticles={topicArticles}
            />
            <Container maxWidth="xl">
                <Outlet />
            </Container>

        </Flex>
    );
};