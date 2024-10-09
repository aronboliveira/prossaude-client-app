"use client";
import { ENContextProps } from "@/lib/global/declarations/interfaces";
import { callbackAtvLvlElementNaf } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "@/vars";
import { MutableRefObject, useContext } from "react";
import { ENContext } from "../ENForm";
import { nlSel } from "@/lib/global/declarations/types";
export default function FormCalcTmbType(): JSX.Element {
  const { sar, afr, fct } = useContext<ENContextProps>(ENContext)?.refs;
  return (
    <select
      ref={fct as MutableRefObject<nlSel>}
      id='formCalcTMBType'
      name='form_tmb'
      className='form-select noInvert lockSelect'
      data-title='Fórmula para TMB'
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl ?? 1.4, tabProps.IMC ?? 0],
            [
              sar?.current ?? document.getElementById("selectLvlAtFis"),
              document.getElementById("gordCorpLvl"),
              ev.currentTarget,
              afr?.current ?? document.getElementById("nafType"),
            ],
          ],
          ev.currentTarget.id,
        );
      }}>
      <option value='harrisBenedict'>Harris-Benedict</option>
      <option value='mifflinStJeor'>Mifflin-St.Jeor</option>
      <option value='tinsley'>Tinsley</option>
    </select>
  );
}
