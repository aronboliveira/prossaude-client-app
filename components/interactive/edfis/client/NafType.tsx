"use client";
import { callbackAtvLvlElementNaf } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "@/vars";
import { MutableRefObject, useContext } from "react";
import { ENContext } from "../ENForm";
import { ENContextProps } from "@/lib/global/declarations/interfaces";
import { nlSel } from "@/lib/global/declarations/types";
export default function NafType(): JSX.Element {
  const afr = useContext<ENContextProps>(ENContext)?.refs?.afr;
  return (
    <select
      ref={afr as MutableRefObject<nlSel>}
      id='nafType'
      name='naf'
      className='form-select noInvert consInp'
      data-title='Fator de Nível de Atividade Física'
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl ?? 1.4, tabProps.IMC ?? 0],
            [
              document.getElementById("selectLvlAtFis"),
              document.getElementById("gordCorpLvl"),
              document.getElementById("formCalcTMBType"),
              ev.currentTarget,
            ],
          ],
          ev.currentTarget.id,
        );
      }}>
      {[
        { v: "leve", l: "1.4" },
        { v: "moderado", l: "1.6" },
        { v: "intenso", l: "1.9" },
        { v: "muitoIntenso", l: "2.2" },
        { v: "sedentario", l: "1.2" },
      ].map(o => (
        <option key={o.v} value={o.v}>
          {o.l}
        </option>
      ))}
    </select>
  );
}
