"use client";
import { nlSel } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { handleCallbackWHS } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "@/vars";
import { useEffect, useRef, useState } from "react";
export default function SelFactorAtleta(): JSX.Element {
  const r = useRef<nlSel>(null),
    [mounted, setMount] = useState<boolean>(false);
  useEffect(() => {
    setMount(true);
  }, []);
  useEffect(() => {
    const sel = r.current ?? document.getElementById("selFactorAtleta");
    sel instanceof HTMLSelectElement
      ? (tabProps.factorAtleta = sel.value)
      : elementNotFound(sel, "selFactorAtleta", extLine(new Error()));
  }, [mounted]);
  return (
    <select
      ref={r}
      className='selFactorAtletaClass form-select noInvert consInp'
      id='selFactorAtleta'
      name='factor_atl'
      data-title='Fator de TMB para Atletas'
      onChange={ev =>
        handleCallbackWHS(
          [
            [
              document.getElementById("gordCorpLvl"),
              document.getElementById("formCalcTMBType"),
              document.getElementById("nafType"),
              [
                tabProps.targInpWeigth,
                tabProps.targInpHeigth,
                tabProps.targInpIMC,
                tabProps.targInpMLG,
                tabProps.targInpTMB,
                tabProps.targInpGET,
                tabProps.targInpSumDCut,
                tabProps.targInpPGC,
              ],
            ],
            [
              tabProps.numCol,
              tabProps.factorAtvLvl ?? 1.4,
              tabProps.factorAtleta ?? "Peso",
              [tabProps.IMC ?? 0, tabProps.MLG ?? 0, tabProps.TMB ?? 0, tabProps.GET ?? 0, tabProps.PGC ?? 0],
            ],
          ],
          ev.currentTarget,
          tabProps.isAutoFillActive,
        )
      }>
      <option value='Peso'>Peso</option>
      <option value='MLG'>MLG</option>
    </select>
  );
}
