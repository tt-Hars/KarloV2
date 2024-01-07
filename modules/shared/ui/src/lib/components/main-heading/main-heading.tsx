import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';

import Typewriter from 'typewriter-effect';
import { useRef, useState } from 'react';

/* eslint-disable-next-line */
export interface MainHeadingProps {}

export function MainHeading(props: MainHeadingProps) {
  const headingRef = useRef(null);
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
          onInit={(t) => t.callFunction(() => {
            console.log('String typed out!');
          }).start()}
          options={{
            loop: true,
            delay: 75,
            strings,
            autoStart: true,
            devMode: true
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
