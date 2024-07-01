import { nullishDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { ResetDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MainFormPanel from "../mainPanel/MainFormPanel";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";

export default function ResetDlg({
  root,
  setDisplayResetDlg,
  shouldDisplayResetDlg = true,
}: ResetDlgProps): JSX.Element {
  const ResetDlgRef = useRef<nullishDlg>(null);
  const toggleClose = () => {
    setDisplayResetDlg(!shouldDisplayResetDlg);
    if (
      !shouldDisplayResetDlg &&
      ResetDlgRef.current instanceof HTMLDialogElement
    )
      ResetDlgRef.current.close();
  };
  const resetForm = () => {
    document.querySelector("form")!.reset();
    root.render(
      <MainFormPanel
        mainRoot={root}
        userClass={"coordenador"}
        defOp={
          (document.getElementById("coordPanelSelect") as HTMLSelectElement)
            ?.value || "agenda"
        }
      />
    );
  };
  useEffect(() => {
    if (
      shouldDisplayResetDlg &&
      ResetDlgRef.current instanceof HTMLDialogElement
    )
      ResetDlgRef.current.showModal();
    syncAriaStates([
      ...ResetDlgRef.current!.querySelectorAll("*"),
      ResetDlgRef.current!,
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
  }, [ResetDlgRef]);
  return (
    <>
      {shouldDisplayResetDlg && (
        <dialog
          role="alertdialog"
          ref={ResetDlgRef}
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
            <section role="alert" className="flexNoW">
              <button
                className="btn btn-close forceInvert"
                onClick={toggleClose}
              ></button>
            </section>
            <section
              role="alert"
              className="flexNoWC flexJtC flexAlItCt rGap2v"
            >
              <div
                role="group"
                className="flexJtC flexAlItCt flexNoWC wsBs noInvert"
              >
                <h3 className="bolded">Confirmar reset?</h3>
                <small role="textbox" className="bolded txaCt">
                  Esse processo é totalmente irreversível!
                </small>
              </div>
              <button
                className="btn btn-warning bolded"
                onClick={() => {
                  toggleClose();
                  resetForm();
                }}
              >
                Confirmar
              </button>
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
