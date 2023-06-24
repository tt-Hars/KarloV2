import { render } from '@testing-library/react';

import ModulesVideo from './modules-video';

describe('ModulesVideo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesVideo />);
    expect(baseElement).toBeTruthy();
  });
});
