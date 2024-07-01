import { AvPacListDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef, useState } from "react";
import { nullishDlg, nullishTab } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, isClickOutside } from "@/lib/global/gStyleScript";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import PacList from "./PacList";

export default function AvPacListDlg({
  onClick,
  shouldDisplayPacList,
  shouldShowAlocBtn,
  userClass,
}: AvPacListDlgProps): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState(false);
  const dialogRef = useRef<nullishDlg>(null);
  const tabPacRef = useRef<nullishTab>(null);
  useEffect(() => {
    if (dialogRef?.current instanceof HTMLDialogElement) {
      dialogRef.current.showModal();
      syncAriaStates([
        ...dialogRef.current!.querySelectorAll("*"),
        dialogRef.current,
      ]);
      const handleKeyDown = (press: KeyboardEvent) => {
        if (press.key === "Escape") {
          setDisplayRowData(!shouldDisplayRowData);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else
      elementNotFound(
        dialogRef.current,
        "dialogElement in AvStudListDlg",
        extLine(new Error())
      );
  }, [dialogRef]);
  useEffect(() => {
    if (tabPacRef?.current instanceof HTMLTableElement)
      equalizeTabCells(tabPacRef.current);
    else
      elementNotFound(
        tabPacRef.current,
        `tabPacRef id ${
          (tabPacRef?.current as any)?.id || "UNIDENTIFIED"
        } in useEffect() for tableRef`,
        extLine(new Error())
      );
  }, [dialogRef, tabPacRef]);
  return (
    <>
      {shouldDisplayPacList && (
        <dialog
          className="modal-content-stk2"
          ref={dialogRef}
          onClick={ev => {
            isClickOutside(ev, ev.currentTarget).some(
              coord => coord === true
            ) && onClick(shouldDisplayPacList);
          }}
        >
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={() => onClick(shouldDisplayPacList)}
              />
            )}
          >
            <section className="flexRNoWBetCt widFull" id="headPacList">
              <h2 className="mg-1b noInvert">
                <strong>Pacientes Cadastrados</strong>
              </h2>
              <button
                className="btn btn-close forceInvert"
                onClick={() => onClick(shouldDisplayPacList)}
              ></button>
            </section>
            <PacList
              setDisplayRowData={setDisplayRowData}
              shouldDisplayRowData={shouldDisplayRowData}
              shouldDisplayPacList={shouldDisplayPacList}
              onClick={onClick}
              shouldShowAlocBtn={shouldShowAlocBtn}
              userClass={userClass}
            />
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
