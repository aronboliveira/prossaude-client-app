"use client";
import { callbackAtvLvlElementNaf, person, tabProps } from "@/pages/edfis";
export default function NafType(): JSX.Element {
  return (
    <select
      id="nafType"
      name="naf"
      className="form-select noInvert consInp"
      data-title="Fator de Nível de Atividade Física"
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl, tabProps.IMC],
            [
              document.getElementById("selectLvlAtFis"),
              document.getElementById("gordCorpLvl"),
              document.getElementById("formCalcTMBType"),
              ev.currentTarget,
            ],
          ],
          ev.currentTarget.id
        );
      }}
    >
      <option value="leve">1.4</option>
      <option value="moderado">1.6</option>
      <option value="intenso">1.9</option>
      <option value="muitoIntenso">2.2</option>
      <option value="sedentario">1.2</option>
    </select>
  );
}
