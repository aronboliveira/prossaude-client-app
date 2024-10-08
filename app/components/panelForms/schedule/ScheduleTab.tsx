"use client";
import { useContext } from "react";
import ThDate from "./ThDate";
import { ScheduleCtx } from "./ScheduleForm";
export default function ScheduleTab({ children }: { children: JSX.Element }): JSX.Element {
  const cols = useContext(ScheduleCtx)?.nCols ?? [];
  return (
    <table
      className='table table-responsive table-striped table-hover form-padded table-transparent'
      id='mainConsDaysCont'>
      <colgroup>
        {cols.map(nCol => (
          <col id={`schedule-col-${nCol}`} data-col={nCol} key={`schedule_col__${nCol}`}></col>
        ))}
      </colgroup>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>
            <div role='group' className='flexAlItCt mg-40b noInvert'>
              <strong>Horário</strong>
            </div>
          </th>
          {cols.map((nCol, _, arr) =>
            nCol === arr.slice(-1)[0] ? (
              <ThDate nCol={nCol} last={true} key={`th_date__${nCol}`} />
            ) : (
              <ThDate nCol={nCol} key={`th_date__${nCol}`} />
            ),
          )}
        </tr>
      </thead>
      {children}
    </table>
  );
}
