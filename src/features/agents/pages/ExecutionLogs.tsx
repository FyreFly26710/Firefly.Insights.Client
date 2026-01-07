import { Container, Box } from "@mui/material";
import { useExecutionLogsTable } from "../hooks/useExecutionLogsTable";
import { ExecutionLogsGrid } from "../components/ExecutionLogsGrid";
import { PageHeader } from "@/components/Header/PageHeader";
import { ExecutionJobDrawer } from "../components/ExecutionJobDrawer";

export const ExecutionLogs = () => {
  const {
    executionLogs,
    totalCount,
    isLoading,
    query,
    updateQuery,
    selectedLog,
    isDrawerOpen,
    handleRowDoubleClick,
    closeDrawer,
  } = useExecutionLogsTable();

  return (
    <Container
      id="execution-logs-page"
      component="main"
      maxWidth="xl"
      sx={{ py: 2, height: "100%", display: "flex", flexDirection: "column" }}
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
          onRowDoubleClick={handleRowDoubleClick}
        />
      </Box>

      <ExecutionJobDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        selectedLog={selectedLog}
      />
    </Container>
  );
};
