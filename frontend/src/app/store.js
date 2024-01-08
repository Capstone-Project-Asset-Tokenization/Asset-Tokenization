import { configureStore } from '@reduxjs/toolkit'

import assetsReducer from "../features/marketPlace/assetsSlice"

export default configureStore({
  reducer: {
    assets: assetsReducer,
  },
})