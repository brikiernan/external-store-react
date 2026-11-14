import { useState, type SubmitEvent } from 'react';
import {
  addTodo,
  deleteTodo,
  updateTodo,
  useAppStore,
  type Todo,
} from './state';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.task);

  const startEditing = () => {
    setDraft(todo.task);
    setIsEditing(true);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = draft.trim();
    if (!isEditing || !task) return;
    updateTodo(todo.id, { task });
    setIsEditing(false);
  };

  return (
    <form className='h-stack' onSubmit={handleSubmit}>
      <input
        type='checkbox'
        aria-label='Complete'
        checked={todo.isComplete}
        onChange={(e) => updateTodo(todo.id, { isComplete: e.target.checked })}
      />
      <input
        type='text'
        aria-label='Task'
        value={isEditing ? draft : todo.task}
        readOnly={!isEditing}
        onChange={(e) => setDraft(e.target.value)}
        style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}
      />
      {isEditing ? (
        <>
          <button type='button' onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button type='submit'>Update</button>
        </>
      ) : (
        <>
          <button
            type='button'
            onClick={startEditing}
            disabled={todo.isComplete}
          >
            Edit
          </button>
          <button type='button' onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </>
      )}
    </form>
  );
};

const Todos = () => {
  const todos = useAppStore((state) => state.todos);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const task = String(new FormData(form).get('task') ?? '').trim();
    if (!task) return;
    addTodo(task);
    form.reset();
  };

  return (
    <div className='stack'>
      <h3>Add A Todo</h3>
      <form className='h-stack' onSubmit={handleSubmit}>
        <label htmlFor='new-task'>Task:</label>
        <input id='new-task' name='task' type='text' />
        <button type='submit'>Add Todo</button>
      </form>
      <div className='stack todos'>
        <h3>Todos</h3>
        {todos.length > 0 ? (
          [...todos]
            .reverse()
            .map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <p>Nothing todo.</p>
        )}
      </div>
    </div>
  );
};

export default Todos;
