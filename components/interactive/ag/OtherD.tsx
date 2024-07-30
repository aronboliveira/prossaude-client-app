import { opRadioHandler } from "@/lib/global/handlers/gHandlers";
"use client";


export default function OtherD(): JSX.Element {
  return (
    <input
      type="radio"
      name="pbOtherDName"
      id="pbOtherDIdYes"
      className="radOD"
      data-title="outras_doencas"
      onKeyDown={keydown => {
        opRadioHandler(
          keydown,
          Array.from(
            document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
          )
        );
      }}
    />
  );
}
