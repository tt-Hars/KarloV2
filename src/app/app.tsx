import styled from '@emotion/styled';
import './styles.css';
import { CustomRoutes } from './routes';
import { Navbar} from '@myreactapp/modules/shared/ui'

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Navbar></Navbar>
      <CustomRoutes />
    </StyledApp>
  );
}

export default App;
