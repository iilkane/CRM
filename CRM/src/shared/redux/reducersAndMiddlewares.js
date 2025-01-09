import { authApi } from "./api/auth";
import userReducer from "./features/userSlice";

export const reducer = {
    user : userReducer,
    [authApi.reducerPath]: authApi.reducer,



};

export const middleWares = [
  authApi.middleware
];
