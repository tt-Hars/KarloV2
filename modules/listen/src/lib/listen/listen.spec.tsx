import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Listen from './listen';

describe('Listen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Listen />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
