import { highlightChange } from "../../global/gStyleScript";
import { parseNotNaN } from "../../global/gModel";
import { updateSimpleProperty } from "../../global/handlers/gHandlers";
import * as EdFisNutHandler from "./edFisNutHandler";
import * as EdFisNutModel from "./edFisNutModel";
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
import {
  extLine,
  elementNotFound,
  inputNotFound,
  elementNotPopulated,
  multipleElementsNotFound,
  matchError,
  typeError,
} from "../../global/handlers/errorHandler";
import { autofillResult, entryEl, targEl } from "../../global/declarations/types";
export const defaultResult: autofillResult = [0, [0, 0, 0], [0, 0, 0, 0, 0], []];
export const formatValue = (targ: entryEl, numValue: number | string = "0", fix: number = 4): void => {
  const placeComma = (numValue: number | string): string => {
    return `${numValue.toString().slice(0, numValue.toString().lastIndexOf("."))},${numValue
      .toString()
      .slice(numValue.toString().lastIndexOf(".") + 1)}`;
  };
  if (!(targ.type === "number")) {
    targ.value = new Intl.NumberFormat("pt-BR").format(parseNotNaN(numValue.toString(), 0, "float", fix));
  }
  if (
    !Number.isFinite(parseNotNaN(targ.value.replaceAll(",", ""), 0, "float", fix)) ||
    targ.value === "" ||
    !targ.value
  ) {
    targ.type === "number" ? (targ.value = numValue.toString()) : (targ.value = placeComma(numValue));
  } else {
    targ.value = numValue.toString();
  }
  if (
    !Number.isFinite(parseNotNaN(targ.value.replaceAll(",", ""), 0, "float", fix)) ||
    targ.value === "" ||
    !targ.value
  )
    typeof numValue === "string" ? (targ.value = numValue) : (targ.value = numValue.toFixed(4));
};
export function checkReturnIndex(targInp: targEl, prop: number = 0, context?: string): number {
  if (
    (targInp instanceof HTMLInputElement ||
      targInp instanceof HTMLTextAreaElement ||
      targInp instanceof HTMLSelectElement) &&
    typeof context === "string" &&
    typeof prop === "number"
  ) {
    const returnedProp = updateSimpleProperty(targInp) ?? 0;
    typeof returnedProp === "number"
      ? (prop = parseFloat(returnedProp.toFixed(4)))
      : typeError("update de prop", returnedProp, "number", extLine(new Error()));
  } else multipleElementsNotFound(extLine(new Error()), "arguments for checkReturnIndex", targInp, context, prop);
  return prop || 0;
}
export function validateTitlesForTargs(numCons: number = 1): targEl[] {
  const arrTargs: targEl[] = [];
  /*os titles são construídos somente para alertar se houver inadequação
    de entitulações no HTML (por ordem ou texto)*/
  [
    [document.querySelector(`#tabCelRowMedAnt2_1`), /Peso/g, "Weight", "tabInpRowMedAnt2_"],
    [document.querySelector("#tabCelRowMedAnt3_1"), /Altura/g, "Height", "tabInpRowMedAnt3_"],
    [document.querySelector("#tabCelRowIndPerc2_1"), /IMC/g, "IMC", `inpImc${numCons}Cel2_`],
    [document.querySelector("#tabCelRowIndPerc3_1"), /MLG/g, "MLG", `inpMlg${numCons}Cel3_`],
    [document.querySelector("#tabCelRowIndPerc5_1"), /TMB/g, "TMB", `inpTmb${numCons}Cel5_`],
    [document.querySelector("#tabCelRowIndPerc6_1"), /GET/g, "GET", `inpGet${numCons}Cel6_`],
    [document.querySelector("#tabCelRowDCut9_1"), /Soma/g, "SumDCut", "tabInpRowDCut9_"],
    [document.querySelector("#tabCelRowIndPerc4_1"), /PGC/g, "PGC", `inpPgc${numCons}Cel4_`],
  ].forEach(context => {
    const [titleEl, regex, stringAtt, idPrefix] = context as [targEl, RegExp, string, string];
    if (titleEl?.textContent?.match(regex)) {
      const targ = document.querySelector(`#${idPrefix}${numCons + 1}`);
      targ instanceof HTMLInputElement
        ? arrTargs.push(targ)
        : inputNotFound(targ, `targInp${stringAtt}`, extLine(new Error()));
    } else
      matchError(
        `Title Row for fields about ${stringAtt}`,
        titleEl,
        titleEl?.textContent || "null",
        extLine(new Error()),
      );
  });
  arrTargs.length < 8 && console.error(`Invalid Elements for arrTargs: ${arrTargs.toString()}`);
  while (arrTargs.length < 8) arrTargs.push(undefined);
  return arrTargs || [];
}
export function addListenerComorbBtns(rowCountComorb: number = 3): [number, Element[]] {
  const comorbBtnsArray = Array.from(document.getElementsByClassName("countComorb"));
  if (comorbBtnsArray?.length > 0) {
    comorbBtnsArray.forEach(comorbBtn => {
      comorbBtn instanceof HTMLButtonElement
        ? comorbBtn.addEventListener("click", (): number => {
            EdFisNutHandler.switchRowComorb(comorbBtn, rowCountComorb);
            return rowCountComorb;
          })
        : elementNotFound(comorbBtn, "comorbBtn", extLine(new Error()));
    });
  } else elementNotPopulated(comorbBtnsArray ?? "null", "comorbBtnsArray", extLine(new Error()));
  return [rowCountComorb, comorbBtnsArray];
}
export function addListenerInnerTabs(
  consTablesFs: targEl,
  numColsCons: number = 1,
  areColGroupsSimilar: boolean = false,
): [number, boolean] {
  if (
    consTablesFs instanceof HTMLElement &&
    typeof numColsCons === "number" &&
    typeof areColGroupsSimilar === "boolean"
  ) {
    [numColsCons, areColGroupsSimilar] = EdFisNutModel.checkInnerColGroups(consTablesFs, areColGroupsSimilar);
    const allTabledInps = consTablesFs.querySelectorAll("input");
    if (allTabledInps?.length > 0) {
      allTabledInps.forEach(tabInp => {
        //para apagar retornos negativos anômalos
        tabInp.addEventListener("input", (): string => {
          if (parseInt(tabInp.value) < 0 || Number.isNaN(parseInt(tabInp.value))) tabInp.value = "0";
          return tabInp.value;
        });
      });
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "arguments for callbackInnerTabs()",
        consTablesFs,
        numColsCons,
        areColGroupsSimilar,
      );
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for addListenerInnerTabs()",
      consTablesFs,
      numColsCons,
      areColGroupsSimilar,
    );
  return [numColsCons || 0, areColGroupsSimilar || false];
}
export function addListenerTrioReadNumCons(
  consTablesFs: targEl,
  numTotalColsCons: number = 1,
  numTotalTabsCons: number = 1,
): targEl {
  const trioReadNumCons = document.getElementById("trioReadNumCons");
  if (
    consTablesFs instanceof HTMLElement &&
    typeof numTotalColsCons === "number" &&
    typeof numTotalTabsCons === "number"
  ) {
    trioReadNumCons instanceof HTMLInputElement && trioReadNumCons.type === "number"
      ? trioReadNumCons.addEventListener("input", (): void => {
          callbackTrioReadNumCons(consTablesFs, trioReadNumCons, numTotalColsCons, numTotalTabsCons);
        })
      : inputNotFound(trioReadNumCons?.id, "trioReadNumCons", extLine(new Error()));
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for addListenerTrioReadNumCons()",
      consTablesFs,
      numTotalColsCons,
      numTotalTabsCons,
    );
  return trioReadNumCons;
}
export function callbackTrioReadNumCons(
  consTablesFs: targEl,
  trioReadNumCons: targEl,
  numTotalColsCons: number = 1,
  numTotalTabsCons: number = 1,
): Element[] {
  const numConsTextHeadCels = Array.from(document.getElementsByClassName("numConsTextHeadCel"));
  if (
    consTablesFs instanceof HTMLElement &&
    (trioReadNumCons instanceof HTMLInputElement || trioReadNumCons instanceof HTMLSelectElement) &&
    typeof numTotalColsCons === "number" &&
    typeof numTotalTabsCons === "number"
  ) {
    if (
      trioReadNumCons instanceof HTMLInputElement &&
      parseInt(trioReadNumCons.value) <= 0 &&
      trioReadNumCons.value !== ""
    ) {
      trioReadNumCons.value = "";
      const range = document.createRange();
      range.setStart(trioReadNumCons, 0);
    }
    const numTotalTitledColsCons = numTotalColsCons - numTotalTabsCons;
    numConsTextHeadCels.length === numTotalTitledColsCons
      ? EdFisNutHandler.switchNumConsTitles(
          numConsTextHeadCels,
          trioReadNumCons,
          numTotalTitledColsCons,
          numTotalTabsCons,
        )
      : elementNotPopulated(
          numConsTextHeadCels,
          "numConsTextHeadCels in callbackTrioReadNumCons()",
          extLine(new Error()),
        );
    numConsTextHeadCels.forEach(numConsCel => {
      highlightChange(numConsCel, "rgba(250, 30, 0, 0.3)");
    });
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for callbackTrioReadNumCons()",
      consTablesFs,
      trioReadNumCons,
      numTotalColsCons,
      numTotalTabsCons,
    );
  return numConsTextHeadCels;
}
export function callbackAutoFillBtn(autoFillBtn: targEl, isAutoFillActive: boolean = true): boolean {
  autoFillBtn instanceof HTMLButtonElement ||
  (autoFillBtn instanceof HTMLInputElement && (autoFillBtn.type === "checkbox" || autoFillBtn.type === "radio"))
    ? (isAutoFillActive = EdFisNutHandler.switchAutoFill(autoFillBtn, isAutoFillActive))
    : elementNotFound(autoFillBtn, "autoFillBtn in callbackAutoFillBtn()", extLine(new Error()));
  return isAutoFillActive;
}
export function addListenerProtocolo(protocolo: targEl, tabDC: targEl, textBodytype: targEl): string {
  const prVal = (protocolo as entryEl)?.value ?? "pollock3";
  if (
    (protocolo instanceof HTMLSelectElement || protocolo instanceof HTMLInputElement) &&
    tabDC instanceof HTMLTableElement &&
    (textBodytype instanceof HTMLSelectElement || textBodytype instanceof HTMLInputElement)
  )
    protocolo.addEventListener("change", (): string => {
      protocolo.value = EdFisNutModel.changeTabDCutLayout(protocolo, tabDC, textBodytype);
      return protocolo.value;
    });
  else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for addListenerProtocolo",
      protocolo,
      tabDC,
      textBodytype,
    );
  return prVal;
}
