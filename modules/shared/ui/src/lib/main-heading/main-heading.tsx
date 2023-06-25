import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

// @ts-expect-error mod
import * as Typewriter from 'typewriter-effect/dist/core';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface MainHeadingProps {}

export function MainHeading(props: MainHeadingProps) {
  const headingRef = useRef(null);

  useEffect(() => {
    new Typewriter(headingRef.current, {
      loop: true,
      delay: 75,
      strings: ['Karlo.', 'Do Something!'],
      autoStart: true,
    });
  }, []);

  return (
    <>
      <Typography
        pb="45px"
        ref={headingRef}
        color="secondary"
        fontWeight="bold"
        variant="h1"
        component="h1"
        gutterBottom
      ></Typography>
      <Button
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
