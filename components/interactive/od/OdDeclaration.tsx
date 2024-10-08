"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import st from "../../../src/styles/locals/declarationStyles.module.scss";
import DefaultDeclaration from "../def/DefaultDeclaration";
export default function OdDeclaration({ state, dispatch }: DlgProps): JSX.Element {
  const mainRef = useRef<nullishDlg>(null);
  //push em history
  useEffect(() => {
    if (!/conform=open/gi.test(location.href))
      history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&conform=open`);
    setTimeout(() => {
      history.replaceState(
        {},
        "",
        `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#").replaceAll("/&", "&"),
      );
      location.href.match(/conform=open/g)?.forEach((m, i) => {
        console.log(m);
        try {
          if (i === 0) return;
          location.href.replace(m, "");
        } catch (e) {
          console.error(`Error executing iteration ${i} for reading conform in URL:${(e as Error).message}`);
        }
      });
      if (!/\?/g.test(location.href) && /&/g.test(location.href))
        history.replaceState({}, "", location.href.replace("&", "?"));
    }, 300);
    return (): void => {
      history.replaceState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll(/[\?&]conform=open/g, ""),
      );
      setTimeout(() => {
        history.replaceState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, []);
  useEffect(() => {
    const handleKp = (kp: KeyboardEvent): void => {
      if (kp.key === "ESCAPE") {
        dispatch(!state);
        !state && mainRef.current?.close();
      }
    };
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
      return (): void => removeEventListener("keypress", handleKp);
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
        <div className={st.declaracao}>
          <DefaultDeclaration />
          <p className={st.p}>
            <span className={`${st.span} ${st.num}`}>8. </span>
            <span className={st.strong}>
              Declaro estar ciente de que, de acordo com orientações gerais da área de nutrição e educação física,{" "}
              <b>os dados deverão ser mantidos por um período mínimo de 5 anos</b> após o término do atendimento,
            </span>
            <span className={st.span}> em conformidade com as boas práticas de saúde e segurança de dados;</span>
          </p>
        </div>
      </dialog>
    </ErrorBoundary>
  );
}
