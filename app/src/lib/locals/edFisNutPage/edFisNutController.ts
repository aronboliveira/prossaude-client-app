//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
import { parseNotNaN } from "../../global/gModel";
import { updateSimpleProperty } from "../../global/handlers/gHandlers";
import * as EdFisNutHandler from "./edFisNutHandler";
import * as EdFisNutModel from "./edFisNutModel";
import {
  extLine,
  elementNotFound,
  elementNotPopulated,
  multipleElementsNotFound,
  typeError,
} from "../../global/handlers/errorHandler";
import { entryEl, targEl } from "../../global/declarations/types";
export const formatValue = (targ: entryEl, numValue: number | string = "0", fix: number = 4): void => {
  const parsedValue = parseNotNaN(typeof numValue === "string" ? numValue : numValue.toString(), 0, "float", fix);
  if (targ.type === "number") {
    targ.value = parsedValue.toString();
    return;
  } else if (
    targ.type === "text" ||
    targ.type === "password" ||
    targ.type === "tel" ||
    targ instanceof HTMLTextAreaElement
  ) {
    targ.value = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: fix }).format(parsedValue);
    if (!Number.isFinite(parseNotNaN(targ.value.replaceAll(",", ""), 0, "float", fix)) || targ.value === "")
      targ.value = parsedValue.toFixed(fix);
  }
};
export function checkReturnIndex(targInp: targEl, prop: number = 0): number {
  if (
    (targInp instanceof HTMLInputElement ||
      targInp instanceof HTMLTextAreaElement ||
      targInp instanceof HTMLSelectElement) &&
    typeof prop === "number"
  ) {
    const returnedProp = updateSimpleProperty(targInp) ?? 0;
    typeof returnedProp === "number"
      ? (prop = parseNotNaN(returnedProp.toFixed(4)))
      : typeError("update de prop", returnedProp, "number", extLine(new Error()));
  } else multipleElementsNotFound(extLine(new Error()), "arguments for checkReturnIndex", targInp, prop);
  return prop || 0;
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
  try {
    if (
      !(
        consTablesFs instanceof HTMLElement &&
        typeof numColsCons === "number" &&
        typeof areColGroupsSimilar === "boolean"
      )
    )
      throw multipleElementsNotFound(
        extLine(new Error()),
        "arguments for addListenerInnerTabs()",
        consTablesFs,
        numColsCons,
        areColGroupsSimilar,
      );
    [numColsCons, areColGroupsSimilar] = EdFisNutModel.checkInnerColGroups(consTablesFs, areColGroupsSimilar);
    const allTabledInps = consTablesFs.querySelectorAll("input");
    if (!(allTabledInps.length > 0))
      throw multipleElementsNotFound(
        extLine(new Error()),
        "arguments for callbackInnerTabs()",
        consTablesFs,
        numColsCons,
        areColGroupsSimilar,
      );
    allTabledInps.forEach(tabInp => {
      //para apagar retornos negativos anômalos
      if (!tabInp.dataset.iswhole || tabInp.dataset.iswhole !== "true") {
        tabInp.addEventListener("input", (): void => {
          if (parseFloat(tabInp.value) < 0 || !Number.isFinite(parseFloat(tabInp.value))) tabInp.value = "0";
        });
        tabInp.dataset.iswhole = "true";
      }
    });
  } catch (e) {
    console.error(`Error executing addListenerInnerTabs:\n${(e as Error).message}`);
    return [numColsCons || 0, areColGroupsSimilar || false];
  }
  return [numColsCons || 0, areColGroupsSimilar || false];
}
