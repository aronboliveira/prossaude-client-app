"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function Street(): JSX.Element {
  return (
    <input
      type="text"
      name="street"
      id="streetId"
      className="form-control autocorrect inpIdentif noInvert minText"
      autoComplete="address-level3"
      data-title="endereco"
      minLength={3}
      data-reqlength="3"
      required
      onInput={ev => handleEventReq(ev.currentTarget)}
    />
  );
}
