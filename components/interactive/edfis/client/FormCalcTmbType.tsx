"use client";

import { callbackAtvLvlElementNaf, person, tabProps } from "@/pages/edfis";

export default function FormCalcTmbType(): JSX.Element {
  return (
    <select
      id="formCalcTMBType"
      name="form_tmb"
      className="form-select noInvert lockSelect"
      data-title="Fórmula para TMB"
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl, tabProps.IMC],
            [
              document.getElementById("selectLvlAtFis"),
              document.getElementById("gordCorpLvl"),
              ev.currentTarget,
              document.getElementById("nafType"),
            ],
          ],
          ev.currentTarget.id
        );
      }}
    >
      <option value="harrisBenedict">Harris-Benedict</option>
      <option value="mifflinStJeor">Mifflin-St.Jeor</option>
      <option value="tinsley">Tinsley</option>
    </select>
  );
}
