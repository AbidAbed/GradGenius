import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

const store = configureStore({});

setupListeners(store.dispatch);

export {store};