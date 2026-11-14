import { act, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { create, createStoreContext, shallow } from '../src';

type Todo = { id: string; done: boolean };

test('only components whose selected slice changed re-render', () => {
  const useApp = create({ count: 0, todos: [] as Todo[] });
  const renders = { count: 0, todos: 0, parent: 0 };

  const Count = () => {
    renders.count++;
    return <span>{useApp((s) => s.count)}</span>;
  };
  const Todos = () => {
    renders.todos++;
    return <span>{useApp((s) => s.todos.length)}</span>;
  };
  const Parent = () => {
    renders.parent++;
    return (
      <>
        <Count />
        <Todos />
      </>
    );
  };

  render(<Parent />);
  act(() => useApp.setState((s) => ({ count: s.count + 1 })));
  act(() => useApp.setState((s) => ({ count: s.count + 1 })));

  expect(renders).toEqual({ parent: 1, count: 3, todos: 1 });
});

test('derived arrays do not loop; shallow skips no-op re-renders', () => {
  const useApp = create({
    count: 0,
    todos: [{ id: 'a', done: false }] as Todo[],
  });
  const errors = vi.spyOn(console, 'error');
  let renders = 0;
  const Open = () => {
    renders++;
    const open = useApp((s) => s.todos.filter((t) => !t.done), shallow); // new array every call
    return <span>{open.length}</span>;
  };

  render(<Open />);
  act(() => useApp.setState((s) => ({ count: s.count + 1 }))); // todos untouched

  expect(renders).toBe(1);
  expect(errors).not.toHaveBeenCalled();
});

test('updater returning the same state is a no-op', () => {
  const useApp = create({ count: 0 });
  const listener = vi.fn();
  useApp.subscribe(listener);
  useApp.setState((s) => s);
  expect(listener).not.toHaveBeenCalled();
});

test('Provider gives each tree its own store (SSR / tests)', () => {
  const { StoreProvider, useStoreContext } = createStoreContext(() => ({
    n: 0,
  }));
  const N = ({ testId }: { testId: string }) => (
    <span data-testid={testId}>{useStoreContext((s) => s.n)}</span>
  );
  render(
    <>
      <StoreProvider>
        <N testId='a' />
      </StoreProvider>
      <StoreProvider>
        <N testId='b' />
      </StoreProvider>
    </>
  );
  expect(screen.getByTestId('a').textContent).toBe('0');
  expect(screen.getByTestId('b').textContent).toBe('0');
});
