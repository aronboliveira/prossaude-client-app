import {
  extLine,
  inputNotFound,
  stringError,
} from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { mainPanelVariables, resetErrorBoundary } from "./mainPanelVariables";
import { MainPanelProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import StudentForm from "../panelForms/studs/StudentForm";
import Unauthorized from "../panelForms/defs/Unauthorized";
import ProfForm from "../panelForms/profs/ProfForm";
import RemoveStudForm from "../panelForms/studs/RemoveStudForm";
import RemoveProfForm from "../panelForms/profs/RemoveProfForm";
import PacTabForm from "../panelForms/pacs/PacTabForm";
import ScheduleForm from "../panelForms/schedule/ScheduleForm";
import DefaultForm from "../panelForms/defs/DefaultForm";
import ErrorFallbackMainPanel from "../error/ErrorFallbackMainPanel";
import FallbackedMainPanel from "./FallbackedMainPanel";

export default function MainFormPanel({
  mainRoot,
  userClass = "estudante",
  defOp = "agenda",
}: MainPanelProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState(defOp);
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
  const formRootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (formRootRef instanceof HTMLElement) {
      mainRoot = createRoot(formRootRef.current!);
      syncAriaStates([
        ...document.getElementById("formPanelDiv")!.querySelectorAll("*"),
        document.getElementById("formPanelDiv")!,
      ]);
    }
  }, []);
  const renderError = new Error(`Erro carregando Painel de Trabalho!`);
  const renderSelectedForm = (selectedOption: string): JSX.Element => {
    switch (selectedOption) {
      case "registStud":
        return userClass === "coordenador" || userClass === "supervisor" ? (
          <StudentForm mainRoot={mainRoot} userClass={userClass} />
        ) : (
          <Unauthorized />
        );
      case "registProf":
        return userClass === "coordenador" ? (
          <ProfForm mainRoot={mainRoot} userClass={userClass} />
        ) : (
          <Unauthorized />
        );
      case "removeStud":
        return userClass === "coordenador" || userClass === "supervisor" ? (
          <RemoveStudForm mainRoot={mainRoot} userClass={userClass} />
        ) : (
          <Unauthorized />
        );
      case "removeProf":
        return userClass === "coordenador" || userClass === "supervisor" ? (
          <RemoveProfForm mainRoot={mainRoot} userClass={userClass} />
        ) : (
          <Unauthorized />
        );
      case "pacList":
        return <PacTabForm mainRoot={mainRoot} userClass={userClass} />;
      case "agenda":
        return (
          <ScheduleForm
            context={false}
            mainRoot={mainRoot}
            userClass={userClass}
          />
        );
      default:
        stringError(
          selectedOption,
          "selectedOption in renderSelectedForm()",
          extLine(new Error())
        );
        return <DefaultForm mainRoot={mainRoot} userClass={userClass} />;
    }
  };
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorFallbackMainPanel
          mainRoot={mainRoot}
          userClass={userClass}
          tryAcc={mainPanelVariables.tryAcc}
          renderError={new Error(`Erro carregando Painel de Trabalho!`)}
          resetErrorBoundary={() =>
            resetErrorBoundary(
              () => (
                <FallbackedMainPanel
                  {...{
                    mainRoot,
                    userClass,
                    renderError,
                    resetErrorBoundary,
                    defOp,
                  }}
                />
              ),
              {
                ...{
                  mainRoot,
                  userClass,
                  renderError,
                  resetErrorBoundary,
                  defOp,
                },
              }
            )
          }
          defOp={defOp}
        />
      )}
    >
      <div role="group" id="formPanelDiv">
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
                <option value="registProf">
                  Cadastrar Membro Profissional
                </option>
              )}
              {(userClass === "coordenador" || userClass === "supervisor") && (
                <option value="removeStud">Lista de Alunos</option>
              )}
              {(userClass === "coordenador" || userClass === "supervisor") && (
                <option value="removeProf">
                  Lista de Membros Profissionais
                </option>
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
              <ErrorFallbackMainPanel
                mainRoot={mainRoot}
                userClass={userClass}
                tryAcc={mainPanelVariables.tryAcc}
                renderError={new Error(`Erro carregando o painel de trabalho!`)}
                resetErrorBoundary={() => resetErrorBoundary}
                defOp={defOp}
              />
            )}
          >
            {renderSelectedForm(selectedOption)}
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}
