"use client";
import { tabProps, timers } from "@/vars";
import { useContext, useEffect, useRef } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { Intensity, NafTypeValue } from "@/lib/global/declarations/testVars";
import { checkContext } from "@/lib/global/gModel";
import { callbackAtvLvlElementNaf, exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles//modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
import { dispatchFactorAtvLvl } from "@/lib/locals/edFisNutPage/edFisNutModel";
export default function NafType(): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    trusted = useRef<boolean>(false),
    idf = "nafType",
    levels: { l: string; e: Intensity; v: NafTypeValue }[] = [
      { l: "Leve", e: "leve", v: "1.4" },
      { l: "Moderado", e: "moderado", v: "1.6" },
      { l: "Intenso", e: "intenso", v: "1.9" },
      { l: "Muito Intenso", e: "muitoIntenso", v: "2.2" },
      { l: "Sedentário", e: "sedentario", v: "1.2" },
    ];
  if (ctx1?.refs) ({ gl, fct, nafr, sar } = ctx1.refs);
  useEffect(() => {
    tabProps.naf = nafr?.current ?? document.getElementById(idf);
  }, [nafr]);
  useEffect(() => {
    setTimeout(() => {
      try {
        const query = document.getElementById(idf);
        dispatchFactorAtvLvl(
          (nafr?.current?.value as NafTypeValue) ||
            ((query instanceof HTMLSelectElement || query instanceof HTMLInputElement) &&
              (query as HTMLSelectElement).value),
        );
        if (!(nafr?.current instanceof HTMLSelectElement)) return;
        const selected = nafr.current.selectedOptions[0];
        if (selected.dataset.intensity) nafr.current.dataset.intensity = selected.dataset.intensity;
      } catch (e) {
        return;
      }
    }, timers.personENTimer * 0.75);
  }, [nafr]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", NafType);
  return (
    <select
      ref={nafr}
      id={idf}
      name='naf'
      className={`form-select noInvert consInp min52_900 ${sEn.nafType}`}
      data-title='Fator de Nível de Atividade Física'
      onChange={ev => {
        try {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          const selected = ev.currentTarget.selectedOptions[0];
          if (selected.dataset.intensity) ev.currentTarget.dataset.intensity = selected.dataset.intensity;
          callbackAtvLvlElementNaf(idf, {
            sa: sar?.current ?? document.getElementById("selectLvlAtFis"),
            gl: gl?.current ?? document.getElementById("gordCorpLvl"),
            naf: nafr?.current ?? document.getElementById("nafType"),
            fct: fct?.current ?? document.getElementById("formCalcTMBType"),
          });
          dispatchFactorAtvLvl(ev.currentTarget.value as NafTypeValue);
          tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.naf);
        } catch (e) {
          return;
        }
      }}>
      {levels.map(o => (
        <option key={o.v} value={o.v} data-intensity={o.e}>
          {o.v} — {o.l}
        </option>
      ))}
    </select>
  );
}
