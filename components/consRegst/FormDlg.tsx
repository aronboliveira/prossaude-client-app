"use client";
import { ConsDlgProps } from "@/lib/global/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { addListenerAvMembers } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { consVariablesData } from "./consVariables";
import { createRoot } from "react-dom/client";
import { providers, formData } from "@/vars";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { handleSubmit } from "@/lib/global/data-service";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { providerFormData } from "./consVariables";
import AvPacListDlg from "../lists/AvPacListDlg";
import AvProfListDlg from "../lists/AvProfListDlg";
import DREFiller from "./DREFiller";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import { useEffect, useRef, useCallback, useState, MutableRefObject, useContext } from "react";
import {
  checkRegstBtn,
  createAptBtn,
  generateSchedPacData,
  handleDragAptBtn,
} from "@/lib/locals/panelPage/handlers/consHandlerCmn";
import {
  elementNotFound,
  elementNotPopulated,
  extLine,
  inputNotFound,
  multipleElementsNotFound,
} from "@/lib/global/handlers/errorHandler";
import { nlBtn, nlDiv, nlDlg, nlFm, nlInp } from "@/lib/global/declarations/types";
import {
  addEmailExtension,
  assignFormAttrs,
  autoCapitalizeInputs,
  formatCPF,
  formatTel,
} from "@/lib/global/gModel";
import { enableCPFBtn, handleCondtReq, validateForm, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import ListFirstNameCons from "./ListFirstNameCons";
import ListCPFPacCons from "./ListCPFPacCons";
import OptGrpUsers from "./OptGrpUsers";
import ListTelPacCons from "./ListTelPacCons";
import ListEmailPacCons from "./ListEmailPacCons";
import FailRegstAlert from "../alerts/FailRegsAlert";
import { PanelCtx } from "../panelForms/defs/client/SelectLoader";
import { ExportHandler } from "@/lib/global/declarations/classes";
import { exporters } from "@/vars";
import useExportHandler from "@/lib/hooks/useExportHandler";
let accFormData = 0;
export default function FormDlg({ onClose }: ConsDlgProps): JSX.Element {
  //display de campos para identificadores de estudante
  const userClass = useContext(PanelCtx).userClass,
    dlgRef = useRef<nlDlg>(null),
    pacBtnRef = useRef<nlBtn>(null);
  //autocompleção
  const CPFPacInpRef = useRef<nlInp>(null),
    CPFPacBtnRef = useRef<nlBtn>(null),
    switchACConsRef = useRef<nlInp>(null),
    switchAFConsRef = useRef<nlInp>(null),
    telPacInpRef = useRef<nlInp>(null),
    CPFProfBtnRef = useRef<nlBtn>(null),
    hourRef = useRef<nlInp>(null),
    dayRef = useRef<nlDiv>(null),
    exportRef = useRef<nlBtn>(null),
    submitRef = useRef<nlBtn>(null),
    formRef = useRef<nlFm>(null),
    [isDREFillerActive, setDREFiller] = useState<boolean>(false),
    toggleDREFiller = (): void => setDREFiller(!isDREFillerActive);
  //display de tabela para pacientes
  const [shouldDisplayPacList, setPacFiller] = useState<boolean>(false),
    togglePacFiller = (s: boolean = false): void => setPacFiller(!s);
  //autocorreções de input
  const [isAutocorrectConsOn, setAutocorrectCons] = useState<boolean>(true),
    toggleACCons = (s: boolean = false): void => setAutocorrectCons(!s),
    [isAutofillConsOn, setAutofillCons] = useState<boolean>(true),
    toggleAFCons = (s: boolean = false): void => setAutofillCons(!s);
  //fechamento de modal com clique fora da área do mesmo
  const callbackCPFPacBtnClick = useCallback((retrvDataPh: { [key: string]: object }) => {
    const matchDataPh = ((): Map<any, any> => {
      const matchDataPh = new Map();
      Object.entries(retrvDataPh).forEach(([key, value]) => {
        matchDataPh.set(key, value);
      });
      return matchDataPh;
    })();
    if (dlgRef?.current instanceof Element) {
      const cpfInp = dlgRef.current.querySelector("input[id*=cpf]") || dlgRef.current.querySelector("input[id*=CPF]"),
        currentInps = Array.from([
          ...dlgRef.current.querySelectorAll("input"),
          ...dlgRef.current.querySelectorAll("select"),
          ...dlgRef.current.querySelectorAll("textarea"),
        ]).filter(inp => !/cpf/gi.test(inp.id));
      if (
        cpfInp instanceof HTMLInputElement &&
        currentInps.length > 0 &&
        currentInps.every(
          inp =>
            inp instanceof HTMLInputElement || inp instanceof HTMLTextAreaElement || inp instanceof HTMLSelectElement,
        )
      ) {
        const keyFirstLvlMatch = matchDataPh.get(cpfInp.value.replaceAll(/[^\d]/g, ""));
        for (const inp of currentInps) {
          let inpTitle = inp.dataset.title;
          if (inpTitle) {
            if (inpTitle.match(/[\s-_]/g)) {
              inpTitle.match(/[\s-_]/g)?.forEach((_: any, i: number) => {
                const index = /[\s-_]/g.exec(inpTitle!)!.index;
                if (i === 0) {
                  inpTitle =
                    inpTitle!.slice(0, index).toLowerCase() +
                    inpTitle!.charAt(index + 1).toUpperCase() +
                    inpTitle!.slice(index + 2).toLowerCase();
                } else
                  inpTitle =
                    inpTitle!.slice(0, index) +
                    inpTitle!.charAt(index + 1).toUpperCase() +
                    inpTitle!.slice(index + 2).toLowerCase();
              });
            } else inpTitle = inpTitle.toLowerCase();
            inpTitle = inpTitle
              .replaceAll(" ", "")
              .replaceAll("-", "")
              .replaceAll("_", "")
              .replaceAll(/D[aeo](?=[A-Z])/g, "")
              .replaceAll(/[Pp]aciente/g, "");
            keyFirstLvlMatch[inpTitle] && (inp.value = keyFirstLvlMatch[inpTitle].toString());
          }
        }
      } else multipleElementsNotFound(extLine(new Error()), `inputs in the dialog id ${dlgRef.current.id}`, cpfInp);
    }
    return matchDataPh;
  }, []);
  //ativação de preenchimento de paciente com CPF
  const handleCPFBtnClick = useCallback(() => {
    CPFPacBtnRef?.current instanceof HTMLButtonElement && CPFPacBtnRef.current.id.match(/cpf/gi)
      ? callbackCPFPacBtnClick({
          12345678910: { primeiroNome: "José", sobrenome: "Pereira" },
          89832093256: { primeiroNome: "Maria", sobrenome: "Barreto" },
          32913903255: { primeiroNome: "Pedro", sobrenome: "Guedes" },
        })
      : elementNotFound(CPFPacBtnRef.current, "argument for handleCPFBtnClick", extLine(new Error()));
  }, [CPFPacBtnRef, callbackCPFPacBtnClick]);
  //ativação de preenchimento de Profisional com tabela
  const [isCPFFillerActive, setCPFFiller] = useState<boolean>(false),
    toggleCPFFiller = useCallback((CPFProfBtnRef: MutableRefObject<nlBtn>, isCPFFillerActive: boolean) => {
      CPFProfBtnRef?.current instanceof HTMLButtonElement
        ? setCPFFiller(!isCPFFillerActive)
        : elementNotFound(CPFProfBtnRef.current, "CPFProfBtnRef for useCallback", extLine(new Error()));
    }, []),
    generateSchedBtn = useCallback(
      (dialog: HTMLDialogElement) => {
        const allEntryEls = [
          ...dialog.querySelectorAll("input"),
          ...dialog.querySelectorAll("textarea"),
          ...dialog.querySelectorAll("select"),
        ];
        if (allEntryEls.length > 0) {
          allEntryEls.forEach(entry => {
            formData[
              `${
                entry?.id
                  .replace(/first/gi, "")
                  .replace("Pac", "")
                  .replace(/type/gi, "")
                  .replace(/sel/gi, "")
                  .toLowerCase() ?? "no-id"
              }`
            ] = entry.value || "Anônimo";
          });
        } else elementNotPopulated(allEntryEls, "allEntryEls in generateSchedBtn()", extLine(new Error()));
        if (!consVariablesData.rootDlg)
          consVariablesData.rootDlg = createRoot(
            document.getElementById("rootDlgList") ?? document.getElementById("transfArea")!,
          );
        const newBtn = createAptBtn(
          formData,
          providerFormData[accFormData] as any,
          consVariablesData.rootDlg,
          userClass,
        );
        handleDragAptBtn(newBtn, userClass);
      },
      [userClass],
    ),
    [shouldDisplayFailRegstDlg, setDisplayFailRegstDlg] = useState<boolean>(false),
    toggleDisplayRegstDlg = (shouldDisplayFailRegstDlg: boolean = true): void => {
      if (
        dlgRef.current instanceof HTMLElement &&
        !checkRegstBtn(
          submitRef.current,
          dlgRef.current,
          [undefined, shouldDisplayFailRegstDlg, setDisplayFailRegstDlg, "Arraste"],
          userClass,
        )
      )
        setDisplayFailRegstDlg(!shouldDisplayFailRegstDlg);
    };
  //push em history
  useEffect(() => {
    !/new-cons=open/g.test(location.search) &&
      history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&new-cons=open`);
    /av-pac=open/gi.test(location.search) && setPacFiller(true);
    /av-prof=open/gi.test(location.search) && setCPFFiller(true);
    /av-stud=open/gi.test(location.search) && setDREFiller(true);
    setTimeout(() => {
      history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
    }, 300);
    return (): void => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll("&new-cons=open", ""),
      );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, []);
  useEffect(() => {
    if (dlgRef?.current instanceof HTMLDialogElement) {
      ((): void => {
        dlgRef.current.showModal();
      })();
      syncAriaStates([...dlgRef.current!.querySelectorAll("*"), dlgRef.current]);
    } else elementNotFound(dlgRef.current, "dialogElement in RegstPacDlg", extLine(new Error()));
  }, [dlgRef]);
  //adição de listener para submissão e criação de botão posterior
  useEffect(() => {
    handleClientPermissions(
      userClass,
      ["coordenador"],
      document.getElementById("btnShowAvStuds"),
      document.getElementById("listCPFPacCons"),
      document.getElementById("autoFillDREBtn"),
      document.getElementById("autoFillCPFRespBtn"),
    );
  }, [dlgRef, userClass]);
  useEffect(() => {
    if (dlgRef.current instanceof HTMLElement) {
      //garante que tela irá centralizar modal
      setTimeout(() => {
        dlgRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 300);
      //armazenamento local
      // const consDataProvider = new DataProvider(
      //   DataProvider.persistSessionEntries(dlgRef.current)
      // );
      providers.globalDataProvider &&
        providers.globalDataProvider.initPersist(
          dlgRef.current,
          // consDataProvider,
          providers.globalDataProvider,
        );
      //remodela datalistas com base em membros disponíveis para tipo de consulta
      addListenerAvMembers(dlgRef, true);
      //estilização e aria
      syncAriaStates([...dlgRef.current!.querySelectorAll("*"), dlgRef.current]);
      const handleKeyDown = (press: KeyboardEvent): void => {
        if (press.key === "Escape") {
          onClose();
        }
      };
      addEventListener("keydown", handleKeyDown);
      return (): void => removeEventListener("keydown", handleKeyDown);
    }
  }, [dlgRef, onClose]);
  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent): void => {
      dlgRef.current && isClickOutside(ev, dlgRef.current).some(clickArea => clickArea === true) && onClose();
    };
    setTimeout(() => addEventListener("click", handleClickOutside), 1000);
    return (): void => removeEventListener("click", handleClickOutside);
  }, [dlgRef, onClose]);
  useEffect(() => {
    if (
      switchAFConsRef.current instanceof HTMLInputElement &&
      (switchAFConsRef.current.type === "checkbox" || switchAFConsRef.current.type === "radio")
    ) {
      switchAFConsRef.current.checked = true;
      toggleAFCons(isAutofillConsOn);
    } else
      inputNotFound(
        switchAFConsRef.current,
        "Switch for toggling autofill in new appointment form",
        extLine(new Error()),
      );
  }, [switchAFConsRef]);
  useEffect(() => {
    if (
      switchACConsRef.current instanceof HTMLInputElement &&
      (switchACConsRef.current.type === "checkbox" || switchACConsRef.current.type === "radio")
    ) {
      switchACConsRef.current.checked = true;
      toggleACCons(isAutocorrectConsOn);
    } else
      inputNotFound(
        switchACConsRef.current,
        "Switch for toggling autocorrect in new appointment form",
        extLine(new Error()),
      );
  }, [switchACConsRef]);
  useEffect(() => {
    try {
      if (!(hourRef.current instanceof HTMLInputElement))
        throw inputNotFound(hourRef.current, `Validation of Appointment Hour Ref`, extLine(new Error()));
      hourRef.current.value = "18:00";
    } catch (e) {
      return;
    }
  }, [hourRef]);
  useEffect(() => {
    try {
      if (!(dayRef.current instanceof HTMLElement)) {
        throw elementNotFound(dayRef.current, `Validation of Day Reference`, extLine(new Error()));
      }
      const changeDaySel = document.getElementById("changeDaySel");
      if (!(changeDaySel instanceof HTMLElement))
        throw elementNotFound(changeDaySel, `Validation of Change Day Reference`, extLine(new Error()));
      dayRef.current.innerHTML = changeDaySel
        .parentElement!.innerHTML.replaceAll("Dia de Inclusão", "Dia")
        .replaceAll("changeDaySel", "consChangeDaySel");
    } catch (e) {
      const timeDiv = document.getElementById("consTimeDiv");
      if (timeDiv instanceof HTMLElement) timeDiv.style.display = "none";
    }
  }, [dayRef]);
  useExportHandler("formDlgExporter", dlgRef.current, true);
  useEffect(() => assignFormAttrs(formRef.current));
  return (
    <dialog className='modal-content flexWC' ref={dlgRef} id='regstPacDlg'>
      <ErrorBoundary
        FallbackComponent={() => (
          <ErrorFallbackDlg renderError={new Error(`Erro carregando a janela modal!`)} onClick={onClose} />
        )}>
        <div role='group' className='flexRNoWBetCt cGap2v widQ600_75v rGapQ4601v' id='headRegstPac'>
          <div
            role='group'
            className='flexNoW flexQ750NoWC cGap1v rGapQ4601v'
            style={{ marginLeft: "0.5rem", marginTop: "1rem" }}>
            <h2 className='mg__1b noInvert'>
              <strong className='noInvert'>Registro de Consulta</strong>
            </h2>
            <span
              role='group'
              className='form-switch spanRight mg__0b mg__07t pdT05v pdL_3__2rQ750'
              id='autocorrectDivCons'>
              <input
                type='checkbox'
                className='deActBtn form-check-input'
                role='switch'
                id='deactAutocorrectBtnCons'
                title='Correção automática de Nomes'
                data-title='Autocorreção(Consulta)'
                ref={switchACConsRef}
                onChange={() => toggleACCons(isAutocorrectConsOn)}
              />
              <strong>Autocorreção</strong>
            </span>
            <span role='group' className='form-switch spanRight mg__0b mg__07t padR5v pdT05v' id='autofillDivCons'>
              <input
                type='checkbox'
                className='deActBtn form-check-input'
                role='switch'
                id='deactAutofilltBtnCons'
                title='Correção automática de CPF, Telefone e E-mail'
                data-title='Autopreenchimento(Consulta)'
                ref={switchAFConsRef}
                onChange={() => toggleAFCons(isAutofillConsOn)}
              />
              <strong>Autopreenchimento</strong>
            </span>
          </div>
          <button className='btn btn-close forceInvert mg__30b600Q' onClick={onClose}></button>
        </div>
        <fieldset className='flexNoWC'>
          <hr />
          <form
            ref={formRef}
            className='flexWC'
            id='bodyRegsPac'
            name='cons_form'
            action='submit_cons_form'
            method='post'
            encType='application/x-www-form-urlencoded'
            onSubmit={ev => ev.preventDefault()}>
            <section className='flexWC' id='inpsRegsPacSec'>
              <div role='group' className='flexWR' id='cpfPacDiv'>
                <div role='group' className='flexNoWC flexBasis100' id='cpfTitledInpDiv'>
                  <label className='stLab' id='hCpfPac' htmlFor='inpCPFPac'>
                    CPF do Paciente:
                  </label>
                  <div role='group' className='flexNoWRSwitch cGap5' id='cpfBodyDiv'>
                    <input
                      type='text'
                      id='inpCPFPac'
                      name='CPFPac-in'
                      list='listCPFPacCons'
                      maxLength={16}
                      pattern='^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$'
                      className='form-control d_ibl noInvert ssPersist'
                      placeholder='Preencha com o CPF'
                      autoComplete='username'
                      data-title='CPF Paciente'
                      data-aloc='cpf-pac'
                      ref={CPFPacInpRef}
                      onInput={ev => {
                        isAutofillConsOn && formatCPF(ev.currentTarget);
                        handleCondtReq(ev.currentTarget, {
                          min: 14,
                          max: 16,
                          pattern: ["^(d{3}.){2}d{3}-d{2}$", ""],
                        });
                        enableCPFBtn(ev.currentTarget, ev.currentTarget.value);
                      }}
                    />
                    <ListCPFPacCons />
                    <span className='hovBlock'>
                      <button
                        type='button'
                        formMethod='get'
                        formAction='#'
                        className='btn btn-primary hBsFormLike'
                        id='autoFillCPFPacBtn'
                        ref={CPFPacBtnRef}
                        onClick={handleCPFBtnClick}>
                        <small role='textbox'>Preencher Dados com CPF</small>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div role='group' className='flexWR' id='firstNameDiv'>
                <div role='group' className='flexNoWC flexBasis100 noInvert' id='firstNameDiv'>
                  <label className='stLab noInvert' id='hFirstName' htmlFor='firstNamePac'>
                    Primeiro Nome:
                  </label>
                  <div role='group' className='flexNoWRSwitch cGap5' id='firstNamePacBody'>
                    <input
                      type='text'
                      list='listFirstNameCons'
                      maxLength={99}
                      placeholder='Preencha com o Primeiro Nome do Paciente'
                      className='form-control ssPersist'
                      id='firstNamePac'
                      name='NamePac-in'
                      autoComplete='given-name'
                      autoCapitalize='true'
                      data-title='Primeiro Nome Paciente'
                      data-aloc='firstname-pac'
                      onInput={ev => {
                        if (window) localStorage.setItem("name", ev.currentTarget.value);
                        handleCondtReq(ev.currentTarget, {
                          min: 3,
                          max: 99,
                          pattern: ["[^0-9]", "gi"],
                        });
                        isAutocorrectConsOn && autoCapitalizeInputs(ev.currentTarget, isAutocorrectConsOn);
                        if (ev.currentTarget.value.length > 2) {
                          const familyNamePac = document.getElementById("familyNamePac");
                          if (familyNamePac instanceof HTMLInputElement && !familyNamePac.required) {
                            familyNamePac.minLength = 3;
                            familyNamePac.dataset.min = "3";
                            familyNamePac.dataset.max = "99";
                            familyNamePac.dataset.pattern = "[^0-9]";
                            familyNamePac.dataset.flags = "gi";
                            familyNamePac.required = true;
                          }
                          const inpTelPac = document.getElementById("inpTelPac");
                          if (inpTelPac instanceof HTMLInputElement && !inpTelPac.required) {
                            inpTelPac.minLength = 8;
                            inpTelPac.dataset.min = "8";
                            inpTelPac.dataset.max = "10";
                            inpTelPac.dataset.pattern = "9?d{4}-d{4}";
                            inpTelPac.dataset.flags = "g";
                            inpTelPac.required = true;
                          }
                          const relProfName = document.getElementById("relProfName");
                          if (!(relProfName instanceof HTMLInputElement))
                            throw inputNotFound(relProfName, `Validation of relProfName`, extLine(new Error()));
                          if (!relProfName.required) {
                            relProfName.minLength = 3;
                            relProfName.dataset.min = "3";
                            relProfName.dataset.max = "99";
                            relProfName.dataset.pattern = "[^0-9]";
                            relProfName.dataset.flags = "gi";
                            relProfName.required = true;
                          }
                        } else {
                          try {
                            const familyNamePac = document.getElementById("familyNamePac");
                            if (!(familyNamePac instanceof HTMLInputElement))
                              throw inputNotFound(familyNamePac, `Validation of familyNamePac`, extLine(new Error()));
                            if (familyNamePac.required) {
                              familyNamePac.minLength = 0;
                              delete familyNamePac.dataset.min;
                              delete familyNamePac.dataset.max;
                              delete familyNamePac.dataset.pattern;
                              delete familyNamePac.dataset.flags;
                              familyNamePac.required = false;
                            }
                          } catch (e) {
                            console.error(`Error executing procedure for familyNamePac:\n${(e as Error).message}`);
                          }
                          try {
                            const inpTelPac = document.getElementById("inpTelPac");
                            if (!(inpTelPac instanceof HTMLInputElement))
                              throw inputNotFound(inpTelPac, `Validation of inpTelPac`, extLine(new Error()));
                            if (inpTelPac.required) {
                              inpTelPac.minLength = 0;
                              delete inpTelPac.dataset.min;
                              delete inpTelPac.dataset.max;
                              delete inpTelPac.dataset.pattern;
                              delete inpTelPac.dataset.flags;
                              inpTelPac.required = false;
                            }
                          } catch (e) {
                            console.error(`Error executing procedure for inpTelPac:\n${(e as Error).message}`);
                          }
                          try {
                            const relProfName = document.getElementById("relProfName");
                            if (!(relProfName instanceof HTMLInputElement))
                              throw inputNotFound(relProfName, `Validation of relProfName`, extLine(new Error()));
                            if (relProfName.required) {
                              relProfName.minLength = 0;
                              delete relProfName.dataset.min;
                              delete relProfName.dataset.max;
                              delete relProfName.dataset.pattern;
                              delete relProfName.dataset.flags;
                              relProfName.required = false;
                            }
                          } catch (e) {
                            console.error(`Error executing procedure for relProfName:\n${(e as Error).message}`);
                          }
                        }
                      }}
                    />
                    <ListFirstNameCons first={true} />
                    <button
                      type='button'
                      id='btnShowAvStuds'
                      className='btn btn-primary hBsFormLike forceInvert'
                      formMethod='get'
                      formAction='#'
                      ref={pacBtnRef}
                      onClick={() => togglePacFiller(shouldDisplayPacList)}>
                      <small role='textbox'>Consultar Lista de Pacientes</small>
                    </button>
                  </div>
                </div>
                {shouldDisplayPacList && (
                  <AvPacListDlg
                    dispatch={setPacFiller}
                    state={shouldDisplayPacList}
                    mainDlgRef={dlgRef}
                    shouldShowAlocBtn={true}
                  />
                )}
              </div>
              <div role='group' className='flexWR noInvert' id='familyNameDiv'>
                <label className='stLab' id='hFamilyName' htmlFor='familyNamePac'>
                  Sobrenome(s):
                </label>
                <input
                  type='text'
                  maxLength={99}
                  placeholder='Preencha com Sobrenome(s) do Paciente'
                  className='form-control autocorrectAll ssPersist'
                  id='familyNamePac'
                  list='listFamilyNameCons'
                  autoComplete='family-name'
                  autoCapitalize='true'
                  data-title='Sobrenome Paciente'
                  data-aloc='familyname-pac'
                  onInput={ev => {
                    if (window) localStorage.setItem("secondName", ev.currentTarget.value);
                    isAutocorrectConsOn && autoCapitalizeInputs(ev.currentTarget, isAutocorrectConsOn);
                    handleCondtReq(ev.currentTarget, {
                      min: 3,
                      max: 99,
                      pattern: ["[^0-9]", "gi"],
                    });
                  }}
                />
                <ListFirstNameCons first={false} />
              </div>
              <div role='group' className='flexWR cGap5' id='telPacDiv'>
                <div role='group' className='flexNoWC flexBasis100' id='telTitledInpDiv'>
                  <label className='stLab' id='hTelPac' htmlFor='inpTelPac'>
                    Telefone do Paciente:
                  </label>
                  <div role='group' className='flexNoWR cGap1v' id='telBodyDiv'>
                    <input
                      type='number'
                      id='nacPac'
                      maxLength={4}
                      pattern='^+?\d{2}$'
                      className='form-control d_ibl telNational noInvert ssPersist'
                      placeholder='+55?'
                      autoComplete='telNational'
                      data-title='Código Nacional Paciente'
                      data-aloc='nac-pac'
                      onInput={ev => {
                        handleCondtReq(ev.currentTarget, {
                          min: 2,
                          max: 4,
                          pattern: ["^+?d{2}$", ""],
                        });
                      }}
                    />
                    <input
                      type='number'
                      id='DDDPac'
                      list='ddds'
                      maxLength={5}
                      pattern='^\(?\d{2}\)?$'
                      className='form-control d_ibl noInvert ssPersist'
                      placeholder='DDD'
                      autoComplete='tel-area-code'
                      data-title='DDD Paciente'
                      data-aloc='ddd-pac'
                      onInput={ev => {
                        handleCondtReq(ev.currentTarget, {
                          min: 2,
                          max: 5,
                          pattern: ["^(?d{2})?$", ""],
                        });
                      }}
                    />
                    <datalist id='ddds'>
                      <optgroup label='Sudeste'>
                        <option value='21'>RJ</option>
                        <option value='11'>SP</option>
                        <option value='12'>SP</option>
                        <option value='13'>SP</option>
                        <option value='14'>SP</option>
                        <option value='15'>SP</option>
                        <option value='16'>SP</option>
                        <option value='17'>SP</option>
                        <option value='18'>SP</option>
                        <option value='31'>MG</option>
                        <option value='32'>MG</option>
                        <option value='33'>MG</option>
                        <option value='34'>MG</option>
                        <option value='35'>MG</option>
                        <option value='37'>MG</option>
                        <option value='38'>MG</option>
                        <option value='27'>ES</option>
                        <option value='28'>ES</option>
                      </optgroup>
                      <optgroup label='Sul'>
                        <option value='41'>PR</option>
                        <option value='42'>PR</option>
                        <option value='43'>PR</option>
                        <option value='44'>PR</option>
                        <option value='45'>PR</option>
                        <option value='46'>PR</option>
                        <option value='47'>SC</option>
                        <option value='48'>SC</option>
                        <option value='49'>SC</option>
                        <option value='51'>RS</option>
                        <option value='53'>RS</option>
                        <option value='54'>RS</option>
                        <option value='55'>RS</option>
                      </optgroup>
                      <optgroup label='Centro-Oeste'>
                        <option value='61'>DF</option>
                        <option value='62'>GO</option>
                        <option value='64'>GO</option>
                        <option value='65'>MT</option>
                        <option value='66'>MT</option>
                        <option value='67'>MS</option>
                      </optgroup>
                      <optgroup label='Nordeste'>
                        <option value='71'>BA</option>
                        <option value='73'>BA</option>
                        <option value='74'>BA</option>
                        <option value='75'>BA</option>
                        <option value='77'>BA</option>
                        <option value='79'>SE</option>
                        <option value='81'>PE</option>
                        <option value='87'>PE</option>
                        <option value='82'>AL</option>
                        <option value='83'>PB</option>
                        <option value='84'>RN</option>
                        <option value='85'>CE</option>
                        <option value='88'>CE</option>
                        <option value='86'>PI</option>
                        <option value='89'>PI</option>
                        <option value='98'>MA</option>
                        <option value='99'>MA</option>
                      </optgroup>
                      <optgroup label='Norte'>
                        <option value='91'>PA</option>
                        <option value='93'>PA</option>
                        <option value='94'>PA</option>
                        <option value='92'>AM</option>
                        <option value='97'>AM</option>
                        <option value='95'>RR</option>
                        <option value='96'>AP</option>
                        <option value='63'>TO</option>
                        <option value='69'>RO</option>
                        <option value='68'>AC</option>
                      </optgroup>
                    </datalist>
                    <input
                      type='tel'
                      id='inpTelPac'
                      list='listTelPacCons'
                      maxLength={10}
                      pattern='^\d{4,5}-?\d{4}$'
                      className='form-control d_ibl noInvert ssPersist'
                      placeholder='Preencha com o Telefone (sem código nacional e DDD) de Contato'
                      autoComplete='tel-local'
                      data-title='Tel Paciente'
                      data-aloc='tel-pac'
                      ref={telPacInpRef}
                      onInput={ev => {
                        isAutofillConsOn && formatTel(ev.currentTarget);
                        handleCondtReq(ev.currentTarget, {
                          min: 8,
                          max: 10,
                          pattern: ["9?d{4}-d{4}", "g"],
                        });
                      }}
                    />
                    <ListTelPacCons />
                  </div>
                </div>
              </div>
              <div role='group' className='flexWR' id='emailPacDiv'>
                <label className='stLab' id='hFirstName' htmlFor='emailPac'>
                  E-mail do Paciente:
                </label>
                <input
                  type='email'
                  maxLength={99}
                  placeholder='Preencha com o E-mail do Paciente'
                  className='form-control noInvert ssPersist'
                  id='emailPac'
                  list='listEmailPacCons'
                  name='emailPac-in'
                  autoComplete='email'
                  data-title='Email Paciente'
                  data-aloc='email-pac'
                  onInput={ev => {
                    isAutofillConsOn && addEmailExtension(ev.currentTarget);
                    handleCondtReq(ev.currentTarget, {
                      min: 6,
                      max: 99,
                      pattern: ["@", "g"],
                    });
                  }}
                  onClick={ev => isAutofillConsOn && addEmailExtension(ev.currentTarget)}
                />
                <ListEmailPacCons />
              </div>
              <div role='group' className='flexWR' id='statusPacDiv'>
                <label className='stLab' id='hStatusPac' htmlFor='statusPac'>
                  Status do Paciente:
                </label>
                <select
                  className='form-select noInvert ssPersist'
                  id='statusPac'
                  name='statusPac-in'
                  data-title='Status Paciente'
                  data-aloc='status-pac'
                  required>
                  <option value='avaliacao'>Em Avaliação Inicial</option>
                  <option value='tratamento'>Em Tratamento Geral</option>
                  <option value='emergência'>Em emergência</option>
                  <option value='altaOdontologia'>Alta — Odontologia</option>
                  <option value='altaEducacaoFisica'>Alta — Educação Física</option>
                  <option value='altaNutricao'>Alta — Nutrição</option>
                  <option value='altaOdontologiaEducaoFisica'>Alta — Odontologia — Educação Física</option>
                  <option value='altaOdontologiaNutricao'>Alta — Odontologia — Nutrição</option>
                  <option value='altaEducaoFisicaNutricao'>Alta — Educação Física — Nutrição</option>
                  <option value='altaOdontologiaEducacaoFisicaNutricao'>Alta Geral</option>
                </select>
              </div>
              <div role='group' className='flexWR noInvert' id='consDiv'>
                <label className='stLab' id='hTypeCons' htmlFor='typeConsSel'>
                  Tipo da Consulta:
                </label>
                <select
                  id='typeConsSel'
                  name='typeCons-in'
                  className='form-select ssPersist'
                  data-title='Tipo da Consulta'
                  required>
                  <optgroup label='Geral'>
                    <option value='anamnese'>Anamnese e Exame Clínico</option>
                    <option value='retorno'>Retorno e Reavaliação</option>
                  </optgroup>
                  <optgroup label='Odontologia'>
                    <option value='exodontia'>Exodontia</option>
                    <option value='profilaxia'>Profilaxia e Orientação</option>
                    <option value='raspagem'>Raspagem</option>
                    <option value='rcarie'>Remoção de Cárie</option>
                  </optgroup>
                  <optgroup label='Educação Física & Nutrição'>
                    <option value='acompanhamento'>Acompanhamento Geral</option>
                    <option value='analise'>Análise de Exames Bioquímico</option>
                    <option value='diagnostico'>Diagnóstico Nutricional</option>
                    <option value='avaliacao'>Avaliação Antropométrica</option>
                    <option value='recordatorio'>Recordatório Alimentar</option>
                    <option value='suplementacao'>Suplementação e Plano Alimentar</option>
                  </optgroup>
                  <optgroup label='Psicanálise'></optgroup>
                </select>
              </div>
              <div role='group' className='flexWR' id='relStudDiv'>
                <div role='group' className='flexNoWC flexBasis100' id='alocStudTitledDiv'>
                  <label className='stLab' id='hRelStud' htmlFor='alocStudDiv'>
                    Estudante alocado:
                  </label>
                  <div role='group' className='flexNoWRSwitch cGap5' id='alocStudDiv'>
                    <input
                      type='text'
                      id='relStudName'
                      name='relStud-in'
                      list='avStuds'
                      className='form-control noInvert ssPersist'
                      maxLength={99}
                      placeholder='Preencha com o Nome do Estudante alocado'
                      autoComplete='given-name'
                      data-title='Nome do Estudante Alocado'
                      onInput={ev => {
                        handleCondtReq(ev.currentTarget, {
                          min: 3,
                          max: 99,
                          pattern: ["[^0-9]", "gi"],
                        });
                      }}
                    />
                    <datalist id='avStuds'>
                      <span>Registro de Estudantes</span>
                      <OptGrpUsers grp='studs' area='Odontologia' />
                      <OptGrpUsers grp='studs' area='Educação Física' />
                      <OptGrpUsers grp='studs' area='Nutrição' />
                      <OptGrpUsers grp='studs' area='Medicina' />
                      <OptGrpUsers grp='studs' area='Psicologia' />
                    </datalist>
                    <button
                      type='button'
                      formMethod='get'
                      formAction='#'
                      className='btn btn-primary hBsFormLike'
                      id='autoFillDREBtn'
                      onClick={() => toggleDREFiller()}>
                      <small role='textbox'>Capturar por Identificadores</small>
                    </button>
                  </div>
                </div>
                {isDREFillerActive && <DREFiller forwardedRef={dlgRef} />}
                <div role='group' className='flexNoWC flexBasis100' id='respTitledInpDiv'>
                  <label className='stLab' id='hRelResp' htmlFor='relProfName'>
                    Professor ou Profissional Responsável alocado:
                  </label>
                  <div role='group' className='flexNoWRSwitch cGap5' id='respBodyDiv'>
                    <input
                      type='text'
                      id='relProfName'
                      name='relProf-in'
                      list='avProfs'
                      className='form-control noInvert ssPersist'
                      maxLength={99}
                      placeholder='Preencha com o Nome do Profissional Responsável alocado'
                      autoComplete='given-name'
                      data-title='Nome do Profissional Responsável Alocado'
                      onInput={ev => {
                        handleCondtReq(ev.currentTarget, {
                          min: 3,
                          max: 99,
                          pattern: ["[^0-9]", "gi"],
                        });
                      }}
                    />
                    <datalist id='avProfs'>
                      <span>Registro de Profissionais</span>
                      <OptGrpUsers grp='profs' area='Odontologia' />
                      <OptGrpUsers grp='profs' area='Educação Física' />
                      <OptGrpUsers grp='profs' area='Nutrição' />
                      <OptGrpUsers grp='profs' area='Medicina' />
                      <OptGrpUsers grp='profs' area='Psicologia' />
                    </datalist>
                    <button
                      type='button'
                      className='btn btn-primary hBsFormLike'
                      id='autoFillCPFRespBtn'
                      ref={CPFProfBtnRef}
                      onClick={() => toggleCPFFiller(CPFProfBtnRef, isCPFFillerActive)}>
                      <small role='textbox'>Consultar Lista de Profissionais</small>
                    </button>
                  </div>
                </div>
                {isCPFFillerActive && (
                  <AvProfListDlg
                    dispatch={setCPFFiller}
                    state={isCPFFillerActive}
                    mainDlgRef={dlgRef}
                    btnProf={CPFPacBtnRef.current}
                  />
                )}
              </div>
              <div role='group' className='flexWR gap1v flexAlItCt noInvert' id='confirmPacDiv'>
                <label className='stLab checkGreen mdGreen' id='hConfirmPac' htmlFor='confirmPac'>
                  Paciente Confirmado:
                </label>
                <input
                  type='checkbox'
                  id='confirmPac'
                  name='check-in'
                  className='form-check-input mg__09t mg__1_3b'
                  data-title='Confirmação do Paciente'
                />
              </div>
              <div role='group' id='consTimeDiv'>
                <div id='consDayDiv' ref={dayRef}></div>
                <div role='group' className='widQ460MinFull alSfSt widHalf900Q rGapQ900null' id='hourDayDiv'>
                  <label className='boldLabel mg__09t' id='labHourDay' htmlFor='consHourDayInp'>
                    Horário:
                  </label>
                  <input
                    type='time'
                    className='form-control widMin75Q460v ssPersist'
                    id='consHourDayInp'
                    title='Selecione aqui o horário na agenda (só funcionará para horários tabelados)'
                    data-title='Horário de trabalho para Inclusão'
                    ref={hourRef}
                    onInput={ev => {
                      try {
                        const hours = Array.from(document.querySelectorAll(".hour"))
                          .map(hour => (hour instanceof HTMLElement ? hour.dataset.hour || hour.innerText : null))
                          .filter(hour => typeof hour === "string") as string[];
                        if (!hours.some(hour => hour === ev.currentTarget.value)) {
                          ev.currentTarget.style.color = `#c10f0fd8`;
                          ev.currentTarget.style.borderColor = `#c10f0fd8`;
                          setTimeout(() => {
                            const hourInp = document.getElementById("consHourDayInp");
                            if (hourInp instanceof HTMLInputElement || hourInp instanceof HTMLSelectElement) {
                              hourInp.style.borderColor = `rgb(179, 205, 242)`;
                              const absHours = hours.map(hour => hour.slice(0, 2));
                              if (absHours.some(hour => hourInp.value === hour)) {
                                const matchHour = absHours.find(hour => hourInp.value === hour);
                                if (matchHour && matchHour.length === 2) {
                                  hourInp.value = `${matchHour}:00`;
                                  hourInp.style.color = `rgb(33, 37, 41)`;
                                }
                              } else if (
                                parseInt(hourInp.value.replace(":", "")) >
                                (parseInt(hours.at(-1)!.replace(":", "")) || 21)
                              ) {
                                hourInp.value = `${parseInt(hours.at(-1)!.slice(0, 2))}:00`;
                                hourInp.style.color = `rgb(33, 37, 41)`;
                              } else if (
                                parseInt(hourInp.value.slice(0, 2)) < (parseInt(hours[0].replace(":", "")) || 18)
                              ) {
                                hourInp.value = `${parseInt(hours[0].slice(0, 2))}:00`;
                                hourInp.style.color = `rgb(33, 37, 41)`;
                              }
                            }
                          }, 1000);
                        } else {
                          ev.currentTarget.style.color = `rgb(33, 37, 41)`;
                          ev.currentTarget.style.borderColor = `rgb(179, 205, 242)`;
                        }
                      } catch (e) {
                        console.error(`Error executing ${ev.type} callback:\n${(e as Error).message}`);
                      }
                    }}
                    onChange={ev => {
                      try {
                        const hours = Array.from(document.querySelectorAll(".hour"))
                          .map(hour => (hour instanceof HTMLElement ? hour.dataset.hour || hour.innerText : null))
                          .filter(hour => typeof hour === "string") as string[];
                        if (!hours.some(hour => hour === ev.currentTarget.value)) {
                          ev.currentTarget.style.color = `#c10f0fd8`;
                          ev.currentTarget.style.borderColor = `#c10f0fd8`;
                          setTimeout(() => {
                            const hourInp = document.getElementById("consHourDayInp");
                            if (hourInp instanceof HTMLInputElement || hourInp instanceof HTMLSelectElement) {
                              hourInp.style.borderColor = `rgb(179, 205, 242)`;
                              const absHours = hours.map(hour => hour.slice(0, 2));
                              if (absHours.some(hour => hourInp.value === hour)) {
                                const matchHour = absHours.find(hour => hourInp.value === hour);
                                if (matchHour && matchHour.length === 2) {
                                  hourInp.value = `${matchHour}:00`;
                                  hourInp.style.color = `rgb(33, 37, 41)`;
                                }
                              } else if (
                                parseInt(hourInp.value.replace(":", "")) >
                                (parseInt(hours.at(-1)!.replace(":", "")) || 21)
                              ) {
                                hourInp.value = `${parseInt(hours.at(-1)!.slice(0, 2))}:00`;
                                hourInp.style.color = `rgb(33, 37, 41)`;
                              } else if (
                                parseInt(hourInp.value.slice(0, 2)) < (parseInt(hours[0].replace(":", "")) || 18)
                              ) {
                                hourInp.value = `${parseInt(hours[0].slice(0, 2))}:00`;
                                hourInp.style.color = `rgb(33, 37, 41)`;
                              }
                            }
                          }, 1000);
                        } else {
                          ev.currentTarget.style.color = `rgb(33, 37, 41)`;
                          ev.currentTarget.style.borderColor = `rgb(179, 205, 242)`;
                        }
                      } catch (e) {
                        console.error(`Error executing ${ev.type} callback:\n${(e as Error).message}`);
                      }
                    }}
                  />
                </div>
              </div>
              <div role='group' className='flexWR gap1v flexAlItCt noInvert'>
                <label htmlFor='notesCons' className='bolded'>
                  Notas:
                </label>
                <textarea
                  className='form-control'
                  id='notesCons'
                  name='notes-in'
                  autoCapitalize='true'
                  placeholder='Insira aqui observações adicionais sobre a consulta'
                  data-title='Notas e Observações'></textarea>
              </div>
            </section>
            <hr />
            <section className='flexNoWR cGap5 rGapQ4602v flexJC flexQ460NoWC' id='btnsRegsPacSec'>
              <div role='group' className='flexWR flexAlItCt flexJSb widHalf widQ460MinFull noInvert' id='divSubmitPac'>
                <button
                  type='button'
                  // "submit"
                  id='submitPacBtn'
                  className='btn btn-success widFull'
                  ref={submitRef}
                  onClick={ev => {
                    const UNDER_TEST = true;
                    validateForm(ev, ev.currentTarget, false).then(validation => {
                      if (UNDER_TEST) {
                        //acumulador é alinhado com o de contexto dos diálogos de consulta no handler comum
                        accFormData = document.querySelectorAll(".appointmentBtn").length + 1;
                        providerFormData[accFormData] = generateSchedPacData(
                          dlgRef.current ?? ev.currentTarget.closest("dialog"),
                        );
                        generateSchedBtn(dlgRef.current ?? ev.currentTarget.closest("dialog")!);
                        // handleSubmit("cons", validation[2], true);
                        toggleDisplayRegstDlg(shouldDisplayFailRegstDlg);
                        onClose();
                      } else {
                        if (validation[0]) {
                          //acumulador é alinhado com o de contexto dos diálogos de consulta no handler comum
                          accFormData = document.querySelectorAll(".appointmentBtn").length + 1;
                          providerFormData[accFormData] = generateSchedPacData(
                            dlgRef.current ?? ev.currentTarget.closest("dialog"),
                          );
                          generateSchedBtn(dlgRef.current ?? ev.currentTarget.closest("dialog")!);
                          handleSubmit("cons", validation[2], true);
                          onClose();
                        } else ev.preventDefault();
                      }
                    });
                  }}>
                  <small role='textbox'>
                    <em>
                      <strong>Finalizar</strong>
                    </em>
                  </small>
                </button>
              </div>
              <div role='group' className='flexWR flexAlItCt flexJSb widHalf widQ460MinFull' id='divExportPac'>
                <button
                  type='button'
                  id='btnExportRegst'
                  className='btn btn-primary widFull'
                  data-active='false'
                  ref={exportRef}
                  style={{ cursor: "alias" }}
                  title='Gere um .xlsx com os dados preenchidos'
                  onClick={ev => {
                    if (!exporters.formDlgExporter) exporters.formDlgExporter = new ExportHandler();
                    exporters.formDlgExporter.handleExportClick(
                      ev,
                      "registroDeConsultaParaPaciente",
                      ev.currentTarget.closest("form") ?? document,
                      `${localStorage.getItem("name")?.replace(/\s/g, "-") ?? ""}_${
                        localStorage.getItem("secondName")?.replace(/\s/g, "-") ?? ""
                      }_${localStorage.getItem("lastName")?.replace(/\s/g, "-") ?? ""}`,
                    ),
                      { signal: new AbortController().signal };
                  }}>
                  <small role='textbox'>
                    <em className='bolded'>Gerar Planilha</em>
                  </small>
                </button>
              </div>
            </section>
          </form>
        </fieldset>
      </ErrorBoundary>
      {shouldDisplayFailRegstDlg && (
        <FailRegstAlert
          setDisplayFailRegstDlg={setDisplayFailRegstDlg}
          shouldDisplayFailRegstDlg={shouldDisplayFailRegstDlg}
          root={undefined}
          secondOp={"Arraste"}
        />
      )}
    </dialog>
  );
}
