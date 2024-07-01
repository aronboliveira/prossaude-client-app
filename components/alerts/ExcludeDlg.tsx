import { nullishDlg } from "@/lib/global/declarations/types";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { ExcludeDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";

export default function ExcludeDlg({
  setDisplayExcludeDlg,
  shouldDisplayExcludeDlg = true,
}: ExcludeDlgProps): JSX.Element {
  const excludeDlgRef = useRef<nullishDlg>(null);
  const toggleClose = () => {
    setDisplayExcludeDlg(!shouldDisplayExcludeDlg);
    if (
      !shouldDisplayExcludeDlg &&
      excludeDlgRef.current instanceof HTMLDialogElement
    )
      excludeDlgRef.current.close();
  };
  useEffect(() => {
    if (
      shouldDisplayExcludeDlg &&
      excludeDlgRef.current instanceof HTMLDialogElement
    )
      excludeDlgRef.current.showModal();
    syncAriaStates([
      ...excludeDlgRef.current!.querySelectorAll("*"),
      excludeDlgRef.current!,
    ]);
    excludeDlgRef.current!.addEventListener(
      "click",
      click => {
        if (
          isClickOutside(click, excludeDlgRef.current!).some(
            point => point === true
          )
        ) {
          excludeDlgRef.current!.close();
          toggleClose();
        }
      },
      true
    );
    const handleKeyDown = (press: KeyboardEvent) => {
      if (press.key === "Escape") {
        toggleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [excludeDlgRef]);
  return (
    <>
      {shouldDisplayExcludeDlg && (
        <dialog
          role="alertdialog"
          ref={excludeDlgRef}
          className="modal-content modal-content-fit"
        >
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={toggleClose}
              />
            )}
          >
            <section role="alert" className="flexNoWC flexJC rGap2v">
              <div
                role="group"
                className="flexJC flexAlItCt flexNoWC wsBs noInvert"
              >
                <h3>Confirmar remoção?</h3>
                <small role="textbox">
                  Esse processo é parcialmente ou totalmente irreversível!
                </small>
              </div>
              <button className="btn btn-warning bolded" onClick={toggleClose}>
                Confirmar
              </button>
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
