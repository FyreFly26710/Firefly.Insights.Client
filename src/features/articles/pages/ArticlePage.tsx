import { useParams } from 'react-router-dom';
import { useAsync } from '@/features/shared/hooks/useAsync ';
import { articlesApi } from '../api/articlesApi';
import { useEffect } from 'react';
import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';
import { ArticleHeaderCard } from '../components/ArticleHeaderCard';
import { ArticleContentCard } from '../components/ArticleContentCard';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { Box, styled, Typography, useTheme } from '@mui/material';

const ArticlePageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: theme.spacing(1),
}));

export const ArticlePage = () => {
    const { articleId } = useParams();
    const { data, isLoading, error, execute } = useAsync(articlesApi.getById);
    const theme = useTheme();
    useEffect(() => {
        if (articleId) {
            execute(Number(articleId));
        }
    }, [articleId, execute]);
    if (isLoading) {
        return <PageSpinner />;
    }

    if (error || !data) {
        return <ErrorPageLayout title="Error" message={error?.message ?? 'Failed to load article'} />;
    }

    return (
        <ArticlePageContainer id="article-page">
            {data.isTopicSummary ? (
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'text.primary', padding: theme.spacing(2) }}>
                    {data.topicName}
                </Typography>
            ) : (
                <ArticleHeaderCard
                    title={data.title}
                    description={data.description}
                    userName={data.userName}
                    userAvatar={data.userAvatar}
                    tags={data.tags.map((t) => t.name)}
                />
            )}
            <ArticleContentCard content={data.content} />
        </ArticlePageContainer>
    );
};
