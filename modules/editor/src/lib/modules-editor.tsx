import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesEditorProps {}

const StyledModulesEditor = styled.div`
  color: pink;
`;

export function ModulesEditor(props: ModulesEditorProps) {
  return (
    <StyledModulesEditor>
      <h1>Welcome to ModulesEditor!</h1>
    </StyledModulesEditor>
  );
}

export default ModulesEditor;
