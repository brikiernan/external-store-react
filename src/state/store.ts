import createStore from './create-store';

export type Todo = { id: string; isComplete: boolean; task: string };

export type RootState = {
  count: number;
  todos: Todo[];
};

const store = createStore<RootState>({
  count: 0,
  todos: [],
});

export default store;
