"use client";
import { callbackTextBodyEl } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { person } from "@/vars";
import { MutableRefObject, useContext } from "react";
import { ENContext } from "../ENForm";
import { ENContextProps } from "@/lib/global/declarations/interfaces";
import { nlSel } from "@/lib/global/declarations/types";
export default function TextBodyType(): JSX.Element {
  const { gr, txbr } = useContext<ENContextProps>(ENContext).refs;
  return (
    <select
      ref={txbr as MutableRefObject<nlSel>}
      id='textBodytype'
      name='body_type'
      className='form-select noInvert consInp'
      data-title='Tipo Corporal por Gênero'
      onChange={() => {
        const genElement = gr?.current ?? document.getElementById("genId");
        try {
          if (!(genElement instanceof HTMLInputElement || genElement instanceof HTMLSelectElement))
            throw elementNotFound(genElement, `Gen Element`, extLine(new Error()));
          const genFisAlin = document.getElementById("genFisAlinId");
          if (!(genFisAlin instanceof HTMLInputElement || genFisAlin instanceof HTMLSelectElement))
            throw elementNotFound(genFisAlin, `Gen Fis Alin Element`, extLine(new Error()));
          [person.gen, genElement.value, genFisAlin.value] = callbackTextBodyEl(person);
        } catch (e) {
          console.error(`Error executing callback for textbodytype:\n${(e as Error).message}`);
        }
      }}>
      <option value='masculino'>Masculino | Masculinizado</option>
      <option value='feminino'>Feminino | Feminilizado</option>
      <option value='neutro'>Neutro</option>
    </select>
  );
}
