"use client";
import { clearPhDates } from "@/lib/global/gStyleScript";
import { inputNotFound } from "@/lib/global/handlers/errorHandler";
import { nullishBtn, nullishInp } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";
import { parseNotNaN } from "@/lib/global/gModel";
export default function HeaderDate(): JSX.Element {
  const dateRef = useRef<nullishInp>(null);
  const btnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    try {
      if (!(dateRef.current instanceof HTMLInputElement && dateRef.current.type === "date"))
        throw inputNotFound(dateRef.current, `Validation of Date on Header instance`, '<input type="date">');
      clearPhDates([dateRef.current]);
      const equalizeBtn = (): void => {
        btnRef.current ??= document.getElementById("headerDatBtn") as HTMLButtonElement;
        dateRef.current ??= document.getElementById("dateHeader") as HTMLInputElement;
        const dateWidth = parseNotNaN(getComputedStyle(dateRef.current).width.replace("px", "").trim());
        const btnWidth = parseNotNaN(getComputedStyle(btnRef.current).width.replace("px", "").trim());
        if (dateWidth > btnWidth) btnRef.current.style.width = `${dateWidth}px`;
        else if (dateWidth < btnWidth) dateRef.current.style.width = `${btnWidth}px`;
      };
      equalizeBtn();
      addEventListener("resize", equalizeBtn);
      return (): void => removeEventListener("resize", equalizeBtn);
    } catch (e) {
      console.error(`Error executing useEffect for HeaderDate:\n${(e as Error).message}`);
    }
  }, []);
  return (
    <span role='group' className='control flexJSt flexQ900NoW' id='spanHFlex'>
      <input
        type='date'
        className='form-control d-ibl minCurrDate'
        id='dateHeader'
        placeholder='Date'
        data-xls='Data de preenchimento'
        data-title='data_cabecalho'
        ref={dateRef}
      />
      <button type='button' className='datBtn d-ibl btn btn-secondary' id='headerDatBtn' ref={btnRef}>
        Usar data atual
      </button>
    </span>
  );
}
