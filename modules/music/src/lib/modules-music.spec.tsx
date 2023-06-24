import { render } from '@testing-library/react';

import ModulesMusic from './modules-music';

describe('ModulesMusic', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesMusic />);
    expect(baseElement).toBeTruthy();
  });
});
