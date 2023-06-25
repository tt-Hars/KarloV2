import { render } from '@testing-library/react';

import Plan from './plan';

describe('Plan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Plan />);
    expect(baseElement).toBeTruthy();
  });
});
