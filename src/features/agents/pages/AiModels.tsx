import { useState } from "react";
import { Container, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAiModelsTable } from "../hooks/useAiModelsTable";
import { AiModelsGrid } from "../components/AiModelsGrid";
import { AiModelFormDrawer } from "../components/AiModelFormDrawer";
import { PageHeader } from "@/components/Header/PageHeader";
import { DeleteDialog } from "@/features/admins/components/common/DeleteDialog";
import { FormNotification } from "@/features/admins/components/common/FormNotification";
import { aiModelsApi } from "../api/aiModelsApi";

export const AiModels = () => {
  const { models, isLoading, error, refresh } = useAiModelsTable();

  // UI State for Dialogs and Drawers
  const [selectedAiModelId, setSelectedAiModelId] = useState<number | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Delete Dialog State
  const [modelToDelete, setModelToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

  // Notification State
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Action Handlers
  const handleCreate = () => {
    setSelectedAiModelId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedAiModelId(id);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    notify("AI Model saved successfully");
    refresh();
  };

  const handleDeleteClick = (id: number) => {
    const model = models.find((m) => m.aiModelId === id);
    if (model) {
      setModelToDelete({
        id: model.aiModelId,
        title: `${model.provider} - ${model.model}`,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modelToDelete) return;

    try {
      await aiModelsApi.delete(modelToDelete.id);
      notify("AI Model deleted successfully", "success");
      refresh();
    } catch (error) {
      notify("Failed to delete AI Model", "error");
    } finally {
      setModelToDelete(null);
    }
  };

  const notify = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setNotification({ open: true, message, severity });
  };

  return (
    <Container
      id="ai-models-page"
      component="main"
      maxWidth="xl"
      sx={{ py: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <PageHeader
        title="AI Models"
        action={
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
          >
            New AI Model
          </Button>
        }
      />

      {/* Grid */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <AiModelsGrid
          models={models}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </Box>

      <AiModelFormDrawer
        open={isFormOpen}
        aiModelId={selectedAiModelId}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      <DeleteDialog
        open={Boolean(modelToDelete)}
        title={modelToDelete?.title || ""}
        entityLabel="AI Model"
        onClose={() => setModelToDelete(null)}
        onConfirmFn={handleDeleteConfirm}
      />

      <FormNotification
        {...notification}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Container>
  );
};
