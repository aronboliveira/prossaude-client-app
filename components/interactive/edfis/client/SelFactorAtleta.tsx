"use client";
import { nlSel } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { handleCallbackWHS } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "@/vars";
import { useEffect, useRef, useState } from "react";
import useMount from "@/lib/hooks/useMount";
import { FactorAtletaRegular, FactorAtletaValue } from "@/lib/global/declarations/testVars";
import { limitedError } from "@/lib/global/gModel";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function SelFactorAtleta(): JSX.Element {
  const r = useRef<nlSel>(null),
    [v, setValue] = useState<FactorAtletaValue>("peso"),
    [mounted] = useMount(),
    factors: { v: FactorAtletaValue; l: FactorAtletaRegular }[] = [
      { v: "peso", l: "Peso" },
      { v: "mlg", l: "MLG" },
    ];
  useEffect(() => {
    const sel = r.current ?? document.getElementById("selFactorAtleta");
    sel instanceof HTMLSelectElement
      ? (tabProps.factorAtleta = sel.value as FactorAtletaValue)
      : elementNotFound(sel, "selFactorAtleta", extLine(new Error()));
  }, [mounted]);
  useEffect(() => {
    try {
      if (!(r.current instanceof HTMLSelectElement || (r.current as any) instanceof HTMLInputElement))
        throw new Error(`Failed to validate Selector for Athlete Factor type`);
      tabProps.factorAtleta = (r.current?.value ?? "peso") as FactorAtletaValue;
      handleCallbackWHS(r.current);
    } catch (e) {
      limitedError(
        `Error executing effect for ${SelFactorAtleta.prototype.constructor.name}:${(e as Error).message}`,
        SelFactorAtleta.prototype.constructor.name,
      );
    }
  }, [v, r]);
  return (
    <select
      ref={r}
      value={v}
      className={`selFactorAtletaClass form-select noInvert consInp min52_900 ${sEn.select}`}
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
