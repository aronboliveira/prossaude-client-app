"use client";

import { ErrorBoundary } from "react-error-boundary";
import { useState, useRef, useEffect, ChangeEvent, useContext } from "react";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import { AppRootContext } from "@/pages/_app";
import { MainPanelProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import {
  elementNotFound,
  extLine,
  inputNotFound,
  stringError,
} from "@/lib/global/handlers/errorHandler";
import { DataProvider } from "@/lib/locals/panelPage/declarations/classesCons";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import ErrorMainDiv from "../../../error/ErrorMainDiv";
import { nullishDiv, voidVal } from "@/lib/global/declarations/types";
import { createRoot } from "react-dom/client";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import StudentForm from "../../studs/StudentForm";
import Unauthorized from "../Unauthorized";
import ProfForm from "../../profs/ProfForm";
import RemoveStudForm from "../../studs/RemoveStudForm";
import RemoveProfForm from "../../profs/RemoveProfForm";
import PacTabForm from "../../pacs/PacTabForm";
import ScheduleForm from "../../schedule/ScheduleForm";
import DefaultForm from "../DefaultForm";
import { Root } from "react-dom/client";

export let globalDataProvider: DataProvider | voidVal = undefined;
export const panelRoots: { mainRoot: Root | undefined } = {
  mainRoot: undefined,
};

export default function SelectPanel({
  userClass = "estudante",
  defOp = "agenda",
}: MainPanelProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string>(defOp);
  const [mounted, setMounted] = useState<boolean>(false);
  const formRootRef = useRef<nullishDiv>(null);
  const context = useContext(AppRootContext);
  const handleChange = (change: ChangeEvent): void => {
    change.target instanceof HTMLSelectElement ||
    change.target instanceof HTMLInputElement
      ? setSelectedOption(change.target.value)
      : inputNotFound(
          change.target,
          "change.target in handleChange()",
          extLine(new Error())
        );
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    globalDataProvider = new DataProvider(sessionStorage);
    handleLinkChanges("panel", "Panel Page Style");
    const selDiv = document.getElementById("formSelDiv");
    if (selDiv instanceof HTMLElement && !selDiv.querySelector("select")) {
      selDiv.innerHTML = ``;
      if (!context.roots.rootSel) context.roots.rootSel = createRoot(selDiv);
      context.roots.rootSel.render(<ErrorMainDiv />);
    } else
      setTimeout(() => {
        !document.getElementById("formSelDiv")?.querySelector("select") &&
          elementNotFound(
            selDiv,
            "selDiv during DOM initialization",
            extLine(new Error())
          );
      }, 2000);
  }, [mounted]);
  useEffect(() => {
    if (formRootRef instanceof HTMLElement) {
      syncAriaStates([
        ...(
          document.getElementById("formPanelDiv") ?? document
        )?.querySelectorAll("*"),
        document.getElementById("formPanelDiv")!,
      ]);
      if (!panelRoots.mainRoot)
        panelRoots.mainRoot = createRoot(document.getElementById("formRoot")!);
    }
  }, [mounted]);
  //Snippet para repassar para CSR totalmente (erro ainda não investigado)
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Selector for Working Panel" />
      )}
    >
      <div
        role="group"
        className="flexWR mg-3b pdL1v900Q pdR1v900Q pdL2v460Q pdR2v460Q noInvert"
      >
        <strong id="titlePanelSelect" title="Selecione aqui o painel em tela">
          Escolha o Painel de Trabalho
        </strong>
        <select
          className="form-select"
          id="coordPanelSelect"
          data-title="Opção de Painel Ativa"
          value={selectedOption}
          onChange={handleChange}
          autoFocus
          required
        >
          <optgroup id="grpRegst" label="Registro">
            {(userClass === "coordenador" || userClass === "supervisor") && (
              <option value="registStud">Cadastrar Aluno</option>
            )}
            {userClass === "coordenador" && (
              <option value="registProf">Cadastrar Membro Profissional</option>
            )}
            {(userClass === "coordenador" || userClass === "supervisor") && (
              <option value="removeStud">Lista de Alunos</option>
            )}
            {(userClass === "coordenador" || userClass === "supervisor") && (
              <option value="removeProf">Lista de Membros Profissionais</option>
            )}
            <option value="pacList">Lista de Pacientes</option>
          </optgroup>
          <optgroup id="grpDates" label="Datas">
            <option value="agenda">Agendamento</option>
          </optgroup>
        </select>
      </div>
      <hr />
      <div role="group" ref={formRootRef} id="formRoot">
        <ErrorBoundary
          FallbackComponent={() => (
            <GenericErrorComponent message="Error rendering Selected Form for Panel" />
          )}
        >
          {(() => {
            switch (selectedOption) {
              case "registStud":
                return userClass === "coordenador" ||
                  userClass === "supervisor" ? (
                  <StudentForm userClass={userClass} />
                ) : (
                  <Unauthorized />
                );
              case "registProf":
                return userClass === "coordenador" ? (
                  <ProfForm userClass={userClass} />
                ) : (
                  <Unauthorized />
                );
              case "removeStud":
                return userClass === "coordenador" ||
                  userClass === "supervisor" ? (
                  <RemoveStudForm userClass={userClass} />
                ) : (
                  <Unauthorized />
                );
              case "removeProf":
                return userClass === "coordenador" ||
                  userClass === "supervisor" ? (
                  <RemoveProfForm userClass={userClass} />
                ) : (
                  <Unauthorized />
                );
              case "pacList":
                return <PacTabForm userClass={userClass} />;
              case "agenda":
                return <ScheduleForm context={false} userClass={userClass} />;
              default:
                stringError(
                  selectedOption,
                  "selectedOption in renderSelectedForm()",
                  extLine(new Error())
                );
                return <DefaultForm userClass={userClass} />;
            }
          })()}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
