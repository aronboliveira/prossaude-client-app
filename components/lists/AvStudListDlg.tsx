import { AvStudListDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, isClickOutside } from "@/lib/global/gStyleScript";
import { nullishBtn, nullishDlg } from "@/lib/global/declarations/types";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useCallback, MutableRefObject } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import StudList from "./StudList";
("use client");

import {
  addListenerAlocation,
  checkLocalIntervs,
  filterTabMembers,
} from "@/lib/locals/panelPage/handlers/consHandlerList";

export default function AvStudListDlg({
  forwardedRef,
  dispatch,
  state = false,
  userClass = "estudante",
}: AvStudListDlgProps): JSX.Element {
  const dialogRef = useRef<nullishDlg>(null);
  const sectTabRef = useRef<HTMLElement | null>(null);
  const gatherStudData = useCallback(
    (alocBtnRef: nullishBtn, dialogRef: MutableRefObject<nullishDlg>) => {
      addListenerAlocation(
        alocBtnRef,
        dialogRef.current,
        forwardedRef.current!,
        "Stud",
        state,
        dispatch,
        userClass
      );
    },
    [dialogRef, forwardedRef]
  );
  useEffect(() => {
    !/av-stud=open/gi.test(location.search) &&
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}&av-stud=open`
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
          "&av-stud=open",
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
    } else
      elementNotFound(
        dialogRef.current,
        "dialogElement in AvStudListDlg",
        extLine(new Error())
      );
  }, [forwardedRef, dialogRef]);
  useEffect(() => {
    const tabStudRef = dialogRef.current?.querySelector("table");
    if (tabStudRef instanceof HTMLTableElement) {
      equalizeTabCells(tabStudRef);
      const typeConsSel = forwardedRef.current?.querySelector("#typeConsSel");
      if (typeConsSel instanceof HTMLSelectElement) {
        const [selectedOp] = Array.from(
          typeConsSel.querySelectorAll("option")
        ).filter(opt => opt.selected === true);
        if (selectedOp instanceof HTMLOptionElement) {
          const relOptgrp = selectedOp.closest("optgroup");
          if (
            relOptgrp instanceof HTMLOptGroupElement &&
            relOptgrp.label !== ""
          )
            filterTabMembers(tabStudRef, relOptgrp.label.toLowerCase().trim());
        } else
          elementNotFound(
            selectedOp,
            `<option> for getting type of appointment for ${
              tabStudRef.id || "UNIDENTIFIED"
            }`,
            extLine(new Error())
          );
      } else
        elementNotFound(
          typeConsSel,
          `<select> for getting type of appointment for ${
            tabStudRef.id || "UNIDENTIFIED"
          }`,
          extLine(new Error())
        );
    } else
      elementNotFound(
        tabStudRef,
        `tabStudRef id ${
          (tabStudRef as any)?.id || "UNIDENTIFIED"
        } in useEffect() for tableRef`,
        extLine(new Error())
      );
  }, [dialogRef]);
  useEffect(() => {
    const alocBtnRef = document.getElementById("btnAlocStud-row2");
    alocBtnRef instanceof HTMLButtonElement &&
      gatherStudData(alocBtnRef, dialogRef);
  }, [dialogRef]);
  useEffect(() => {
    if (dialogRef.current instanceof HTMLElement) {
      const handleKeyDown = (press: KeyboardEvent) => {
        press.key === "Escape" && dispatch(state);
      };
      addEventListener("keydown", handleKeyDown);
      return () => removeEventListener("keydown", handleKeyDown);
    }
  }, [dialogRef]);
  useEffect(() => {
    if (sectTabRef?.current instanceof HTMLElement) {
      checkLocalIntervs(sectTabRef.current);
      strikeEntries(sectTabRef.current);
    } else
      elementNotFound(
        sectTabRef.current,
        "sectTabRef in useEffect()",
        extLine(new Error())
      );
  }, [sectTabRef]);
  return (
    <>
      {state && (
        <dialog
          className="modal-content-stk2"
          id="avStudListDlg"
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
                onClick={() => dispatch(!state)}
              />
            )}
          >
            <section className="flexRNoWBetCt" id="headStudList">
              <h2 className="mg-1b noInvert">
                <strong>Estudantes Cadastrados</strong>
              </h2>
              <button
                className="btn btn-close forceInvert"
                onClick={() => dispatch(!state)}
              ></button>
            </section>
            <section className="form-padded" id="sectStudsTab" ref={sectTabRef}>
              <StudList userClass={userClass} />
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
