"use client";
import { callbackAtvLvlElementNaf } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "@/vars";
export default function GordCorpLvl(): JSX.Element {
  return (
    <select
      id='gordCorpLvl'
      name='gord_corp_lvl'
      className='form-select noInvert lockSelect'
      data-title='Nível de Gordura Corporal'
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl ?? 1.4, tabProps.IMC ?? 0],
            [
              document.getElementById("selectLvlAtFis"),
              ev.currentTarget,
              document.getElementById("formCalcTMBType"),
              document.getElementById("nafType"),
            ],
          ],
          ev.currentTarget.id,
        );
      }}>
      {[
        { v: "abaixo", l: "Com Baixo Peso" },
        { v: "eutrofico", l: "Eutrófico" },
        { v: "sobrepeso", l: "Com Sobrepeso (não Obeso)" },
        { v: "obeso1", l: "Obeso Grau 1" },
        { v: "obeso2", l: "Obeso Grau 2" },
        { v: "obeso3", l: "Obeso Grau 3" },
      ].map((o, i) => (
        <option key={`${o.v}__${i}`} value={o.v}>
          {o.l}
        </option>
      ))}
    </select>
  );
}
