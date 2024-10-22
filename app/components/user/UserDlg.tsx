import { ErrorBoundary } from "react-error-boundary";
import { UserDlgProps } from "@/lib/global/declarations/interfacesCons";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
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
import { checkContext } from "@/lib/global/gModel";
export default function UserDlg({ setUserDlg, shouldDisplayUserDlg }: UserDlgProps): JSX.Element {
  //REPLICA DO USERDROPDOWN PARA CASOS DE ERRO EM STACKING CONTEXT
  const userDlgRef = useRef<nlDlg>(null),
    divModal = useContext<RootCtxType>(RootCtx)?.divModal,
    { setDropdown, shouldShowDropdown } = useContext<UserPanelCtxProps>(UserPanelCtx);
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(RootCtx);
  checkContext(ctx, "RootCtx", UserDlg);
  useEffect(() => {
    if (userDlgRef.current instanceof HTMLDialogElement) {
      userDlgRef.current.showModal();
      syncAriaStates([...userDlgRef.current.querySelectorAll("*"), userDlgRef.current]);
    } else elementNotFound(userDlgRef.current, "Dialog for user panel", extLine(new Error()));
  }, [userDlgRef]);
  return createPortal(
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Erro carregando janela modal' />}>
      <dialog className='bdPo noInvert modal-content-fit forceInvert' ref={userDlgRef}>
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
            className='btn btn-close htMax0-1r widFull'
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
