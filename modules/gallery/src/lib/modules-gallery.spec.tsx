import { render } from '@testing-library/react';

import ModulesGallery from './modules-gallery';

describe('ModulesGallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesGallery />);
    expect(baseElement).toBeTruthy();
  });
});
