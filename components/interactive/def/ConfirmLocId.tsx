"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { nlInp } from "@/lib/global/declarations/types";
import { useEffect, useRef, useState } from "react";
import s from "@/styles//modules/sharedComponents.module.scss";
import { useRouter } from "next/router";
export default function ConfirmLocId(): JSX.Element {
  const mainRef = useRef<nlInp>(null),
    [value, setValue] = useState("Rio de Janeiro, Rio de Janeiro"),
    router = useRouter();
  useEffect(() => {
    if (mainRef.current instanceof HTMLInputElement && mainRef.current.value === "") mainRef.current.value = value;
  }, [value]);
  return (
    <input
      type='text'
      ref={mainRef}
      name='confirmLocName'
      id='confirmLocId'
      className={`inpConfirm form-control noInvert ${/edfis/gi.test(router.pathname) ? `${s.confirmLocIdEn}` : ""}`}
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
