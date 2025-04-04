"use client";
import { AvStudListDlgProps } from "@/lib/global/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nlDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import StudList from "./StudList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function AvStudListDlg({ forwardedRef, dispatch, state = false }: AvStudListDlgProps): JSX.Element {
  const dialogRef = useRef<nlDlg>(null),
    sectTabRef = useRef<HTMLElement | null>(null);
  //push em history
  useEffect(() => {
    !/av-stud=open/gi.test(location.search) &&
      history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&av-stud=open`);
    setTimeout(() => {
      history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
    }, 300);
    return (): void => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll("&av-stud=open", ""),
      );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, []);
  //listeners de dialog
  useEffect(() => {
    if (dialogRef?.current instanceof HTMLDialogElement) {
      dialogRef.current.showModal();
      syncAriaStates([...dialogRef.current!.querySelectorAll("*"), dialogRef.current]);
      const handleKeyDown = (press: KeyboardEvent): void => {
        press.key === "Escape" && dispatch(state);
      };
      addEventListener("keydown", handleKeyDown);
      return (): void => removeEventListener("keydown", handleKeyDown);
    } else elementNotFound(dialogRef.current, "dialogElement in AvStudListDlg", extLine(new Error()));
  }, [forwardedRef, dialogRef, dispatch]);
  return (
    <>
      {state && (
        <QueryClientProvider client={queryClient}>
          <dialog
            className='modalContent__stk2'
            id='avStudListDlg'
            ref={dialogRef}
            onClick={ev => {
              isClickOutside(ev, ev.currentTarget).some(coord => coord === true) && dispatch(!state);
            }}>
            <ErrorBoundary
              FallbackComponent={() => (
                <ErrorFallbackDlg
                  renderError={new Error(`Erro carregando a janela modal!`)}
                  onClick={() => dispatch(!state)}
                />
              )}>
              <section className='flexRNoWBetCt' id='headStudList'>
                <h2 className='mg__1b noInvert'>
                  <strong>Estudantes Cadastrados</strong>
                </h2>
                <button className='btn btn-close forceInvert' onClick={() => dispatch(!state)}></button>
              </section>
              <section className='formPadded' id='sectStudsTab' ref={sectTabRef}>
                <StudList mainDlgRef={forwardedRef} state={state} dispatch={dispatch} />
              </section>
            </ErrorBoundary>
          </dialog>
        </QueryClientProvider>
      )}
    </>
  );
}
