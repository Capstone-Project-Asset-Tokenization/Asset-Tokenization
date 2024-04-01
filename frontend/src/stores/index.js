import { configureStore } from '@reduxjs/toolkit'
import { authAPI } from './auth/authAPI'
import assetsReducer from "../features/marketPlace/assetsSlice"
import authDetailReducer from './auth/authSlice'


export const store = configureStore({
  reducer: {
    auth:authDetailReducer,
    assets: assetsReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(authAPI.middleware)
})
