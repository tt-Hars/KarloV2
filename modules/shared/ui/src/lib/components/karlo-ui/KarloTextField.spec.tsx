import { render } from '@testing-library/react';
import { KarloTextField } from './KarloTextField';

describe('KarloTextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KarloTextField />);
    expect(baseElement).toBeTruthy();
  });
});
