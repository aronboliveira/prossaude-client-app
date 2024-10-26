"use client";
import { clearPhDates } from "@/lib/global/gStyleScript";
import { inputNotFound } from "@/lib/global/handlers/errorHandler";
import { nlBtn, nlInp } from "@/lib/global/declarations/types";
import { useCallback, useEffect, useRef } from "react";
import { compProp, parseNotNaN } from "@/lib/global/gModel";
export default function HeaderDate(): JSX.Element {
  const dateRef = useRef<nlInp>(null),
    btnRef = useRef<nlBtn>(null),
    equalizeBtn = useCallback((): void => {
      btnRef.current ??= document.getElementById("headerDatBtn") as HTMLButtonElement;
      dateRef.current ??= document.getElementById("dateHeader") as HTMLInputElement;
      const btnWidth = parseNotNaN(compProp(btnRef.current, "width"));
      dateRef.current.style.width = `${btnWidth}px`;
      dateRef.current.style.maxWidth = `${btnWidth}px`;
    }, [btnRef, dateRef]);
  useEffect(() => {
    try {
      if (!(dateRef.current instanceof HTMLInputElement && dateRef.current.type === "date"))
        throw inputNotFound(dateRef.current, `Validation of Date on Header instance`, '<input type="date">');
      clearPhDates([dateRef.current]);
      equalizeBtn();
      addEventListener("resize", equalizeBtn);
      return (): void => removeEventListener("resize", equalizeBtn);
    } catch (e) {
      console.error(`Error executing useEffect for HeaderDate:\n${(e as Error).message}`);
    }
  }, [equalizeBtn, dateRef]);
  return (
    <span role='group' className='control flexJSt flexQ900NoW' id='spanHFlex'>
      <input
        type='date'
        className='form-control d_ibl minCurrDate'
        id='dateHeader'
        placeholder='Date'
        data-xls='Data de preenchimento'
        data-title='data_cabecalho'
        ref={dateRef}
      />
      <button type='button' className='datBtn d_ibl btn btn-secondary' id='headerDatBtn' ref={btnRef}>
        Usar data atual
      </button>
    </span>
  );
}
