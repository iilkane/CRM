import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { setToken, setUser } from "../../features/authSlice";
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
          console.log(data);
          dispatch(setToken(data));
          await dispatch(authApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
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
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
