"use client";
import { AppRootContext } from "@/pages/_app";
import { AppRootContextType } from "@/lib/global/declarations/interfaces";
import { DataProvider } from "@/lib/locals/panelPage/declarations/classesCons";
import { ErrorBoundary } from "react-error-boundary";
import { MainPanelProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { Root } from "react-dom/client";
import { camelToKebab, kebabToCamel } from "@/lib/global/gModel";
import { createRoot } from "react-dom/client";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import {
  nullishDiv,
  panelOpts,
  voidVal,
} from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useState, useRef, useEffect, useContext } from "react";
import DefaultForm from "../DefaultForm";
import ErrorMainDiv from "../../../error/ErrorMainDiv";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import PacTabForm from "../../pacs/PacTabForm";
import ProfForm from "../../profs/ProfForm";
import RemoveProfForm from "../../profs/RemoveProfForm";
import RemoveStudForm from "../../studs/RemoveStudForm";
import ScheduleForm from "../../schedule/ScheduleForm";
import StudentForm from "../../studs/StudentForm";
import Unauthorized from "../Unauthorized";
import {
  elementNotFound,
  extLine,
  inputNotFound,
  stringError,
} from "@/lib/global/handlers/errorHandler";
import { defUser } from "@/redux/slices/userSlice";
export let globalDataProvider: DataProvider | voidVal = undefined;
export const panelRoots: { [k: string]: Root | undefined } = {
  mainRoot: undefined,
};
export default function SelectPanel({
  defOp = "agenda",
}: MainPanelProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string>(defOp);
  const [userClass, setClass] = useState<string>("coordenador");
  const [mounted, setMounted] = useState<boolean>(false);
  const formRootRef = useRef<nullishDiv>(null);
  const context = useContext<AppRootContextType>(AppRootContext);
  const renderSelectPanel = (opt: panelOpts) => {
    try {
      const formRoot = document.getElementById("formRoot");
      if (!(formRoot instanceof HTMLElement))
        throw elementNotFound(
          formRoot,
          `Validation of Form Roots Element in Schedule`,
          extLine(new Error())
        );
      if (!context.roots.formRoot)
        context.roots.formRoot = createRoot(formRoot);
      context.roots.formRoot.render(
        ((opt: panelOpts) => {
          console.log(`Rendering for ${opt}...`);
          switch (opt) {
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
                opt,
                "opt in renderSelectedForm()",
                extLine(new Error())
              );
              return <DefaultForm userClass={userClass} />;
          }
        })(opt)
      );
    } catch (e) {
      console.error(
        `Error executing procedure fro rendering on formRoot:\n${
          (e as Error).message
        }`
      );
    }
  };
  const handlePanelPath = (
    change: React.ChangeEvent<HTMLSelectElement> | string
  ): void => {
    const changeValue =
      typeof change === "object" && "target" in change
        ? change.target.value
        : change;
    history.pushState(
      {},
      "",
      `${location.origin}${
        location.pathname.endsWith("/")
          ? location.pathname.slice(0, -1)
          : location.pathname
      }?panel=${camelToKebab(changeValue)}`
        .replace("/?", "?")
        .replace("/#", "#")
    );
    setTimeout(() => {
      history.pushState(
        {},
        "",
        `${location.href}`.replace("/?", "?").replace("/#", "#")
      );
    }, 300);
  };
  console.log("USER CLASS LOADED");
  console.log(userClass);
  useEffect(() => {
    const privilege = localStorage.getItem("activeUser")
      ? JSON.parse(localStorage.getItem("activeUser")!).loadedData?.privilege
      : defUser.loadedData.privilege;
    let translatedPrivilege = "estudante";
    if (privilege === "coordinator") translatedPrivilege = "coordenador";
    else translatedPrivilege = privilege;
    setClass(translatedPrivilege);
    setMounted(true);
  }, []);
  useEffect(() => {
    globalDataProvider = new DataProvider(sessionStorage);
    handleLinkChanges("panel", "Panel Page Style");
    handlePanelPath(defOp);
  }, [userClass]);
  useEffect(() => {
    setTimeout(() => {
      try {
        const formRoot = document.getElementById("formRoot");
        const panelSelect = document.getElementById("coordPanelSelect");
        if (!(formRoot instanceof HTMLElement))
          throw elementNotFound(
            formRoot,
            `Validation of Option Selection Element`,
            extLine(new Error())
          );
        if (
          !(
            panelSelect instanceof HTMLSelectElement ||
            panelSelect instanceof HTMLInputElement
          )
        )
          throw inputNotFound(
            panelSelect,
            `Validation of Select for panel instance`,
            extLine(new Error())
          );
        if (!context.roots.formRoot)
          context.roots.formRoot = createRoot(formRoot);
        const kebabSearch = kebabToCamel(location.search);
        formRoot.style.transition = "";
        formRoot.style.opacity = "0";
        setTimeout(() => {
          const formRoot = document.getElementById("formRoot");
          if (formRoot instanceof HTMLElement) {
            formRoot.style.transition = "opacity 0.3s ease-in-out";
            formRoot.style.opacity = "1";
          }
        }, 300);
        if (/registStud/gi.test(kebabSearch)) {
          context.roots.formRoot.render(
            userClass === "coordenador" || userClass === "supervisor" ? (
              <StudentForm userClass={userClass} />
            ) : (
              <Unauthorized />
            )
          );
          panelSelect.value = "registStud";
        } else if (/registProf/gi.test(kebabSearch)) {
          context.roots.formRoot.render(
            userClass === "coordenador" ? (
              <ProfForm userClass={userClass} />
            ) : (
              <Unauthorized />
            )
          );
          panelSelect.value = "registProf";
        } else if (/removeProf/gi.test(kebabSearch)) {
          context.roots.formRoot.render(
            userClass === "coordenador" || userClass === "supervisor" ? (
              <RemoveProfForm userClass={userClass} />
            ) : (
              <Unauthorized />
            )
          );
          panelSelect.value = "removeProf";
        } else if (/removeStud/gi.test(kebabSearch)) {
          context.roots.formRoot.render(
            userClass === "coordenador" || userClass === "supervisor" ? (
              <RemoveStudForm userClass={userClass} />
            ) : (
              <Unauthorized />
            )
          );
          panelSelect.value = "removeStud";
        } else if (/agenda/gi.test(kebabSearch)) {
          context.roots.formRoot.render(
            <ScheduleForm context={false} userClass={userClass} />
          );
          panelSelect.value = "agenda";
        } else if (/pacList/gi.test(kebabSearch)) {
          context.roots.formRoot.render(<PacTabForm userClass={userClass} />);
          panelSelect.value = "pacList";
        } else {
          history.pushState(
            {},
            "",
            `${location.origin}${location.pathname}?panel=${defOp}`
          );
        }
      } catch (e) {
        console.error(
          `Error executing procedure for adjusting selected panel option based on route:\n${
            (e as Error).message
          }`
        );
      }
    }, 500);
  }, [userClass]);
  //validating DOM structure using Main Select and parent for reference
  useEffect(() => {
    setTimeout(() => {
      const selDiv = document.getElementById("formSelDiv");
      if (
        mounted &&
        selDiv instanceof HTMLElement &&
        !document.querySelector("select")
      ) {
        selDiv.innerHTML = ``;
        if (!context.roots.rootSel) context.roots.rootSel = createRoot(selDiv);
        context.roots.rootSel.render(<ErrorMainDiv />);
      } else
        setTimeout(() => {
          const selDiv = document.getElementById("formSelDiv");
          if (!document.getElementById("formSelDiv")?.querySelector("select")) {
            elementNotFound(
              selDiv,
              "selDiv during DOM initialization",
              extLine(new Error())
            );
            if (selDiv instanceof HTMLElement) {
              selDiv.innerHTML = ``;
              if (!context.roots.rootSel)
                context.roots.rootSel = createRoot(selDiv);
              context.roots.rootSel.render(<ErrorMainDiv />);
            }
          }
        }, 2000);
    }, 3000);
  }, [mounted]);
  useEffect(() => {
    if (formRootRef.current instanceof HTMLElement) {
      syncAriaStates([
        ...(
          document.getElementById("formPanelDiv") ?? document
        )?.querySelectorAll("*"),
        document.getElementById("formPanelDiv")!,
      ]);
      if (!panelRoots.mainRoot)
        panelRoots.mainRoot = createRoot(formRootRef.current);
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
          name="actv_panel"
          data-title="Opção de Painel Ativa"
          value={selectedOption}
          onChange={change => {
            setSelectedOption(change.target.value);
            handlePanelPath(change.target.value);
            renderSelectPanel(change.target.value as panelOpts);
            const formRoot = document.getElementById("formRoot");
            if (formRoot instanceof HTMLElement) {
              formRoot.style.transition = "";
              formRoot.style.opacity = "0";
            }
            setTimeout(() => {
              const formRoot = document.getElementById("formRoot");
              if (formRoot instanceof HTMLElement) {
                formRoot.style.transition = "opacity 0.3s ease-in-out";
                formRoot.style.opacity = "1";
              }
            }, 300);
          }}
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
        ></ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
