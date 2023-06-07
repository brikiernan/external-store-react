import { useSyncExternalStore } from 'react';
import type { RootState } from './store';
import useGlobalStore from './global';

type Selector<Selected> = (state: RootState) => Selected;

export const useSelector = <Selected>(selector: Selector<Selected>) => {
  const { subscribe, getState } = useGlobalStore();
  return useSyncExternalStore(subscribe, () => selector(getState()));
};
