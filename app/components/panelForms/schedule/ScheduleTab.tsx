"use client";
import ThDate from "./ThDate";
import { useSelector } from "react-redux";
import { validSchedCols } from "@/lib/global/declarations/types";
import { SchedColsSliceProps } from "@/lib/global/declarations/interfacesRedux";
export default function ScheduleTab({ children }: { children: JSX.Element }): JSX.Element {
  let cols = useSelector<SchedColsSliceProps, validSchedCols[]>(
    (s: SchedColsSliceProps): validSchedCols[] => s.schedColsSlice.cols,
  );
  if (!cols || cols.length === 0) {
    console.warn(`Failed to useSelector`);
    cols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
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
