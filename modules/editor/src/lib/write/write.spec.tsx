import { render } from '@testing-library/react';
import Write from './write';

describe('Write', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Write />);
    expect(baseElement).toBeTruthy();
  });
});
