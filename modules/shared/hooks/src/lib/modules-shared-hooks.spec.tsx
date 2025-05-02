import { render } from '@testing-library/react';

import ModulesSharedHooks from './modules-shared-hooks';

describe('ModulesSharedHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesSharedHooks />);
    expect(baseElement).toBeTruthy();
  });
});
