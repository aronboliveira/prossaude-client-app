import { ErrorBoundary } from "react-error-boundary";
import { UserDlgProps } from "@/lib/global/declarations/interfacesCons";
import { nlDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useContext, useEffect, useRef } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import GenericErrorComponent from "../error/GenericErrorComponent";
import { createPortal } from "react-dom";
import { RootCtxType, UserPanelCtxProps } from "@/lib/global/declarations/interfaces";
import { RootCtx } from "@/pages/_app";
import { UserPanelCtx } from "./UserProfilePanel";
import UserList from "./UserList";
import sAg from "@/styles/modules/userContStyles.module.scss";
export default function UserDlg({ setUserDlg, shouldDisplayUserDlg }: UserDlgProps): JSX.Element {
  //REPLICA DO USERDROPDOWN PARA CASOS DE ERRO EM STACKING CONTEXT
  const userDlgRef = useRef<nlDlg>(null),
    divModal = useContext<RootCtxType>(RootCtx)?.divModal,
    { setDropdown, shouldShowDropdown } = useContext<UserPanelCtxProps>(UserPanelCtx);
  useEffect(() => {
    if (userDlgRef.current instanceof HTMLDialogElement) {
      userDlgRef.current.showModal();
      syncAriaStates([...userDlgRef.current.querySelectorAll("*"), userDlgRef.current]);
    }
  }, [userDlgRef]);
  return createPortal(
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Erro carregando janela modal' />}>
      <dialog className={`${sAg.bdPo} noInvert modalContent__fit forceInvert`} ref={userDlgRef}>
        <ErrorBoundary
          FallbackComponent={() => (
            <ErrorFallbackDlg
              renderError={new Error(`Erro carregando a janela modal!`)}
              onClick={() => {
                userDlgRef.current?.close();
                setUserDlg(!shouldDisplayUserDlg);
                setDropdown(!shouldShowDropdown);
              }}
            />
          )}>
          <button
            className='btn btn-close htMax0_1r widFull'
            onClick={() => {
              userDlgRef.current?.close();
              setUserDlg(!shouldDisplayUserDlg);
              setDropdown(!shouldShowDropdown);
            }}></button>
          <hr className='noInvert' />
          <UserList end='dlg' />
        </ErrorBoundary>
      </dialog>
    </ErrorBoundary>,
    divModal?.current ?? document.getElementById("divModal") ?? document.body,
  );
}
