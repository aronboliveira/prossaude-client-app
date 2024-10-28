import { combineReducers, configureStore } from "@reduxjs/toolkit";
import schedHoursSlice from "./slices/schedHoursSlice";
import schedColsSlice from "./slices/schedColsSlice";
const schedStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    schedHoursSlice: {
      hours: [],
      status: "idle",
      error: "",
    },
    schedColsSlice: {
      cols: [],
      status: "idle",
      error: "",
    },
  },
  reducer: combineReducers({
    schedHoursSlice,
    schedColsSlice,
  }),
});
export default schedStore;
