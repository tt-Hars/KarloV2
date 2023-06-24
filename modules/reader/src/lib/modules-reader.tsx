import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesReaderProps {}

const StyledModulesReader = styled.div`
  color: pink;
`;

export function ModulesReader(props: ModulesReaderProps) {
  return (
    <StyledModulesReader>
      <h1>Welcome to ModulesReader!</h1>
    </StyledModulesReader>
  );
}

export default ModulesReader;
