import { render } from '@testing-library/react';

import Watch from './watch';

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [] }),
  })
) as jest.Mock;

describe('Watch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Watch />);
    expect(baseElement).toBeTruthy();
  });
});
