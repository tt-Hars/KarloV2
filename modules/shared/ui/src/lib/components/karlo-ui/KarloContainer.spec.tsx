import { render } from '@testing-library/react';
import { KarloContainer } from './KarloContainer';

describe('KarloContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KarloContainer>Test</KarloContainer>);
    expect(baseElement).toBeTruthy();
  });
});
