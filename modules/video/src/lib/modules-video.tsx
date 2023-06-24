import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesVideoProps {}

const StyledModulesVideo = styled.div`
  color: pink;
`;

export function ModulesVideo(props: ModulesVideoProps) {
  return (
    <StyledModulesVideo>
      <h1>Welcome to ModulesVideo!</h1>
    </StyledModulesVideo>
  );
}

export default ModulesVideo;
