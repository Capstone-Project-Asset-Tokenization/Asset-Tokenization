import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./auth/authAPI";
// import assetsReducer from "../features/marketPlace/assetsSlice";
import authDetailReducer from "./auth/authSlice";
import { blockchainApi } from "./asset/assetApi";

export const store = configureStore({
  reducer: {
    auth: authDetailReducer,
    // assets: assetsReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [blockchainApi.reducerPath]: blockchainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});
