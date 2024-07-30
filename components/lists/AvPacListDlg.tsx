import { AvPacListDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg, nullishTab } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import PacList from "./PacList";
("use client");

export default function AvPacListDlg({
  dispatch,
  state,
  shouldShowAlocBtn,
  userClass,
}: AvPacListDlgProps): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState<boolean>(false);
  const dialogRef = useRef<nullishDlg>(null);
  const tabPacRef = useRef<nullishTab>(null);
  //push em history
  useEffect(() => {
    history.pushState(
      {},
      "",
      `${location.origin}${location.pathname}${location.search}&av-pac=open`
    );
    setTimeout(() => {
      history.pushState(
        {},
        "",
        `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")
      );
    }, 300);
    return () => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll(
          "&av-pac=open",
          ""
        )
      );
      setTimeout(() => {
        history.pushState(
          {},
          "",
          `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")
        );
      }, 300);
    };
  }, []);
  useEffect(() => {
    if (dialogRef?.current instanceof HTMLDialogElement) {
      dialogRef.current.showModal();
      syncAriaStates([
        ...dialogRef.current!.querySelectorAll("*"),
        dialogRef.current,
      ]);
      const handleKeyDown = (press: KeyboardEvent) => {
        press.key === "Escape" && setDisplayRowData(!shouldDisplayRowData);
      };
      addEventListener("keydown", handleKeyDown);
      return () => removeEventListener("keydown", handleKeyDown);
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
      {state && (
        <dialog
          className="modal-content-stk2"
          id="avPacListDlg"
          ref={dialogRef}
          onClick={ev => {
            isClickOutside(ev, ev.currentTarget).some(
              coord => coord === true
            ) && dispatch(!state);
          }}
        >
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={() => dispatch(state)}
              />
            )}
          >
            <section className="flexRNoWBetCt widFull" id="headPacList">
              <h2 className="mg-1b noInvert">
                <strong>Pacientes Cadastrados</strong>
              </h2>
              <button
                className="btn btn-close forceInvert"
                onClick={() => dispatch(!state)}
              ></button>
            </section>
            <PacList
              setDisplayRowData={setDisplayRowData}
              shouldDisplayRowData={shouldDisplayRowData}
              shouldShowAlocBtn={shouldShowAlocBtn}
              userClass={userClass}
            />
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
