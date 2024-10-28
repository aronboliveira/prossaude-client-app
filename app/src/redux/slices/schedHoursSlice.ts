import { thunkReqStatus, validSchedHours } from "@/lib/global/declarations/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const isValidHour = (hour: number): hour is validSchedHours => [18, 19, 20, 21].includes(hour);
export const fetchSchedHours = createAsyncThunk<number[], void>("ScheduleHours/fetch", async (): Promise<number[]> => {
  console.log("fetching hours...");
  const res = await axios.get("../../mocks/scheduleData.json");
  return res.data.hours as number[];
});
const defSetHours = (s: any, a: PayloadAction<{ hours: validSchedHours[] }>): void => {
  const validHours = a.payload.hours.filter(isValidHour);
  s.hours = validHours.length > 2 ? validHours : s.hours;
};
export const schedHoursSlice = createSlice({
  name: "ScheduleHours",
  initialState: {
    hours: [],
    status: "idle",
    error: "Failed to fetch hours from endpoint",
  } as {
    hours: validSchedHours[];
    status: thunkReqStatus;
    error: string;
  },
  reducers: {
    setHours(s, a: PayloadAction<{ hours: validSchedHours[] }>) {
      defSetHours(s, a);
    },
  },
  extraReducers: b => {
    b.addCase(fetchSchedHours.pending, s => {
      s.status = "loading";
    })
      .addCase(fetchSchedHours.fulfilled, (s, a) => {
        s.status = "fulfilled";
        defSetHours(s, { payload: { hours: a.payload.filter(isValidHour) }, type: "fulfilled" });
      })
      .addCase(fetchSchedHours.rejected, (s, a) => {
        s.status = "rejected";
        s.error = a.error.message || "Failed to fetch hours";
      });
  },
});
export const { setHours } = schedHoursSlice.actions;
export default schedHoursSlice.reducer;
