import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice, { defUser } from "./slices/userSlice";
import activeUserSlice from "./slices/activeUserSlice";
const mainStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    userSlice: defUser,
    activeUserSlice: {
      user: {},
    },
  },
  reducer: combineReducers({
    userSlice,
    activeUserSlice,
  }),
});
export default mainStore;
