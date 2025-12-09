import { render } from '@testing-library/react';
import { KarloTypography } from './KarloTypography';

describe('KarloTypography', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KarloTypography>Test</KarloTypography>);
    expect(baseElement).toBeTruthy();
  });
});
