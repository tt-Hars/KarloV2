import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesShopProps {}

const StyledModulesShop = styled.div`
  color: pink;
`;

export function ModulesShop(props: ModulesShopProps) {
  return (
    <StyledModulesShop>
      <h1>Welcome to ModulesShop!</h1>
    </StyledModulesShop>
  );
}

export default ModulesShop;
