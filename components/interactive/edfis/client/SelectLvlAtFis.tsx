"use client";
import { callbackAtvLvlElementNaf } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "@/vars";
import { MutableRefObject, useContext } from "react";
import { ENContext } from "../ENForm";
import { ENContextProps } from "@/lib/global/declarations/interfaces";
import { nlSel } from "@/lib/global/declarations/types";
export default function SelectLvlAtFis(): JSX.Element {
  const { sar, afr, txbr } = useContext<ENContextProps>(ENContext)?.refs;
  return (
    <select
      ref={sar as MutableRefObject<nlSel>}
      className='form-select labelIdentif'
      id='selectLvlAtFis'
      name='atv_lvl'
      data-title='Nivel de Atividade Física'
      required
      onChange={ev => {
        [person.atvLvl, tabProps.factorAtvLvl] = callbackAtvLvlElementNaf(
          [
            [tabProps.factorAtvLvl ?? 1.4, tabProps.IMC ?? 0],
            [
              ev.currentTarget,
              document.getElementById("gordCorpLvl"),
              txbr?.current ?? document.getElementById("formCalcTMBType"),
              afr?.current ?? document.getElementById("nafType"),
            ],
          ],
          ev.currentTarget.id,
        );
      }}>
      <option value='leve' className='opLvlAtFis'>
        Leve
      </option>
      <option value='moderado' className='opLvlAtFis'>
        Moderado
      </option>
      <option value='intenso' className='opLvlAtFis'>
        Intenso
      </option>
      <option value='muitoIntenso' className='opLvlAtFis'>
        Muito intenso
      </option>
      <option value='sedentario' className='opLvlAtFis'>
        Sedentário
      </option>
    </select>
  );
}
