import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/global/declarations/classes";
import { LoadedUserState } from "@/lib/locals/basePage/declarations/serverInterfaces";
import { experimentalProps } from "@/vars";
export const activeUserSlice = createSlice({
  name: "user",
  initialState: {
    user: new User({
      name: experimentalProps.experimentalUser.loadedData.name,
      privilege: experimentalProps.experimentalUser.loadedData.privilege,
      area: experimentalProps.experimentalUser.loadedData.area,
      email: experimentalProps.experimentalUser.loadedData.email,
      telephone: experimentalProps.experimentalUser.loadedData.telephone,
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
export const selectUser = (state: { user: LoadedUserState }): any => state.user.user;
