import axios from "axios";
import { logout, setToken } from "../features/authSlice";
import { v4 as uuid } from "uuid";

const baseUrl = import.meta.env.VITE_BASE_URL;
export const axiosBaseQuery =
  ({ baseUrl = "", headers }) =>
  async ({ url, params, method, data, responseType }, { signal, getState }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method: method ? method : "GET",
        ...(params && { params: params }),
        ...(headers && { headers: headers({}, { getState, signal }) }),
        ...(data && { data: data }),
        responseType: responseType ? responseType : "json",
      });
      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };

export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseUrl: baseUrl,
  headers: (headers, { getState }) => {
    const { auth } = getState();
    console.log(auth.token);
    if (auth?.token) {
      headers["Authorization"] = `Bearer ${auth.token}`;
    }
    headers["x-requestid"] = uuid();
    return headers;
  },
});

export const APIBaseQuery = async (args, api, extraOptions) => {
  let result = await APIBaseQueryInterceptor(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401
    // result.error.data?.message === "Unauthorized"
  ) {
    const state = api;
    const userState = state.getState();
    const { user } = userState;
    const { refreshToken } = user;
    const refreshResult = await APIBaseQueryInterceptor(
      {
        url: "auth/refreshToken",
        method: "POST",
        data: { refreshToken: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const data = refreshResult?.data;
      const { token, refreshToken, expiresAt } = data;

      await state.dispatch(setToken({ token, refreshToken, expiresAt }));
      result = await APIBaseQueryInterceptor(args, api, extraOptions);
    } else {
      state.dispatch(logout());
    }
  }
  return result;
};
