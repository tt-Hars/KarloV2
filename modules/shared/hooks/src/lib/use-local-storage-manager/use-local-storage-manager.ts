import { useLocalStorage } from 'usehooks-ts';

/**
 * Hook to manage local storage state.
 *
 * @param {string} initialValue - The key for local storage.
 * @param {boolean} [stateVal] - The initial state value.
 * @returns {Object} An object containing the current value and an action function to update it.
 */
export function useLocalStorageManager(
  initialValue: string,
  stateVal?: boolean
) {
  const [value, setValue] = useLocalStorage(`${initialValue}`, stateVal);

  function handleChange(val?: boolean) {
    val === undefined
      ? value
        ? setValue(false)
        : setValue(true)
      : setValue(val);
  }

  return {
    value,
    action: handleChange,
  };
}

export default useLocalStorageManager;
