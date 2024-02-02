import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';
import CustomizedMenu from '../customized-menu/customized-menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

/* eslint-disable-next-line */
export interface NavbarProps {}

const HomeIcon = styled('div')``

export function Navbar() {
  const isAuthenticated = useLocalStorageManager('authenticated', false);

  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isAuthenticated.value === true ? (
            <>
              <HomeIcon>
                <Link to="/">
                  <Typography
                    color="secondary"
                    fontWeight="black"
                    variant="h2"
                    component="h1"
                  >
                    •K•A•R•L•O•
                  </Typography>
                </Link>
              </HomeIcon>
            </>
          ) : (
            <>
              <HomeIcon>
                <Link to="/hello">
                  <Typography
                    color="secondary"
                    fontWeight="black"
                    variant="h2"
                    component="h1"
                  >
                    •K•A•R•L•O•
                  </Typography>
                </Link>
              </HomeIcon>
            </>
          )}

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <CustomizedMenu></CustomizedMenu>
          </Box> */}
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
