//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import { parseNotNaN, removeFirstClick } from "../gModel";
import { fadeElement, isClickOutside } from "../gStyleScript";
import type { targEl, primitiveType, textEl } from "../declarations/types";
import {
  extLine,
  elementNotFound,
  inputNotFound,
  multipleElementsNotFound,
  stringError,
  elementNotPopulated,
} from "./errorHandler";
import { addCanvasListeners } from "../gController";

export function updateSimpleProperty(el: targEl): primitiveType {
  if (el instanceof HTMLInputElement) {
    if (el.type === "radio" || el.type === "checkbox")
      return (el as HTMLInputElement).checked.toString();
    else if (el.type === "number" || el.type === "text") {
      return !Number.isFinite(
        parseFloat(el.value?.replaceAll(/[^0-9.,+-]/g, ""))
      )
        ? 0
        : parseFloat(el.value?.replaceAll(/[^0-9.,+-]/g, "")) ?? 0;
    } else return el.value || "0";
  } else if (
    el instanceof HTMLSelectElement ||
    el instanceof HTMLTextAreaElement
  )
    return el.value;
  else inputNotFound(el, "el in updateSimpleProperty", extLine(new Error()));
  console.log(
    `Failed to update property for ${
      el?.id || el?.tagName || "unidentified"
    }. Value returned: -1`
  );
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

export function opRadioHandler(
  keydown: KeyboardEvent | React.KeyboardEvent,
  radioPairs: targEl[]
): void {
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
          `validando radioYes id ${
            radioYes?.id || "UNDEFINED ID"
          } or radiosNo id ${radioNo?.id || "UNDEFINED ID"}`,
          radioYes,
          radioNo
        );
    }
  } else console.error(`Error validating KeyboardEvent in opRadioHandler.`);
}

export function cpbInpHandler(ev: Event, radio: targEl): void {
  if (
    ev instanceof Event &&
    radio instanceof HTMLInputElement &&
    (radio.type === "checkbox" || radio.type === "radio") &&
    radio?.parentElement?.parentElement
  ) {
    let divAdd: targEl = radio.parentElement.nextElementSibling;
    if (
      !(
        divAdd?.classList.contains("divAdd") ||
        divAdd?.classList.contains("textAdd")
      )
    ) {
      divAdd = radio.parentElement.parentElement.nextElementSibling;
      if (
        !(
          divAdd?.classList.contains("divAdd") ||
          divAdd?.classList.contains("textAdd")
        )
      ) {
        divAdd = radio.parentElement.nextElementSibling?.nextElementSibling;
        if (
          !(
            divAdd?.classList.contains("divAdd") ||
            divAdd?.classList.contains("textAdd")
          )
        )
          divAdd =
            radio.parentElement.parentElement?.parentElement
              ?.nextElementSibling;
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
        radio.id
          ?.toLocaleLowerCase()
          .includes(idPattern.slice(0, 1).toUpperCase() + idPattern.slice(1)))
    ) {
      if (radio.checked && radio.id.includes("Yes")) {
        fadeElement(divAdd, "0");
        setTimeout(() => {
          if (divAdd?.classList.toString().match(/grid/gi))
            (divAdd as HTMLElement).style.display = "grid";
          else if (divAdd?.classList.toString().match(/flex/gi))
            (divAdd as HTMLElement).style.display = "flex";
          else (divAdd as HTMLElement).style.display = "block";
          setTimeout(() => {
            fadeElement(divAdd, "1");
          }, 100);
        }, 400);
      } else {
        fadeElement(divAdd, "0");
        setTimeout(() => {
          (divAdd as HTMLElement).style.display = "none";
        }, 400);
      }
    }
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "localizando parent elements de Radio",
      radio,
      radio?.parentElement,
      radio?.parentElement?.parentElement
    );
}

export function deactTextInput(
  addressInps: NodeListOf<Element> | Element[],
  nullRadios: NodeListOf<Element> | Element[]
): void {
  addressInps?.length > 0 && addressInps.length === nullRadios.length
    ? nullRadios.forEach(nullRadio => {
        const blockeableInput =
          nullRadio.parentElement?.parentElement?.querySelector(".inpLocNum");
        ["click", "dblclick"].forEach(event => {
          nullRadio.addEventListener(event, () => {
            nullRadio instanceof HTMLInputElement && nullRadio.checked
              ? blockeableInput?.setAttribute("disabled", "")
              : blockeableInput?.removeAttribute("disabled");
          });
        });
      })
    : console.error(
        "Number of Inputs and Radios unequal, aborting deactTextInput()"
      );
}

export function doubleClickHandler(inpEl: targEl): void {
  if (
    inpEl instanceof HTMLInputElement &&
    (inpEl.type === "checkbox" || inpEl.type === "radio")
  ) {
    inpEl.checked = inpEl.checked ? false : true;
    cpbInpHandler(new Event("change"), inpEl);
  } else
    inputNotFound(
      inpEl,
      `inpEl id ${inpEl?.id || "UNDEFINED ID"}`,
      extLine(new Error())
    );
}

export function useCurrentDate(activation: Event, dateBtn: targEl): void {
  if (activation?.target === dateBtn && dateBtn instanceof HTMLButtonElement) {
    const currentDate = new Date();
    const targInputDate = searchPreviousSiblings(dateBtn, "inpDate");
    targInputDate instanceof HTMLInputElement && targInputDate.type === "date"
      ? (targInputDate.value =
          currentDate.getFullYear() +
          "-" +
          (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")
            .replaceAll("'", "") +
          "-" +
          currentDate.getDate().toString().padStart(2, "0").replaceAll("'", ""))
      : inputNotFound(
          targInputDate,
          `targInputDate id ${targInputDate?.id || "UNDEFINED ID"}`,
          extLine(new Error())
        );
  } else
    elementNotFound(
      dateBtn,
      "arguments for useCurrentDate()",
      extLine(new Error())
    );
}

export function searchNextSiblings(
  currentElement: Element,
  searchedSiblingClass: string
): Element {
  let loopAcc = 0;
  while (currentElement?.nextElementSibling) {
    currentElement = currentElement.nextElementSibling;
    if (
      currentElement?.classList?.contains(searchedSiblingClass) ||
      loopAcc > 999
    )
      break;
    loopAcc++;
  }
  return currentElement;
}

export function searchPreviousSiblings(
  currentElement: Element,
  searchedSiblingClass: string
): Element {
  let loopAcc = 0;
  while (currentElement?.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    if (
      currentElement?.classList?.contains(searchedSiblingClass) ||
      loopAcc > 999
    )
      break;
    loopAcc++;
  }
  return currentElement;
}

export function searchPreviousSiblingsById(
  currentElement: Element,
  searchedSiblingId: string
): Element {
  let loopAcc = 0;
  while (currentElement?.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    if (currentElement?.id === searchedSiblingId || loopAcc > 999) break;
    loopAcc++;
  }
  return currentElement;
}

export function searchParents(
  currentElement: Element,
  searchedParentClass: string
): Element {
  let loopAcc = 0;
  while (currentElement?.parentElement) {
    currentElement = currentElement.parentElement;
    if (
      currentElement?.classList?.contains(searchedParentClass) ||
      loopAcc > 999
    )
      break;
    loopAcc++;
  }
  return currentElement;
}

export function changeToAstDigit(toFileInpBtn: targEl): void {
  if (toFileInpBtn instanceof HTMLButtonElement && toFileInpBtn.textContent) {
    const inpAst =
      toFileInpBtn.previousElementSibling ||
      toFileInpBtn.parentElement!.querySelector("#inpAstConfirmId") ||
      searchPreviousSiblings(toFileInpBtn, "inpAst") ||
      searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
    if (
      (inpAst instanceof HTMLCanvasElement ||
        inpAst instanceof HTMLInputElement ||
        inpAst instanceof HTMLImageElement) &&
      inpAst.parentElement
    ) {
      let labAst = document.querySelector(".labAst");

      if (new RegExp(/Usar/gi).test(toFileInpBtn.textContent)) {
        const fileInp = document.createElement("input");
        Object.assign(fileInp, {
          type: "file",
          id: "inpAstConfirmId",
          accept: "image/*",
          required: true,
        });
        fileInp.dataset.title = "Assinatura do Paciente";
        fileInp.classList.add("inpAst", "mg-07t", "form-control");
        defineLabId(labAst, toFileInpBtn, fileInp);
        toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
        if (toFileInpBtn.previousElementSibling instanceof HTMLButtonElement)
          toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
        fileInp.addEventListener("change", chose => {
          try {
            let imgFile;
            if (fileInp?.files) imgFile = fileInp.files[0];
            if (
              chose?.target instanceof HTMLInputElement &&
              fileInp?.files &&
              fileInp.files?.length > 0 &&
              imgFile &&
              imgFile.type?.startsWith("image") &&
              fileInp.parentElement &&
              labAst
            ) {
              const fileReader = new FileReader();
              fileReader.onload = load => {
                //definir lógica para carregamento
                //inicia preparo para evento de carregamento
                const imgAstDigt = document.createElement("img"); //cria container
                fileInp.id = inpAst.id;
                fileInp.className = inpAst.className;
                Object.assign(imgAstDigt, {
                  src: load.target?.result, //checa a url do file que será carregado
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
                fileInp.parentElement!.replaceChild(imgAstDigt, fileInp);
                defineLabId(labAst, toFileInpBtn, imgAstDigt);
              };
              fileReader.readAsDataURL(imgFile); //lê o file baseado na src carregada
            } else
              throw new Error(`Error on selecting the file and/or finding the parent Element for the file input.
              chose.target: ${chose?.target ?? "UNDEFINED CHOSE"};
              fileInp: ${fileInp ?? "UNDEFINED INP"};
              files: ${fileInp?.files ?? "UNDEFINED FILES"};
              parentElement: ${fileInp?.parentElement ?? "UNDEFINED PARENT"}; 
              imgFile: ${imgFile ?? "UNDEFINED IMAGE"}; 
              imgFile.type: ${imgFile?.type ?? "UNDEFINED TYPE"}; 
              lab ${labAst ?? "UNDEFINED LABEL"}`);
          } catch (error) {
            console.error((error as Error).message);
          }
        });
        inpAst.parentElement.replaceChild(fileInp, inpAst);
      } else if (new RegExp(/Retornar/gi).test(toFileInpBtn.textContent)) {
        const fileInp = document.createElement("canvas");
        Object.assign(fileInp, {
          id: "inpAstConfirmId",
        });
        fileInp.dataset.title = "Assinatura do Paciente";
        defineLabId(labAst, toFileInpBtn, fileInp as any);
        toFileInpBtn.textContent = "Usar Assinatura Digital";
        toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
        inpAst.parentElement.replaceChild(fileInp, inpAst);
        addCanvasListeners();
      } else
        stringError(
          "textContent for toFileInpBtn",
          toFileInpBtn?.textContent,
          extLine(new Error())
        );
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "arguments for inpAst",
        inpAst,
        inpAst?.parentElement,
        toFileInpBtn
      );
    // //TODO INCLUIR TOKEN ANTI-CSRF QUANDO HOUVER SERVIDOR
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for changToAstDigit()",
      toFileInpBtn,
      toFileInpBtn?.textContent
    );
}

export function defineLabId(
  labAst: targEl,
  toFileInpBtn: targEl,
  fileEl: HTMLInputElement | HTMLImageElement | HTMLCanvasElement
): void {
  if (
    toFileInpBtn instanceof HTMLButtonElement &&
    (fileEl instanceof HTMLInputElement ||
      fileEl instanceof HTMLImageElement ||
      fileEl instanceof HTMLCanvasElement)
  ) {
    if (
      !labAst &&
      (toFileInpBtn.parentElement?.tagName === "LABEL" ||
        toFileInpBtn.parentElement?.tagName === "SPAN")
    )
      labAst = toFileInpBtn.parentElement;
    labAst!.id = "spanAstPct";
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "argumentos para defineLabId",
      toFileInpBtn,
      fileEl
    );
}

export function resetarFormulario(
  click: MouseEvent,
  toFileInpBtns: targEl[] | NodeListOf<Element>,
  resetFormBtn: targEl = click?.target as HTMLElement
): void {
  if (
    (click?.target instanceof HTMLButtonElement ||
      resetFormBtn instanceof HTMLButtonElement) &&
    Array.from(toFileInpBtns).every(
      fileBtn => fileBtn instanceof HTMLButtonElement
    )
  ) {
    const formulario = document.getElementById("formAnamGId");
    const editableCite = document.querySelector('cite[contenteditable="true"]');
    const genBirthRel = document.getElementById("genBirthRelId");
    const genTrans = document.getElementById("genTransId");

    formulario instanceof HTMLFormElement
      ? formulario.reset()
      : elementNotFound(
          formulario,
          "formulario in resetarFormulario()",
          extLine(new Error())
        );

    if (editableCite) {
      editableCite.textContent = `--Nome`;
      removeFirstClick(editableCite);
    } else
      elementNotFound(
        editableCite,
        "editableCite in resetarFormulario()",
        extLine(new Error())
      );

    if (
      genBirthRel instanceof HTMLSelectElement ||
      genBirthRel instanceof HTMLTextAreaElement ||
      genBirthRel instanceof HTMLInputElement
    ) {
      genBirthRel.value = "cis";
      genBirthRel.hidden = true;
    } else
      inputNotFound(
        genBirthRel,
        "genBirthRel in resetarFormulario()",
        extLine(new Error())
      );

    if (
      genTrans instanceof HTMLSelectElement ||
      genTrans instanceof HTMLTextAreaElement ||
      genTrans instanceof HTMLInputElement
    ) {
      genTrans.value = "avancado";
      genTrans.hidden = true;
    } else
      inputNotFound(
        genTrans,
        "genTrans in resetarFormulario()",
        extLine(new Error())
      );

    toFileInpBtns.forEach(toFileInpBtn => {
      if (toFileInpBtn?.textContent?.match(/Retornar/g))
        changeToAstDigit(toFileInpBtn);
    });
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for resetarFormulario()",
      `${JSON.stringify(click?.target)}` || null,
      `${JSON.stringify(toFileInpBtns)}` || null
    );
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
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "argumentos para enableCEPBtn",
      cpfBtn,
      cpfLength
    );
  return true;
}

export function syncAriaStates(
  els: Array<Element> | NodeListOf<Element>
): void {
  if (els instanceof NodeList) els = Array.from(els);
  els = els.filter(el => el instanceof Element);
  if (
    Array.isArray(els) &&
    els.length > 0 &&
    Array.from(els).every(el => el instanceof Element)
  ) {
    els.forEach(el => {
      if (
        el instanceof HTMLHtmlElement ||
        (el.parentElement && el.parentElement instanceof HTMLHeadElement)
      )
        return;
      if (el instanceof HTMLElement) {
        el.hidden && !el.focus
          ? (el.ariaHidden = "true")
          : (el.ariaHidden = "false");
        el.addEventListener("click", () => {
          el.hidden && !el.focus
            ? (el.ariaHidden = "true")
            : (el.ariaHidden = "false");
        });
        if (el.classList.contains("poCaller")) {
          el.ariaHasPopup = "menu";
        }
        if (
          el instanceof HTMLSelectElement ||
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement
        ) {
          if (el instanceof HTMLSelectElement) {
            if (el.querySelectorAll("option").length > 0) {
              el.querySelectorAll("option").forEach(option => {
                option.selected
                  ? (option.ariaSelected = "true")
                  : (option.ariaSelected = "false");
              });
              el.addEventListener("change", () => {
                el.querySelectorAll("option").forEach(option => {
                  option.selected
                    ? (option.ariaSelected = "true")
                    : (option.ariaSelected = "false");
                });
              });
            }
            el.addEventListener("click", () => {
              if (el.ariaExpanded === "false") el.ariaExpanded = "true";
              if (el.ariaExpanded === "true") el.ariaExpanded = "false";
            });
          }
          if (
            el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement
          ) {
            if (el.placeholder && el.placeholder !== "")
              el.ariaPlaceholder = el.placeholder;
            if (el.type !== "radio") {
              el.required
                ? (el.ariaRequired = "true")
                : (el.ariaRequired = "false");
              !el.checkValidity()
                ? (el.ariaInvalid = "true")
                : (el.ariaInvalid = "false");
              el.closest("form")?.addEventListener("submit", () => {
                !el.checkValidity()
                  ? (el.ariaInvalid = "true")
                  : (el.ariaInvalid = "false");
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
              if (
                el instanceof HTMLInputElement &&
                el.list &&
                el.list.id !== ""
              )
                el.ariaAutoComplete = "list";
              if (
                el instanceof HTMLInputElement &&
                (el.type === "number" ||
                  el.type === "date" ||
                  el.type === "time")
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
            } else if (
              el instanceof HTMLInputElement &&
              (el.type === "radio" || el.type === "checkbox")
            ) {
              el.checked
                ? (el.ariaChecked = "true")
                : (el.ariaChecked = "false");
              el.disabled
                ? (el.ariaDisabled = "true")
                : (el.ariaDisabled = "false");
              el.addEventListener("change", () => {
                el.checked
                  ? (el.ariaChecked = "true")
                  : (el.ariaChecked = "false");
                el.disabled
                  ? (el.ariaDisabled = "true")
                  : (el.ariaDisabled = "false");
              });
            } else if (
              el instanceof HTMLInputElement &&
              (el.type === "button" ||
                el.type === "submit" ||
                el.type === "reset")
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
  } else
    elementNotPopulated(
      els,
      "List of elements for synchronizing aria states",
      extLine(new Error())
    );
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
      : elementNotFound(
          odTipsBtn,
          "Button for toggling tips",
          extLine(new Error())
        );
    const odTipsClose = document.getElementById("tipsClose");
    odTipsClose instanceof HTMLButtonElement
      ? odTipsClose.addEventListener("click", () => {
          showTipsDlg = !showTipsDlg;
          showTipsDlg ? odTipsDlg.showModal() : odTipsDlg.close();
        })
      : elementNotFound(
          odTipsClose,
          "Close Button for toggling tips",
          extLine(new Error())
        );
  } else {
    !awaitMount
      ? elementNotFound(odTipsDlg, "Dialog for tips", extLine(new Error()))
      : setTimeout(() => {
          !document.getElementById("tipsDlg") &&
            elementNotFound(odTipsDlg, "Dialog for tips", extLine(new Error()));
        }, 2000);
  }
}

let showConformDlg = false;
export function toggleConformDlg(): void {
  const conformDlg = document.getElementById("conformDlg");
  const btnConform = document.getElementById("btnConform");
  if (
    conformDlg instanceof HTMLDialogElement &&
    btnConform instanceof HTMLButtonElement
  ) {
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
    multipleElementsNotFound(
      "Elements for Dialog for agreement terms",
      extLine(new Error()),
      conformDlg,
      btnConform
    );
}

const borderColors: { [k: string]: string } = {};
export async function validateForm(
  subButton: targEl,
  scope: HTMLElement | Document = document
): Promise<[boolean, string[], Array<[string, string | File]>]> {
  const arrValidity: boolean[] = [];
  const invalidEntries: string[] = [];
  const validEntries: Array<[string, string | File]> = [];
  if (
    subButton instanceof HTMLButtonElement &&
    (scope instanceof HTMLElement || scope instanceof Document)
  ) {
    [
      ...scope.querySelectorAll("input"),
      ...scope.querySelectorAll("textarea"),
      ...scope.querySelectorAll("select"),
      ...scope.querySelectorAll("canvas"),
    ].forEach(entry => {
      const displayInvalidity = (valid: boolean = true) => {
        if (!valid && !(entry instanceof HTMLCanvasElement)) {
          entry.scrollIntoView({ behavior: "smooth" });
          if (!/border-color/g.test(getComputedStyle(entry).transition))
            entry.style.transition =
              (getComputedStyle(entry).transition || "") +
              "border-color ease-in-out 1s";
          if (
            !borderColors[
              entry.id ||
                entry.name ||
                entry.classList.toString().replaceAll(" ", "_")
            ]
          )
            borderColors[
              entry.id ||
                entry.name ||
                entry.classList.toString().replaceAll(" ", "_")
            ] =
              getComputedStyle(entry).borderColor ||
              getComputedStyle(entry).borderBottomColor;
          entry.style.borderColor = "red";
          setTimeout(
            () =>
              (entry.style.borderColor =
                borderColors[
                  entry.id ||
                    entry.name ||
                    entry.classList.toString().replaceAll(" ", "_")
                ] || "rgb(222, 226, 230)"),
            1000
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
          invalidEntries.push(
            entry.name || entry.id || entry.dataset.title || entry.tagName
          );
          displayInvalidity(isValid);
        }
      } else if (
        entry instanceof HTMLInputElement ||
        entry instanceof HTMLTextAreaElement
      ) {
        if (!entry.checkValidity()) {
          isValid = false;
          invalidEntries.push(
            entry.id || entry.name || entry.dataset.title || entry.tagName
          );
          displayInvalidity(isValid);
        }
        if (entry instanceof HTMLInputElement && entry.type === "date") {
          if (entry.classList.contains("minCurrDate")) {
            const currDate = new Date()
              .toISOString()
              .split("T")[0]
              .replaceAll("-", "")
              .trim();
            if (currDate.length < 8) {
              console.warn(
                `Failed to form Current Date string. Aborting check.`
              );
              return;
            }
            const currNumDate = Math.abs(parseNotNaN(currDate));
            if (
              !Number.isFinite(currNumDate) ||
              currNumDate
                .toString()
                .slice(0, currNumDate.toString().indexOf(".")).length < 8
            ) {
              console.warn(
                `Failed to get Current Date as a Number. Aborting check.`
              );
              return;
            }
            const entryNumDateValue = parseNotNaN(
              entry.value.replaceAll("-", "")
            );
            if (
              !Number.isFinite(entryNumDateValue) ||
              entryNumDateValue
                .toString()
                .slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
            ) {
              console.warn(
                `Failed to get Current Date as a Number. Aborting check.`
              );
              return;
            }
            if (entryNumDateValue < currNumDate) {
              isValid = false;
              invalidEntries.push(
                entry.id || entry.name || entry.dataset.title || entry.tagName
              );
              displayInvalidity(isValid);
            }
          }
          if (entry.classList.contains("maxCurrDate")) {
            const currDate = new Date()
              .toISOString()
              .split("T")[0]
              .replaceAll("-", "")
              .trim();
            if (currDate.length < 8) {
              console.warn(
                `Failed to form Current Date string. Aborting check.`
              );
              return;
            }
            const currNumDate = Math.abs(parseNotNaN(currDate));
            if (
              !Number.isFinite(currNumDate) ||
              currNumDate
                .toString()
                .slice(0, currNumDate.toString().indexOf(".")).length < 8
            ) {
              console.warn(
                `Failed to get Current Date as a Number. Aborting check.`
              );
              return;
            }
            const entryNumDateValue = parseNotNaN(
              entry.value.replaceAll("-", "")
            );
            if (
              !Number.isFinite(entryNumDateValue) ||
              entryNumDateValue
                .toString()
                .slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
            ) {
              console.warn(
                `Failed to get Current Date as a Number. Aborting check.`
              );
              return;
            }
            if (entryNumDateValue > currNumDate) {
              isValid = false;
              invalidEntries.push(
                entry.id || entry.name || entry.dataset.title || entry.tagName
              );
              displayInvalidity(isValid);
            }
          }
        } else if (
          entry instanceof HTMLInputElement &&
          entry.type === "radio"
        ) {
          try {
            let parent = entry.parentElement;
            if (!(parent instanceof Element))
              throw elementNotFound(
                parent,
                `Validation of parent instance`,
                "Element"
              );
            if (parent.querySelectorAll('input[type="radio"]').length < 2)
              parent = parent.closest(".divAdd") ?? parent.parentElement;
            if (!(parent instanceof Element))
              throw elementNotFound(
                parent,
                `Validation of parent parent instance`,
                "Element"
              );
            const radioGroupList = parent.querySelectorAll(
              'input[type="radio"]'
            );
            if (radioGroupList.length === 0)
              throw new Error(`Error populating list of radios from parent`);
            if (
              !Array.from(radioGroupList)
                .filter(
                  radio =>
                    radio instanceof HTMLInputElement && radio.type === "radio"
                )
                .some(
                  radio =>
                    radio instanceof HTMLInputElement &&
                    radio.type === "radio" &&
                    radio.checked
                )
            ) {
              isValid = false;
              displayInvalidity(isValid);
            }
          } catch (e) {
            console.error(
              `Error executing procedure for validating radio:\n${
                (e as Error).message
              }`
            );
          }
        } else if (entry instanceof HTMLInputElement && entry.type === "file") {
          if (!(entry.files && entry.files[0])) {
            isValid = false;
            invalidEntries.push(
              entry.name || entry.id || entry.dataset.title || entry.tagName
            );
            displayInvalidity(isValid);
          }
        } else {
          if (
            entry.classList.contains("minText") &&
            entry.value.length < parseNotNaN(entry.dataset.reqlength || "3")
          ) {
            isValid = false;
            invalidEntries.push(
              entry.id || entry.name || entry.dataset.title || entry.tagName
            );
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("maxText") &&
            entry.value.length > parseNotNaN(entry.dataset.maxlength || "3")
          ) {
            isValid = false;
            invalidEntries.push(
              entry.id || entry.name || entry.dataset.title || entry.tagName
            );
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("minNum") &&
            parseNotNaN(entry.value) < parseNotNaN(entry.dataset.minnum || "3")
          ) {
            isValid = false;
            invalidEntries.push(
              entry.id || entry.name || entry.dataset.title || entry.tagName
            );
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("maxNum") &&
            parseNotNaN(entry.value) > parseNotNaN(entry.dataset.maxnum || "3")
          ) {
            isValid = false;
            invalidEntries.push(
              entry.id || entry.name || entry.dataset.title || entry.tagName
            );
            displayInvalidity(isValid);
          }
          if (
            entry.classList.contains("patternText") &&
            entry.dataset.pattern &&
            !new RegExp(entry.dataset.pattern, entry.dataset.flags || "").test(
              entry.value
            )
          ) {
            isValid = false;
            invalidEntries.push(
              entry.id || entry.name || entry.dataset.title || entry.tagName
            );
            displayInvalidity(isValid);
          }
        }
        arrValidity.push(isValid);
        if (isValid) {
          if (
            entry instanceof HTMLInputElement &&
            entry.type === "checkbox" &&
            entry.role !== "switch"
          )
            validEntries.push([
              entry.name || entry.id || entry.dataset.title || entry.tagName,
              `${entry.checked}`,
            ]);
          else if (
            entry instanceof HTMLInputElement &&
            entry.type === "radio"
          ) {
            try {
              let parent = entry.parentElement;
              if (!(parent instanceof Element))
                throw elementNotFound(
                  parent,
                  `Validation of parent instance`,
                  "Element"
                );
              if (parent.querySelectorAll('input[type="radio"]').length < 2)
                parent = parent.closest(".divAdd") ?? parent.parentElement;
              if (!(parent instanceof Element))
                throw elementNotFound(
                  parent,
                  `Validation of parent parent instance`,
                  "Element"
                );
              const radioGroupList = parent.querySelectorAll(
                'input[type="radio"]'
              );
              if (radioGroupList.length === 0)
                throw new Error(`Error populating list of radios from parent`);
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
                      `true`,
                    ]);
              } else {
                const opChecked = Array.from(radioGroupList).filter(
                  radio =>
                    radio instanceof HTMLInputElement &&
                    radio.type === "radio" &&
                    radio.checked
                )[0];
                // const otherOpsChecked = Array.from(radioGroupList)
                //   .filter(
                //     radio =>
                //       radio instanceof HTMLInputElement &&
                //       radio.type === "radio" &&
                //       radio.checked
                //   )
                //   .slice(1);
                if (
                  !(
                    opChecked instanceof HTMLInputElement &&
                    opChecked.type === "radio"
                  )
                ) {
                  validEntries.push([
                    opChecked.id || opChecked.tagName,
                    `false`,
                  ]);
                  throw new Error(`Failed to find checked radio in group`);
                }
                if (radioGroupList.length === 2) {
                  if (
                    opChecked.id.endsWith("No") ||
                    opChecked.id.endsWith("-no") ||
                    opChecked.id.endsWith("-No") ||
                    opChecked.classList.contains("radNo")
                  )
                    validEntries.push([
                      opChecked.name ||
                        opChecked.id ||
                        opChecked.dataset.title ||
                        opChecked.tagName,
                      `false`,
                    ]);
                  else
                    validEntries.push([
                      opChecked.name ||
                        opChecked.id ||
                        opChecked.dataset.title ||
                        opChecked.tagName,
                      `true`,
                    ]);
                } else if (radioGroupList.length > 2) {
                  validEntries.push([
                    opChecked.name ||
                      opChecked.id ||
                      opChecked.dataset.title ||
                      opChecked.tagName,
                    opChecked.dataset.value || `true`,
                  ]);
                }
              }
            } catch (e) {
              console.error(
                `Error executing procedure for pushing radio check:\n${
                  (e as Error).message
                }`
              );
            }
          } else if (
            entry instanceof HTMLInputElement &&
            entry.type === "file" &&
            entry.files
          ) {
            validEntries.push([
              entry.name || entry.id || entry.dataset.title || entry.tagName,
              entry.files[0],
            ]);
          } else if (entry instanceof HTMLCanvasElement) {
            (async (): Promise<File> => {
              return new Promise((res, rej) => {
                entry.toBlob(blob => {
                  if (blob) {
                    res(
                      new File(
                        [blob],
                        entry.name ||
                          entry.id ||
                          entry.dataset.title ||
                          entry.tagName,
                        { type: blob.type }
                      )
                    );
                  } else rej(new Error(`Failed to extract file.`));
                });
              });
            })().then(file =>
              validEntries.push([
                entry.name || entry.id || entry.dataset.title || entry.tagName,
                file,
              ])
            );
          } else
            validEntries.push([
              entry.name || entry.id || entry.dataset.title || entry.tagName,
              entry.value,
            ]);
        }
      }
    });
  } else
    elementNotFound(
      subButton,
      `Button for submiting form id ${subButton?.id ?? "UNIDENTIFIED"}`,
      extLine(new Error())
    );
  return [
    arrValidity.some(validity => validity === false) ? false : true,
    invalidEntries.map(invalidIdf => `${invalidIdf} \n`),
    validEntries,
  ];
}

export function handleCondtReq(
  el: targEl,
  options: {
    pattern?: [string, string] | RegExp;
    min?: number;
    max?: number;
    minNum?: number;
    maxNum?: number;
  }
): void {
  try {
    if (
      !(
        el instanceof HTMLInputElement &&
        (el.type === "text" ||
          el.type === "number" ||
          el.type === "email" ||
          el.type === "password" ||
          el.type === "tel" ||
          el.type === "date")
      )
    )
      throw inputNotFound(
        el,
        `${el?.id || el?.className || el?.tagName}`,
        extLine(new Error())
      );
    if (
      !(
        options.pattern &&
        options.min &&
        options.max &&
        options.maxNum &&
        options.minNum
      )
    )
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
    if (options.min && typeof options.min !== "number")
      throw new Error(`Wrong type given to options.min`);
    if (options.max && typeof options.max !== "number")
      throw new Error(`Wrong type given to options.max`);
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
      if (options.pattern) {
        if (Array.isArray(options.pattern)) {
          el.dataset["pattern"] = `${options.pattern[0]}`;
          el.dataset["flags"] = `${options.pattern[1]}`;
        } else {
          el.dataset["pattern"] = `${(options.pattern as RegExp).source}`;
          el.dataset["flags"] = `${(options.pattern as RegExp).flags || ""}`;
        }
        if (!el.classList.contains("patternText"))
          el.classList.add("patternText");
      }
      handleEventReq(el);
    } else {
      delete el.dataset["reqlength"];
      delete el.dataset["maxlength"];
      delete el.dataset["pattern"];
      delete el.dataset["flags"];
      delete el.dataset["minnum"];
      delete el.dataset["maxnum"];
      el.min = "";
      el.max = "";
      el.maxLength = 9999;
      el.minLength = 0;
    }
  } catch (e) {
    console.error(`Error executing handleCondtReq:\n${(e as Error).message}`);
  }
}

export const iniFontColors: { [k: string]: string } = {};

export function handleEventReq(
  entry: textEl | Event,
  alertColor: string = "#e52626"
): void {
  let isValid = true;
  if (entry instanceof Event) {
    if (
      !(
        entry.currentTarget instanceof HTMLInputElement ||
        entry.currentTarget instanceof HTMLTextAreaElement
      )
    )
      return;
    entry = entry.currentTarget;
  }
  if (
    !(entry instanceof HTMLInputElement || entry instanceof HTMLTextAreaElement)
  )
    throw inputNotFound(
      entry,
      `validation of entry argument for handleEventReq`,
      extLine(new Error())
    );
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
  if (!iniFontColors[entry.id || entry.name])
    iniFontColors[entry.id || entry.name] = getComputedStyle(entry).color;
  if ((iniFontColors[entry.id || entry.name] = alertColor))
    iniFontColors[entry.id || entry.name] = "rgb(33, 37, 41)";
  [
    ...document.querySelectorAll('input[type="number"]'),
    ...document.querySelectorAll('input[type="date"]'),
    ...document.querySelectorAll('input[type="time"]'),
  ].forEach(numInp => {
    if (
      numInp instanceof HTMLInputElement &&
      (numInp.type === "number" ||
        numInp.type === "date" ||
        numInp.type === "time")
    ) {
      if (numInp.step === "") numInp.step = "any";
      numInp.step !== "any" &&
        !/[^0-9]/g.test(numInp.step) &&
        numInp.step.replaceAll(/[^0-9]/g, "");
    }
  });
  if (!entry.checkValidity()) {
    console.log("Failed check validity");
    isValid = false;
    console.log(`
    -- List for failure causes:
    Bad Input: ${entry.validity.badInput}
    Custom Error: ${entry.validity.customError}
    Pattern Mismatch: ${entry.validity.patternMismatch}
    Range Overflow: ${entry.validity.rangeOverflow}
    Range Underflow: ${entry.validity.rangeUnderflow}
    Step Mismatch: ${entry.validity.stepMismatch}
    Too Long: ${entry.validity.tooLong}
    Too Short: ${entry.validity.tooShort}
    Type Mismatch: ${entry.validity.typeMismatch}
    Value Missing: ${entry.validity.valueMissing}
    `);
    entry.validity.stepMismatch &&
      entry instanceof HTMLInputElement &&
      console.log(`Step is: ${entry.step || "step not defined"}`);
    entry.validity.rangeOverflow &&
      entry instanceof HTMLInputElement &&
      console.log(`Max should be: ${entry.max || "max not defined"}`);
    console.log("Obtained value: " + entry.value);
  }
  if (entry.type === "date") {
    if (entry.classList.contains("minCurrDate")) {
      const currDate = new Date()
        .toISOString()
        .split("T")[0]
        .replaceAll("-", "")
        .trim();
      if (currDate.length < 8) {
        console.warn(`Failed to form Current Date string. Aborting check.`);
        return;
      }
      const currNumDate = Math.abs(parseNotNaN(currDate));
      if (
        !Number.isFinite(currNumDate) ||
        currNumDate.toString().slice(0, currNumDate.toString().indexOf("."))
          .length < 8
      ) {
        console.warn(`Failed to get Current Date as a Number. Aborting check.`);
        return;
      }
      const entryNumDateValue = parseNotNaN(entry.value.replaceAll("-", ""));
      if (
        !Number.isFinite(entryNumDateValue) ||
        entryNumDateValue
          .toString()
          .slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
      ) {
        console.warn(`Failed to get Current Date as a Number. Aborting check.`);
        return;
      }
      if (entryNumDateValue < currNumDate) isValid = false;
    }
    if (entry.classList.contains("maxCurrDate")) {
      const currDate = new Date()
        .toISOString()
        .split("T")[0]
        .replaceAll("-", "")
        .trim();
      if (currDate.length < 8) {
        console.warn(`Failed to form Current Date string. Aborting check.`);
        return;
      }
      const currNumDate = Math.abs(parseNotNaN(currDate));
      if (
        !Number.isFinite(currNumDate) ||
        currNumDate.toString().slice(0, currNumDate.toString().indexOf("."))
          .length < 8
      ) {
        console.warn(`Failed to get Current Date as a Number. Aborting check.`);
        return;
      }
      const entryNumDateValue = parseNotNaN(entry.value.replaceAll("-", ""));
      if (
        !Number.isFinite(entryNumDateValue) ||
        entryNumDateValue
          .toString()
          .slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
      ) {
        console.warn(`Failed to get Current Date as a Number. Aborting check.`);
        return;
      }
      if (entryNumDateValue > currNumDate) isValid = false;
    }
  } else {
    if (
      entry.classList.contains("minText") &&
      entry.value.length < parseNotNaN(entry.dataset.reqlength || "3")
    ) {
      console.log("Failed minText");
      isValid = false;
    }
    if (
      entry.classList.contains("maxText") &&
      entry.value.length > parseNotNaN(entry.dataset.maxlength || "3")
    ) {
      console.log("Failed maxText");
      isValid = false;
    }
    if (
      entry.classList.contains("minNum") &&
      parseNotNaN(entry.value) < parseNotNaN(entry.dataset.minnum || "3")
    ) {
      console.log("Failed minNum");
      isValid = false;
    }
    if (
      entry.classList.contains("maxNum") &&
      parseNotNaN(entry.value) > parseNotNaN(entry.dataset.maxnum || "3")
    ) {
      console.log("Failed maxNum");
      isValid = false;
    }
    if (
      entry.classList.contains("patternText") &&
      entry.dataset.pattern &&
      !new RegExp(entry.dataset.pattern, entry.dataset.flags || "").test(
        entry.value
      )
    ) {
      console.log("Failed patternText");
      isValid = false;
    }
  }
  if (!isValid) entry.style.color = alertColor;
  setTimeout(() => {
    if (entry instanceof Event) {
      if (
        !(
          entry.currentTarget instanceof HTMLInputElement ||
          entry.currentTarget instanceof HTMLTextAreaElement
        )
      )
        return;
      entry = entry.currentTarget;
    }
    entry.style.color = "rgb(33, 37, 41)";
  }, 2000);
}
