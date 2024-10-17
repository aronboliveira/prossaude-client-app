"use client";
import { RootCtxType, DlgProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg, rKbEv } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { memo, useCallback, useContext, useEffect, useRef } from "react";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import st from "@/styles/locals/modules/declarationStyles.module.scss";
import DefaultDeclaration from "../../def/DefaultDeclaration";
import { createPortal } from "react-dom";
import { RootCtx } from "@/pages/_app";
import { useRouter } from "next/router";
import { checkContext } from "@/lib/global/gModel";
const ENDeclaration = memo(({ state, dispatch }: DlgProps): JSX.Element => {
  const mainRef = useRef<nullishDlg>(null),
    divAdd = useContext<RootCtxType>(RootCtx).divModal,
    router = useRouter(),
    handleKp = useCallback(
      (kp: rKbEv): void => {
        if (kp.key !== "ESCAPE") return;
        dispatch(!state);
        !state && mainRef.current?.close();
      },
      [state, dispatch],
    );
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(RootCtx);
  checkContext(ctx, "RootCtx", ENDeclaration);
  //push em history
  useEffect(() => {
    if (!router.query.conform)
      router.push({
        pathname: router.pathname,
        query: { ...router.query, conform: "open" },
      });
    return (): void => {
      const { conform, ...rest } = router.query;
      router.replace({
        pathname: router.pathname,
        query: rest,
      });
    };
  }, [router]);
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(
          mainRef.current,
          `Main Reference for ${ENDeclaration.prototype.constructor.name}`,
          extLine(new Error()),
        );
      syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      mainRef.current instanceof HTMLDialogElement && mainRef.current.showModal();
    } catch (e) {
      console.error(`Error executing useEffect:\n${(e as Error).message}`);
    }
    addEventListener("keypress", handleKp);
    return (): void => removeEventListener("keypress", handleKp);
  }, [mainRef, handleKp, state]);
  return createPortal(
    !state ? (
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
    ),
    divAdd?.current ?? document.getElementById("divAdd") ?? document.body,
  );
});
export default ENDeclaration;
