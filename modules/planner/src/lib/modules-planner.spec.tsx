import { render } from '@testing-library/react';

import ModulesPlanner from './modules-planner';

describe('ModulesPlanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesPlanner />);
    expect(baseElement).toBeTruthy();
  });
});
