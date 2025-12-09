import { render } from '@testing-library/react';
import { KarloGrid } from './KarloGrid';

describe('KarloGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KarloGrid>Test</KarloGrid>);
    expect(baseElement).toBeTruthy();
  });
});
