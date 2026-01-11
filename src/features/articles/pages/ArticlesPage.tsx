import { useAsync } from '@/features/shared/hooks/useAsync';
import { articlesApi } from '../api/articlesApi';
import { ArticleGrid } from '../components/ArticleGrid';
import { useEffect } from 'react';
import { CircularProgress, Container } from '@mui/material';
import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';

export const ArticlesPage = () => {
    const { data, isLoading, error, execute } = useAsync(articlesApi.getList);
    useEffect(() => {
        execute({
            pageNumber: 1,
            pageSize: 25,
            sortField: 'updatedAt',
            isAscending: false,
        });
    }, [execute]);

    if (isLoading) return <CircularProgress />;
    if (error) return <ErrorPageLayout title="Error" message={error.message} />;

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
            <ArticleGrid pagedData={data!} isLoading={isLoading} />
        </Container>
    );
};
