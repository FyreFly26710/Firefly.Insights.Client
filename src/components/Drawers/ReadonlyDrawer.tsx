import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Flex from "../Elements/Flex/Flex";

interface ReadonlyDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  isLoading?: boolean;
  children: React.ReactNode;
  width?: number | string;
}

export const ReadonlyDrawer: React.FC<ReadonlyDrawerProps> = ({
  open,
  onClose,
  title,
  isLoading,
  children,
  width = "40%",
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: width } } } }}
    >
      <Flex direction="column" gap={24} height="100%" padding="24px">
        {/* Header */}
        <Flex direction="row" justify="space-between" align="center">
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Flex>
        <Divider />

        {/* Body */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
        </Box>
      </Flex>
    </Drawer>
  );
};
