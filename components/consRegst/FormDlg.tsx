import {
  useEffect,
  useRef,
  useCallback,
  useState,
  MutableRefObject,
} from "react";
import { providerFormData } from "./consVariables";
import {
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
import { FormDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { nullishBtn, nullishInp } from "@/lib/global/declarations/types";
import {
  addEmailExtension,
  autoCapitalizeInputs,
  formatCPF,
  formatTel,
} from "@/lib/global/gModel";
import { DataProvider } from "@/lib/locals/panelPage/declarations/classesCons";
import { addListenerAvMembers } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { isClickOutside } from "@/lib/global/gStyleScript";
import {
  enableCPFBtn,
  subForm,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import { addListenerExportBtn } from "@/lib/global/gController";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { ErrorBoundary } from "react-error-boundary";
import { formData } from "@/lib/locals/panelPage/consController";
import { consVariablesData } from "./consVariables";
import DREFiller from "./DREFiller";
import AvProfListDlg from "../lists/AvProfListDlg";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import AvPacListDlg from "../lists/AvPacListDlg";
import { globalDataProvider } from "@/pages/panel";
import { createRoot } from "react-dom/client";

let accFormData = 0;
export default function FormDlg({
  dialogRef,
  onClose,
  userClass = "estudante",
}: FormDlgProps): JSX.Element {
  //display de campos para identificadores de estudante
  const [isDREFillerActive, setDREFiller] = useState(false);
  const toggleDREFiller = () => {
    setDREFiller(!isDREFillerActive);
  };
  //display de tabela para pacientes
  const pacBtnRef = useRef<nullishBtn>(null);
  const [shouldDisplayPacList, setPacFiller] = useState(false);
  const togglePacFiller = (shouldDisplayPacList: boolean = false) => {
    setPacFiller(!shouldDisplayPacList);
  };
  //autocorreções de input
  const [isAutocorrectConsOn, setAutocorrectCons] = useState(true);
  const toggleACCons = (isAutocorrectConsOn: boolean = false) => {
    setAutocorrectCons(!isAutocorrectConsOn);
  };
  const switchACConsRef = useRef<nullishInp>(null);
  useEffect(() => {
    if (
      switchACConsRef.current instanceof HTMLInputElement &&
      (switchACConsRef.current.type === "checkbox" ||
        switchACConsRef.current.type === "radio")
    ) {
      switchACConsRef.current.checked = true;
      toggleACCons(isAutocorrectConsOn);
      const inpFirstName = dialogRef.current!.querySelector("#firstNamePac");
      const inpFamilyName = dialogRef.current!.querySelector("#familyNamePac");
      inpFirstName instanceof HTMLInputElement
        ? inpFirstName.addEventListener("input", () => {
            isAutocorrectConsOn &&
              autoCapitalizeInputs(inpFirstName, isAutocorrectConsOn);
          })
        : inputNotFound(
            inpFirstName,
            "<input> for patient's first name in new appointment form",
            extLine(new Error())
          );
      inpFamilyName instanceof HTMLInputElement
        ? inpFamilyName.addEventListener("input", () => {
            isAutocorrectConsOn &&
              autoCapitalizeInputs(inpFamilyName, isAutocorrectConsOn);
          })
        : inputNotFound(
            inpFamilyName,
            "<input> for patient's middle and family names in new appointment form",
            extLine(new Error())
          );
    } else
      inputNotFound(
        switchACConsRef.current,
        "Switch for toggling autocorrect in new appointment form",
        extLine(new Error())
      );
  }, [switchACConsRef]);
  const [isAutofillConsOn, setAutofillCons] = useState(true);
  const toggleAFCons = (isAutofillConsOn: boolean = false) => {
    setAutofillCons(!isAutofillConsOn);
  };
  const switchAFConsRef = useRef<nullishInp>(null);
  useEffect(() => {
    if (
      switchAFConsRef.current instanceof HTMLInputElement &&
      (switchAFConsRef.current.type === "checkbox" ||
        switchAFConsRef.current.type === "radio")
    ) {
      switchAFConsRef.current.checked = true;
      toggleAFCons(isAutofillConsOn);
      const inpCPF = dialogRef.current!.querySelector("#inpCPFPac");
      const inpTel = dialogRef.current!.querySelector("#inpTelPac");
      const inpEmail = dialogRef.current!.querySelector("#emailPac");
      inpCPF instanceof HTMLInputElement
        ? inpCPF.addEventListener("input", () => {
            isAutofillConsOn && formatCPF(inpCPF);
          })
        : inputNotFound(
            inpCPF,
            "<input> for entering CPF data in new appointment form",
            extLine(new Error())
          );
      inpTel instanceof HTMLInputElement
        ? inpTel.addEventListener("input", () => {
            isAutofillConsOn && formatTel(inpTel);
          })
        : inputNotFound(
            inpTel,
            "<input> for telephone number in new appointment form",
            extLine(new Error())
          );
      if (inpEmail instanceof HTMLInputElement) {
        inpEmail.addEventListener("input", () => {
          isAutofillConsOn && addEmailExtension(inpEmail);
        });
        inpEmail.addEventListener("click", () => {
          isAutofillConsOn && addEmailExtension(inpEmail);
        });
      }
    } else
      inputNotFound(
        switchAFConsRef.current,
        "Switch for toggling autofill in new appointment form",
        extLine(new Error())
      );
  }, [switchAFConsRef]);
  useEffect(() => {
    if (dialogRef.current instanceof HTMLElement) {
      //garante que tela irá centralizar modal
      setTimeout(() => {
        dialogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 300);
      //armazenamento local
      const consDataProvider = new DataProvider(
        DataProvider.persistSessionEntries(dialogRef.current)
      );
      globalDataProvider &&
        globalDataProvider.initPersist(
          dialogRef.current,
          consDataProvider,
          globalDataProvider
        );
      //remodela datalistas com base em membros disponíveis para tipo de consulta
      addListenerAvMembers(dialogRef, true);
      //estilização e aria
      syncAriaStates([
        ...dialogRef.current!.querySelectorAll("*"),
        dialogRef.current,
      ]);
      const handleKeyDown = (press: KeyboardEvent) => {
        if (press.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [dialogRef]);
  //fechamento de modal com clique fora da área do mesmo
  const handleClickOutside = (ev: MouseEvent) => {
    if (
      dialogRef.current &&
      isClickOutside(ev, dialogRef.current).some(
        clickArea => clickArea === true
      )
    ) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dialogRef, onClose]);
  //autocompleção
  const CPFPacInpRef = useRef<nullishInp>(null);
  useEffect(() => {
    if (
      CPFPacInpRef?.current instanceof HTMLInputElement &&
      CPFPacInpRef.current.id.match(/cpf/gi)
    ) {
      CPFPacInpRef.current.addEventListener("input", () => {
        formatCPF(CPFPacInpRef.current);
      });
      return () => {
        CPFPacInpRef.current?.removeEventListener("input", () => {
          formatCPF(CPFPacInpRef.current);
        });
      };
    } else
      inputNotFound(
        CPFPacInpRef.current,
        "CPFPacInpRef.current in useEffect()",
        extLine(new Error())
      );
  }, [CPFPacInpRef]);
  const CPFPacBtnRef = useRef<nullishBtn>(null);
  const callbackCPFPacBtnClick = useCallback(
    (retrvDataPh: { [key: string]: Object }) => {
      const matchDataPh = (() => {
        const matchDataPh = new Map();
        Object.entries(retrvDataPh).forEach(([key, value]) => {
          matchDataPh.set(key, value);
        });
        return matchDataPh;
      })();
      if (dialogRef?.current instanceof Element) {
        const cpfInp =
          dialogRef.current.querySelector("input[id*=cpf]") ||
          dialogRef.current.querySelector("input[id*=CPF]");
        const currentInps = Array.from([
          ...dialogRef.current.querySelectorAll("input"),
          ...dialogRef.current.querySelectorAll("select"),
          ...dialogRef.current.querySelectorAll("textarea"),
        ]).filter(inp => !/cpf/gi.test(inp.id));
        if (
          cpfInp instanceof HTMLInputElement &&
          currentInps.length > 0 &&
          currentInps.every(
            inp =>
              inp instanceof HTMLInputElement ||
              inp instanceof HTMLTextAreaElement ||
              inp instanceof HTMLSelectElement
          )
        ) {
          const keyFirstLvlMatch = matchDataPh.get(
            cpfInp.value.replaceAll(/[^\d]/g, "")
          );
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
              keyFirstLvlMatch[inpTitle] &&
                (inp.value = keyFirstLvlMatch[inpTitle].toString());
            } else
              console.warn(
                `Field ${
                  inp.id || "UNIDENTIFIED"
                } has no data-title. Could not match data.`
              );
          }
        } else
          multipleElementsNotFound(
            extLine(new Error()),
            `inputs in the dialog id ${dialogRef.current.id}`,
            cpfInp
          );
      } else
        console.warn(
          `dialogRef.current not validated in callbackCPFPacBtnClick()`
        );
      return matchDataPh;
    },
    [CPFPacBtnRef]
  );
  const telPacInpRef = useRef<nullishInp>(null);
  useEffect(() => {
    if (
      telPacInpRef?.current instanceof HTMLInputElement &&
      telPacInpRef.current.id.match(/tel/gi)
    ) {
      callbackTelPacBtnClick(telPacInpRef.current);
      return telPacInpRef.current!.removeEventListener("input", () => {
        formatTel(telPacInpRef.current!);
      });
    } else
      inputNotFound(
        telPacInpRef.current,
        "telPacInpRef.current in useEffect()",
        extLine(new Error())
      );
  }, [telPacInpRef]);
  const callbackTelPacBtnClick = useCallback(
    (telPacInp: HTMLInputElement) => {
      telPacInp.addEventListener("input", () => {
        formatTel(telPacInp);
      });
    },
    [telPacInpRef]
  );
  //ativação de preenchimento de paciente com CPF
  const handleCPFBtnClick = useCallback(() => {
    CPFPacBtnRef?.current instanceof HTMLButtonElement &&
    CPFPacBtnRef.current.id.match(/cpf/gi)
      ? callbackCPFPacBtnClick({
          12345678910: { primeiroNome: "José", sobrenome: "Pereira" },
          89832093256: { primeiroNome: "Maria", sobrenome: "Barreto" },
          32913903255: { primeiroNome: "Pedro", sobrenome: "Guedes" },
        })
      : elementNotFound(
          CPFPacBtnRef.current,
          "argument for handleCPFBtnClick",
          extLine(new Error())
        );
  }, [dialogRef, CPFPacBtnRef]);
  const callbackEnableCPFBtn = useCallback(() => {
    enableCPFBtn(CPFPacBtnRef.current, CPFPacInpRef.current?.value);
    CPFPacInpRef.current!.addEventListener("input", () => {
      enableCPFBtn(CPFPacBtnRef.current, CPFPacInpRef.current?.value);
    });
  }, [dialogRef, CPFPacBtnRef]);
  useEffect(() => {
    //permite uso de CPF caso satisfaça o pattern para esse tipo de input
    if (
      CPFPacInpRef?.current instanceof HTMLInputElement &&
      CPFPacInpRef.current.id.match(/cpf/gi) &&
      CPFPacBtnRef?.current instanceof HTMLButtonElement &&
      CPFPacBtnRef.current.id.match(/cpf/gi)
    ) {
      callbackEnableCPFBtn();
      return CPFPacInpRef.current.removeEventListener("input", () => {
        enableCPFBtn(CPFPacBtnRef.current, CPFPacInpRef.current?.value);
      });
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "useEffect() for adding listener to call enableCPFBtn",
        CPFPacInpRef.current,
        CPFPacBtnRef.current
      );
  }, [CPFPacInpRef, CPFPacBtnRef]);
  //ativação de preenchimento de Profisional com tabela
  const CPFProfBtnRef = useRef<nullishBtn>(null);
  const [isCPFFillerActive, setCPFFiller] = useState(false);
  const toggleCPFFiller = useCallback(
    (
      CPFProfBtnRef: MutableRefObject<nullishBtn>,
      isCPFFillerActive: boolean
    ) => {
      CPFProfBtnRef?.current instanceof HTMLButtonElement
        ? setCPFFiller(!isCPFFillerActive)
        : elementNotFound(
            CPFProfBtnRef.current,
            "CPFProfBtnRef for useCallback",
            extLine(new Error())
          );
    },
    [dialogRef, CPFProfBtnRef]
  );
  const exportRef = useRef<nullishBtn>(null);
  //adicionar listener para exportação de excel
  useEffect(() => {
    if (
      exportRef?.current instanceof HTMLButtonElement &&
      exportRef.current.id.match(/export/gi) &&
      (dialogRef?.current instanceof HTMLDialogElement ||
        (dialogRef.current! instanceof HTMLElement &&
          (dialogRef.current as HTMLElement).classList
            .toString()
            .match(/modal/gi)))
    )
      addListenerExportBtn("Paciente", dialogRef.current, "#firstNamePac");
    else
      multipleElementsNotFound(
        extLine(new Error()),
        "refs in useEffect() for FormDlg",
        exportRef.current,
        dialogRef.current
      );
  }, [exportRef]);
  const submitRef = useRef<nullishBtn>(null);
  const generateSchedBtn = useCallback(
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
      } else
        elementNotPopulated(
          allEntryEls,
          "allEntryEls in generateSchedBtn()",
          extLine(new Error())
        );
      if (!consVariablesData.rootDlg)
        consVariablesData.rootDlg = createRoot(
          document.getElementById("rootDlgList") ??
            document.getElementById("transfArea")!
        );
      const newBtn = createAptBtn(
        formData,
        providerFormData[accFormData],
        consVariablesData.rootDlg,
        userClass
      );
      handleDragAptBtn(newBtn, userClass);
    },
    [dialogRef, submitRef]
  );
  //adição de listener para submissão e criação de botão posterior
  useEffect(() => {
    handleClientPermissions(
      userClass,
      ["coordenador"],
      document.getElementById("btnShowAvStuds"),
      document.getElementById("listCPFPacCons"),
      document.getElementById("autoFillDREBtn"),
      document.getElementById("autoFillCPFRespBtn")
    );
  }, [dialogRef]);
  return (
    <dialog className="modal-content flexWC" ref={dialogRef} id="regstPacDlg">
      <ErrorBoundary
        FallbackComponent={() => (
          <ErrorFallbackDlg
            renderError={new Error(`Erro carregando a janela modal!`)}
            onClick={onClose}
          />
        )}
      >
        <div
          role="group"
          className="flexRNoWBetCt cGap2v widQ600_75v rGapQ4601v"
          id="headRegstPac"
        >
          <div
            role="group"
            className="flexNoW flexQ750NoWC cGap1v rGapQ4601v"
            style={{ marginLeft: "0.5rem", marginTop: "1rem" }}
          >
            <h2 className="mg-1b noInvert">
              <strong className="noInvert">Registro de Consulta</strong>
            </h2>
            <span
              role="group"
              className="form-switch spanRight mg-0b mg-07t pdT05v pdL-3-2rQ750"
              id="autocorrectDivCons"
            >
              <input
                type="checkbox"
                className="deActBtn form-check-input"
                role="switch"
                id="deactAutocorrectBtnCons"
                title="Correção automática de Nomes"
                data-title="Autocorreção(Consulta)"
                ref={switchACConsRef}
                onChange={() => toggleACCons(isAutocorrectConsOn)}
              />{" "}
              <strong>Autocorreção</strong>
            </span>
            <span
              role="group"
              className="form-switch spanRight mg-0b mg-07t padR5v pdT05v"
              id="autofillDivCons"
            >
              <input
                type="checkbox"
                className="deActBtn form-check-input"
                role="switch"
                id="deactAutofilltBtnCons"
                title="Correção automática de CPF, Telefone e E-mail"
                data-title="Autopreenchimento(Consulta)"
                ref={switchAFConsRef}
                onChange={() => toggleAFCons(isAutofillConsOn)}
              />{" "}
              <strong>Autopreenchimento</strong>
            </span>
          </div>
          <button
            className="btn btn-close forceInvert mg-30b600Q"
            onClick={onClose}
          ></button>
        </div>
        <fieldset className="flexNoWC">
          <hr />
          <fieldset className="flexWC" id="bodyRegsPac">
            <section className="flexWC" id="inpsRegsPacSec">
              <div role="group" className="flexWR" id="cpfPacDiv">
                <div
                  role="group"
                  className="flexNoWC flexBasis100"
                  id="cpfTitledInpDiv"
                >
                  <label className="stLab" id="hCpfPac" htmlFor="inpCPFPac">
                    CPF do Paciente:
                  </label>
                  <div
                    role="group"
                    className="flexNoWRSwitch cGap5"
                    id="cpfBodyDiv"
                  >
                    <input
                      type="text"
                      id="inpCPFPac"
                      name="CPFPac-in"
                      list="listCPFPacCons"
                      maxLength={15}
                      pattern="^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$"
                      className="form-control d-ibl noInvert minText ssPersist"
                      placeholder="Preencha com o CPF"
                      autoComplete="username"
                      data-title="CPF Paciente"
                      data-aloc="cpf-pac"
                      data-reqlength="14"
                      ref={CPFPacInpRef}
                    />
                    <datalist id="listCPFPacCons">
                      <option value="123.456.789-10">José</option>
                      <option value="898.320.932-56">Maria</option>
                      <option value="329.139.032-55">Pedro</option>
                    </datalist>
                    <span className="hovBlock">
                      <button
                        type="button"
                        formMethod="get"
                        formAction="#"
                        className="btn btn-primary hBsFormLike"
                        id="autoFillCPFPacBtn"
                        ref={CPFPacBtnRef}
                        onClick={handleCPFBtnClick}
                      >
                        <small role="textbox">Preencher Dados com CPF</small>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div role="group" className="flexWR" id="firstNameDiv">
                <div
                  role="group"
                  className="flexNoWC flexBasis100 noInvert"
                  id="firstNameDiv"
                >
                  <label
                    className="stLab noInvert"
                    id="hFirstName"
                    htmlFor="firstNamePac"
                  >
                    Primeiro Nome:
                  </label>
                  <div
                    role="group"
                    className="flexNoWRSwitch cGap5"
                    id="firstNamePacBody"
                  >
                    <input
                      type="text"
                      list="listFirstNameCons"
                      maxLength={99}
                      placeholder="Preencha com o Primeiro Nome do Paciente"
                      className="form-control minText ssPersist"
                      id="firstNamePac"
                      name="NamePac-in"
                      autoComplete="given-name"
                      autoCapitalize="true"
                      data-title="Primeiro Nome Paciente"
                      data-reqlength="3"
                      data-aloc="firstname-pac"
                    />
                    <datalist id="listFirstNameCons">
                      <option value="José"></option>
                      <option value="Maria"></option>
                      <option value="Pedro"></option>
                    </datalist>
                    <button
                      type="button"
                      id="btnShowAvStuds"
                      className="btn btn-primary hBsFormLike forceInvert"
                      formMethod="get"
                      formAction="#"
                      ref={pacBtnRef}
                      onClick={() => togglePacFiller(shouldDisplayPacList)}
                    >
                      <small role="textbox">Consultar Lista de Pacientes</small>
                    </button>
                  </div>
                </div>
                {shouldDisplayPacList && (
                  <AvPacListDlg
                    onClick={(shouldDisplayPacList: boolean) => {
                      togglePacFiller(shouldDisplayPacList);
                    }}
                    shouldDisplayPacList={shouldDisplayPacList}
                    mainDlgRef={dialogRef}
                    shouldShowAlocBtn={true}
                    userClass={userClass}
                  />
                )}
              </div>
              <div role="group" className="flexWR noInvert" id="familyNameDiv">
                <label
                  className="stLab"
                  id="hFamilyName"
                  htmlFor="familyNamePac"
                >
                  Sobrenome(s):
                </label>
                <input
                  type="text"
                  maxLength={99}
                  placeholder="Preencha com Sobrenome(s) do Paciente"
                  className="form-control autocorrectAll ssPersist"
                  id="familyNamePac"
                  autoComplete="family-name"
                  autoCapitalize="true"
                  data-title="Sobrenome Paciente"
                  data-aloc="familyname-pac"
                />
              </div>
              <div role="group" className="flexWR cGap5" id="telPacDiv">
                <div
                  role="group"
                  className="flexNoWC flexBasis100"
                  id="telTitledInpDiv"
                >
                  <label className="stLab" id="hTelPac" htmlFor="inpTelPac">
                    Telefone do Paciente:
                  </label>
                  <div role="group" className="flexNoWR cGap1v" id="telBodyDiv">
                    <input
                      type="number"
                      id="nacPac"
                      maxLength={4}
                      pattern="^+?\d{2}$"
                      className="form-control d-ibl tel-national noInvert ssPersist"
                      placeholder="+55?"
                      autoComplete="tel-national"
                      data-title="Código Nacional Paciente"
                      data-aloc="nac-pac"
                    ></input>
                    <input
                      type="number"
                      id="DDDPac"
                      maxLength={5}
                      pattern="^\(?\d{2}\)?$"
                      className="form-control d-ibl noInvert ssPersist"
                      placeholder="DDD"
                      autoComplete="tel-area-code"
                      data-title="DDD Paciente"
                      data-aloc="ddd-pac"
                    ></input>
                    <input
                      type="tel"
                      id="inpTelPac"
                      list="listTelPacCons"
                      maxLength={20}
                      pattern="^\d{4,5}-?\d{4}$"
                      className="form-control d-ibl noInvert minText ssPersist"
                      placeholder="Preencha com o Telefone (sem código nacional e DDD) de Contato"
                      autoComplete="tel-local"
                      data-title="Tel Paciente"
                      ref={telPacInpRef}
                      data-reqlength="8"
                      data-aloc="tel-pac"
                    />
                  </div>
                </div>
              </div>
              <div role="group" className="flexWR" id="emailPacDiv">
                <label className="stLab" id="hFirstName" htmlFor="emailPac">
                  E-mail do Paciente:
                </label>
                <input
                  type="email"
                  maxLength={99}
                  placeholder="Preencha com o E-mail do Paciente"
                  className="form-control noInvert ssPersist"
                  id="emailPac"
                  name="emailPac-in"
                  autoComplete="email"
                  data-title="Email Paciente"
                  data-aloc="email-pac"
                />
              </div>
              <div role="group" className="flexWR" id="statusPacDiv">
                <label className="stLab" id="hStatusPac" htmlFor="statusPac">
                  Status do Paciente:
                </label>
                <select
                  className="form-select noInvert ssPersist"
                  id="statusPac"
                  name="statusPac-in"
                  data-title="Status Paciente"
                  data-aloc="status-pac"
                  required
                >
                  <option value="avaliacao">Em Avaliação Inicial</option>
                  <option value="tratamento">Em Tratamento Geral</option>
                  <option value="emergência">Em emergência</option>
                  <option value="altaOdontologia">Alta — Odontologia</option>
                  <option value="altaEducacaoFisica">
                    Alta — Educação Física
                  </option>
                  <option value="altaNutricao">Alta — Nutrição</option>
                  <option value="altaOdontologiaEducaoFisica">
                    Alta — Odontologia — Educação Física
                  </option>
                  <option value="altaOdontologiaNutricao">
                    Alta — Odontologia — Nutrição
                  </option>
                  <option value="altaEducaoFisicaNutricao">
                    Alta — Educação Física — Nutrição
                  </option>
                  <option value="altaOdontologiaEducacaoFisicaNutricao">
                    Alta Geral
                  </option>
                </select>
              </div>
              <div role="group" className="flexWR noInvert" id="consDiv">
                <label className="stLab" id="hTypeCons" htmlFor="typeConsSel">
                  Tipo da Consulta:
                </label>
                <select
                  id="typeConsSel"
                  name="typeCons-in"
                  className="form-select ssPersist"
                  data-title="Tipo da Consulta"
                  // required
                >
                  <optgroup label="Geral">
                    <option value="anamnese">Anamnese e Exame Clínico</option>
                    <option value="retorno">Retorno e Reavaliação</option>
                  </optgroup>
                  <optgroup label="Odontologia">
                    <option value="exodontia">Exodontia</option>
                    <option value="profilaxia">Profilaxia e Orientação</option>
                    <option value="raspagem">Raspagem</option>
                    <option value="rcarie">Remoção de Cárie</option>
                  </optgroup>
                  <optgroup label="Educação Física & Nutrição">
                    <option value="acompanhamento">Acompanhamento Geral</option>
                    <option value="analise">
                      Análise de Exames Bioquímico
                    </option>
                    <option value="diagnostico">Diagnóstico Nutricional</option>
                    <option value="avaliacao">Avaliação Antropométrica</option>
                    <option value="recordatorio">Recordatório Alimentar</option>
                    <option value="suplementacao">
                      Suplementação e Plano Alimentar
                    </option>
                  </optgroup>
                  <optgroup label="Psicanálise"></optgroup>
                </select>
              </div>
              <div role="group" className="flexWR" id="relStudDiv">
                <div
                  role="group"
                  className="flexNoWC flexBasis100"
                  id="alocStudTitledDiv"
                >
                  <label className="stLab" id="hRelStud" htmlFor="alocStudDiv">
                    Estudante alocado:
                  </label>
                  <div
                    role="group"
                    className="flexNoWRSwitch cGap5"
                    id="alocStudDiv"
                  >
                    <input
                      type="text"
                      id="relStudName"
                      name="relStud-in"
                      list="avStuds"
                      className="form-control noInvert ssPersist"
                      maxLength={99}
                      placeholder="Preencha com o Nome do Estudante alocado"
                      autoComplete="given-name"
                      data-title="Nome do Estudante Alocado"
                    />
                    <datalist id="avStuds">
                      REGISTO DE ESTUDANTES
                      <optgroup label="Odontologia">
                        <option value="Maria Eduarda Augusta">
                          Odontologia
                        </option>
                        <option value="Josefina Guedes Pereira">
                          Odontologia
                        </option>
                      </optgroup>
                      <optgroup label="Educação Física & Nutrição">
                        <option value="Augusto Duarte Fonseca">
                          Educação Física
                        </option>
                      </optgroup>
                      <optgroup label="Psiquiatria e Psicologia"></optgroup>
                    </datalist>
                    <button
                      type="button"
                      formMethod="get"
                      formAction="#"
                      className="btn btn-primary hBsFormLike"
                      id="autoFillDREBtn"
                      onClick={() => toggleDREFiller()}
                    >
                      <small role="textbox">Capturar por Identificadores</small>
                    </button>
                  </div>
                </div>
                {isDREFillerActive && (
                  <DREFiller forwardedRef={dialogRef} userClass={userClass} />
                )}
                <div
                  role="group"
                  className="flexNoWC flexBasis100"
                  id="respTitledInpDiv"
                >
                  <label className="stLab" id="hRelResp" htmlFor="relProfName">
                    Professor ou Profissional Responsável alocado:
                  </label>
                  <div
                    role="group"
                    className="flexNoWRSwitch cGap5"
                    id="respBodyDiv"
                  >
                    <input
                      type="text"
                      id="relProfName"
                      name="relProf-in"
                      list="avProfsResps"
                      className="form-control noInvert minText ssPersist"
                      maxLength={99}
                      placeholder="Preencha com o Nome do Profissional Responsável alocado"
                      autoComplete="given-name"
                      data-title="Nome do Profissional Responsável Alocado"
                      data-reqlength="3"
                    />
                    <datalist id="avProfs">
                      REGISTO DE PROFISSIONAIS:
                      <optgroup label="Odontologia">
                        <option value="Ângela Celeste Barreto de Azevedo">
                          Odontologia
                        </option>
                      </optgroup>
                      <optgroup label="Educação Física"></optgroup>
                      <optgroup label="Nutrição">
                        <option value="Aline Martinez">Nutrição</option>
                      </optgroup>
                      <optgroup label="Psiquiatria e Psicologia"></optgroup>
                    </datalist>
                    <button
                      type="button"
                      className="btn btn-primary hBsFormLike"
                      id="autoFillCPFRespBtn"
                      ref={CPFProfBtnRef}
                      onClick={() =>
                        toggleCPFFiller(CPFProfBtnRef, isCPFFillerActive)
                      }
                    >
                      <small role="textbox">
                        Consultar Lista de Profissionais
                      </small>
                    </button>
                  </div>
                </div>
                {isCPFFillerActive && (
                  <AvProfListDlg
                    onClick={() =>
                      toggleCPFFiller(CPFProfBtnRef, isCPFFillerActive)
                    }
                    mainDlgRef={dialogRef}
                    btnProf={CPFPacBtnRef.current}
                    isCPFFillerActive={isCPFFillerActive}
                    userClass={userClass}
                  />
                )}
              </div>
              <div
                role="group"
                className="flexWR gapped1v flexAlItCt noInvert"
                id="confirmPacDiv"
              >
                <label
                  className="stLab checkGreen mdGreen"
                  id="hConfirmPac"
                  htmlFor="confirmPac"
                >
                  Paciente Confirmado:
                </label>
                <input
                  type="checkbox"
                  id="confirmPac"
                  name="check-in"
                  className="form-check-input mg-09t mg-1-3b"
                  data-title="Confirmação do Paciente"
                />
              </div>
              <div role="group" className="flexWR gapped1v flexAlItCt noInvert">
                <label htmlFor="notesCons" className="bolded">
                  Notas:
                </label>
                <textarea
                  className="form-control"
                  id="notesCons"
                  name="notes-in"
                  autoCapitalize="true"
                  placeholder="Insira aqui observações adicionais sobre a consulta"
                  data-title="Notas e Observações"
                ></textarea>
              </div>
            </section>
            <hr />
            <section
              className="flexNoWR cGap5 rGapQ4602v flexJC flexQ460NoWC"
              id="btnsRegsPacSec"
            >
              <div
                role="group"
                className="flexWR flexAlItCt flexJSb widHalf widQ460MinFull noInvert"
                id="divSubmitPac"
              >
                <button
                  type="submit"
                  id="submitPacBtn"
                  className="btn btn-success widFull"
                  ref={submitRef}
                  onClick={ev => {
                    if (
                      subForm(
                        ev.currentTarget,
                        dialogRef.current ??
                          ev.currentTarget.closest("dialog") ??
                          document
                      )
                    ) {
                      //acumulador é alinhado com o de contexto dos diálogos de consulta no handler comum
                      accFormData =
                        document.querySelectorAll(".appointmentBtn").length + 1;
                      console.log("Given index: " + accFormData);
                      providerFormData[accFormData] = generateSchedPacData(
                        dialogRef.current ?? ev.currentTarget.closest("dialog")
                      );
                      generateSchedBtn(
                        dialogRef.current ?? ev.currentTarget.closest("dialog")
                      );
                    }
                    subForm(submitRef.current, dialogRef.current ?? document) &&
                      onClose();
                  }}
                >
                  <small role="textbox">
                    <em>
                      <strong>Finalizar</strong>
                    </em>
                  </small>
                </button>
              </div>
              <div
                role="group"
                className="flexWR flexAlItCt flexJSb widHalf widQ460MinFull"
                id="divExportPac"
              >
                <button
                  type="button"
                  id="btnExportRegst"
                  className="btn btn-primary widFull"
                  ref={exportRef}
                  title="Gere um .xlsx com os dados preenchidos"
                >
                  <small role="textbox">
                    <em className="bolded">Gerar Planilha</em>
                  </small>
                </button>
              </div>
            </section>
          </fieldset>
        </fieldset>
      </ErrorBoundary>
    </dialog>
  );
}
