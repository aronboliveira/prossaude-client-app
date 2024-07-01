import { nullishBtn, voidVal } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { RegsConstBtnProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { checkRegstBtn } from "@/lib/locals/panelPage/handlers/consHandlerCmn";
import { useEffect, useRef, useState } from "react";
import { Root, createRoot } from "react-dom/client";
import FailRegstAlert from "../../alerts/FailRegsAlert";

export default function RegstConsBtn({
  rootEl,
  secondOp = "Arraste",
  userClass = "estudante",
}: RegsConstBtnProps): JSX.Element {
  let root: Root | undefined;
  const [shouldDisplayFailRegstDlg, setDisplayFailRegstDlg] = useState(false);
  const RegstBtnRef = useRef<nullishBtn>(null);
  const toggleDisplayRegstDlg = (
    rootEl: HTMLElement | voidVal,
    shouldDisplayFailRegstDlg: boolean = true
  ) => {
    rootEl instanceof HTMLElement
      ? (root = createRoot(rootEl))
      : (rootEl = document.getElementById("regstDaySubDiv"));
    rootEl instanceof HTMLElement
      ? (root = createRoot(rootEl))
      : elementNotFound(
          rootEl,
          "Root for placing failed register for new appointment",
          extLine(new Error())
        );
    if (
      !checkRegstBtn(
        RegstBtnRef.current,
        document,
        [root, shouldDisplayFailRegstDlg, setDisplayFailRegstDlg, secondOp],
        userClass
      )
    )
      setDisplayFailRegstDlg(!shouldDisplayFailRegstDlg);
    root = undefined;
  };
  useEffect(() => {
    if (RegstBtnRef.current instanceof HTMLButtonElement)
      syncAriaStates([document.getElementById("regstDayBtn")!]);
    else
      elementNotFound(
        RegstBtnRef.current,
        "Button for Registering new appointment",
        extLine(new Error())
      );
  }, [RegstBtnRef]);
  return (
    <>
      <button
        type="button"
        id="regstDayBtn"
        className="btn btn-primary widMin82Q460v hovBlock"
        ref={RegstBtnRef}
        onClick={() => toggleDisplayRegstDlg(rootEl, shouldDisplayFailRegstDlg)}
        title="Repasse a consulta na Área de Transferência para a agenda"
      >
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
