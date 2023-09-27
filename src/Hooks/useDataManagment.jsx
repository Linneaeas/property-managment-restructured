import { useState, useEffect } from "react";

export function useDataManagement(initialData, storageKey) {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : initialData;
  });

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [storageKey]);

  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };

  const handleSaveToLocalStorage = (updatedData) => {
    setData(updatedData);
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
  };

  return {
    data,
    setData,
    getDataFromLocalStorage,
    handleSaveToLocalStorage,
  };
}
