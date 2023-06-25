import { render } from '@testing-library/react';

import ModulesWatch from './modules-watch';

describe('ModulesWatch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesWatch />);
    expect(baseElement).toBeTruthy();
  });
});
