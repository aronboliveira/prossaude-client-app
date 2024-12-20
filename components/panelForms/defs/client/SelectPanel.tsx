"use client";
import { RootCtx } from "@/pages/_app";
import { RootCtxType } from "@/lib/global/declarations/interfaces";
import { DataProvider } from "@/lib/global/declarations/classesCons";
import { ErrorBoundary } from "react-error-boundary";
import { MainPanelProps } from "@/lib/global/declarations/interfacesCons";
import { providers } from "@/vars";
import { camelToKebab, kebabToCamel } from "@/lib/global/gModel";
import { createRoot } from "react-dom/client";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { nlDiv, panelOpts } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useState, useRef, useEffect, useContext } from "react";
import DefaultForm from "../DefaultForm";
import ErrorMainDiv from "../../../error/ErrorMainDiv";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import PacTabForm from "../../pacs/PacTabForm";
import ProfForm from "../../profs/ProfForm";
import TableProfForm from "../../profs/TabProfForm";
import StudentForm from "../../studs/StudentForm";
import Unauthorized from "../Unauthorized";
import { defUser } from "@/redux/slices/userSlice";
import ScheduleLoader from "../../schedule/ScheduleLoader";
import { PanelCtx } from "./SelectLoader";
import { panelRoots } from "@/vars";
import useMount from "@/lib/hooks/useMount";
import DashBoard from "../../Dashboard";
import TabStudWrapper from "../../studs/TabStudWrapper";
export default function SelectPanel({ defOp = "agenda" }: MainPanelProps): JSX.Element {
  const { userClass, setUserClass: setPrivilege } = useContext(PanelCtx),
    [selectedOption, setSelectedOption] = useState<string>(defOp),
    [mounted] = useMount(),
    formRootRef = useRef<nlDiv>(null),
    context = useContext<RootCtxType>(RootCtx),
    renderSelectPanel = (opt: panelOpts): void => {
      try {
        const formRoot = document.getElementById("formRoot");
        if (!(formRoot instanceof HTMLElement)) return;
        if (!context.roots.formRoot) context.roots.formRoot = createRoot(formRoot);
        context.roots.formRoot.render(
          ((opt: panelOpts): JSX.Element => {
            switch (opt) {
              case "registStud":
                return userClass === "coordenador" || userClass === "supervisor" ? <StudentForm /> : <Unauthorized />;
              case "registProf":
                return userClass === "coordenador" ? <ProfForm /> : <Unauthorized />;
              case "removeStud":
                return userClass === "coordenador" || userClass === "supervisor" ? (
                  <TabStudWrapper />
                ) : (
                  <Unauthorized />
                );
              case "removeProf":
                return userClass === "coordenador" || userClass === "supervisor" ? <TableProfForm /> : <Unauthorized />;
              case "pacList":
                return <PacTabForm />;
              case "agenda":
                return <ScheduleLoader />;
              case "dashboard":
                return <DashBoard />;
              default:
                return <DefaultForm />;
            }
          })(opt),
        );
      } catch (e) {
        return;
      }
    },
    handlePanelPath = (change: React.ChangeEvent<HTMLSelectElement> | string): void => {
      const changeValue = typeof change === "object" && "target" in change ? change.target.value : change;
      history.pushState(
        {},
        "",
        `${location.origin}${
          location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname
        }?panel=${camelToKebab(changeValue)}`
          .replace("/?", "?")
          .replace("/#", "#"),
      );
      setTimeout(() => history.pushState({}, "", `${location.href}`.replace("/?", "?").replace("/#", "#")), 300);
    };
  useEffect(() => {
    const privilege = localStorage.getItem("activeUser")
      ? JSON.parse(localStorage.getItem("activeUser")!).loadedData?.privilege
      : defUser.loadedData.privilege;
    let translatedPrivilege = "estudante";
    if (privilege === "coordinator") translatedPrivilege = "coordenador";
    else translatedPrivilege = privilege;
    setPrivilege(translatedPrivilege);
  }, [setPrivilege]);
  useEffect(() => {
    providers.globalDataProvider = new DataProvider(sessionStorage);
    handleLinkChanges("panel", "Panel Page Style");
    handlePanelPath(new URLSearchParams(location.search).get("panel") || defOp);
  }, [userClass, defOp]);
  useEffect(() => {
    setTimeout(() => {
      try {
        const formRoot = document.getElementById("formRoot"),
          panelSelect = document.getElementById("coordPanelSelect");
        if (!(formRoot instanceof HTMLElement)) return;
        if (!(panelSelect instanceof HTMLSelectElement || panelSelect instanceof HTMLInputElement)) return;
        if (!context.roots.formRoot) context.roots.formRoot = createRoot(formRoot);
        const camel = kebabToCamel(location.search);
        formRoot.style.transition = "";
        formRoot.style.opacity = "0";
        setTimeout(() => {
          const formRoot = document.getElementById("formRoot");
          if (formRoot instanceof HTMLElement) {
            formRoot.style.transition = "opacity 0.3s ease-in-out";
            formRoot.style.opacity = "1";
          }
        }, 300);
        if (/registStud/gi.test(camel)) {
          context.roots.formRoot.render(
            userClass === "coordenador" || userClass === "supervisor" ? <StudentForm /> : <Unauthorized />,
          );
          panelSelect.value = "registStud";
        } else if (/registProf/gi.test(camel)) {
          context.roots.formRoot.render(userClass === "coordenador" ? <ProfForm /> : <Unauthorized />);
          panelSelect.value = "registProf";
        } else if (/removeProf/gi.test(camel)) {
          panelSelect.value = "removeProf";
          context.roots.formRoot.render(
            userClass === "coordenador" || userClass === "supervisor" ? <TableProfForm /> : <Unauthorized />,
          );
        } else if (/removeStud/gi.test(camel)) {
          context.roots.formRoot.render(
            userClass === "coordenador" || userClass === "supervisor" ? <TabStudWrapper /> : <Unauthorized />,
          );
          panelSelect.value = "removeStud";
        } else if (/agenda/gi.test(camel)) {
          context.roots.formRoot.render(<ScheduleLoader />);
          panelSelect.value = "agenda";
        } else if (/pacList/gi.test(camel)) {
          context.roots.formRoot.render(<PacTabForm />);
          panelSelect.value = "pacList";
        } else history.pushState({}, "", `${location.origin}${location.pathname}?panel=${defOp}`);
      } catch (e) {
        return;
      }
    }, 500);
  }, [userClass, context.roots, defOp]);
  //validating DOM structure using Main Select and parent for reference
  useEffect(() => {
    setTimeout(() => {
      const selDiv = document.getElementById("formSelDiv");
      if (mounted && selDiv instanceof HTMLElement && !document.querySelector("select")) {
        selDiv.innerHTML = ``;
        if (!context.roots.rootSel) context.roots.rootSel = createRoot(selDiv);
        context.roots.rootSel.render(<ErrorMainDiv />);
      } else
        setTimeout(() => {
          const selDiv = document.getElementById("formSelDiv");
          if (!document.getElementById("formSelDiv")?.querySelector("select")) {
            if (selDiv instanceof HTMLElement) {
              selDiv.innerHTML = ``;
              if (!context.roots.rootSel) context.roots.rootSel = createRoot(selDiv);
              context.roots.rootSel.render(<ErrorMainDiv />);
            }
          }
        }, 2000);
    }, 3000);
  }, [mounted, context.roots, setPrivilege]);
  useEffect(() => {
    if (formRootRef.current instanceof HTMLElement) {
      syncAriaStates([
        ...((document.getElementById("formPanelDiv") ?? document)?.querySelectorAll("*") ?? null),
        document.getElementById("formPanelDiv")!,
      ]);
      if (!panelRoots.mainRoot) panelRoots.mainRoot = createRoot(formRootRef.current);
    }
  }, [mounted]);
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Error loading Selector for Working Panel' />}>
      <div role='group' className='flexWR mg__3b pdL1v900Q pdR1v900Q pdL2v460Q pdR2v460Q noInvert'>
        <strong id='titlePanelSelect' title='Selecione aqui o painel em tela'>
          Escolha o Painel de Trabalho
        </strong>
        <select
          className='form-select'
          id='coordPanelSelect'
          name='actv_panel'
          data-title='Opção de Painel Ativa'
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
          required>
          <optgroup id='grpRegst' label='Registro'>
            {(userClass === "coordenador" || userClass === "supervisor") && (
              <option value='registStud'>Cadastrar Aluno</option>
            )}
            {userClass === "coordenador" && <option value='registProf'>Cadastrar Membro Profissional</option>}
            {(userClass === "coordenador" || userClass === "supervisor") && (
              <option value='removeStud'>Lista de Alunos</option>
            )}
            {(userClass === "coordenador" || userClass === "supervisor") && (
              <option value='removeProf'>Lista de Membros Profissionais</option>
            )}
            <option value='pacList'>Lista de Pacientes</option>
          </optgroup>
          <optgroup id='grpDates' label='Datas'>
            <option value='agenda'>Agendamento</option>
            <option value='dashboard'>Estatística</option>
          </optgroup>
        </select>
      </div>
      <hr />
      <div role='group' ref={formRootRef} id='formRoot'>
        <ErrorBoundary
          FallbackComponent={() => (
            <GenericErrorComponent message='Error rendering Selected Form for Panel' />
          )}></ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
