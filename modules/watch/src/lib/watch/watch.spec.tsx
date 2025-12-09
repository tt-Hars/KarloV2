import { render, waitFor } from '@testing-library/react';
import Watch from './watch';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('Watch', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<Watch />);
    await waitFor(() => expect(baseElement).toBeTruthy());
  });
});
