import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { formCases, nlBtn } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState } from "react";
import ExcludeDlg from "../../alerts/ExcludeDlg";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function FormExcludeBtn({ context = "Stud" }: { context: string }): JSX.Element {
  const [shouldDisplayExcludeDlg, setDisplayExcludeDlg] = useState(false);
  const toggleDisplayExcludeDlg = (shouldDisplayExcludeDlg: boolean = true): void =>
    setDisplayExcludeDlg(!shouldDisplayExcludeDlg);
  const excludeBtnRef = useRef<nlBtn>(null);
  useEffect(() => {
    if (excludeBtnRef.current instanceof HTMLButtonElement)
      syncAriaStates([...excludeBtnRef.current!.querySelectorAll("*"), excludeBtnRef.current]);
    else elementNotFound(excludeBtnRef.current, "Button for Excluding Member", extLine(new Error()));
  }, [excludeBtnRef]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error carregando botão de exclusão' />}>
      <button
        type='button'
        id={`btnExclude${context}`}
        className='btn btn-danger opaqueEl btnAffectRegst btnExcRegst widFull'
        ref={excludeBtnRef}
        onClick={() => toggleDisplayExcludeDlg(shouldDisplayExcludeDlg)}>
        <small role='textbox' className='bolded'>
          Excluir
        </small>
      </button>
      {shouldDisplayExcludeDlg && (
        <ExcludeDlg
          route={`${((): formCases => {
            if (context === "Stud") return "studs";
            else if (context === "Prof") return "profs";
            else if (context === "Pac") return "patients";
            else return "studs";
          })()}`}
          setDisplayExcludeDlg={setDisplayExcludeDlg}
          shouldDisplayExcludeDlg={shouldDisplayExcludeDlg}
        />
      )}
    </ErrorBoundary>
  );
}
