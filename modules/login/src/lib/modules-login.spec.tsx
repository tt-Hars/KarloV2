import { render } from '@testing-library/react';

import ModulesLogin from './modules-login';

describe('ModulesLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesLogin />);
    expect(baseElement).toBeTruthy();
  });
});
