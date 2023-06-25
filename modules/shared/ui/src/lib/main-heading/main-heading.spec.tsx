import { render } from '@testing-library/react';

import MainHeading from './main-heading';

describe('MainHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainHeading />);
    expect(baseElement).toBeTruthy();
  });
});
