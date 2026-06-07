import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const v = value instanceof Function ? value(storedValue) : value;
      setStoredValue(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (err) {
      console.error("[useLocalStorage] set error:", err);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error("[useLocalStorage] remove error:", err);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
