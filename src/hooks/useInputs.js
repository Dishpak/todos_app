import {useState, useCallback} from 'react';

const useFormInputs = (initialState) => {
  const [input, setInput] = useState(initialState);

  const handleInputChange = useCallback((e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    },
    [input],
  )

  const handleInputsReset = () => {
    setInput(initialState)
  }

  return [input, handleInputChange, handleInputsReset];
};

export default useFormInputs;
