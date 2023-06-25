import { render } from '@testing-library/react';

import ModulesListen from './modules-listen';

describe('ModulesListen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesListen />);
    expect(baseElement).toBeTruthy();
  });
});
