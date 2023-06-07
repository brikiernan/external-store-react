import { useRef, useState } from 'react';
import { useActions, useSelector } from './state';

const randomId = (num = 36) => Math.random().toString(num).substring(2);

const Todos = () => {
  const addRef = useRef<HTMLInputElement | null>(null);
  const updateRef = useRef<HTMLInputElement | null>(null);
  const { addTodo, deleteTodo, updateTodo } = useActions();
  const todos = useSelector((state) => state.todos);
  const [editId, setEditId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addRef.current) return;
    addTodo({ id: randomId(), isComplete: false, task: addRef.current.value });
    addRef.current.value = '';
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updateRef.current) return;
    updateTodo(editId, { task: updateRef.current.value });
    setEditId('');
  };

  return (
    <div className='stack'>
      <h3>Add A Todo</h3>
      <form className='h-stack' onSubmit={handleSubmit}>
        <label>Task:</label>
        <input type='text' ref={addRef} />
        <button type='submit'>Add Todo</button>
      </form>
      <div className='stack todos'>
        <h3>Todos</h3>
        {todos
          .map(({ id, isComplete, task }) => (
            <form className='h-stack' key={id} onSubmit={handleUpdate}>
              <input
                type='checkbox'
                checked={isComplete}
                onChange={(e) =>
                  updateTodo(id, { isComplete: e.target.checked })
                }
              />
              <input
                type='text'
                ref={updateRef}
                defaultValue={task}
                readOnly={editId !== id}
                style={{ textDecoration: isComplete ? 'line-through' : 'none' }}
                onBlur={() => setEditId('')}
              />
              {editId !== id && (
                <button onClick={() => setEditId(id)} disabled={isComplete}>
                  Edit
                </button>
              )}
              {editId !== id && (
                <button onClick={() => deleteTodo(id)}>Delete</button>
              )}
              {editId === id && (
                <button onClick={() => setEditId('')}>Cancel</button>
              )}
              {editId === id && <button type='submit'>Update</button>}
            </form>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default Todos;
