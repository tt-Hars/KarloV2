import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Typewriter from 'typewriter-effect';
import { useRef, useState } from 'react';
import { useAuthContext } from '@karlo/modules/shared/hooks';

/* eslint-disable-next-line */
export interface MainHeadingProps {}

export function MainHeading(props: MainHeadingProps) {
  const headingRef = useRef(null);
  const authContext = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = authContext!;

  isAuthenticated && navigate('/', { replace: true });
  
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
    <>
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
          component={styled.span``}
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
    </>
  );
}

export default MainHeading;
