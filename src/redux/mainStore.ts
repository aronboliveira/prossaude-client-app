import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice, { defUser } from "./slices/userSlice";
const mainStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    userSlice: defUser,
  },
  reducer: combineReducers({
    userSlice,
  }),
});
export default mainStore;
