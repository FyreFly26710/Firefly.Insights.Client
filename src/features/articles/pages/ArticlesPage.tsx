import { Container } from '@mui/material';
import { useArticles } from '../hooks/useArticles';
import { ArticleGrid } from '../components/ArticleGrid';
import { ArticlesFilter } from '../components/ArticlesFilter';
import { PageHeader } from '@/components/Header/PageHeader';
import { useMemo } from 'react';

export const ArticlesPage = () => {
    const { articles, totalCount, isLoading, query, updateQuery } = useArticles();
    const filteredArticles = useMemo(() => {
        return articles.filter((article) => article.isTopicSummary === false);
    }, [articles]);
    return (
        <Container
            id="articles-page"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                padding: '8px !important',
            }}
        >
            <PageHeader title="Latest Articles" />

            <ArticlesFilter query={query} onFilterChange={updateQuery} />

            <ArticleGrid articles={filteredArticles} totalCount={totalCount} isLoading={isLoading} query={query} onQueryChange={updateQuery} />
        </Container>
    );
};
