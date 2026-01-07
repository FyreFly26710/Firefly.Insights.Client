import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { UpsertDrawer } from "@/components/Drawers/UpsertDrawer";
import Flex from "@/components/Elements/Flex/Flex";
import type { AiProviderDto } from "../api-types/aiProviders";

interface AiProviderApiKeyDrawerProps {
  open: boolean;
  provider: AiProviderDto | null;
  onClose: () => void;
  onUpdate: (newApiKey: string) => Promise<void>;
  isSubmitting?: boolean;
}

export const AiProviderApiKeyDrawer: React.FC<AiProviderApiKeyDrawerProps> = ({
  open,
  provider,
  onClose,
  onUpdate,
  isSubmitting = false,
}) => {
  const [newApiKey, setNewApiKey] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newApiKey.trim()) {
      await onUpdate(newApiKey);
      setNewApiKey("");
    }
  };

  return (
    <UpsertDrawer
      open={open}
      onClose={onClose}
      title="Update API Key"
      formId="update-api-key-form"
      submitLabel="Update Key"
      isSubmitting={isSubmitting}
      width={400}
    >
      <Box
        component="form"
        id="update-api-key-form"
        onSubmit={handleSubmit}
        sx={{ height: "100%" }}
      >
        <Flex direction="column" gap={24} width="100%">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Provider Name
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {provider?.name || "N/A"}
            </Typography>
          </Box>

          <TextField
            label="Current API Key"
            fullWidth
            value={provider?.apiKey || ""}
            disabled
            variant="filled"
            helperText="Existing key is masked for security"
          />

          <TextField
            label="New API Key"
            fullWidth
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
            placeholder="Paste your new API key here"
            required
            autoFocus
          />
        </Flex>
      </Box>
    </UpsertDrawer>
  );
};
