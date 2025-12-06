import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './welcome';

describe('Welcome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
