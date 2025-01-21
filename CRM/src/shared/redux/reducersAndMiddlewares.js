import { authApi } from "./api/auth";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import teamReducer from "./features/teamSlice";
import projectReducer from "./features/projectSlice";
import reportReducer from "./features/reportSlice";
export const reducer = {
  auth: authReducer,
  user: userReducer,
  team: teamReducer,
  project: projectReducer,
  report: reportReducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const middleWares = [authApi.middleware];
