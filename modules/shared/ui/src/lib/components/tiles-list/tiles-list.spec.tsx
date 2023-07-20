import { render } from '@testing-library/react';

import TilesList from './tiles-list';

describe('TilesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TilesList />);
    expect(baseElement).toBeTruthy();
  });
});
