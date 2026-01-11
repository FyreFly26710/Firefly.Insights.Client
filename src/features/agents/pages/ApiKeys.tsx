import { useState, useEffect } from "react";
import { Container, Box, CircularProgress, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { PageHeader } from "@/components/Header/PageHeader";
import { aiProvidersApi } from "../api/aiProvidersApi";
import type { AiProviderDto } from "../api-types/aiProviders";
import { useAsync } from "@/features/shared/hooks/useAsync";
import { AiProviderApiKeyDrawer } from "../components/AiProviderApiKeyDrawer";

export const ApiKeys = () => {
  const {
    data: providerData,
    isLoading,
    execute,
  } = useAsync(aiProvidersApi.getList);
  const [providers, setProviders] = useState<AiProviderDto[]>([]);
  const [selectedProvider, setSelectedProvider] =
    useState<AiProviderDto | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (providerData) {
      setProviders(providerData);
    }
  }, [providerData]);

  useEffect(() => {
    execute();
  }, [execute]);

  const handleRowDoubleClick = (params: GridRowParams<AiProviderDto>) => {
    setSelectedProvider(params.row);
    setIsDrawerOpen(true);
  };

  const handleUpdateApiKey = async (newApiKey: string) => {
    if (!selectedProvider) return;

    try {
      setIsUpdating(true);
      await aiProvidersApi.update(selectedProvider.aiProviderId, {
        apiKey: newApiKey,
      });
      setIsDrawerOpen(false);
      execute(); // Refresh the list
    } catch (error) {
      console.error("Failed to update API key", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Provider Name",
      width: 200,
      sortable: false,
    },
    {
      field: "apiKey",
      headerName: "API Key",
      flex: 1,
      sortable: false,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: "100%", display: "flex", flexDirection: "column" }}>
      <PageHeader title="AI API Keys" />

      <Paper
        variant="outlined"
        sx={{ height: "100%", width: "100%", bgcolor: "background.paper" }}
      >
        <DataGrid
          rows={providers || []}
          columns={columns}
          getRowId={(row) => row.aiProviderId}
          loading={isLoading}
          onRowDoubleClick={handleRowDoubleClick}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Paper>

      <AiProviderApiKeyDrawer
        key={selectedProvider?.aiProviderId || "new"}
        open={isDrawerOpen}
        provider={selectedProvider}
        onClose={() => setIsDrawerOpen(false)}
        onUpdate={handleUpdateApiKey}
        isSubmitting={isUpdating}
      />
    </Container>
  );
};
