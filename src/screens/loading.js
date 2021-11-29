import React, { useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const Loading = ({ setIsLoading }) => {
  const delay = 5;

  useEffect(
    () => {
      let timer = setTimeout(() => setIsLoading(false), delay * 1000);

      return () => {
        clearTimeout(timer);
      };
    },
    []
  );

  return (
    <LoadingScreen />
  )
}

export default Loading