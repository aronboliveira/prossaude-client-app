import { handleCondtReq } from "@/lib/global/handlers/gHandlers";


export default function TelCodePrim(): JSX.Element {
  return (
    <input
      type="number"
      name="country_code"
      id="telCountryCodeId"
      className="form-control inpIdentif noInvert"
      min="1"
      max="999"
      autoComplete="tel-country-code"
      data-title="cod_pais_prim"
      onInput={ev =>
        handleCondtReq(ev.currentTarget, {
          min: 1,
          max: 6,
          minNum: 1,
          maxNum: 999,
        })
      }
    />
  );
}
