"use client";
import { formatTel } from "@/lib/global/gModel";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
export default function TelSec(): JSX.Element {
  return (
    <input
      type='tel'
      name='tel_sec'
      id='tel2Id'
      className='form-control inpIdentif noInvert inpTel minText maxText patternText'
      inputMode='tel'
      data-xls='Telefone Secundário'
      data-title='tel_sec'
      onInput={ev => {
        formatTel(ev.currentTarget, false);
        handleCondtReq(ev.currentTarget, {
          min: 8,
          max: 10,
          pattern: ["9?[0-9]{4,}-[0-9]{4,}", "g"],
        });
      }}
    />
  );
}
