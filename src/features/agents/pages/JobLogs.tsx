import { Container, Box } from '@mui/material';
import { useJobLogsTable } from '../hooks/useJobLogsTable';
import { JobLogsGrid } from '../components/JobLogsGrid';
import { PageHeader } from '@/components/Header/PageHeader';

export const JobLogs = () => {
    const {
        jobLogs,
        totalCount,
        isLoading,
        query,
        updateQuery
    } = useJobLogsTable();

    // const [userIdFilter, setUserIdFilter] = useState<string>('');
    // const [aiModelIdFilter, setAiModelIdFilter] = useState<string>('');
    // const [jobTypeFilter, setJobTypeFilter] = useState<string>('');
    // const [statusFilter, setStatusFilter] = useState<string>('');

    // const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setUserIdFilter(value);
    //     updateQuery({
    //         userId: value ? parseInt(value, 10) : undefined
    //     });
    // };

    // const handleAiModelIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setAiModelIdFilter(value);
    //     updateQuery({
    //         aiModelId: value ? parseInt(value, 10) : undefined
    //     });
    // };

    // const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setJobTypeFilter(value);
    //     updateQuery({
    //         jobType: value || undefined
    //     });
    // };

    // const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setStatusFilter(value);
    //     updateQuery({
    //         status: value || undefined
    //     });
    // };

    return (
        <Container
            id="job-logs-page"
            component="main"
            maxWidth="xl"
            sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <PageHeader title="Job Logs" />

            {/* Filters */}


            {/* Grid */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <JobLogsGrid
                    jobLogs={jobLogs}
                    totalCount={totalCount}
                    isLoading={isLoading}
                    query={query}
                    onQueryChange={updateQuery}
                />
            </Box>
        </Container>
    );
};
