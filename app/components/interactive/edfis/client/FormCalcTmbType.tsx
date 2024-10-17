"use client";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { useContext, useEffect } from "react";
import { ENCtx } from "./ENForm";
import { TMBFormula } from "@/lib/global/declarations/testVars";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { useAtvLvlElementNaf } from "@/lib/hooks/useAtivPhys";
import { tabProps } from "@/vars";
import { exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function FormCalcTmbType(): JSX.Element {
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    id = "formCalcTMBType",
    formulas: TMBFormula[] = ["harrisBenedict", "mifflinStJeor", "tinsley"];
  let gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  if (ctx1?.refs) ({ gl, nafr, fct, sar } = ctx1.refs);
  const [v, setValue] = useAtvLvlElementNaf(fct, id, "harrisBenedict", { gl, nafr, fct, sar });
  useEffect(() => {
    tabProps.fct = fct?.current ?? document.getElementById(id);
  }, [fct]);
  useEffect(() => {
    try {
      if (!(fct?.current instanceof HTMLSelectElement))
        throw new Error(`Failed to validate instance of Selector for current TMB formula`);
      tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.fct);
    } catch (e) {
      limitedError(
        `Error executing effect for ${FormCalcTmbType.prototype.constructor.name}:${(e as Error).message}`,
        FormCalcTmbType.prototype.constructor.name,
      );
    }
  }, [v, fct]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", FormCalcTmbType);
  return (
    <select
      ref={fct}
      value={v}
      id={id}
      name='form_tmb'
      className={`form-select noInvert lockSelect ${sEn.select} ${sEn.formCalcTMBType}`}
      data-title='Fórmula para TMB'
      onChange={ev => setValue(ev.currentTarget.value as TMBFormula)}>
      {formulas.map((f, i) => (
        <option key={`formula__${i}`} value={f}>{`${f.charAt(0).toUpperCase()}${f
          .slice(1)
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/st-jeor/gi, "St.Jeor")}`}</option>
      ))}
    </select>
  );
}
