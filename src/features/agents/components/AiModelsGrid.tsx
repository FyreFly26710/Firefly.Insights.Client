import React from "react";
import { Paper, Alert, Avatar, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { AiModelDto } from "../api-types";
import { StatusChip } from "@/components/Tags/StatusChip";
import { TableActions } from "@/features/admins/components/common/TableActions";

interface AiModelsGridProps {
  models: AiModelDto[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const AiModelsGrid: React.FC<AiModelsGridProps> = ({
  models,
  isLoading,
  error,
  onEdit,
  onDelete,
}) => {
  const columns: GridColDef<AiModelDto>[] = [
    {
      field: "aiModelId",
      headerName: "ID",
      width: 110,
      sortable: true,
    },
    {
      field: "provider",
      headerName: "Provider",
      width: 120,
      sortable: true,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      minWidth: 150,
      sortable: true,
    },
    {
      field: "displayName",
      headerName: "Display Name",
      width: 150,
      sortable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      sortable: true,
    },
    {
      field: "modelId",
      headerName: "Model ID",
      width: 200,
      sortable: true,
    },
    {
      field: "inputPrice",
      headerName: "Input Price",
      width: 100,
      sortable: true,
      type: "number",
      valueFormatter: (value) =>
        value ? `$${(value as number).toFixed(2)}` : "$0.00",
    },
    {
      field: "outputPrice",
      headerName: "Output Price",
      width: 100,
      sortable: true,
      type: "number",
      valueFormatter: (value) =>
        value ? `$${(value as number).toFixed(2)}` : "$0.00",
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <StatusChip
          value={params.value}
          trueLabel="Active"
          falseLabel="Inactive"
        />
      ),
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      sortable: false,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    // {
    //   field: "apiKey",
    //   headerName: "API Key",
    //   width: 150,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Typography
    //       variant="body2"
    //       sx={{
    //         maxWidth: 140,
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //         whiteSpace: "nowrap",
    //         fontFamily: "monospace",
    //       }}
    //     >
    //       {params.value}
    //     </Typography>
    //   ),
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <TableActions
          id={params.row.aiModelId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to load AI models: {error.message}
        </Alert>
      </Paper>
    );
  }

  const handleRowDoubleClick = (params: { row: AiModelDto }) => {
    onEdit(params.row.aiModelId);
  };

  return (
    <Paper
      id="ai-models-grid"
      sx={{ width: "100%", height: "100%", minHeight: 400 }}
    >
      <DataGrid
        rows={models}
        columns={columns}
        getRowId={(row) => row.aiModelId}
        loading={isLoading}
        // Client-side pagination
        paginationMode="client"
        sortingMode="client"
        // Style & Polish
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        onRowDoubleClick={handleRowDoubleClick}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell:focus": { outline: "none" },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25 },
          },
        }}
      />
    </Paper>
  );
};
