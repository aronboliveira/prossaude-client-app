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
            [tabProps.factorAtvLvl, tabProps.IMC],
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
      <option value='abaixo'>Com Baixo Peso</option>
      <option value='eutrofico'>Eutrófico</option>
      <option value='sobrepeso'>Com Sobrepeso (não Obeso)</option>
      <option value='obeso1'>Obeso Grau 1</option>
      <option value='obeso2'>Obeso Grau 2</option>
      <option value='obeso3'>Obeso Grau 3</option>
    </select>
  );
}
