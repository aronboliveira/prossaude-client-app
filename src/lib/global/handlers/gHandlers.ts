import { FormEvent, MutableRefObject } from "react";
import { addCanvasListeners } from "../gController";
import { autoCapitalizeInputs, parseNotNaN, regularToSnake } from "../gModel";
import { fadeElement, isClickOutside } from "../gStyleScript";
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import type {
  targEl,
  primitiveType,
  textEl,
  rMouseEvent,
  nlFm,
  nlHtEl,
  formCases,
  queryableNode,
  vRoot,
} from "../declarations/types";
import {
  extLine,
  elementNotFound,
  inputNotFound,
  multipleElementsNotFound,
  stringError,
  elementNotPopulated,
} from "./errorHandler";
import { handleSubmit } from "@/lib/global/data-service";
import { createRoot } from "react-dom/client";
import { toast } from "react-hot-toast";
import { navigatorVars } from "@/vars";
//function for facilitating conversion of types when passing properties to DOM elements
export function updateSimpleProperty(el: targEl): primitiveType {
  if (el instanceof HTMLInputElement) {
    if (el.type === "radio" || el.type === "checkbox") return (el as HTMLInputElement).checked.toString();
    else if (
      el.type === "number" ||
      el.type === "text" ||
      el.type === "tel" ||
      el.type === "password" ||
      el.type === "url"
    ) {
      const normalizedValue = parseFloat(el.value?.replaceAll(/[^0-9+\-.,]/g, "").replace(/,/g, "."));
      return Number.isFinite(normalizedValue) ? normalizedValue : 0;
    } else return el.value || "0";
  } else if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) return el.value;
  else inputNotFound(el, "el in updateSimpleProperty", extLine(new Error()));
  return "-1";
}
export function cursorCheckTimer(): number {
  const selection = getSelection();
  if (selection && selection.focusNode !== null) {
    setTimeout(() => {
      return selection.getRangeAt(0)?.startOffset;
    }, 3000);
  }
  return 0;
}
//handler for radios with options
export function opRadioHandler(keydown: KeyboardEvent | React.KeyboardEvent, radioPairs: targEl[]): void {
  if (radioPairs.every(radioPair => radioPair instanceof HTMLInputElement)) {
    for (
      let i = 0;
      i < radioPairs.length;
      i += 2 //pulando de par em par
    ) {
      const radioYes = radioPairs[i];
      const radioNo = radioPairs[i + 1];
      if (!radioYes || !radioNo) break;
      if (
        radioYes instanceof HTMLInputElement &&
        (radioYes.type === "checkbox" || radioYes.type === "radio") &&
        radioNo instanceof HTMLInputElement &&
        (radioNo.type === "checkbox" || radioNo.type === "radio") &&
        !radioYes.checked &&
        !radioNo.checked
      ) {
        if (keydown.altKey && keydown.key === "y") {
          radioYes.focus();
          radioYes.checked = true;
          setTimeout(() => {
            radioYes.blur();
          }, 5000);
          return;
        } else if (keydown.altKey && keydown.key === "n") {
          radioNo.focus();
          radioNo.checked = true;
          setTimeout(() => {
            radioNo.blur();
          }, 5000);
          return;
        }
      } else
        multipleElementsNotFound(
          extLine(new Error()),
          `validando radioYes id ${radioYes?.id || "UNDEFINED ID"} or radiosNo id ${radioNo?.id || "UNDEFINED ID"}`,
          radioYes,
          radioNo,
        );
    }
  } else console.error(`Error validating KeyboardEvent in opRadioHandler.`);
}
//handler for contextualized problems, with divAdd
export function cpbInpHandler(ev: Event, radio: targEl): void {
  if (
    ev instanceof Event &&
    radio instanceof HTMLInputElement &&
    (radio.type === "checkbox" || radio.type === "radio") &&
    radio?.parentElement?.parentElement
  ) {
    let divAdd: targEl = radio.parentElement.nextElementSibling;
    if (!(divAdd?.classList.contains("divAdd") || divAdd?.classList.contains("textAdd"))) {
      divAdd = radio.parentElement.parentElement.nextElementSibling;
      if (!(divAdd?.classList.contains("divAdd") || divAdd?.classList.contains("textAdd"))) {
        divAdd = radio.parentElement.nextElementSibling?.nextElementSibling;
        if (!(divAdd?.classList.contains("divAdd") || divAdd?.classList.contains("textAdd")))
          divAdd = radio.parentElement.parentElement?.parentElement?.nextElementSibling;
      }
    }
    //inclui ambos os tipos de eventos
    const idPattern =
      divAdd?.id
        .replace("text", "")
        .replace("Text", "")
        .replace("div", "")
        .replace("Div", "")
        .replace("Add", "")
        .replace("add", "")
        .replace("Id", "")
        .replace("id", "")
        .toLowerCase() || "";
    if (
      divAdd instanceof HTMLElement &&
      (radio.id?.toLowerCase().includes(idPattern) ||
        radio.id?.toLocaleLowerCase().includes(idPattern.slice(0, 1).toUpperCase() + idPattern.slice(1)))
    ) {
      if (radio.checked && radio.id.includes("Yes")) {
        fadeElement(divAdd, "0");
        setTimeout(() => {
          if (divAdd?.classList.toString().match(/grid/gi)) (divAdd as HTMLElement).style.display = "grid";
          else if (divAdd?.classList.toString().match(/flex/gi)) (divAdd as HTMLElement).style.display = "flex";
          else (divAdd as HTMLElement).style.display = "block";
          setTimeout(() => {
            fadeElement(divAdd, "1");
          }, 100);
          setTimeout(() => {
            if (divAdd instanceof HTMLElement && getComputedStyle(divAdd).display !== "none") {
              [
                ...divAdd.querySelectorAll('input[type="radio"]'),
                ...divAdd.querySelectorAll('input[type="checkbox"]'),
              ].forEach((rad, i) => {
                try {
                  if (!(rad instanceof HTMLInputElement && (rad.type === "radio" || rad.type === "checkbox")))
                    throw inputNotFound(rad, `Validation of input instance`, extLine(new Error()));
                  rad.dataset.required = "true";
                } catch (e) {
                  console.error(
                    `Error executing iteration ${i} for updating checkboxes requirements:\n${(e as Error).message}`,
                  );
                }
              });
              [
                ...divAdd.querySelectorAll('input[type="text"]'),
                ...divAdd.querySelectorAll('input[type="number"]'),
                ...(divAdd?.querySelectorAll('input[type="email"]') ?? []),
                ...divAdd.querySelectorAll('input[type="tel"]'),
                ...(divAdd?.querySelectorAll('input[type="date"]') ?? []),
              ].forEach((inp, i) => {
                try {
                  if (!(inp instanceof HTMLInputElement))
                    throw inputNotFound(inp, `Validation of input instance`, extLine(new Error()));
                  inp.required = true;
                } catch (e) {
                  console.error(
                    `Error executing iteration ${i} for updating text inputs requirements:\n${(e as Error).message}`,
                  );
                }
              });
            }
          }, 300);
        }, 400);
      } else {
        fadeElement(divAdd, "0");
        setTimeout(() => {
          (divAdd as HTMLElement).style.display = "none";
        }, 400);
        setTimeout(() => {
          if (divAdd instanceof HTMLElement && getComputedStyle(divAdd).display !== "none") {
            [
              ...divAdd.querySelectorAll('input[type="radio"]'),
              ...divAdd.querySelectorAll('input[type="checkbox"]'),
            ].forEach((rad, i) => {
              try {
                if (!(rad instanceof HTMLInputElement && (rad.type === "radio" || rad.type === "checkbox")))
                  throw inputNotFound(rad, `Validation of input instance`, extLine(new Error()));
                delete rad.dataset.required;
              } catch (e) {
                console.error(
                  `Error executing iteration ${i} for updating checkboxes requirements:\n${(e as Error).message}`,
                );
              }
            });
            [
              ...divAdd.querySelectorAll('input[type="text"]'),
              ...divAdd.querySelectorAll('input[type="number"]'),
              ...(divAdd?.querySelectorAll('input[type="email"]') ?? []),
              ...divAdd.querySelectorAll('input[type="tel"]'),
              ...(divAdd?.querySelectorAll('input[type="date"]') ?? []),
            ].forEach((inp, i) => {
              try {
                if (!(inp instanceof HTMLInputElement))
                  throw inputNotFound(inp, `Validation of input instance`, extLine(new Error()));
                inp.required = false;
              } catch (e) {
                console.error(
                  `Error executing iteration ${i} for updating text inputs requirements:\n${(e as Error).message}`,
                );
              }
            });
          }
        }, 600);
      }
    }
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "localizando parent elements de Radio",
      radio,
      radio?.parentElement,
      radio?.parentElement?.parentElement,
    );
}
export function doubleClickHandler(inpEl: targEl): void {
  if (inpEl instanceof HTMLInputElement && (inpEl.type === "checkbox" || inpEl.type === "radio")) {
    inpEl.checked = inpEl.checked ? false : true;
    cpbInpHandler(new Event("change"), inpEl);
  } else inputNotFound(inpEl, `inpEl id ${inpEl?.id || "UNDEFINED ID"}`, extLine(new Error()));
}
export function useCurrentDate(activation: Event, dateBtn: targEl): void {
  if (activation?.target === dateBtn && dateBtn instanceof HTMLButtonElement) {
    const currentDate = new Date();
    const targInputDate = searchPreviousSiblings(dateBtn, "inpDate");
    targInputDate instanceof HTMLInputElement && targInputDate.type === "date"
      ? (targInputDate.value =
          currentDate.getFullYear() +
          "-" +
          (currentDate.getMonth() + 1).toString().padStart(2, "0").replaceAll("'", "") +
          "-" +
          currentDate.getDate().toString().padStart(2, "0").replaceAll("'", ""))
      : inputNotFound(targInputDate, `targInputDate id ${targInputDate?.id || "UNDEFINED ID"}`, extLine(new Error()));
  } else elementNotFound(dateBtn, "arguments for useCurrentDate()", extLine(new Error()));
}
export function searchNextSiblings(currentElement: Element, searchedSiblingClass: string): Element {
  let loopAcc = 0;
  while (currentElement?.nextElementSibling) {
    currentElement = currentElement.nextElementSibling;
    if (currentElement?.classList?.contains(searchedSiblingClass) || loopAcc > 999) break;
    loopAcc++;
  }
  return currentElement;
}
export function searchPreviousSiblings(currentElement: Element, searchedSiblingClass: string): Element {
  let loopAcc = 0;
  while (currentElement?.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    if (currentElement?.classList?.contains(searchedSiblingClass) || loopAcc > 999) break;
    loopAcc++;
  }
  return currentElement;
}
export function searchPreviousSiblingsById(currentElement: Element, searchedSiblingId: string): Element {
  let loopAcc = 0;
  while (currentElement?.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    if (currentElement?.id === searchedSiblingId || loopAcc > 999) break;
    loopAcc++;
  }
  return currentElement;
}
export function searchParents(currentElement: Element, searchedParentClass: string): Element {
  let loopAcc = 0;
  while (currentElement?.parentElement) {
    currentElement = currentElement.parentElement;
    if (currentElement?.classList?.contains(searchedParentClass) || loopAcc > 999) break;
    loopAcc++;
  }
  return currentElement;
}
export function changeToAstDigit(toFileInpBtn: targEl): void {
  try {
    if (!(toFileInpBtn instanceof HTMLButtonElement))
      throw elementNotFound(toFileInpBtn, `Validation of Button for changin Signature input`, extLine(new Error()));
    if (!(toFileInpBtn.textContent || toFileInpBtn.textContent === ""))
      throw new Error(`No valid textContent for Button for changing Signature input`);
    const inpAst = toFileInpBtn.classList.contains("tratBtn")
      ? toFileInpBtn.previousElementSibling ??
        searchPreviousSiblings(toFileInpBtn, "inpAst") ??
        toFileInpBtn.parentElement?.querySelector(".inpAst")
      : toFileInpBtn.previousElementSibling ??
        toFileInpBtn.parentElement?.querySelector("#inpAstConfirmId") ??
        searchPreviousSiblings(toFileInpBtn, "inpAst") ??
        searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
    if (
      !(inpAst instanceof HTMLCanvasElement || inpAst instanceof HTMLInputElement || inpAst instanceof HTMLImageElement)
    )
      throw elementNotFound(inpAst, `Validation of field for Signature instance`, extLine(new Error()));
    if (!(inpAst.parentElement instanceof HTMLElement))
      throw elementNotFound(
        inpAst.parentElement,
        `Validation of Parent Element for field for Signature`,
        extLine(new Error()),
      );
    if (inpAst instanceof HTMLCanvasElement || /Usar/gi.test(toFileInpBtn.innerText)) {
      toFileInpBtn.innerText = "Retornar à Assinatura Escrita";
      const fileInp = document.createElement("input");
      fileInp.classList.add("inpAst", "mg-07t", "form-control");
      if (toFileInpBtn.classList.contains("tratBtn")) {
        fileInp.classList.add("inpTrat", "tratAst");
        fileInp.dataset.title =
          inpAst.dataset.title || `Assinatura do Tratamento ${document.querySelectorAll(".tratAst").length + 1}`;
      } else {
        fileInp.dataset.title = "Assinatura do Paciente";
        defineLabId(document.querySelector(".labAst"), toFileInpBtn, fileInp);
        fileInp.id = "inpAstConfirmId";
        if (toFileInpBtn.previousElementSibling instanceof HTMLButtonElement)
          toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
      }
      fileInp.type = "file";
      fileInp.accept = "image/*";
      fileInp.required = true;
      inpAst.parentElement.replaceChild(fileInp, inpAst);
      fileInp.addEventListener("change", chose => {
        try {
          let imgFile;
          if (fileInp?.files) imgFile = fileInp.files[0];
          if (
            chose?.target instanceof HTMLInputElement &&
            fileInp?.files &&
            fileInp.parentElement &&
            fileInp.files?.length > 0 &&
            imgFile?.type?.startsWith("image")
          ) {
            const fileReader = new FileReader();
            fileReader.onload = (load): void => {
              const imgAstDigt = document.createElement("img");
              fileInp.id = inpAst.id;
              fileInp.className = inpAst.className;
              Object.assign(imgAstDigt, {
                src: load.target?.result ?? "Error",
                innerHTML: "",
                id: fileInp.id,
                className: fileInp.className,
                alt: "Assinatura Digital",
                decoding: "async",
                loading: "eager",
                crossorigin: "anonymous",
                style: {
                  maxWidth: "300px",
                  maxHeight: "200px",
                  overflow: "auto",
                },
              });
              if (fileInp.classList.contains("inpTrat")) {
                imgAstDigt.style.height = "100%";
                imgAstDigt.style.maxHeight = "100%";
                imgAstDigt.style.width = "100%";
                imgAstDigt.style.maxHeight = "100%";
              } else {
                imgAstDigt.style.maxWidth = "30rem";
                imgAstDigt.style.maxHeight = "30rem";
              }
              imgAstDigt.style.overflow = "auto";
              fileInp.parentElement?.replaceChild(imgAstDigt, fileInp);
              !fileInp.classList.contains("inpTrat") &&
                defineLabId(document.querySelector(".labAst"), toFileInpBtn, imgAstDigt);
            };
            fileReader.readAsDataURL(imgFile);
          } else
            throw new Error(`Error on selecting the file and/or finding the parent Element for the file input.
            chose.target: ${chose?.target ?? "UNDEFINED CHOSE"};
            fileInp: ${fileInp ?? "UNDEFINED INP"};
            files: ${fileInp?.files ?? "UNDEFINED FILES"};
            parentElement: ${fileInp?.parentElement ?? "UNDEFINED PARENT"}; 
            imgFile: ${imgFile ?? "UNDEFINED IMAGE"}; 
            imgFile.type: ${imgFile?.type ?? "UNDEFINED TYPE"};`);
        } catch (error) {
          console.error((error as Error).message);
        }
      });
      [...document.querySelectorAll(".inpAst"), ...document.querySelectorAll(".tratBtn")].forEach((fileInp, i) => {
        try {
          if (!(fileInp instanceof HTMLElement))
            throw elementNotFound(fileInp, `Validation of field for Signature`, extLine(new Error()));
          fileInp.style.width = `${Math.max(
            ...Array.from(document.querySelectorAll(".tratBtn")).map(tratBtn => {
              return tratBtn instanceof HTMLElement
                ? parseNotNaN(getComputedStyle(tratBtn).width.replace("px", "").trim())
                : 0;
            }),
          )}px`;
        } catch (e) {
          console.error(
            `Error executing iteration ${i} for applying width to Fields for Signatures:\n${(e as Error).message}`,
          );
        }
      });
    } else if (!(inpAst instanceof HTMLCanvasElement) || /Retornar/gi.test(toFileInpBtn.innerText)) {
      toFileInpBtn.innerText = "Usar Assinatura Digital";
      if (toFileInpBtn.classList.contains("tratBtn")) {
        const textInp = document.createElement("input") as HTMLInputElement;
        textInp.id = inpAst.id;
        textInp.classList.add("inpTrat", "inpAst", "mg-07t", "tratAst", "form-control");
        textInp.dataset.title =
          inpAst.dataset.title || `Assinatura do Tratamento ${document.querySelectorAll(".tratAst").length + 1}`;
        textInp.required = true;
        inpAst.parentElement.replaceChild(textInp, inpAst);
        document.querySelectorAll(".inpAst").forEach((fileInp, i) => {
          try {
            if (!(fileInp instanceof HTMLElement))
              throw elementNotFound(fileInp, `Validation of field for Signature`, extLine(new Error()));
            fileInp.style.width = `${Math.max(
              ...Array.from(document.querySelectorAll(".tratBtn")).map(tratBtn => {
                return tratBtn instanceof HTMLElement
                  ? parseNotNaN(getComputedStyle(tratBtn).width.replace("px", "").trim())
                  : 0;
              }),
            )}px`;
          } catch (e) {
            console.error(
              `Error executing iteration ${i} for applying width to Fields for Signatures:\n${(e as Error).message}`,
            );
          }
        });
        textInp.addEventListener("input", ev => autoCapitalizeInputs(ev.currentTarget as HTMLInputElement));
      } else {
        const fileInp = document.createElement("canvas");
        Object.assign(fileInp, {
          id: "inpAstConfirmId",
        });
        fileInp.dataset.title = "Assinatura do Paciente";
        defineLabId(document.querySelector(".labAst"), toFileInpBtn, fileInp as any);
        toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
        inpAst.parentElement.replaceChild(fileInp, inpAst);
        addCanvasListeners();
      }
    } else stringError("textContent for toFileInpBtn", toFileInpBtn?.textContent, extLine(new Error()));
  } catch (e) {
    console.error(`Error executing changeToAstDigt:\n${(e as Error).message}`);
  }
}
export function defineLabId(
  labAst: targEl,
  toFileInpBtn: targEl,
  fileEl: HTMLInputElement | HTMLImageElement | HTMLCanvasElement,
): void {
  if (
    toFileInpBtn instanceof HTMLButtonElement &&
    (fileEl instanceof HTMLInputElement || fileEl instanceof HTMLImageElement || fileEl instanceof HTMLCanvasElement)
  ) {
    if (!labAst && (toFileInpBtn.parentElement?.tagName === "LABEL" || toFileInpBtn.parentElement?.tagName === "SPAN"))
      labAst = toFileInpBtn.parentElement;
    labAst!.id = "spanAstPct";
  } else multipleElementsNotFound(extLine(new Error()), "argumentos para defineLabId", toFileInpBtn, fileEl);
}
export function enableCPFBtn(cpfBtn: targEl, cpfLength: string = ""): boolean {
  if (cpfBtn instanceof HTMLButtonElement && typeof cpfLength === "string") {
    if (cpfLength.replaceAll(/[^0-9]/g, "").length < 11) {
      cpfBtn.disabled = true;
      cpfBtn.style.backgroundColor = "gray";
      cpfBtn.style.borderColor = "gray";
    } else {
      cpfBtn.disabled = false;
      cpfBtn.style.backgroundColor = "#0a58ca";
      cpfBtn.style.borderColor = "#0a58ca";
    }
    return cpfBtn.disabled;
  } else multipleElementsNotFound(extLine(new Error()), "argumentos para enableCEPBtn", cpfBtn, cpfLength);
  return true;
}
export function syncAriaStates(els: Array<Element> | NodeListOf<Element>): void {
  if (els instanceof NodeList) els = Array.from(els);
  els = els.filter(el => el instanceof Element);
  if (Array.isArray(els) && els.length > 0 && Array.from(els).every(el => el instanceof Element)) {
    els.forEach(el => {
      if (
        el instanceof HTMLHtmlElement ||
        el instanceof HTMLHeadElement ||
        el instanceof HTMLMetaElement ||
        el instanceof HTMLLinkElement ||
        el instanceof HTMLScriptElement ||
        el.tagName === "NOSCRIPT" ||
        el instanceof HTMLBaseElement ||
        el instanceof HTMLStyleElement ||
        (el.parentElement && el.parentElement instanceof HTMLHeadElement) ||
        el.classList.contains("watcher") ||
        el.classList.contains("spinner")
      )
        return;
      if (el instanceof HTMLElement) {
        el.hidden && !el.focus ? (el.ariaHidden = "true") : (el.ariaHidden = "false");
        el.addEventListener("click", () => {
          el.hidden && !el.focus ? (el.ariaHidden = "true") : (el.ariaHidden = "false");
        });
        if (el.classList.contains("poCaller")) {
          el.ariaHasPopup = "menu";
        }
        if (el instanceof HTMLSelectElement || el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          if (el instanceof HTMLSelectElement) {
            if (el.querySelectorAll("option").length > 0) {
              el.querySelectorAll("option").forEach(option => {
                option.selected ? (option.ariaSelected = "true") : (option.ariaSelected = "false");
              });
              el.addEventListener("change", () => {
                el.querySelectorAll("option").forEach(option => {
                  option.selected ? (option.ariaSelected = "true") : (option.ariaSelected = "false");
                });
              });
            }
            el.addEventListener("click", () => {
              if (el.ariaExpanded === "false") el.ariaExpanded = "true";
              if (el.ariaExpanded === "true") el.ariaExpanded = "false";
            });
          }
          if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
            if (el.placeholder && el.placeholder !== "") el.ariaPlaceholder = el.placeholder;
            if (el.type !== "radio") {
              el.required ? (el.ariaRequired = "true") : (el.ariaRequired = "false");
              !el.checkValidity() ? (el.ariaInvalid = "true") : (el.ariaInvalid = "false");
              el.closest("form")?.addEventListener("submit", () => {
                !el.checkValidity() ? (el.ariaInvalid = "true") : (el.ariaInvalid = "false");
              });
            }
            if (
              el instanceof HTMLTextAreaElement ||
              (el instanceof HTMLInputElement &&
                (el.type === "text" ||
                  el.type === "tel" ||
                  el.type === "email" ||
                  el.type === "number" ||
                  el.type === "date" ||
                  el.type === "time" ||
                  el.type === "password" ||
                  el.type === "search" ||
                  el.type === "month" ||
                  el.type === "week"))
            ) {
              if (el instanceof HTMLInputElement && el.list && el.list.id !== "") el.ariaAutoComplete = "list";
              if (
                el instanceof HTMLInputElement &&
                (el.type === "number" || el.type === "date" || el.type === "time")
              ) {
                el.ariaValueMax = (el as HTMLInputElement).max;
                el.ariaValueMin = (el as HTMLInputElement).min;
              }
              if (el instanceof HTMLInputElement && el.type === "range") {
                el.addEventListener("change", () => {
                  el.ariaValueNow = el.value;
                  el.ariaValueText = el.value;
                });
              }
            } else if (el instanceof HTMLInputElement && (el.type === "radio" || el.type === "checkbox")) {
              el.checked ? (el.ariaChecked = "true") : (el.ariaChecked = "false");
              el.disabled ? (el.ariaDisabled = "true") : (el.ariaDisabled = "false");
              el.addEventListener("change", () => {
                el.checked ? (el.ariaChecked = "true") : (el.ariaChecked = "false");
                el.disabled ? (el.ariaDisabled = "true") : (el.ariaDisabled = "false");
              });
            } else if (
              el instanceof HTMLInputElement &&
              (el.type === "button" || el.type === "submit" || el.type === "reset")
            ) {
              el.addEventListener("mousedown", click => {
                if (click.button === 0) el.ariaPressed = "true";
              });
              el.addEventListener("mouseup", release => {
                if (release.button === 0) el.ariaPressed = "false";
              });
            }
          }
        }
        if (el instanceof HTMLLabelElement) {
          if (el.hasChildNodes() && el.firstChild instanceof Text) {
            el.ariaLabel = el.firstChild.nodeValue;
          }
        }
        if (el instanceof HTMLButtonElement) {
          el.addEventListener("mousedown", click => {
            if (click.button === 0) el.ariaPressed = "true";
          });
          el.addEventListener("mouseup", release => {
            if (release.button === 0) el.ariaPressed = "false";
          });
          if (el.textContent?.match(/consultar/gi)) {
            el.ariaHasPopup = "dialog";
          }
        }
        if (el instanceof HTMLDialogElement) el.ariaModal = "true";
      }
    });
  } else elementNotPopulated(els, "List of elements for synchronizing aria states", extLine(new Error()));
}
let showTipsDlg = false;
export function toggleTips(awaitMount: boolean = false): void {
  const odTipsDlg = document.getElementById("tipsDlg");
  if (odTipsDlg instanceof HTMLDialogElement) {
    odTipsDlg.addEventListener("click", ev => {
      if (isClickOutside(ev, odTipsDlg).some(click => click === true)) {
        showTipsDlg = false;
        odTipsDlg.close();
      }
    });
    const odTipsBtn = document.getElementById("tipsBtn");
    odTipsBtn instanceof HTMLButtonElement
      ? odTipsBtn.addEventListener("click", () => {
          showTipsDlg = !showTipsDlg;
          showTipsDlg ? odTipsDlg.showModal() : odTipsDlg.close();
        })
      : elementNotFound(odTipsBtn, "Button for toggling tips", extLine(new Error()));
    const odTipsClose = document.getElementById("tipsClose");
    odTipsClose instanceof HTMLButtonElement
      ? odTipsClose.addEventListener("click", () => {
          showTipsDlg = !showTipsDlg;
          showTipsDlg ? odTipsDlg.showModal() : odTipsDlg.close();
        })
      : elementNotFound(odTipsClose, "Close Button for toggling tips", extLine(new Error()));
  } else {
    !awaitMount
      ? elementNotFound(odTipsDlg, "Dialog for tips", extLine(new Error()))
      : setTimeout(() => {
          !document.getElementById("tipsDlg") && elementNotFound(odTipsDlg, "Dialog for tips", extLine(new Error()));
        }, 2000);
  }
}
let showConformDlg = false;
export function toggleConformDlg(): void {
  const conformDlg = document.getElementById("conformDlg");
  const btnConform = document.getElementById("btnConform");
  if (conformDlg instanceof HTMLDialogElement && btnConform instanceof HTMLButtonElement) {
    conformDlg.close();
    btnConform.addEventListener("click", () => {
      showConformDlg = !showConformDlg;
      showConformDlg ? conformDlg.showModal() : conformDlg.close();
    });
    conformDlg.addEventListener("click", click => {
      if (showConformDlg) {
        const coords = isClickOutside(click, conformDlg);
        if (coords.some(coord => coord === true)) {
          showConformDlg = false;
          conformDlg.close();
        }
      }
    });
    addEventListener("keydown", press => {
      if (press.key === "Escape") {
        showConformDlg = false;
        conformDlg.close();
      }
    });
  } else
    multipleElementsNotFound("Elements for Dialog for agreement terms", extLine(new Error()), conformDlg, btnConform);
}
export function checkForReset(ev: rMouseEvent): void {
  try {
    if (!(ev.currentTarget instanceof Element)) throw new Error(`Failed to validate current target instance`);
    const res = prompt("Digite CONFIRMAR para resetar o formulário");
    if (res === "CONFIRMAR") {
      const form = ev.currentTarget.closest("form");
      if (!form) {
        navigatorVars.pt
          ? toast.error("Não foi possível localizar o formulário")
          : toast.error("Failed to locate the formulary");
        return;
      }
      resetForm(form);
    }
  } catch (e) {
    console.error(`Error executing checkForReset:\n${(e as Error).message}`);
  }
}
export function resetForm(form: nlFm): void {
  try {
    if (!(form instanceof HTMLFormElement)) throw elementNotFound(form, "Form for resetting", extLine(new Error()));
    [...form.querySelectorAll("input"), ...form.querySelectorAll("textarea")].forEach((inp, i) => {
      try {
        if (
          inp instanceof HTMLTextAreaElement ||
          (inp instanceof HTMLInputElement &&
            (inp.type === "text" ||
              inp.type === "date" ||
              inp.type === "datetime-local" ||
              inp.type === "email" ||
              inp.type === "file" ||
              inp.type === "hidden" ||
              inp.type === "month" ||
              inp.type === "number" ||
              inp.type === "password" ||
              inp.type === "search" ||
              inp.type === "tel" ||
              inp.type === "time" ||
              inp.type === "url" ||
              inp.type === "week" ||
              inp.type === "datetime"))
        )
          inp.value = "";
        else if (inp.type === "button" || inp.type === "reset" || inp.type === "submit" || inp.type === "image") return;
        else if (inp.type === "checkbox" || inp.type === "radio") {
          if (inp.role === "switch") return;
          inp.checked = false;
        } else if (inp.type === "color") {
          if (inp.dataset.default) inp.value = inp.dataset.default;
          else inp.value = "#0000";
        } else if (inp.type === "range") {
          if (inp.dataset.default) inp.value = inp.dataset.default;
          else if (inp.min) inp.value = inp.min;
          else inp.value = "0";
        }
      } catch (e) {
        console.error(`Error executing iteration ${i} for reseting the form inputs:\n${(e as Error).message}`);
      }
    });
    form.querySelectorAll("select").forEach((s, i) => {
      try {
        if (s.options.length === 0)
          throw new Error(`No option in the select ${s.id || s.name || s.className || s.tagName}`);
        if (s.dataset.default) s.value = s.dataset.default;
        else s.value = s.options[0].value;
      } catch (e) {
        console.error(`Error executing iteration ${i} for reseting selects:\n${(e as Error).message}`);
      }
    });
    [document.getElementById("astDigtBtn"), document.querySelectorAll("[id$=AstDigtBtn]")].forEach((b, i) => {
      try {
        if (!(b instanceof HTMLButtonElement || (b instanceof HTMLInputElement && b.type === "button")))
          throw new Error(`Invalidate instance for button used to reset canvas`);
        if (b.innerText.toLowerCase() === "retornar") b.click();
      } catch (e) {
        console.error(`Error executing iteration ${i} for resetting for canvas elements:\n${(e as Error).message}`);
      }
    });
  } catch (e) {
    console.error(`Error executing resetForm:\n${(e as Error).message}`);
  }
}
const borderColors: { [k: string]: string } = {};
export async function validateForm(
  ev: FormEvent | SubmitEvent | rMouseEvent | HTMLFormElement,
  scope: queryableNode = document,
  submit: boolean = true,
): Promise<[boolean, string[], Array<[string, string | File]>]> {
  let targ;
  if (!(ev instanceof HTMLFormElement || "currentTarget" in ev)) throw new Error(`Invalid form reference`);
  if (ev instanceof HTMLFormElement) targ = ev;
  else if (
    ev.currentTarget instanceof HTMLFormElement ||
    ((ev.currentTarget instanceof HTMLButtonElement || ev.currentTarget instanceof HTMLInputElement) &&
      ev.currentTarget.type === "submit")
  ) {
    ev.preventDefault();
    targ = ev.currentTarget;
  }
  const arrValidity: boolean[] = [];
  const invalidEntries: string[] = [];
  const validEntries: Array<[string, string | File]> = [];
  let form;
  try {
    if (
      !(
        targ instanceof HTMLFormElement ||
        targ instanceof HTMLButtonElement ||
        (targ instanceof HTMLInputElement && targ.type === "submit")
      )
    )
      throw elementNotFound(targ, `Validation of Submit Button instance`, extLine(new Error()));
    if (targ instanceof HTMLFormElement) form = targ;
    else form = targ.closest("form");
    if (!(form instanceof HTMLFormElement)) scope?.querySelector("form");
    if (!(form instanceof HTMLFormElement))
      throw elementNotFound(form, `Validation of Form instance`, extLine(new Error()));
    [
      ...form.querySelectorAll("input"),
      ...form.querySelectorAll("textarea"),
      ...form.querySelectorAll("select"),
      ...form.querySelectorAll("canvas"),
    ].forEach(entry => {
      const displayInvalidity = (valid: boolean = true): void => {
        if (!valid && !(entry instanceof HTMLCanvasElement)) {
          entry.scrollIntoView({ behavior: "smooth" });
          if (!/border-color/g.test(getComputedStyle(entry).transition))
            entry.style.transition = (getComputedStyle(entry).transition || "") + "border-color ease-in-out 1s";
          if (!borderColors[entry.id || entry.name || entry.classList.toString().replaceAll(" ", "_")])
            borderColors[entry.id || entry.name || entry.classList.toString().replaceAll(" ", "_")] =
              getComputedStyle(entry).borderColor || getComputedStyle(entry).borderBottomColor;
          entry.style.borderColor = "red";
          setTimeout(
            () =>
              (entry.style.borderColor =
                borderColors[entry.id || entry.name || entry.classList.toString().replaceAll(" ", "_")] ||
                "rgb(222, 226, 230)"),
            1000,
          );
          if (
            (entry instanceof HTMLInputElement &&
              !(
                entry.type === "checkbox" ||
                entry.type === "radio" ||
                entry.type === "file" ||
                entry.type === "submit" ||
                entry.type === "button" ||
                entry.type === "reset"
              )) ||
            entry instanceof HTMLTextAreaElement
          ) {
            const prevPlaceholder = entry.placeholder;
            entry.placeholder = `Entrada inválida`;
            setTimeout(() => {
              entry.placeholder = prevPlaceholder;
            }, 2000);
          }
        }
      };
      let isValid = true;
      if (entry instanceof HTMLSelectElement) {
        if (entry.value === "") {
          isValid = false;
          invalidEntries.push(entry.name || entry.id || entry.dataset.title || entry.tagName);
          displayInvalidity(isValid);
        }
      } else if (entry instanceof HTMLInputElement || entry instanceof HTMLTextAreaElement) {
        if (!entry.checkValidity()) {
          isValid = false;
          invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
          displayInvalidity(isValid);
        }
        if (entry instanceof HTMLInputElement && entry.type === "date") {
          if (entry.classList.contains("minCurrDate")) {
            const currDate = new Date().toISOString().split("T")[0].replaceAll("-", "").trim();
            if (currDate.length < 8) return;
            const currNumDate = Math.abs(parseNotNaN(currDate));
            if (
              !Number.isFinite(currNumDate) ||
              currNumDate.toString().slice(0, currNumDate.toString().indexOf(".")).length < 8
            )
              return;
            const entryNumDateValue = parseNotNaN(entry.value.replaceAll("-", ""));
            if (
              !Number.isFinite(entryNumDateValue) ||
              entryNumDateValue.toString().slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
            )
              return;
            if (entryNumDateValue < currNumDate) {
              isValid = false;
              invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
              displayInvalidity(isValid);
            }
          }
          if (entry.classList.contains("maxCurrDate")) {
            const currDate = new Date().toISOString().split("T")[0].replaceAll("-", "").trim();
            if (currDate.length < 8) return;
            const currNumDate = Math.abs(parseNotNaN(currDate));
            if (
              !Number.isFinite(currNumDate) ||
              currNumDate.toString().slice(0, currNumDate.toString().indexOf(".")).length < 8
            )
              return;
            const entryNumDateValue = parseNotNaN(entry.value.replaceAll("-", ""));
            if (
              !Number.isFinite(entryNumDateValue) ||
              entryNumDateValue.toString().slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
            )
              return;
            if (entryNumDateValue > currNumDate) {
              isValid = false;
              invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
              displayInvalidity(isValid);
            }
          }
        } else if (entry instanceof HTMLInputElement && entry.type === "radio") {
          try {
            let parent = entry.parentElement;
            if (!(parent instanceof Element)) throw elementNotFound(parent, `Validation of parent instance`, "Element");
            if (parent.querySelectorAll('input[type="radio"]').length < 2)
              parent = parent.closest(".divAdd") ?? parent.parentElement;
            if (!(parent instanceof Element))
              throw elementNotFound(parent, `Validation of parent parent instance`, "Element");
            const radioGroupList = parent.querySelectorAll('input[type="radio"]');
            if (radioGroupList.length === 0) throw new Error(`Error populating list of radios from parent`);
            if (
              Array.from(radioGroupList)
                .filter(radio => radio instanceof HTMLInputElement && radio.type === "radio")
                .some(
                  radio =>
                    radio instanceof HTMLInputElement &&
                    radio.type === "radio" &&
                    (radio.dataset.required === "true" || radio.required),
                ) &&
              !Array.from(radioGroupList)
                .filter(radio => radio instanceof HTMLInputElement && radio.type === "radio")
                .some(radio => radio instanceof HTMLInputElement && radio.type === "radio" && radio.checked)
            ) {
              isValid = false;
              displayInvalidity(isValid);
            }
            const cbGrpL = parent.querySelectorAll('input[type="checkbox"]');
            if (cbGrpL.length === 0) throw new Error(`Error populating list of checkboxes from parent`);
            if (
              Array.from(cbGrpL)
                .filter(checkbox => checkbox instanceof HTMLInputElement && checkbox.type === "checkbox")
                .some(
                  checkbox =>
                    checkbox instanceof HTMLInputElement &&
                    checkbox.type === "checkbox" &&
                    (checkbox.dataset.required === "true" || checkbox.required),
                ) &&
              !Array.from(cbGrpL)
                .filter(checkbox => checkbox instanceof HTMLInputElement && checkbox.type === "checkbox")
                .some(
                  checkbox => checkbox instanceof HTMLInputElement && checkbox.type === "checkbox" && checkbox.checked,
                )
            ) {
              isValid = false;
              displayInvalidity(isValid);
            }
          } catch (e) {
            console.error(`Error executing procedure for validating radio:\n${(e as Error).message}`);
          }
        } else if (entry instanceof HTMLInputElement && entry.type === "file") {
          if (!(entry.files && entry.files[0])) {
            isValid = false;
            invalidEntries.push(entry.name || entry.id || entry.dataset.title || entry.tagName);
            displayInvalidity(isValid);
          }
        } else {
          if (entry.classList.contains("minText") && entry.value.length < parseNotNaN(entry.dataset.reqlength || "3")) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            displayInvalidity(isValid);
          }
          if (entry.classList.contains("maxText") && entry.value.length > parseNotNaN(entry.dataset.maxlength || "3")) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("minNum") &&
            parseNotNaN(entry.value) < parseNotNaN(entry.dataset.minnum || "3")
          ) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("maxNum") &&
            parseNotNaN(entry.value) > parseNotNaN(entry.dataset.maxnum || "3")
          ) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("patternText") &&
            entry.dataset.pattern &&
            !new RegExp(entry.dataset.pattern, entry.dataset.flags || "").test(entry.value)
          ) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            displayInvalidity(isValid);
          }
        }
        arrValidity.push(isValid);
        if (isValid) {
          if (entry instanceof HTMLInputElement && entry.type === "checkbox" && entry.role !== "switch")
            validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, `${entry.checked}`]);
          else if (entry instanceof HTMLInputElement && entry.type === "radio") {
            try {
              let parent = entry.parentElement;
              if (!(parent instanceof Element))
                throw elementNotFound(parent, `Validation of parent instance`, "Element");
              if (parent.querySelectorAll('input[type="radio"]').length < 2)
                parent = parent.closest(".divAdd") ?? parent.parentElement;
              if (!(parent instanceof Element))
                throw elementNotFound(parent, `Validation of parent parent instance`, "Element");
              const radioGroupList = parent.querySelectorAll('input[type="radio"]');
              if (radioGroupList.length === 0) throw new Error(`Error populating list of radios from parent`);
              if (
                radioGroupList.length === 1 &&
                radioGroupList[0] instanceof HTMLInputElement &&
                radioGroupList[0].type === "radio"
              ) {
                radioGroupList[0].checked
                  ? validEntries.push([
                      radioGroupList[0].name ||
                        radioGroupList[0].id ||
                        radioGroupList[0].dataset.title ||
                        radioGroupList[0].tagName,
                      `true`,
                    ])
                  : validEntries.push([
                      radioGroupList[0].name ||
                        radioGroupList[0].id ||
                        radioGroupList[0].dataset.title ||
                        radioGroupList[0].tagName,
                      `false`,
                    ]);
              } else {
                const opChecked = Array.from(radioGroupList).filter(
                  radio => radio instanceof HTMLInputElement && radio.type === "radio" && radio.checked,
                )[0];
                if (!(opChecked instanceof HTMLInputElement && opChecked.type === "radio")) {
                  validEntries.push([opChecked.id || opChecked.tagName, `undefined`]);
                  throw new Error(`Failed to find checked radio in group`);
                } else {
                  if (radioGroupList.length === 2) {
                    if (
                      opChecked.id.endsWith("No") ||
                      opChecked.id.endsWith("-no") ||
                      opChecked.id.endsWith("-No") ||
                      opChecked.classList.contains("radNo")
                    )
                      validEntries.push([
                        opChecked.name || opChecked.id || opChecked.dataset.title || opChecked.tagName,
                        `false`,
                      ]);
                    else
                      validEntries.push([
                        opChecked.name || opChecked.id || opChecked.dataset.title || opChecked.tagName,
                        `true`,
                      ]);
                  } else if (radioGroupList.length > 2) {
                    validEntries.push([
                      opChecked.name || opChecked.id || opChecked.dataset.title || opChecked.tagName,
                      opChecked.dataset.value || `true`,
                    ]);
                  }
                }
              }
            } catch (e) {
              console.error(`Error executing procedure for pushing radio check:\n${(e as Error).message}`);
            }
          } else if (entry instanceof HTMLInputElement && entry.type === "file" && entry.files) {
            validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, entry.files[0]]);
          } else if (entry instanceof HTMLCanvasElement) {
            (async (): Promise<File> => {
              return new Promise((res, rej) => {
                entry.toBlob(blob => {
                  if (blob) {
                    res(
                      new File([blob], entry.name || entry.id || entry.dataset.title || entry.tagName, {
                        type: blob.type,
                      }),
                    );
                  } else rej(new Error(`Failed to extract file.`));
                });
              });
            })().then(file =>
              validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, file]),
            );
          } else validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, entry.value]);
        }
      }
    });
  } catch (e) {
    console.error(`Error executing validateForm:\n${(e as Error).message}`);
  }
  const formValidated = arrValidity.some(validity => validity === false) ? false : true;
  if (form instanceof HTMLFormElement) {
    if (formValidated && form.checkValidity()) {
      form.noValidate = false;
      submit &&
        submitForm(form, (form.dataset.ep || form.action.replace("submit_", "").replace("_form", "")) as formCases);
    } else form.noValidate = true;
  }
  return [formValidated, invalidEntries.map(invalidIdf => `${invalidIdf} \n`), validEntries];
}
export async function submitForm(form: nlFm, ep: formCases): Promise<void> {
  try {
    if (!(form instanceof HTMLFormElement))
      throw elementNotFound(form, `Validation of form instance`, extLine(new Error()));
    if (typeof ep !== "string") throw new Error(`Incorret type for ep argument in submitForm`);
    const fd = new FormData();
    [
      ...form.querySelectorAll("input"),
      ...form.querySelectorAll("textarea"),
      ...form.querySelectorAll("select"),
      ...form.querySelectorAll("canvas"),
    ]
      .filter(
        el =>
          el instanceof HTMLInputElement &&
          (el.type === "hidden" ||
            el.type === "reset" ||
            el.type === "button" ||
            el.type === "submit" ||
            el.type === "image"),
      )
      .forEach((el, i) => {
        try {
          if (el instanceof HTMLCanvasElement) {
            const idf = el.dataset.name || el.id || el.dataset.title || el.tagName;
            (async (): Promise<File> => {
              return new Promise((res, rej) => {
                el.toBlob(blob => {
                  blob
                    ? res(
                        new File(
                          [blob],
                          `${idf}_${
                            (fd.get("name") && regularToSnake(fd.get("name")!.toString())) ||
                            `${fd.get("first_name") ? regularToSnake(fd.get("first_name")!.toString()) : ""}__${
                              fd.get("additional_name") ? regularToSnake(fd.get("additional_name")!.toString()) : ""
                            }__${
                              fd.get("family_name") ? regularToSnake(fd.get("family_name")!.toString()) : ""
                            }__${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`
                          }.jpeg`,
                          { type: "image/jpeg" },
                        ),
                      )
                    : rej(new Error(`Failed to extract file.`));
                });
              });
            })().then(file => fd.append(idf, file));
          } else {
            const idf = el.name || el.id || el.dataset.title || el.className || el.tagName;
            if (el instanceof HTMLInputElement) {
              if (el.type === "radio") {
                const appendRad = (el: HTMLInputElement): void => {
                  el.checked && el.dataset.value && el.dataset.value !== ""
                    ? fd.append(idf, el.dataset.value)
                    : fd.append(idf, el.checked.toString());
                };
                const checkGroup = (refAncestral: HTMLElement): void => {
                  let group = refAncestral.querySelectorAll('input[type="radio"]');
                  if (group.length === 1) {
                    const parentOfAncestral = refAncestral.parentElement;
                    if (parentOfAncestral) {
                      group = parentOfAncestral.querySelectorAll('input[type="radio"]');
                      if (group.length === 1) {
                        appendRad(el);
                        return;
                      } else {
                        const checked = Array.from(group).find(
                          rad => rad instanceof HTMLInputElement && rad.type === "radio" && rad.checked,
                        ) as HTMLInputElement;
                        if (!checked) {
                          if (fd.get(idf)) return;
                          fd.append(idf, "false");
                        }
                        appendRad(checked);
                        return;
                      }
                    }
                    appendRad(el);
                    return;
                  } else {
                    const checked = Array.from(group).find(
                      rad => rad instanceof HTMLInputElement && rad.type === "radio" && rad.checked,
                    ) as HTMLInputElement;
                    if (!checked) {
                      if (fd.get(idf)) return;
                      fd.append(idf, "false");
                    }
                    appendRad(checked);
                  }
                };
                const checkParent = (refAncestral: nlHtEl, group: string = 'input[type="radio"]'): void => {
                  if (el.dataset.parent && el.dataset.parent !== "") {
                    refAncestral = document.querySelector(el.dataset.parent);
                    if (refAncestral) {
                      checkGroup(refAncestral);
                      return;
                    }
                    refAncestral = el.parentElement;
                    if (!refAncestral) {
                      appendRad(el);
                      return;
                    }
                    let groupQueried = refAncestral.querySelectorAll(group);
                    if (groupQueried.length === 0 && group !== 'input[type="radio"]' && group !== "input[type=radio]")
                      groupQueried = refAncestral.querySelectorAll('input[type="radio"]');
                    if (groupQueried.length <= 1 && el.parentElement) {
                      refAncestral = el.parentElement.parentElement;
                      if (!refAncestral) {
                        appendRad(el);
                        return;
                      }
                      checkGroup(refAncestral);
                      return;
                    }
                    checkGroup(refAncestral);
                    return;
                  }
                  if (refAncestral) {
                    checkGroup(refAncestral);
                    return;
                  }
                  appendRad(el);
                  return;
                };
                const refAncestral = el.parentElement;
                el.dataset.group && el.dataset.group !== ""
                  ? checkParent(refAncestral, `[data-group="${el.dataset.group}"]`)
                  : checkParent(refAncestral);
                return;
              }
              if (el.type === "checkbox") {
                fd.append(idf, el.checked.toString());
                return;
              }
              if (el.type === "file") {
                if (!el.multiple) {
                  fd.append(idf, el.files?.[0] ?? "null");
                  return;
                } else {
                  if (el.files) for (const file of el.files) fd.append(idf, file);
                  else fd.append(idf, "null");
                  return;
                }
              }
            } else if (el instanceof HTMLSelectElement) {
              if (!el.multiple) {
                fd.append(idf, el.value);
                return;
              } else for (const opt of el.selectedOptions) fd.append(idf, opt.value);
            } else {
              fd.append(idf, el.value);
              return;
            }
          }
        } catch (e) {
          console.error(
            `Error executin iteration ${i} for mapping ${form.id || form.className || form.tagName}:\n${
              (e as Error).message
            }`,
          );
        }
      });
    handleSubmit(ep, fd, true);
  } catch (e) {
    console.error(`Error executing submitForm:\n${(e as Error).message}`);
  }
}
export function handleCondtReq(
  el: targEl,
  options: {
    pattern?: [string, string] | RegExp;
    min?: number;
    max?: number;
    minNum?: number;
    maxNum?: number;
  },
): void {
  try {
    if (
      !(
        (el instanceof HTMLInputElement &&
          (el.type === "text" ||
            el.type === "number" ||
            el.type === "email" ||
            el.type === "password" ||
            el.type === "tel" ||
            el.type === "date")) ||
        el instanceof HTMLTextAreaElement
      )
    )
      throw inputNotFound(el, `${el?.id || el?.className || el?.tagName}`, extLine(new Error()));
    if (el.value.length < 2) return;
    if (!(options.pattern || options.min || options.max || options.maxNum || options.minNum))
      throw new Error(`No pattern was given to handleCondtReq`);
    if (
      options.pattern &&
      !(
        (options.pattern as any) instanceof RegExp ||
        ((options.pattern as any) instanceof Array &&
          (options.pattern as Array<any>).every(idx => typeof idx === "string"))
      )
    )
      throw new Error(`Invalid instance given to options.pattern`);
    if (options.min && typeof options.min !== "number") throw new Error(`Wrong type given to options.min`);
    if (options.max && typeof options.max !== "number") throw new Error(`Wrong type given to options.max`);
    if (el.value.length > 0) {
      if (options.min) {
        el.dataset["reqlength"] = `${options.min}`;
        el.minLength = options.min;
        if (!el.classList.contains("minText")) el.classList.add("minText");
      }
      if (options.max) {
        el.dataset["maxlength"] = `${options.max}`;
        el.maxLength = options.max;
        if (!el.classList.contains("maxText")) el.classList.add("maxText");
      }
      if (el instanceof HTMLInputElement) {
        if (options.minNum) {
          el.dataset["minnum"] = `${options.minNum}`;
          el.min = `${options.minNum}`;
          if (!el.classList.contains("minNum")) el.classList.add("minNum");
        }
        if (options.maxNum) {
          el.dataset["maxnum"] = `${options.maxNum}`;
          el.max = `${options.maxNum}`;
          if (!el.classList.contains("maxNum")) el.classList.add("maxNum");
        }
      }
      if (options.pattern) {
        if (Array.isArray(options.pattern)) {
          el.dataset["pattern"] = `${options.pattern[0]}`;
          el.dataset["flags"] = `${options.pattern[1]}`;
        } else {
          el.dataset["pattern"] = `${(options.pattern as RegExp).source}`;
          el.dataset["flags"] = `${(options.pattern as RegExp).flags || ""}`;
        }
        if (!el.classList.contains("patternText")) el.classList.add("patternText");
      }
      handleEventReq(el);
    } else {
      delete el.dataset["reqlength"];
      delete el.dataset["maxlength"];
      delete el.dataset["pattern"];
      delete el.dataset["flags"];
      delete el.dataset["minnum"];
      delete el.dataset["maxnum"];
      if (el instanceof HTMLInputElement) {
        el.min = "";
        el.max = "";
      }
      el.maxLength = 9999;
      el.minLength = 0;
    }
  } catch (e) {
    console.error(`Error executing handleCondtReq:\n${(e as Error).message}`);
  }
}
export const iniFontColors: { [k: string]: string } = {};
export function handleEventReq(entry: textEl | Event, alertColor: string = "#e13010"): void {
  let isValid = true;
  if (entry instanceof Event) {
    if (!(entry.currentTarget instanceof HTMLInputElement || entry.currentTarget instanceof HTMLTextAreaElement))
      return;
    entry = entry.currentTarget;
  }
  if (!(entry instanceof HTMLInputElement || entry instanceof HTMLTextAreaElement))
    throw inputNotFound(entry, `validation of entry argument for handleEventReq`, extLine(new Error()));
  if (
    entry instanceof HTMLInputElement &&
    !(
      entry.type === "text" ||
      entry.type === "number" ||
      entry.type === "password" ||
      entry.type === "tel" ||
      entry.type === "email" ||
      entry.type === "date"
    )
  )
    return;
  if (!iniFontColors[entry.id || entry.name]) iniFontColors[entry.id || entry.name] = getComputedStyle(entry).color;
  if ((iniFontColors[entry.id || entry.name] = alertColor)) iniFontColors[entry.id || entry.name] = "rgb(33, 37, 41)";
  [
    ...document.querySelectorAll('input[type="number"]'),
    ...document.querySelectorAll('input[type="date"]'),
    ...document.querySelectorAll('input[type="time"]'),
  ].forEach(numInp => {
    if (
      numInp instanceof HTMLInputElement &&
      (numInp.type === "number" || numInp.type === "date" || numInp.type === "time")
    ) {
      if (numInp.step === "") numInp.step = "any";
      numInp.step !== "any" && !/[^0-9]/g.test(numInp.step) && numInp.step.replaceAll(/[^0-9]/g, "");
    }
  });
  if (!entry.checkValidity()) isValid = false;
  if (entry.type === "date") {
    if (entry.classList.contains("minCurrDate")) {
      const currDate = new Date().toISOString().split("T")[0].replaceAll("-", "").trim();
      if (currDate.length < 8) return;
      const currNumDate = Math.abs(parseNotNaN(currDate));
      if (
        !Number.isFinite(currNumDate) ||
        currNumDate.toString().slice(0, currNumDate.toString().indexOf(".")).length < 8
      )
        return;
      const entryNumDateValue = parseNotNaN(entry.value.replaceAll("-", ""));
      if (
        !Number.isFinite(entryNumDateValue) ||
        entryNumDateValue.toString().slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
      )
        return;
      if (entryNumDateValue < currNumDate) isValid = false;
    }
    if (entry.classList.contains("maxCurrDate")) {
      const currDate = new Date().toISOString().split("T")[0].replaceAll("-", "").trim();
      if (currDate.length < 8) return;
      const currNumDate = Math.abs(parseNotNaN(currDate));
      if (
        !Number.isFinite(currNumDate) ||
        currNumDate.toString().slice(0, currNumDate.toString().indexOf(".")).length < 8
      )
        return;
      const entryNumDateValue = parseNotNaN(entry.value.replaceAll("-", ""));
      if (
        !Number.isFinite(entryNumDateValue) ||
        entryNumDateValue.toString().slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
      )
        return;
      if (entryNumDateValue > currNumDate) isValid = false;
    }
  } else {
    if (entry.classList.contains("minText") && entry.value.length < parseNotNaN(entry.dataset.reqlength || "3"))
      isValid = false;
    if (entry.classList.contains("maxText") && entry.value.length > parseNotNaN(entry.dataset.maxlength || "3"))
      isValid = false;
    if (entry.classList.contains("minNum") && parseNotNaN(entry.value) < parseNotNaN(entry.dataset.minnum || "3"))
      isValid = false;
    if (entry.classList.contains("maxNum") && parseNotNaN(entry.value) > parseNotNaN(entry.dataset.maxnum || "3"))
      isValid = false;
    if (
      entry.classList.contains("patternText") &&
      entry.dataset.pattern &&
      !new RegExp(entry.dataset.pattern, entry.dataset.flags || "").test(entry.value)
    )
      isValid = false;
  }
  if (!isValid && entry.value.length > 2) {
    entry.style.color = alertColor;
    setTimeout(() => {
      if (entry instanceof Event) {
        if (!(entry.currentTarget instanceof HTMLInputElement || entry.currentTarget instanceof HTMLTextAreaElement))
          return;
        entry = entry.currentTarget;
      }
      entry.style.color = "rgb(33, 37, 41)";
    }, 10000);
  } else entry.style.color = "rgb(33, 37, 41)";
}
export function cleanStorageName(): void {
  if (!window) return;
  ["name", "secondName", "lastName"].forEach((n, i) => {
    try {
      localStorage.setItem(n, "");
    } catch (e) {
      console.error(`Error executing iteration ${i} of names in Local Storage:\n${(e as Error).message}`);
    }
  });
}
export function registerPersistInputs({
  f,
  selects = true,
  textareas = true,
  inputTypes = ["text", "number", "date"],
  queriesToExclude,
}: {
  f: nlFm;
  selects: boolean;
  textareas: boolean;
  inputTypes?: string[];
  queriesToExclude?: string[];
}): void {
  try {
    if (!(f instanceof HTMLElement)) throw new Error(`Failed to validate Form Reference in the DOM`);
    f.dataset.start = "true";
    if (!Array.isArray(inputTypes)) throw new Error(`Error validating type of inputTypes argument`);
    inputTypes = inputTypes.filter(t => typeof t === "string");
    if (typeof selects !== "boolean") selects = false;
    if (typeof textareas !== "boolean") textareas = false;
    if (selects)
      f.querySelectorAll("select").forEach(s => !s.classList.contains("ssPersist") && s.classList.add("ssPersist"));
    if (textareas)
      f.querySelectorAll("textarea").forEach(
        ta => !ta.classList.contains("ssPersist") && ta.classList.add("ssPersist"),
      );
    inputTypes.forEach(t =>
      f
        .querySelectorAll(`input[type=${t}]`)
        .forEach(inp => !inp.classList.contains("ssPersist") && inp.classList.add("ssPersist")),
    );
    if (queriesToExclude) {
      queriesToExclude.forEach(q => {
        const queried = f.querySelector(q);
        if (!queried) return;
        queried.classList.contains("ssPersist") && queried.classList.remove("ssPersist");
      });
    }
  } catch (e) {
    console.error(`Error executing persistInputs:\n${(e as Error).message}`);
  }
}
export function registerRoot(root: vRoot, selector: string, selectorRef?: MutableRefObject<nlHtEl>): vRoot {
  try {
    const rootEl =
      typeof selectorRef === "object" && "current" in selectorRef
        ? selectorRef.current ?? document.querySelector(selector) ?? document.getElementById(selector)
        : document.querySelector(selector) ?? document.getElementById(selector);
    if (!(rootEl instanceof HTMLElement))
      throw elementNotFound(rootEl, `Finding element with ${selector} for rooting`, extLine(new Error()));
    if (!root && rootEl) {
      if (rootEl.dataset.rooted === "true") {
        if (!rootEl.hasChildNodes()) {
          console.log(`Root ${selector} has no children `);
          rootEl.dataset.rooted = "false";
          root = createRoot(rootEl);
        } else {
          console.log(`Root ${selector} has children`);
          root = createRoot(rootEl);
        }
      } else root = createRoot(rootEl);
    } else if (root && !(root as any)["_internalRoot"]) {
      console.log(`Root ${selector} invalid`);
      root = undefined;
      rootEl.dataset.rooted = "false";
      root = createRoot(rootEl);
    }
    rootEl.dataset.rooted = "true";
  } catch (e) {
    console.error(`Error executing registerRoot:\n${(e as Error).message}`);
  }
  return root;
}
