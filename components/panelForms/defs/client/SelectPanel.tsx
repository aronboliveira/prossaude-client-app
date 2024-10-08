"use client";
import { AppRootContext } from "@/pages/_app";
import { AppRootContextType } from "@/lib/global/declarations/interfaces";
import { DataProvider } from "@/lib/global/declarations/classesCons";
import { ErrorBoundary } from "react-error-boundary";
import { MainPanelProps } from "@/lib/global/declarations/interfacesCons";
import { providers } from "@/vars";
import { camelToKebab, kebabToCamel } from "@/lib/global/gModel";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { nullishDiv, panelOpts } from "@/lib/global/declarations/types";
import { registerRoot, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useState, useRef, useEffect, useContext } from "react";
import DefaultForm from "../DefaultForm";
import ErrorMainDiv from "../../../error/ErrorMainDiv";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import PacTabForm from "../../pacs/PacTabForm";
import ProfForm from "../../profs/ProfForm";
import TableProfForm from "../../profs/TabProfForm";
import TabStudForm from "../../studs/TabStudForm";
import StudentForm from "../../studs/StudentForm";
import Unauthorized from "../Unauthorized";
import { elementNotFound, extLine, inputNotFound, stringError } from "@/lib/global/handlers/errorHandler";
import { defUser } from "@/redux/slices/userSlice";
import ScheduleLoader from "../../schedule/ScheduleLoader";
import { PanelCtx } from "./SelectLoader";
import { panelRoots } from "@/vars";
export default function SelectPanel({ defOp = "agenda" }: MainPanelProps): JSX.Element {
  const { userClass, setUserClass: setPrivilege } = useContext(PanelCtx),
    [selectedOption, setSelectedOption] = useState<string>(defOp),
    [mounted, setMounted] = useState<boolean>(false),
    formRootRef = useRef<nullishDiv>(null),
    context = useContext<AppRootContextType>(AppRootContext),
    renderSelectPanel = (opt: panelOpts): void => {
      try {
        const formRoot = document.getElementById("formRoot");
        if (!(formRoot instanceof HTMLElement))
          throw elementNotFound(formRoot, `Validation of Form Roots Element in Schedule`, extLine(new Error()));
        context.roots.formRoot = registerRoot(context.roots.formRoot, `#formRoot`);
        if (!context.roots.formRoot) throw new Error(`Failed to validate Form root`);
        context.roots.formRoot.render(
          ((opt: panelOpts): JSX.Element => {
            switch (opt) {
              case "registStud":
                return userClass === "coordenador" || userClass === "supervisor" ? <StudentForm /> : <Unauthorized />;
              case "registProf":
                return userClass === "coordenador" ? <ProfForm /> : <Unauthorized />;
              case "removeStud":
                return userClass === "coordenador" || userClass === "supervisor" ? <TabStudForm /> : <Unauthorized />;
              case "removeProf":
                return userClass === "coordenador" || userClass === "supervisor" ? <TableProfForm /> : <Unauthorized />;
              case "pacList":
                return <PacTabForm />;
              case "agenda":
                return <ScheduleLoader />;
              default:
                stringError(opt, "opt in renderSelectedForm()", extLine(new Error()));
                return <DefaultForm />;
            }
          })(opt),
        );
      } catch (e) {
        console.error(`Error executing procedure for rendering on formRoot:\n${(e as Error).message}`);
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
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replace("/?", "?").replace("/#", "#"));
      }, 300);
    };
  useEffect(() => {
    const privilege = localStorage.getItem("activeUser")
      ? JSON.parse(localStorage.getItem("activeUser")!).loadedData?.privilege
      : defUser.loadedData.privilege;
    let translatedPrivilege = "estudante";
    if (privilege === "coordinator") translatedPrivilege = "coordenador";
    else translatedPrivilege = privilege;
    setPrivilege(translatedPrivilege);
    setMounted(true);
  }, [setPrivilege]);
  useEffect(() => {
    providers.globalDataProvider = new DataProvider(sessionStorage);
    handleLinkChanges("panel", "Panel Page Style");
    handlePanelPath(defOp);
  }, [userClass, defOp]);
  useEffect(() => {
    setTimeout(() => {
      try {
        const formRoot = document.getElementById("formRoot"),
          panelSelect = document.getElementById("coordPanelSelect");
        if (!(formRoot instanceof HTMLElement))
          throw elementNotFound(formRoot, `Validation of Option Selection Element`, extLine(new Error()));
        if (!(panelSelect instanceof HTMLSelectElement || panelSelect instanceof HTMLInputElement))
          throw inputNotFound(panelSelect, `Validation of Select for panel instance`, extLine(new Error()));
        context.roots.formRoot = registerRoot(context.roots.formRoot, `#formRoot`);
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
        if (!context.roots.formRoot) throw new Error(`Failed to validate Form root`);
        if (/registStud/gi.test(camel)) {
          context.roots.formRoot?.render(
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
            userClass === "coordenador" || userClass === "supervisor" ? <TabStudForm /> : <Unauthorized />,
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
        console.error(
          `Error executing procedure for adjusting selected panel option based on route:\n${(e as Error).message}`,
        );
      }
    }, 500);
  }, [userClass, context.roots, defOp]);
  //validating DOM structure using Main Select and parent for reference
  useEffect(() => {
    setTimeout(() => {
      const selDiv = document.getElementById("formSelDiv");
      if (mounted && selDiv instanceof HTMLElement && !document.querySelector("select")) {
        selDiv.innerHTML = ``;
        context.roots.rootSel = registerRoot(context.roots.rootSel, `#formSelDiv`);
        if (!context.roots.rootSel) throw new Error(`Failed to validate Select root`);
        context.roots.rootSel.render(<ErrorMainDiv />);
      } else
        setTimeout(() => {
          const selDiv = document.getElementById("formSelDiv");
          if (!document.getElementById("formSelDiv")?.querySelector("select")) {
            elementNotFound(selDiv, "selDiv during DOM initialization", extLine(new Error()));
            if (selDiv instanceof HTMLElement) {
              selDiv.innerHTML = ``;
              context.roots.rootSel = registerRoot(context.roots.rootSel, `#formSelDiv`);
              if (!context.roots.rootSel) throw new Error(`Failed to validate Select root`);
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
      panelRoots.mainRoot = registerRoot(panelRoots.mainRoot, `#${formRootRef.current.id}`, formRootRef);
    }
  }, [mounted]);
  //Snippet para repassar para CSR totalmente (erro ainda não investigado)
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Error loading Selector for Working Panel' />}>
      <div role='group' className='flexWR mg-3b pdL1v900Q pdR1v900Q pdL2v460Q pdR2v460Q noInvert'>
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
