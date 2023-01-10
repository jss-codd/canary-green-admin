import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./Auth";
import buttonLoaderSlice from "./ButtonLoader";
import coalMineSlice from "./CoalMine";
import oprateRegionsSlice from './OprateRegions';

const store = configureStore({
  reducer: {
    auth: authSlice,
    buttonloader: buttonLoaderSlice,
    coalmine: coalMineSlice,
    operateregion: oprateRegionsSlice,
  },
})
export type AppDispatch = typeof store.dispatch;
export default store;