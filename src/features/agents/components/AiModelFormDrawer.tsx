import React from "react";
import { TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { useAiModelForm } from "../hooks/useAiModelForm";
import { UpsertDrawer } from "@/components/Drawers/UpsertDrawer";
import Flex from "@/components/Elements/Flex/Flex";

interface AiModelFormDrawerProps {
  open: boolean;
  aiModelId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const AiModelFormDrawer: React.FC<AiModelFormDrawerProps> = ({
  open,
  aiModelId,
  onClose,
  onSuccess,
}) => {
  const { form, onSubmit, isLoading, isSubmitting, isEdit } = useAiModelForm({
    aiModelId,
    onSuccess,
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <UpsertDrawer
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit AI Model" : "Create New AI Model"}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      formId="ai-model-form"
      submitLabel={isEdit ? "Update AI Model" : "Create AI Model"}
      width={560}
    >
      <Box
        component="form"
        id="ai-model-form"
        onSubmit={onSubmit}
        sx={{ height: "100%" }}
      >
        <Flex direction="column" gap={24} width="100%">
          {/* <TextField
            label="Provider"
            fullWidth
            {...register("provider", { required: "Provider is required" })}
            error={!!errors.provider}
            helperText={errors.provider?.message}
            placeholder="e.g. OpenAI, Anthropic"
          /> */}

          <TextField
            label="Model Name"
            fullWidth
            {...register("model", { required: "Model name is required" })}
            error={!!errors.model}
            helperText={errors.model?.message}
            placeholder="e.g. GPT-4, Claude 3"
          />

          <TextField
            label="Model ID"
            fullWidth
            {...register("modelId", { required: "Model ID is required" })}
            error={!!errors.modelId}
            helperText={errors.modelId?.message}
            placeholder="e.g. gpt-4-turbo-preview"
          />

          <TextField
            label="Display Name"
            fullWidth
            {...register("displayName")}
            placeholder="e.g. GPT-4, Claude 3"
          />

          <TextField
            label="Avatar URL"
            fullWidth
            {...register("avatar")}
            placeholder="https://example.com/avatar.png"
          />

          <Flex direction="row" gap={24}>
            <TextField
              label="Input Price"
              type="number"
              fullWidth
              {...register("inputPrice", { valueAsNumber: true })}
              inputProps={{ step: "any" }}
            />
            <TextField
              label="Output Price"
              type="number"
              fullWidth
              {...register("outputPrice", { valueAsNumber: true })}
              inputProps={{ step: "any" }}
            />
          </Flex>

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={!!field.value} />}
                label="Active"
              />
            )}
          />
        </Flex>
      </Box>
    </UpsertDrawer>
  );
};
