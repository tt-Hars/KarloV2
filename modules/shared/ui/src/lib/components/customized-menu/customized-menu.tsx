import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/LoginRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  ThemeContext,
  useLocalStorageManager,
} from '@karlo/modules/shared/hooks';
import { IconButton } from '@mui/material';
import { themeOptions } from '@karlo/modules/shared/data';
import { useNavigate } from 'react-router-dom';

const UserAvatar = styled('span')`
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 1.5rem;
  right: 2.5rem;
  z-index: 2;
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function CustomizedMenu() {
  const navigate = useNavigate();
  const { selectedTheme, setSelectedTheme } = React.useContext(ThemeContext);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const isAuthenticated = useLocalStorageManager('authenticated', false);
  const isRegistered = useLocalStorageManager('registered', false);
  const isSubscribed = useLocalStorageManager('subscribed', false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (isAuthenticated.value === true) {
      console.log('!!logged out!!');
      isAuthenticated.action(false);
      isRegistered.action(false);
      isSubscribed.action(false);
    }
  };

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <UserAvatar>
        <IconButton
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon color="secondary" fontSize="large" />
        </IconButton>
      </UserAvatar>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        key="1"
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate('/login');
            handleClose();
          }}
          disableRipple
        >
          <LoginIcon />
          Login
        </MenuItem>
        <MenuItem>
          <MoreHorizIcon />
          <Button
            aria-controls={open2 ? 'demo-more-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onMouseOver={handleClick2}
            disableRipple
          >
            {' '}
            Themes
          </Button>
        </MenuItem>
        <StyledMenu
          id="demo-more-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-more-button',
          }}
          anchorEl={anchorEl2}
          open={open2}
          key="2"
          onClose={handleClose2}
        >
          {themeOptions.map((theme: any) => (
            <MenuItem
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
            >
              {theme.label}
            </MenuItem>
          ))}
        </StyledMenu>
      </StyledMenu>
    </>
  );
}

export default CustomizedMenu;
