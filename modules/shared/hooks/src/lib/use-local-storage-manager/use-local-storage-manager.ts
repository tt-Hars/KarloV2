import { useLocalStorage } from 'usehooks-ts';

export function useLocalStorageManager(
  initialValue: string,
  stateVal: boolean
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
