import { render } from '@testing-library/react';

import Payment from './payment';

describe('Payment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Payment />);
    expect(baseElement).toBeTruthy();
  });
});
