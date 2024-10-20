"use client";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { useContext, useEffect, useRef } from "react";
import { ENCtx } from "./ENForm";
import { GordLvl, GordLvlLab } from "@/lib/global/declarations/testVars";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { tabProps } from "@/vars";
import { callbackAtvLvlElementNaf, exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
export default function GordCorpLvl(): JSX.Element {
  let fct: NlMRef<nlSel> = null,
    gl: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    trusted = useRef<boolean>(false),
    idf = "gordCorpLvl",
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
    tabProps.gl = gl?.current ?? document.getElementById(idf);
  }, [gl]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "FspCtx", GordCorpLvl);
  return (
    <select
      ref={gl}
      id={idf}
      name='gord_corp_lvl'
      className={`form-select noInvert lockSelect ${sEn.select}`}
      data-title='Nível de Gordura Corporal'
      onChange={ev => {
        try {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          callbackAtvLvlElementNaf(idf, {
            sa: sar?.current ?? document.getElementById("selectLvlAtFis"),
            gl: gl?.current ?? document.getElementById("gordCorpLvl"),
            naf: nafr?.current ?? document.getElementById("nafType"),
            fct: fct?.current ?? document.getElementById("formCalcTMBType"),
          });
          tabProps.edIsAutoCorrectOn && exeAutoFill(tabProps.gl);
        } catch (e) {
          limitedError(`Error executing ${ev.type} for ${idf}:\n${(e as Error).message}`, idf);
        }
      }}>
      {levels.map((o, i) => (
        <option key={`${o.v}__${i}`} value={o.v}>
          {o.l}
        </option>
      ))}
    </select>
  );
}
