"use client";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
export default function InpDiur(): JSX.Element {
  return (
    <input
      type="number"
      name="diur"
      className="form-control noInvert inpAlimRot inpUr float"
      id="inpDiur"
      data-title="Diurese"
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
