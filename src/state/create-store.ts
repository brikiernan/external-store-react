type GetState<State> = () => State;
type Callback<State> = (state: State) => State;
export type Dispatch<State> = (callback: Callback<State>) => void;
type Subscribe = (callback: () => void) => () => void;
type Store<State> = {
  getState: GetState<State>;
  setState: Dispatch<State>;
  subscribe: Subscribe;
};

export default function createStore<State>(state: State): Store<State> {
  const subscribers = new Set<(state: State) => void>();

  const getState = () => state;

  const setState = (callback: Callback<State>) => {
    const newState = callback(state);
    state = newState;
    subscribers.forEach((subscriber) => subscriber(state));
  };

  const subscribe = (callback: (state: State) => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  return { getState, setState, subscribe };
}
