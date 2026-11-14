import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { createStore, type Store } from './vanilla';

export function useStore<S, T>(
  store: Store<S>,
  selector: (state: S) => T,
  isEqual?: (a: T, b: T) => boolean
): T {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getInitialState, // server snapshot: must match what the server rendered
    selector,
    isEqual
  );
}

export function create<S extends object>(initialState: S) {
  const store = createStore(initialState);
  const useBoundStore = <T>(
    selector: (state: S) => T,
    isEqual?: (a: T, b: T) => boolean
  ) => useStore(store, selector, isEqual);
  return Object.assign(useBoundStore, store);
}
