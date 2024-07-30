import { extLine, inputNotFound } from "../../global/handlers/errorHandler";
import { targEl } from "../../global/declarations/types";
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização


export function addDblQuotes(qtedInp: targEl): string {
  let qtedValue = "";
  if (
    qtedInp instanceof HTMLInputElement ||
    qtedInp instanceof HTMLTextAreaElement
  ) {
    if (qtedInp.value === "") {
      qtedInp.value = '""';
      qtedInp.setSelectionRange(1, 1);
    } else if (qtedInp.value === '"') {
      qtedInp.value += '"';
      qtedInp.setSelectionRange(1, 1);
    }
    qtedValue = qtedInp.value;
  } else
    inputNotFound(
      qtedInp,
      `${qtedInp?.id ?? "UNDEFINED ID QUOTED CONTAINER"}`,
      extLine(new Error())
    );
  return qtedValue;
}
