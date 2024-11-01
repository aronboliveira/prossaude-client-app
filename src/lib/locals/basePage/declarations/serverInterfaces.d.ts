import { JwtPayload } from "jwt-decode";
export type privilege = "student" | "supervisor" | "coordinator";
export type origin = "general" | "edfis" | "med" | "nut" | "od" | "psy";
export type area =
  | "general"
  | "medicine"
  | "nutrition"
  | "physical_education"
  | "psychology"
  | "odontology"
  | "technology";
export type day = "quarta-feira" | "sexta-feira" | "quarta-feira_sexta-feira";
export interface UserTokenPayload extends JwtPayload {
  id: string;
  name: string;
  privilege: privilege;
  area: area;
  origin: origin;
  beginningSemester: string;
  beginningDay: string;
  activityDay: day;
  cpf?: number;
  email?: string;
  telephone?: string;
  authorized?: boolean;
}
export interface StudentTokenPayload extends UserTokenPayload {
  dre: number;
  currSemester: number;
}
export interface ProfessionalTokenPayload extends UserTokenPayload {
  external: boolean;
}
export type ConcreteUserTokenPayload =
  | StudentTokenPayload
  | ProfessionalTokenPayload;
export interface UserWrapper {
  [k: string]: UserState;
}
export interface UserState {
  loadedData: ConcreteUserTokenPayload;
}
export interface UserAction {
  payload: {
    v: UserState;
  };
}
export interface UserStringAction {
  payload: {
    v: string;
  };
}
export interface UserPrivilegeAction {
  payload: {
    v: privilege;
  };
}
export interface UserAreaAction {
  payload: {
    v: area;
  };
}
export interface UserOriginAction {
  payload: {
    v: origin;
  };
}
export interface UserActivityDayAction {
  payload: {
    v: day;
  };
}
export interface UserNumberAction {
  payload: {
    v: number;
  };
}
export interface UserBooleanAction {
  payload: {
    v: boolean;
  };
}
interface LoadedUserState {
  user: User | null;
}
export type mainStore = EnhancedStore<
  {
    userSlice: UserState;
  },
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<
          {
            userSlice: UserState;
          },
          undefined,
          UnknownAction
        >;
      }>,
      StoreEnhancer
    ]
  >
>;
