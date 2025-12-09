import styled from '@emotion/styled';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface WatchProps {}
export interface Movie {
  _id: string;
  genre: string;
  title: string;
  thumbnail: string;
  year: string;
  synopsis: string;
  duration: string;
  __v: string;
}

const BASE_URL = `/.netlify/functions/movies`;

/**
 * Watch component to display movies.
 *
 * @param {WatchProps} props - The component props.
 * @returns {JSX.Element} The rendered Watch component.
 */
export function Watch(props: WatchProps) {
  const [movieData, setMovieData] = useState<Movie[]>([] as Movie[]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((data) => data.json())
      .then((data) => setMovieData(data));
  }, []);
  return (
    <Grid container spacing={3}>
      {movieData.map((movie) => (
        <Grid key={movie._id} item xs={6} sm={4} md={3} lg={2}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="video"
            height="140"
            image={movie.thumbnail}
            autoPlay
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h2">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Genre:</strong> {movie.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Year:</strong> {movie.year}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Synopsis:</strong> {movie.synopsis}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Duration:</strong> {movie.duration} minutes
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      ))}
    </Grid>
  );
}

export default Watch;
