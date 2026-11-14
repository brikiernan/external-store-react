import { useRef, useState, type SubmitEvent } from 'react';
import { addTodo, deleteTodo, updateTodo, useAppStore } from './state';

const Todos = () => {
  const addRef = useRef<HTMLInputElement | null>(null);
  const updateRef = useRef<HTMLInputElement | null>(null);
  const todos = useAppStore((state) => state.todos);
  const [editId, setEditId] = useState('');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addRef.current) return;
    addTodo(addRef.current.value);
    addRef.current.value = '';
  };

  const handleUpdate = (e: SubmitEvent<HTMLFormElement>) => {
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
        {todos.length > 0 ? (
          todos
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
                  style={{
                    textDecoration: isComplete ? 'line-through' : 'none',
                  }}
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
            .reverse()
        ) : (
          <p>Nothing todo.</p>
        )}
      </div>
    </div>
  );
};

export default Todos;
