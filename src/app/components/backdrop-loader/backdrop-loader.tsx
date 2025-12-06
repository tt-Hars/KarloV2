import { CircularProgress, Backdrop } from '@mui/material';

export const BackdropLoader = () => (
  <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={true}
  >
  <CircularProgress color="inherit" />
  </Backdrop>
);
