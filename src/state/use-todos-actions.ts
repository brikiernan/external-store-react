import { useCallback } from 'react';

import type { Dispatch } from './create-store';
import type { RootState, Todo } from './store';

const useTodosActions = (setState: Dispatch<RootState>) => {
  const addTodo = useCallback(
    (todo: Todo) => {
      setState((state) => ({
        ...state,
        todos: [...state.todos, todo],
      }));
    },
    [setState]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setState((state) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    [setState]
  );

  const updateTodo = useCallback(
    (id: string, params: { isComplete?: boolean; task?: string }) => {
      setState((state) => ({
        ...state,
        todos: state.todos.map((todo) => {
          if (id === todo.id) return { ...todo, ...params };
          return todo;
        }),
      }));
    },
    [setState]
  );

  return {
    addTodo,
    deleteTodo,
    updateTodo,
  };
};

export default useTodosActions;
