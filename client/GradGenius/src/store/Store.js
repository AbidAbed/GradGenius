import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {UserSlice} from './slices/UserSlice';
import {ProjectsSlices} from './slices/ProjectSlice';
import {ProjectsApi} from './apis/ProjectApi';
import {UserApi} from './apis/UserApi';

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    projects: ProjectsSlices.reducer,
    [ProjectsApi.reducerPath]: ProjectsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(ProjectsApi.middleware)
      .concat(UserApi.middleware),
});

setupListeners(store.dispatch);

export {store};
