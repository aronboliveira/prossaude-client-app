"use client";
import { opRadioHandler } from "@/lib/global/handlers/gHandlers";
export default function RadioPairDoces(): JSX.Element {
  return (
    <>
      <input
        type="radio"
        name="cor_doces"
        id="pbAlmYes"
        className="freqRad freqAlmRad boolOp form-check-input"
        data-title="Doces (Sim)"
        onKeyDown={keydown => {
          opRadioHandler(
            keydown,
            Array.from(
              document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
            )
          );
        }}
      />
      <label htmlFor="pbAlmYes" className="labRad inpFreqRot form-check-label">
        Sim
      </label>
      <input
        type="radio"
        name="cor_doces"
        id="pbAlmNo"
        className="freqRad freqAlmRad boolOp"
        data-title="Doces (Não)"
        onKeyDown={keydown => {
          opRadioHandler(
            keydown,
            Array.from(
              document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
            )
          );
        }}
      />
      <label htmlFor="pbAlmNo" className="labRad inpFreqRot form-check-label">
        Não
      </label>
    </>
  );
}
