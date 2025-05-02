import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useLocalStorageManager from './use-local-storage-manager';

describe('useLocalStorageManager', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useLocalStorageManager());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
