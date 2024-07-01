import { BtnAddPacPros } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useState } from "react";
import RegstPacDlg from "./RegstPacDlg";
import AutoDlg from "./AutoDlg";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";

export default function BtnAddPac({
  context = false,
  userClass = "estudante",
}: BtnAddPacPros): JSX.Element {
  const [pressState, setTogglePress] = useState<boolean>(false);
  const [formElement, setFormElement] = useState<JSX.Element | null>(null);
  const toggleForm = (): void => {
    setTogglePress(() => !pressState);
  };
  const renderToggledForm = (pressState: boolean = false): JSX.Element => {
    return pressState ? (
      <RegstPacDlg onClose={toggleForm} userClass={userClass} />
    ) : (
      <></>
    );
  };
  const renderToggledFormAsync = async (
    toggleForm: () => void
  ): Promise<JSX.Element> => {
    await new Promise(resolve => setTimeout(resolve, 5));
    return <AutoDlg onClose={toggleForm} userClass={userClass} />;
  };
  useEffect(() => {
    const loadForm = async () => {
      const form = await renderToggledFormAsync(toggleForm);
      setFormElement(form);
    };
    loadForm();
    syncAriaStates([document.getElementById("addAppointBtn")!]);
  }, [pressState, toggleForm]);
  return context === true ? (
    <>
      <button
        type="button"
        className="btn btn-success widFull900Q widQ460MinFull htMaxBSControl bolded"
        id="addAppointBtn"
        onClick={toggleForm}
        title="Preencha um formulário para gerar a ficha de uma nova consulta"
      >
        Adicionar Consulta
      </button>
      {formElement}
    </>
  ) : (
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
      {renderToggledForm(pressState)}
    </>
  );
}
