import {useState} from "react";

const useFormInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    // name: value,
    onChange:handleChange
  };

  return inputProps;
}

export default useFormInput;