import { useAppStore, type Todo } from './store';

const { setState } = useAppStore;

export const increment = (by = 1) =>
  setState((state) => ({ count: state.count + by }));

export const decrement = (by = 1) =>
  setState((state) => ({ count: state.count - by }));

export const addTodo = (task: string) =>
  setState((state) => ({
    todos: [
      ...state.todos,
      { id: crypto.randomUUID(), isComplete: false, task },
    ],
  }));

export const deleteTodo = (id: string) =>
  setState((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  }));

export const updateTodo = (id: string, changes: Partial<Omit<Todo, 'id'>>) =>
  setState((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, ...changes } : todo
    ),
  }));
