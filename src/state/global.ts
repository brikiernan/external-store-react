import { createContext, useContext } from 'react';
import store from './store';

const useGlobalStore = () => useContext(createContext(store));

export default useGlobalStore;
