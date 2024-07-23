"use client";

import { callbackAtvLvlElementNaf, person, tabProps } from "@/pages/edfis";

export default function GordCorpLvl(): JSX.Element {
  return (
    <select
      id="gordCorpLvl"
      className="form-select noInvert lockSelect"
      data-title="Nível de Gordura Corporal"
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl, tabProps.IMC],
            [
              document.getElementById("selectLvlAtFis"),
              ev.currentTarget,
              document.getElementById("formCalcTMBType"),
              document.getElementById("nafType"),
            ],
          ],
          ev.currentTarget.id
        );
      }}
    >
      <option value="abaixo">Com Baixo Peso</option>
      <option value="eutrofico">Eutrófico</option>
      <option value="sobrepeso">Com Sobrepeso (não Obeso)</option>
      <option value="obeso1">Obeso Grau 1</option>
      <option value="obeso2">Obeso Grau 2</option>
      <option value="obeso3">Obeso Grau 3</option>
    </select>
  );
}
