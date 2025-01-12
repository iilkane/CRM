import { authApi } from "./api/auth";
import authReducer from "./features/authSlice";

export const reducer = {
  user: authReducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const middleWares = [authApi.middleware];
