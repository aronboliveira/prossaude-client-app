"use client";
import { RootCtxType, DlgProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { memo, useContext } from "react";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import st from "@/styles/locals/modules/declarationStyles.module.scss";
import DefaultDeclaration from "../../def/DefaultDeclaration";
import { createPortal } from "react-dom";
import { RootCtx } from "@/pages/_app";
import { checkContext } from "@/lib/global/gModel";
import useDialog from "@/lib/hooks/useDialog";
const ENDeclaration = memo(({ state, dispatch }: DlgProps): JSX.Element => {
  const divAdd = useContext<RootCtxType>(RootCtx).divModal,
    { mainRef } = useDialog({ state, dispatch, param: "conform" });
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(RootCtx);
  checkContext(ctx, "RootCtx", ENDeclaration);
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
