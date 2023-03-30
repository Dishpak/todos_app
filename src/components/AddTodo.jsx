import React, {useState, useContext} from 'react';
import AppContext from "../context/AppContext";

const AddTodo = ({setTodos}) => {
  const userId = Number(localStorage.getItem('userId'));
  const [title, setTitle] = useState('');
  const {baseApiUrl} = useContext(AppContext);

  const handleAddTodo = (e) => {
      e.preventDefault()

    if(title.length > 4){
      fetch(`${baseApiUrl}/todos?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          id: Math.floor(Math.random() * 1000 + 200),
          title: title,
          completed: false,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => setTodos((prev) => [...prev, data]));
    } else {
      alert('ghjkl;')
    }

        setTitle('')
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
      </>
    );
};

export default AddTodo;
