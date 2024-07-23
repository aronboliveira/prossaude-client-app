"use client";

import { TabInpProps } from "@/lib/global/declarations/interfaces";
import { handleIndEv } from "../../TabIndPerc";
import { textTransformPascal } from "@/lib/global/gModel";

export default function TabBtnInd({
  nRow,
  nCol,
  ctx,
}: TabInpProps): JSX.Element {
  const pascalCtx = textTransformPascal(ctx);
  return (
    <button
      type="button"
      id={`btn${pascalCtx}${nCol - 1}Cel${nRow}_${nCol}`}
      className={`btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtn${pascalCtx} tabBtnCol${
        nCol - 1
      }`}
      onClick={ev => handleIndEv(ev, "BTN")}
      data-row={nRow}
      data-col={nCol}
    >
      Calcular
    </button>
  );
}
