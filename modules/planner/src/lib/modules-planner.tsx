import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesPlannerProps {}

const StyledModulesPlanner = styled.div`
  color: pink;
`;

export function ModulesPlanner(props: ModulesPlannerProps) {
  return (
    <StyledModulesPlanner>
      <h1>Welcome to ModulesPlanner!</h1>
    </StyledModulesPlanner>
  );
}

export default ModulesPlanner;
