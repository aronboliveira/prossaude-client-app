"use client";
import { useContext } from "react";
import { ScheduleCtx } from "./ScheduleForm";
import TrBSchedTab from "./TrBSchedTab";
export default function ScheduleTbody(): JSX.Element {
  const hours = useContext(ScheduleCtx)?.nHrs;
  return (
    <tbody id='tbSchedule'>
      {hours.map((nHr, i) => (
        <TrBSchedTab nHr={nHr} nRow={i + 1} key={`tr_${i + 1}__${nHr}`} />
      ))}
    </tbody>
  );
}
