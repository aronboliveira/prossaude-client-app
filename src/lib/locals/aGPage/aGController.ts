import type { targEl } from "../../global/declarations/types";
import * as AGHandlers from "./aGHandlers";
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM

import { formatCEP, formatCPF, formatTel, addEmailExtension } from "../../global/gModel";
import {
  extLine,
  elementNotPopulated,
  inputNotFound,
  multipleElementsNotFound,
} from "../../global/handlers/errorHandler";
export function addListenerTelInputs(): Element[] {
  const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
  if (telInputs?.length > 0) {
    telInputs.forEach(telInput => {
      if (telInput instanceof HTMLInputElement || telInput instanceof HTMLTextAreaElement)
        telInput.addEventListener("input", input => {
          if (input.target instanceof HTMLInputElement || input.target instanceof HTMLTextAreaElement)
            formatTel(input.target);
          else
            inputNotFound(
              input?.target as HTMLElement,
              `target telInput id ${JSON.stringify(telInput?.id || "UNIDENTIFIED TELINPUT")}`,
              extLine(new Error())
            );
        });
      else
        inputNotFound(
          telInput as HTMLElement,
          `target telInput id ${JSON.stringify(telInput?.id || "UNIDENTIFIED TELINPUT")}`,
          extLine(new Error())
        );
    });
  } else elementNotPopulated(telInputs, "telInputs", extLine(new Error()));
  return Array.from(telInputs);
}
export function addListenersEmailInputs(): Element[] {
  const emailInputs = document.querySelectorAll('input[id^="email"]');
  if (emailInputs?.length > 0) {
    emailInputs.forEach(emailInput => {
      if (emailInput instanceof HTMLInputElement) {
        emailInput.addEventListener("click", () => addEmailExtension(emailInput));
        emailInput.addEventListener("input", () => addEmailExtension(emailInput));
      } else
        inputNotFound(
          emailInput,
          `target emailInput id ${emailInput?.id || "UNDEFINED EMAILINPUT"}`,
          extLine(new Error())
        );
    });
  } else elementNotPopulated(emailInputs, "emailInputs", extLine(new Error()));
  return Array.from(emailInputs);
}
export function addListenerCPFCont(): targEl {
  const inpCPF = document.getElementById("inpCPF");
  inpCPF instanceof HTMLInputElement
    ? inpCPF.addEventListener("input", () => {
        formatCPF(inpCPF);
      })
    : inputNotFound(inpCPF, "inpCPF in addListenerCPFCont()", extLine(new Error()));
  return inpCPF;
}
export function addListenersCepElements(): targEl[] {
  const cepElement = document.getElementById("cepId");
  const cepElementBtn = document.getElementById("autoCompCepBtn");
  if (cepElement instanceof HTMLInputElement && cepElementBtn instanceof HTMLButtonElement) {
    cepElement.addEventListener("input", () => formatCEP(cepElement));
    cepElement.addEventListener("input", () => {
      if (!AGHandlers.enableCEPBtn(cepElementBtn, cepElement.value.length)) {
        cepElementBtn.addEventListener("click", async () => {
          (await AGHandlers.searchCEP(cepElement)) === "fail" && AGHandlers.searchCEPXML(cepElement);
        });
      }
    });
  } else multipleElementsNotFound(extLine(new Error()), "Elements for CEP input", cepElement, cepElementBtn);
  return [cepElement, cepElementBtn];
}
