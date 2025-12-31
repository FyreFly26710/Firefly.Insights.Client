import Flex from "@/components/Elements/Flex/Flex";
import { Header } from "@/components/Header/AppHeader";
import { Box } from "@mui/material";
import React from "react";
type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
      <Header />
      <Flex height="100%" width="100%">
        {children}
      </Flex>
    </Box>
  );
};
