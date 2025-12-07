import styled from '@emotion/styled';
import { Button, Typography, Grid, Paper, Container, Box } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Typewriter from 'typewriter-effect';
import { useRef, useState, useEffect } from 'react';
import { useAuthContext } from '@karlo/modules-shared-hooks';

/* eslint-disable-next-line */
export interface MainHeadingProps {}

const features = [
  {
    title: 'Watch & Listen',
    description: 'Enjoy your favorite movies, music, and podcasts all in one place.',
    icon: '🎥'
  },
  {
    title: 'Read & Write',
    description: 'Explore books, articles, and express your thoughts with our editor.',
    icon: '✍️'
  },
  {
    title: 'Plan & Shop',
    description: 'Organize your life and discover new products in our marketplace.',
    icon: '🛒'
  }
];

const TypewriterWrapper = styled.span``;

export function MainHeading(props: MainHeadingProps) {
  const headingRef = useRef(null);
  const authContext = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = authContext!;

  useEffect(() => {
    if (isAuthenticated) {
       navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  const [strings, setStrings] = useState([
    'कुछ करें।',
    'Do Something.',
    'Etwas Tun.',
    'Hacer Algo.',
    '何かをしてください。',
    'Haz algo.',
    'Fais quelque chose.',
    'Fai qualcosa.',
    'Faça alguma coisa.',
    'Сделай что-нибудь.',
    '뭔가를 해.',
    'Κάνε κάτι.',
    'Gör något.'
  ]);
  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography
          pb="45px"
          ref={headingRef}
          color="secondary"
          fontWeight="bold"
          variant="h1"
          component="h4"
          gutterBottom
        >
          <Typewriter
            component={TypewriterWrapper}
            onInit={(t) => t.start()}
            options={{
              loop: true,
              delay: 75,
              strings,
              autoStart: true,

            }}
          />
        </Typography>
        <Button
          component={Link}
          to="/welcome"
          variant="outlined"
          size="large"
          endIcon={<ArrowCircleRightOutlinedIcon />}
        >
          Get started
        </Button>
      </Box>

      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom color="text.primary">
          Features
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Everything you need to be productive and entertained.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h1" gutterBottom>
                  {feature.icon}
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="footer" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Karlo. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default MainHeading;
