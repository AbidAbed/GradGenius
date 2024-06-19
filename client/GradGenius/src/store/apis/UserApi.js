import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {BASE_BACKEND_URL} from '@env';
const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_BACKEND_URL}`}),
  endpoints(builder) {
    return {};
  },
});

export {UserApi};
