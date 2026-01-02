import { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import { PageHeader } from '@/components/Header/PageHeader';
import { GenerateTopicArticlesForm } from '../components/GenerateTopicArticlesForm';
import { articleGenerationsApi } from '../api/articleGenerationsApi';
import type { GenerateArticleSummaryRequest } from '../api-types';

export const Generate = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTopicSubmit = async (data: GenerateArticleSummaryRequest) => {
        try {
            await articleGenerationsApi.generateArticleSummary(data);
            // Optionally show a success snackbar here
        } catch (error) {
            console.error('Submission failed', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 2 }}>
            <PageHeader title="AI Generation Center" />

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={currentTab} onChange={(_, val) => setCurrentTab(val)}>
                    <Tab label="Topic Articles" />
                    {/* <Tab label="Other Job Type" disabled /> */}
                </Tabs>
            </Box>

            {currentTab === 0 && (
                <GenerateTopicArticlesForm onSubmit={handleTopicSubmit} />
            )}
        </Container>
    );
};