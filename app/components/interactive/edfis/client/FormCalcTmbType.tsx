"use client";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { useContext, useEffect, useRef } from "react";
import { ENCtx } from "./ENForm";
import { TMBFormula } from "@/lib/global/declarations/testVars";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { tabProps } from "@/vars";
import { callbackAtvLvlElementNaf, exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function FormCalcTmbType(): JSX.Element {
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    idf = "formCalcTMBType",
    formulas: TMBFormula[] = ["harrisBenedict", "mifflinStJeor", "tinsley"];
  let gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  if (ctx1?.refs) ({ gl, nafr, fct, sar } = ctx1.refs);
  const trusted = useRef<boolean>(false);
  useEffect(() => {
    tabProps.fct = fct?.current ?? document.getElementById(idf);
  }, [fct]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", FormCalcTmbType);
  return (
    <select
      ref={fct}
      id={idf}
      name='form_tmb'
      className={`form-select noInvert lockSelect ${sEn.select} ${sEn.formCalcTMBType}`}
      data-title='Fórmula para TMB'
      onChange={ev => {
        try {
          if (ev.isTrusted) trusted.current = true;
          callbackAtvLvlElementNaf(idf, {
            sa: sar?.current ?? document.getElementById("selectLvlAtFis"),
            gl: gl?.current ?? document.getElementById("gordCorpLvl"),
            naf: nafr?.current ?? document.getElementById("nafType"),
            fct: fct?.current ?? document.getElementById("formCalcTMBType"),
          });
          tabProps.edIsAutoCorrectOn && exeAutoFill(ev.currentTarget);
        } catch (e) {
          limitedError(`Error executing ${ev.type} callback for ${idf}:\n${(e as Error).message}`, idf);
        }
      }}>
      {formulas.map((f, i) => (
        <option key={`formula__${i}`} value={f}>{`${f.charAt(0).toUpperCase()}${f
          .slice(1)
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/st-jeor/gi, "St.Jeor")}`}</option>
      ))}
    </select>
  );
}
