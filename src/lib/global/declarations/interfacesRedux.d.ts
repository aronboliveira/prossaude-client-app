import schedStore from "@/redux/schedStore";
import { validSchedCols } from "./types";
import { validSchedHours } from "./types";
export type AppDispatch = typeof schedStore.dispatch;
export interface SchedHoursSliceProps {
  schedHoursSlice: { hours: validSchedHours[] };
}
export interface SchedColsSliceProps {
  schedColsSlice: { cols: validSchedCols[] };
}
