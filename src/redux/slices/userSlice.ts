import {
  ProfessionalTokenPayload,
  StudentTokenPayload,
  UserAction,
  UserActivityDayAction,
  UserAreaAction,
  UserBooleanAction,
  UserNumberAction,
  UserOriginAction,
  UserPrivilegeAction,
  UserState,
  UserStringAction,
} from "@/lib/locals/basePage/declarations/serverInterfaces";
import { createSlice } from "@reduxjs/toolkit/react";
export const defCurrSemester =
  new Date().getMonth() < 6 ? `${new Date().getFullYear()}.1` : `${new Date().getFullYear()}.2`;
export const defUser = {
  loadedData: {
    id: "",
    name: "Anônimo",
    privilege: "student",
    area: "general",
    origin: "general",
    activityDay: "quarta-feira",
    beginningSemester: defCurrSemester,
    beginningDay: new Date().getDate().toString(),
    cpf: 0,
    email: "",
    telephone: "0000-0000",
    authorized: false,
  },
} as UserState;
export const userSlice = createSlice({
  name: "user",
  initialState: defUser,
  reducers: {
    setFullUser(s: UserState, a: UserAction): void {
      s.loadedData = a.payload.v.loadedData;
    },
    deleteUser(s: UserState): void {
      s.loadedData = defUser.loadedData;
    },
    setUserId(s: UserState, a: UserStringAction): void {
      s.loadedData.id = a.payload.v;
    },
    setUserName(s: UserState, a: UserStringAction): void {
      s.loadedData.name = a.payload.v;
    },
    setUserPrivilege(s: UserState, a: UserPrivilegeAction): void {
      s.loadedData.privilege = a.payload.v;
    },
    setUserArea(s: UserState, a: UserAreaAction): void {
      s.loadedData.area = a.payload.v;
    },
    setUserOrigin(s: UserState, a: UserOriginAction): void {
      s.loadedData.origin = a.payload.v;
    },
    setUserBeginningSemester(s: UserState, a: UserStringAction): void {
      s.loadedData.beginningSemester = a.payload.v;
    },
    setUserBeginningDay(s: UserState, a: UserStringAction): void {
      s.loadedData.beginningDay = a.payload.v;
    },
    setUserActivityDay(s: UserState, a: UserActivityDayAction): void {
      s.loadedData.activityDay = a.payload.v;
    },
    setUserCpf(s: UserState, a: UserNumberAction): void {
      s.loadedData.cpf = a.payload.v;
    },
    setUserEmail(s: UserState, a: UserStringAction): void {
      s.loadedData.email = a.payload.v;
    },
    setUserTelephone(s: UserState, a: UserStringAction): void {
      s.loadedData.telephone = a.payload.v;
    },
    setUserAuthorized(s: UserState, a: UserBooleanAction): void {
      s.loadedData.authorized = a.payload.v;
    },
    setUserDre(s: UserState, a: UserNumberAction): void {
      (s as { loadedData: StudentTokenPayload }).loadedData.dre = a.payload.v;
    },
    setUserCurrSemester(s: UserState, a: UserStringAction): void {
      (s as { loadedData: StudentTokenPayload }).loadedData.id = a.payload.v;
    },
    setUserExternal(s: UserState, a: UserBooleanAction): void {
      (s as { loadedData: ProfessionalTokenPayload }).loadedData.external = a.payload.v;
    },
  },
});
export const {
  setFullUser,
  deleteUser,
  setUserId,
  setUserName,
  setUserPrivilege,
  setUserArea,
  setUserOrigin,
  setUserBeginningSemester,
  setUserBeginningDay,
  setUserActivityDay,
  setUserCpf,
  setUserEmail,
  setUserTelephone,
  setUserAuthorized,
  setUserDre,
  setUserCurrSemester,
  setUserExternal,
} = userSlice.actions;
export default userSlice.reducer;
