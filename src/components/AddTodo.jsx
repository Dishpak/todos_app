import React, {useContext} from 'react';
import AppContext from "../context/AppContext";

const AddTodo = () => {
  const {handleAddTodo, title, setTitle} = useContext(AppContext);

  const handleLog = () => {

  }

  return (
      <>
          <form action="" className='add-form'>
              <input
                type="text"
                placeholder={'Give a title'}
                name='title'
                value={title}
                onChange={({target}) => setTitle(target.value)}
                minLength={4}
              />
              <button onClick={handleAddTodo}>Add</button>
          </form>
              <button onClick={handleLog}>Log</button>
      </>
    );
};

export default AddTodo;
