"use client";
import { tabProps } from "@/vars";
import { useContext, useEffect } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { Intensity, NafTypeValue } from "@/lib/global/declarations/testVars";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { useAtvLvlElementNaf } from "@/lib/hooks/useAtivPhys";
import { exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function NafType(): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    id = "nafType",
    [v, setValue] = useAtvLvlElementNaf(nafr, id, "1.4", { gl, fct, nafr, sar }),
    levels: { v: Intensity; l: NafTypeValue }[] = [
      { v: "leve", l: "1.4" },
      { v: "moderado", l: "1.6" },
      { v: "intenso", l: "1.9" },
      { v: "muitoIntenso", l: "2.2" },
      { v: "sedentario", l: "1.2" },
    ];
  if (ctx1?.refs) ({ gl, fct, nafr, sar } = ctx1.refs);
  useEffect(() => {
    tabProps.naf = nafr?.current ?? document.getElementById(id);
  }, [nafr]);
  useEffect(() => {
    try {
      if (!(tabProps.naf instanceof HTMLSelectElement || tabProps.naf instanceof HTMLInputElement))
        throw new Error(`Failed to validate instance of Selector for Physical activity level`);
      tabProps.factorAtvLvl = v as NafTypeValue;
      tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.naf);
    } catch (e) {
      limitedError(
        `Error executing effect for ${NafType.prototype.constructor.name}:${(e as Error).message}`,
        NafType.prototype.constructor.name,
      );
    }
  }, [nafr, v]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", NafType);
  return (
    <select
      ref={nafr}
      value={v}
      id={id}
      name='naf'
      className={`form-select noInvert consInp min52_900 ${sEn.nafType}`}
      data-title='Fator de Nível de Atividade Física'
      onChange={ev => setValue(ev.currentTarget.value as NafTypeValue)}>
      {levels.map(o => (
        <option key={o.v} value={o.v}>
          {o.l}
        </option>
      ))}
    </select>
  );
}
