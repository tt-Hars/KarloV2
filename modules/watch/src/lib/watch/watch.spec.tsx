import { render } from '@testing-library/react';

import Watch from './watch';

describe('Watch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Watch />);
    expect(baseElement).toBeTruthy();
  });
});
