import { RadioPairPros } from "@/lib/global/declarations/interfaces";
import { textTransformPascal } from "@/lib/global/gModel";
import { opRadioHandler } from "@/lib/global/handlers/gHandlers";
import { useState } from "react";

export default function RadioPair({
  name,
  fullName = "",
  ctx = false,
  add = "",
  altPh = "",
}: RadioPairPros): JSX.Element {
  const [shouldShowAdd, setAdd] = useState(false);
  let camelName = /_/g.test(name)
    ? name
        .split("_")
        .map((part, i) => (i === 0 ? part : textTransformPascal(part)))
        .join("")
    : name;
  if (camelName.length >= name.length) camelName = name;
  let PascalName = /_/g.test(name)
    ? name
        .split("_")
        .map(part => textTransformPascal(part))
        .join("")
    : textTransformPascal(name);
  if (PascalName.length >= name.length) PascalName = camelName;
  if (PascalName.length >= name.length) PascalName = name;
  fullName ||= textTransformPascal(name);
  let problemIdf = /_/g.test(name)
    ? name
        .split("_")
        .map(part => textTransformPascal(part))
        .join("")
    : textTransformPascal(name);
  return (
    <>
      <span
        role="group"
        className="spanMain spanMainFsAnamGRad noInvert"
        id={`${camelName}Span`}
      >
        <strong id={`${camelName}Title`}>{fullName}</strong>
        <span
          role="group"
          className="spanSub spanSubFsAnamGRad form-check"
          id={`${camelName}SpanSub`}
        >
          <input
            type="radio"
            name={`${name}`}
            id={ctx ? `Cpb${PascalName}Yes` : `${camelName}Yes`}
            className="noInvert radOp radYes form-check-input"
            tabIndex={0}
            data-title={`Sim — ${fullName}`}
            onKeyDown={keydown => {
              opRadioHandler(
                keydown,
                Array.from(
                  document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
                )
              );
            }}
            onClick={ev =>
              ev.currentTarget.checked ? setAdd(true) : setAdd(false)
            }
          />
          <label
            htmlFor={ctx ? `Cpb${PascalName}Yes` : `${camelName}Yes`}
            id={ctx ? `Cpb${PascalName}YesLab` : `${camelName}YesLab`}
            className="noInvert labOp boolOp form-check-label"
          >
            Sim
          </label>
          <input
            type="radio"
            name={`${name}`}
            id={ctx ? `Cpb${PascalName}No` : `${camelName}No`}
            className="noInvert radOp radNo"
            tabIndex={0}
            data-title={`Não — ${fullName}`}
            onKeyDown={keydown => {
              opRadioHandler(
                keydown,
                Array.from(
                  document.querySelectorAll('input[id$="Yes"], input[id$="No"]')
                )
              );
            }}
          />
          <label
            htmlFor={`${camelName}No`}
            id={ctx ? `Cpb${PascalName}NoLab` : `${camelName}NoLab`}
            className="noInvert labOp boolOp form-check-label"
          >
            Não
          </label>
        </span>
      </span>
      {shouldShowAdd && add === "ta" && (
        <textarea
          className={`form-control taOp ta${problemIdf} divAdd`}
          id={`textAdd${problemIdf}`}
          name={`notes_${name}`}
          maxLength={1000}
          placeholder={
            altPh && altPh !== ""
              ? altPh
              : `Escreva aqui os ${fullName
                  .replaceAll("(", "")
                  .replaceAll(")", "")
                  .replace("Renalis", "Renais")
                  .replace("renalis", "Renais")
                  .replace("Anticoncepcionalis", "Anticoncepcionais")
                  .replace(
                    "anticoncepcionalis",
                    "anticoncepcionais"
                  )} específicos`
          }
          data-title={`Descrição — ${fullName
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replace("renalis", "renais")
            .replace("anticoncepcionalis", "anticoncepcionais")}`}
        ></textarea>
      )}
    </>
  );
}