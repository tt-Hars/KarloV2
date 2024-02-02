import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Grid, Paper, styled } from '@mui/material';

export interface TileCardProps {
  label: string;
  content: string;
  route: string;
}

const BoxContainer = styled('div')`
  min-width: 200px;
  ${(props) => props.theme.breakpoints.up('lg')} {
    min-width: 400px;
  }
`;
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export function TileCard({ label, content, route }: TileCardProps) {
  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: 'center',
        color: 'text.secondary',
        height: '100%',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Typography textTransform="capitalize" variant="h6" gutterBottom>
        {label}
      </Typography>
      <Typography variant="body1" paragraph>
        {content}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={route.replace('_', '/')}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {label}
      </Button>
    </Paper>
  );
}
