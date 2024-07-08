//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import { parseNotNaN, removeFirstClick } from "../gModel";
import { fadeElement, highlightChange, isClickOutside } from "../gStyleScript";
import type { targEl, primitiveType } from "../declarations/types";
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
  const selection = window.getSelection();
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
    window.addEventListener("keydown", press => {
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

export function subForm(
  subButton: targEl,
  scope: HTMLElement | Document = document
): boolean {
  window.alert(
    "Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)"
  );
  const arrValidity: boolean[] = [];
  if (
    subButton instanceof HTMLButtonElement &&
    (scope instanceof HTMLElement || scope instanceof Document)
  ) {
    let accInvalid = 0;
    [
      ...scope.querySelectorAll("input"),
      ...scope.querySelectorAll("textarea"),
      ...scope.querySelectorAll("select"),
    ].forEach(entry => {
      if (entry instanceof HTMLSelectElement) {
        entry.value !== "" ? arrValidity.push(true) : arrValidity.push(false);
      }
      if (
        entry instanceof HTMLInputElement ||
        entry instanceof HTMLTextAreaElement
      ) {
        const displayInvalidity = () => {
          ++accInvalid;
          highlightChange(entry);
          if (accInvalid === 1) entry.scrollIntoView({ behavior: "smooth" });
          if (
            entry instanceof HTMLInputElement &&
            (!(
              entry.type === "checkbox" ||
              entry.type === "radio" ||
              entry.type === "file" ||
              entry.type === "submit" ||
              entry.type === "button" ||
              entry.type === "reset"
            ) ||
              entry instanceof HTMLTextAreaElement)
          ) {
            const prevPlaceholder = entry.placeholder;
            entry.placeholder = `Entrada inválida`;
            setTimeout(() => {
              entry.placeholder = prevPlaceholder;
            }, 2000);
          }
        };
        let isValid = true;
        if (!entry.checkValidity()) {
          isValid = false;
          displayInvalidity();
        }
        if (
          entry.classList.contains("minText") &&
          entry.value.length < parseNotNaN(entry.dataset.reqlength || "3")
        ) {
          isValid = false;
          displayInvalidity();
        }
        if (
          entry.classList.contains("maxText") &&
          entry.value.length > parseNotNaN(entry.dataset.maxlength || "3")
        ) {
          isValid = false;
          displayInvalidity();
        }
        if (
          entry.classList.contains("minNum") &&
          parseNotNaN(entry.value) < parseNotNaN(entry.dataset.minnum || "3")
        ) {
          isValid = false;
          displayInvalidity();
        }
        if (
          entry.classList.contains("maxNum") &&
          parseNotNaN(entry.value) > parseNotNaN(entry.dataset.maxnum || "3")
        ) {
          isValid = false;
          displayInvalidity();
        }
        if (entry.classList.contains("patternText") && entry.dataset.pattern) {
          if (
            !new RegExp(entry.dataset.pattern, entry.dataset.flags || "").test(
              entry.value
            )
          )
            isValid = false;
          displayInvalidity();
        }
        arrValidity.push(isValid);
      }
    });
  } else
    elementNotFound(
      subButton,
      `Button for submiting form id ${subButton?.id ?? "UNIDENTIFIED"}`,
      extLine(new Error())
    );
  return arrValidity.some(validity => validity === false) ? false : true;
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
          el.type === "tel")
      )
    )
      throw inputNotFound(
        el,
        `${el?.id || el?.className || el?.tagName}`,
        extLine(new Error())
      );
    if (options.pattern || options.min || options.max)
      throw new Error(`No pattern was given to handleCondtReq`);
    if (
      options.pattern &&
      ((options.pattern as any) instanceof RegExp ||
        ((options.pattern as any) instanceof Array &&
          (options.pattern as Array<any>).every(
            idx => typeof idx === "string"
          )))
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
    } else {
      el.dataset["reqlength"] = undefined;
      el.dataset["maxlength"] = undefined;
      el.dataset["pattern"] = undefined;
      el.dataset["flags"] = undefined;
      el.dataset["minnum"] = undefined;
      el.dataset["maxnum"] = undefined;
      el.min = "";
      el.max = "";
      el.maxLength = 9999;
      el.minLength = 0;
    }
  } catch (e) {
    console.error(`Error executing handleCondtReq:\n${(e as Error).message}`);
  }
}
