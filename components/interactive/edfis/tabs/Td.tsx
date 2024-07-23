import { TdProps } from "@/lib/global/declarations/interfaces";
import TabInpProg from "../client/tabs/TabInpProg";
import TabBtnDCut from "../client/tabs/TabBtnDCut";

export default function Td({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  return (
    <td
      className={`tabCelProgCons tabCel${ctx} tabCelRow${ctx}${nRow}`}
      id={`tabCelRow${ctx}${nRow}_${nCol}`}
      itemProp={`${lab.toLowerCase()}Num`}
      data-row={nRow}
      data-col={nCol}
    >
      <label
        htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
        id={`labInpRow${ctx}${nRow}_${nCol}`}
        className={`form-control tabLabProgCons tabLabRow${ctx}${nRow}`}
        data-row={nRow}
        data-col={nCol}
      >
        <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
        <p
          className={`msrProgCons${
            ctx === "DCut" && lab === "Soma" ? " sumMsr" : ""
          }`}
        >
          mm
        </p>
        {ctx === "DCut" && lab === "Soma" ? (
          <TabBtnDCut nCol={nCol}></TabBtnDCut>
        ) : (
          <></>
        )}
      </label>
    </td>
  );
}
