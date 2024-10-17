"use client";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { useContext, useEffect } from "react";
import { ENCtx } from "./ENForm";
import { GordLvl, GordLvlLab } from "@/lib/global/declarations/testVars";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { useAtvLvlElementNaf } from "@/lib/hooks/useAtivPhys";
import { tabProps } from "@/vars";
import { exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function GordCorpLvl(): JSX.Element {
  let fct: NlMRef<nlSel> = null,
    gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    id = "gordCorpLvl",
    [v, setValue] = useAtvLvlElementNaf(gl, id, "eutrofico", { gl, fct, nafr, sar }),
    levels: { v: GordLvl; l: GordLvlLab }[] = [
      { v: "eutrofico", l: "Eutrófico" },
      { v: "abaixo", l: "Com Baixo Peso" },
      { v: "sobrepeso", l: "Com Sobrepeso (não Obeso)" },
      { v: "obeso1", l: "Obeso Grau 1" },
      { v: "obeso2", l: "Obeso Grau 2" },
      { v: "obeso3", l: "Obeso Grau 3" },
    ];
  if (ctx1?.refs) ({ fct, gl, nafr, sar } = ctx1.refs);
  useEffect(() => {
    tabProps.gl = gl?.current ?? document.getElementById(id);
  }, [gl]);
  useEffect(() => {
    try {
      if (!(gl?.current instanceof HTMLSelectElement))
        throw new Error(`Failed to validate instance of Body Fat Level Selector`);
      tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.gl);
    } catch (e) {
      limitedError(
        `Error executing effect for ${GordCorpLvl.prototype.constructor.name}:${(e as Error).message}`,
        GordCorpLvl.prototype.constructor.name,
      );
    }
  }, [v, gl]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "FspCtx", GordCorpLvl);
  return (
    <select
      ref={gl}
      value={v}
      id={id}
      name='gord_corp_lvl'
      className={`form-select noInvert lockSelect ${sEn.select}`}
      data-title='Nível de Gordura Corporal'
      onChange={ev => setValue(ev.currentTarget.value as GordLvl)}>
      {levels.map((o, i) => (
        <option key={`${o.v}__${i}`} value={o.v}>
          {o.l}
        </option>
      ))}
    </select>
  );
}
