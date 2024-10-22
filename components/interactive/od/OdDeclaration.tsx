"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { isClickOutside } from "@/lib/global/gStyleScript";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import st from "@/styles/locals/modules/declarationStyles.module.scss";
import DefaultDeclaration from "../def/DefaultDeclaration";
import useDialog from "@/lib/hooks/useDialog";
export default function OdDeclaration({ state, dispatch }: DlgProps): JSX.Element {
  const { mainRef } = useDialog({ state, dispatch, param: "conform" });
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
