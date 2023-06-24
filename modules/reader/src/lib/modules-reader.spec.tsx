import { render } from '@testing-library/react';

import ModulesReader from './modules-reader';

describe('ModulesReader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesReader />);
    expect(baseElement).toBeTruthy();
  });
});
