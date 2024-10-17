"use client";
import { callbackTextBodyEl } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { useContext } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { checkContext } from "@/lib/global/gModel";
import { AlignTypeLab, BodyType } from "@/lib/global/declarations/testVars";
import { FspCtx } from "./FsProgCons";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function TextBodyType(): JSX.Element {
  const { gar, gbr, gr, txbr } = useContext<ENCtxProps>(ENCtx).refs,
    { td, prt } = useContext<FspCtxProps>(FspCtx).refs,
    bodyTypes: { v: BodyType; l: AlignTypeLab }[] = [
      { v: "masculino", l: "Masculino | Masculinizado" },
      { v: "feminino", l: "Feminino | Feminilizado" },
      { v: "neutro", l: "Neutro" },
    ];
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(ENCtx);
  checkContext(ctx, "ENCtx", TextBodyType);
  const ctx2 = useContext(FspCtx);
  checkContext(ctx2, "FspCtx", TextBodyType);
  return (
    <select
      ref={txbr}
      id='textBodytype'
      name='body_type'
      className={`form-select noInvert min52_900 consInp ${sEn.select}`}
      data-title='Tipo Corporal por Gênero'
      onChange={() => {
        const genElement = gr?.current ?? document.getElementById("genId");
        try {
          if (!(genElement instanceof HTMLInputElement || genElement instanceof HTMLSelectElement))
            throw elementNotFound(genElement, `Gen Element`, extLine(new Error()));
          const genFisAlin = gar?.current ?? document.getElementById("genFisAlinId");
          if (!(genFisAlin instanceof HTMLInputElement || genFisAlin instanceof HTMLSelectElement))
            throw elementNotFound(genFisAlin, `Gen Fis Alin Element`, extLine(new Error()));
          callbackTextBodyEl({ gr, gar, gbr, prt, td, txbr });
        } catch (e) {
          console.error(`Error executing callback for textbodytype:\n${(e as Error).message}`);
        }
      }}>
      {bodyTypes.map(b => (
        <option key={`bodytype__${b.v}`} value={b.v} className='bodyTypeOpt'>
          {b.l}
        </option>
      ))}
    </select>
  );
}
