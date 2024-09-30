import { ErrorBoundary } from "react-error-boundary";
import { ExcludeDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { handleDelete } from "@/lib/locals/panelPage/handlers/handlers";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg, nullishForm } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import { assignFormAttrs } from "@/lib/global/gModel";
export default function ExcludeDlg({
  route,
  setDisplayExcludeDlg,
  shouldDisplayExcludeDlg = true,
}: ExcludeDlgProps): JSX.Element {
  const excludeDlgRef = useRef<nullishDlg>(null);
  const formRef = useRef<nullishForm>(null);
  const toggleClose = (): void => {
    setDisplayExcludeDlg(!shouldDisplayExcludeDlg);
    if (!shouldDisplayExcludeDlg && excludeDlgRef.current instanceof HTMLDialogElement) excludeDlgRef.current.close();
  };
  useEffect(() => {
    if (shouldDisplayExcludeDlg && excludeDlgRef.current instanceof HTMLDialogElement)
      excludeDlgRef.current.showModal();
    syncAriaStates([...excludeDlgRef.current!.querySelectorAll("*"), excludeDlgRef.current!]);
    const handleKeyDown = (press: KeyboardEvent): void => {
      press.key === "Escape" && toggleClose();
    };
    assignFormAttrs(formRef.current);
    addEventListener("keydown", handleKeyDown);
    return (): void => removeEventListener("keydown", handleKeyDown);
  }, [excludeDlgRef]);
  return (
    <>
      {shouldDisplayExcludeDlg && (
        <dialog
          role='alertdialog'
          id='excludeAlertDlg'
          ref={excludeDlgRef}
          className='modal-content modal-content-fit'
          onClick={click => {
            if (isClickOutside(click, excludeDlgRef.current!).some(point => point === true)) {
              excludeDlgRef.current!.close();
              toggleClose();
            }
          }}>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg renderError={new Error(`Erro carregando a janela modal!`)} onClick={toggleClose} />
            )}>
            <form
              role='alert'
              name={`form_removal_${route}`}
              className='flexNoWC flexJC rGap2v'
              onSubmit={() => handleDelete(route, true)}>
              <div role='group' className='flexJC flexAlItCt flexNoWC wsBs noInvert'>
                <h3>Confirmar remoção?</h3>
                <small role='textbox'>Esse processo é parcialmente ou totalmente irreversível!</small>
              </div>
              <button type='submit' className='btn btn-warning bolded' onClick={toggleClose}>
                Confirmar
              </button>
            </form>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}