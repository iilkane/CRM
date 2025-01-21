import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/userSlice";
// import teamReducer from "./features/teamSlice";
// import reportReducer from "./features/reportSlice";
// import projectReducer from "./features/projectSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { middleWares, reducer } from "./reducersAndMiddlewares";

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleWares),
});

export const persistor = persistStore(store);
