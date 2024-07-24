"use client";

import { handleCallbackWHS, tabProps } from "@/pages/edfis";

export default function SelFactorAtleta(): JSX.Element {
  return (
    <select
      className="selFactorAtletaClass form-select noInvert consInp"
      id="selFactorAtleta"
      name="factor_atl"
      data-title="Fator de TMB para Atletas"
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
              tabProps.factorAtvLvl,
              tabProps.factorAtleta,
              [
                tabProps.IMC,
                tabProps.MLG,
                tabProps.TMB,
                tabProps.GET,
                tabProps.PGC,
              ],
            ],
          ],
          ev.currentTarget,
          tabProps.isAutoFillActive
        )
      }
    >
      <option value="Peso">Peso</option>
      <option value="MLG">MLG</option>
    </select>
  );
}
