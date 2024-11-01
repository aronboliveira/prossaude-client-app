import { parseNotNaN } from "../../global/gModel";
import { targEl } from "../../global/declarations/types";
import {
  extLine,
  elementNotPopulated,
  elementNotFound,
  inputNotFound,
  multipleElementsNotFound,
} from "../../global/handlers/errorHandler";
import { highlightChange, strikeNulls, addListenerForValidities } from "../../global/gStyleScript";
import {
  convertWeekdaysToMonthdays,
  convertMonthdaysToWeekdays,
  correlateAptMonthDays,
  correlateWorkingDays,
  removeRepeateadWorkingDays,
} from "./handlers/consHandlerCmn";

//nesse arquivo estão funções para estilização geral

export function strikeEntries(mainRef: HTMLElement): void {
  const inAndOutEls = [
    ...mainRef.querySelectorAll("output"),
    ...mainRef.querySelectorAll("input"),
    ...mainRef.querySelectorAll("select"),
    ...mainRef.querySelectorAll("textarea"),
  ];
  inAndOutEls.length > 0
    ? strikeNulls(inAndOutEls)
    : elementNotPopulated(inAndOutEls, "inAndOutEls in useEffect() for sectTabRef", extLine(new Error()));
}
export function setListenersForDates(
  dateInps: Array<targEl>,
  monthStateSelector: targEl,
  isAutoFillMonthOn = true,
  isInitialSet = true,
): [RegExp, (workingDays: [number, number], month?: string) => void] {
  if (Array.isArray(dateInps) && dateInps.length > 0 && dateInps.every(inp => inp instanceof HTMLElement)) {
    if (
      monthStateSelector instanceof HTMLSelectElement ||
      (monthStateSelector instanceof HTMLInputElement && monthStateSelector.type === "number")
    ) {
      const monthMap = new Map([
        ["jan", "01"],
        ["feb", "02"],
        ["mar", "03"],
        ["apr", "04"],
        ["may", "05"],
        ["jun", "06"],
        ["jul", "07"],
        ["aug", "08"],
        ["sep", "09"],
        ["oct", "10"],
        ["nov", "11"],
        ["dec", "12"],
      ]);
      const revMonthMap = new Map([
        ["0", "jan"],
        ["1", "feb"],
        ["2", "mar"],
        ["3", "apr"],
        ["4", "may"],
        ["5", "jun"],
        ["6", "jul"],
        ["7", "aug"],
        ["8", "sep"],
        ["9", "oct"],
        ["10", "nov"],
        ["11", "dec"],
      ]);
      const firstOrderWorkDay = document.getElementById("firstWorkingDay");
      const secondOrderWorkDay = document.getElementById("secondWorkingDay");
      let workingDays: [number, number] = [
        parseNotNaN(firstOrderWorkDay?.dataset.weekday ?? "3") ?? 3,
        parseNotNaN(secondOrderWorkDay?.dataset.weekday ?? "5") ?? 5,
      ];
      let numMonth = monthMap.get(monthStateSelector.value.slice(0, 3));
      let month = `${numMonth!.padStart(2, "0")}`;
      const year = `${new Date().getFullYear()}`;
      const handleMonthChange = (
        workingDays: [number, number],
        month: string = `${(new Date().getMonth() + 1).toString().padStart(2, "0")}`,
      ): void => {
        //criação dos padrões de mês aceitos com base nas options disponíveis
        if (monthMap.get(monthStateSelector.value.slice(0, 3))) {
          //define as datas iniciais e pattern, com base em ano e mês (extraído da chave do map associado ao select)
          for (let d = 0; dateInps.length > d; d++) {
            if (dateInps[d] instanceof HTMLInputElement && (dateInps[d] as HTMLInputElement).type === "date") {
              //DIA COMO 01 AQUI
              (dateInps[d] as HTMLInputElement).value = `${year}-${month}-01`;
              (dateInps[d] as HTMLInputElement).pattern = `/^${year}-${month}-[0-9]{2}$/`;
              (dateInps[d] as HTMLInputElement).style.color = "initial";
              highlightChange(dateInps[d] as HTMLInputElement, "skyblue");
            } else
              inputNotFound(dateInps[d], `date input id ${dateInps[d]?.id || "UNIDENTIFIED"}`, extLine(new Error()));
          }
          const monthdates = convertWeekdaysToMonthdays(
            workingDays,
            [1, 2, 3, 4],
            parseNotNaN(
              (parseNotNaN(monthMap.get(monthStateSelector.value) || "01") - 1).toString() ||
                new Date().getMonth().toString(),
            ),
          );
          if (monthdates.length >= dateInps.length - 1) {
            const lastConsDayConts = Array.from(document.getElementsByClassName("lastConsDayCont"));
            lastConsDayConts.forEach(lastConsDayCont => {
              if (lastConsDayCont instanceof HTMLElement) {
                //ESCONDE ÚLTIMA COLUNA AQUI, CASO NÃO HAJA QUINTO DIA REPETIDO NO MÊS
                if (monthdates.length === dateInps.length - 1 && lastConsDayCont instanceof HTMLElement) {
                  lastConsDayCont.hidden = true;
                  lastConsDayCont.style.display = "none";
                } else {
                  !lastConsDayCont
                    ? elementNotFound(
                        lastConsDayCont,
                        `column for last day appointments, length of monthdates ${monthdates?.length || 0}`,
                        extLine(new Error()),
                      )
                    : ((): void => {
                        lastConsDayCont.hidden = false;
                        lastConsDayCont.style.display = "table-cell";
                      })();
                }
              } else
                elementNotFound(
                  lastConsDayCont,
                  `Element in the fifth column id ${lastConsDayCont?.id || "UNDEFINED"}`,
                  extLine(new Error()),
                );
            });
            const mainConsDaysCont = document.getElementById(`mainConsDaysCont`);
            if (mainConsDaysCont instanceof HTMLElement) {
              const consDayConts = document.querySelectorAll('th[scope="col"]');
              let lengthRef = monthdates.length;
              if (consDayConts.length === dateInps.length) lengthRef = consDayConts.length;
              //ATRIBUIÇÃO AUTOMÁTICA DE DATAS AQUI
              for (let w = 0; w < lengthRef; w++) {
                if (typeof monthdates[w] === "number" && dateInps[w] instanceof HTMLInputElement) {
                  (dateInps[w] as HTMLInputElement).value = `${(dateInps[w] as HTMLInputElement).value.slice(
                    0,
                    8,
                  )}${monthdates[w].toString().padStart(2, "0")}`;
                } else {
                  inputNotFound(dateInps[w], "dateInps in the conversion from monthdates", extLine(new Error()));
                  break;
                }
              }
              if (
                monthdates.length === dateInps.length - 1 &&
                lastConsDayConts.every(cont => cont instanceof HTMLElement)
              ) {
                const daySel = document.getElementById("changeDaySel");
                daySel instanceof HTMLSelectElement
                  ? hideLastDay(daySel)
                  : inputNotFound(
                      daySel,
                      "Selector for day inclusion in setListeneresForDates()",
                      extLine(new Error()),
                    );
              }
            } else
              elementNotFound(
                mainConsDaysCont,
                "Main container for columns for appointment days",
                extLine(new Error()),
              );
          }
          correlateAptMonthDays(
            document.querySelector("#changeDaySel"),
            Array.from(document.querySelectorAll(".dayTabRef")),
            true,
          );
          addListenerForValidities(dateInps, new RegExp(`^${year}-${month}-[0-9]{2}$`));
          const [weekDayNames] = convertMonthdaysToWeekdays(
            parseNotNaN(monthMap.get(`${monthStateSelector.value}`) || new Date().getMonth().toString()),
            workingDays,
          );
          correlateWorkingDays(weekDayNames, dateInps.length);
        } else
          console.error(
            `Undefined match between de month <select> value and the map for available months. Aborting routine.`,
          );
      };
      if (isInitialSet === true) {
        monthStateSelector.value = `${revMonthMap.get(`${new Date().getMonth()}`)}`;
        workingDays = removeRepeateadWorkingDays(workingDays);
        handleMonthChange(workingDays);
        monthStateSelector.addEventListener("change", () => {
          //ajustes dinâmicos com base em mudança de valor do select de mês
          const toggleAutoFillMonth = document.getElementById("toggleAutofillMonth");
          toggleAutoFillMonth instanceof HTMLInputElement &&
          (toggleAutoFillMonth.type === "checkbox" || toggleAutoFillMonth.type === "radio")
            ? (isAutoFillMonthOn = toggleAutoFillMonth.checked)
            : inputNotFound(
                toggleAutoFillMonth,
                "Input for toggling month autofill on month selector change",
                extLine(new Error()),
              );
          if (isAutoFillMonthOn) {
            numMonth = monthMap.get(monthStateSelector.value.slice(0, 3));
            month = `${numMonth!.padStart(2, "0")}`;
            workingDays = removeRepeateadWorkingDays(workingDays);
            handleMonthChange(workingDays, month);
          }
        });
      } else {
        workingDays = removeRepeateadWorkingDays(workingDays);
        handleMonthChange(workingDays, month);
      }
      return [new RegExp(`^${year}-[0-9]{2}-${month}$`), handleMonthChange];
    } else elementNotFound(monthStateSelector, "monthStateSelector in setListenerForDates()", extLine(new Error()));
  } else elementNotPopulated(dateInps, "argument for setListenerForDates()", extLine(new Error()));
  return [/[0-9]{4}-[0-9]{2}-[0-9]{2}/, () => () => null];
}
export function hideLastDay(daySel: HTMLSelectElement | HTMLInputElement): void {
  if (
    Array.from(document.getElementsByClassName("lastConsDayCont")).some(cont => {
      cont instanceof HTMLElement && (cont.hidden === true || getComputedStyle(cont).display === "none");
    })
  ) {
    (daySel.lastElementChild as HTMLElement).hidden = true;
    (daySel.lastElementChild as HTMLElement).style.display = "none";
  }
}
export function correlateDayOpts(dateInps: targEl[], dateSel: targEl, userClass: string = "estudante"): void {
  if (
    Array.isArray(dateInps) &&
    dateInps.length > 0 &&
    dateInps.every(dateInp => dateInp instanceof HTMLElement) &&
    dateSel instanceof HTMLSelectElement
  ) {
    const includeOp = (dateInp: HTMLInputElement, dateInpValues: string[]): string[] => {
      const newOp = document.createElement("option");
      newOp.value = dateInp.value;
      newOp.id = `op_${dateInp.value}`;
      const sorted = document.getElementById(
        `${
          Array.from(dateSel.querySelectorAll("option"))
            .map<[string, number]>(dateRef => [
              (dateRef as HTMLOptionElement).id,
              parseNotNaN((dateRef as HTMLOptionElement).value.replaceAll("-", "")),
            ])
            .map<[string, number]>(numDateRef => [
              numDateRef[0],
              Math.abs(numDateRef[1] - parseNotNaN(newOp.value.replaceAll("-", ""))),
            ])
            .filter(sorted => Number.isFinite(sorted[1]) && sorted[1] > 0)
            .sort((a, b) => a[1] - b[1])[0][0]
        }`,
      );
      sorted ? sorted.insertAdjacentElement("afterend", newOp) : dateSel.prepend(newOp);
      const [year, month, day] = dateInp.value.split("-");
      navigator.language === "en-US"
        ? (newOp.textContent = `${month}/${day}/${year}`)
        : (newOp.textContent = `${day}/${month}/${year}`);
      dateInpValues = [];
      dateInpValues = dateInps.map(dateInp => (dateInp as HTMLInputElement).value);
      return dateInpValues;
    };
    dateInps.forEach(dateInp => {
      if (dateInp instanceof HTMLInputElement) {
        let dateInpValues = dateInps.map(dateInp => (dateInp as HTMLInputElement).value);
        (userClass === "coordenador" || userClass === "supervisor") &&
          dateInp.addEventListener("change", () => {
            //se a opção inputada não existir na coleção de opções, ela é incluída
            if (
              !Array.from(dateSel.querySelectorAll("option"))
                .map(dateOpt => dateOpt.value)
                .includes(dateInp.value)
            )
              dateInpValues = includeOp(dateInp, dateInpValues);
            else
              setTimeout(() => {
                if (Array.from(dateSel.querySelectorAll("option")).map(dateOpt => dateOpt.value) !== dateInpValues) {
                  //inclusão inicial de opções totais
                  dateInpValues = includeOp(dateInp, dateInpValues);
                  for (const option of Array.from(dateSel.querySelectorAll("option"))) {
                    //se a opção for duplicata, ela é removida
                    if (
                      dateInpValues
                        .map((dateInp, _, arr) => {
                          return arr.some(otherDateValue => dateInp === otherDateValue);
                        })
                        .filter(validity => validity === true).length > 1
                    ) {
                      const duplicate = dateInpValues
                        .map((dateValue, i, arr) => {
                          arr.splice(i, 1);
                          if (arr.includes(dateValue)) {
                            return arr[arr.findIndex(date => date === dateValue)];
                          }
                        })
                        .filter(date => typeof date === "string");
                      const optDuplicate = document.querySelectorAll(`option[value*="${duplicate}"]`);
                      //alerta de duplicação
                      setTimeout(() => {
                        document.querySelectorAll(`input[value*="${duplicate}"]`).forEach(duplicatedDate => {
                          (duplicatedDate as HTMLInputElement).style.color = `red`;
                          (duplicatedDate as HTMLInputElement).style.borderColor = `red`;
                          setTimeout(() => {
                            (duplicatedDate as HTMLInputElement).style.color = `revert`;
                            (duplicatedDate as HTMLInputElement).style.borderColor = `revert`;
                          }, 1000);
                        });
                      }, 500);
                      if (
                        (optDuplicate instanceof NodeList || Array.isArray(optDuplicate)) &&
                        optDuplicate.length > 1
                      ) {
                        const duplicates = Array.from(optDuplicate).slice(-1);
                        for (const duplicate of duplicates) dateSel.removeChild(duplicate);
                      }
                      //restaura o array após splicing
                      dateInpValues = dateInps.map(dateInp => (dateInp as HTMLInputElement).value);
                    }
                    //se não houver nenhuma igualdade entre a opção e as datas na agenda, ela é removida
                    if (!dateInpValues.some(dateInpValue => option.value === dateInpValue)) {
                      dateSel.removeChild(option);
                    }
                  }
                }
              }, 500);
            setTimeout(() => {
              const mapOrderWeekdays = new Map([
                [0, "Domingo"],
                [1, "Segunda-feira"],
                [2, "Terça-feira"],
                [3, "Quarta-feira"],
                [4, "Quinta-feira"],
                [5, "Sexta-feira"],
                [6, "Sábado"],
              ]);
              const dateLabel =
                (dateInp.closest("td") ?? dateInp.closest("th")!).querySelector(".consWeekday") ||
                (dateInp.closest("td") ?? dateInp.closest("th")!).querySelector("label");
              if (dateLabel instanceof HTMLElement) {
                dateLabel.textContent = `${dateLabel.textContent!.slice(
                  0,
                  dateLabel.textContent!.indexOf(" ") + 1,
                )}${mapOrderWeekdays.get(new Date(dateInp.value + "T00:00:00").getDay())}`;
                /sábado/gi.test(dateLabel.textContent) || /domingo/gi.test(dateLabel.textContent)
                  ? (dateLabel.textContent = dateLabel.textContent.replace("Primeira", "Primeiro"))
                  : (dateLabel.textContent = dateLabel.textContent.replace("Primeiro", "Primeira"));
              }
            }, 600);
          });
      } else inputNotFound(dateInp, `dateInp id ${dateInp?.id ?? "UNIDENTIFIED"}`, extLine(new Error()));
    });
  } else multipleElementsNotFound(extLine(new Error()), "arguments for correlateDayOpts", ...dateInps, dateSel);
}
