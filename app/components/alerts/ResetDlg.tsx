import { ErrorBoundary } from "react-error-boundary";
import { ResetDlgProps } from "@/lib/global/declarations/interfacesCons";
import { createRoot } from "react-dom/client";
import { nlDlg } from "@/lib/global/declarations/types";
import { panelRoots } from "@/vars";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import MainFormPanel from "../mainPanel/MainFormPanel";
import { isClickOutside } from "@/lib/global/gStyleScript";
export default function ResetDlg({
  root,
  setDisplayResetDlg,
  shouldDisplayResetDlg = true,
}: ResetDlgProps): JSX.Element {
  if (!panelRoots.mainRoot) {
    panelRoots.mainRoot = createRoot(document.getElementById("formRoot")!);
    root = panelRoots.mainRoot;
  }
  const ResetDlgRef = useRef<nlDlg>(null),
    resetForm = (): void => {
      document.querySelector("form")!.reset();
      root?.render(<MainFormPanel />);
    },
    handleClose = (): void => {
      setDisplayResetDlg(!shouldDisplayResetDlg);
      if (!shouldDisplayResetDlg && ResetDlgRef.current instanceof HTMLDialogElement) ResetDlgRef.current.close();
    };
  useEffect(() => {
    const toggleClose = (): void => {
      setDisplayResetDlg(!shouldDisplayResetDlg);
      if (!shouldDisplayResetDlg && ResetDlgRef.current instanceof HTMLDialogElement) ResetDlgRef.current.close();
    };
    if (shouldDisplayResetDlg && ResetDlgRef.current instanceof HTMLDialogElement) ResetDlgRef.current.showModal();
    syncAriaStates([...ResetDlgRef.current!.querySelectorAll("*"), ResetDlgRef.current!]);
    const handleKeyDown = (press: KeyboardEvent): void => {
      if (press.key === "Escape") toggleClose();
    };
    addEventListener("keydown", handleKeyDown);
    return (): void => removeEventListener("keydown", handleKeyDown);
  }, [ResetDlgRef, setDisplayResetDlg]);
  return (
    <>
      {shouldDisplayResetDlg && (
        <dialog
          role='alertdialog'
          ref={ResetDlgRef}
          className='modal-content modalContent__fit'
          id='reset-dlg'
          onClick={ev => {
            if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
              ev.currentTarget.close();
              setDisplayResetDlg(!shouldDisplayResetDlg);
            }
          }}>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg renderError={new Error(`Erro carregando a janela modal!`)} onClick={handleClose} />
            )}>
            <section role='alert' className='flexNoW'>
              <button className='btn btn-close forceInvert' onClick={handleClose}></button>
            </section>
            <section role='alert' className='flexNoWC flexJtC flexAlItCt rGap2v'>
              <div role='group' className='flexJtC flexAlItCt flexNoWC wsBs noInvert'>
                <h3 className='bolded'>Confirmar reset?</h3>
                <small role='textbox' className='bolded txaCt'>
                  Esse processo é totalmente irreversível!
                </small>
              </div>
              <button
                className='btn btn-warning bolded'
                onClick={() => {
                  handleClose();
                  resetForm();
                }}>
                Confirmar
              </button>
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
