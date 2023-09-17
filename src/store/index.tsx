import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, Store } from 'redux';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

import { AppReducers } from '../reducers';

export let store: Store<any, AnyAction>;

export const ReduxProvider = ({
  appReducers,
  appServices,
  children,
  nodeEnv,
}: {
  appReducers: any;
  appServices: any;
  children?: ReactNode;
  nodeEnv?: 'production' | 'development' | any;
}) => {
  store = configureStore({
    devTools: nodeEnv !== 'production',
    reducer: combineReducers({ ...AppReducers, ...appReducers }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([...appServices]),
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
