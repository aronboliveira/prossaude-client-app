"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { nullishInp } from "@/lib/global/declarations/types";
import { useEffect, useRef, useState } from "react";
export default function ConfirmLocId(): JSX.Element {
  const mainRef = useRef<nullishInp>(null);
  const [value, setValue] = useState("Rio de Janeiro, Rio de Janeiro");
  useEffect(() => {
    if (mainRef.current instanceof HTMLInputElement && mainRef.current.value === "") mainRef.current.value = value;
  }, [value]);
  return (
    <input
      type='text'
      ref={mainRef}
      name='confirmLocName'
      id='confirmLocId'
      className='inpConfirm form-control noInvert'
      data-xls='Local de Assinatura'
      data-title='assinatura_local'
      required
      onInput={ev => {
        const newValue = ev.currentTarget.value;
        setValue(newValue);
        handleEventReq(ev.currentTarget);
      }}
    />
  );
}
