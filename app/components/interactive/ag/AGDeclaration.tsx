"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { memo } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import st from "@/styles/locals/modules/declarationStyles.module.scss";
import DefaultDeclaration from "../def/DefaultDeclaration";
import useDialog from "@/lib/hooks/useDialog";
const AGDeclaration = memo(({ state, dispatch }: DlgProps): JSX.Element => {
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
              Declaro estar ciente de que, de acordo com a regulamentação vigente para profissionais da saúde mental,{" "}
              <b>os dados deverão ser mantidos por um período mínimo de 20 anos</b> após o término do tratamento,
            </span>
            <span className={st.span}> em conformidade com as exigências do </span>
            <a href='https://portal.cfm.org.br/' target='_blank' rel='noopener noreferrer' className={st.a}>
              Conselho Federal de Medicina
            </a>
            <span className={st.span}>.</span>
          </p>
        </div>
      </dialog>
    </ErrorBoundary>
  );
});
export default AGDeclaration;
