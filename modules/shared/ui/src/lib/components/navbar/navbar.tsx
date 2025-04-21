import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  useAuthContext,
  useLocalStorageManager,
} from '@karlo/modules/shared/hooks';
import {CustomizedMenu} from '../customized-menu/customized-menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

/* eslint-disable-next-line */
export interface NavbarProps {}

function HomeIcon() {
  const { isAuthenticated } = useAuthContext()!;
  const HOME_ICON_TEXT = 'K•A•R•L•O';
  return (
    <>
        <Link to={isAuthenticated === true ? '/' : '/hello'}>
          <Typography
            color="secondary"
            fontWeight="black"
            variant="h2"
            component="h1"
          >
            {HOME_ICON_TEXT}
          </Typography>
        </Link>
    </>
  );
}

export function Navbar() {
  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeIcon />
          <Box
            sx={{
              my: { xs: 3, md: 5 },
              flexGrow: 1,
              display: { xs: 'flex', md: 'flex' },
            }}
          ></Box>
          <Box sx={{ flexGrow: 0 }}>
            <CustomizedMenu></CustomizedMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
//export default ResponsiveAppBar;

export default Navbar;
