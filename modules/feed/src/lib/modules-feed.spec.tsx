import { render } from '@testing-library/react';

import ModulesFeed from './modules-feed';

describe('ModulesFeed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesFeed />);
    expect(baseElement).toBeTruthy();
  });
});
