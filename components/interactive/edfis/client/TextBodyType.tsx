"use client";
import { callbackTextBodyEl } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { useContext, useEffect, useRef } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { checkContext } from "@/lib/global/gModel";
import { AlignTypeLab, BodyType } from "@/lib/global/declarations/testVars";
import { FspCtx } from "./FsProgCons";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, NlrDispatch, nlSel, nlTab } from "@/lib/global/declarations/types";
import { person } from "@/vars";
export default function TextBodyType(): JSX.Element {
  let gar: NlMRef<nlSel> = null,
    gbr: NlMRef<nlSel> = null,
    gr: NlMRef<nlSel> = null,
    txbr: NlMRef<nlSel> = null,
    bodyType: BodyType = person.gen === "masculino" || person.gen === "feminino" ? person.gen : "neutro",
    onSetBodyType: NlrDispatch<BodyType> = null,
    td: NlMRef<nlTab> = null,
    prt: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    ctx2 = useContext<FspCtxProps>(FspCtx);
  const trusted = useRef<boolean>(false),
    bodyTypes: { v: BodyType; l: AlignTypeLab }[] = [
      { v: "masculino", l: "Masculino | Masculinizado" },
      { v: "feminino", l: "Feminino | Feminilizado" },
      { v: "neutro", l: "Neutro" },
    ];
  if (ctx1) {
    if (ctx1.refs) ({ gar, gbr, gr, txbr } = ctx1.refs);
    if (ctx1.bt) {
      onSetBodyType = ctx1.bt.d;
      bodyType = ctx1.bt.s;
    }
  }
  if (ctx2?.refs) ({ td, prt } = ctx2.refs);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", TextBodyType);
  checkContext(ctx2, "FspCtx", TextBodyType);
  useEffect(() => {
    try {
      if (!trusted.current) return;
      const genElement = gr?.current ?? document.getElementById("genId");
      if (!(genElement instanceof HTMLInputElement || genElement instanceof HTMLSelectElement))
        throw elementNotFound(genElement, `Gen Element`, extLine(new Error()));
      const genFisAlin = gar?.current ?? document.getElementById("genFisAlinId");
      if (!(genFisAlin instanceof HTMLInputElement || genFisAlin instanceof HTMLSelectElement))
        throw elementNotFound(genFisAlin, `Gen Fis Alin Element`, extLine(new Error()));
      callbackTextBodyEl({ gr, gar, gbr, prt, td, txbr });
    } catch (e) {
      console.error(`Error executing effect for ${TextBodyType.prototype.constructor.name}:\n${(e as Error).message}`);
    }
  }, [bodyType, onSetBodyType, trusted]);
  return (
    <select
      ref={txbr}
      value={bodyType}
      id='textBodytype'
      name='body_type'
      className={`form-select noInvert min52_900 consInp ${sEn.select}`}
      title={`Atualize aqui manualmente o tipo corporal usado nas fórmulas`}
      data-title='Tipo Corporal por Gênero'
      onChange={ev => {
        if (ev.isTrusted) trusted.current = true;
        onSetBodyType(ev.currentTarget.value as BodyType);
      }}>
      {bodyTypes.map(b => (
        <option key={`bodytype__${b.v}`} value={b.v} className='bodyTypeOpt'>
          {b.l}
        </option>
      ))}
    </select>
  );
}
