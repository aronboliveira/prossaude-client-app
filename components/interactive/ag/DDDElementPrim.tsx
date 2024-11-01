"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function DDDElementPrim(): JSX.Element {
  return (
    <input
      type='number'
      name='ddd'
      id='telAreaCodeId'
      className='form-control inpIdentif noInvert inpDDD minText maxText patternText'
      autoComplete='tel-area-code'
      data-xls='DDD primário'
      data-title='ddd_prim'
      min='11'
      max='99'
      data-reqlength='2'
      data-maxlength='4'
      data-pattern='[0-9]{2,}'
      data-flags='g'
      minLength={2}
      maxLength={4}
      required
      onInput={ev => handleEventReq(ev.currentTarget)}
    />
  );
}
