import { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useAsync } from '@/features/shared/hooks/useAsync ';
import { aiModelsApi } from '../api/aiModelsApi';
import { AiModelsGrid } from '../components/AiModelsGrid';
import { PageHeader } from '@/components/Header/PageHeader';

export const AiModels = () => {
    const { data: models = [], isLoading, error, execute } = useAsync(aiModelsApi.getList);

    useEffect(() => {
        execute();
    }, [execute]);

    return (
        <Container
            id="ai-models-page"
            component="main"
            maxWidth="xl"
            sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <PageHeader title="AI Models" />

            {/* Grid */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <AiModelsGrid
                    models={models ?? []}
                    isLoading={isLoading}
                    error={error}
                />
            </Box>
        </Container>
    );
};
