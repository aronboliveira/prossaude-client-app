"use client";
import { AvPacListDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useContext, useEffect, useRef, useState } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import PacList from "./PacList";
import { PanelCtx } from "../panelForms/defs/client/SelectLoader";
export default function AvPacListDlg({ dispatch, state, shouldShowAlocBtn }: AvPacListDlgProps): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState<boolean>(false),
    userClass = useContext(PanelCtx).userClass,
    dialogRef = useRef<nullishDlg>(null);
  //push em history
  useEffect(() => {
    !/av-pac=open/gi.test(location.search) &&
      history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&av-pac=open`);
    setTimeout(() => {
      history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
    }, 300);
    return (): void => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll("&av-pac=open", ""),
      );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, []);
  //listeners para dlg
  useEffect(() => {
    if (dialogRef?.current instanceof HTMLDialogElement) {
      dialogRef.current.showModal();
      syncAriaStates([...dialogRef.current!.querySelectorAll("*"), dialogRef.current]);
      const handleKeyDown = (press: KeyboardEvent): void => {
        press.key === "Escape" && setDisplayRowData(!shouldDisplayRowData);
      };
      addEventListener("keydown", handleKeyDown);
      return (): void => removeEventListener("keydown", handleKeyDown);
    } else elementNotFound(dialogRef.current, "dialogElement in AvStudListDlg", extLine(new Error()));
  }, [dialogRef]);
  return (
    <>
      {state && (
        <dialog
          className='modal-content-stk2'
          id='avPacListDlg'
          ref={dialogRef}
          onClick={ev => {
            isClickOutside(ev, ev.currentTarget).some(coord => coord === true) && dispatch(!state);
          }}>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={() => dispatch(state)}
              />
            )}>
            <section className='flexRNoWBetCt widFull' id='headPacList'>
              <h2 className='mg-1b noInvert'>
                <strong>Pacientes Cadastrados</strong>
              </h2>
              <button className='btn btn-close forceInvert' onClick={() => dispatch(!state)}></button>
            </section>
            <PacList
              setDisplayRowData={setDisplayRowData}
              shouldDisplayRowData={shouldDisplayRowData}
              shouldShowAlocBtn={shouldShowAlocBtn}
              dispatch={dispatch}
              state={state}
            />
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
