import { useState, MouseEvent } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Button,
} from '@mui/material';
import { Logout, AccountCircle, Subscriptions } from '@mui/icons-material';
import { useAuthContext, useLogout } from '@karlo/modules/shared/hooks';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext()!;
  const { mutate: logout } = useLogout()!;

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Profile</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Subscriptions fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">My Subscriptions</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          onClick={() => navigate('/login')}
          size="small"
          sx={{ ml: 2 }}
        >
          LOGIN
        </Button>
      )}
    </>
  );
};
