import {useCallback, useState} from 'react';

const useToggle = (initialValue) => {
  const [isToggled, setIsToggled] = useState(initialValue);
  const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled])
  return [isToggled, toggle];
};

export default useToggle;
