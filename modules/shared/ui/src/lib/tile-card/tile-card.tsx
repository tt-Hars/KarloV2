import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

export interface TileCardProps {
  tileRoute: string;
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TileCard({...props}: TileCardProps) {
  return (
    <Grid item xs={4}>
      <Box sx={{ minWidth: 400 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={props.tileRoute.replace('_', '/')}
              // to='/login'
              size="small"
            >
              {props.tileRoute.replace('_', '')}
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
    </Grid>
  );
}
