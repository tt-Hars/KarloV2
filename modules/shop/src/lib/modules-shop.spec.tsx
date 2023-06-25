import { render } from '@testing-library/react';

import ModulesShop from './modules-shop';

describe('ModulesShop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesShop />);
    expect(baseElement).toBeTruthy();
  });
});
