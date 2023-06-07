import { useCallback } from 'react';

import useGlobalStore from './global';
import useTodosActions from './use-todos-actions';

export const useActions = () => {
  const { setState } = useGlobalStore();
  const todosActions = useTodosActions(setState);

  const decrement = useCallback(
    (value = 1) => {
      setState((state) => ({
        ...state,
        count: state.count - value,
      }));
    },
    [setState]
  );

  const increment = useCallback(
    (value = 1) => {
      setState((state) => ({
        ...state,
        count: state.count + value,
      }));
    },
    [setState]
  );

  return {
    ...todosActions,
    decrement,
    increment,
  };
};
