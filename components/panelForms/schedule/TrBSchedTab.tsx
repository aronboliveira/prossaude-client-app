"use client";
import { HrRowProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import TdBSchedTab from "./TdBSchedTab";
import { useContext } from "react";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function TrBSchedTab({ mainRoot, nHr, nRow }: HrRowProps): JSX.Element {
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    userClass = useContext(PanelCtx).userClass;
  return (
    <tr id={`tr${nHr}`} data-row={nRow}>
      <td className='tabCel' data-col='0' data-row={nRow}>
        <span role='textbox'>
          <strong className='hour' data-hour={`${nHr}:00`}>{`${nHr}:00`}</strong>
        </span>
      </td>
      {cols.map((nCol, _, arr) =>
        nCol === arr.slice(-1)[0] ? (
          <TdBSchedTab
            nCol={nCol}
            nRow={nRow}
            nHr={nHr}
            mainRoot={mainRoot}
            last={true}
            key={`td_schedule__${nRow}-${nCol}-${nHr}`}
          />
        ) : (
          <TdBSchedTab
            nCol={nCol}
            nRow={nRow}
            nHr={nHr}
            mainRoot={mainRoot}
            key={`td_schedule__${nRow}-${nCol}-${nHr}`}
          />
        ),
      )}
    </tr>
  );
}
