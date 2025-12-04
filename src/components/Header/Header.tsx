import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.svg';

import { APP_TITLE } from '@/config';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { useTheme, type Theme } from '@mui/material/styles';

const StyledHeader = styled('div')`
margin-bottom: 4px;
background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
border-bottom: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.divider};
box-shadow: 0 0 10px 0 ${({ theme }: { theme: Theme }) => theme.palette.divider};
display: flex;
justify-content: space-between;
align-items: center;
padding: 8px 20px 8px 8px;
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

export function Header() {

    const theme = useTheme();

    return (
        <StyledHeader id="layout-header" theme={theme} >
            <StyledNavLink to='/' >
                <img src={logo} alt={APP_TITLE} style={{ height: '28px' }} />
                <Typography variant="h6" color="primary"
                >{APP_TITLE}</Typography>
            </StyledNavLink>

            <div>Right</div>
        </StyledHeader>
    );
}
