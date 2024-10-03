"use client";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
export default function LocComp(): JSX.Element {
  return (
    <>
      <input
        type='number'
        name='loc_complement'
        id='compNumId'
        className='form-control inpIdentif noInvert inpLocNum halfL'
        min='1'
        autoComplete='address-level4'
        data-xls='Complemento no Endereço'
        data-title='comp_casa'
        placeholder='Digite o complemento'
        onInput={ev =>
          handleCondtReq(ev.currentTarget, {
            min: 1,
            minNum: 0,
          })
        }
      />
      <span role='group' className='halfSpanCheck halfR flexAlItCt noInvert'>
        <input
          type='checkbox'
          name='compNumNullName'
          id='compNumNullId'
          className='noInvert numNullId form-check-input'
          role='switch'
          data-title='switch_comp_casa'
          onClick={ev => {
            const blockeableInput = ev.currentTarget.parentElement?.parentElement?.querySelector(".inpLocNum");
            ev.currentTarget.checked
              ? blockeableInput?.setAttribute("disabled", "")
              : blockeableInput?.removeAttribute("disabled");
          }}
          onDoubleClick={ev => {
            const blockeableInput = ev.currentTarget.parentElement?.parentElement?.querySelector(".inpLocNum");
            ev.currentTarget.checked
              ? blockeableInput?.setAttribute("disabled", "")
              : blockeableInput?.removeAttribute("disabled");
          }}
        />
      </span>
    </>
  );
}
