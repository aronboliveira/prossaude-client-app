"use client";

import { handleEventReq } from "@/lib/global/handlers/gHandlers";

export default function Nbh(): JSX.Element {
  return (
    <input
      type="text"
      name="neighbourhood"
      id="neighbourhoodId"
      className="form-control autocorrect inpIdentif noInvert minText"
      minLength={3}
      data-title="bairro"
      data-reqlength="3"
      required
      onInput={ev => handleEventReq(ev.currentTarget)}
    />
  );
}
