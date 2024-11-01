"use client";
import { ENCtxProps, TabBtnProps } from "@/lib/global/declarations/interfaces";
import { handleIndEv } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { textTransformPascal } from "@/lib/global/gModel";
import { useContext } from "react";
import { ENCtx } from "../ENForm";
import sEn from "@/styles//modules/enStyles.module.scss";
import { NlMRef, nlFs, nlSel } from "@/lib/global/declarations/types";
export default function TabBtnInd({ nRow, nCol, lab }: TabBtnProps): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel>,
    fspr: NlMRef<nlFs> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    pascalCtx = textTransformPascal(lab).replaceAll(" ", "_");
  if (ctx1?.refs) ({ gl, fct, fspr } = ctx1.refs);
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
        })
      }
      data-row={nRow}
      data-col={nCol}>
      Calcular
    </button>
  );
}
