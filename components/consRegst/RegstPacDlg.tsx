import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { ConsDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef } from "react";
import FormDlg from "./FormDlg";

export default function RegstPacDlg({
  onClose,
  userClass = "estudante",
}: ConsDlgProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (dialogRef?.current instanceof HTMLDialogElement) {
      (() => {
        dialogRef.current.showModal();
      })();
      syncAriaStates([
        ...dialogRef.current!.querySelectorAll("*"),
        dialogRef.current,
      ]);
    } else
      elementNotFound(
        dialogRef.current,
        "dialogElement in RegstPacDlg",
        extLine(new Error())
      );
  }, [dialogRef]);
  return (
    <FormDlg dialogRef={dialogRef} onClose={onClose} userClass={userClass} />
  );
}
