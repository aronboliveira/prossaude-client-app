"use client";

import { handleCondtReq } from "@/lib/global/handlers/gHandlers";

export default function ProtUrLvl(): JSX.Element {
  return (
    <input
      type="number"
      id="protUrLvl"
      className="form-control noInvert opProtUr"
      data-title="Proteinuria_mg/dL"
      onInput={ev =>
        handleCondtReq(ev.currentTarget, {
          minNum: 0,
          maxNum: 9999,
          min: 1,
          max: 6,
          pattern: ["^d+$", ""],
        })
      }
    />
  );
}
