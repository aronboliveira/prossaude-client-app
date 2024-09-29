import { ErrorBoundary } from "react-error-boundary";
import { ReseterBtnProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { nullishBtn } from "@/lib/global/declarations/types";
import { panelRoots } from "./client/SelectPanel";
import { scheduleReset } from "../panelFormsData";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import ResetDlg from "../../alerts/ResetDlg";
export default function ReseterBtn({ renderForm }: ReseterBtnProps): JSX.Element {
  const [shouldDisplayResetDlg, setDisplayResetDlg] = useState(false);
  const toggleResetSchdDlg = (): void => setDisplayResetDlg(!shouldDisplayResetDlg);
  const resetBtnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    const formBody = document.getElementById("formBodySchedSect") || document.querySelector("form");
    if (resetBtnRef.current instanceof HTMLButtonElement && formBody) {
      scheduleReset[`outerHTML`] = formBody.outerHTML;
      syncAriaStates([document.getElementById("btnResetTab")!]);
    } else {
      setTimeout(() => {
        const formBody = document.getElementById("formBodySchedSect") || document.querySelector("form");
        if (resetBtnRef.current instanceof HTMLButtonElement && formBody) {
          scheduleReset[`outerHTML`] = formBody.outerHTML;
          syncAriaStates([document.getElementById("btnResetTab")!]);
        }
      }, 2000);
    }
  }, [resetBtnRef]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Errro carregando botão de reset' />}>
      <button
        type='button'
        id='btnResetTab'
        className='btn btn-warning flexAlItCt flexJC flexBasis50 bolded opaquelightEl widFull noInvert'
        name='btnResetSched'
        ref={resetBtnRef}
        onClick={toggleResetSchdDlg}>
        Resetar Formulário
      </button>
      {shouldDisplayResetDlg && (
        <ResetDlg
          setDisplayResetDlg={setDisplayResetDlg}
          shouldDisplayResetDlg={shouldDisplayResetDlg}
          root={panelRoots.mainRoot!}
          renderForm={renderForm}
        />
      )}
    </ErrorBoundary>
  );
}
