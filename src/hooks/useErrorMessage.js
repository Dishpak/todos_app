import {useState} from 'react';

const useErrorMessage = (initialState) => {
  const [errorMessage, setErrorMessage] = useState(initialState);

  const handleErrorMessage = (message) => setErrorMessage(message);

  return [errorMessage, handleErrorMessage]
};

export default useErrorMessage;
