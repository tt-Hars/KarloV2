import { render } from '@testing-library/react';
import Read from './read';

describe('Read', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Read />);
    expect(baseElement).toBeTruthy();
  });
});
