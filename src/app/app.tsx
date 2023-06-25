import styled from '@emotion/styled';
import './styles.css';
import { CustomRoutes } from './routes';


const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <CustomRoutes />
    </StyledApp>
  );
}

export default App;
