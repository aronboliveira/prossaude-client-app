import { Root, createRoot } from "react-dom/client";
import { clearPhDates } from "../../../global/gStyleScript";
import { entryEl, targEl, voidVal } from "../../../global/declarations/types";
import { handleClientPermissions } from "./consHandlerUsers";
import { isValidElement, Fragment, Dispatch, SetStateAction } from "react";
import { parseNotNaN, textTransformPascal } from "../../../global/gModel";
import { sessionScheduleState } from "../../../../../components/panelForms/panelFormsData";
import ProviderAptDatList from "../../../../../components/lists/ProviderAptDatList";
import {
  multipleElementsNotFound,
  extLine,
  inputNotFound,
  elementNotPopulated,
  elementNotFound,
  objectError,
  stringError,
  typeError,
} from "../../../global/handlers/errorHandler";
import { providerFormData, consVariablesData } from "../../../../../components/consRegst/consVariables";

//nesse arquivo estão as funções para handling de casos comuns entre os components

export function checkComponentValidity(JSXEl: JSX.Element, Default: JSX.Element): JSX.Element {
  const JSXChildren = JSXEl.type().props;
  return isValidElement(JSXEl) && JSXEl.type !== Fragment && "children" in JSXChildren ? JSXEl : Default;
}
export async function asyncJSXCall(
  component: (...args1: Array<any>) => JSX.Element | Promise<JSX.Element>,
  called: (...args2: Array<any>) => any,
  argumentsComponent: Array<any> = [],
  argumentsCalled: Array<any> = [],
): Promise<JSX.Element> {
  try {
    if ((typeof component === "function" || typeof component === "object") && typeof called === "function") {
      let JSX = <></>;
      component(...argumentsComponent) instanceof Promise
        ? (JSX = await component(...argumentsComponent))
        : (JSX = await Promise.resolve(component(...argumentsComponent)));
      called(...argumentsCalled);
      return JSX;
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "arguments for asyncJSXCall",
        `${JSON.stringify((component as () => any | null)?.name || component.constructor.name)}`,
        `${JSON.stringify(called?.name)}`,
      );
    throw new Error(`Validating arguments for ${arguments.callee.name}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
  }
  return (
    <>
      <p>ERROR LOADING PAGE COMPONENT</p>
    </>
  );
}
export function correlateAptMonthDays(
  daySel: targEl,
  dayRefs: Array<targEl>,
  shouldClearOptions: boolean = true,
): void {
  if (
    daySel instanceof HTMLSelectElement ||
    (daySel instanceof HTMLInputElement && (daySel.type === "number" || daySel.type === "text"))
  ) {
    const checkForReplaceSel = (hasDuplicates: boolean = false): void => {
      if (
        daySel.childElementCount < document.querySelector("table")!.querySelectorAll("col").length - 1 ||
        hasDuplicates
      ) {
        const dayInp = document.createElement("input") as HTMLInputElement;
        dayInp.type = "date";
        Object.assign(dayInp, daySel);
        Object.assign(dayInp.style, daySel.style);
        dayInp.placeholder = `Erro obtendo lista de dias`;
        setTimeout(() => {
          dayInp.placeholder = `Insira: aaaa-mm-dd`;
        }, 1000);
        dayInp.classList.add(...daySel.classList);
        dayInp.classList.toggle("form-control");
        dayInp.classList.toggle("form-select");
        document.getElementById("changeDayDiv")!.replaceChild(dayInp, daySel);
        console.error(`Error creating options list for First day of work. Replacing for input. Enter day manually.`);
      }
    };
    if (Array.isArray(dayRefs) && dayRefs.length > 0) {
      const defDate = `${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
      const listDays = dayRefs.map(day => {
        if (day instanceof HTMLInputElement && (day.type === "date" || day.type === "text")) {
          return day.value || defDate;
        } else
          inputNotFound(day, `dayRef id ${day?.id || "UNDEFINED"} in correlateAptMonthDays()`, extLine(new Error()));
        return defDate;
      });
      if (
        Array.from(document.getElementsByClassName("lastConsDayCont")).some(
          cont => (cont as HTMLElement).style.display === "none" || (cont as HTMLElement).hidden === true,
        )
      )
        listDays.pop();
      if (listDays.length !== dayRefs.length)
        console.warn(`Error producing length of list for day references in correlateAptMonthDays().
      Number of days passed: ${listDays?.length ?? 0}
      Number of days expected: ${dayRefs.length ?? 0}`);
      if (listDays.some(day => day === ""))
        console.warn(`Error producing value for day reference in correlateAptMonthDays().
      Value defaulted to current day.`);
      let counterOp = 0;
      if (shouldClearOptions) daySel.innerHTML = ``;
      let hasDuplicates = false;
      listDays.forEach((listedDay, i) => {
        counterOp++;
        const newDayOp = ((): HTMLOptionElement => {
          const newDayOp = document.createElement("option");
          newDayOp.id = `${daySel?.id || "day"}Op${counterOp}-${newDayOp.value}`;
          if (navigator.language === "en-US") {
            newDayOp.value = listedDay;
            newDayOp.textContent = `${listedDay.slice(-5, -3)}/${listedDay.slice(
              -2,
              listedDay.length,
            )}/${listedDay.slice(0, 4)}`;
          } else
            newDayOp.textContent = `${listedDay.slice(-2, listedDay.length)}/${listedDay.slice(
              -5,
              -3,
            )}/${listedDay.slice(0, 4)}`;
          return newDayOp;
        })();
        const avOptions = daySel.querySelectorAll("option");
        if (i === 0 || i === 1 || avOptions.length === 0) daySel.appendChild(newDayOp);
        else {
          const valueChildsArr = Array.from(daySel.children).map(child => (child as HTMLOptionElement)?.value);
          const valueChildsSet = new Set(valueChildsArr);
          if (valueChildsArr.length !== valueChildsSet.size) hasDuplicates = true;
          daySel.appendChild(newDayOp);
          //cicla por opções para fazer comparação
        }
      });
      checkForReplaceSel(hasDuplicates);
      return;
    } else elementNotPopulated(dayRefs, `dayRefs com ${arguments.callee.name}`, extLine(new Error()));
    checkForReplaceSel();
  } else inputNotFound(daySel, `argument for ${arguments.callee.name}`, extLine(new Error()));
}
export function convertWeekdaysToMonthdays(
  weekdays: Array<number>,
  nths: Array<number>,
  month: number = new Date().getMonth(),
): Array<number> {
  const dates: number[] = [];
  dates.fill(1, 0, nths.length * weekdays.length);
  weekdays.forEach((weekday, i) => {
    const date = new Date(new Date().getFullYear(), month, 1);
    let safeCount = 0,
      matchCount = 0;
    while (date.getMonth() === month) {
      if (safeCount === 1000) break;
      if (date.getDay() === weekday % 7) {
        if (matchCount === 1000) break;
        matchCount++;
        matchCount === 1
          ? (dates[i] = date.getDate())
          : (dates[i + (matchCount - 1) + (weekdays.length - 1) + (matchCount - weekdays.length)] = date.getDate());
      }
      date.setDate(date.getDate() + 1);
      safeCount++;
    }
  });
  dates.sort((a, b) => a - b);
  return dates;
}
export function convertMonthdaysToWeekdays(month: number, weekdays: Array<number>): [string[], number[]] {
  month = month - 1;
  const date = new Date(new Date().getFullYear(), month, 1);
  const weekdaysInMonths: number[] = [];
  const weekDaysMap = new Map([
    [0, "Domingo"],
    [1, "Segunda-feira"],
    [2, "Terça-feira"],
    [3, "Quarta-feira"],
    [4, "Quinta-feira"],
    [5, "Sexta-feira"],
    [6, "Sábado"],
  ]);
  let safeCount = 0;
  while (date.getMonth() === month) {
    if (weekdays.includes(date.getDay())) weekdaysInMonths.push(date.getDay());
    date.setDate(date.getDate() + 1);
    safeCount++;
    if (safeCount === 1000) break;
  }
  const weekDaysInMonthsNames: string[] = weekdaysInMonths.map(weekday => weekDaysMap.get(weekday) ?? "Quarta-feira");
  return [weekDaysInMonthsNames, weekdaysInMonths];
}
export function correlateWorkingDays(
  workingDayNames: Array<string> = [
    "Quarta-feira",
    "Sexta-feira",
    "Quarta-feira",
    "Sexta-feira",
    "Quarta-feira",
    "Sexta-feira",
    "Quarta-feira",
    "Sexta-feira",
    "Quarta-feira",
  ],
  numColumnsRef: number,
): void {
  if (
    Array.isArray(workingDayNames) &&
    workingDayNames.length > 0 &&
    workingDayNames.every(dayName => typeof dayName === "string") &&
    typeof numColumnsRef === "number" &&
    numColumnsRef > 0 &&
    !Number.isNaN(numColumnsRef)
  ) {
    const labConsWeekdays = document.querySelectorAll(".consWeekday");
    if (
      labConsWeekdays.length === numColumnsRef &&
      (labConsWeekdays.length === workingDayNames.length || labConsWeekdays.length === workingDayNames.length + 1)
    ) {
      const mapOrderWeekdays = new Map([
        [0, "Primeira"],
        [1, "Segunda"],
        [2, "Terceira"],
        [3, "Quarta"],
        [4, "Quinta"],
      ]);
      const uniqueDayNames = workingDayNames.reduce((acc: string[], cur: string) => {
        if (!acc.includes(cur)) acc.push(cur);
        return acc;
      }, []);
      const arrOrderWDays = Array.from(mapOrderWeekdays.entries());
      const repeatedWorderWeekDays: Array<[number, string]> = [];
      const orderMap: Map<number, number> = new Map();
      let extAcc = 0;
      for (let w = 0; w < arrOrderWDays.length; w++) {
        for (let u = 0; u < uniqueDayNames.length; u++) {
          repeatedWorderWeekDays.push([extAcc, arrOrderWDays[w][1]]);
          orderMap.set(extAcc, arrOrderWDays[w][0] + 1);
          extAcc++;
        }
      }
      //aplicação dos rótulos de dias da semana
      const revWeekDaysMap = new Map([
        ["Domingo", 0],
        ["Segunda-feira", 1],
        ["Terça-feira", 2],
        ["Quarta-feira", 3],
        ["Quinta-feira", 4],
        ["Sexta-feira", 5],
        ["Sábado", 6],
      ]);
      labConsWeekdays.forEach((lab, i) => {
        lab.textContent = `${repeatedWorderWeekDays[i][1] ?? `${i}orderbrk`} ${workingDayNames[i] ?? `${i}daybrk`}`;
        lab.id = `${orderMap.get(i) ?? `${i}orderbrk`}_${revWeekDaysMap.get(
          workingDayNames[i] ?? `${i}daybrk`,
        )}_plus_1fLab`;
        if (lab instanceof HTMLLabelElement)
          lab.htmlFor = `_${orderMap.get(i) ?? `${i}orderbrk`}_${revWeekDaysMap.get(
            workingDayNames[i] ?? `${i}daybrk`,
          )}_plus_1fInp`;
        const labeledInp = lab.parentElement!.querySelector(".dayTabRef");
        if (labeledInp instanceof HTMLElement)
          labeledInp.id = `_${orderMap.get(i) ?? `${i}orderbrk`}_${revWeekDaysMap.get(
            workingDayNames[i] ?? `${i}daybrk`,
          )}_plus_1fInp`;
      });
      for (const lab of labConsWeekdays) {
        (lab as HTMLElement).style.color = "rgba(0, 0, 0, 1)";
        if (
          lab.textContent &&
          (/brk/gi.test(lab.textContent) ||
            /undefined/gi.test(lab.textContent) ||
            /null/gi.test(lab.textContent) ||
            /NaN/g.test(lab.textContent) ||
            /infinity/gi.test(lab.textContent))
        ) {
          (lab as HTMLElement).style.color = "transparent";
          console.warn(`Error correlating textContent of labels. Process reverted.`);
        } else if (
          getComputedStyle(lab).color === "rgba(0, 0, 0, 0)" ||
          getComputedStyle(lab).color === "rgb(0, 0, 0)" ||
          (lab as HTMLElement).style.color === "transparent"
        )
          (lab as HTMLElement).style.color = "rgba(0, 0, 0, 1)";
        if (lab.textContent) {
          /sábado/gi.test(lab.textContent) || /domingo/gi.test(lab.textContent)
            ? (lab.textContent = lab.textContent.replace("Primeira", "Primeiro"))
            : (lab.textContent = lab.textContent.replace("Primeiro", "Primeira"));
        }
      }
    } else
      elementNotPopulated(
        labConsWeekdays,
        `Labels for appointments working days when comparing to the number of columns ${numColumnsRef} and working days ${workingDayNames.length} references`,
        extLine(new Error()),
      );
  } else elementNotPopulated(workingDayNames, `arguments for ${arguments.callee.name}`, extLine(new Error()));
}
export function removeRepeateadWorkingDays(workingDays: [number, number]): [number, number] {
  if (
    Array.isArray(workingDays) &&
    workingDays.length > 0 &&
    workingDays.every(workingDay => typeof workingDay === "number")
  ) {
    const firstOrderWorkDay = document.getElementById("firstWorkingDay");
    const secondOrderWorkDay = document.getElementById("secondWorkingDay");
    if (
      (firstOrderWorkDay instanceof HTMLSelectElement || firstOrderWorkDay instanceof HTMLInputElement) &&
      (secondOrderWorkDay instanceof HTMLSelectElement || secondOrderWorkDay instanceof HTMLInputElement)
    ) {
      const selectedFirstOpWeekday = Array.from(firstOrderWorkDay.querySelectorAll("option")).find(
        option => option.value === firstOrderWorkDay.value,
      );
      const selectedSecondOpWeekday = Array.from(secondOrderWorkDay.querySelectorAll("option")).find(
        option => option.value === secondOrderWorkDay.value,
      );
      if (selectedFirstOpWeekday instanceof HTMLOptionElement && selectedSecondOpWeekday instanceof HTMLOptionElement) {
        workingDays = [
          parseNotNaN(selectedFirstOpWeekday.dataset.weekday || "3"),
          parseNotNaN(selectedSecondOpWeekday.dataset.weekday || "5"),
        ];
        const firstRepOp = firstOrderWorkDay.querySelector(`option[data-weekday="${workingDays[1]}"]`);
        const secondRepOp = secondOrderWorkDay.querySelector(`option[data-weekday="${workingDays[0]}"]`);
        if (firstRepOp instanceof HTMLElement) {
          firstOrderWorkDay.querySelectorAll("option").forEach(option => (option.hidden = false));
          firstRepOp.hidden = true;
          if (firstOrderWorkDay.querySelectorAll('option[hidden="true"]').length > 2) {
            console.error(`Error: more than one option was hidden. Reverting process.`);
            firstOrderWorkDay.querySelectorAll("option").forEach(option => (option.hidden = false));
          }
        } else elementNotFound(firstRepOp, "Repeated option in the second working day", extLine(new Error()));
        if (secondRepOp instanceof HTMLElement) {
          secondOrderWorkDay.querySelectorAll("option").forEach(option => (option.hidden = false));
          secondRepOp.hidden = true;
          if (secondOrderWorkDay.querySelectorAll('option[hidden="true"]').length > 2) {
            console.error(`Error: more than one option was hidden. Reverting process.`);
            secondOrderWorkDay.querySelectorAll("option").forEach(option => (option.hidden = false));
          }
        } else elementNotFound(secondRepOp, "Repeated option in the first working day", extLine(new Error()));
        return workingDays;
      } else
        multipleElementsNotFound(
          extLine(new Error()),
          "selected options for reflecting select values for working weekdays",
          selectedFirstOpWeekday,
          selectedSecondOpWeekday,
        );
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "Entry elements for defining working weekdays",
        firstOrderWorkDay,
        secondOrderWorkDay,
      );
  } else elementNotPopulated(workingDays, `argument for ${arguments.callee.name}`, extLine(new Error()));
  return workingDays;
}
export function generateSchedPacData(scope: targEl): { [k: string]: string } {
  const pacData: { [k: string]: string } = {};
  if (scope instanceof Element) {
    [
      ...Array.from(scope?.querySelectorAll("input")).filter(input => !(input.role === "switch")),
      ...(scope?.querySelectorAll("select") ?? []),
      ...scope.querySelectorAll("textarea"),
    ].forEach(entry => {
      entry instanceof HTMLInputElement && entry.type === "checkbox"
        ? (pacData[
            `${
              entry.name.replaceAll("-in", "").toLowerCase().replace("pac", "") ||
              entry.dataset.title
                ?.slice(0, entry.dataset.title.indexOf(" "))
                .replaceAll("-in", "")
                .toLowerCase()
                .replace("pac", "")
            }`
          ] = entry.checked.toString())
        : (pacData[
            `${
              entry.name.replaceAll("-in", "").toLowerCase().replace("pac", "") ||
              entry.dataset.title
                ?.slice(0, entry.dataset.title.indexOf(" "))
                .replaceAll("-in", "")
                .toLowerCase()
                .replace("pac", "")
            }`
          ] = entry.value);
    });
    pacData["tel"] = `+${pacData["código"]?.trim()} ${pacData["ddd"]?.trim()} ${pacData["tel"]?.trim()}`;
    pacData["name"] = `${pacData["name"]?.trim()} ${pacData["sobrenome"]?.trim()}`;
    pacData["time"] = `
    ${pacData.name || "Anônimo"}-${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}_${new Date().getHours()}:${new Date().getMinutes()}`
      .replaceAll(":", "_")
      .replaceAll(" ", "_")
      .replaceAll("-", "_")
      .replaceAll(/[_]{2,}/g, "_")
      .replaceAll(/\n/g, "");
  } else elementNotFound(scope, "Element for fetching data from new appointment register fields", extLine(new Error()));
  return pacData;
}
export const rootDlgContext: {
  renderCounts: number;
  aptBtnsRoots: { [k: string]: Root | undefined };
  aptBtnsIdx: { [k: string]: number };
  addedAptListeners: boolean;
  addedDayListeners: boolean;
} = {
  renderCounts: 0,
  aptBtnsRoots: {},
  aptBtnsIdx: {},
  addedAptListeners: false,
  addedDayListeners: false,
};
export function handleRenderRefLost(id: string, prevRef: HTMLElement, userClass: string, timer: number = 100): void {
  try {
    if (typeof id !== "string")
      throw typeError(`validation of id argument in handleRenderRefLost`, id, "string", extLine(new Error()));
    if (typeof userClass !== "string")
      throw typeError("validation of userClass in handleRenderRefLos", userClass, "string", extLine(new Error()));
    if (!(prevRef instanceof HTMLElement))
      throw elementNotFound(prevRef, `Previous reference for ${id}`, extLine(new Error()));
    if (typeof timer !== "number")
      throw typeError(`validation of timer argument in handleRenderRefLost`, timer, "number", extLine(new Error()));
    setTimeout(() => {
      if (!document.querySelector("dialog")) {
        rootDlgContext.aptBtnsRoots[id]?.unmount();
        rootDlgContext.aptBtnsRoots[id] = undefined;
        const replaceRoot = document.createElement("div") as HTMLDivElement;
        replaceRoot.id = id;
        replaceRoot.role = "group";
        document.getElementById("bgDiv")?.insertAdjacentElement("afterend", replaceRoot);
        rootDlgContext.aptBtnsRoots[id] = createRoot(replaceRoot);
        rootDlgContext.aptBtnsRoots[id]?.render(
          <ProviderAptDatList
            data={
              providerFormData[rootDlgContext.aptBtnsIdx[`${prevRef.id}`]] ||
              Array.from(providerFormData.values()).find(
                formData => (formData as any).time === prevRef.id.replace("appointmentBtn-", ""),
              )
            }
            btnId={prevRef.id}
          />,
        );
      }
    }, timer);
  } catch (e) {
    console.error(`Error executing handleRenderRefLost:\n${(e as Error).message}`);
  }
}
export function handleAptBtnClick(ev: MouseEvent, userClass: string): void {
  try {
    console.log("Click listened");
    if (!(ev.currentTarget instanceof HTMLElement && ev.currentTarget.id !== ""))
      throw new Error(
        `Error locating Target New Appointment Button: Instance found -> ${
          (ev.currentTarget instanceof HTMLElement && ev.currentTarget.constructor.name) ||
          ev.currentTarget ||
          "undefined"
        }\n Id Found -> ${
          (ev.currentTarget instanceof HTMLElement && ev.currentTarget.id) || ev.currentTarget || "undefined"
        }`,
      );
    if (!consVariablesData.rootDlg) {
      const rootDlg = document.getElementById("rootDlgList");
      if (!rootDlg) throw new Error(`Failed to fetch Main Dialog Root`);
      consVariablesData.rootDlg = createRoot(rootDlg);
    }
    if (!rootDlgContext.aptBtnsRoots[`rootDlgList`]) {
      rootDlgContext.aptBtnsRoots[`rootDlgList`] = consVariablesData.rootDlg;
      const rootDlg = document.getElementById("rootDlgList");
      if (!rootDlg) throw new Error(`Failed to fetch Main Dialog Root`);
      rootDlg.classList.add("rootDlg");
    }
    console.log(rootDlgContext.aptBtnsIdx[ev.currentTarget.id]);
    if (rootDlgContext.aptBtnsIdx[ev.currentTarget.id] === 1) {
      console.log(`Attempting to render in rootDlgList`);
      console.log(rootDlgContext.aptBtnsRoots[`rootDlgList`]);
      rootDlgContext.aptBtnsRoots[`rootDlgList`].render(
        <ProviderAptDatList
          data={
            providerFormData[rootDlgContext.aptBtnsIdx[`${ev.currentTarget.id}`]] ||
            Array.from(providerFormData.values()).find(
              formData =>
                (formData as any).time === (ev.currentTarget as HTMLElement).id.replace("appointmentBtn-", ""),
            )
          }
          btnId={ev.currentTarget.id}
        />,
      );
      handleRenderRefLost("rootDlgList", ev.currentTarget, userClass);
    } else {
      if (
        !document.getElementById(
          `rootDlgList-${rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`] ?? "null"}-${ev.currentTarget.id}`,
        )
      ) {
        const newRoot = document.createElement("div") as HTMLDivElement;
        newRoot.classList.add(`rootDlg`);
        newRoot.id = `rootDlgList-${rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`] ?? "null"}-${
          ev.currentTarget.id
        }`;
        newRoot.role = "group";
        const lastDlgRoot = Array.from(document.querySelectorAll(".rootDlg")).at(-1);
        if (!lastDlgRoot) throw new Error(`Error locating Last Dialog Root Element`);
        lastDlgRoot.insertAdjacentElement("beforebegin", newRoot);
        if (!rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`])
          rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`] = createRoot(newRoot);
      }
      if (!rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`]) {
        const targRoot = document.getElementById(
          `rootDlgList-${rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`] ?? "null"}-${ev.currentTarget.id}`,
        );
        if (!(targRoot instanceof HTMLElement))
          throw elementNotFound(
            targRoot,
            `Target Dialog Root for ${ev.currentTarget.id || ev.currentTarget.tagName}`,
            extLine(new Error()),
          );
        rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`] = createRoot(targRoot);
      }
      console.log(
        `Attempt to render in ${`rootDlgList-${rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`] ?? "null"}-${
          ev.currentTarget.id
        }`}`,
      );
      rootDlgContext.aptBtnsRoots[`${ev.currentTarget.id}`]!.render(
        <ProviderAptDatList
          data={
            providerFormData[rootDlgContext.aptBtnsIdx[`${ev.currentTarget.id}`]] ||
            Array.from(providerFormData.values()).find(
              formData =>
                (formData as any).time === (ev.currentTarget as HTMLElement).id.replace("appointmentBtn-", ""),
            )
          }
          btnId={ev.currentTarget.id}
        />,
      );
      handleRenderRefLost("rootDlgList", ev.currentTarget, userClass);
    }
  } catch (e) {
    console.error(
      `Error executing callback for ${
        (ev.currentTarget instanceof HTMLElement && ev.currentTarget.tagName) || "unidentified Node"
      } type ${ev.type}:\n${(e as Error).message}`,
    );
  }
}
export function createAptBtn(
  formData: { [key: string]: string },
  _providerFormData: { [key: string]: string },
  rootedDlg: Root | voidVal,
  userClass: string,
): targEl {
  const apppointBtn = document.getElementById("addAppointBtn");
  if (apppointBtn?.parentElement instanceof HTMLElement) {
    const newAppointmentBtn = document.createElement("button") as HTMLButtonElement;
    const btnId = `appointmentBtn-${_providerFormData.time}`;
    Object.assign(newAppointmentBtn, {
      type: "button",
      id: btnId,
      dataTitle: `Botão para o paciente ${_providerFormData.name || "Anônimo"}`,
      formMethod: "get",
      fontSize: "0.5rem",
      title:
        "Consulte a ficha da consulta recém-cadastrada, arraste o botão para a agenda, ou agende através do botão de agendamento",
      draggable: true,
      contentEditable: true,
    });
    Object.assign(newAppointmentBtn.style, {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "text-top",
      textAlign: "center",
    });
    formData.cons.match(/\s/g)
      ? (newAppointmentBtn.innerHTML = `
    <span role="textbox">
      <strong>${formData.cons.slice(0, 1).toUpperCase() || "C"}${
          formData.cons.slice(1, formData.cons.indexOf(" ") + 1) || "onsulta"
        } </strong>
    </span>
      <em> : ${formData.name || "noName"}</em>
    `)
      : (newAppointmentBtn.innerHTML = `
    <span role="textbox">
      <strong>${formData.cons.slice(0, 1).toUpperCase() || "C"}${formData.cons.slice(1) || "onsulta"} </strong>
    </span>
      <em> : ${textTransformPascal(formData.name) || "noName"}</em>
    `);
    newAppointmentBtn.classList.add(...["btn", "btn-info", "appointmentBtn", "forceInvert"]);
    const transfArea = document.getElementById("transfArea");
    const replaceSlot = document.getElementById("replaceSlot");
    if (transfArea instanceof HTMLElement && replaceSlot instanceof HTMLElement) {
      transfArea.replaceChild(newAppointmentBtn, replaceSlot);
      if (document.getElementById(newAppointmentBtn.id))
        rootDlgContext.aptBtnsIdx[`${newAppointmentBtn.id}`] = document.querySelectorAll(".appointmentBtn").length;
      else console.warn(`Error locating New Appointment Button in the DOM. Reference index not updated.`);
      if (rootedDlg && typeof rootedDlg === "object") {
        const regstBtn = document.getElementById("regstDayBtn");
        regstBtn instanceof HTMLButtonElement
          ? (regstBtn.disabled = false)
          : elementNotFound(regstBtn, "Button for registering appointment in createAptBtn()", extLine(new Error()));
        newAppointmentBtn.addEventListener("click", ev => handleAptBtnClick(ev, userClass));
      } else
        elementNotFound(
          `${JSON.stringify(rootedDlg)}`,
          "Dialog root for placing tabled list about registered appointment",
          extLine(new Error()),
        );
    } else {
      transfArea && transfArea.querySelector(".appointmentBtn")
        ? console.warn(`Appointment Button already placed.`)
        : multipleElementsNotFound(
            extLine(new Error()),
            "Elements for placing appointment in transfer area in createAptBtn()",
            transfArea,
            replaceSlot,
          );
    }
    return newAppointmentBtn;
  } else elementNotFound(apppointBtn, `apppointBtn in ${arguments.callee.name}`, extLine(new Error()));
}

let isDragging = false,
  fbTouch: Touch,
  initialX = 0,
  initialY = 0,
  offsetX = 0,
  offsetY = 0;
export function handleDragAptBtn(newAppointmentBtn: targEl, userClass: string = "estudante"): void {
  if (newAppointmentBtn instanceof HTMLButtonElement) {
    const slots = Array.from(document.getElementsByClassName("consSlot")).filter(
      slot => slot instanceof HTMLSlotElement,
    );
    const slotsCoords = slots.map(slot => {
      const rect = slot.getBoundingClientRect();
      return Object.assign(
        {},
        {
          upperLeftVert: [rect.x, rect.y],
          upperRightVert: [rect.x + rect.width, rect.y],
          lowerLeftVert: [rect.x, rect.y + rect.height],
          lowerRightVert: [rect.x + rect.width, rect.y + rect.height],
        },
      );
    });
    newAppointmentBtn.addEventListener("dragend", end => {
      try {
        for (let c = 0; c < slotsCoords.length; c++) {
          let isSlotMatch = false;
          end.clientX >= slotsCoords[c].upperLeftVert[0] &&
          end.clientX <= slotsCoords[c].upperRightVert[0] &&
          end.clientY >= slotsCoords[c].upperLeftVert[1] &&
          end.clientY <= slotsCoords[c].lowerLeftVert[1]
            ? (isSlotMatch = true)
            : (isSlotMatch = false);
          const [matchedSlot] = document
            .elementsFromPoint(end.clientX, end.clientY)
            .filter(el => el.classList.contains("consSlot"));
          matchedSlot instanceof HTMLElement ? (isSlotMatch = true) : (isSlotMatch = false);
          if (isSlotMatch) {
            if (
              !(newAppointmentBtn instanceof HTMLButtonElement) &&
              ((newAppointmentBtn as any).tagName === "STRONG" ||
                (newAppointmentBtn as any).tagName === "EM" ||
                (newAppointmentBtn as any).tagName === "SPAN") &&
              (newAppointmentBtn as any).closest("button")
            )
              newAppointmentBtn = (newAppointmentBtn as HTMLElement).closest("button") as HTMLButtonElement;
            if (!(newAppointmentBtn instanceof HTMLButtonElement))
              throw elementNotFound(
                newAppointmentBtn,
                `New Appointment Button in touchstart callback`,
                extLine(new Error()),
              );
            replaceRegstSlot(matchedSlot, newAppointmentBtn, slots, userClass);
            try {
              const monthSelector = document.getElementById("monthSelector");
              if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
                throw inputNotFound(
                  monthSelector,
                  `monthSelector for updating session schedule state after dragend`,
                  extLine(new Error()),
                );
              const tbody = document.getElementById("tbSchedule");
              if (!(tbody instanceof HTMLElement))
                throw elementNotFound(
                  tbody,
                  `tbody for updating session schedule state after dragend`,
                  extLine(new Error()),
                );
              //atualização no drop (associada com replaceregstslot)
              sessionScheduleState[monthSelector.value] = tbody.innerHTML;
            } catch (e) {
              console.error(`Error updation session schedule state after dragend:
              ${(e as Error).message}`);
            }
            break;
          } else console.warn(`No slot match found for dragend.`);
        }
      } catch (e) {
        console.error(`Error executing dragEnd callback:${(e as Error).message}`);
      }
    });
    newAppointmentBtn.addEventListener("touchstart", ev => {
      isDragging = true;
      fbTouch = Array.from(ev.touches).find(
        touch => touch.target instanceof HTMLElement && touch.target.classList.contains("appointmentBtn"),
      ) as any;
      if (
        !(newAppointmentBtn instanceof HTMLButtonElement) &&
        ((newAppointmentBtn as any).tagName === "STRONG" ||
          (newAppointmentBtn as any).tagName === "EM" ||
          (newAppointmentBtn as any).tagName === "SPAN") &&
        (newAppointmentBtn as any).closest("button")
      )
        newAppointmentBtn = (newAppointmentBtn as HTMLElement).closest("button") as HTMLButtonElement;
      if (!(newAppointmentBtn instanceof HTMLButtonElement))
        throw elementNotFound(newAppointmentBtn, `New Appointment Button in touchstart callback`, extLine(new Error()));
      if (!(fbTouch instanceof Touch)) fbTouch = ev.touches[0];
      if (fbTouch) {
        const touch = fbTouch;
        initialX = touch.clientX - offsetX;
        initialY = touch.clientY - offsetY;
        (newAppointmentBtn as HTMLButtonElement).style.position = "absolute";
        (newAppointmentBtn as HTMLButtonElement).style.zIndex = "50";
      }
      const handleTouchDrag = (ev: TouchEvent): void => {
        if (!isDragging) return;
        ev.preventDefault();
        const touch = ev.targetTouches[0];
        offsetX = touch.clientX - initialX;
        offsetY = touch.clientY - initialY;
        (newAppointmentBtn as HTMLButtonElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      };
      const handleTouchEnd = (end: TouchEvent): void => {
        console.log(end);
        if (isDragging) {
          try {
            const targ = fbTouch;
            if (!(targ instanceof Touch)) throw new Error(`Failed to fetch touch target`);
            for (let c = 0; c < slotsCoords.length; c++) {
              let isSlotMatch = false;
              targ.clientX >= slotsCoords[c].upperLeftVert[0] &&
              targ.clientX <= slotsCoords[c].upperRightVert[0] &&
              targ.clientY >= slotsCoords[c].upperLeftVert[1] &&
              targ.clientY <= slotsCoords[c].lowerLeftVert[1]
                ? (isSlotMatch = true)
                : (isSlotMatch = false);
              const [matchedSlot] = document
                .elementsFromPoint(targ.clientX, targ.clientY)
                .filter(el => el.classList.contains("consSlot"));
              matchedSlot instanceof HTMLElement ? (isSlotMatch = true) : (isSlotMatch = false);
              if (
                !(newAppointmentBtn instanceof HTMLButtonElement) &&
                ((newAppointmentBtn as any).tagName === "STRONG" ||
                  (newAppointmentBtn as any).tagName === "EM" ||
                  (newAppointmentBtn as any).tagName === "SPAN") &&
                (newAppointmentBtn as any).closest("button")
              )
                newAppointmentBtn = (newAppointmentBtn as HTMLElement).closest("button") as HTMLButtonElement;
              if (isSlotMatch) {
                (newAppointmentBtn as HTMLButtonElement).style.position = "static";
                (newAppointmentBtn as HTMLButtonElement).style.zIndex = "10";
                replaceRegstSlot(matchedSlot, newAppointmentBtn as HTMLButtonElement, slots, userClass);
                (newAppointmentBtn as HTMLButtonElement).style.transform = `translate(0, 0)`;
                try {
                  const monthSelector = document.getElementById("monthSelector");
                  if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
                    throw inputNotFound(
                      monthSelector,
                      `monthSelector for updating session schedule state after dragend`,
                      extLine(new Error()),
                    );
                  const tbody = document.getElementById("tbSchedule");
                  if (!(tbody instanceof HTMLElement))
                    throw elementNotFound(
                      tbody,
                      `tbody for updating session schedule state after dragend`,
                      extLine(new Error()),
                    );
                  sessionScheduleState[monthSelector.value] = tbody.innerHTML;
                } catch (e) {
                  console.error(`Error updation session schedule state after dragend:
                ${(e as Error).message}`);
                }
                break;
              } else console.warn(`No slot match found for dragend.`);
            }
          } catch (e) {
            console.error(`Error executing handleToucEnd:\n${(e as Error).message}`);
          }
          isDragging = false;
        }
        document.removeEventListener("touchmove", handleTouchDrag);
        document.removeEventListener("touchend", handleTouchEnd);
      };
      document.addEventListener("touchmove", handleTouchDrag, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd, { once: true });
    });
  } else elementNotFound(newAppointmentBtn, `arguments for ${arguments.callee.name}`, extLine(new Error()));
}
export function replaceRegstSlot(
  matchedSlot: targEl,
  newAppointmentBtn: HTMLButtonElement,
  slots: Array<Element>,
  userClass: string = "estudante",
): void {
  try {
    if (!(matchedSlot instanceof HTMLElement)) throw elementNotFound(matchedSlot, `Matched Slot`, extLine(new Error()));
    if (
      !(newAppointmentBtn instanceof HTMLButtonElement) &&
      ((newAppointmentBtn as any).tagName === "STRONG" ||
        (newAppointmentBtn as any).tagName === "EM" ||
        (newAppointmentBtn as any).tagName === "SPAN") &&
      (newAppointmentBtn as any).closest("button")
    )
      newAppointmentBtn = (newAppointmentBtn as HTMLElement).closest("button") as HTMLButtonElement;
    if (!(newAppointmentBtn instanceof HTMLButtonElement))
      throw elementNotFound(newAppointmentBtn, `New Appointment Button`, extLine(new Error()));
    slots = slots.filter(slot => slot instanceof Element);
    if (slots.length === 0) throw new Error(`Failed to populate slots list`);
    if (typeof userClass !== "string")
      throw typeError(`User class in replaceRegstSlot`, userClass, "string", extLine(new Error()));
    if (matchedSlot instanceof HTMLElement) {
      newAppointmentBtn.style.width = "100%";
      matchedSlot.replaceChild(
        newAppointmentBtn,
        matchedSlot.querySelector(".slotableDay") ?? matchedSlot.children[0] ?? matchedSlot.parentElement!.children[0],
      );
      setTimeout(() => {
        try {
          const monthSelector = document.getElementById("monthSelector");
          const tb = document.getElementById("tbSchedule");
          if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
            throw elementNotFound(monthSelector, `Validation of Month Selector instance`, extLine(new Error()));
          if (!matchedSlot.querySelector("button")) throw new Error(`Failed to validate button nested in matched slot`);
          if (!(tb instanceof HTMLElement))
            throw elementNotFound(tb, `Failed to validate Table Body for Schedule`, extLine(new Error()));
          //atualização de state no drop
          fillSchedStateValues(monthSelector.value);
        } catch (e) {
          console.error(`Error executing procedure for updating state of month:\n${(e as Error).message}`);
        }
      }, 200);
      const transfArea = document.getElementById("transfArea");
      if (transfArea instanceof HTMLElement) {
        if (
          !transfArea.hasChildNodes() ||
          transfArea.innerHTML === `` ||
          transfArea.childElementCount === 1 ||
          !transfArea.querySelector("slot")
        ) {
          transfArea.querySelector("btn-close")
            ? transfArea.insertBefore(
                Object.assign(document.createElement("slot"), {
                  id: "replaceSlot",
                  textContent: "Área de transferência",
                  className: "opaqueEl",
                  color: "#0981714d",
                }),
                transfArea.querySelector("button")!,
              )
            : transfArea.appendChild(
                Object.assign(document.createElement("slot"), {
                  id: "replaceSlot",
                  textContent: "Área de transferência",
                  className: "opaqueEl",
                }),
              );
        }
      } else
        elementNotFound(
          transfArea,
          "Element for appointment transference slot in handleDragAptBtn()",
          extLine(new Error()),
        );
      const regstBtn = document.getElementById("regstDayBtn");
      if (regstBtn instanceof HTMLButtonElement) regstBtn.disabled = true;
      else elementNotFound(regstBtn, `Button for registering appointment in dragend`, extLine(new Error()));
      if (regstBtn instanceof HTMLInputElement && (regstBtn.type === "checkbox" || regstBtn.type === "radio"))
        regstBtn.checked = false;
      else if (!(regstBtn instanceof HTMLButtonElement))
        elementNotFound(regstBtn, "Button for registering appointment in handleDragAptBtn()", extLine(new Error()));
      slots[0]
        .closest("table")!
        .querySelectorAll("tr")!
        .forEach((tr, i) => {
          tr.dataset.row = `${i}`;
          const trCels = [...tr.querySelectorAll("td"), ...tr.querySelectorAll("th")];
          trCels.forEach((cel, j) => {
            cel.dataset.row = `${i}`;
            cel.dataset.column = `${j}`;
          });
        });
      matchedSlot.dataset.row = (matchedSlot.closest("td") || matchedSlot.closest("th"))?.dataset.row;
      matchedSlot.dataset.column = (matchedSlot.closest("td") || matchedSlot.closest("th"))?.dataset.column;
      const noMatchSlots = slots.filter(slot => !slot.isEqualNode(matchedSlot));
      for (let s = 0; s < noMatchSlots.length; s++) {
        const relTr = matchedSlot.closest("tr")!;
        const trCels = [...relTr.querySelectorAll("th"), ...relTr.querySelectorAll("td")].filter(
          cel => cel instanceof HTMLElement,
        );
        const slotNum = Array.from(relTr.querySelectorAll(".consSlot")).findIndex(slot =>
          slot.isSameNode(noMatchSlots[s]),
        );
        if (
          !noMatchSlots[s].hasChildNodes() ||
          (!noMatchSlots[s].querySelector(".slotableDay") && !noMatchSlots[s].querySelector('[id*="appointmentBtn"]'))
        ) {
          noMatchSlots[s].innerHTML = `
            <input
              class="transparent-el slotableDay opaque-bluish wid100 form-control"
              placeholder="Horário Livre"
              id = ${trCels[0].innerText}_${
            (noMatchSlots[s].closest("td") || noMatchSlots[s].closest("th"))?.dataset.column || slotNum
          }
            />
            <div role="group" class="flexNoWC flexAlItCt">
              <input
                type="checkbox"
                class="form-check-input apptCheck redMg checkGreen"
              />
              <button
                type="button"
                class="btn btn-close reduced-btn-close eraseAptBtn"
              ></button>
            </div>
            `;
          addEraseEvent(noMatchSlots[s].querySelector(".eraseAptBtn")!, userClass);
          try {
            if (userClass === "coordenador" || userClass === "supervisor") {
              const aptBtn = noMatchSlots[s].querySelector(".apptCheck");
              if (!(aptBtn instanceof HTMLInputElement || aptBtn instanceof HTMLButtonElement))
                throw elementNotFound(aptBtn, `New Appointment Button`, extLine(new Error()));
              aptBtn instanceof HTMLInputElement && aptBtn.addEventListener("change", () => checkConfirmApt(aptBtn));
              setInterval((interv: any) => {
                if (
                  !(aptBtn instanceof HTMLButtonElement || aptBtn instanceof HTMLInputElement) ||
                  !(userClass === "coordenador" || userClass === "supervisor")
                ) {
                  clearInterval(interv);
                  return;
                }
                if (aptBtn.closest(".consSlot")?.querySelector(".appointmentBtn")) aptBtn.disabled = false;
                else aptBtn.disabled = true;
              }, 200);
            }
          } catch (e) {
            console.error(`Error adding interval to new aptBtn:\n${(e as Error).message}`);
          }
        }
      }
    } else elementNotFound(matchedSlot, "Undefined Slot por dragend", extLine(new Error()));
  } catch (e) {
    console.error(`Error executing replaceRegstSlot:\n${(e as Error).message}`);
  }
}
export function checkRegstBtn(
  regstBtn: targEl,
  scope: HTMLElement | Document = document,
  failProps: [Root | undefined, boolean, Dispatch<SetStateAction<boolean>>, string],
  userClass: string = "estudante",
): boolean | undefined {
  if (regstBtn instanceof HTMLButtonElement) {
    const daySel =
      scope.querySelector("#changeDaySel") ||
      scope.querySelector("[id$=ChangeDaySel]") ||
      scope.querySelector("#formDayBodySchedSect")?.querySelector("select") ||
      scope.querySelector("select");
    const hourInp =
      scope.querySelector("#hourDayInp") ||
      scope.querySelector("[id$=HourDayInp]") ||
      scope.querySelector("#formDayBodySchedSect")?.querySelector('input[type="time"]') ||
      scope.querySelector('input[type="time"]');
    const confirmInp =
      scope.querySelector("#confirmDayInp") ||
      scope.querySelector("#confirmPac") ||
      scope.querySelector("#formDayBodySchedSect")?.querySelector('input[type="checkbox"]') ||
      scope.querySelector('input[type="checkbox"]');
    const dayTabRefs =
      document.querySelectorAll(".dayTabRef") || document.querySelector("table")!.querySelectorAll(".dayTabRef");
    dayTabRefs.length < document.querySelector("table")!.querySelectorAll("col").length - 1 &&
      console.warn(`Error capturing number of date inputs for placing new appointment button`);

    //isso é só pra checar o número de colunas com datas nos headers
    const shownDayTabRefs = Array.from(dayTabRefs).filter(
      ref => ref instanceof HTMLElement && !(ref.hidden === true || ref.style.display === "none"),
    );
    if (
      (daySel instanceof HTMLSelectElement || daySel instanceof HTMLInputElement) &&
      hourInp instanceof HTMLInputElement &&
      confirmInp instanceof HTMLInputElement &&
      (confirmInp.type === "checkbox" || confirmInp.type === "radio") &&
      shownDayTabRefs.length > 7
    ) {
      //aqui é a pesquisa pros slots de fato
      const matchedPhInps = Array.from(document.querySelectorAll(".slotableDay"));
      let matchedPhInp;
      let acc = 0;
      for (const phInp of matchedPhInps) {
        ++acc;
        if (phInp.id === `_${hourInp.value.replace(":", "-")}_${acc}`) {
          matchedPhInp = phInp;
          break;
        }
        if ((acc !== 0 && acc % 9 === 0) || phInp.closest("td")!.classList.contains("lastConsDayCont")) {
          acc = 0;
        }
      }
      const matchedSlot = matchedPhInp?.parentElement;
      const newAppointmentBtn = document.querySelector('[id*="appointmentBtn"]');
      if (
        matchedPhInp instanceof HTMLElement &&
        matchedSlot instanceof HTMLElement &&
        newAppointmentBtn instanceof HTMLButtonElement
      ) {
        matchedSlot.replaceChild(newAppointmentBtn, matchedPhInp);
        newAppointmentBtn.style.minWidth = "89%";
        replaceRegstSlot(matchedSlot, newAppointmentBtn, Array.from(scope.querySelectorAll(".consSlot")), userClass);
        return true;
      } else {
        multipleElementsNotFound(
          extLine(new Error()),
          "Elements for matching new appointment button",
          matchedPhInp,
          matchedSlot,
          newAppointmentBtn,
        );
        if (typeof failProps[0] === "object" && "_internalRoot" in failProps[0]) return false;
      }
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "Entry Elements for registering new appointment by click",
        daySel,
        hourInp,
        confirmInp,
        ...shownDayTabRefs,
      );
  } else elementNotFound(regstBtn, "Button for registering appointment in handleRegstBtn()", extLine(new Error()));
}
export function addEraseEvent(eraser: HTMLButtonElement, userClass: string = "estudante"): void {
  if (userClass === "coordenador" || userClass === "supervisor") {
    eraser.addEventListener("click", () => {
      const relCel = eraser.closest("slot");
      relCel instanceof HTMLElement
        ? replaceBtnSlot(relCel.querySelector("[id*=appointmentBtn]"), relCel, eraser)
        : elementNotFound(
            relCel,
            `Table cell related to button for erasing day/hour appointment id ${eraser.id}`,
            extLine(new Error()),
          );
    });
    setInterval((interv: any) => {
      if (
        !(
          eraser instanceof HTMLButtonElement ||
          //@ts-ignore
          eraser instanceof HTMLInputElement
        ) ||
        !(userClass === "coordenador" || userClass === "supervisor")
      ) {
        clearInterval(interv);
        return;
      }
      if (eraser.closest(".consSlot")?.querySelector(".appointmentBtn")) eraser.disabled = false;
      else eraser.disabled = true;
    }, 200);
  }
}
export function replaceBtnSlot(aptBtn: targEl, parent: HTMLElement, caller: HTMLElement): void {
  if (aptBtn instanceof HTMLElement) {
    const relTr = aptBtn.closest("tr")!;
    let [slotNum] = Array.from(relTr.querySelectorAll(".consSlot"))
      .reduce<Array<(Element | number)[]>>((acc, slot, i) => {
        const prevSlots: Element[] = acc.map(([element]) => element as Element);
        slot instanceof HTMLSlotElement && prevSlots.some(prevSlot => slot === prevSlot)
          ? acc.push([slot, i])
          : acc.push([slot, -1]);
        return acc;
      }, [])
      .map(([, slotNum]) => slotNum as number)
      .filter(slotNum => Number.isFinite(slotNum) && slotNum > 0);
    let [slotNumTry2] = Array.from(relTr.querySelectorAll(".consSlot")).map((slot, i) => {
      return slot.isEqualNode(aptBtn.parentElement!) ? i + 1 : -1;
    });
    const trCels = [...relTr.querySelectorAll("th"), ...relTr.querySelectorAll("td")].filter(
      cel => cel instanceof HTMLElement,
    );
    const replaceInp = document.createElement("input") as HTMLInputElement;
    replaceInp.classList.add(...["slotableDay", "opaque-bluish", "wid100", "form-control", "transparent-el"]);
    replaceInp.placeholder = `Horário Livre`;
    replaceInp.id = `${trCels[0].innerText}_${slotNum || slotNumTry2}`;
    parent.replaceChild(replaceInp, aptBtn);
  } else console.warn(`No related appointment details button for erasing button id ${caller.id}`);
}
export function checkConfirmApt(dayCheck: HTMLInputElement): void {
  const relAptBtn = (dayCheck.closest("td") || dayCheck.closest("th"))?.querySelector("[id*=appointmentBtn]");
  if (relAptBtn instanceof HTMLElement) {
    if (dayCheck.checked) {
      relAptBtn.classList.remove("btn-info");
      relAptBtn.classList.add("btn-success");
    } else {
      relAptBtn.classList.remove("btn-success");
      relAptBtn.classList.add("btn-info");
    }
  } else console.warn(`No related button for day checkbox id ${dayCheck.id}`);
}
export function handleScheduleChange(
  monthSelector: entryEl | null,
  root: targEl,
  userClass: string,
  isAutoFillMonthOn: boolean = true,
): void {
  try {
    if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
      throw inputNotFound(monthSelector, `Month Selector for schedule state change`, extLine(new Error()));
    if (!(sessionScheduleState instanceof Object && Object.entries(sessionScheduleState).length > 1))
      throw objectError(
        "Validating object for Session Schedule Map",
        sessionScheduleState,
        "sessionScheduleMap",
        12,
        extLine(new Error()),
      );
    if (!sessionScheduleState.hasOwnProperty(monthSelector.value))
      throw stringError(
        "validating value of Month Selector for Session Map",
        monthSelector.value,
        extLine(new Error()),
      );
    if (!(root instanceof HTMLElement || (root instanceof Object && "_internalRoot" in root)))
      throw elementNotFound(root, "Root for schedule tab", extLine(new Error()));
    if (
      !(
        typeof userClass === "string" &&
        ["coordenador", "supervisor", "estudante"].some(className => new RegExp(className).test(userClass))
      )
    )
      throw stringError("Validating userClass for handling month change", userClass, extLine(new Error()));
    if (!(typeof isAutoFillMonthOn === "boolean"))
      throw new Error(`Error validating type of isAutoFillMonthOn when handling month state change`);
    if (!(typeof monthSelector.value === "string"))
      throw stringError(`Obtaining value for month state change`, monthSelector.value, extLine(new Error()));
    //atualizando innerhtml
    const stateScheduleHTML = sessionScheduleState[monthSelector.value];
    if (!stateScheduleHTML)
      throw new Error(`Error validating key for Session Schedule Map:
      Month Selector: ${monthSelector?.id ?? "UNDEFINED"}
      Available Options in the HTML: ${Array.from(monthSelector.querySelectorAll("option")).map(option => option.value)}
      Used value: ${monthSelector.value};
      Map values: ${Object.values(sessionScheduleState)}
      Available keys in the map: ${Object.keys(sessionScheduleState)}`);
    if (typeof stateScheduleHTML === "string") root.innerHTML = stateScheduleHTML;
    if (stateScheduleHTML instanceof Object && "props" in stateScheduleHTML) createRoot(root).render(stateScheduleHTML);
    //readicionando listeners
    addListenersForSchedTab((root as HTMLElement) ?? document, userClass, isAutoFillMonthOn);
    applyStylesForSchedTab(root as HTMLElement);
    addListenerForSchedUpdates(monthSelector);
    //atualizando state dos inputs do tbody da agenda
    try {
      const stateScheduleValues = sessionScheduleState[`${monthSelector.value}Values`];
      if (!Array.isArray(stateScheduleValues))
        throw elementNotPopulated(
          stateScheduleValues.toString(),
          "Array for states of .values in Schedule Table",
          extLine(new Error()),
        );
      const entries = [
        ...document.getElementsByTagName("input"),
        ...document.getElementsByTagName("select"),
        ...document.getElementsByTagName("textarea"),
      ];
      if (entries.length < 1)
        throw elementNotPopulated(entries, "Entries for getting Session Schedules data", extLine(new Error()));
      for (let e = 0; e < entries.length; e++) {
        const arrEntry = stateScheduleValues.find(entry => entry[0] === entries[e].id);
        if (!Array.isArray(arrEntry)) continue;
        if (entries[e] instanceof HTMLInputElement && (entries[e].type === "checkbox" || entries[e].type === "radio")) {
          arrEntry[1] === "true"
            ? ((entries[e] as HTMLInputElement).checked = true)
            : ((entries[e] as HTMLInputElement).checked = false);
        } else {
          entries[e].value = arrEntry[1];
        }
      }
    } catch (e) {
      console.error(`Error filling entry Elements on handleScheduleChange():
      ${(e as Error).message}`);
    }
  } catch (err) {
    console.error(`Error on the execution of handleScheduleChange():
    ${(err as Error).message}`);
  }
}
export function verifyAptCheck(dayCheck: targEl): void {
  try {
    if (
      dayCheck instanceof HTMLInputElement &&
      (dayCheck.type === "checkbox" || dayCheck.type === "radio") &&
      dayCheck.checked
    ) {
      try {
        const relSlot = dayCheck.closest("slot");
        if (!(relSlot instanceof HTMLElement))
          throw elementNotFound(
            relSlot,
            `Slot related to Day Check id ${dayCheck.id || dayCheck.tagName}`,
            extLine(new Error()),
          );
        const relBtn =
          relSlot.querySelector(".appointmentBtn") ?? relSlot.querySelector('button[id^="appointmentBtn"]');
        if (!(relBtn instanceof HTMLButtonElement))
          throw elementNotFound(
            relBtn,
            `Appointment Button related to ${dayCheck.id || dayCheck.tagName}`,
            extLine(new Error()),
          );
        if (relBtn.classList.contains("btn-info")) relBtn.classList.remove("btn-info");
        relBtn.classList.add("btn-success");
      } catch (e) {
        console.error(`Error executing procedure for painting Appointment Button:\n${(e as Error).message}`);
      }
    }
  } catch (e) {
    console.error(`Error executing verifyAptCheck:\n${(e as Error).message}`);
  }
}
export function addListenersForSchedTab(
  scope: HTMLElement | Document = document,
  userClass: string,
  isAutoFillMonthOn: boolean,
): void {
  try {
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw elementNotFound(
        scope,
        "Root for Schedule Table when adding listeners after month state change",
        extLine(new Error()),
      );
    if (
      !(
        typeof userClass === "string" &&
        ["coordenador", "supervisor", "estudante"].some(className => new RegExp(className).test(userClass))
      )
    )
      throw stringError(
        "Validating userClass for adding listeners when handling month change",
        userClass,
        extLine(new Error()),
      );
    if (!(typeof isAutoFillMonthOn === "boolean"))
      throw new Error(`Error validating type of isAutofillMonthOn when applying listeners after month state change`);
    console.log("Trying to add listeners to Appointment buttons...");
    const aptInterv = setInterval(interv => {
      try {
        const appointmentBtns = Array.from(document.querySelectorAll(".appointmentBtn")).filter(
          aptBtn => aptBtn instanceof HTMLButtonElement,
        );
        if (
          !(
            appointmentBtns.length > 0 &&
            Array.from(appointmentBtns).every(aptbtn => aptbtn instanceof HTMLButtonElement)
          )
        ) {
          console.warn(`Failed to fetch appointment buttons. Retrying in 0.2 seconds...`);
          return;
        }
        if (!rootDlgContext.addedAptListeners) {
          for (const aptBtn of appointmentBtns)
            aptBtn.addEventListener("click", ev => handleAptBtnClick(ev as MouseEvent, userClass));
          //adição de listeners para autoajuste de opções e validação de datas
          handleClientPermissions(
            userClass,
            ["supervisor", "coordenador"],
            ...document.getElementsByClassName("apptCheck"),
            ...document.getElementsByClassName("eraseAptBtn"),
          );
          handleClientPermissions(userClass, ["coordenador"], ...document.getElementsByClassName("dayTabRef"));
        }
        rootDlgContext.addedAptListeners = true;
        clearInterval(interv);
      } catch (e) {
        console.warn(`Error trying to reapply listeners to appointment buttons:
        ${(e as Error).message}`);
      }
    }, 200);
    setTimeout(() => {
      clearInterval(aptInterv);
      console.log("Cleared Appointment Interval");
      try {
        const appointmentBtns = Array.from(document.querySelectorAll(".appointmentBtn")).filter(
          aptBtn => aptBtn instanceof HTMLButtonElement,
        );
        if (
          !(
            appointmentBtns.length > 0 &&
            Array.from(appointmentBtns).every(aptbtn => aptbtn instanceof HTMLButtonElement)
          )
        )
          throw elementNotPopulated(appointmentBtns, "Appointment Buttons", extLine(new Error()));
      } catch (e) {
        console.error(`Error executing procedure for adding listeners to Appointment Buttons:${(e as Error).message}`);
      }
    }, 2000);
    const checkInterv = setInterval(interv => {
      try {
        const dayChecks = scope.querySelectorAll('input[class*="apptCheck"]');
        if (dayChecks.length < 0) {
          console.warn(`Failed to fetch day checks list. Retrying in 0.2 seconds...`);
          return;
        }
        if (!rootDlgContext.addedDayListeners) {
          dayChecks.forEach(dayCheck => {
            verifyAptCheck(dayCheck);
            (userClass === "coordenador" || userClass === "supervisor") &&
              dayCheck.addEventListener("change", () => {
                dayCheck instanceof HTMLInputElement && (dayCheck.type === "checkbox" || dayCheck.type === "radio")
                  ? checkConfirmApt(dayCheck)
                  : inputNotFound(dayCheck, `dayCheck id ${dayCheck?.id || "UNIDENTIFIED"}`, extLine(new Error()));
              });
          });
          handleClientPermissions(
            userClass,
            ["supervisor", "coordenador"],
            ...document.getElementsByClassName("apptCheck"),
            ...document.getElementsByClassName("eraseAptBtn"),
          );
          handleClientPermissions(userClass, ["coordenador"], ...document.getElementsByClassName("dayTabRef"));
        }
        rootDlgContext.addedDayListeners = true;
        clearInterval(interv);
      } catch (e) {
        console.error(`Error executing interval for applying listeners to Day Checks:\n${(e as Error).message}`);
      }
    }, 200);
    setTimeout(() => {
      try {
        const dayChecks = scope.querySelectorAll('input[class*="apptCheck"]');
        if (dayChecks.length < 0)
          throw elementNotPopulated(dayChecks, "Checkboxes for day checks", extLine(new Error()));
      } catch (e) {
        console.error(`Error executing procedure for readding listeners to Day Checks:\n${(e as Error).message}`);
      }
      clearInterval(checkInterv);
    }, 5000);
  } catch (err) {
    console.error(`Error executing addListenersForSchedTab():
    ${(err as Error).message}`);
  }
}
export function applyStylesForSchedTab(scope: HTMLElement | Document = document): void {
  try {
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw elementNotFound(scope, `Scope for Table Schedule Root when applying styles`, extLine(new Error()));
    clearPhDates(Array.from(scope.querySelectorAll('input[type="date"]')));
  } catch (err) {
    console.error(`Error executing applyStylesForSchedTab:
    ${(err as Error).message}`);
  }
}
export function addListenerForSchedUpdates(monthSelector: targEl): void {
  try {
    if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
      throw inputNotFound(
        monthSelector,
        `Fetch for Month Selector when applying listeners to Schedule Table Section updates`,
        extLine(new Error()),
      );
    const tabSect = document.getElementById("tbSchedule");
    if (!(tabSect instanceof HTMLElement))
      throw elementNotFound(tabSect, `Fetch for Schedule Table Section`, extLine(new Error()));
    const tabSectEntryEls = [
      ...tabSect.getElementsByTagName("input"),
      ...tabSect.getElementsByTagName("select"),
      ...tabSect.getElementsByTagName("textarea"),
    ];
    if (!(tabSectEntryEls.length > 0))
      throw elementNotPopulated(
        tabSectEntryEls,
        "List for Entry Elements in the Schedule Table Section",
        extLine(new Error()),
      );
    const slots = Array.from(tabSect.getElementsByTagName("slot"));
    if (!(slots.length > 0))
      throw elementNotPopulated(slots, `Fetch for Slots in the Schedule Table Section`, extLine(new Error()));
    if (!sessionScheduleState.hasOwnProperty(monthSelector.value))
      throw new Error(
        `Error comparing value of Month Selector and properties of Session Schedule States object when applying listeners to Schedule Table Section updates`,
      );
    const tbodyTab = document.getElementById("tbSchedule");
    if (!(tbodyTab instanceof HTMLElement))
      throw elementNotFound(tbodyTab, `Fetch for Schedule Table Body`, extLine(new Error()));
    //atualização real do state na renderização inicial da agenda, baseado no mês automaticamente aplicado
    //timeout para garantir que todas as outras funções de montagem dinâmica foram aplicadas antes de ler o state
    const setEntryValueState = (el: entryEl): void => {
      setTimeout(() => {
        try {
          const relMonthArrEntries = sessionScheduleState[`${monthSelector.value}Values`];
          if (!Array.isArray(relMonthArrEntries))
            throw typeError(
              "checking type of property in sessionScheduleState index",
              relMonthArrEntries.toString(),
              "Array",
              extLine(new Error()),
            );
          const arrEntry = relMonthArrEntries.find(entry => entry[0] === el.id);
          if (!Array.isArray(arrEntry))
            throw typeError(
              "checking type of property in relMonthArrEntries index",
              arrEntry,
              "Array",
              extLine(new Error()),
            );
          el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio")
            ? (arrEntry[1] = el.checked.toString())
            : (arrEntry[1] = el.value);
        } catch (err) {
          console.warn(`Error matching input with available data in sessionScheduleState:
          Obtained relatedArray: ${sessionScheduleState[`${monthSelector.value}Values`]}
          Obtained entryArray: ${(sessionScheduleState[`${monthSelector.value}Values`] as Array<any>)?.find(
            entry => entry[0] === el.id,
          )}
          Obtained element: ${el ?? "nullish"}
          ${(err as Error).message}`);
        }
      }, 300);
    };
    setTimeout(() => {
      sessionScheduleState[monthSelector.value] = tbodyTab.innerHTML;
      for (let e = 0; e < tabSectEntryEls.length; e++) {
        tabSectEntryEls[e] instanceof HTMLSelectElement &&
          tabSectEntryEls[e].addEventListener(
            "change",
            function (this: HTMLSelectElement, event: Event): void {
              event.stopPropagation();
              sessionScheduleState[monthSelector.value] = tbodyTab.innerHTML;
              setEntryValueState(this as HTMLSelectElement);
            }.bind(tabSectEntryEls[e] as HTMLSelectElement),
          );
        (tabSectEntryEls[e] instanceof HTMLInputElement || tabSectEntryEls instanceof HTMLTextAreaElement) &&
          tabSectEntryEls[e].addEventListener(
            "input",
            function (this: HTMLInputElement | HTMLTextAreaElement, event: Event): void {
              event.stopPropagation();
              sessionScheduleState[monthSelector.value] = tbodyTab.innerHTML;
              setEntryValueState(this as HTMLInputElement);
            }.bind(tabSectEntryEls[e] as HTMLInputElement | HTMLTextAreaElement),
          );
      }
      for (let s = 0; s < slots.length; s++) {
        slots[s] instanceof HTMLSlotElement &&
          slots[s].addEventListener("drop", () => {
            sessionScheduleState[monthSelector.value] = tbodyTab.innerHTML;
          });
      }
    }, 500);
  } catch (err) {
    console.error(`Error adding listeners to updates in Schedule Table Section:
    ${(err as Error).message}`);
  }
}
export function fillSchedStateValues(month: string): void {
  try {
    if (!(typeof month === "string"))
      throw stringError(`validating month string in fillSchedStateValues`, month, extLine(new Error()));
    const tbodySched = document.getElementById("tbSchedule");
    if (!(tbodySched instanceof HTMLElement))
      throw elementNotFound(
        tbodySched,
        `Table Body for Schedule when initializating state for month ${month}`,
        extLine(new Error()),
      );
    sessionScheduleState[month] = tbodySched.innerHTML;
    const entriesData = [
      ...tbodySched.querySelectorAll("input"),
      ...tbodySched.querySelectorAll("select"),
      ...tbodySched.querySelectorAll("textarea"),
    ]
      .filter(
        entry =>
          entry instanceof HTMLInputElement ||
          entry instanceof HTMLSelectElement ||
          entry instanceof HTMLTextAreaElement,
      )
      .map(entry =>
        entry instanceof HTMLInputElement && (entry.type === "checkbox" || entry.type === "radio")
          ? [entry.id || entry.name, entry.checked.toString()]
          : [entry.id || entry.name, entry.value],
      );
    if (entriesData.length < 1)
      throw elementNotPopulated(
        entriesData.flat(1),
        `Populating array of entries data for month ${month}`,
        extLine(new Error()),
      );
    sessionScheduleState[`${month}Values`] = entriesData as Array<[string, string]>;
  } catch (err) {
    console.warn(`Error initializating state for month ${month}:
    ${(err as Error).message}`);
  }
}
