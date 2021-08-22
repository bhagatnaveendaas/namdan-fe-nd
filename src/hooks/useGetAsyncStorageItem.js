import { useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';

export const useGetAsyncStorageItem = (item) => {
  const [storageItem, setStorageItem] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(item)
      .then((aStorageItem) => {
        setStorageItem(aStorageItem);
      });
  }, [storageItem]);

  return storageItem;
};