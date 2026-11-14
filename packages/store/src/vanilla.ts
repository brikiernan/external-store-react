export type Listener = () => void;
export type Updater<S> = Partial<S> | ((state: S) => Partial<S>);

export interface Store<S> {
  getState: () => S;
  getInitialState: () => S;
  setState: (update: Updater<S>) => void;
  subscribe: (listener: Listener) => () => void;
}

export function createStore<S extends object>(initialState: S): Store<S> {
  let state = initialState;
  const listeners = new Set<Listener>();

  return {
    getState: () => state,
    getInitialState: () => initialState,
    setState(update) {
      const partial =
        typeof update === 'function'
          ? (update as (s: S) => Partial<S>)(state)
          : update;
      if (Object.is(partial, state)) return; // updater returned state unchanged: no-op
      state = { ...state, ...partial };
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
