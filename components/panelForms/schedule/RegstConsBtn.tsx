import { RegsConstBtnProps } from "@/lib/global/declarations/interfacesCons";
import { checkRegstBtn } from "@/lib/locals/panelPage/handlers/consHandlerCmn";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nlBtn, voidVal, vRoot } from "@/lib/global/declarations/types";
import { registerRoot, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useContext, useEffect, useRef, useState } from "react";
import FailRegstAlert from "../../alerts/FailRegsAlert";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function RegstConsBtn({ rootEl, secondOp = "Arraste" }: RegsConstBtnProps): JSX.Element {
  let root: vRoot;
  const [shouldDisplayFailRegstDlg, setDisplayFailRegstDlg] = useState<boolean>(false),
    userClass = useContext(PanelCtx).userClass,
    RegstBtnRef = useRef<nlBtn>(null),
    toggleDisplayRegstDlg = (rootEl: HTMLElement | voidVal, shouldDisplayFailRegstDlg: boolean = true): void => {
      rootEl instanceof HTMLElement
        ? (root = registerRoot(root, `#${rootEl.id}`, undefined, false))
        : (rootEl = document.getElementById("regstDaySubDiv"));
      rootEl instanceof HTMLElement
        ? (root = registerRoot(root, `#${rootEl.id}`, undefined, false))
        : elementNotFound(rootEl, "Root for placing failed register for new appointment", extLine(new Error()));
      if (
        !checkRegstBtn(
          RegstBtnRef.current,
          document,
          [root, shouldDisplayFailRegstDlg, setDisplayFailRegstDlg, secondOp],
          userClass,
        )
      )
        setDisplayFailRegstDlg(!shouldDisplayFailRegstDlg);
      root = undefined;
    };
  useEffect(() => {
    RegstBtnRef.current instanceof HTMLButtonElement
      ? syncAriaStates([document.getElementById("regstDayBtn")!])
      : elementNotFound(RegstBtnRef.current, "Button for Registering new appointment", extLine(new Error()));
  }, [RegstBtnRef]);
  return (
    <>
      <button
        type='button'
        id='regstDayBtn'
        className='btn btn-primary widMin82Q460v hovBlock'
        ref={RegstBtnRef}
        onClick={() => toggleDisplayRegstDlg(rootEl, shouldDisplayFailRegstDlg)}
        title='Repasse a consulta na Área de Transferência para a agenda'>
        Agendar Consulta
      </button>
      {shouldDisplayFailRegstDlg && (
        <FailRegstAlert
          setDisplayFailRegstDlg={setDisplayFailRegstDlg}
          shouldDisplayFailRegstDlg={shouldDisplayFailRegstDlg}
          root={root}
          secondOp={secondOp}
        />
      )}
    </>
  );
}
