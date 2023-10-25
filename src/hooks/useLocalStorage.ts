import { ref } from 'vue';

const useLocalStorageWithDefault = <T = string>(keyName: string, defaultValue: T) => {
  const storedValue = ref(getStoredValue(keyName, defaultValue));

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
      storedValue.value = newValue;
    } catch (err) {
      console.error(err);
    }
  };

  const remove = () => {
    try {
      window.localStorage.removeItem(keyName);
      storedValue.value = defaultValue;
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue, remove] as const;
};

const useLocalStorage = (keyName: string) => {
  const storedValue = ref(getStoredValue(keyName));

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
      storedValue.value = newValue;
    } catch (err) {
      console.error(err);
    }
  };

  const remove = () => {
    try {
      window.localStorage.removeItem(keyName);
      storedValue.value = undefined;
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue, remove];
};

function getStoredValue<T>(keyName: string, defaultValue?: T) {
  try {
    const value = window.localStorage.getItem(keyName);
    if (value) {
      return JSON.parse(value);
    }
    return defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

export { useLocalStorageWithDefault, useLocalStorage };
