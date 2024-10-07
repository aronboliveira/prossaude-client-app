import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tabPropsSlice from "./slices/tabPropsSlice";
const enStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {},
  reducer: combineReducers({ tabPropsSlice }),
});
export default enStore;
