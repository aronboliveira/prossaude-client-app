//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
import { targEl } from "../../global/declarations/types";
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
    }
    for (const option of dlOptionsArray) {
      if ((option as HTMLOptionElement).value !== targInp.value) {
        isValuePreDef = false;
        break;
      }
    }
  }
  return isValuePreDef;
}
export function orderLabels(subDiv: targEl): void {
  if (subDiv instanceof HTMLElement) {
    const labsNList = subDiv.querySelectorAll(".labelAvDent");
    if (labsNList?.length > 0 && labsNList[0]?.id?.match(/\d+/) !== null) {
      for (let i = 0; i < labsNList.length; i++) {
        if (labsNList[i] instanceof HTMLElement)
          (labsNList[i] as HTMLElement).style.setProperty("order", (i + 1).toString());
      }
    }
  }
}
