import { useEffect, useRef, useState } from "react";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { ConsDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import FormDlg from "./FormDlg";

export default function AutoDlg({
  onClose,
  userClass = "estudante",
}: ConsDlgProps): JSX.Element {
  const [dialogLoaded, setDialogLoaded] = useState(true);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDialogLoaded(dialogLoaded);
    }, 100);
    return () => clearTimeout(timeout);
  }, [dialogRef]);
  useEffect(() => {
    if (dialogLoaded && dialogRef.current) {
      dialogRef.current.showModal();
      setTimeout(() => {
        dialogRef.current!.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 300);
      syncAriaStates([
        ...dialogRef.current!.querySelectorAll("*"),
        dialogRef.current,
      ]);
    }
  }, [dialogRef, dialogLoaded]);
  return (
    <FormDlg dialogRef={dialogRef} onClose={onClose} userClass={userClass} />
  );
}
