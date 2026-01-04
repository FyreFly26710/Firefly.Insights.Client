import { Container, Box} from '@mui/material';
import { useExecutionLogsTable } from '../hooks/useExecutionLogsTable';
import { ExecutionLogsGrid } from '../components/ExecutionLogsGrid';
import { PageHeader } from '@/components/Header/PageHeader';

export const ExecutionLogs = () => {
    const {
        executionLogs,
        totalCount,
        isLoading,
        query,
        updateQuery
    } = useExecutionLogsTable();

    // const [userIdFilter, setUserIdFilter] = useState<string>('');
    // const [aiModelIdFilter, setAiModelIdFilter] = useState<string>('');
    // const [isSuccessfulFilter, setIsSuccessfulFilter] = useState<boolean | undefined>(undefined);

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

    // const handleIsSuccessfulChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const checked = event.target.checked;
    //     setIsSuccessfulFilter(checked ? true : undefined);
    //     updateQuery({
    //         isSuccessful: checked ? true : undefined
    //     });
    // };

    return (
        <Container
            id="execution-logs-page"
            component="main"
            maxWidth="xl"
            sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <PageHeader title="Execution Logs" />
            {/* Grid */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <ExecutionLogsGrid
                    executionLogs={executionLogs}
                    totalCount={totalCount}
                    isLoading={isLoading}
                    query={query}
                    onQueryChange={updateQuery}
                />
            </Box>
        </Container>
    );
};
