import { nullishDlg } from "@/lib/global/declarations/types";
import {
  applyDarkMode,
  checkDarkMode,
  setupDarkMode,
} from "@/lib/global/gStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { FailedRegstProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";

export default function FailRegstAlert({
  setDisplayFailRegstDlg,
  shouldDisplayFailRegstDlg = false,
  secondOp = "Arraste",
}: FailedRegstProps): JSX.Element {
  const FailRegstDlgRef = useRef<nullishDlg>(null);
  const toggleClose = () => {
    setDisplayFailRegstDlg(!shouldDisplayFailRegstDlg);
    if (
      !shouldDisplayFailRegstDlg &&
      FailRegstDlgRef.current instanceof HTMLDialogElement
    )
      FailRegstDlgRef.current.close();
  };
  useEffect(() => {
    if (
      shouldDisplayFailRegstDlg &&
      FailRegstDlgRef.current instanceof HTMLDialogElement
    )
      FailRegstDlgRef.current.showModal();
    const shouldApplyDarkMode = checkDarkMode();
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    if (
      shouldApplyDarkMode ||
      (toggleDarkMode instanceof HTMLInputElement &&
        (toggleDarkMode.type === "checkbox" ||
          toggleDarkMode.type === "radio") &&
        toggleDarkMode.checked === true)
    ) {
      const [arrColors, els, validation] = setupDarkMode([
        ...Array.from(FailRegstDlgRef.current!.querySelectorAll("*")).filter(
          element => element instanceof HTMLElement
        ),
        FailRegstDlgRef.current!,
      ]);
      applyDarkMode(
        arrColors,
        els as HTMLElement[],
        validation,
        (toggleDarkMode as HTMLInputElement).checked
      );
    }
    syncAriaStates([
      ...FailRegstDlgRef.current!.querySelectorAll("*"),
      FailRegstDlgRef.current!,
    ]);
    const handleKeyDown = (press: KeyboardEvent) => {
      if (press.key === "Escape") {
        toggleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [FailRegstDlgRef]);
  return (
    <>
      {shouldDisplayFailRegstDlg && (
        <dialog
          role="alertdialog"
          ref={FailRegstDlgRef}
          className="modal-content modal-content-fit wid80"
        >
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={toggleClose}
              />
            )}
          >
            <section
              role="alert"
              className="flexNoWC flexJtC flexAlItCt rGap2v"
            >
              <div
                role="group"
                className="flexJtC flexAlItCt flexNoWC wsBs noInvert"
              >
                <h3 className="wsBs">
                  Falha na procura de um encaixe correspondente na agenda!{" "}
                  {`${secondOp} `} ou insira manualmente.
                </h3>
              </div>
              <button className="btn btn-danger bolded" onClick={toggleClose}>
                Fechar
              </button>
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
