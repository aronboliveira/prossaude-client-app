"use client";
import { handleSumClick } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { useContext } from "react";
import { FspCtxProps } from "@/lib/global/declarations/interfaces";
import { FspCtx } from "../FsProgCons";
import sEn from "@/styles//modules/enStyles.module.scss";
import { NlMRef, nlSel, nlTab } from "@/lib/global/declarations/types";
export default function TabBtnDCut({ nCol }: { nCol: number }): JSX.Element {
  let prt: NlMRef<nlSel> = null,
    td: NlMRef<nlTab> = null;
  const ctx1 = useContext<FspCtxProps>(FspCtx);
  if (ctx1) {
    if (ctx1.refs) ({ prt, td } = ctx1.refs);
  }
  return (
    <button
      type='button'
      id={`sumDCBtn9_${nCol}`}
      data-col={nCol}
      className={`btn btn-secondary tabBtnProgCons tabBtnSum tabBtnRowDCut9 ${sEn.tabBtn} ${sEn.btnSecondary} ${sEn.tabBtnSum}`}
      onClick={ev =>
        handleSumClick(ev, {
          prt: prt?.current ?? document.getElementById("tabSelectDCutId"),
          td: td?.current ?? document.getElementById("tabDCut"),
        })
      }>
      Calcular
    </button>
  );
}
