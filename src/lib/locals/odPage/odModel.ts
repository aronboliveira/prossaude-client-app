import { targEl } from "../../global/declarations/types";
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização

import { extLine, elementNotFound, inputNotFound, elementNotPopulated } from "../../global/handlers/errorHandler";
export function resetAvDentValue(targInp: targEl): boolean {
  let isValuePreDef = false;
  if (
    targInp instanceof HTMLSelectElement ||
    targInp instanceof HTMLInputElement ||
    targInp instanceof HTMLTextAreaElement
  ) {
    const dlOptionsArray = Array.from(document.getElementsByClassName("elemOp"));
    if (dlOptionsArray?.every(dlOption => dlOption instanceof HTMLOptionElement)) {
      for (const option of dlOptionsArray) {
        if ((option as HTMLOptionElement).value === targInp.value) {
          isValuePreDef = true;
          break;
        }
      }
      if (isValuePreDef && targInp instanceof HTMLElement) {
        setTimeout(() => {
          targInp.value = "";
        }, 100);
        targInp.setAttribute("placeholder", "Apagado");
        const placeholderTimer = setTimeout(() => targInp.classList.add("placeholder-hidden"), 1000);
        targInp.addEventListener("blur", () => {
          targInp.classList.remove("placeholder-hidden");
          clearTimeout(placeholderTimer);
        });
        targInp.addEventListener("focus", () => {
          targInp.classList.remove("placeholder-hidden");
          clearTimeout(placeholderTimer);
        });
      }
    } else {
      dlOptionsArray.forEach(dlOption => {
        if (!(dlOption instanceof HTMLInputElement || dlOption instanceof HTMLTextAreaElement))
          inputNotFound(dlOption, `${dlOption?.id ?? "UNDEFINED ID DLOPTION"}`, extLine(new Error()));
      });
    }
    for (const option of dlOptionsArray) {
      if ((option as HTMLOptionElement).value !== targInp.value) {
        isValuePreDef = false;
        break;
      }
    }
  } else inputNotFound(targInp, "targInp", extLine(new Error()));
  return isValuePreDef;
}
export function orderLabels(subDiv: targEl): void {
  if (subDiv instanceof HTMLElement) {
    const labsNList = subDiv.querySelectorAll(".labelAvDent");
    if (labsNList?.length > 0 && labsNList[0]?.id?.match(/\d+/) !== null) {
      for (let i = 0; i < labsNList.length; i++) {
        labsNList[i] instanceof HTMLElement
          ? (labsNList[i] as HTMLElement).style.setProperty("order", (i + 1).toString())
          : elementNotFound(labsNList[i], `labsNList${i}`, extLine(new Error()));
      }
    } else elementNotPopulated(labsNList, "labsNList in orderLabels", extLine(new Error()));
  } else elementNotFound(subDiv, "subDiv in orderLabels", extLine(new Error()));
}
