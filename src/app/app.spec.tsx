import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a header', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check for the header (banner role) instead of specific text
    await waitFor(() => {
        expect(getByRole('banner')).toBeTruthy();
    });
  });
});
