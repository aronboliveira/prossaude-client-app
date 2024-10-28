//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
import { cursorCheckTimer } from "./handlers/gHandlers";
import { fadeElement } from "./gStyleScript";
import type { entryEl, textEl, targStr, targEl, nlFm, nlEl } from "./declarations/types";
import { Dispatch, SetStateAction } from "react";
import { AlignType, BirthRelation, BodyType, CSSMeasure, TransitionLevel } from "./declarations/testVars";
import { ERROR_LIMIT, errorLabels, person } from "@/vars";
export function numberLimit(inpEl: targEl): void {
  if (inpEl instanceof HTMLInputElement || inpEl instanceof HTMLTextAreaElement || inpEl instanceof HTMLSelectElement) {
    const isAtivFis = inpEl.classList.contains("inpAtivFis");
    const isAlimRot = inpEl.classList.contains("inpAlimRot");
    const isDDD = inpEl.classList.contains("inpDDD");
    const isFreq = inpEl.classList.contains("freqInpList");
    if (
      (isAtivFis || isAlimRot || inpEl.classList.contains("inpLocNum") || isDDD || isFreq) &&
      !inpEl.classList.contains("float")
    ) {
      if (inpEl.value?.match(/[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g)) {
        const wrongMatchIndex = inpEl.value.indexOf(
          inpEl.value.match(/[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g)?.[0] ?? "",
        );
        inpEl.value =
          inpEl.value.slice(0, wrongMatchIndex > 0 ? wrongMatchIndex : inpEl.value.length) +
          inpEl.value.slice(wrongMatchIndex + 1 > 0 ? wrongMatchIndex + 1 : inpEl.value.length);
      }
      if (parseInt(inpEl.value) < 1 && inpEl.id?.endsWith("Max")) {
        const inpValueArray = Array.from(inpEl.value);
        inpValueArray?.splice(0, 1, "1");
        inpEl.value = inpValueArray?.toString();
      }
      if ((isAtivFis || isAlimRot || isDDD || isFreq) && inpEl.value?.length > 2) inpEl.value = inpEl.value.slice(0, 2);
    }
  }
}
export function normalizeNegatives(tabInp: Element): string {
  let parsedInpValue = 0;
  if (tabInp instanceof HTMLInputElement) {
    parsedInpValue = parseFloat(tabInp.value);
    if (Number.isNaN(parsedInpValue) || parsedInpValue < 0) {
      tabInp.value = "0";
    }
  }
  return parsedInpValue.toString() ?? "";
}
export function parseNotNaN(iniVal: string, def: number = 0, context: string = "float", fixed: number = 4): number {
  let returnVal = 0;
  try {
    if (typeof iniVal !== "string") throw new Error("Failed to validate argument: iniVal must be a string.");
    if (typeof context !== "string") throw new Error("Failed to validate argument: context must be a string.");
    if (typeof def !== "number") throw new Error("Failed to validate argument: def must be a number.");
    if (typeof fixed !== "number") throw new Error("Failed to validate argument: fixed must be a number.");
    switch (context) {
      case "int":
        returnVal = parseInt(iniVal, 10) || def;
        if (!Number.isFinite(returnVal) || Number.isNaN(returnVal) || isNaN(returnVal)) returnVal = def;
        break;
      case "float":
        returnVal = parseFloat(parseFloat(iniVal).toFixed(fixed)) || def;
        if (!Number.isFinite(returnVal) || isNaN(returnVal)) returnVal = def;
        break;
      default:
        throw new Error(`Context of parsing invalid.`);
    }
    return returnVal || 0;
  } catch (e) {
    return returnVal || 0;
  }
}
export function formatCEP(CEPInp: targEl): string {
  if (CEPInp instanceof HTMLInputElement || CEPInp instanceof HTMLTextAreaElement) {
    CEPInp.value.replaceAll(/[^0-9]/g, "");
    if (CEPInp.value.length >= 5 && CEPInp.value.match(/[0-9]{5,}[^-][0-9]{1,3}/))
      CEPInp.value = `${CEPInp.value.slice(0, 5)}-${CEPInp.value.slice(5, 9)}`;
  }
  return (CEPInp as entryEl)?.value ?? "";
}
export function formatCPF(CPFInp: targEl): string {
  if (CPFInp instanceof HTMLInputElement || CPFInp instanceof HTMLTextAreaElement) {
    CPFInp.value = CPFInp.value
      .replaceAll(/[^0-9.-]/g, "")
      .replaceAll(/[-]{2,}/g, "-")
      .replaceAll(/\.{2,}/g, ".");
    if (CPFInp.value.length === 4 && !CPFInp.value.match(/^[0-9]{3,}\.$/) && CPFInp.value.match(/^[0-9]{4,}$/)) {
      const _1checkCPF = CPFInp.value;
      CPFInp.value = `${_1checkCPF.slice(0, 3)}.${_1checkCPF.slice(3, 4)}`;
    }
    if (
      CPFInp.value.length === 8 &&
      !CPFInp.value.match(/^[0-9]{3,}\.[0-9]{3,}\.$/) &&
      CPFInp.value.match(/^[0-9]{3,}\.[0-9]{4,}$/)
    )
      CPFInp.value = `${CPFInp.value.slice(0, 7)}.${CPFInp.value.slice(7, 8)}`;
    if (
      CPFInp.value.length === 12 &&
      !CPFInp.value.match(/^[0-9]{3,}\.[0-9]{3,}\.[0-9]{3,}[-]}$/) &&
      CPFInp.value.match(/^[0-9]{3,}\.[0-9]{3,}\.[0-9]{4,}$/)
    ) {
      CPFInp.value = `${CPFInp.value.slice(0, 11)}-${CPFInp.value.slice(11, 12)}`;
    }
    CPFInp.value.length > 14 &&
      (CPFInp.value = CPFInp.value.substring(0, 14)).replaceAll(/[-]{2,}/g, "-").replaceAll(/\.{2,}/g, ".");
  }
  return (CPFInp as entryEl)?.value ?? "";
}
export function formatTel(telInp: targEl, full: boolean = false): string {
  let numOnly = "";
  if (telInp instanceof HTMLInputElement || telInp instanceof HTMLTextAreaElement) {
    if (full === true) {
      if (telInp.value.length === 1) {
        telInp.value = `(${telInp.value}`;
        return telInp.value;
      }
      if (telInp.value.length === 3 && /^\([0-9]{2,}$/.test(telInp.value)) {
        telInp.value = `${telInp.value.slice(0, 3)}) `;
        return telInp.value;
      }
      if (
        (telInp.value.length === 10 &&
          telInp.value.slice(telInp.value.indexOf(" ") + 1, telInp.value.indexOf(" ") + 2) === "9") ||
        (telInp.value.length === 9 &&
          telInp.value.slice(telInp.value.indexOf(" ") + 1, telInp.value.indexOf(" ") + 2) !== "9")
      ) {
        telInp.value = `${telInp.value.slice(0, telInp.value.length)}-`;
        return telInp.value;
      }
      if (telInp.value.length > 14) {
        telInp.value = telInp.value.slice(0, 15);
        return telInp.value;
      }
    } else {
      numOnly = (telInp.value?.replace(/[^0-9-]/g, "") || numOnly).replace(/\d+/g, matchTel => {
        if (matchTel.length === 9) {
          return matchTel[0] === "9"
            ? `${matchTel.slice(0, 5)}-${matchTel.slice(5, 9)}`
            : `${matchTel.slice(0, 4)}-${matchTel.slice(4, 8)}`;
        } else if (matchTel?.length > 9) return `${matchTel.slice(0, 8)}`;
        return matchTel;
      });
      telInp.value = numOnly;
      if (!/^9/.test(telInp.value) && !/-/g.test(telInp.value) && telInp.value.length === 4)
        telInp.value = `${telInp.value.slice(0, 4)}-${telInp.value.slice(4)}`;
      return telInp.value;
    }
  }
  return numOnly;
}
export function addEmailExtension(emailInp: targEl): string {
  let emailValue = "";
  if (emailInp instanceof HTMLInputElement || emailInp instanceof HTMLTextAreaElement) {
    if (emailInp.value === "") {
      emailInp.value = "@.";
      emailInp.type !== "email" && emailInp.setSelectionRange(0, 0);
    } else if (emailInp.value === "@") {
      emailInp.value += "@.";
      emailInp.type !== "email" && emailInp.setSelectionRange(0, 0);
    }
    emailValue = emailInp.value;
  }
  return emailValue;
}
export function removeFirstClick(el: targEl): number {
  let cursorPosition = 0;
  if (el instanceof Element) {
    if (el.textContent === "Insira Seu Nome Aqui") el.textContent = "";
    setInterval(() => {
      cursorPosition = cursorCheckTimer() ?? 0;
    }, 3000);
  }
  return cursorPosition ?? 0;
}
export function checkAutoCorrect(deactAutocorrectBtn: targEl): boolean {
  let isAutocorrectOn = true;
  if (deactAutocorrectBtn instanceof HTMLButtonElement) {
    deactAutocorrectBtn.textContent?.match(/Ativar/) ? (isAutocorrectOn = false) : (isAutocorrectOn = true);
  } else if (
    deactAutocorrectBtn instanceof HTMLInputElement &&
    (deactAutocorrectBtn.type === "checkbox" || deactAutocorrectBtn.type === "radio")
  ) {
    deactAutocorrectBtn.checked ? (isAutocorrectOn = true) : (isAutocorrectOn = false);
  }
  return isAutocorrectOn;
}
export function switchAutocorrect(click: Event, deactAutocorrectBtn: targEl, isAutocorrectOn: boolean = true): boolean {
  if (click?.target === deactAutocorrectBtn)
    if (deactAutocorrectBtn instanceof HTMLButtonElement) {
      isAutocorrectOn = !isAutocorrectOn; //if-if não funciona aqui
      isAutocorrectOn
        ? (deactAutocorrectBtn.textContent = "Desativar Autocorreção")
        : (deactAutocorrectBtn.textContent = "Ativar Autocorreção");
    } else if (
      deactAutocorrectBtn instanceof HTMLInputElement &&
      (deactAutocorrectBtn.type === "checkbox" || deactAutocorrectBtn.type === "radio")
    )
      isAutocorrectOn = !isAutocorrectOn;
  return isAutocorrectOn;
}
export function checkAllGenConts(...els: targEl[]): boolean {
  if (
    Array.isArray(els) &&
    els?.every(
      el => el instanceof HTMLSelectElement || el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement,
    )
  )
    return true;
  return false;
}
export function fluxGen(
  genConts: {
    g: entryEl;
    gb: entryEl;
    gt: entryEl;
    ga: entryEl;
  },
  transSetter?: Dispatch<SetStateAction<TransitionLevel>>,
  birthSetter?: Dispatch<SetStateAction<BirthRelation>>,
  alignSetter?: Dispatch<SetStateAction<AlignType>>,
): BodyType {
  if (
    Object.values(genConts).every(
      genCont =>
        genCont instanceof HTMLSelectElement ||
        genCont instanceof HTMLInputElement ||
        genCont instanceof HTMLTextAreaElement,
    )
  ) {
    const switchAlign = (): void => {
        if (gb.value === "cis") return;
        const contFeminilizado =
          ga instanceof HTMLSelectElement
            ? Array.from(ga.options).find(o => o.value === "feminilizado") ??
              ga.querySelector('option[value="masculinizado"]')
            : document.querySelector('option[value="feminilizado"]');
        const contMasculinizado =
          ga instanceof HTMLSelectElement
            ? Array.from(ga.options).find(o => o.value === "masculinizado") ??
              ga.querySelector('option[value="masculinizado"]')
            : document.querySelector('option[value="masculinizado"]');
        if (contFeminilizado instanceof HTMLOptionElement && contMasculinizado instanceof HTMLOptionElement) {
          if (gt.value === "avancado" || gb.value === "undefined") {
            if (g.value === "masculino") {
              if (alignSetter) alignSetter("masculinizado");
              else {
                contFeminilizado?.selected && contFeminilizado.removeAttribute("selected");
                contMasculinizado.setAttribute("selected", "");
              }
            }
            if (g.value === "feminino") {
              if (alignSetter) alignSetter("feminilizado");
              else {
                contMasculinizado?.selected && contMasculinizado.removeAttribute("selected");
                contFeminilizado.setAttribute("selected", "");
              }
            }
          }
        }
      },
      fluxAlign = (): BodyType => {
        switchAlign();
        showStgTransHorm(gt);
        showGenFisAlin(ga, g);
        switch (ga.value) {
          case "masculinizado":
            return "masculino";
          case "feminilizado":
            return "feminino";
          case "neutro":
            return "neutro";
          default:
            return person.gen;
        }
      },
      { g, gb, gt, ga } = genConts;
    gb.disabled = false;
    gt.disabled = false;
    ga.disabled = false;
    if (g.value === "masculino" || g.value === "feminino") {
      if (gb.value === "cis" || gb.value === "undefined") {
        switchAlign();
        hideStgTransHorm(gt);
        hideGenFisAlin(ga);
        gt.disabled = true;
        ga.disabled = true;
        return g.value || person.gen;
      }
      switchAlign();
      showStgTransHorm(gt);
      if (gb.value === "trans" && gt.value === "avancado") {
        hideGenFisAlin(ga);
        ga.disabled = true;
        return g.value || person.gen;
      }
      return fluxAlign();
    }
    if (g.value === "naoBinario") {
      gb.disabled = true;
      if (birthSetter) birthSetter("trans");
      else gb.value = "trans";
    } else if (g.value === "undefined") {
      gb.disabled = true;
      if (birthSetter) birthSetter("undefined");
      else gb.value = "undefined";
      gt.disabled = true;
      if (transSetter) transSetter("undefined");
      else gt.value = "undefined";
      hideStgTransHorm(gt);
    }
    return fluxAlign();
  }
  return "masculino";
}
export function showGenFisAlin(ga: targEl, g: targEl): boolean {
  if (
    ga instanceof HTMLSelectElement ||
    ga instanceof HTMLInputElement ||
    (ga instanceof HTMLTextAreaElement && ga.closest(".genSpan"))
  ) {
    if ((ga.closest(".genSpan") as HTMLElement)?.hidden === true) {
      fadeElement(ga.closest(".genSpan"), "0");
      setTimeout(() => {
        ga.closest(".genSpan")?.removeAttribute("hidden");
        setTimeout(() => {
          fadeElement(ga.closest(".genSpan"), "1");
          if (!g) return;
          ga.style.width = getComputedStyle(g).width;
          ga.style.maxWidth = getComputedStyle(g).width;
        }, 250);
      }, 250);
    }
    return true;
  }
  return false;
}
export function hideGenFisAlin(ga: targEl): boolean {
  if (
    ga instanceof HTMLSelectElement ||
    ga instanceof HTMLInputElement ||
    (ga instanceof HTMLTextAreaElement && ga.closest(".genSpan"))
  ) {
    if ((ga.closest(".genSpan") as HTMLElement)?.hidden === false) {
      setTimeout(() => {
        fadeElement(ga.closest(".genSpan"), "0");
        setTimeout(() => ga.closest(".genSpan")?.setAttribute("hidden", ""), 500);
      }, 250);
    }
    return false;
  }
  return true;
}
export function showStgTransHorm(gt: targEl): boolean {
  if (
    gt instanceof HTMLSelectElement ||
    gt instanceof HTMLInputElement ||
    (gt instanceof HTMLTextAreaElement && gt.closest(".genSpan"))
  ) {
    if ((gt.closest(".genSpan") as HTMLElement)?.hidden === true) {
      fadeElement(gt.closest(".genSpan"), "0");
      setTimeout(() => {
        gt.closest(".genSpan")?.removeAttribute("hidden");
        setTimeout(() => {
          fadeElement(gt.closest(".genSpan"), "1");
        }, 250);
      }, 250);
    }
    return true;
  }
  return false;
}
export function hideStgTransHorm(gt: targEl): boolean {
  if (
    gt instanceof HTMLSelectElement ||
    gt instanceof HTMLInputElement ||
    (gt instanceof HTMLTextAreaElement && gt.closest(".genSpan"))
  ) {
    if ((gt.closest(".genSpan") as HTMLElement)?.hidden === false) {
      setTimeout(() => {
        fadeElement(gt.closest(".genSpan"), "0");
        setTimeout(() => {
          gt.closest(".genSpan")?.setAttribute("hidden", "");
        }, 500);
      }, 250);
    }
    return false;
  }
  return true;
}
export function filterIdsByGender(
  arrayIds: string[] = ["peit", "abd", "coxa"],
  bodyType: string = "masculino",
): string[] {
  if (Array.isArray(arrayIds) && arrayIds?.every(prop => typeof prop === "string") && typeof bodyType === "string") {
    switch (bodyType) {
      case "masculino":
        return arrayIds.filter(id => /peit|abd|coxa/g.test(id));
      case "feminino":
        return arrayIds.filter(id => /tricp|suprail|coxa/g.test(id));
      case "neutro":
        return arrayIds.filter(id => /peit|abd|tricp|suprail|coxa/g.test(id));
      default:
        return ["peit", "abd", "coxa"];
    }
  }
  return ["peit", "abd", "coxa"];
}
export function checkPasswordPattern(pwInp: HTMLInputElement | null): void {
  if (pwInp instanceof HTMLInputElement) {
    !/^(?=.*[0-9])/g.test(pwInp.value) && pwInp.setCustomValidity("Sua senha deve ter pelo menos um número");
    !/(?=.*[A-Z])/g.test(pwInp.value) && pwInp.setCustomValidity("Sua senha deve ter pelo menos uma letra maiúscula");
    !/(?=.*[!@#$%^&*])/g.test(pwInp.value) && pwInp.setCustomValidity("Sua senha deve ter pelo menos um símbolo");
    !/[*]{8,}/g.test(pwInp.value) && pwInp.setCustomValidity("Sua senha deve ter pelo menos oito caracteres");
  }
}
export function correctCursorNextWords(
  isCursorAutoMoved: boolean = false,
  isUndoUppercase: boolean = false,
  match: string | null = "",
  textElement: Element,
): [string, boolean] | void {
  let text = (textElement as entryEl)?.value || textElement.textContent || "";
  let isFixAfterDCursorExec = false;

  if (isFixAfterDCursorExec) return;
  const selectionPosition = window.getSelection()?.getRangeAt(0).startOffset;
  text = wrongStartCorrection(text, match) ?? "";
  textElement.addEventListener("keyup", fixmove => {
    const keyboardEvent = fixmove as KeyboardEvent;
    if (selectionPosition === 0 || selectionPosition === text?.length || 0) {
      if (
        keyboardEvent.key === " " ||
        keyboardEvent.key === "Backspace" ||
        (keyboardEvent.key >= "ArrowLeft" && keyboardEvent.key <= "ArrowDown") ||
        (keyboardEvent.key >= "a" && keyboardEvent.key <= "z") ||
        (keyboardEvent.key >= "A" && keyboardEvent.key <= "Z") ||
        isUndoUppercase
      ) {
        if (!isFixAfterDCursorExec) isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, textElement);

        keyboardEvent.preventDefault();
        isFixAfterDCursorExec = true;
      }
    }
  });
  return [text, isCursorAutoMoved];
}
export function wrongStartCorrection(text: string | null = "", wrongStartMatch: string | null = ""): string | null {
  let fixedText = text;
  if (wrongStartMatch && text) {
    const wrongStartLength = wrongStartMatch.toString().replaceAll(",", "").length;
    fixedText = text.slice(wrongStartLength - 1) + text.slice(0, wrongStartLength - 1);
  }
  return fixedText;
}
export function moveCursorToTheEnd(isCursorAutoMoved: boolean = false, textElement: Element): boolean {
  if (window.getSelection && !isCursorAutoMoved) {
    const range = document.createRange();
    range.selectNodeContents(textElement);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    isCursorAutoMoved = true;
  } else isCursorAutoMoved = false;

  return isCursorAutoMoved;
}
export function fixCursorPosition(
  textElement: Element,
  range: Range,
  selection: Selection | null,
  shouldSetEnd: boolean = false,
): void {
  range.setStart(textElement, 0);
  if (shouldSetEnd === true) range.setEnd(textElement, 1);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
}
export function fixFirstLetter(
  fstLet: string = "",
  regex: RegExp,
  textElement: Element,
  range: Range,
  selection: Selection | null,
  shouldSetEnd: boolean = false,
): string {
  let contText = (textElement as entryEl).value || textElement.textContent || "";
  const firstLetterMatch = fstLet?.match(regex);
  if (firstLetterMatch) {
    contText = fstLet?.toUpperCase() + contText.substring(1).toLowerCase();
    if (range.endOffset >= 1) fixCursorPosition(textElement, range, selection, shouldSetEnd);
  }
  return contText;
}
export function fixWrongStarts(text: targStr = "", match: targStr = "", length: number = 0): string {
  let fixedStr = text ?? "";
  if (text && match) {
    const arrText = Array.from(text);
    arrText.splice(text.indexOf(match), length, "");
    fixedStr = arrText.toString().replaceAll(",", "");
  }
  return fixedStr;
}
export function fixNextWordsIniNotD(remadeText: string = "", letMatch: string = ""): string {
  if (remadeText) {
    const gLetMatchI = remadeText.lastIndexOf(letMatch) + 1;
    const capChar = remadeText.charAt(gLetMatchI)?.toUpperCase();
    const arrText = Array.from(remadeText);
    arrText[gLetMatchI] = capChar;
    remadeText = arrText.toString().replaceAll(",", "");
    if (remadeText.match(/^\s[\w]+/g)) remadeText = remadeText.slice(1, remadeText.length) + " ";
  } else remadeText = "";

  return remadeText;
}
export function fixNextWordsAfterD(remadeText: string = "", letMatch: string = ""): string {
  const globalLetterMatchIndexD = remadeText ? remadeText.lastIndexOf(letMatch) + 1 : undefined;
  if (globalLetterMatchIndexD) {
    const actualCharD = remadeText?.charAt(globalLetterMatchIndexD);
    const capitalizedCharD = actualCharD?.toUpperCase();
    if (remadeText && capitalizedCharD) {
      const citeTextArrayD = Array.from(remadeText);
      citeTextArrayD[globalLetterMatchIndexD] = capitalizedCharD;
      remadeText = citeTextArrayD.toString().replaceAll(",", "");
    }
  }
  return remadeText;
}
export function fixUnproperUppercases(text: string = "", match: string = "", context: string | number = 0): string {
  const spaceMatches = text.match(/\s/g);
  const upperCasesRepetitionsIndex = text.indexOf(match);
  const textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
  let addAcumulator = 0,
    loweredRepetitions = "";

  loweredRepetitions = match.toLowerCase().slice(1);
  if (spaceMatches) {
    if (context === "NoD" || context === "YesDCont" || context === 0 || context === 2 || !context) {
      if (context === "YesDCont" || context === 2) {
        const lowercasesMatches = text.match(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g);
        if (lowercasesMatches) addAcumulator += lowercasesMatches.length;
      }
      addAcumulator += spaceMatches.length;
    } else if (context === "YesDVal" || context === 1) addAcumulator = 1;
  }
  const textAfterRepetitions = text.slice(
    upperCasesRepetitionsIndex + 1 + loweredRepetitions.length - addAcumulator,
    text.length + 1,
  );
  const textArray = Array.from(text);
  textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
  if (context === "NoD" || context === 0 || !context)
    text = textBeforeRepetitions + match.slice(0, 1) + loweredRepetitions + textAfterRepetitions;
  else if (context === "YesDVal") {
    const upperlowercombD = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/);
    if (upperlowercombD?.length === 4) loweredRepetitions += upperlowercombD.toString().replace(/S/, "s");
    text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
  } else if (context === "YesDCont") {
    text = text.match(/D[aeiouáàâäãéèêëíìîïóòôöõúùûü][s]\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{3,}/)
      ? textBeforeRepetitions + loweredRepetitions + "S" + textAfterRepetitions
      : textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
  }
  return text;
}
export function fixForcedUpperCase(
  textElement: Element,
  wordMatch: string[] = [""],
  wMatchIteration: RegExpMatchArray | string = "",
): string {
  let text = (textElement as textEl).value || textElement.textContent || "";
  const strDlowercase = wMatchIteration.toString();
  const DUppercased = strDlowercase.charAt(1).toUpperCase();
  if (DUppercased) {
    const strDAfterMinusInd =
      (text?.length ?? 0) - (strDlowercase.substring(0, 1) + DUppercased + strDlowercase.substring(2)).length;
    const startSlicedCite = text?.slice(0, strDAfterMinusInd);
    if (wordMatch.length >= 1 && startSlicedCite) text = startSlicedCite + text?.slice(strDAfterMinusInd);
  }
  return text;
}
export function autoCapitalizeInputs(textEl: targEl, isAutocorrectOn: boolean = true): string {
  if ((textEl instanceof HTMLInputElement && textEl.type === "text") || textEl instanceof HTMLTextAreaElement) {
    let text = textEl?.value ?? null;
    if (isAutocorrectOn && text) {
      //inicialização de expressões regex com seus objetos e matches associados
      const newWordMatches = text.match(
        /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g,
      );
      const letterMatchesIniNotD = text.match(/\s[^d]/g);
      const letterMatchesIniD = text.match(/\sd/g);
      let letterNotMatchesAfterD =
        text.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g) ?? [];
      const letterMatchesAfterDOp1 = text.match(/\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g);
      const letterMatchesAfterDOp2 = text.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g);
      const letterMatchesAfterDOp3 = text.match(
        /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g,
      );
      const lowercasesRegexObj = new RegExp(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g);
      const uppercasesRegexObj = new RegExp(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/);
      const multipleUppercasesMatches = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g);
      const multipleUppercasesMatches2 = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S]\s/g);
      const wrongUppercasesMatchesOp1 = text.match(
        /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g,
      );
      const wrongUppercasesMatchesOp2 = text.match(
        /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g,
      );
      const wrongUppercasesMatchesOp3 = text.match(
        /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g,
      );
      const wrongUppercasesMatchesOp4 = text.match(
        /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g,
      );
      const wrongUppercasesMatchesOp5 = text.match(
        /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g,
      );
      const wrongUppercasesMatchesOp6 = text.match(
        /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g,
      );
      const wrongUppercasesMatchesOp7 = text.match(/D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g);
      const wrongUppercasesMatchesOp8 = text.match(/D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g);
      const wrongUppercasesMatchesOp9 = text.match(/D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g);
      const wrongStartMatch =
        text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/)?.toString() ?? null;
      const wrongCharsRegexOp1 =
        /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
      const wrongCharsMatchesOp1 = text.match(wrongCharsRegexOp1);
      const wrongCharsRegexOp2 = /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
      const wrongCharsMatchesOp2 = text.match(wrongCharsRegexOp2);
      const wrongCharsRegexOp3 = /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
      const wrongCharsMatchesOp3 = text.match(wrongCharsRegexOp3);

      //inicialização de outras variáveis
      const selection = window.getSelection();
      const range = document.createRange();
      let remadeText = text;
      let isUndoUppercase = false;
      let isCursorAutoMoved = false;

      if (text.length === 1 && !newWordMatches)
        textEl.value = fixFirstLetter(text[0], /\b\w/, textEl, range, selection, false);
      else if (text.length > 1 && !textEl.classList.contains("autocorrectFirst")) {
        if (
          textEl.classList.contains("inpAst") ||
          textEl.classList.contains("inpIdentif") ||
          textEl.classList.contains("autocorrectAll")
        ) {
          //IIFE para encapsular correção de inícios incorretos de entrada
          ((): void => {
            if (wrongCharsMatchesOp1 || wrongCharsMatchesOp2 || wrongCharsMatchesOp3) {
              const wrongCharsMatches = [
                ...(wrongCharsMatchesOp1 || []),
                ...(wrongCharsMatchesOp2 || []),
                ...(wrongCharsMatchesOp3 || []),
              ];

              for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
                wrongCharsMatches.forEach(wrongCharMatch => {
                  textEl.value = fixWrongStarts(text, wrongCharMatch, wrongCharsMatches[iW].length);
                  [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                    isCursorAutoMoved,
                    isUndoUppercase,
                    wrongStartMatch,
                    textEl,
                  );
                });
              }
            }
          })();

          if (wrongStartMatch) textEl.value = wrongStartCorrection(textEl.value, wrongStartMatch) ?? "";
          if (newWordMatches) {
            newWordMatches.forEach((): void => {
              //IIFE para capitalizar palavras após a primeira
              ((): void => {
                if (letterMatchesIniNotD && !letterMatchesIniD) {
                  letterMatchesIniNotD.forEach(letterMatch => {
                    remadeText = fixNextWordsIniNotD(remadeText, letterMatch);
                  });
                  textEl.value = remadeText;
                  [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                    isCursorAutoMoved,
                    isUndoUppercase,
                    wrongStartMatch,
                    textEl,
                  );
                  textEl.value = wrongStartCorrection(textEl.value, wrongStartMatch) ?? "";
                } else if (
                  (letterMatchesIniNotD && letterMatchesIniD) ||
                  (!letterMatchesIniNotD && letterMatchesIniD)
                ) {
                  //IIFE para correção focada em conjunção com D
                  ((): void => {
                    let letterMatchesAfterD: string[] = [];
                    if (
                      !letterNotMatchesAfterD &&
                      (letterMatchesAfterDOp1 || letterMatchesAfterDOp2 || letterMatchesAfterDOp3)
                    ) {
                      letterMatchesAfterD = [
                        ...(letterMatchesAfterDOp1 || []),
                        ...(letterMatchesAfterDOp2 || []),
                        ...(letterMatchesAfterDOp3 || []),
                      ];
                    } else if (
                      letterNotMatchesAfterD &&
                      letterMatchesIniNotD &&
                      !(letterMatchesAfterDOp1 || letterMatchesAfterDOp2 || letterMatchesAfterDOp3)
                    ) {
                      letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                    } else if (
                      letterNotMatchesAfterD &&
                      (letterMatchesAfterDOp1 ||
                        letterMatchesAfterDOp2 ||
                        letterMatchesAfterDOp3 ||
                        letterMatchesIniNotD)
                    ) {
                      letterMatchesAfterD = [
                        ...(letterMatchesAfterDOp1 || []),
                        ...(letterMatchesAfterDOp2 || []),
                        ...(letterMatchesAfterDOp3 || []),
                      ];
                    }
                    //IIFE para capitalização focada em iniciais D
                    ((): void => {
                      letterMatchesAfterD?.forEach(letterMatchD => {
                        remadeText = fixNextWordsAfterD(remadeText, letterMatchD);
                      });
                      textEl.value = remadeText;
                      for (let iD = 0; iD < Array.from(letterMatchesAfterD ?? []).length; iD++) {
                        const filteredArrayD = letterMatchesAfterD?.filter(iD => lowercasesRegexObj.test(iD));
                        if (filteredArrayD) {
                          const mappedArrayD = filteredArrayD.map(iD => iD.toUpperCase());
                          let remadeStringD = "";
                          if (iD === 0) {
                            filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                            remadeStringD = filteredArrayD.toString().replaceAll(",", "");
                            [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                              isCursorAutoMoved,
                              isUndoUppercase,
                              wrongStartMatch,
                              textEl,
                            );
                          } else if (iD === 1) {
                            filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                            remadeStringD = filteredArrayD.toString().replaceAll(",", "").slice(2);
                            [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                              isCursorAutoMoved,
                              isUndoUppercase,
                              wrongStartMatch,
                              textEl,
                            );
                            if (textEl.value)
                              textEl.value = textEl.value.replace(new RegExp(filteredArrayD[iD], "g"), remadeStringD);
                          } else if (iD > 2) {
                            filteredArrayD.pop();
                            filteredArrayD.push(mappedArrayD[iD]);
                            [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                              isCursorAutoMoved,
                              isUndoUppercase,
                              wrongStartMatch,
                              textEl,
                            );
                          }
                        }
                      }
                    })();
                  })();
                }
              })();
            });
          }
          //statement para correção de múltiplos upper cases
          if (multipleUppercasesMatches || multipleUppercasesMatches2) {
            //IIFE para encapsular correção de múltiplos upper cases
            ((): void => {
              const unproperUppercases = [
                ...(multipleUppercasesMatches || []),
                ...(wrongUppercasesMatchesOp1 || []),
                ...(wrongUppercasesMatchesOp2 || []),
                ...(wrongUppercasesMatchesOp3 || []),
                ...(wrongUppercasesMatchesOp4 || []),
                ...(wrongUppercasesMatchesOp5 || []),
                ...(wrongUppercasesMatchesOp6 || []),
              ];
              const unproperDUppercases = [
                ...(wrongUppercasesMatchesOp7 || []),
                ...(wrongUppercasesMatchesOp8 || []),
                ...(wrongUppercasesMatchesOp9 || []),
              ];
              unproperUppercases.forEach(multipleUppercasesMatch => {
                if (text && multipleUppercasesMatch) {
                  text = fixUnproperUppercases(text, multipleUppercasesMatch, "NoD");
                  //correção de bugs com combinações posteriores de upper/lower
                  // const upperlowercomb = text.match(
                  //   /[a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
                  // );
                  // const upperlowercombD = text.match(
                  //   /D[a-záàâäãéèêëíìîïóòôöõúùûü][\s]/
                  // );
                  // if (upperlowercomb || upperlowercombD) {
                  //   repeatedLetter = repeatedLetter.toLowerCase();
                  // }

                  //fix para delay em processamento do S em conjunções
                  const upperlowercombDS = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S][\s]/);
                  if (upperlowercombDS) upperlowercombDS.splice(3, 1, "s");

                  textEl.value = text;
                  isUndoUppercase = true;
                  [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                    isCursorAutoMoved,
                    isUndoUppercase,
                    wrongStartMatch,
                    textEl,
                  );
                  if (range.endOffset >= 1) fixCursorPosition(textEl, range, selection, true);
                }
              });
              unproperDUppercases.forEach(multipleUppercasesMatch => {
                if (text && multipleUppercasesMatch) {
                  textEl.value = fixUnproperUppercases(text, multipleUppercasesMatch, "YesDVal");
                  isUndoUppercase = true;
                  [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                    isCursorAutoMoved,
                    isUndoUppercase,
                    wrongStartMatch,
                    textEl,
                  );
                  if (range.endOffset >= 1) fixCursorPosition(textEl, range, selection, true);
                }
              });
            })();
          }
          //statement para controle de combinação após entrada com inicial D
          if (
            letterMatchesIniD &&
            letterNotMatchesAfterD &&
            !(letterMatchesAfterDOp1 || letterMatchesAfterDOp2 || letterMatchesAfterDOp3)
          )
            letterNotMatchesAfterD = [];
          //statement para fluxo validando match de iniciais
          if (letterMatchesIniD || letterMatchesIniNotD) {
            //IIFE para forçar upper case
            ((): void => {
              const DMatch = [
                ...(letterMatchesAfterDOp1 || []),
                ...(letterMatchesAfterDOp2 || []),
                ...(letterMatchesAfterDOp3 || []),
              ];

              const wordMatch = [...(DMatch || []), ...(letterMatchesIniNotD || [])];

              for (let iM = 0; iM < wordMatch.length; iM++) {
                if (uppercasesRegexObj.test(wordMatch[iM])) continue;
                textEl.value = fixForcedUpperCase(textEl, wordMatch, wordMatch[iM]);
                if (DMatch.flat(1).length > 0) {
                  [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
                    isCursorAutoMoved,
                    isUndoUppercase,
                    wrongStartMatch,
                    textEl,
                  );
                }
              }
            })();
          }
          //IIFE para fazer correções adicionais no final da edição automática
          ((): void => {
            if (wrongCharsMatchesOp1) textEl.value = textEl.value?.replaceAll(wrongCharsRegexOp1, "") ?? null;
            if (wrongCharsMatchesOp2) textEl.value = textEl.value?.replaceAll(wrongCharsRegexOp2, "") ?? null;
            if (wrongCharsMatchesOp3) textEl.value = textEl.value?.replaceAll(wrongCharsRegexOp3, "") ?? null;
            if (text.match(/\s[\s]+/g)) textEl.value = textEl.value?.replaceAll(/\s[\s]+/g, " ") ?? null;
            if (text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]/))
              textEl.value = text.slice(0, 1).toUpperCase() + text.slice(1);
          })();
        }
      }
    }
    return textEl.value;
  }
  return "";
}
export function capitalizeFirstLetter(text: string): string {
  try {
    if (!(typeof text === "string")) return text;
    text = `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
    return text;
  } catch (e) {
    return text;
  }
}
export function textTransformPascal(text: string): string {
  try {
    if (!(typeof text === "string")) return text;
    text = `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`;
    return text;
  } catch (e) {
    return text.toString();
  }
}
export function dateISOtoBRL(isoDate: string): string {
  try {
    if (typeof isoDate !== "string") throw new Error(`Invalid typeof passed to dateISOtoBRL`);
    if (/\//g.test(isoDate) || /\\/g.test(isoDate) || /present/gi.test(isoDate)) return isoDate;
    isoDate = isoDate.replaceAll(/[^0-9\-]/g, "");
    if (isoDate.length < 5 || !/\-/g.test(isoDate)) throw new Error(`Invalid date passed to dateISOtoBRL`);
    let d, m, y;
    const dateFragments = isoDate.split("-");
    if (dateFragments.length === 1) {
      [y] = dateFragments;
      (m = "00"), (d = "00");
    } else if (dateFragments.length === 2) {
      [y, m] = dateFragments;
      d = "00";
    } else [y, m, d] = dateFragments;
    return `${d}/${m}/${y}`;
  } catch (e) {
    return "00/00/0000";
  }
}
export function camelToKebab(str: string): string {
  const iniStr = str;
  try {
    return str
      .split(/(?=[A-Z])/g)
      .join("-")
      .toLowerCase();
  } catch (e) {
    return iniStr;
  }
}
export function camelToRegular(str: string, capitalize = true): string {
  const iniStr = str;
  if (typeof capitalize !== "boolean") capitalize = true;
  try {
    return capitalize
      ? `${str.charAt(0).toUpperCase()}${str.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}`
      : `${str.charAt(0)}${str.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}`;
  } catch (e) {
    return iniStr;
  }
}
export function kebabToCamel(str: string): string {
  const iniStr = str;
  try {
    return str
      .split("-")
      .map((fragment, i) => (i === 0 ? fragment : textTransformPascal(fragment)))
      .join("");
  } catch (e) {
    return iniStr;
  }
}
export function regularToSnake(str: string): string {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}
export function modelScripts(): void {
  try {
    document.querySelectorAll("meta").forEach((meta) => {
      try {
        if (!(meta instanceof HTMLMetaElement)) return;
        if (meta.id === "") {
          if (meta.name && meta.name !== "") {
            meta.id = meta.name.replace(/[\/\-\?\=\+\s\.\<\>\&\^\:~,]/g, "__");
            return;
          }
          if ((meta as any).property && (meta as any).property !== "") {
            meta.id = (meta as any).property.replace(/[\/\-\?\=\+\s\.\<\>\&\^\:~,]/g, "__");
            return;
          }
          if (meta.httpEquiv && meta.httpEquiv !== "") {
            meta.id = meta.httpEquiv.replace(/[\/\-\?\=\+\s\.\<\>\&\^\:~,]/g, "__");
            return;
          }
          if (meta.content && meta.content !== "") {
            meta.id = meta.content.replace(/[\/\-\?\=\+\s\.\<\>\&\^\:~,]/g, "__");
          }
        }
      } catch (e) {
        return;
      }
    });
    Array.from(document.scripts).forEach(script => {
      try {
        if (!(script instanceof HTMLScriptElement)) return;
        if (script.type === "" && script.src !== "") script.type = "text/javascript";
        if (script.id === "" && script.src !== "") {
          const url = new URL(script.src);
          script.id = url.pathname.replace(/[\/\-\?\=\+\s\.\<\>\&\^~,]/g, "__");
        }
        if (script.crossOrigin === "") script.crossOrigin = "anonymous";
      } catch (e) {
        return;
      }
    });
    document.querySelectorAll("style").forEach((style, i) => {
      try {
        if (!(style instanceof HTMLStyleElement)) return;
        if (style.type !== "") style.type = "";
        if (style.media === "all") style.media = "";
        if (style.id === "") {
          style.id = document.getElementById("__next")
            ? `next_generated_style_${i}`
            : `automatically_generated_style_${i}`;
          style.dataset.group = "automatic_name";
        }
      } catch (e) {
        return;
      }
    });
    document.querySelectorAll("link").forEach(link => {
      try {
        if (!(link instanceof HTMLLinkElement)) return;
        if (link.id === "" && link.href !== "") {
          const url = new URL(link.href);
          link.id = url.pathname.replace(/[\/\-\?\=\+\s\.\<\>\&\^~,]/g, "__");
        }
        if (link.rel === "") link.rel = "alternate";
        if (link.crossOrigin === "") link.crossOrigin = "anonymous";
      } catch (e) {
        return;
      }
    });
    document.querySelectorAll("a").forEach((a) => {
      try {
        if (!(a instanceof HTMLAnchorElement)) return;
        if (a.href !== "" && !(new RegExp(location.hostname, "g").test(a.href) || /https/.test(a.href))) {
          if (!/noopener/g.test(a.rel)) a.rel += " noopener";
          if (!/noreferrer/g.test(a.rel)) a.rel += " noreferrer";
        }
      } catch (e) {
        return;
      }
    });
  } catch (e) {
    return;
  }
}
export function assignFormAttrs(fr: nlFm): void {
  if (!(fr instanceof HTMLFormElement)) throw new Error(`Failed to validate Form Reference`);
  (() => {
    try {
      const metaCs = document.querySelector('meta[charset*="utf-"]') ?? document.querySelector('meta[charset*="UTF-"]');
      if (!(metaCs instanceof HTMLMetaElement)) throw new Error(`Failed to fetch HTMLMetaElement for Charset`);
      const cs = /utf\-16/gi.test(metaCs.outerHTML) ? "utf-16" : "utf-8";
      fr.acceptCharset = cs;
    } catch (e) {
      return;
    }
  })();
  try {
    let len = 0;
    [
      ...fr.querySelectorAll("button"),
      ...fr.querySelectorAll("fieldset"),
      ...fr.querySelectorAll("input"),
      ...fr.querySelectorAll("object"),
      ...fr.querySelectorAll("output"),
      ...fr.querySelectorAll("select"),
      ...fr.querySelectorAll("textarea"),
    ].forEach(el => {
      (() => {
        try {
          if (!(el instanceof HTMLElement) || el.id === "") return;
          len += 1;
          if (!el || !fr) return;
          el.dataset.form = `#${fr.id}`;
          if (el instanceof HTMLInputElement) {
            if (el.formAction === "") el.formAction = fr.action;
            if (el.formMethod === "") el.formMethod = fr.method;
            if (el.formEnctype === "") el.formEnctype = fr.enctype;
            if (!el.formNoValidate) el.formNoValidate = fr.noValidate;
          } else if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
            el.dataset.formAction = fr.action;
            el.dataset.formMethod = fr.method;
            el.dataset.formEnctype = fr.enctype;
            el.dataset.formNoValidate = fr.noValidate.toString();
          }
          if (fr.id !== "") el.dataset.form = fr.id;
          if (
            (el instanceof HTMLFieldSetElement || el instanceof HTMLObjectElement || el instanceof HTMLButtonElement) &&
            el.id !== "" &&
            el.name === ""
          )
            el.name = el.id.replace(/([A-Z])/g, m => (m === el.id.charAt(0) ? m.toLowerCase() : `_${m.toLowerCase()}`));
        } catch (e) {
          return;
        }
      })();
      (() => {
        try {
          if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement))
            return;
          try {
            if (el.labels) {
              el.labels.forEach((lab, i) => {
                try {
                  if (lab instanceof HTMLLabelElement && lab.htmlFor !== el.id) lab.htmlFor = el.id;
                  const idf = el.id || el.name;
                  if (lab.id === "" && idf !== "" && el.labels)
                    lab.id = el.labels.length === 1 ? `${idf}_lab` : `${idf}_lab_${i + 1}`;
                  if (!el) throw new Error(`Lost reference to the input`);
                  if (i === 0) el.dataset.labels = `${lab.id}`;
                  else el.dataset.labels += `, ${lab.id}`;
                } catch (e) {
                  return;
                }
              });
              if (!(el instanceof HTMLSelectElement) && el.placeholder === "") {
                const clearArticles = (txt: string): string => {
                    if (/cidade/gi.test(txt)) txt = txt.replace(/o\scidade/g, "a cidade");
                    if (/nacionalidade/gi.test(txt)) txt = txt.replace(/o\snacionalidade/g, "a nacionalidade");
                    if (/naturalidade/gi.test(txt)) txt = txt.replace(/o\snaturalidade/g, "a naturalidade");
                    if (/[oa]\s\w*ções/gi.test(txt)) txt = txt.replace(/([oa])\s(\w*)ções/g, "$1s $2ções");
                    if (/os\sescovações/g.test(txt)) txt = txt.replace(/os\sescovações/g, "as escovações");
                    if (/\so\singere|\so\sfaz|\so\squant[ao]s?/g.test(txt))
                      txt = txt.replace(/\so\singere|\so\sfaz|\so\squant[ao]s?/g, "");
                    if (/o qual é/g.test(txt)) txt = txt.replace(/o qual é/g, "qual é");
                    if (/o evacua quantas/g.test(txt)) txt = txt.replace(/o evacua quantas/g, "quantas evacuações por");
                    if (/evacuações por vezes por dia/g.test(txt))
                      txt = txt.replace(/evacuações por vezes por dia/g, "evacuações por dia");
                    if (/micções por dia(?<!quantas)/g.test(txt))
                      txt = txt.replace(/micções por dia(?<!quantas)/g, "quantas micções por dia");
                    if (txt.endsWith(",")) txt = txt.slice(0, -1);
                    return txt.trim();
                  },
                  modelLabelHeader = (txt: string): string => {
                    if (txt.endsWith(":")) txt = txt.slice(0, -1);
                    if (/, se/g.test(txt.slice(1))) txt = txt.slice(0, txt.indexOf(", se"));
                    txt = txt.toLowerCase();
                    const acrs = /cep|cpf|ddd|dre/gi;
                    if (acrs.test(txt)) txt = txt.replace(acrs, m => m.toUpperCase());
                    if (/\:.*/g.test(txt)) txt = txt.slice(0, txt.lastIndexOf(":"));
                    if (/\?.*/g.test(txt)) txt = txt.slice(0, txt.lastIndexOf("?"));
                    if (txt.includes("se estrangeiro, ")) txt = txt.replace(/se estrangeiro,\s/g, "");
                    if (txt.includes("informe o ")) txt = txt.replace(/informe\so\s/g, "");
                    if (/cidade/gi.test(txt)) txt = txt.replace(/o\scidade/g, "a cidade");
                    if (/nacionalidade/gi.test(txt)) txt = txt.replace(/o\snacionalidade/g, "a nacionalidade");
                    if (/naturalidade/gi.test(txt)) txt = txt.replace(/o\snaturalidade/g, "a naturalidade");
                    if (/[oa]\s\w*ções/gi.test(txt)) txt = txt.replace(/([oa])\s(\w*)ções/g, "$1s $2ções");
                    if (/os\sescovações/g.test(txt)) txt = txt.replace(/os\sescovações/g, "as escovações");
                    if (/no mínimo|no máximo/g.test(txt)) txt = txt.replace(/no mínimo|no máximo/g, "");
                    if (txt.endsWith(",")) txt = txt.slice(0, -1);
                    return txt.trim();
                  };
                if (el.labels[0] && el.labels[0].htmlFor === el.id) {
                  el.placeholder = `Preencha aqui o ${modelLabelHeader(el.labels[0].innerText)}`;
                  el.placeholder = clearArticles(el.placeholder);
                  if (
                    !(
                      el.labels[0].innerText.toLowerCase().includes("evacua") &&
                      el.labels[0].innerText.includes("por dia")
                    ) &&
                    !el.labels[0].innerText
                      .toLowerCase()
                      .includes(el.placeholder.toLowerCase().replace(/preencha aqui\s?[oa]?s?\s?/g, ""))
                  )
                    el.placeholder = "";
                  if (el.id === "streetId") el.placeholder = "";
                }
              }
            }
          } catch (e) {
            return;
          }
        } catch (e) {
          return;
        }
      })();
    });
    fr.dataset.len = len.toString();
  } catch (e) {
    return;
  }
}
export function limitedError(msg: string, idf: string) {
  try {
    if (typeof msg !== "string" || typeof idf !== "string") return;
    if (!errorLabels[idf]) errorLabels[idf] = 0;
    errorLabels[idf] = +1;
    if (errorLabels[idf] <= ERROR_LIMIT) console.error(msg);
    if (errorLabels[idf] === ERROR_LIMIT + 1)
      setTimeout(() => {
        if (errorLabels?.[idf]) errorLabels[idf] = 0;
      }, 5000);
  } catch (e) {
    return;
  }
}
export function applyFieldConstraints(el: nlEl): void {
  try {
    if (
      !(
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.contentEditable)
      )
    )
      return;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.maxLength !== -1 && el.value.length > el.maxLength) el.value = el.value.slice(0, el.maxLength);
      if (el instanceof HTMLInputElement) {
        const parsedValue = parseNotNaN(el.value);
        if (el.type === "number") {
          if (el.min !== "" && Number.isFinite(parseNotNaN(el.min)) && parsedValue < Math.abs(parseNotNaN(el.min))) {
            el.value = el.min;
            el.setSelectionRange(0, 0);
          }
          if (
            el.max !== "" &&
            el.max !== "0" &&
            el.max !== "-0" &&
            Number.isFinite(parseNotNaN(el.max)) &&
            parsedValue > Math.abs(parseNotNaN(el.max))
          )
            el.value = el.max;
        }
      }
    } else {
      if (
        el.dataset.max &&
        el.dataset.max !== "" &&
        el.dataset.max !== "0" &&
        el.dataset.max !== "-0" &&
        Number.isFinite(parseNotNaN(el.dataset.max)) &&
        el.innerText.length > Math.abs(parseNotNaN(el.dataset.max))
      )
        el.innerText = el.innerText.slice(0, Math.abs(parseNotNaN(el.dataset.max)));
      if (el.dataset.type && el.dataset.type === "number") {
        if (el.innerText && el.innerText.length > 0) el.innerText = el.innerText.replace(/[^0-9]/g, "");
        if (
          el.dataset.maxNum &&
          el.dataset.maxNum !== "" &&
          el.dataset.maxNum !== "0" &&
          el.dataset.maxNum !== "-0" &&
          Number.isFinite(parseNotNaN(el.dataset.maxNum)) &&
          el.innerText &&
          el.innerText.length > 0 &&
          parseNotNaN(el.innerText) > Math.abs(parseNotNaN(el.dataset.maxNum))
        )
          el.innerText = el.dataset.maxNum;
        if (
          el.dataset.minNum &&
          el.dataset.minNum !== "" &&
          el.dataset.minNum !== "0" &&
          el.dataset.minNum !== "-0" &&
          Number.isFinite(parseNotNaN(el.dataset.minNum)) &&
          el.innerText &&
          el.innerText.length > 0 &&
          parseNotNaN(el.innerText) < Math.abs(parseNotNaN(el.dataset.minNum))
        )
          el.innerText = el.dataset.minNum;
      }
    }
  } catch (e) {
    return;
  }
}
export function applyConstraintsTitle(fm: nlFm): void {
  try {
    if (!(fm instanceof HTMLElement)) throw new Error(`Failed to validate Form instance`);
    [
      ...Array.from(fm.querySelectorAll("input")).filter(
        i =>
          i.type !== "button" &&
          i.type !== "color" &&
          i.type !== "hidden" &&
          i.type !== "image" &&
          i.type !== "range" &&
          i.type !== "reset" &&
          i.type !== "submit",
      ),
      ...fm.querySelectorAll("textarea"),
    ].forEach((inp) => {
      try {
        if (!(inp instanceof HTMLInputElement || inp instanceof HTMLTextAreaElement)) return;
        let title = "";
        if (inp.required) title += "Obrigatório!\n";
        const checkTextConstraints = (): void => {
          const minLength =
            inp.dataset.reqlength && inp.dataset.reqlength !== ""
              ? inp.dataset.reqlength.replace(/[^0-9]/g, "")
              : inp.minLength;
          if (minLength !== "" && minLength !== "-1") title += `O campo deve conter no mínimo ${minLength} dígitos\n`;
          const maxLength =
            inp.dataset.maxlength && inp.dataset.maxlength !== ""
              ? inp.dataset.maxlength.replace(/[^0-9]/g, "")
              : inp.maxLength;
          if (maxLength !== "" && maxLength !== "-1") title += `O campo deve conter no máximo ${maxLength} dígitos\n`;
          if (inp.dataset.pattern && inp.dataset.pattern.includes("^[d,.]+$"))
            title += "O campo só pode conter números\n";
        };
        if (inp instanceof HTMLInputElement) {
          if (inp.type === "checkbox" || inp.type === "radio") {
            if (inp.type === "radio" && inp.dataset.required && inp.dataset.required === "true")
              title += "Obrigatório!\n";
            return;
          } else {
            checkTextConstraints();
            if (inp.type === "email") title += "O campo deve contar @ e ao menos um .";
            if (inp.type === "number") {
              const minNum =
                inp.dataset.minnum && inp.dataset.minnum !== "" ? inp.dataset.minnum.replace(/[^0-9]/g, "") : inp.min;
              if (minNum !== "" && minNum !== "-1") title += `O campo deve equivaler a no mínimo ${minNum}\n`;
              const maxNum =
                inp.dataset.maxnum && inp.dataset.maxnum !== "" ? inp.dataset.maxnum.replace(/[^0-9]/g, "") : inp.max;
              if (maxNum !== "" && maxNum !== "-1") title += `O campo deve equivaler a no máximo ${maxNum}\n`;
            }
          }
        } else checkTextConstraints();
        if (title !== "") inp.title += `\n${title}`;
      } catch (e) {
        return;
      }
    });
  } catch (e) {
    return;
  }
}
export function compProp(el: nlEl, prop: keyof CSSStyleDeclaration, measure: CSSMeasure = "px"): string {
  try {
    if (!(el instanceof Element)) return "";
    if (typeof prop !== "string") return "";
    if (typeof measure !== "string") return (getComputedStyle(el) as any)[prop]?.trim() ?? "";
    return (getComputedStyle(el) as any)[prop]?.replace(measure, "").trim() ?? "";
  } catch (e) {
    return el instanceof Element && typeof prop === "string" ? (getComputedStyle(el) as any)[prop]?.trim() ?? "" : "";
  }
}
export function compPropGet(el: nlEl, prop: keyof CSSStyleDeclaration, measure: CSSMeasure = "px"): string {
  try {
    if (!(el instanceof Element)) return "";
    if (typeof prop !== "string") return "";
    if (typeof measure !== "string") return getComputedStyle(el).getPropertyValue(prop).trim() ?? "";
    return getComputedStyle(el).getPropertyValue(prop).replace(measure, "").trim() ?? "";
  } catch (e) {
    return el instanceof Element && typeof prop === "string"
      ? getComputedStyle(el).getPropertyValue(prop).trim() ?? ""
      : "";
  }
}
export function checkContext(ctx: any, alias: string, caller: any): void {
  if (!ctx) console.warn(`Component ${caller.prototype.constructor.name} out of Context ${alias}`);
}
