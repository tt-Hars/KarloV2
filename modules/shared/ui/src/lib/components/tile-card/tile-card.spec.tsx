import { render } from '@testing-library/react';

import TileCard from './tile-card';

describe('TileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TileCard tileRoute={''} />);
    expect(baseElement).toBeTruthy();
  });
});
