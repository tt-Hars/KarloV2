import styled from '@emotion/styled';
import './styles.css';
import { Navbar} from '@myreactapp/modules/shared/ui'
import { AppRoutes } from './routing/routes';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Navbar></Navbar>
      <AppRoutes />
    </StyledApp>
  );
}

export default App;
