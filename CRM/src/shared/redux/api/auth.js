import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "./axiosBase";
import {setToken,setUser} from '../features/userSlice'




export const authApi = createApi({
  baseQuery: APIBaseQuery,

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query(data) {
        return {
          url: "auth/login",
          method: "POST", 
          data,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          await dispatch(authApi.endpoints.getMe.initiate(null))
        } catch (error) {}
      },
    }),
    getMe: builder.query({
      query() {
      
        return {
          url: "auth/profile",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(authApi.util.resetApiState());

        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation} = authApi;

