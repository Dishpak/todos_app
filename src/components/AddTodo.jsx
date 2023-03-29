import React, {useState} from 'react';

const AddTodo = ({todos, setTodos}) => {
    const userId = localStorage.getItem('userId');
    const handleAddTodo = (e) => {
        e.preventDefault()

        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));

        title && setTodos((prev) => {
            return [
              ...prev,
                {
                    userId: 1,
                    id: 12345678,
                    title: title,
                    completed: false,
                }
            ]
        })
        setTitle('')

    }

    const [title, setTitle] = useState('');
    console.log(todos);

    return (
      <div>
          <form action="">
              <input
                type="text"
                placeholder={'Give a title'}
                name='title'
                value={title}
                onChange={({target}) => setTitle(target.value)}
              />
              <button onClick={handleAddTodo}>Add</button>
          </form>
      </div>
    );
};

export default AddTodo;
