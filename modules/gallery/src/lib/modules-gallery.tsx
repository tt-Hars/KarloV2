import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesGalleryProps {}

const StyledModulesGallery = styled.div`
  color: pink;
`;

export function ModulesGallery(props: ModulesGalleryProps) {
  return (
    <StyledModulesGallery>
      <h1>Welcome to ModulesGallery!</h1>
    </StyledModulesGallery>
  );
}

export default ModulesGallery;
