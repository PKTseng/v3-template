import { ref, watchEffect, watch } from 'vue';

const useLocalStorageWithDefault = <T = unknown>(keyName: string, defaultValue: T) => {
  const storedValue = ref<T>();

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
      storedValue.value = undefined;
    } catch (err) {
      console.error(err);
    }
  };

  // once 
  watch([defaultValue], () => {
    setValue(defaultValue)
  }, {
    immediate: true
  })

  return [storedValue, setValue, remove] as const;
};

const useLocalStorage = <T = unknown>(keyName: string) => {

  const storedValue = ref<T>();

  watchEffect(() => {
    const existValue = localStorage.getItem(keyName);
    if (existValue) {
      storedValue.value = JSON.parse(existValue);
    } else {
      storedValue.value = undefined
    }
  })

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
      storedValue.value = undefined;
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue, remove] as const;
};

export { useLocalStorageWithDefault, useLocalStorage };
