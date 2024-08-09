import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_BACKEND_URL} from '@env';
const ProjectsApi = createApi({
  reducerPath: 'ProjectsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_BACKEND_URL}`}),
  endpoints(builder) {
    return {
      getProjects: builder.query({
        query: requestData => {
          return {
            method: 'GET',
            url: '/projects',
            headers: {authorization: requestData.token},
            params: {page: requestData.page},
          };
        },
      }),
    };
  },
});
const {useGetProjectsQuery} = ProjectsApi;
export {ProjectsApi, useGetProjectsQuery};
