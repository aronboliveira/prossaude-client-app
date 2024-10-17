"use client";
import { handleSumClick } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { useContext } from "react";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { FspCtx } from "../FsProgCons";
import { checkContext } from "@/lib/global/gModel";
import { ENCtx } from "../ENForm";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function TabBtnDCut({ nCol }: { nCol: number }): JSX.Element {
  const { prt, td } = useContext<FspCtxProps>(FspCtx).refs,
    { fspr } = useContext<ENCtxProps>(ENCtx).refs;
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(FspCtx);
  checkContext(ctx, "FspCtx", TabBtnDCut);
  return (
    <button
      type='button'
      id={`sumDCBtn9_${nCol}`}
      data-col={nCol}
      className={`btn btn-secondary tabBtnProgCons tabBtnSum tabBtnRowDCut9 ${sEn.tabBtn} ${sEn.btnSecondary}`}
      onClick={ev =>
        handleSumClick(ev, {
          prt: prt?.current ?? document.getElementById("tabSelectDCutId"),
          td: td?.current ?? document.getElementById("tabDCut"),
          fsp: fspr?.current ?? document.getElementById("fsProgConsId"),
        })
      }>
      Calcular
    </button>
  );
}
