import { render } from '@testing-library/react';

import Listen from './listen';

describe('Listen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Listen />);
    expect(baseElement).toBeTruthy();
  });
});
