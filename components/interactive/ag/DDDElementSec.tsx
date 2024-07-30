import { handleCondtReq } from "@/lib/global/handlers/gHandlers";


export default function DDDElementSec(): JSX.Element {
  return (
    <input
      type="number"
      name="ddd_sec"
      id="tel2AreaCodeId"
      className="form-control inpIdentif noInvert inpDDD"
      min="11"
      max="99"
      autoComplete="tel-area-code"
      data-title="ddd_sec"
      onInput={ev =>
        handleCondtReq(ev.currentTarget, {
          min: 2,
          max: 4,
          minNum: 11,
          maxNum: 11,
          pattern: ["[0-9]{2,}", "g"],
        })
      }
    />
  );
}
