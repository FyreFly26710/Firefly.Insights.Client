import React, { useEffect } from "react";
import { Box, Typography, Divider, TextField } from "@mui/material";
import { ReadonlyDrawer } from "@/components/Drawers/ReadonlyDrawer";
import Flex from "@/components/Elements/Flex/Flex";
import type { ExecutionLogDto } from "../api-types";
import { useAsync } from "@/features/shared/hooks/useAsync";
import { executionPayloadsApi } from "../api/executionLogsApi";

interface ExecutionJobDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedLog: ExecutionLogDto | null;
}

export const ExecutionJobDrawer: React.FC<ExecutionJobDrawerProps> = ({
  open,
  onClose,
  selectedLog,
}) => {
  const { data, isLoading, execute} = useAsync(executionPayloadsApi.getById);

  useEffect(() => {
    if (open && selectedLog?.executionPayloadId) {
      execute(selectedLog.executionPayloadId);
    }
  }, [open, selectedLog?.executionPayloadId, execute]);

  return (
    <ReadonlyDrawer
      open={open}
      onClose={onClose}
      title={`Execution Details #${selectedLog?.executionLogId}`}
      isLoading={isLoading}
      width="700px"
    >
      {data && (
        <Flex direction="column" gap={24}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Prompt
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={data?.prompt}
              variant="outlined"
              slotProps={{ input: { readOnly: true } }}
            />
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Response
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={data?.response}
              variant="outlined"
              slotProps={{ input: { readOnly: true } }}
            />
          </Box>
        </Flex>
      )}
    </ReadonlyDrawer>
  );
};
