import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { APP_TITLE } from "@/config";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme, type Theme } from "@mui/material/styles";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import styled from "@emotion/styled";
import { useThemeMode } from "@/features/shared/hooks/useThemeMode";
import Flex from "../Elements/Flex/Flex";

const StyledHeader = styled("div")`
  margin-bottom: 4px;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme.palette.background.default};
  border-bottom: 1px solid
    ${({ theme }: { theme: Theme }) => theme.palette.divider};
  box-shadow: 0 0 10px 0
    ${({ theme }: { theme: Theme }) => theme.palette.divider};
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
          <Typography variant="h6" color="primary">
            {APP_TITLE}
          </Typography>
        </StyledNavLink>

        <Tabs
          value={
            location.pathname.startsWith("/topics")
              ? "/topics"
              : location.pathname
          }
          textColor="primary"
          indicatorColor="primary"
        >
          {NAV_TABS.map((tab) => (
            <Tab
              key={tab.to}
              label={tab.label}
              value={tab.to}
              to={tab.to}
              component={NavLink}
            />
          ))}
        </Tabs>
      </Flex>

      <IconButton
        onClick={toggleMode}
        color="inherit"
        aria-label="Toggle theme"
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </StyledHeader>
  );
}
