import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_BACKEND_URL} from '@env';
const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_BACKEND_URL}`}),
  endpoints(builder) {
    return {
      authUser: builder.mutation({
        query: token => {
          return {
            url: '/user/auth',
            method: 'POST',
            headers: {authorization: token},
          };
        },
      }),
      postLogin: builder.mutation({
        query: userData => {
          return {
            method: 'POST',
            url: '/user/singin',
            body: {...userData},
          };
        },
        transformResponse: (response, meta) => {
          const headers = meta.response.headers.map;
          return {data: response, headers};
        },
      }),
      postSignup: builder.mutation({
        query: userData => {
          return {
            method: 'POST',
            url: '/user/singup',
            body: {...userData},
          };
        },
      }),
    };
  },
});

const {useAuthUserMutation, usePostLoginMutation, usePostSignupMutation} =
  UserApi;
export {
  UserApi,
  useAuthUserMutation,
  usePostLoginMutation,
  usePostSignupMutation,
};
