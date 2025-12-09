import { render } from '@testing-library/react';
import { KarloButton } from './KarloButton';

describe('KarloButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KarloButton>Test</KarloButton>);
    expect(baseElement).toBeTruthy();
  });
});
