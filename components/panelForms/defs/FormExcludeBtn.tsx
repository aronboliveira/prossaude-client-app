import { nullishBtn } from "@/lib/global/declarations/types";
import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import ExcludeDlg from "../../alerts/ExcludeDlg";
import GenericErrorComponent from "../../error/GenericErrorComponent";

export default function FormExcludeBtn({
  context = "Stud",
}: {
  context: string;
}): JSX.Element {
  const [shouldDisplayExcludeDlg, setDisplayExcludeDlg] = useState(false);
  const toggleDisplayExcludeDlg = (shouldDisplayExcludeDlg: boolean = true) => {
    setDisplayExcludeDlg(!shouldDisplayExcludeDlg);
  };
  const excludeBtnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    if (excludeBtnRef.current instanceof HTMLButtonElement)
      syncAriaStates([
        ...excludeBtnRef.current!.querySelectorAll("*"),
        excludeBtnRef.current,
      ]);
    else
      elementNotFound(
        excludeBtnRef.current,
        "Button for Excluding Member",
        extLine(new Error())
      );
  }, [excludeBtnRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error carregando botão de exclusão" />
      )}
    >
      <button
        type="button"
        id={`btnExclude${context}`}
        className="btn btn-danger opaqueEl btnAffectRegst btnExcRegst widFull"
        ref={excludeBtnRef}
        onClick={() => toggleDisplayExcludeDlg(shouldDisplayExcludeDlg)}
      >
        <small role="textbox" className="bolded">
          Excluir
        </small>
      </button>
      {shouldDisplayExcludeDlg && (
        <ExcludeDlg
          setDisplayExcludeDlg={setDisplayExcludeDlg}
          shouldDisplayExcludeDlg={shouldDisplayExcludeDlg}
        />
      )}
    </ErrorBoundary>
  );
}
