import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div``;

const UserAvatar = styled.span`
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
`;

const HomeIcon = styled.span`
  height: 2rem;
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
`;

const FooterText = styled.span`
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
`;

export function Navbar(props: NavbarProps) {
  const isAuthenticated = useRef<string>(localStorage.getItem('authenticated'));
  return (
    <StyledNavbar>
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
      {isAuthenticated.current === 'true' ? (
        <Link to="/"
          onClick={() => {
            console.log('here')
            localStorage.setItem('authenticated', 'false');
          }}>
          <UserAvatar>
            <AccountCircleIcon fontSize="large" />
          </UserAvatar>
        </Link>
      ) : (
        <Link to="/login">
          <UserAvatar>
            <AccountCircleIcon fontSize="large" />
          </UserAvatar>
        </Link>
      )}
      <FooterText>
        <Typography fontWeight="light" variant="h5" component="h2">
          <span>Made with&nbsp;</span>
        </Typography>
        <FavoriteIcon fontSize="large" color="primary" />
        <Typography fontWeight="light" variant="h5" component="h3">
          &nbsp;in भारत{' '}
        </Typography>
      </FooterText>
    </StyledNavbar>
  );
}

export default Navbar;
