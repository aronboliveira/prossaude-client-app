import { nullishBtn } from "@/lib/global/declarations/types";
import { ReseterBtnProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import ResetDlg from "../../alerts/ResetDlg";
import { scheduleReset } from "../panelFormsData";

export default function ReseterBtn({
  root,
  renderForm,
}: ReseterBtnProps): JSX.Element {
  const [shouldDisplayResetDlg, setDisplayResetDlg] = useState(false);
  const toggleResetSchdDlg = () => {
    setDisplayResetDlg(!shouldDisplayResetDlg);
  };
  const resetBtnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    if (resetBtnRef.current instanceof HTMLButtonElement) {
      scheduleReset[`outerHTML`] = (document.getElementById(
        "formBodySchedSect"
      ) || document.querySelector("form"))!.outerHTML;
      syncAriaStates([document.getElementById("btnResetTab")!]);
    }
  }, [resetBtnRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Errro carregando botão de reset" />
      )}
    >
      <button
        type="button"
        id="btnResetTab"
        className="btn btn-warning flexAlItCt flexJC flexBasis50 bolded opaquelightEl widFull noInvert"
        name="btnResetSched"
        ref={resetBtnRef}
        onClick={toggleResetSchdDlg}
      >
        Resetar Formulário
      </button>
      {shouldDisplayResetDlg && (
        <ResetDlg
          setDisplayResetDlg={setDisplayResetDlg}
          shouldDisplayResetDlg={shouldDisplayResetDlg}
          root={root}
          renderForm={renderForm}
        />
      )}
    </ErrorBoundary>
  );
}
