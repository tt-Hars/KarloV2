import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ShopProps {}

const StyledShop = styled.div`
  color: pink;
`;

/**
 * Shop component.
 *
 * @param {ShopProps} props - The component props.
 * @returns {JSX.Element} The rendered Shop component.
 */
export function Shop(props: ShopProps) {
  return (
    <StyledShop>
      <h1>Welcome to Shop!</h1>
    </StyledShop>
  );
}

export default Shop;
