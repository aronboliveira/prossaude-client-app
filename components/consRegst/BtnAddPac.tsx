import { BtnAddPacPros } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useState } from "react";
import FormDlg from "./FormDlg";


export default function BtnAddPac({
  userClass = "estudante",
}: BtnAddPacPros): JSX.Element {
  const [pressState, setTogglePress] = useState<boolean>(false);
  const toggleForm = (): void => setTogglePress(() => !pressState);
  useEffect(() => {
    const aptBtn = document.getElementById("addAppointBtn");
    aptBtn instanceof HTMLElement
      ? syncAriaStates([aptBtn])
      : setTimeout(() => {
          const aptBtn = document.getElementById("addAppointBtn");
          aptBtn instanceof HTMLElement && syncAriaStates([aptBtn]);
        }, 2000);
  }, [pressState, toggleForm]);
  return (
    <>
      <button
        type="button"
        className="btn btn-success widFull900Q widQ460MinFull htMaxBSControl forceInvert bolded"
        id="addAppointBtn"
        onClick={toggleForm}
        title="Preencha um formulário para gerar a ficha de uma nova consulta"
      >
        Adicionar Consulta
      </button>
      {pressState ? (
        <FormDlg onClose={toggleForm} userClass={userClass} />
      ) : (
        <></>
      )}
    </>
  );
}
