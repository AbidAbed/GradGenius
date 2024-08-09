import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {UserSlice} from './slices/UserSlice';
import {ProjectsSlices, addProjects} from './slices/ProjectSlice';
import {ProjectsApi, useGetProjectsQuery} from './apis/ProjectApi';
import {
  UserApi,
  useAuthUserMutation,
  usePostLoginMutation,
  usePostSignupMutation,
} from './apis/UserApi';
import {
  ConfigSlice,
  changeIsLoggedIn,
  changePath,
  changeToken,
} from './slices/ConfigSlice';

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    projects: ProjectsSlices.reducer,
    config: ConfigSlice.reducer,
    [ProjectsApi.reducerPath]: ProjectsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(ProjectsApi.middleware)
      .concat(UserApi.middleware),
});

setupListeners(store.dispatch);

export {
  store,
  changeIsLoggedIn,
  changePath,
  changeToken,
  useAuthUserMutation,
  usePostLoginMutation,
  usePostSignupMutation,
  useGetProjectsQuery,
  addProjects,
};
