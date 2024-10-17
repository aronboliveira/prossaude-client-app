"use client";
import { ENCtxProps, ENTabsCtxProps, TabBtnProps, TargInps } from "@/lib/global/declarations/interfaces";
import { handleIndEv } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { checkContext, textTransformPascal } from "@/lib/global/gModel";
import { useContext, useEffect } from "react";
import { ENCtx } from "../ENForm";
import { ENTabsCtx } from "../FsTabs";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlFs, nlSel } from "@/lib/global/declarations/types";
export default function TabBtnInd({ nRow, nCol, lab }: TabBtnProps): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel>,
    fspr: NlMRef<nlFs> = null,
    targs: TargInps | null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    ctx2 = useContext<ENTabsCtxProps>(ENTabsCtx),
    pascalCtx = textTransformPascal(lab).replaceAll(" ", "_");
  if (ctx1?.refs) ({ gl, fct, fspr } = ctx1.refs);
  if (ctx2?.targs) ({ targs } = ctx2);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", TabBtnInd);
  checkContext(ctx2, "ENCtx", TabBtnInd);
  useEffect(() => {
    setTimeout(() => {
      console.log(ctx2);
    }, 5000);
  }, []);
  return (
    <button
      type='button'
      id={`btn${pascalCtx}${nCol - 1}Cel${nRow}_${nCol}`}
      className={`btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtn${pascalCtx} tabBtnCol${nCol - 1} ${
        sEn.tabBtn
      } ${sEn.btnSecondary}`}
      onClick={ev =>
        handleIndEv("BTN", {
          el: ev.currentTarget,
          fsp: fspr?.current ?? document.getElementById("fsProgConsId"),
          gl: gl?.current ?? document.getElementById("gordCorpLvl"),
          fct: fct?.current ?? document.getElementById("formCalcTMBType"),
          refs: targs ?? null,
        })
      }
      data-row={nRow}
      data-col={nCol}>
      Calcular
    </button>
  );
}
