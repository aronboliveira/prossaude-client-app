"use client";

import { handleCondtReq } from "@/lib/global/handlers/gHandlers";

export default function StreetNum(): JSX.Element {
  return (
    <input
      type="number"
      name="street_num"
      id="streetNumId"
      className="form-control inpIdentif noInvert inpLocNum halfL"
      min="1"
      autoComplete="address-level4"
      data-title="num_rua"
      onInput={ev =>
        handleCondtReq(ev.currentTarget, {
          min: 1,
          minNum: 0,
        })
      }
    />
  );
}
