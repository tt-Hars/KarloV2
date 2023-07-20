import styled from '@emotion/styled';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

/* eslint-disable-next-line */
export interface BackdropLoaderProps {}

const StyledBackdropLoader = styled.div`
  color: pink;
`;

export function BackdropLoader(props: BackdropLoaderProps) {
  const [open, setOpen] = React.useState(true);
  return (
    <StyledBackdropLoader>
      <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    </StyledBackdropLoader>
  );
}

export default BackdropLoader;
