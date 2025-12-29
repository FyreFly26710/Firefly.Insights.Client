import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArticleIcon from '@mui/icons-material/Article';
import TopicIcon from '@mui/icons-material/Topic';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';

const ADMIN_OPTIONS = [
  { label: 'Manage Articles', to: '/admin/articles', icon: <ArticleIcon fontSize="small" /> },
  { label: 'Manage Topics', to: '/admin/topics', icon: <TopicIcon fontSize="small" /> },
  { label: 'Manage Categories', to: '/admin/categories', icon: <CategoryIcon fontSize="small" /> },
  { label: 'Manage Tags', to: '/admin/tags', icon: <TagIcon fontSize="small" /> },
];

export const AdminMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="admin-button"
        aria-controls={open ? 'admin-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': { color: 'primary.main' }
        }}
      >
        ADMINS
      </Button>
      <Menu
        id="admin-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
            sx: { minWidth: 200, mt: 1 }
          },
          list: {
            'aria-labelledby': 'admin-button'
          }
        }}
      >
        {ADMIN_OPTIONS.map((option) => (
          <MenuItem
            key={option.to}
            component={NavLink}
            to={option.to}
            onClick={handleClose}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};