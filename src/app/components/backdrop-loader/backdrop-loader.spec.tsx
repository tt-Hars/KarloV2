import { render } from '@testing-library/react';
import { BackdropLoader } from './backdrop-loader';

describe('BackdropLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackdropLoader />);
    expect(baseElement).toBeTruthy();
  });
});
