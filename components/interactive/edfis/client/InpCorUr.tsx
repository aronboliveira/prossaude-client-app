"use client";

import { handleEventReq } from "@/lib/global/handlers/gHandlers";

export default function InpCorUr(): JSX.Element {
  return (
    <input
      type="text"
      minLength={4}
      maxLength={15}
      list="corUr"
      className="form-control noInvert inpAlimRot inpUr"
      id="inpUrCorDef"
      name="ur_cor"
      required
      data-title="Urina (Coloração)"
      data-pattern="transparente|verde-claro|verde-escuro|amarelo-claro|amarelo-escuro|âmbar|laranja|rosa|avermelhada|marrom|azul|arroxeada|preta"
      data-flags="gi"
      data-reqlength="4"
      data-maxlength="15"
      onInput={ev => handleEventReq(ev.currentTarget)}
    />
  );
}
