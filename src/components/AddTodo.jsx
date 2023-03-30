import React, {useState} from 'react';

const AddTodo = ({todos, setTodos}) => {
    const userId = Number(localStorage.getItem('userId'));
    const [title, setTitle] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault()

        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                id: 2000,
                title: title,
                completed: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
          .then((response) => response.json())
          .then((data) => setTodos((prev) => [...prev, data]));

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
              />
              <button onClick={handleAddTodo}>Add</button>
          </form>
      </>
    );
};

export default AddTodo;
