
import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { APP_TITLE } from "@/config";

import {
  Typography, IconButton, Tabs, Tab
} from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import styled from "@emotion/styled";
import { useThemeMode } from "@/features/shared/hooks/useThemeMode";
import Flex from "../Elements/Flex/Flex";
import { UserHeaderAction } from "@/features/auth/components/UserHeaderAction";

const StyledHeader = styled("div")`
  margin-bottom: 4px;
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
  border-bottom: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.divider};
  box-shadow: 0 0 10px 0 ${({ theme }: { theme: Theme }) => theme.palette.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 0px 8px;
  position: sticky;
  top: 0;
  z-index: 1100;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
`;

const NAV_TABS = [
  { label: "Home", to: "/" },
  { label: "Topics", to: "/topics" },
  { label: "Articles", to: "/articles" },
  { label: "Agents", to: "/agents" },
];

export function Header() {
  const theme = useTheme();
  const { toggleMode } = useThemeMode();
  const location = useLocation();

  const isDark = theme.palette.mode === "dark";

  return (
    <StyledHeader id="layout-header" theme={theme}>
      <Flex id="layout-header-left" gap={24}>
        <StyledNavLink to="/">
          <img src={logo} alt={APP_TITLE} style={{ height: "28px" }} />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            {APP_TITLE}
          </Typography>
        </StyledNavLink>

        <Tabs
          value={NAV_TABS.some(tab => location.pathname.startsWith(tab.to) && tab.to !== '/')
            ? NAV_TABS.find(tab => location.pathname.startsWith(tab.to) && tab.to !== '/')?.to
            : location.pathname}
          textColor="primary"
          indicatorColor="primary"
        >
          {NAV_TABS.map((tab) => (
            <Tab key={tab.to} label={tab.label} value={tab.to} to={tab.to} component={NavLink} />
          ))}
        </Tabs>
      </Flex>

      <Flex id="layout-header-right" gap={12} align="center">
        <IconButton onClick={toggleMode} color="inherit" aria-label="Toggle theme">
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <UserHeaderAction />
      </Flex>
    </StyledHeader>
  );
}