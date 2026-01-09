import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { topicsApi } from '../api/topicsApi';
import { useAsync } from '@/features/shared/hooks/useAsync ';
import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';

export const TopicPage = () => {
    const { topicId } = useParams();
    const { data, isLoading, error, execute } = useAsync(topicsApi.getSummaryArticleId);
    useEffect(() => {
        if (topicId) {
            execute(Number(topicId));
        }
    }, [topicId, execute]);

    if (isLoading) {
        return <PageSpinner />;
    }

    if (error) {
        return <ErrorPageLayout title="Topic Error" message={error?.message ?? 'Failed to load topic summary article'} />;
    }
    // if no summary article is found, return empty page
    if (data == null || data == 0) {
        return <></>;
    }
    return <Navigate to={`/topics/${topicId}/articles/${data}`} replace={true} />;
};
