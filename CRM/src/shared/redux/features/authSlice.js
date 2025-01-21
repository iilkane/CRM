import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      const { token, refreshToken, expiresAt } = action.payload;
      console.log(action.payload, "from slice");
      return {
        ...state,
        token,
        refreshToken,
        expiresAt,
      };
    },
    logout: () => initialState,
  },
});

export const reducer = persistReducer(
  {
    key: "auth",
    storage,
    whitelist: ["user", "token", "refreshToken", "expiresAt"],
  },
  authSlice.reducer
);

export const { setUser, setToken, logout } = authSlice.actions;

export default reducer;
