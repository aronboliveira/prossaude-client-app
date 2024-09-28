"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function OdDeclaration({ state, dispatch }: DlgProps): JSX.Element {
  const mainRef = useRef<nullishDlg>(null);
  const handleKp = (kp: KeyboardEvent) => {
    if (kp.key === "ESCAPE") {
      dispatch(!state);
      !state && mainRef.current?.close();
    }
  };
  //push em history
  useEffect(() => {
    history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&conform=open`);
    setTimeout(() => {
      history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
    }, 300);
    return () => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll("&conform=open", ""),
      );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, []);
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(
          mainRef.current,
          `Main Reference for ${OdDeclaration.prototype.constructor.name}`,
          extLine(new Error()),
        );
      syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      mainRef.current instanceof HTMLDialogElement && mainRef.current.showModal();
      addEventListener("keypress", handleKp);
      return () => removeEventListener("keypress", handleKp);
    } catch (e) {
      console.error(`Error executing useEffect:\n${(e as Error).message}`);
    }
  }, [mainRef]);
  return !state ? (
    <></>
  ) : (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Erro carregando modal de declaração' />}>
      <dialog
        id='conformDlg'
        className='modal-content-stk2 defDp'
        ref={mainRef}
        onClick={ev => {
          if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
            dispatch(!state);
            !state && ev.currentTarget.close();
          }
        }}>
        <h3>TERMOS DE CONCORDÂNCIA</h3>
        <p>Texto</p>
      </dialog>
    </ErrorBoundary>
  );
}
