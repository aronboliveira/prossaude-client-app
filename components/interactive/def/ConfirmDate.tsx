"use client";
import { nlBtn, nlInp } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";
import { parseNotNaN } from "@/lib/global/gModel";
export default function ConfirmDate(): JSX.Element {
  const dateRef = useRef<nlInp>(null);
  const btnRef = useRef<nlBtn>(null);
  useEffect(() => {
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
  }, []);
  return (
    <label
      htmlFor='confirmDatId'
      className='labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC htHalf900Q bolded'
      id='labConfirmDate'>
      <span>Data:</span>
      <div className='widFull flexQ900NoW htFull900Q' id='divConfirmDat' role='group'>
        <input
          type='date'
          name='confirmDatName'
          id='confirmDatId'
          className='inpConfirm inpDate form-control noInvert minCurrDate'
          data-title='assinatura_data'
          data-xls='Data de Assinatura'
          required
          ref={dateRef}
        />
        <button type='button' className='datBtn confirmBtn btn btn-secondary widFull' id='confirmDatBtn' ref={btnRef}>
          Usar data atual
        </button>
      </div>
    </label>
  );
}
