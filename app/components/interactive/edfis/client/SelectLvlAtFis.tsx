"use client";
import { useContext, useEffect } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { Intensity } from "@/lib/global/declarations/testVars";
import { camelToRegular, checkContext, limitedError } from "@/lib/global/gModel";
import { useAtvLvlElementNaf } from "@/lib/hooks/useAtivPhys";
import { person, tabProps } from "@/vars";
import { exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function SelectLvlAtFis(): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    fct: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    id = "selectLvlAtFis",
    levels: Intensity[] = ["leve", "moderado", "intenso", "muitoIntenso", "sedentario"];
  if (ctx1?.refs) ({ gl, nafr, fct, sar } = ctx1.refs);
  const [v, setValue] = useAtvLvlElementNaf(sar, id, "leve", { gl, nafr, fct, sar });
  useEffect(() => {
    tabProps.sa = sar?.current ?? document.getElementById(id);
  }, [sar, v]);
  useEffect(() => {
    try {
      if (
        !(tabProps.sa && (tabProps.sa instanceof HTMLSelectElement || (tabProps.sa as any) instanceof HTMLInputElement))
      )
        throw new Error(`Failed to validate Selector for Physicival activity intensity instance`);
      person.atvLvl = v as Intensity;
      console.log("Person's Activity Level is: " + person.atvLvl);
      tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.sa);
    } catch (e) {
      limitedError(`Error updating person.atvLvl:\n${(e as Error).message}`, "AtvLvl");
    }
  }, [sar, v]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", SelectLvlAtFis);
  return (
    <select
      ref={sar}
      value={v}
      id={id}
      className={`form-select labelIdentif ${sEn.select} ${sEn.selectLvlAtFis} ${sEn.labelIdentif}`}
      name='atv_lvl'
      data-title='Nivel de Atividade Física'
      required
      onChange={ev => setValue(ev.currentTarget.value as Intensity)}>
      {levels.map((o, i) => (
        <option key={`AtFis_op__${i}`} value={o} className='opLvlAtFis'>
          {o === "sedentario" ? "Sedentário" : camelToRegular(o)}
        </option>
      ))}
    </select>
  );
}
