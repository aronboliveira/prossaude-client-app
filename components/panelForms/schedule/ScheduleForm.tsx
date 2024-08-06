"use client";
// import { DataProvider } from "../../../src/lib/locals/panelPage/declarations/classesCons";
import { ErrorBoundary } from "react-error-boundary";
import { ScheduleFormProps } from "../../../src/lib/locals/panelPage/declarations/interfacesCons";
import { addListenerExportBtn } from "../../../src/lib/global/gController";
import { fillScheduleState } from "../../../src/lib/locals/panelPage/consController";
import { globalDataProvider, panelRoots } from "../defs/client/SelectPanel";
import { handleClientPermissions } from "../../../src/lib/locals/panelPage/handlers/consHandlerUsers";
import { handleSubmit } from "@/pages/api/ts/handlers";
import { useState, useRef, useEffect, useCallback, JSX } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import RegstConsBtn from "./RegstConsBtn";
import ReseterBtn from "../defs/ReseterBtn";
import ThDate from "./ThDate";
import TrBSchedTab from "./TrBSchedTab";
import {
  clearPhDates,
  equalizeFlexSibilings,
  equalizeWidWithPhs,
  addListenerForValidities,
  normalizeSizeSb,
} from "../../../src/lib/global/gStyleScript";
import {
  extLine,
  inputNotFound,
  elementNotFound,
  elementNotPopulated,
} from "../../../src/lib/global/handlers/errorHandler";
import {
  nullishSel,
  nullishForm,
  nullishBtn,
  validSchedHours,
} from "../../../src/lib/global/declarations/types";
import {
  correlateDayOpts,
  setListenersForDates,
} from "../../../src/lib/locals/panelPage/consStyleScript";
import {
  addListenerForSchedUpdates,
  checkConfirmApt,
  fillSchedStateValues,
  handleScheduleChange,
  rootDlgContext,
} from "../../../src/lib/locals/panelPage/handlers/consHandlerCmn";
import {
  syncAriaStates,
  validateForm,
} from "../../../src/lib/global/handlers/gHandlers";
import {
  scheduleReset,
  panelFormsVariables,
  sessionScheduleState,
} from "../panelFormsData";
import FormDlg from "../../consRegst/FormDlg";

export const scheduleProps: { autoSaving: boolean } = {
  autoSaving: true,
};

export default function ScheduleForm({
  mainRoot,
  userClass = "estudante",
}: ScheduleFormProps): JSX.Element {
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const hours: validSchedHours[] = [18, 19, 20, 21];
  const handleResize = (): void => {
    if (innerWidth === 900 || innerWidth === 600 || innerWidth === 460) {
      normalizeSizeSb(
        [
          ...document.querySelectorAll(".form-padded"),
          ...document.querySelectorAll(".ovFlAut"),
          ...document.querySelectorAll("[scrollbar-width=none]"),
          ...document.querySelectorAll("table"),
        ],
        [true, 1],
        true,
        [document.getElementById("formBodySchedSect")]
      );
    }
  };
  const [showForm] = useState(true);
  const formRef = useRef<nullishForm>(null);
  const workingDefinitionsRef = useRef<HTMLDivElement | null>(null);
  const monthRef = useRef<nullishSel>(null);
  const btnExportSchedRef = useRef<nullishBtn>(null);
  const [pressState, setTogglePress] = useState<boolean>(false);
  const toggleForm = (): void => setTogglePress(() => !pressState);
  const formCallback = useCallback((form: nullishForm) => {
    if (form instanceof HTMLFormElement) {
      //adição de listeners para confirmação de agendamentos
      const confirmRegst = document.getElementById("confirmDayInp");
      if (
        confirmRegst instanceof HTMLInputElement &&
        (confirmRegst.type === "checkbox" || confirmRegst.type === "radio")
      ) {
        (userClass === "coordenador" || userClass === "supervisor") &&
          confirmRegst.addEventListener("change", () => {
            const relAptBtn = document.querySelector("[id*=appointmentBtn]");
            if (relAptBtn instanceof HTMLElement) {
              if (confirmRegst.checked) {
                relAptBtn.classList.remove("btn-info");
                relAptBtn.classList.add("btn-success");
              } else {
                relAptBtn.classList.remove("btn-success");
                relAptBtn.classList.add("btn-info");
              }
            } else
              console.warn(
                `No related button for day checkbox id ${confirmRegst.id}`
              );
          });
      } else
        elementNotFound(
          confirmRegst,
          "Check for confirming worked day of appointment",
          extLine(new Error())
        );
      const registDayBtn = form.querySelector("#regstDayBtn");
      if (registDayBtn instanceof HTMLButtonElement) {
        registDayBtn.disabled = true;
      } else
        elementNotFound(
          registDayBtn,
          "Button for completing day of appointment in schedule form",
          extLine(new Error())
        );
      //adição de listeners para drag events
      const dayChecks = form.querySelectorAll('input[class*="apptCheck"]');
      if (dayChecks.length > 0) {
        dayChecks.forEach(dayCheck => {
          (userClass === "coordenador" || userClass === "supervisor") &&
            dayCheck.addEventListener("change", () => {
              dayCheck instanceof HTMLInputElement &&
              (dayCheck.type === "checkbox" || dayCheck.type === "radio")
                ? checkConfirmApt(dayCheck)
                : inputNotFound(
                    dayCheck,
                    `dayCheck id ${dayCheck?.id || "UNIDENTIFIED"}`,
                    extLine(new Error())
                  );
            });
        });
      } else
        elementNotPopulated(
          dayChecks,
          "Checkboxes for day checks",
          extLine(new Error())
        );
      //adição de listeners para apagar botões na agenda
      const btnEraseTransfApt = document.getElementById("btnEraseTransfApt");
      if (btnEraseTransfApt instanceof HTMLButtonElement) {
        btnEraseTransfApt.addEventListener("click", () => {
          const transfArea = document.getElementById("transfArea");
          if (transfArea instanceof HTMLElement) {
            if (
              !transfArea.hasChildNodes() ||
              transfArea.innerHTML === `` ||
              transfArea.childElementCount === 1 ||
              !transfArea.querySelector("slot")
            ) {
              if (transfArea.querySelector('[id*="appointmentBtn"]')) {
                transfArea.replaceChild(
                  Object.assign(document.createElement("slot"), {
                    id: "replaceSlot",
                    textContent: "Área de transferência",
                    className: "opaqueEl",
                    color: "#0981714d",
                    title:
                      "Aqui é incluído o botão de uma consulta recém-criada",
                  }),
                  transfArea.querySelector('[id*="appointmentBtn"]')!
                );
              } else {
                elementNotFound(
                  transfArea,
                  "Element for appointment transference slot in handleDragAptBtn()",
                  extLine(new Error())
                );
                if (!transfArea.querySelector("slot")) {
                  transfArea.appendChild(
                    Object.assign(document.createElement("slot"), {
                      id: "replaceSlot",
                      textContent: "Área de transferência",
                      className: "opaqueEl",
                      color: "#0981714d",
                    })
                  );
                }
              }
            }
          }
        });
      } else
        elementNotFound(
          btnEraseTransfApt,
          "Button for erasing new appointment button in transference",
          extLine(new Error())
        );
      //adição de listeners para exportação de excel
      const btnExportSched =
        btnExportSchedRef.current || form.querySelector("#btnExport");
      btnExportSched instanceof HTMLButtonElement
        ? addListenerExportBtn(
            "Agenda",
            form,
            document.getElementById("hSched") || form
          )
        : elementNotFound(
            btnExportSched,
            "Button for generating spreadsheet in schedule form",
            extLine(new Error())
          );
      //ajustes de estilo
      clearPhDates(Array.from(form.querySelectorAll('input[type="date"]')));
      equalizeWidWithPhs([
        ...Array.from(form.querySelectorAll("input")).filter(
          inp =>
            inp.type === "text" ||
            inp.type === "number" ||
            inp.type === "date" ||
            inp.type === "search" ||
            inp.type === "hour"
        ),
        ...form.querySelectorAll("select"),
        ...form.querySelectorAll("textarea"),
      ]);
      setTimeout(() => {
        const ancestorForTwins = form.querySelectorAll(
          '[class*="ancestorTwins"]'
        );
        if (ancestorForTwins.length > 0) {
          ancestorForTwins.forEach(ancestor => {
            equalizeFlexSibilings(
              ancestor.querySelectorAll('[class*="flexTwin"]'),
              [["height", "px"]]
            );
          });
        }
      }, 300);
      const hourInp =
        form.querySelector("#hourDayInp") ??
        form.querySelector('input[type="hour"]');
      hourInp instanceof HTMLInputElement && hourInp.type === "time"
        ? (hourInp.value = "18:00")
        : inputNotFound(
            hourInp,
            "hourInp in form for schedule",
            extLine(new Error())
          );
    } else
      elementNotFound(
        form,
        "formRef for callbackFormSchedule()",
        extLine(new Error())
      );
    normalizeSizeSb(
      [
        ...document.querySelectorAll(".form-padded"),
        ...document.querySelectorAll(".ovFlAut"),
        ...document.querySelectorAll("[scrollbar-width=none]"),
        ...document.querySelectorAll("table"),
      ],
      [true, 1],
      true,
      [document.getElementById("formBodySchedSect")]
    );
    const daysCont = document.getElementById("mainConsDaysCont");
    if (daysCont instanceof HTMLElement)
      scheduleReset[`outerHTML`] = daysCont.outerHTML;
    else
      setTimeout(() => {
        const daysCont = document.getElementById("mainConsDaysCont");
        if (daysCont instanceof HTMLElement)
          scheduleReset[`outerHTML`] = daysCont.outerHTML;
      }, 200);
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    /new-cons=open/gi.test(location.search) && setTogglePress(true);
  }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLElement) {
      //chamada de callback principal do form de agenda e inclusão de aria
      formCallback(formRef.current);
      syncAriaStates([
        ...formRef.current!.querySelectorAll("*"),
        formRef.current,
      ]);
      // const scheduleDataProvider = new DataProvider(
      //   DataProvider.persistSessionEntries(formRef.current)
      // );
      globalDataProvider &&
        globalDataProvider.initPersist(formRef.current, globalDataProvider);
      const saveInterv = setInterval(() => {
        try {
          if (!(formRef.current instanceof HTMLFormElement))
            throw elementNotFound(
              formRef.current,
              `Validation of Form instance`,
              extLine(new Error())
            );
          validateForm(formRef.current, formRef.current).then(validation =>
            handleSubmit("schedule", validation[2], true)
          );
        } catch (e) {
          console.error(
            `Error executing interval for saving schedule at ${new Date().getMinutes()}:\n${
              (e as Error).message
            }`
          );
        }
      }, 60000);
      return () => clearInterval(saveInterv);
    } else
      elementNotFound(
        formRef.current,
        `formRef for useEffect() in ${ScheduleForm.name}`,
        extLine(new Error())
      );
  }, [formRef]);
  useEffect(() => {
    if (
      workingDefinitionsRef?.current instanceof HTMLElement &&
      workingDefinitionsRef.current.id.match(/working/gi)
    ) {
      //adição de listeners para autoajuste de atributos da agenda
      const inpDates = Array.from<HTMLInputElement>(
        formRef.current!.querySelectorAll(".dayTabRef")
      );
      const toggleAutofillMonth =
        workingDefinitionsRef.current.querySelector("#toggleAutofillMonth") ||
        workingDefinitionsRef.current.querySelector('input[type="checkbox"]');
      if (
        toggleAutofillMonth instanceof HTMLInputElement &&
        (toggleAutofillMonth.type === "checkbox" ||
          toggleAutofillMonth.type === "radio")
      ) {
        panelFormsVariables.isAutoFillMonthOn = true;
        toggleAutofillMonth.checked = true;
        toggleAutofillMonth.addEventListener("change", () => {
          panelFormsVariables.isAutoFillMonthOn =
            !panelFormsVariables.isAutoFillMonthOn;
          if (panelFormsVariables.isAutoFillMonthOn)
            setListenersForDates(
              inpDates,
              document.getElementById("monthSelector"),
              panelFormsVariables.isAutoFillMonthOn,
              false
            );
        });
      } else
        inputNotFound(
          toggleAutofillMonth,
          "Input for toggling autofill in working month",
          extLine(new Error())
        );
      const firstOrderWorkDay = document.getElementById("firstWorkingDay");
      const secondOrderWorkDay = document.getElementById("secondWorkingDay");
      if (
        firstOrderWorkDay instanceof HTMLSelectElement ||
        firstOrderWorkDay instanceof HTMLInputElement
      ) {
        firstOrderWorkDay.value = "Quarta-feira";
        userClass === "coordenador" &&
          firstOrderWorkDay.addEventListener("change", () => {
            if (panelFormsVariables.isAutoFillMonthOn)
              setListenersForDates(
                inpDates,
                document.getElementById("monthSelector"),
                panelFormsVariables.isAutoFillMonthOn,
                false
              );
          });
      }
      if (
        secondOrderWorkDay instanceof HTMLSelectElement ||
        secondOrderWorkDay instanceof HTMLInputElement
      ) {
        secondOrderWorkDay.value = "Sexta-feira";
        userClass === "coordenador" &&
          secondOrderWorkDay.addEventListener("change", () => {
            if (panelFormsVariables.isAutoFillMonthOn)
              setListenersForDates(
                inpDates,
                document.getElementById("monthSelector"),
                panelFormsVariables.isAutoFillMonthOn,
                false
              );
          });
      }
    } else
      elementNotFound(
        workingDefinitionsRef.current,
        "workingDefinitionsRef.current in useEffect()",
        extLine(new Error())
      );
  }, [workingDefinitionsRef]);
  useEffect(() => {
    if (
      formRef.current instanceof HTMLFormElement &&
      monthRef?.current instanceof HTMLSelectElement
    ) {
      //adição de listeners para autoajuste de opções e validação de datas
      const inpDates = Array.from<HTMLInputElement>(
        formRef.current!.querySelectorAll(".dayTabRef")
      );
      setListenersForDates(
        inpDates,
        document.getElementById("monthSelector"),
        panelFormsVariables.isAutoFillMonthOn,
        true
      ).then(([monthPattern]) => {
        addListenerForValidities(inpDates, monthPattern);
      });
      correlateDayOpts(
        Array.from(document.querySelectorAll(".dayTabRef")),
        document.getElementById("changeDaySel"),
        userClass
      );
    } else {
      inputNotFound(
        monthRef.current,
        `monthRef in useEffect()
        parentForm present: ${formRef instanceof HTMLFormElement}`,
        extLine(new Error())
      );
    }
  }, [monthRef]);
  useEffect(() => {
    //populando inicialmente o array de state para agenda, tirando as mensagens default de erro
    //os states das agendas começam iguais e vão sendo atualizados com a sessionStorage e change no monthSelector
    if (fillScheduleState.acc === 0) {
      const Def = document.getElementById("tbSchedule")?.innerHTML || (
        <GenericErrorComponent message={"Erro obtendo Tabela de Agenda"} />
      );
      [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ].forEach(month => {
        sessionScheduleState[month] = Def;
        fillSchedStateValues(month);
        //adição de events para atualizar state da agenda relativa ao mês toda vez que houver mudança em algum input/select/textarea/slot
        addListenerForSchedUpdates(
          monthRef.current || document.getElementById("monthSelector")
        );
      });
      fillScheduleState.acc = fillScheduleState.acc++;
    }
    //controle de classes
    if (formRef.current instanceof HTMLElement) {
      handleClientPermissions(
        userClass,
        ["supervisor", "coordenador"],
        document.getElementById("confirmDayInp"),
        ...document.querySelectorAll(".apptCheck"),
        ...document.querySelectorAll(".eraseAptBtn")
      );
      handleClientPermissions(
        userClass,
        ["coordenador"],
        document.getElementById("firstWorkingDay"),
        document.getElementById("secondWorkingDay"),
        document.getElementById("btnResetTab"),
        ...document.querySelectorAll(".dayTabRef")
      );
    }
  }, [formRef, userClass]);
  useEffect(() => {
    const confInterv = setInterval(interv => {
      const confCons = document.getElementById("confirmDayInp");
      if (!(confCons instanceof HTMLInputElement)) {
        clearInterval(interv);
        return;
      }
      if (
        document.getElementById("transfArea")?.querySelector(".appointmentBtn")
      )
        confCons.disabled = false;
      else confCons.disabled = true;
    }, 200);
    const regstInterv = setInterval(interv => {
      const regstDay = document.getElementById("regstDayBtn");
      if (!(regstDay instanceof HTMLButtonElement)) {
        clearInterval(interv);
        return;
      }
      if (
        document.getElementById("transfArea")?.querySelector(".appointmentBtn")
      )
        regstDay.disabled = false;
      else regstDay.disabled = true;
    }, 200);
    let aptIntervs: any[] = [],
      slotsIntervs: any[] = [],
      transfInterv: any;
    [
      ...document.querySelectorAll(".apptCheck"),
      ...document.querySelectorAll(".eraseAptBtn"),
    ].forEach(aptBtn => {
      const aptInterv = setInterval((interv: any) => {
        if (
          !(
            aptBtn instanceof HTMLButtonElement ||
            aptBtn instanceof HTMLInputElement
          ) ||
          !(userClass === "coordenador" || userClass === "supervisor")
        ) {
          clearInterval(interv);
          return;
        }
        if (!aptBtn.closest(".consSlot")?.querySelector(".appointmentBtn"))
          aptBtn.disabled = true;
        else aptBtn.disabled = false;
      }, 200);
      aptIntervs.push(aptInterv);
    });
    document.querySelectorAll(".consSlot").forEach(slot => {
      const slotInterv = setInterval(() => {
        if (
          !slot.querySelector(".appointmentBtn") &&
          !slot.querySelector(".slotableDay")
        ) {
          const replaceInp = document.createElement("input");
          replaceInp.classList.add(
            "transparent-el",
            "slotableDay",
            "opaque-bluish",
            "wid100",
            "form-control"
          );
          replaceInp.id = slot.id.replace("slot", "");
          replaceInp.placeholder = `Horário Livre`;
          replaceInp.ariaPlaceholder = "Horário Livre";
          replaceInp.style.minWidth = "21ch";
          replaceInp.ariaHidden = "false";
          replaceInp.ariaRequired = "false";
          replaceInp.ariaInvalid = "false";
          slot.prepend(replaceInp);
        }
      }, 200);
      slotsIntervs.push(slotInterv);
    });
    try {
      const transfArea = document.getElementById("transfArea");
      if (!(transfArea instanceof HTMLElement))
        throw elementNotFound(
          transfArea,
          `Transference Element`,
          extLine(new Error())
        );
      transfInterv = setInterval(() => {
        if (!transfArea.querySelector(".appointmentBtn")) {
          const slot = transfArea.querySelector("slot");
          if (!slot) {
            const replaceSlot = document.createElement("slot");
            replaceSlot.classList.add("opaqueEl", "ssPersist");
            replaceSlot.id = "replaceSlot";
            replaceSlot.title =
              "Aqui é incluído o botão de uma consulta recém-criada";
            replaceSlot.ariaHidden = "false";
            replaceSlot.innerText = "Área de transferência";
            transfArea.prepend(replaceSlot);
          } else if (slot.innerText === "")
            slot.innerText = "Área de transferência";
        }
      }, 200);
    } catch (e) {
      console.error(
        `Error executing procedure for adding interval to Transference Area:\n${
          (e as Error).message
        }`
      );
    }
    return () => {
      try {
        clearInterval(confInterv);
        clearInterval(regstInterv);
        for (const aptInterv of aptIntervs) clearInterval(aptInterv);
        for (const slotInterv of slotsIntervs) clearInterval(slotInterv);
        document.getElementById("transfArea") &&
          transfInterv &&
          clearInterval(transfInterv);
      } catch (e) {
        console.error(
          `Error clearing intervals for Schedule:\n${(e as Error).message}`
        );
      }
    };
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Erro carregando agenda!" />
      )}
    >
      {showForm && (
        <div role="group" className="form-padded--vis wid101">
          <form
            id="formSched"
            className="widFull"
            name="schedule_form"
            encType="application/x-www-form-urlencoded"
            action="schedule_form"
            method="post"
            target="_top"
            ref={formRef}
          >
            <section
              id="formHSchedSect"
              className="mg-3b widMaxFullView ovFlAut-fix flexNoW flexQ900NoWC flexAlItCt cGap2v rGapQ9002v noInvert"
            >
              <h1 id="hSched" className="wsBs bolded">
                <strong>Atendimento Diário</strong>
              </h1>
              <button
                type="button"
                className="btn btn-success widFull900Q widQ460MinFull htMaxBSControl forceInvert bolded"
                id="addAppointBtn"
                onClick={toggleForm}
                title="Preencha um formulário para gerar a ficha de uma nova consulta"
              >
                Adicionar Consulta
              </button>
            </section>
            <small role="textbox">
              <em className="wsBs">
                Insira aqui informações sobre uma nova consulta ou confira a
                tabela de agendamentos
              </em>
            </small>
            <hr />
            <section id="formDayBodySchedSect" className="widMaxFullView">
              <section className="flexNoW flexJSt flexQ900NoWC rGapQ9002v">
                <section className="flexJC flexAlItSt flexNoWC flexBasis75 padR5v">
                  <fieldset
                    className="flexJSt flexAlItCt flexBasis75 cGap2v ancestorTwins flexTwin-height widQ900MinFull flexQ460NoWC"
                    id="schedHourFs"
                  >
                    <div
                      role="group"
                      className="flexLineDiv flexQ900NoWC widQ460MinFull widHalf900Q rGapQ900null"
                      id="changeDayDiv"
                    >
                      <label
                        className="boldLabel mg-09t"
                        htmlFor="changeDaySel"
                      >
                        Dia de Inclusão:
                      </label>
                      <select
                        className="form-select widMin75Q460v ssPersist"
                        id="changeDaySel"
                        title="Selecione aqui o dia para inclusão dentre os encaixados automaticamente na agenda"
                        data-title="Dia de trabalho para Inclusão"
                      ></select>
                    </div>
                    <div
                      role="group"
                      className="flexLineDiv flexQ900NoWC widQ460MinFull alSfSt widHalf900Q rGapQ900null"
                      id="hourDayDiv"
                    >
                      <label
                        className="boldLabel mg-09t"
                        id="labHourDay"
                        htmlFor="hourDayInp"
                      >
                        Horário do Dia:
                      </label>
                      <input
                        type="time"
                        className="form-control widMin75Q460v ssPersist"
                        id="hourDayInp"
                        title="Selecione aqui o horário na agenda (só funcionará para horários tabelados)"
                        data-title="Horário de trabalho para Inclusão"
                      />
                    </div>
                  </fieldset>
                  <fieldset
                    className="flexJSt flexAlItCt flexBasis25 cGap2v ancestorTwins flexTwin-height"
                    id="schedTabFs"
                  >
                    <div
                      role="group"
                      className="flexLineDiv flexAlItCt900Q flexQ460NoWC flexAlItSt460Q widQ460MinFull flexTwin-height rGapQ2v"
                      id="confirmDayMainDiv"
                    >
                      <div
                        role="group"
                        className="flexNoW flexQ460NoWC cGap1v noInvert"
                      >
                        <label
                          className="boldLabel"
                          id="labConfirmDay"
                          htmlFor="confirmDayInp"
                        >
                          Consulta Confirmada:
                        </label>
                        <div role="group" id="confirmDaySubDiv">
                          <input
                            type="checkbox"
                            className="form-check-input checkGreen mdGreen noInvert invtSignal dkGreen"
                            id="confirmDayInp"
                            title="Confirme aqui uma consulta referenciada na Área de transferência"
                            data-title="Consulta Confirmada"
                            required
                          />
                        </div>
                      </div>
                      <div
                        role="group"
                        id="regstDaySubDiv"
                        className="hovBlock"
                      >
                        <RegstConsBtn
                          rootEl={
                            document.getElementById(
                              "regstDaySubDiv"
                            ) as HTMLElement
                          }
                          secondOp={"Arraste"}
                          userClass={userClass}
                        />
                      </div>
                    </div>
                  </fieldset>
                </section>
                <section
                  className="flexJC flexAlItCt flexNoW flexBasis25 form-control transfArea cGap1v noInvert"
                  id="transfArea"
                >
                  <slot
                    id="replaceSlot"
                    className="opaqueEl ssPersist"
                    title="Aqui é incluído o botão de uma consulta recém-criada"
                  >
                    Área de transferência
                  </slot>
                  <button
                    type="button"
                    className="btn btn-close reduced-btn-close"
                    id="btnEraseTransfApt"
                    title="Resetar a Área de transferêrncia"
                  ></button>
                </section>
              </section>
              <hr />
              <section
                className="flexLineDiv flexQ460NoWC widQ460MinFull widQ900MinFull flexTwin-height widHalf"
                id="workingDefinitionsDiv"
                ref={workingDefinitionsRef}
              >
                <div
                  role="group"
                  className="flexAlItCt flexJSe flexAlItSt flexNoWC flexBasis75 widQ900MinFull"
                >
                  <div
                    role="group"
                    className="flexJBt cGap2v flexQ460NoWC widQ900MinFull flexJtSb900Q"
                  >
                    <div
                      role="group"
                      className="flexJBt cGap1v flexAlItBs flexQ900NoWC widHalf900Q"
                    >
                      <label htmlFor="firstWorkingDay" className="bolded">
                        Primeiro dia de Trabalho:
                      </label>
                      <select
                        id="firstWorkingDay"
                        className="form-select widMin18CImp widFull900Q widMin75Q460v widQ460FullW lcPersist"
                        title="Selecione aqui o primeiro dia de trabalho na semana ou edite manualmente os rótulos na agenda"
                        data-title="Primeiro dia de trabalho na semana"
                      >
                        <option value="Segunda-feira" data-weekday="1">
                          Segunda-feira
                        </option>
                        <option value="Terça-feira" data-weekday="2">
                          Terça-feira
                        </option>
                        <option value="Quarta-feira" data-weekday="3">
                          Quarta-feira
                        </option>
                        <option value="Quinta-feira" data-weekday="4">
                          Quinta-feira
                        </option>
                        <option value="Sexta-feira" data-weekday="5">
                          Sexta-feira
                        </option>
                        <option value="Sábado" data-weekday="6">
                          Sábado
                        </option>
                        <option value="Domingo" data-weekday="0">
                          Domingo
                        </option>
                      </select>
                    </div>
                    <div
                      role="group"
                      className="flexJBt cGap1v flexAlItBs flexQ900NoWC widHalf900Q"
                    >
                      <label htmlFor="secondWorkingDay" className="bolded">
                        Segundo dia de Trabalho:
                      </label>
                      <select
                        id="secondWorkingDay"
                        className="form-select widMin18CImp wid90-900Q widQ460FullW lcPersist"
                        title="Selecione aqui o segundo dia de trabalho na semana ou edite manualmente os rótulos na agenda"
                        data-title="Segundo dia de trabalho na semana"
                      >
                        <option value="Segunda-feira" data-weekday="1">
                          Segunda-feira
                        </option>
                        <option value="Terça-feira" data-weekday="2">
                          Terça-feira
                        </option>
                        <option value="Quarta-feira" data-weekday="3">
                          Quarta-feira
                        </option>
                        <option value="Quinta-feira" data-weekday="4">
                          Quinta-feira
                        </option>
                        <option value="Sexta-feira" data-weekday="5">
                          Sexta-feira
                        </option>
                        <option value="Sábado" data-weekday="6">
                          Sábado
                        </option>
                        <option value="Domingo" data-weekday="0">
                          Domingo
                        </option>
                      </select>
                    </div>
                  </div>
                  <div
                    role="group"
                    className="flexJBt cGap2v flexAlItBs flexAlE900Q flexQ460NoWC flexAlItSt460Q widFull900Q"
                  >
                    <div
                      role="group"
                      className="flexJBt cGap1v flexQ900NoWC widHalf900Q"
                    >
                      <label
                        className="boldLabel mg-09t"
                        htmlFor="monthSelector"
                      >
                        Relação de Pacientes do Mês:
                      </label>
                      <select
                        className="form-select widFull900Q widQ460FullW lcPersist"
                        id="monthSelector"
                        name="working_month"
                        title="Selecione aqui o mês de trabalho"
                        data-title="Mês da tabela de agendamento"
                        ref={monthRef}
                        //Em todo mudança de Month selection, checa o state da agenda do mês e retorna o HTML
                        //aplicando listeners, restrições e chamadas de estilo
                        onChange={() => {
                          try {
                            const monthSelector =
                              monthRef.current ||
                              document.getElementById("monthSelector");
                            if (
                              !(
                                monthSelector instanceof HTMLSelectElement ||
                                monthSelector instanceof HTMLInputElement
                              )
                            )
                              throw inputNotFound(
                                monthSelector,
                                "Month Selector when handling Month state change",
                                extLine(new Error())
                              );
                            const tabRoot =
                              document.getElementById("tbSchedule");
                            if (!(tabRoot instanceof HTMLElement))
                              throw elementNotFound(
                                tabRoot,
                                `Table Schedule Root when handling Month state change`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                sessionScheduleState instanceof Object &&
                                sessionScheduleState.hasOwnProperty(
                                  monthSelector.value
                                )
                              )
                            )
                              throw new Error(
                                `Error validating sessionScheduleState using the monthSelector value reference`
                              );
                            rootDlgContext.addedAptListeners = false;
                            rootDlgContext.addedDayListeners = false;
                            handleScheduleChange(
                              monthRef.current,
                              document.getElementById("tbSchedule"),
                              userClass,
                              panelFormsVariables.isAutoFillMonthOn
                            );
                            try {
                              const lastConsDayCont =
                                document.querySelector(".lastConsDayCont");
                              if (!(lastConsDayCont instanceof HTMLElement))
                                throw elementNotFound(
                                  lastConsDayCont,
                                  `Last Table Head Cel`,
                                  extLine(new Error())
                                );
                              if (
                                getComputedStyle(lastConsDayCont).display ===
                                  "none" ||
                                lastConsDayCont.hidden === true
                              ) {
                                const tbSchedule =
                                  document.getElementById("tbSchedule");
                                if (!(tbSchedule instanceof HTMLElement))
                                  throw elementNotFound(
                                    tbSchedule,
                                    `Table Body`,
                                    extLine(new Error())
                                  );
                                tbSchedule
                                  .querySelectorAll("tr")
                                  .forEach((row, j) => {
                                    try {
                                      const lastCel = Array.from(
                                        row.querySelectorAll("td")
                                      )
                                        .map(td => td)
                                        .at(-1);
                                      if (!(lastCel instanceof HTMLElement))
                                        throw elementNotFound(
                                          lastCel,
                                          `Last Row Cel`,
                                          extLine(new Error())
                                        );
                                      lastCel.style.display = "none";
                                    } catch (e) {
                                      console.error(
                                        `Error executing iteration ${j} of cicles for checking Last Row Cells:${
                                          (e as Error).message
                                        }`
                                      );
                                    }
                                  });
                              } else {
                                const tbSchedule =
                                  document.getElementById("tbSchedule");
                                if (!(tbSchedule instanceof HTMLElement))
                                  throw elementNotFound(
                                    tbSchedule,
                                    `Table Body`,
                                    extLine(new Error())
                                  );
                                tbSchedule
                                  .querySelectorAll("tr")
                                  .forEach((row, j) => {
                                    try {
                                      const lastCel = Array.from(
                                        row.querySelectorAll("td")
                                      )
                                        .map(td => td)
                                        .at(-1);
                                      if (!(lastCel instanceof HTMLElement))
                                        throw elementNotFound(
                                          lastCel,
                                          `Last Row Cel`,
                                          extLine(new Error())
                                        );
                                      lastCel.style.display = "table-cell";
                                    } catch (e) {
                                      console.error(
                                        `Error executing iteration ${j} of cicles for checking Last Row Cells:${
                                          (e as Error).message
                                        }`
                                      );
                                    }
                                  });
                              }
                            } catch (e) {
                              console.error(
                                `Error executing procedure for checking Last Schedule Column display:\n${
                                  (e as Error).message
                                }`
                              );
                            }
                          } catch (err) {
                            console.error(`Error handling change on Month Selector:
                            ${(err as Error).message}`);
                          }
                        }}
                      >
                        <option value="jan">Janeiro</option>
                        <option value="feb">Fevereiro</option>
                        <option value="mar">Março</option>
                        <option value="apr">Abril</option>
                        <option value="may">Maio</option>
                        <option value="jun">Junho</option>
                        <option value="jul">Julho</option>
                        <option value="aug">Agosto</option>
                        <option value="sep">Setembro</option>
                        <option value="oct">Outubro</option>
                        <option value="nov">Novembro</option>
                        <option value="dec">Dezembro</option>
                      </select>
                    </div>
                    <div
                      role="group"
                      className="form-check form-switch flexAlE900Q widHalf900Q mgT1vh900Q mgB1v900Q"
                    >
                      <input
                        className="form-check-input mgB1v900Q invtSignal dkBlue"
                        type="checkbox"
                        role="switch"
                        title="Desative ou ative aqui o cálculo automático de datas e títulos"
                        data-title="Auto-ajuste de mês"
                        id="toggleAutofillMonth"
                      />
                      <label
                        className="form-check-label bolded"
                        htmlFor="toggleAutofillMonth"
                      >
                        Auto-ajuste de mês
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <hr className="rdc02rHr460Q" />
            <section id="formBodySchedSect" className="widMaxFullView ovFlAut">
              <table
                className="table table-responsive table-striped table-hover form-padded table-transparent"
                id="mainConsDaysCont"
              >
                <colgroup>
                  {cols.map(nCol => (
                    <col
                      id={`schedule-col-${nCol}`}
                      data-col={nCol}
                      key={`schedule_col__${nCol}`}
                    ></col>
                  ))}
                </colgroup>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <div role="group" className="flexAlItCt mg-40b noInvert">
                        <strong>Horário</strong>
                      </div>
                    </th>
                    {cols.map((nCol, _, arr) =>
                      nCol === arr.slice(-1)[0] ? (
                        <ThDate
                          nCol={nCol}
                          last={true}
                          key={`th_date__${nCol}`}
                        />
                      ) : (
                        <ThDate nCol={nCol} key={`th_date__${nCol}`} />
                      )
                    )}
                  </tr>
                </thead>
                <tbody id="tbSchedule">
                  {hours.map((nHr, i) => (
                    <TrBSchedTab
                      userClass={userClass}
                      mainRoot={mainRoot}
                      nHr={nHr}
                      nRow={i + 1}
                      key={`tr_${i + 1}__${nHr}`}
                    />
                  ))}
                </tbody>
              </table>
            </section>
            <hr />
            <div
              role="group"
              className="flexNoW flexQ460NoWC cGap1v rGapQ4601v widThird widFull900Q"
            >
              <button
                type="button"
                id="btnExport"
                className="btn btn-success flexAlItCt flexJC flexBasis50 bolded noInvert"
                name="btnExportSched"
                ref={btnExportSchedRef}
                title="Gere um .xlsx com os dados preenchidos"
              >
                Gerar Planilha
              </button>
              <ReseterBtn
                root={panelRoots.mainRoot!}
                renderForm={
                  <ScheduleForm
                    mainRoot={mainRoot}
                    userClass={userClass}
                    context={false}
                  />
                }
              />
            </div>
            <div role="group" id="pacDiv">
              <hr />
            </div>
          </form>
          <footer className="d-no" id="scheduleFooter"></footer>
          <div>
            {pressState ? (
              <FormDlg onClose={toggleForm} userClass={userClass} />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
