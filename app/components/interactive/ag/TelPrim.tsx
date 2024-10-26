"use client";
import { formatTel } from "@/lib/global/gModel";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function TelPrim(): JSX.Element {
  return (
    <input
      type='tel'
      name='tel'
      id='telId'
      className='form-control inpIdentif noInvert inpTel minText maxText patternText'
      minLength={8}
      maxLength={10}
      inputMode='tel'
      data-xls='Telefone Primário'
      data-title='tel_prim'
      data-reqlength='8'
      data-maxlength='10'
      data-pattern='9?\d{4}-\d{4}'
      data-flags='g'
      required
      onInput={ev => {
        formatTel(ev.currentTarget, false);
        handleEventReq(ev.currentTarget);
      }}
    />
  );
}
