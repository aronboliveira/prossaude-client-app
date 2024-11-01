"use client";
import { NlMRef, nlSel } from "@/lib/global/declarations/types";
import { handleCallbackWHS } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps, timers } from "@/vars";
import { useContext, useEffect, useRef, useState } from "react";
import useMount from "@/lib/hooks/useMount";
import { FactorAtletaRegular, FactorAtletaValue } from "@/lib/global/declarations/testVars";
import sEn from "@/styles//modules/enStyles.module.scss";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { ENCtx } from "./ENForm";
import { dispatchFactorAtleta } from "@/lib/locals/edFisNutPage/edFisNutModel";
export default function SelFactorAtleta(): JSX.Element {
  let nafr: NlMRef<nlSel> = null;
  const r = useRef<nlSel>(null),
    ctx = useContext<ENCtxProps>(ENCtx),
    [v, setValue] = useState<FactorAtletaValue>("peso"),
    [mounted] = useMount(),
    factors: { v: FactorAtletaValue; l: FactorAtletaRegular }[] = [
      { v: "peso", l: "Peso" },
      { v: "mlg", l: "MLG" },
    ];
  if (ctx?.refs) ({ nafr } = ctx.refs);
  useEffect(() => {
    const sel = r.current ?? document.getElementById("selFactorAtleta");
    if (sel instanceof HTMLSelectElement) dispatchFactorAtleta(sel.value as FactorAtletaValue);
  }, [mounted]);
  useEffect(() => {
    try {
      if (!(r.current instanceof HTMLSelectElement || (r.current as any) instanceof HTMLInputElement))
        throw new Error(`Failed to validate Selector for Athlete Factor type`);
      dispatchFactorAtleta(r.current?.value as FactorAtletaValue);
      handleCallbackWHS(r.current);
    } catch (e) {
      return;
    }
  }, [v, r]);
  useEffect(() => {
    setTimeout(() => {
      try {
        const query = document.getElementById("selFactorAtleta");
        tabProps.factorAtleta =
          (r.current?.value as FactorAtletaValue) ||
          (((query instanceof HTMLSelectElement || query instanceof HTMLInputElement) &&
            (query as HTMLSelectElement).value) as FactorAtletaValue) ||
          "Peso";
      } catch (e) {
        return;
      }
    }, timers.personENTimer * 0.75);
  }, [r]);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      if (!nafr) return;
      nafr.current ??= document.getElementById("nafType") as nlSel;
      if (
        !(r.current instanceof HTMLElement) ||
        !(nafr.current instanceof HTMLSelectElement) ||
        nafr.current?.dataset.intensity !== "muitoIntenso"
      )
        return;
      r.current.hidden = false;
      r.current.style.display = "block";
      r.current.style.opacity = "1";
      const parent = r.current.closest("#spanFactorAtleta") || r.current.closest("div");
      if (!(parent instanceof HTMLElement) || !parent.hidden) return;
      parent.hidden = false;
    }, timers.personENTimer);
  }, [mounted, nafr, r]);
  return (
    <select
      ref={r}
      value={v}
      className={`selFactorAtletaClass form-select noInvert consInp min52_900 ${sEn.select} ${sEn.selFactorAtleta}`}
      id='selFactorAtleta'
      name='factor_atl'
      data-title='Fator de TMB para Atletas'
      onChange={ev => setValue(ev.currentTarget.value as FactorAtletaValue)}>
      {factors.map(f => (
        <option key={f.v} value={f.v}>
          {f.l}
        </option>
      ))}
    </select>
  );
}
