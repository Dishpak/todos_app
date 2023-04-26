import {useState} from 'react';

export const useErrorMessage = (initialState) => {
  const [errorMessage, setErrorMessage] = useState(initialState);

  const handleErrorMessage = (message) => setErrorMessage(message);

  return [errorMessage, handleErrorMessage]
};

