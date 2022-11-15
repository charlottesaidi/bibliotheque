import { createStore, compose } from 'redux';
import reducers from './reducers';

let store: any;

export function configureStore(initialState: {}) {

    const localstore = createStore(reducers, initialState);
    store = localstore;
    return localstore;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;