"use client";
import { useContext, useEffect, useRef } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { Intensity } from "@/lib/global/declarations/testVars";
import { camelToRegular, checkContext, limitedError } from "@/lib/global/gModel";
import { person, tabProps, timers } from "@/vars";
import { callbackAtvLvlElementNaf, exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function SelectLvlAtFis(): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    trusted = useRef<boolean>(false),
    idf = "selectLvlAtFis",
    levels: Intensity[] = ["leve", "moderado", "intenso", "muitoIntenso", "sedentario"];
  if (ctx1?.refs) ({ gl, nafr, fct, sar } = ctx1.refs);
  useEffect(() => {
    tabProps.sa = sar?.current ?? document.getElementById(idf);
  }, [sar]);
  useEffect(() => {
    setTimeout(() => {
      try {
        const query = document.getElementById(idf);
        person.atvLvl =
          (sar?.current?.value as Intensity) ||
          (((query instanceof HTMLSelectElement || query instanceof HTMLInputElement) &&
            (query as HTMLSelectElement).value) as Intensity) ||
          "leve";
      } catch (e) {
        return;
      }
    }, timers.personENTimer * 0.75);
  }, [sar]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", SelectLvlAtFis);
  return (
    <select
      ref={sar}
      id={idf}
      className={`form-select labelIdentif ${sEn.select} ${sEn.selectLvlAtFis} ${sEn.labelIdentif}`}
      name='atv_lvl'
      data-title='Nivel de Atividade Física'
      required
      onChange={ev => {
        try {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          callbackAtvLvlElementNaf(idf ?? "", {
            sa: sar?.current ?? document.getElementById("selectLvlAtFis"),
            gl: gl?.current ?? document.getElementById("gordCorpLvl"),
            naf: nafr?.current ?? document.getElementById("nafType"),
            fct: fct?.current ?? document.getElementById("formCalcTMBType"),
          });
          person.atvLvl = ev.currentTarget.value as Intensity;
          console.log("Person's Activity Level is: " + person.atvLvl);
          tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.sa);
        } catch (e) {
          limitedError(`Error executing ${ev.type} callback for ${idf}:\n${(e as Error).message}`, idf);
        }
      }}>
      {levels.map((o, i) => (
        <option key={`AtFis_op__${i}`} value={o} className='opLvlAtFis'>
          {o === "sedentario" ? "Sedentário" : camelToRegular(o)}
        </option>
      ))}
    </select>
  );
}
