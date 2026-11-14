import { create } from '@repo/store';

export type Todo = { id: string; isComplete: boolean; task: string };

export type RootState = {
  count: number;
  todos: Todo[];
};

export const useAppStore = create<RootState>({
  count: 0,
  todos: [],
});
