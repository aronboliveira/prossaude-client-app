"use client";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { useContext, useEffect, useRef } from "react";
import { ENCtx } from "./ENForm";
import { GordLvl, GordLvlLab } from "@/lib/global/declarations/testVars";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { tabProps, timers } from "@/vars";
import { callbackAtvLvlElementNaf, exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import sEn from "@/styles//modules/enStyles.module.scss";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
import { fadeElement } from "@/lib/global/gStyleScript";
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
  useEffect(() => {
    setTimeout(() => {
      tabProps.lockGl ??= document.getElementById("lockGordCorpLvl");
      if (!tabProps.lockGl) return;
      if (!nafr || !(nafr.current instanceof HTMLSelectElement || (nafr.current as any) instanceof HTMLInputElement))
        return;
      if ((nafr!.current as HTMLSelectElement).value !== "2.2" || tabProps.isAutoFillActive) return;
      fadeElement(tabProps.lockGl, "0");
      setTimeout(() => {
        if (!tabProps.lockGl) return;
        tabProps.lockGl.innerHTML = `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-unlock"
          viewBox="0 0 16 16"
        >
          <defs>
            <linearGradient
              id="gradiente-unlock"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style="stop-color:rgb(233, 180, 7)"
              />
              <stop
                offset="100%"
                style="stop-color:rgb(243, 221, 93)"
              />
            </linearGradient>
          </defs>
          <path
            d="M11 1 a2 2 0 0 1 2 2 v4 H9 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
            class="svg-unlock-hook"
            fill="url(#gradiente-unlock)"
          />
          <path
            d="M3 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
            class="svg-unlock-body"
            fill="url(#gradiente-unlock)"
          />
          <line
            x1="2.2"
            y1="7.05"
            x2="9.3"
            y2="7.05"
            stroke="black"
          />
          </svg>`;
        fadeElement(tabProps.lockGl, "1");
        if (!gl?.current) return;
        gl.current.disabled = false;
      }, 500);
    }, timers.personENTimer);
  });
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "FspCtx", GordCorpLvl);
  return (
    <select
      ref={gl}
      id={idf}
      name='gord_corp_lvl'
      className={`form-select noInvert lockSelect ${sEn.select}`}
      data-title='Nível de Gordura Corporal'
      disabled
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
