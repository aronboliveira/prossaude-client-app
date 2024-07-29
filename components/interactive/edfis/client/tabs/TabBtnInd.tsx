import { TabBtnProps } from "@/lib/global/declarations/interfaces";
import { handleIndEv } from "../../TabIndPerc";
import { textTransformPascal } from "@/lib/global/gModel";
"use client";


export default function TabBtnInd({
  nRow,
  nCol,
  lab,
}: TabBtnProps): JSX.Element {
  const pascalCtx = textTransformPascal(lab).replaceAll(" ", "_");
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
