import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useLocalStorageManager } from '@myreactapp/modules/shared/hooks';
import CustomizedMenu from '../customized-menu/customized-menu';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div``;

const UserAvatar = styled.span`
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  z-index: 2;
`;

const HomeIcon = styled.span`
  height: 2rem;
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  z-index: 2;
`;

const FooterText = styled.span`
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  z-index: 2;
`;

export function Navbar(props: NavbarProps) {
  const isAuthenticated = useLocalStorageManager('authenticated', false);
  const isRegistered = useLocalStorageManager('registered', false);
  const isSubscribed = useLocalStorageManager('subscribed', false);
  return (
    <StyledNavbar>
      {isAuthenticated.value === true ? (
        <>
          <HomeIcon>
            <Link to="/">
              <Typography
                color="primary"
                fontWeight="black"
                variant="h4"
                component="h1"
              >
                •K•A•R•L•O•
              </Typography>
            </Link>
          </HomeIcon>
          <Paper>
            <Link
              to="/"
              onClick={() => {
                console.log('!!logged out!!');
                isAuthenticated.action(false);
                isRegistered.action(false);
                isSubscribed.action(false);
              }}
            >
              <UserAvatar>
                <AccountCircleIcon
                  style={{ color: 'green' }}
                  fontSize="large"
                />
              </UserAvatar>
            </Link>
          </Paper>
        </>
      ) : (
        <>
          <HomeIcon>
            <Link to="/hello">
              <Typography
                color="primary"
                fontWeight="black"
                variant="h4"
                component="h1"
              >
                •K•A•R•L•O•
              </Typography>
            </Link>
          </HomeIcon>
          <Link to="/login">
            <UserAvatar>
              <AccountCircleIcon fontSize="large" />
            </UserAvatar>
          </Link>
        </>
      )}
      <FooterText>
        <Typography
          color="secondary"
          fontWeight="light"
          variant="h5"
          component="h2"
        >
          <span>Made with&nbsp;</span>
        </Typography>
        <FavoriteIcon fontSize="large" color="primary" />
        <Typography
          color="secondary"
          fontWeight="light"
          variant="h5"
          component="h3"
        >
          &nbsp;{' in भारत'}
        </Typography>
      </FooterText>
    </StyledNavbar>
  );
}

export default Navbar;
