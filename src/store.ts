import { applyMiddleware, createStore, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import reducers from './redux/reducers';
import { AppActions } from './types/redux-action-types';

export type AppState = ReturnType<typeof reducers>;

export const store: Store = applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)(createStore)(reducers);
