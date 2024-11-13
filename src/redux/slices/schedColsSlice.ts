import { thunkReqStatus, validSchedCols } from "@/lib/global/declarations/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const isValidCol = (col: number): col is validSchedCols => [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(col);
export const fetchSchedCols = createAsyncThunk<number[], void>("ScheduleCols/fetch", async (): Promise<number[]> => {
  const res = await axios.get("/mocks/scheduleData.json");
  return res.data.cols as number[];
});
const defSetCols = (s: any, a: PayloadAction<{ cols: validSchedCols[] }>): void => {
  let validCols = a.payload.cols.filter(isValidCol);
  if (validCols.length > 9) validCols = validCols.slice(0, 10);
  s.cols = validCols.length > 3 || validCols.length < 10 ? validCols : s.cols;
};
export const schedColsSlice = createSlice({
  name: "ScheduleCols",
  initialState: {
    cols: [],
    status: "idle",
    error: "Failed to fetch columns from endpoint",
  } as { cols: validSchedCols[]; status: thunkReqStatus; error: string },
  reducers: {
    setCols(s, a: PayloadAction<{ cols: validSchedCols[] }>) {
      defSetCols(s, a);
    },
  },
  extraReducers: b =>
    b
      .addCase(fetchSchedCols.pending, s => {
        s.status = "loading";
      })
      .addCase(fetchSchedCols.fulfilled, (s, a) => {
        s.status = "fulfilled";
        defSetCols(s, { payload: { cols: a.payload?.filter(isValidCol) ?? [] }, type: "fulfilled" });
      })
      .addCase(fetchSchedCols.rejected, (s, a) => {
        s.status = "rejected";
        s.error = a.error.message || "Failed to fetch columns";
      }),
});
export const { setCols } = schedColsSlice.actions;
export default schedColsSlice.reducer;
