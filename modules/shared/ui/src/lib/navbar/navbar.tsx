import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
`;

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
`;

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <HomeIcon>
        <Typography
          color="primary"
          fontWeight="black"
          variant="h4"
          component="h1"
        >
          KARLO
        </Typography>
      </HomeIcon>
      <UserAvatar>
        <AccountCircleIcon fontSize="large" />
      </UserAvatar>
      <FooterText>
        <Typography fontWeight="light" variant="h5" component="h6">
          <span>Made in India with</span>{' '}
          <FavoriteIcon fontSize="large" color="primary" />
        </Typography>
      </FooterText>
    </StyledNavbar>
  );
}

export default Navbar;
