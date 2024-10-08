"use client";
import TrBSchedTab from "./TrBSchedTab";
import { useSelector } from "react-redux";
import { validSchedHours } from "@/lib/global/declarations/types";
import { SchedHoursSliceProps } from "@/lib/global/declarations/interfacesRedux";
export default function ScheduleTbody(): JSX.Element {
  let hours = useSelector<SchedHoursSliceProps, validSchedHours[]>(
    (s: SchedHoursSliceProps): validSchedHours[] => s.schedHoursSlice.hours,
  );
  if (!hours || hours.length === 0) {
    console.warn(`Failed to useSelector`);
    hours = [18, 19, 20, 21];
  }
  return (
    <tbody id='tbSchedule'>
      {hours.map((nHr, i) => (
        <TrBSchedTab nHr={nHr} nRow={i + 1} key={`tr_${i + 1}__${nHr}`} />
      ))}
    </tbody>
  );
}
