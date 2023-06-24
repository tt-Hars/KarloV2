import { render } from '@testing-library/react';

import ModulesEditor from './modules-editor';

describe('ModulesEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesEditor />);
    expect(baseElement).toBeTruthy();
  });
});
