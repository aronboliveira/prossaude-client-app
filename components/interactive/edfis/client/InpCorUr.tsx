"use client";
import { nlInp } from "@/lib/global/declarations/types";
import { applyFieldConstraints, limitedError } from "@/lib/global/gModel";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { tabProps } from "@/vars";
import { useRef, useEffect, useState } from "react";
type urCor =
  | "transparente"
  | "verde-claro"
  | "verde-escuro"
  | "amarelo-claro"
  | "amarelo-escuro"
  | "âmbar"
  | "laranja"
  | "rosa"
  | "avermelhada"
  | "marrom"
  | "azul"
  | "arroxeada"
  | "preta";
export default function InpCorUr(): JSX.Element {
  const r = useRef<nlInp>(null),
    [v, setValue] = useState<urCor>("" as any);
  useEffect(() => {
    try {
      if (!(r.current instanceof HTMLElement)) throw new Error(`Failed to validate reference instance`);
      handleEventReq(r.current);
    } catch (e) {
      limitedError(
        `Error executing effect for ${InpCorUr.prototype.constructor.name}:\n${(e as Error).message}`,
        InpCorUr.prototype.constructor.name,
      );
    }
  }, [v, r]);
  return (
    <input
      ref={r}
      value={v}
      type='text'
      minLength={4}
      maxLength={15}
      list='corUr'
      className='form-control noInvert min88_900 inpAlimRot inpUr'
      id='inpUrCorDef'
      name='ur_cor'
      required
      placeholder='Preencha com a cor'
      data-title='Urina (Coloração)'
      data-pattern='transparente|verde-claro|verde-escuro|amarelo-claro|amarelo-escuro|âmbar|laranja|rosa|avermelhada|marrom|azul|arroxeada|preta'
      data-flags='gi'
      data-reqlength='4'
      data-maxlength='15'
      onInput={ev => {
        tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
        setValue(ev.currentTarget.value as any);
      }}
    />
  );
}
