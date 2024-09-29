"use client";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
export default function LocComp(): JSX.Element {
  return (
    <input
      type='number'
      name='loc_complement'
      id='compNumId'
      className='form-control inpIdentif noInvert inpLocNum halfL'
      min='1'
      autoComplete='address-level4'
      data-title='comp_casa'
      placeholder='Digite o complemento'
      onInput={ev =>
        handleCondtReq(ev.currentTarget, {
          min: 1,
          minNum: 0,
        })
      }
    />
  );
}
