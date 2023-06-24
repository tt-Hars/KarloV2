import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesMusicProps {}

const StyledModulesMusic = styled.div`
  color: pink;
`;

export function ModulesMusic(props: ModulesMusicProps) {
  return (
    <StyledModulesMusic>
      <h1>Welcome to ModulesMusic!</h1>
    </StyledModulesMusic>
  );
}

export default ModulesMusic;
