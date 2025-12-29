import { useParams } from "react-router-dom";
import { useAsync } from "@/features/shared/hooks/useAsync ";
import { apiArticlesGetById } from "../api";
import { useEffect } from "react";
import { ErrorPageLayout } from "@/layouts/ErrorPageLayout";
import { ArticleHeaderCard } from "../components/ArticleHeaderCard";
import { ArticleContentCard } from "../components/ArticleContentCard";
import Flex from "@/components/Elements/Flex/Flex";
import { PageSpinner } from "@/components/Elements/Spinner/PageSpinner";

export const ArticlePage = () => {
    const { topicId, articleId } = useParams();
    const { data, isLoading, error, execute } = useAsync(apiArticlesGetById);

    useEffect(() => {
        if (articleId) {
            execute(Number(articleId));
        }
    }, [articleId, execute]);
    if (isLoading) {
        return <PageSpinner />;
    }

    if (error || !data) {
        return <ErrorPageLayout title="Error" message={error?.message ?? "Failed to load article"} />;
    }

    return (
        <Flex id="article-page" direction="column" gap={8} height="100%" width="100%">
            <ArticleHeaderCard title={data.title} description={data.description} userName={data.userName} tags={data.tags.map(t => t.name)} />
            <ArticleContentCard content={data.content} />
        </Flex>
    );
}