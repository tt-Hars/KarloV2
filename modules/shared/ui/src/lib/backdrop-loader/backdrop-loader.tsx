import styled from '@emotion/styled';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

/* eslint-disable-next-line */
export interface BackdropLoaderProps {}

const StyledBackdropLoader = styled.div`
  color: pink;
`;

export function BackdropLoader(props: BackdropLoaderProps) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <StyledBackdropLoader>
      <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    </StyledBackdropLoader>
  );
}

export default BackdropLoader;
