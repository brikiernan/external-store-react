# External Store React

A minimal global store for React 19 built on `useSyncExternalStore`.
Components subscribe to a slice of state with a selector and re-render only
when that slice changes, unlike `useState`/`useReducer` (which re-render the
owning subtree) or Context (which re-renders every consumer).

## Layout

- `packages/store` (`@repo/store`): the store library, consumed from source
  - `createStore` (no React), `create` / `useStore` (React binding),
    `createStoreContext` (per-tree stores for SSR and tests), `shallow`
- `apps/example` (`@repo/example`): a Vite demo app (counter + todos)

## Usage

```ts
import { create, shallow } from '@repo/store';

export const useAppStore = create({ count: 0, todos: [] as Todo[] });

// Actions are plain functions; call them from anywhere, inside React or not.
export const increment = () =>
  useAppStore.setState((state) => ({ count: state.count + 1 }));

// In a component: re-renders only when `count` changes.
const count = useAppStore((state) => state.count);

// Derived values: pass an equality fn to skip no-op re-renders.
const open = useAppStore((s) => s.todos.filter((t) => !t.done), shallow);
```

## Scripts

```bash
pnpm install

pnpm dev            # run the example app
pnpm test           # store tests (Vitest)
pnpm typecheck      # TypeScript 7 across the workspace
pnpm lint           # oxlint
pnpm format         # oxfmt (format:check in CI)
pnpm build          # build the example app
```
