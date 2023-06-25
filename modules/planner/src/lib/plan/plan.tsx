import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PlanProps {}

const StyledPlan = styled.div`
  color: pink;
`;

export function Plan(props: PlanProps) {
  return (
    <StyledPlan>
      <h1>Welcome to Plan!</h1>
    </StyledPlan>
  );
}

export default Plan;
