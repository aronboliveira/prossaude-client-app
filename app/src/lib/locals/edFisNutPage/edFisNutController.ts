//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
import { parseNotNaN } from "../../global/gModel";
import { updateSimpleProperty } from "../../global/handlers/gHandlers";
import * as EdFisNutModel from "./edFisNutModel";
import { extLine, multipleElementsNotFound, typeError } from "../../global/handlers/errorHandler";
import { entryEl, targEl } from "../../global/declarations/types";
import { tabProps } from "@/vars";
export const assignFormatedValue = (targ: entryEl, numValue: number | string = "0", fix: number = 4): void => {
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
export function addListenerInnerTabs(consTablesFs: targEl, numColsCons: number = 1): void {
  try {
    const colgrpsSimilar = tabProps.areColGroupsSimilar;
    if (
      !(consTablesFs instanceof HTMLElement && typeof numColsCons === "number" && typeof colgrpsSimilar === "boolean")
    )
      throw multipleElementsNotFound(
        extLine(new Error()),
        "arguments for addListenerInnerTabs()",
        consTablesFs,
        numColsCons,
        colgrpsSimilar,
      );
    EdFisNutModel.checkInnerColGroups(consTablesFs);
    const allTabledInps = consTablesFs.querySelectorAll("input");
    if (!(allTabledInps.length > 0))
      throw multipleElementsNotFound(
        extLine(new Error()),
        "arguments for callbackInnerTabs()",
        consTablesFs,
        numColsCons,
        colgrpsSimilar,
      );
    allTabledInps.forEach(tabInp => {
      //para apagar retornos negativos anômalos
      if (!tabInp.dataset.isreal || tabInp.dataset.isreal !== "true") {
        tabInp.addEventListener("input", (): void => {
          if (parseFloat(tabInp.value) < 0 || !Number.isFinite(parseFloat(tabInp.value))) tabInp.value = "0";
        });
        tabInp.dataset.isreal = "true";
      }
    });
  } catch (e) {
    console.error(`Error executing addListenerInnerTabs:\n${(e as Error).message}`);
  }
}
