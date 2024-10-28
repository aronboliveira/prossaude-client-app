import { ErrorBoundary } from "react-error-boundary";
import { textTransformPascal } from "@/lib/global/gModel";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { useEffect, useRef } from "react";
import { nlHtEl, nlInp } from "@/lib/global/declarations/types";
import { timers } from "@/vars";
export default function OpProtUr({ ctx }: { ctx: "Persist" | "Ort" | "Tr" }): JSX.Element {
  const fullName = ((): string => {
      switch (ctx) {
        case "Persist":
          return "Persistente";
        case "Ort":
          return "Ortostática";
        case "Tr":
          return "Transitória";
        default:
          return "Indefinida";
      }
    })(),
    mainCheck = useRef<nlInp>(null),
    divAdd = useRef<nlHtEl>(null);
  useEffect(() => {
    try {
      setTimeout(() => {
        mainCheck.current ??= document.getElementById("CpbinpProtUrRadioYes") as nlInp;
        if (!(mainCheck.current instanceof HTMLInputElement)) return;
        divAdd.current ??= document.getElementById("divAddProtUr");
        if (!(divAdd.current instanceof Element)) return;
        divAdd.current.style.transition === ""
          ? (divAdd.current.style.transition = "opacity 0.5s ease-in")
          : (divAdd.current.style.transition += ", opacity 0.5s ease-in");
        if (mainCheck.current.checked) {
          divAdd.current.style.opacity = "1";
          divAdd.current.style.display = "block";
          for (const r of divAdd.current.querySelectorAll('input[type="radio"'))
            if (r instanceof HTMLInputElement) r.dataset.required = "true";
          return;
        }
        divAdd.current.style.opacity = "0";
        divAdd.current.style.display = "none";
        for (const r of divAdd.current.querySelectorAll('input[type="radio"'))
          if (r instanceof HTMLInputElement) r.dataset.required = "false";
      }, timers.personENTimer);
    } catch (e) {
      return;
    }
  }, [mainCheck]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message={`Error rendering Option for Proteinúria ${fullName || "Undefined context"}`} />
      )}>
      <input
        type='radio'
        name={`protur_lvl`}
        id={`protUr${textTransformPascal(ctx)}Id`}
        className='cpbOp opProtUr noInvert'
        data-title={`Proteinúria ${fullName}`}
        data-value={`protur_${ctx.toLowerCase()}`}
      />
      <span>{fullName}</span>
    </ErrorBoundary>
  );
}
