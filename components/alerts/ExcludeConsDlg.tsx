import { nullishBtn, nullishDlg } from "@/lib/global/declarations/types";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { ExcludeConsDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { addEraseEvent } from "@/lib/locals/panelPage/handlers/consHandlerCmn";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
export default function ExcludeConsDlg({
  setDisplayExcludeDlg,
  shouldDisplayExcludeDlg = true,
  btn,
  userClass = "estudante",
}: ExcludeConsDlgProps): JSX.Element {
  const excludeDlgRef = useRef<nullishDlg>(null);
  const confirmRef = useRef<nullishBtn>(null);
  const toggleClose = (): void => {
    setDisplayExcludeDlg(!shouldDisplayExcludeDlg);
    if (!shouldDisplayExcludeDlg && excludeDlgRef.current instanceof HTMLDialogElement) excludeDlgRef.current.close();
  };
  useEffect(() => {
    if (shouldDisplayExcludeDlg && excludeDlgRef.current instanceof HTMLDialogElement)
      excludeDlgRef.current.showModal();
    syncAriaStates([...excludeDlgRef.current!.querySelectorAll("*"), excludeDlgRef.current!]);
    excludeDlgRef.current!.addEventListener(
      "click",
      click => {
        if (isClickOutside(click, excludeDlgRef.current!).some(point => point === true)) {
          excludeDlgRef.current!.close();
          toggleClose();
        }
      },
      true,
    );
    const handleKeyDown = (press: KeyboardEvent): void => {
      if (press.key === "Escape") {
        toggleClose();
      }
    };
    addEventListener("keydown", handleKeyDown);
    return (): void => removeEventListener("keydown", handleKeyDown);
  }, [excludeDlgRef]);
  useEffect(() => {
    try {
      if (!(confirmRef.current instanceof HTMLButtonElement))
        throw elementNotFound(
          confirmRef.current,
          `Button for confirming exclusion related to ${btn?.id ?? "UNIDENTIFIED"}`,
          extLine(new Error()),
        );
      (userClass === "coordenador" || userClass === "supervisor") && addEraseEvent(btn!, userClass);
    } catch (err) {
      console.warn(`Error fetching reference for confirm button:
      ${(err as Error).message}`);
    }
  }, [confirmRef]);
  return (
    <>
      {shouldDisplayExcludeDlg && (
        <dialog
          role='alertdialog'
          ref={excludeDlgRef}
          className='modal-content modal-content-fit'
          id='exclude-cons-dlg'
          onClick={ev => {
            if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
              ev.currentTarget.close();
              setDisplayExcludeDlg(!shouldDisplayExcludeDlg);
            }
          }}>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg renderError={new Error(`Erro carregando a janela modal!`)} onClick={toggleClose} />
            )}>
            <section role='alert' className='flexNoWC flexJC rGap2v'>
              <div role='group' className='flexJC flexAlItCt flexNoWC wsBs noInvert'>
                <h3>Confirmar remoção?</h3>
                <small role='textbox'>Esse processo é parcialmente ou totalmente irreversível!</small>
              </div>
              <button className='btn btn-warning bolded' onClick={toggleClose} ref={confirmRef}>
                Confirmar
              </button>
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
