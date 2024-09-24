"use client";
import { handleSumClick } from "../../TabDCut";
export default function TabBtnDCut({ nCol }: { nCol: number }): JSX.Element {
  return (
    <button
      type='button'
      id={`sumDCBtn9_${nCol}`}
      className='btn btn-secondary tabBtn tabBtnProgCons tabBtnSum tabBtnRowDCut9'
      onClick={handleSumClick}
    >
      Calcular
    </button>
  );
}
