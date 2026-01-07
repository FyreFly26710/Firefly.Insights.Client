import React from "react";
import { TextField, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCategoryForm } from "../../hooks/useCategoryForm";
import { CategoryTopicsGrid } from "./CategoryTopicsGrid";
import Flex from "@/components/Elements/Flex/Flex";
import { UpsertDrawer } from "@/components/Drawers/UpsertDrawer";

interface CategoryFormDrawerProps {
  open: boolean;
  categoryId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  open,
  categoryId,
  onClose,
  onSuccess,
}) => {
  const { form, onSubmit, isLoading, isSubmitting, isEdit } = useCategoryForm({
    categoryId: categoryId,
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
      title={isEdit ? "Edit Category" : "Create New Category"}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      formId="category-form"
      submitLabel={isEdit ? "Update Category" : "Create Category"}
      width={isEdit ? 1200 : 560}
    >
      <Box
        component="form"
        id="category-form"
        onSubmit={onSubmit}
        sx={{ height: "100%" }}
      >
        <Flex direction="row" gap={24} width="100%">
          {/* Left Column - Category Metadata */}
          <Flex direction="column" gap={24} grow={1}>
            <TextField
              label="Category Title"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
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
                    label="Hide Category"
                  />
                )}
              />
            </Flex>
          </Flex>

          {/* Right Column - Topics Management */}
          {isEdit && (
            <Flex direction="column" grow={2}>
              <CategoryTopicsGrid
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
