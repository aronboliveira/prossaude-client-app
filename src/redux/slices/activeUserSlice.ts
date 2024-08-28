import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/global/declarations/classes";
import { LoadedUserState } from "@/pages/api/ts/serverInterfaces";
import { experimentalUser } from "../../../components/interactive/base/MainContainer";
export const activeUserSlice = createSlice({
  name: "user",
  initialState: {
    user: new User({
      name: experimentalUser.loadedData.name,
      privilege: experimentalUser.loadedData.privilege,
      area: experimentalUser.loadedData.area,
      email: experimentalUser.loadedData.email,
      telephone: experimentalUser.loadedData.telephone,
    }),
  } as LoadedUserState,
  reducers: {
    setUser(state, action: PayloadAction<User | Readonly<User>>) {
      state.user = Object.freeze(action.payload);
    },
    clearUser(state) {
      state.user = null;
    },
  },
});
export const { setUser, clearUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
export const selectUser = (state: { user: LoadedUserState }) => state.user.user;
