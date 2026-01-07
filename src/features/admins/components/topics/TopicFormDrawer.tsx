import React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Box,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useTopicForm } from "../../hooks/useTopicForm";
import { TopicArticlesGrid } from "./TopicArticlesGrid";
import Flex from "@/components/Elements/Flex/Flex";
import { UpsertDrawer } from "@/components/Drawers/UpsertDrawer";

interface TopicFormDrawerProps {
  open: boolean;
  topicId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const TopicFormDrawer: React.FC<TopicFormDrawerProps> = ({
  open,
  topicId,
  onClose,
  onSuccess,
}) => {
  const {
    form,
    onSubmit,
    isLoading,
    isSubmitting,
    isEdit,
    categories,
    isLoadingCategories,
  } = useTopicForm({
    topicId: topicId,
    onSuccess,
  });

  const {
    register,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = form;

  return (
    <UpsertDrawer
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Topic" : "Create New Topic"}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      formId="topic-form"
      submitLabel={isEdit ? "Update Topic" : "Create Topic"}
      width={isEdit ? 1200 : 560}
    >
      <Box
        component="form"
        id="topic-form"
        onSubmit={onSubmit}
        sx={{ height: "100%" }}
      >
        <Flex direction="row" gap={24} width="100%">
          {/* Left Column - Topic Metadata */}
          <Flex direction="column" gap={24} grow={1}>
            <TextField
              label="Topic Title"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <TextField
                  select
                  label="Category"
                  fullWidth
                  disabled={isLoadingCategories}
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                  value={field.value ? field.value.toString() : ""}
                  onChange={(e) => {
                    // Convert string to number for form value
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    );
                  }}
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextField
              label="Image URL"
              fullWidth
              {...register("imageUrl")}
              placeholder="https://example.com/image.jpg"
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              {...register("description")}
            />

            <Flex direction="row" gap={24}>
              <TextField
                label="Sort Order"
                type="number"
                {...register("sortNumber", { valueAsNumber: true })}
              />
              <Controller
                name="isHidden"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={!!field.value} />}
                    label="Hide Topic"
                  />
                )}
              />
            </Flex>
          </Flex>

          {/* Right Column - Articles Management */}
          {isEdit && (
            <Flex direction="column" grow={2}>
              <TopicArticlesGrid
                control={control}
                register={register}
                getValues={getValues}
                setValue={setValue}
              />
            </Flex>
          )}
        </Flex>
      </Box>
    </UpsertDrawer>
  );
};
