"use client";

import { callbackAtvLvlElementNaf, person, tabProps } from "@/pages/edfis";

export default function SelectLvlAtFis(): JSX.Element {
  return (
    <select
      className="form-select labelIdentif"
      id="selectLvlAtFis"
      name="atv_lvl"
      data-title="Nivel de Atividade Física"
      required
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl, tabProps.IMC],
            [
              ev.currentTarget,
              document.getElementById("gordCorpLvl"),
              document.getElementById("formCalcTMBType"),
              document.getElementById("nafType"),
            ],
          ],
          ev.currentTarget.id
        );
      }}
    >
      <option value="leve" className="opLvlAtFis">
        Leve
      </option>
      <option value="moderado" className="opLvlAtFis">
        Moderado
      </option>
      <option value="intenso" className="opLvlAtFis">
        Intenso
      </option>
      <option value="muitoIntenso" className="opLvlAtFis">
        Muito intenso
      </option>
      <option value="sedentario" className="opLvlAtFis">
        Sedentário
      </option>
    </select>
  );
}
