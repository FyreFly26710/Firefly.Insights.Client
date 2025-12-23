import Flex from "@/components/Elements/Flex/Flex";
import { Header } from "@/components/Header/Header";
import React from "react";
type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex id="layout-main" direction="column" height="100%" width="100%">
      <Header />
      {children}
    </Flex>
  );
};
