import { act, renderHook } from '@testing-library/react';
import useLocalStorageManager from './use-local-storage-manager';

describe('useLocalStorageManager', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useLocalStorageManager('testKey', true));

    expect(result.current.value).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useLocalStorageManager('testKey', true));

    act(() => {
      result.current.action();
    });

    expect(result.current.value).toBe(false);
  });
});
