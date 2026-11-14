import { createContext, use, useState, type ReactNode } from 'react';
import { createStore, type Store } from './vanilla';
import { useStore } from './react';

export function createStoreContext<S extends object>(init: () => S) {
  const StoreContext = createContext<Store<S> | null>(null);

  function StoreProvider({ children }: { children: ReactNode }) {
    const [store] = useState(() => createStore(init())); // one store per Provider instance
    return <StoreContext value={store}>{children}</StoreContext>; // React 19: no .Provider
  }

  function useStoreApi(): Store<S> {
    const store = use(StoreContext);
    if (!store) throw new Error('Missing <StoreProvider>');
    return store;
  }

  function useStoreContext<T>(
    selector: (state: S) => T,
    isEqual?: (a: T, b: T) => boolean
  ): T {
    return useStore(useStoreApi(), selector, isEqual);
  }

  return { StoreProvider, useStoreApi, useStoreContext };
}
