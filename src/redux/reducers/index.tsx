import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./Auth";
import buttonLoaderSlice from "./ButtonLoader";
import coalMineSlice from "./CoalMine";

const store = configureStore({
  reducer: {
    auth: authSlice,
    buttonloader: buttonLoaderSlice,
    coalmine: coalMineSlice,
  },
})
export type AppDispatch = typeof store.dispatch;
export default store;