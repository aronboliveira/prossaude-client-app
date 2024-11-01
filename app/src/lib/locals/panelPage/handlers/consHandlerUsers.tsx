//nesse arquivo estarão as funções de gerenciamento de usuário
import { entryEl, targEl } from "../../../global/declarations/types";
import { elementNotPopulated, extLine } from "../../../global/handlers/errorHandler";
export function handleClientPermissions(
  userClass: string = "estudante",
  allowedClasses: string[] = ["coordenador"],
  ...elements: targEl[]
): void {
  try {
    if (!(typeof userClass === "string")) return;
    if (!(Array.isArray(allowedClasses) && allowedClasses.every(userClass => typeof userClass === "string")))
      return;
    if (Array.isArray(elements) && elements.every(el => el instanceof Element)) {
      let message = `Permissõnes não concedidas. 
      Campos afetados:\n`;
      for (let e = 0; e < elements.length; e++) {
        if (
          elements[e] instanceof HTMLInputElement ||
          elements[e] instanceof HTMLButtonElement ||
          elements[e] instanceof HTMLSelectElement ||
          elements[e] instanceof HTMLTextAreaElement
        ) {
          (elements[e] as entryEl).disabled = true;
          if (elements[e]?.classList.contains("btn") && !elements[e]?.classList.contains("btn-secondary"))
            elements[e]!.classList.add("btn-secondary", "blocked");
          if (allowedClasses.some(allowedClass => new RegExp(allowedClass, "gi").test(userClass))) {
            (elements[e] as entryEl).disabled = false;
            if (
              elements[e]?.classList.contains("btn") &&
              elements[e]?.classList.contains("btn-secondary") &&
              elements[e]?.classList.contains("blocked")
            )
              elements[e]?.classList.remove("btn-secondary", "blocked");
          } else message += `Element ${e + 1}. \n ${elements[e]?.id || elements[e]?.tagName || "Não identificado"}\n`;
        }
        if (elements[e] instanceof HTMLDataListElement || elements[e] instanceof HTMLTableElement) {
          if (!allowedClasses.some(allowedClass => new RegExp(allowedClass, "gi").test(userClass)))
            elements[e]!.remove() as void;
        }
      }
    } else throw elementNotPopulated(elements, "Elements for handleSupervisionCredential", extLine(new Error()));
  } catch (err) {
    console.error(`ERROR:
		${(err as Error).message}.`);
  }
}
