import { Person } from "@/lib/global/declarations/classes";
import { changeTabDCutLayout, evaluatePGCDecay } from "./edFisNutModel";
import { checkReturnIndex, defaultResult, formatValue } from "./edFisNutController";
import { highlightChange, fadeElement } from "../../global/gStyleScript";
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import { parseNotNaN, numberLimit, autoCapitalizeInputs, checkAutoCorrect } from "../../global/gModel";
import { handleEventReq, syncAriaStates, updateSimpleProperty } from "../../global/handlers/gHandlers";
import {
  extLine,
  inputNotFound,
  elementNotFound,
  multipleElementsNotFound,
  elementNotPopulated,
  matchError,
  stringError,
  typeError,
  objectError,
} from "../../global/handlers/errorHandler";
import {
  elCollection,
  entryEl,
  primitiveType,
  targEl,
  sixTargEl,
  textEl,
  looseNum,
  nullishHtEl,
  nlEl,
  btnFillResult,
  IndCases,
  autofillResult,
  contextAutofill,
  contextAutofillNums,
} from "../../global/declarations/types";
import { person, tabProps } from "@/vars";
enum EnumTargInpTypes {
  "weight",
  "height",
  "IMC",
  "MLG",
  "TMB",
  "GET",
}
const enumTargInpTypes = EnumTargInpTypes;
export function switchAutoFill(autoFillBtn: targEl, isAutoFillActive: boolean = true): boolean {
  const locksTabInd = Array.from(document.getElementsByClassName("lockTabInd"));
  if (
    (autoFillBtn instanceof HTMLButtonElement ||
      (autoFillBtn instanceof HTMLInputElement && (autoFillBtn.type === "checkbox" || autoFillBtn.type === "radio"))) &&
    typeof isAutoFillActive === "boolean"
  ) {
    if (
      autoFillBtn instanceof HTMLInputElement &&
      (/Cálculo Automático/gi.test(autoFillBtn.innerText) ||
        (autoFillBtn.nextElementSibling instanceof HTMLElement &&
          /Cálculo Automático/gi.test(autoFillBtn.nextElementSibling.innerText)) ||
        (autoFillBtn.previousElementSibling instanceof HTMLElement &&
          /Cálculo Automático/gi.test(autoFillBtn.previousElementSibling.innerText)))
    )
      isAutoFillActive = !isAutoFillActive;
    else {
      if (autoFillBtn.innerText.match(/Desativar Cálculo Automático/gi)) {
        isAutoFillActive = false;
        autoFillBtn.textContent = "Ativar Cálculo Automático";
      } else if (autoFillBtn.innerText.match(/Ativar Cálculo Automático/gi))
        autoFillBtn.textContent = "Desativar Cálculo Automático";
      else
        stringError(
          ".innerText of autoFillBtn",
          autoFillBtn?.innerText ?? "UNDEFINED INNER TEXT",
          extLine(new Error()),
        );
    }

    locksTabInd?.length > 0 && locksTabInd.every(lockTabInd => lockTabInd instanceof HTMLElement)
      ? switchLockInputs(locksTabInd, isAutoFillActive)
      : elementNotPopulated(locksTabInd, "locksTabInd", extLine(new Error()));
  } else elementNotFound(autoFillBtn, "autoFillBtn", extLine(new Error()));

  return isAutoFillActive;
}
export function switchLockInputs(locksTabInd: targEl[], autoFillActivation: boolean = false): void {
  if (
    locksTabInd?.length > 0 &&
    locksTabInd.every(lock => lock instanceof HTMLElement) &&
    typeof autoFillActivation === "boolean"
  ) {
    //valida o input e realiza a modificação do svg
    locksTabInd.forEach(lock => {
      const siblingInput = lock?.parentElement?.parentElement?.querySelector(".tabInpProg");
      if (
        siblingInput instanceof HTMLInputElement ||
        siblingInput instanceof HTMLSelectElement ||
        (siblingInput instanceof HTMLTextAreaElement && lock instanceof HTMLSpanElement)
      ) {
        if (autoFillActivation) {
          fadeElement(lock, "0");
          setTimeout(() => {
            (lock as HTMLSpanElement).innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><defs><linearGradient id="gradiente-lock" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(233, 180, 7)"></stop><stop offset="100%" style="stop-color:rgb(243, 221, 93)"></stop></linearGradient></defs><path d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4" class="svg-lock-hook"></path><path d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2" class="svg-lock-body"></path><line x1="5" y1="7" x2="11" y2="7" stroke="black"></line></svg>`;
            fadeElement(lock, "1");
          }, 500);
        } else {
          fadeElement(lock, "0");
          setTimeout(() => {
            (lock as HTMLSpanElement).innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-unlock"
            viewBox="0 0 16 16"
          >
            <defs>
              <linearGradient
                id="gradiente-unlock"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style="stop-color:rgb(233, 180, 7)"
                />
                <stop
                  offset="100%"
                  style="stop-color:rgb(243, 221, 93)"
                />
              </linearGradient>
            </defs>
            <path
              d="M11 1 a2 2 0 0 1 2 2 v4 H9 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
              class="svg-unlock-hook"
              fill="url(#gradiente-unlock)"
            />
            <path
              d="M3 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
              class="svg-unlock-body"
              fill="url(#gradiente-unlock)"
            />
            <line
              x1="2.2"
              y1="7.05"
              x2="9.3"
              y2="7.05"
              stroke="black"
            />
            </svg>`;
            fadeElement(lock, "1");
          }, 500);
        }
      } else {
        inputNotFound(siblingInput, "siblingInput", extLine(new Error()));
      }
    });
  } else
    console.error(`Error validating locks for index table.
    Obtained .length: ${locksTabInd?.length ?? 0};
    Are all elements instances of HTMLSpanElement: ${
      locksTabInd.every(lock => lock instanceof HTMLSpanElement) ?? false
    }
    typeof autoFillActivation: ${typeof autoFillActivation}`);
}
export function getNumCol(evEl: targEl): number {
  let numCol = 2;
  (evEl && evEl.id?.match(/[0-9]+_[0-9]+$/g)) ||
  (evEl instanceof HTMLInputElement && evEl.name?.match(/[0-9]+_[0-9]+$/g)) ||
  (evEl instanceof HTMLLabelElement && evEl.htmlFor?.match(/[0-9]+_[0-9]+$/g))
    ? (numCol = parseNotNaN(evEl.id.slice(-1)))
    : matchError(".id do Elemento de Evento", evEl, evEl?.id ?? "null", extLine(new Error()));

  return numCol || 2;
}
export function validateEvResultNum(evEl: targEl, property: primitiveType = 0): number {
  if (
    ((evEl instanceof HTMLInputElement && (evEl.type === "number" || evEl.type === "text")) ||
      evEl instanceof HTMLSelectElement ||
      evEl instanceof HTMLTextAreaElement) &&
    (typeof property === "number" || typeof property === "string")
  ) {
    let returnedProperty: looseNum = 0;
    typeof property === "number"
      ? (returnedProperty = (updateSimpleProperty(evEl) as number) || 0)
      : (returnedProperty = (updateSimpleProperty(evEl) as string) || "0");
    if (typeof returnedProperty === "number") property = returnedProperty;
    if (typeof property === "number" && !Number.isFinite(property)) property = 0;
    else if (typeof returnedProperty === "string") {
      property = parseNotNaN(returnedProperty.replaceAll(/[^0-9.,+-]/g, ""));
      if (typeof property === "number" && !Number.isFinite(property)) property = 0;
    }
    return property as number;
  } else multipleElementsNotFound(extLine(new Error()), "arguments for validateEvResultNum", evEl, property);
  property = 0;
  return property || 0;
}
export function matchPersonPropertiesWH(
  person: Person,
  targinpweigth: targEl,
  targinpheigth: targEl,
): [number, number] {
  if (person && Object.keys(person)?.length > 0) {
    if ("weight" in person && typeof person.weight !== "number" && typeof person.weight !== "string") {
      console.warn(`Type obtained for person.weight invalid. Value defaulted.`);
      person.weight = 0;
    }

    if ("height" in person && typeof person.height !== "number" && typeof person.height !== "string") {
      console.warn(`Type obtained for person.height invalid. Value defaulted.`);
      person.height = 0;
    }

    targinpweigth instanceof HTMLInputElement
      ? (person.weight = validateEvResultNum(targinpweigth, person.weight))
      : inputNotFound(targinpweigth, "targinpweigth", extLine(new Error()));

    targinpheigth instanceof HTMLInputElement
      ? (person.height = validateEvResultNum(targinpheigth, person.height))
      : inputNotFound(targinpheigth, "targinpheigth", extLine(new Error()));
  } else objectError("arguments de matchPersonPropertiesWH", person, "person", 6, extLine(new Error()));

  return [person.weight || 0, person.height || 0];
}
export function matchPersonPropertiesDC(person: Person, targInpSumDCut: targEl): number {
  if (person && Object.keys(person)?.length > 0) {
    if ("sumDCut" in person && typeof person.sumDCut !== "number" && typeof person.sumDCut !== "string") {
      console.warn(`Type for person.sumDCut invalid. Value defaulted.`);
      person.sumDCut = 0;
    }

    targInpSumDCut instanceof HTMLInputElement
      ? (person.sumDCut = validateEvResultNum(targInpSumDCut, person.sumDCut))
      : inputNotFound(targInpSumDCut, "targInpSumDCut", extLine(new Error()));
  } else objectError("arguments for matchPersonPropertiesDC", person, "person", 6, extLine(new Error()));
  return person.sumDCut || 0;
}
export function updateIndexesContexts(
  person: Person,
  arrGord: [targEl, targEl, targEl],
  arrMetab: [targEl, targEl, targEl],
  factorAtvLvl: number = 1.4,
  factorAtleta: string = "Peso",
): [number, number, number, number] {
  let IMC = 0,
    MLG = 0,
    TMB = 0,
    GET = 0;
  if (factorAtleta === "peso") factorAtleta = "Peso";
  if (factorAtleta === "mlg") factorAtleta = "MLG";
  if (
    person &&
    arrGord?.length === 3 &&
    arrGord.every(elGord => elGord instanceof HTMLElement) &&
    arrMetab?.length === 3 &&
    arrMetab.every(elMetab => elMetab instanceof HTMLElement) &&
    typeof factorAtvLvl === "number" &&
    (factorAtleta === "Peso" || factorAtleta === "MLG")
  ) {
    const [targInpTMB, targInpGET, formTMBTypeElement] = arrMetab,
      IMCArray = person.calcIMC(person) || ["", 0];
    IMC = parseNotNaN(IMCArray[1].toFixed(4), 0, "float") || 0;
    updateIMCContext(arrGord, formTMBTypeElement, IMCArray, "NONE");
    MLG = parseNotNaN(person.calcPGC(person)[1].toFixed(4), 0, "float") || 0;
    const targInpMLG = arrGord[2];
    if (targInpMLG instanceof HTMLInputElement || targInpMLG instanceof HTMLSelectElement) formatValue(targInpMLG, MLG);
    TMB = updateTMBContext(person, [targInpTMB, formTMBTypeElement], [...IMCArray, MLG], factorAtleta) || 0;
    TMB >= 0 && factorAtvLvl >= 0
      ? (GET = updateGETContext(person, targInpGET, TMB, factorAtvLvl))
      : console.warn(
          `TMB and/or factorAtvLvl not updated or invalid.
          Obtained TMB: ${TMB ?? 0};
          Obtained factorAtvLvl: ${factorAtvLvl ?? 0}`,
        );
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for updateIndexesContexts()",
      `${person.toString()}`,
      `${arrGord.toString()}`,
      `${arrMetab.toString()}`,
      factorAtvLvl,
      factorAtleta,
    );
  return [IMC || 0, MLG || 0, TMB || 0, GET || 0];
}
export function updateIMCContext(
  arrGord: [targEl, targEl, targEl],
  formTMBTypeElement: targEl,
  IMCArray: [string, number] = ["abaixo", 0],
  ignoredIndex: string = "NONE",
): void {
  let [gordCorpVal = "abaixo", IMC = 0] = IMCArray;
  const [gordCorpLvl, targInpIMC] = arrGord;
  if (
    (gordCorpLvl instanceof HTMLSelectElement || gordCorpLvl instanceof HTMLInputElement) &&
    (targInpIMC instanceof HTMLInputElement || targInpIMC instanceof HTMLSelectElement) &&
    (formTMBTypeElement instanceof HTMLSelectElement || targInpIMC instanceof HTMLSelectElement) &&
    (ignoredIndex === "MLG" || ignoredIndex === "IMC" || ignoredIndex === "BOTH" || ignoredIndex === "NONE")
  ) {
    if (
      gordCorpVal === "abaixo" ||
      gordCorpVal === "eutrofico" ||
      gordCorpVal === "sobrepeso" ||
      gordCorpVal?.match(/obeso/)
    ) {
      gordCorpLvl.value = gordCorpVal || "";
      fluxFormIMC(gordCorpLvl, formTMBTypeElement, IMC);
    } else typeError("gordCorpVal", gordCorpVal, "string", extLine(new Error()));
    !(ignoredIndex === "IMC" || ignoredIndex === "BOTH")
      ? formatValue(targInpIMC, IMC)
      : typeError("IMCArray[1]", IMCArray[1], "number", extLine(new Error()));
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "instances of arguments for updateIMCContext()",
      gordCorpLvl,
      targInpIMC,
      formTMBTypeElement,
      ignoredIndex,
    );
}
export function fluxFormIMC(gordCorpLvl: targEl, formTMBTypeElement: targEl, IMC: number = 0): void {
  if (
    typeof IMC === "number" &&
    (formTMBTypeElement instanceof HTMLSelectElement || formTMBTypeElement instanceof HTMLInputElement) &&
    formTMBTypeElement.value !== "" &&
    (gordCorpLvl instanceof HTMLSelectElement || gordCorpLvl instanceof HTMLInputElement) &&
    gordCorpLvl.value !== ""
  ) {
    if ((document.getElementById("nafType") as entryEl)?.value === "muitoIntenso") {
      if (!(formTMBTypeElement.value === "tinsley")) highlightChange(formTMBTypeElement);
      formTMBTypeElement.value = "tinsley";
    } else {
      if (IMC >= 0 && IMC < 25.0) {
        if (!(formTMBTypeElement.value === "harrisBenedict")) highlightChange(formTMBTypeElement);
        formTMBTypeElement.value = "harrisBenedict";
        if (IMC < 18.5) {
          if (!(gordCorpLvl.value === "abaixo")) highlightChange(gordCorpLvl);
          gordCorpLvl.value = "abaixo";
        } else {
          if (!(gordCorpLvl.value === "eutrofico")) highlightChange(gordCorpLvl);
          gordCorpLvl.value = "eutrofico";
        }
      } else if (IMC >= 25.0) {
        if (!(formTMBTypeElement.value === "mifflinStJeor")) highlightChange(formTMBTypeElement);
        formTMBTypeElement.value = "mifflinStJeor";
        if (IMC < 30) {
          if (!(gordCorpLvl.value === "sobrepeso")) highlightChange(gordCorpLvl);
          gordCorpLvl.value = "sobrepeso";
        } else if (IMC >= 30 && IMC < 35) {
          if (!(gordCorpLvl.value === "obeso1")) highlightChange(gordCorpLvl);
          gordCorpLvl.value = "obeso1";
        } else if (IMC >= 35 && IMC < 40) {
          if (!(gordCorpLvl.value === "obeso2")) highlightChange(gordCorpLvl);
          gordCorpLvl.value = "obeso2";
        } else if (IMC > 40) {
          if (!(gordCorpLvl.value === "obeso3")) highlightChange(gordCorpLvl);
          gordCorpLvl.value = "obeso3";
        }
      } else
        console.error(`Error obtaining IMC value in fluxFormIMC(), line ${extLine(new Error())}.
        Obtained value: ${IMC ?? "NaN"}`);
    }
  } else
    multipleElementsNotFound(extLine(new Error()), "arguments in fluxFormIMC()", IMC, formTMBTypeElement, gordCorpLvl);
}
export function updateTMBContext(
  person: Person,
  arrTMB: [targEl, targEl],
  IMGMLGArray: [string, number, number] = ["abaixo", 0, 0],
  factorAtleta: string = "Peso",
): number {
  let TMB = 0,
    [targInpTMB, formTMBTypeElement] = arrTMB;
  if (factorAtleta === "peso") factorAtleta = "Peso";
  if (factorAtleta === "mlg") factorAtleta = "MLG";
  if (
    person &&
    (targInpTMB instanceof HTMLInputElement || targInpTMB instanceof HTMLSelectElement) &&
    (formTMBTypeElement instanceof HTMLSelectElement || targInpTMB instanceof HTMLSelectElement) &&
    typeof IMGMLGArray[1] === "number" &&
    typeof IMGMLGArray[2] === "number" &&
    (factorAtleta === "Peso" || factorAtleta === "MLG")
  ) {
    [targInpTMB, formTMBTypeElement] = arrTMB;
    const TMBArray = person.calcTMB(person, IMGMLGArray[1] || 0, IMGMLGArray[2] || 0, factorAtleta) ?? ["", 0];
    formTMBTypeElement instanceof HTMLSelectElement
      ? (formTMBTypeElement.value = TMBArray[0])
      : elementNotFound(formTMBTypeElement, "formTMBTypeElement", extLine(new Error()));

    TMB = parseNotNaN(TMBArray[1].toFixed(4), 0, "float");
    formatValue(targInpTMB as entryEl, TMB);
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for updateTMBContext",
      `${person.toString() || null}`,
      `${arrTMB.toString() || null}`,
      `${IMGMLGArray.toString() || null}`,
      factorAtleta,
    );

  return TMB || 0;
}
export function updateGETContext(
  person: Person,
  targInpGET: targEl,
  TMB: number = 0,
  factorAtvLvl: number = 1.4,
): number {
  const GET = parseNotNaN(person.calcGET(TMB || 0, factorAtvLvl).toFixed(4), 0, "float") || 0;
  targInpGET instanceof HTMLInputElement || targInpGET instanceof HTMLSelectElement
    ? formatValue(targInpGET, GET)
    : inputNotFound(targInpGET, "targInpGET em updateGETContext", extLine(new Error()));

  return GET || 0;
}
export function matchTMBElements(
  mainSelect: targEl,
  gordCorpLvl: targEl,
  formTMBTypeElement: targEl,
  spanFactorAtleta: targEl,
  lockGordCorpLvl: targEl,
  IMC: number = 0,
): void {
  if (
    (mainSelect instanceof HTMLSelectElement || mainSelect instanceof HTMLInputElement) &&
    (gordCorpLvl instanceof HTMLSelectElement || gordCorpLvl instanceof HTMLInputElement) &&
    (formTMBTypeElement instanceof HTMLSelectElement || formTMBTypeElement instanceof HTMLInputElement) &&
    spanFactorAtleta instanceof HTMLElement &&
    lockGordCorpLvl instanceof HTMLElement
  ) {
    //update em selects secundários (nível de gordura e fórmula)
    const switchSecSelects = (formTMBTypeElement: entryEl, secSelect: entryEl): void => {
      switch (formTMBTypeElement.value) {
        case "harrisBenedict":
          fluxFormIMC(gordCorpLvl, formTMBTypeElement, IMC);
          break;
        case "mifflinStJeor":
          fluxFormIMC(gordCorpLvl, formTMBTypeElement, IMC);
          break;
        case "tinsley":
          // secSelect.value = (mainSelect as entryEl).value;
          console.dir(secSelect);
          break;
        default:
          stringError(
            "argument in the switch for formTMBTypeElement.value",
            formTMBTypeElement?.value,
            extLine(new Error()),
          );
      }
    };

    //garante coesão de selects primários (nível e fator)
    if (/LvlAtFis/gi.test(mainSelect.id)) {
      const nafType = document.getElementById("nafType");
      if (nafType instanceof HTMLInputElement || nafType instanceof HTMLSelectElement) {
        switchSecSelects(formTMBTypeElement, nafType);
        // mainSelect.value = nafType.value;
      } else inputNotFound(nafType, "nafType in matchTMBElements()", extLine(new Error()));
    } else if (/nafType/gi.test(mainSelect.id)) {
      const LvlAtFis = document.getElementById("selectLvlAtFis");
      if (LvlAtFis instanceof HTMLInputElement || LvlAtFis instanceof HTMLSelectElement) {
        switchSecSelects(formTMBTypeElement, LvlAtFis);
        // mainSelect.value = LvlAtFis.value;
      } else inputNotFound(LvlAtFis, "LvlAtFis in matchTMBElements()", extLine(new Error()));
    } else stringError("testing mainSelect.id in matchTMBElements()", mainSelect?.id, extLine(new Error()));

    if (mainSelect.value === "muitoIntenso") {
      if (!(formTMBTypeElement.value === "tinsley")) formTMBTypeElement.value = "tinsley";
      spanFactorAtleta.hidden = false;
      fadeElement(spanFactorAtleta, "0");
      setTimeout(() => {
        fadeElement(spanFactorAtleta, "1");
      }, 500);
    } else if (
      mainSelect.value === "sedentario" ||
      mainSelect.value === "leve" ||
      mainSelect.value === "moderado" ||
      mainSelect.value === "intenso"
    ) {
      setTimeout(() => {
        fadeElement(spanFactorAtleta, "0");
        setTimeout(() => {
          spanFactorAtleta.hidden = true;
        }, 500);
      }, 500);
      if (
        gordCorpLvl.value === "sobrepeso" ||
        gordCorpLvl.value === "obeso1" ||
        gordCorpLvl.value === "obeso2" ||
        gordCorpLvl.value === "obeso3" ||
        (IMC && IMC >= 25)
      )
        formTMBTypeElement.value = "mifflinStJeor";
      else if (gordCorpLvl.value === "abaixo" || gordCorpLvl.value === "eutrofico" || (IMC && IMC < 25))
        formTMBTypeElement.value = "harrisBenedict";
      else
        console.error(`Error obtaining the value for Gordura Corporal, line ${extLine(new Error())}.
          Obtained level of Gordura Corporal: ${gordCorpLvl?.value};
          Obtained IMC: ${IMC ?? 0}.`);
    } else
      console.error(`Error obtaining the value for mainSelect, line ${extLine(new Error())}.
        Obtained value: ${mainSelect?.value}`);

    if (mainSelect.value === "muitoIntenso" || formTMBTypeElement.value === "tinsley") {
      fadeElement(lockGordCorpLvl, "0");
      setTimeout(() => {
        lockGordCorpLvl.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-unlock"
        viewBox="0 0 16 16"
      >
        <defs>
          <linearGradient
            id="gradiente-unlock"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style="stop-color:rgb(233, 180, 7)"
            />
            <stop
              offset="100%"
              style="stop-color:rgb(243, 221, 93)"
            />
          </linearGradient>
        </defs>
        <path
          d="M11 1 a2 2 0 0 1 2 2 v4 H9 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
          class="svg-unlock-hook"
          fill="url(#gradiente-unlock)"
        />
        <path
          d="M3 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
          class="svg-unlock-body"
          fill="url(#gradiente-unlock)"
        />
        <line
          x1="2.2"
          y1="7.05"
          x2="9.3"
          y2="7.05"
          stroke="black"
        />
        </svg>`;
        fadeElement(lockGordCorpLvl, "1");
      }, 500);
    } else {
      fadeElement(lockGordCorpLvl, "0");
      setTimeout(() => {
        lockGordCorpLvl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><defs><linearGradient id="gradiente-lock" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(233, 180, 7)"></stop><stop offset="100%" style="stop-color:rgb(243, 221, 93)"></stop></linearGradient></defs><path d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4" class="svg-lock-hook"></path><path d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2" class="svg-lock-body"></path><line x1="5" y1="7" x2="11" y2="7" stroke="black"></line></svg>`;
        fadeElement(lockGordCorpLvl, "1");
      }, 500);
    }
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for matchTMBElements()",
      mainSelect,
      formTMBTypeElement,
      spanFactorAtleta,
      gordCorpLvl,
      lockGordCorpLvl,
      IMC,
    );
}
export function updatePGC(
  person: Person,
  parentEl: targEl,
  numRef: number = 1,
  context: string = "cons",
): [number, targEl, targEl] {
  let PGC = 0,
    targInpPGC: targEl = null,
    targInpSumDCut: targEl = null;
  if (person && parentEl && typeof numRef === "number" && (context === "cons" || context === "col")) {
    switch (context) {
      case "cons":
        targInpPGC = parentEl.querySelector(`#inpPgc${numRef}Cel4_${numRef + 1}`);
        targInpSumDCut = parentEl.querySelector(`#tabInpRowDCut9_${numRef + 1}`);
        break;
      case "col":
        targInpPGC = parentEl.querySelector(`#inpPgc${numRef - 1}Cel4_${numRef}`);
        targInpSumDCut = parentEl.querySelector(`#tabInpRowDCut9_${numRef}`);
        break;
    }

    if (
      (targInpSumDCut instanceof HTMLInputElement || targInpSumDCut instanceof HTMLSelectElement) &&
      targInpSumDCut.type === "number"
    ) {
      person.sumDCut = parseNotNaN(targInpSumDCut?.value, 0, "float") || 0;
      targInpSumDCut.value = person.sumDCut.toString();
    } else inputNotFound(targInpSumDCut, "targInpSumDCut", extLine(new Error()));

    if (
      (targInpPGC instanceof HTMLInputElement || targInpPGC instanceof HTMLSelectElement) &&
      targInpPGC.type === "number"
    ) {
      PGC = parseNotNaN(person.calcPGC(person)[0].toFixed(4), 0, "float") || 0;
      const PGCDecayArray = evaluatePGCDecay(person, targInpPGC, PGC);
      PGCDecayArray[0] === true ? formatValue(targInpPGC, PGC) : formatValue(targInpPGC, PGC, 2);
    } else inputNotFound(targInpPGC, "targInpPGC", extLine(new Error()));
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for updatePGC",
      `${person?.toString() || null}`,
      parentEl,
      numRef,
      context,
    );

  if (PGC < 0) {
    console.warn(`PGC value defaulted. Obtained value: ${PGC || 0}`);
    PGC = 0;
  }

  return [PGC || 0, targInpSumDCut ?? null, targInpPGC ?? null];
}
export function updateAtvLvl(mainSelect: targEl, secondarySelect: targEl, atvLvl: string = "leve"): string {
  if (
    (mainSelect instanceof HTMLSelectElement || mainSelect instanceof HTMLInputElement) &&
    (secondarySelect instanceof HTMLSelectElement || secondarySelect instanceof HTMLInputElement) &&
    (atvLvl === "sedentario" ||
      atvLvl === "leve" ||
      atvLvl === "moderado" ||
      atvLvl === "intenso" ||
      atvLvl === "muitoIntenso")
  ) {
    const returnedAtvLvl = updateSimpleProperty(mainSelect) || "";
    if (typeof returnedAtvLvl === "string") {
      atvLvl = returnedAtvLvl;
      secondarySelect.value = atvLvl;
    } else typeError("update for mainSelect in updateAtLvl()", returnedAtvLvl, "string", extLine(new Error()));
  } else
    multipleElementsNotFound(extLine(new Error()), "arguments for updateAtvLvl()", mainSelect, secondarySelect, atvLvl);

  return atvLvl || "leve";
}
export function defineTargInps(parentEl: targEl, numRef: string | number = 1, context: string = "cons"): sixTargEl {
  const arrayTargInps: nullishHtEl[] = [],
    validTargInps: targEl[] | sixTargEl = [];
  if (
    parentEl instanceof HTMLElement &&
    (typeof numRef === "number" || typeof numRef === "string") &&
    typeof context === "string"
  ) {
    if (typeof numRef === "string") {
      numRef =
        numRef
          ?.replaceAll(/["']/g, "")
          ?.match(/^[0-9]{1,2}$/g)
          ?.toString() ?? "";
      numRef && numRef !== ""
        ? (numRef = parseNotNaN(numRef, 1))
        : stringError("convertendo Número de Consulta de string for número", numRef, extLine(new Error()));
    }
    if (typeof numRef === "number" && (context === "cons" || context === "col")) {
      switch (context) {
        case "cons":
          arrayTargInps.push(parentEl.querySelector(`#tabInpRowMedAnt2_${numRef + 1}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#tabInpRowMedAnt3_${numRef + 1}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpImc${numRef}Cel2_${numRef + 1}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpMlg${numRef}Cel3_${numRef + 1}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpTmb${numRef}Cel5_${numRef + 1}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpGet${numRef}Cel6_${numRef + 1}`) ?? null);
          break;
        case "col":
          arrayTargInps.push(parentEl.querySelector(`#tabInpRowMedAnt2_${numRef}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#tabInpRowMedAnt3_${numRef}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpImc${numRef - 1}Cel2_${numRef}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpMlg${numRef - 1}Cel3_${numRef}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpTmb${numRef - 1}Cel5_${numRef}`) ?? null);
          arrayTargInps.push(parentEl.querySelector(`#inpGet${numRef - 1}Cel6_${numRef}`) ?? null);
          break;
      }
    } else multipleElementsNotFound(extLine(new Error()), "arguments for defineTargInps", numRef, context);
    if (arrayTargInps?.length === 6) {
      for (let iA = 0; iA < arrayTargInps.length; iA++) {
        if (arrayTargInps[iA] instanceof HTMLInputElement || arrayTargInps[iA] instanceof HTMLSelectElement)
          validTargInps.push(arrayTargInps[iA]);
        else inputNotFound(arrayTargInps[iA], `arrayTargInps ${enumTargInpTypes[iA]}`, extLine(new Error()));
        arrayTargInps[iA] = null;
      }
    } else elementNotPopulated(arrayTargInps, "arrayTargInps", extLine(new Error()));

    if (validTargInps?.length === 6) return validTargInps as sixTargEl;
    else while (validTargInps?.length !== 6) validTargInps.push(null);
  } else multipleElementsNotFound(extLine(new Error()), "argument for defineTargInps()", parentEl, numRef, context);
  return validTargInps as sixTargEl;
}
export function addRowAtivFis(count: number = 3, context: string = "Rot"): void {
  const tBodyContainer = document.getElementById(`tbodyAtFis${context}`);
  let title = "Rotineira";
  if (context === "rot") context = "Rot";
  if (context === "prop") context = "Prop";
  if (context === "Prop") title = "Proposta";
  if (typeof context === "string" && tBodyContainer) {
    const newRow = document.createElement("tr");
    newRow.className = `tabRowAtFis${context}`;
    newRow.id = `tabRowAtFis${context}Id${count}`;
    newRow.innerHTML = `
    <td class="tabCelAtFis tabCelAtFis${context}" id="tabCelRowAtFis${context}${count}_1" itemprop="celAtFis${context}">${
      count - 1
    }&#41</td>
    <td class="tabCelAtFis tabCelAtFis${context} tabCelLeft" id="tabCelRowAtFis${context}${count}_2" itemprop="celAtFis${context}">
      <input type="text" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText" id="tabInpRowAtFis${context}${count}_1" itemprop="inpAtFis${context}" data-xls="Nome da Atividade Física ${title} ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_Nome_${count - 1}" data-reqlength="3" required />
    <td class="tabCelAtFis tabCelAtFis${context} tabCelLeft" id="tabCelRowAtFis${context}${count}_3" itemprop="celAtFis${context}">
      <input type="number" min-length="1" max-length"5" min="0" max="255" class="inpAtivFis tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_2" itemprop="inpAtFis${context}" data-xls="Número de Semanas para a Atividade Física Proposta ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_NSemana_${
      count - 1
    }" data-reqlength="1" data-maxlength='3' data-minnum="0" data-maxnum="255" required />
    </td>
    <td class="tabCelAtFis tabCelAtFis${context}" id="tabCelRowAtFis${context}${count}_4" itemprop="celAtFis${context}">
      <input type="number" min-length="1" max-length="7" min="0" max="255" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_3" itemprop="inpAtFis${context}" data-xls='Tempo de Sessão Mínimo para Atividade Física ${title} ${
      count - 1
    }' data-title="Atividade_Fisica_${title}_SessãoMin_${
      count - 1
    }" data-reqlength="1" data-maxlength="3" data-minnum="0" data-maxnum="65535"required />
    </td>
    <td class="tabCelAtFis tabCelAtFis${context} tabCelRight" id="tabCelRowAtFis${context}${count}_5" itemprop="celAtFis${context}">
      <input type="number" min-length="1" max-length="7" min="0" max="255" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_4" itemprop="inpAtFis${context}" data-xls="Número de Meses para a Atividade Física ${title} ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_Meses_${
      count - 1
    }" data-reqlength="1" data-maxlength="3" data-minnum="0" data-maxnum="65535" required />
    </td>
      `;
    tBodyContainer.appendChild(newRow);
    newRow.querySelectorAll('input[type="number"]').forEach(numInp => {
      numInp.addEventListener("input", () => {
        numberLimit(numInp as HTMLInputElement);
        handleEventReq(numInp as textEl);
      });
    });
    newRow.querySelectorAll('input[type="text"]').forEach(textEl => {
      textEl.addEventListener("input", () => {
        autoCapitalizeInputs(
          textEl as entryEl,
          checkAutoCorrect(document.querySelector('button[id^="deactAutocorrectBtn"]')),
        );
        handleEventReq(textEl as textEl);
      });
    });
    if (document.querySelector(`tabRowAtFis${context}Id${count}`)) {
      syncAriaStates([
        ...document.querySelector(`tabRowAtFis${context}Id${count}`)!.querySelectorAll("*"),
        document.querySelector(`tabRowAtFis${context}Id${count}`)!,
      ]);
    }
  } else multipleElementsNotFound(extLine(new Error()), "arguments for addRowAtivFis", context, tBodyContainer);
}
export function removeRowAtivFis(count: number = 3, context: string = "Rot"): number {
  if (context === "rot") context = "Rot";
  if (context === "prop") context = "Prop";
  const rowToRemove = document.getElementById(`tabRowAtFis${context}Id${count - 1}`);
  if (rowToRemove && count >= 3) rowToRemove.remove() as void;
  else console.warn(`No row to remove detected!`);
  return count;
}
export function switchRowComorb(comorbContainer: targEl, rowCountComorb: number = 3): void {
  const parentTab = document.getElementById("tabComorb");
  if (comorbContainer?.tagName === "BUTTON" && comorbContainer?.id === "addComorb" && parentTab) {
    const newComorbRow = document.createElement("tr");
    newComorbRow.className = "contTerc tabRowComorb noInvert";
    newComorbRow.id = `tabRowComorb${rowCountComorb}`;
    newComorbRow.innerHTML = `
    <td class="tabCelComorb tabCelRowComorb${rowCountComorb} noInvert" id="tabCelRowComorb${rowCountComorb}_1">${
      rowCountComorb - 1
    }</td>
    <td class="tabCelComorb tabCelLeft tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_2">
      <input type="text" class="tabInpComorb tabInpRowComorb${rowCountComorb} form-control noInvert" id="tablInpRowComorb${rowCountComorb}_2" data-title="Comorbidade_${rowCountComorb}_nome" required />
    </td>
    <td class="tabCelComorb tabCelRight tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_3">
      <input type="date" class="tabInpComorb tabInpRowComorb${rowCountComorb} form-control noInvert maxCurrDate" id="tablInpRowComorb${rowCountComorb}_3" data-title="Comorbidade_${rowCountComorb}_data_de_Diagnostico" required />
    </td>
    `;
    parentTab.appendChild(newComorbRow);
    newComorbRow.querySelectorAll('input[type="text"]').forEach(textEl => {
      textEl.addEventListener("input", () =>
        autoCapitalizeInputs(
          textEl as textEl,
          checkAutoCorrect(document.querySelector('button[id^="deactAutocorrectBtn"]')),
        ),
      );
    });
  } else if (comorbContainer?.tagName === "BUTTON" && comorbContainer?.id === "removeComorb") {
    const comorbRowToRemove = document
      .getElementById("tabComorb")
      ?.children?.namedItem(`tabRowComorb${rowCountComorb - 1}`);
    if (comorbRowToRemove && rowCountComorb !== 3 && comorbRowToRemove?.id !== "tabRowComorb2")
      comorbRowToRemove.remove() as void;
    else console.warn(`No row to remove detected.`);
    return;
  } else elementNotFound(comorbContainer, "comorbContainer in switchRowComorb", extLine(new Error()));
}
export function switchRequiredCols(
  elements: elCollection,
  numCons: number = 1,
  areNumConsOpsValid: boolean = true,
): void {
  const [numConsElement, consTablesFs, tabDC] = elements;
  const tabSVi = document.getElementById("tabProgSVi");
  const tabMedAnt = document.getElementById("tabMedAnt");
  const tabIndPerc = document.getElementById("tabIndPerc");
  if (
    consTablesFs instanceof HTMLElement &&
    tabDC instanceof HTMLTableElement &&
    tabSVi instanceof HTMLTableElement &&
    tabMedAnt instanceof HTMLTableElement &&
    tabIndPerc instanceof HTMLTableElement &&
    (numConsElement instanceof HTMLSelectElement || numConsElement instanceof HTMLInputElement) &&
    typeof numCons === "number" &&
    areNumConsOpsValid === true
  ) {
    numCons = parseNotNaN((updateSimpleProperty(numConsElement) as string) ?? "0");
    if (typeof numCons === "number" && numCons > 0 && numCons <= 3) {
      //inicia construção de matriz para reset de required na tabela
      const totalTables = consTablesFs?.querySelectorAll("table");
      const totalRows = consTablesFs?.querySelectorAll("tr");
      let nTotalRows = 0;
      totalRows?.length > 0
        ? (nTotalRows = totalRows.length - totalTables.length)
        : elementNotPopulated(totalRows, "NodeList of <tr> in switchRequiredCols()", extLine(new Error()));

      const totalCols = consTablesFs?.querySelectorAll("col");
      let nTotalCols = 0;
      totalCols?.length > 0
        ? (nTotalCols = totalCols.length - totalTables.length)
        : elementNotPopulated(totalCols, "NodeList of <col> in switchRequiredCols()", extLine(new Error()));

      let nTotalMatrixValidAxes = 0;
      nTotalRows > 0 && nTotalCols > 0
        ? (nTotalMatrixValidAxes = nTotalRows * nTotalCols)
        : console.error(`Error building the matrix for filling the axes.
          Obtained number of rows: ${nTotalRows ?? 0};
          Obtained number of columns: ${nTotalCols ?? 0}.`);

      //captura elementos de input para reset baseado nas matrizes inpsCells e nTotalMatrixValidAxes
      const inpsCellsSVi = tabSVi?.querySelectorAll(".tabInpProgSVi");
      const inpsCellsMedAnt = tabMedAnt?.querySelectorAll(".tabInpProgMedAnt");
      const inpsCellsDC = tabDC?.querySelectorAll(".tabInpProg");
      const inpsCellsIndPerc = tabIndPerc?.querySelectorAll(".inpInd");
      const inpsCells = [...inpsCellsSVi, ...inpsCellsMedAnt, ...inpsCellsDC, ...inpsCellsIndPerc];

      //reseta o atributo required das cells para novas atribuições de required
      if (inpsCells?.length > 0 && inpsCells.length === nTotalMatrixValidAxes / totalTables.length) {
        inpsCells.forEach(inpCel => {
          inpCel instanceof HTMLInputElement
            ? (inpCel.required = false)
            : inputNotFound(inpCel, `inpCel id ${inpCel?.id}`, extLine(new Error()));
        });
      } else
        console.error(`Error defining .length of <input> array in the cells.
        Obtained number: ${inpsCells.length ?? 0};
        Equals to the desired number for filling the axes: ${inpsCells.length === nTotalMatrixValidAxes};
        Accepted number: ${nTotalMatrixValidAxes / totalTables.length};
        Obtained number of <input> Elements for Sinais Vitais: ${inpsCellsSVi?.length ?? 0};
        Obtained number of <input> Elements for Medidas Antropométricas: ${inpsCellsMedAnt?.length ?? 0};
        Obtained number of <input> Elements for Dobras Cutâneas: ${inpsCellsDC?.length ?? 0};
        Obtained numbe of <input> Elements for Índices e Percentuais: ${inpsCellsIndPerc?.length ?? 0}.`);

      //determinação das novas cells required
      //validação das NodeLists de Inputs nas células
      const validInpsNodeLists = [
          validateTabInpList(inpsCellsSVi, defineMatrixAxes(tabSVi)) ?? false,
          validateTabInpList(inpsCellsMedAnt, defineMatrixAxes(tabMedAnt)) ?? false,
          validateTabInpList(inpsCellsDC, defineMatrixAxes(tabDC)) ?? false,
          validateTabInpList(inpsCellsIndPerc, defineMatrixAxes(tabIndPerc)) ?? false,
        ],
        consRequiredCellsSVi: Array<nlEl[]> = [],
        consRequiredCellsMedAnt: Array<nlEl[]> = [],
        consRequiredCellsDC: Array<nlEl[]> = [],
        consRequiredCellsIndPerc: Array<nlEl[]> = [];
      //validação de NodeLists para inputs nas tabelas
      if (validInpsNodeLists.every(inpsNodeListValidation => inpsNodeListValidation === true)) {
        /* percorre a tabela usando o número de consulta como números de ciclos
        ou seja, length dos arrays formados pelas querries === length do número de consulta === número de colunas
        + são extraídas as células de interesse, com base na .id relativa à coluna, e então populam requiredCels */
        for (let iC = 0; iC < numCons; iC++) {
          const filterPattern = new RegExp(`_${iC + 2}`);
          consRequiredCellsSVi.push(...(filterCellsPattern(inpsCellsSVi, filterPattern, iC) ?? []));
          consRequiredCellsMedAnt.push(...(filterCellsPattern(inpsCellsMedAnt, filterPattern, iC) ?? []));
          consRequiredCellsDC.push(...(filterCellsPattern(inpsCellsDC, filterPattern, iC) ?? []));
          consRequiredCellsIndPerc.push(...(filterCellsPattern(inpsCellsIndPerc, filterPattern, iC, "name") ?? []));
        }
      } else
        console.error(`Error validating NodeLists of inputs in tables.
        Obtained validation array for NodeLists: ${validInpsNodeLists.toString() || null}`);

      const flatRequiredCells = [
        ...consRequiredCellsSVi,
        ...consRequiredCellsMedAnt,
        ...consRequiredCellsDC,
        ...consRequiredCellsIndPerc,
      ].flat(1);

      if (flatRequiredCells?.length > 0 && flatRequiredCells.length === nTotalRows * numCons) {
        flatRequiredCells.forEach(fReqCel => {
          highlightChange(fReqCel, "red", "both");
          if (
            fReqCel instanceof HTMLInputElement ||
            fReqCel instanceof HTMLTextAreaElement ||
            fReqCel instanceof HTMLSelectElement
          ) {
            fReqCel.required = true;
          }
        });
      } else elementNotPopulated(flatRequiredCells, "flatRequiredCells", extLine(new Error()));
    } else
      console.error(`Error updating Número de Consulta.
          Obtained number: ${numCons ?? 0}`);
  } else {
    areNumConsOpsValid === false
      ? console.error(`Number of Appointment Options Invalid`)
      : multipleElementsNotFound(
          extLine(new Error()),
          "arguments for switchRequiredCols()",
          consTablesFs,
          tabDC,
          tabSVi,
          tabMedAnt,
          tabIndPerc,
          numConsElement,
          numCons,
          areNumConsOpsValid,
        );
  }
}
export function defineMatrixAxes(tab: targEl): number {
  let matrixValidAxes = 0;
  if (tab instanceof HTMLTableElement) {
    const nRows = tab.querySelectorAll("tr"),
      nCols = tab.querySelectorAll("col");
    nRows?.length > 0 && nCols?.length > 0
      ? (matrixValidAxes = (nRows.length - 1) * (nCols.length - 1))
      : console.error(`Error validating number of rows in the table for Sinais Vitais.
    Obtained number of rows: ${nRows?.length ?? 0};
    Obtained number of columns: ${nCols?.length ?? 0}.`);
  } else elementNotFound(tab, "tab in defineMatrixAxes()", extLine(new Error()));
  return matrixValidAxes || 0;
}
export function validateTabInpList(inpsNL: NodeListOf<Element> | Array<Element>, nMatrix: number = 4): boolean {
  let validInpNL = false;
  if ((inpsNL instanceof NodeList || Array.isArray(inpsNL)) && typeof nMatrix === "number") {
    Array.from(inpsNL).every(inpCell => inpCell instanceof HTMLInputElement) &&
    inpsNL?.length > 0 &&
    inpsNL.length === nMatrix
      ? (validInpNL = true)
      : console.warn(`Error capturings inputs of Sinais Vitais with querry.
        Obtained array: ${inpsNL.toString() || null};
        All Elements as HTMLInputElements: ${
          Array.from(inpsNL).every(inpCell => inpCell instanceof HTMLInputElement) ?? false
        };
        Length esperada: ${nMatrix ?? 0}.`);
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for validateTabInpList()",
      `${inpsNL.toString() || null}`,
      nMatrix,
    );
  return validInpNL || false;
}
export function filterCellsPattern(
  inpCells: NodeListOf<Element> | Element[],
  filterPattern: RegExp,
  columnNum: number = 2,
  testAtrib: string = "id",
): Array<(Element | null)[]> {
  if (
    Array.from(inpCells)?.every(
      inpCel =>
        inpCel instanceof HTMLInputElement ||
        inpCel instanceof HTMLTextAreaElement ||
        inpCel instanceof HTMLSelectElement,
    ) &&
    filterPattern instanceof RegExp &&
    typeof columnNum === "number" &&
    typeof testAtrib === "string"
  ) {
    const arrCells: Array<(Element | null)[]> = [];
    let filterInpCell: Element[] = [];
    switch (testAtrib) {
      case "id":
        filterInpCell = Array.from(inpCells).filter(inpCell => filterPattern.test(inpCell.id));
        break;
      case "name":
        filterInpCell = Array.from(inpCells).filter(inpCell => filterPattern.test((inpCell as HTMLInputElement).name));
        break;
      default:
        stringError("argument for testAtrib in filterCellsPatern()", testAtrib, extLine(new Error()));
    }
    if (filterInpCell?.length > 0) {
      arrCells.push(filterInpCell);
      return arrCells;
    } else console.warn(`Error filtering .id of Elements in the table for Sinais Vitais, column ${columnNum}.`);
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for filterCellsPattern()",
      `${inpCells.toString() || null}`,
      `${filterPattern.toString() || null}`,
      columnNum,
      testAtrib,
    );
  return [[inpCells[0]]];
}
export function switchNumConsTitles(
  consTitles: elCollection,
  trioEl: targEl,
  numTitledCons: number = 1,
  numTabs: number = 1,
): void {
  if (
    Array.from(consTitles)?.every(consTitle => consTitle instanceof HTMLElement) &&
    (trioEl instanceof HTMLSelectElement ||
      trioEl instanceof HTMLInputElement ||
      trioEl instanceof HTMLTextAreaElement) &&
    typeof numTitledCons === "number" &&
    typeof numTabs === "number"
  ) {
    const trioNums: number[] = [];
    let iniValue = parseInt(trioEl?.value) ?? 0;
    !Number.isFinite(iniValue) && (iniValue = 1);
    if (Number.isNaN(iniValue)) {
      for (let t = 0; t <= numTabs * numTabs - 1; t += numTitledCons / numTabs) trioNums.push(1, 2, 3);
    } else {
      for (let j = 0; j <= numTabs * numTabs - 1; j += numTitledCons / numTabs)
        trioNums.push(iniValue, iniValue + 1, iniValue + 2);
    }
    for (let i = 0; i < consTitles.length; i++) consTitles[i].textContent = `${trioNums[i] || `${i + 1}`}ª Consulta`;
    document.querySelectorAll(".tabInpProg").forEach((inp, i) => {
      try {
        if (
          !(inp instanceof HTMLInputElement || inp instanceof HTMLSelectElement || inp instanceof HTMLTextAreaElement)
        )
          throw inputNotFound(inp, `Validation of Input instance`, extLine(new Error()));
        if (!inp.dataset.title || inp.dataset.title === "") return;
        const inpCol = inp.dataset.col;
        if (!inpCol) throw new Error(`Failed to fetch input ${inp.id || inp.className || inp.tagName} Column Number`);
        const matchedHeadcel = Array.from(document.getElementsByClassName("numConsTextHeadCel")).find((headcel, i) => {
          try {
            if (!(headcel instanceof HTMLElement))
              throw elementNotFound(headcel, `Validation of Head cel instance`, extLine(new Error()));
            return (
              headcel.dataset.col === inp.dataset.col || headcel.innerText.replaceAll(/[^0-9]/g, "") === inp.dataset.col
            );
          } catch (e) {
            console.error(`Error executing iteration ${i} for finding matching head cell:\n${(e as Error).message}`);
          }
        });
        if (!(matchedHeadcel instanceof HTMLElement))
          throw elementNotFound(matchedHeadcel, `Validation of Matched Head cel instance`, extLine(new Error()));
        inp.dataset.title = inp.dataset.title
          .slice(0, inp.dataset.title.indexOf("Consulta"))
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll(/[0-9]/g, "")
          .trim();
        inp.dataset.title += `(Consulta ${matchedHeadcel.innerText
          .slice(0, Math.min(matchedHeadcel.innerText.indexOf("ª"), matchedHeadcel.innerText.indexOf(" ")))
          .trim()})`;
      } catch (e) {
        console.error(
          `Error validating iteration ${i} for renaming titles for Table Progress Inputs:\n${(e as Error).message}`,
        );
      }
    });

    Array.from(document.getElementById("fsSubProgConsInd")?.querySelectorAll("table") ?? [])
      ?.map(table => [
        ...Array.from(table.querySelectorAll("input")),
        ...Array.from(table.querySelectorAll("textarea")),
        ...Array.from(table.querySelectorAll("select")),
      ])
      ?.flat(1)
      .forEach(input => {
        if (
          (input instanceof HTMLInputElement ||
            input instanceof HTMLTextAreaElement ||
            input instanceof HTMLSelectElement) &&
          input.dataset.title &&
          /[0-9]/g.test(input.dataset.title)
        ) {
          const indexNum = input.dataset.title.search(/[0-9]/g);
          input.dataset.title =
            input.dataset.title.slice(0, indexNum) + `${0 + trioEl.value}` + input.dataset.title.slice(indexNum + 1);
        } else inputNotFound(input, `input id ${input?.id}`, extLine(new Error()));
      });
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for switchNumConsTitles",
      `${consTitles.toString() || null}`,
      trioEl,
      numTitledCons,
      numTabs,
    );
}
export function createArraysRels(
  arrayRows: HTMLTableRowElement[],
  btnId: string = "",
  protocolValue: string = "pollock3",
): number {
  let colAcc = 0;
  if (
    arrayRows?.every(row => row instanceof HTMLTableRowElement) &&
    typeof btnId === "string" &&
    btnId?.match(/(?<=_)[0-9]+/) &&
    btnId?.match(/[0-9]+(?=_)/) &&
    typeof protocolValue === "string"
  ) {
    const btnCol = parseNotNaN(btnId?.match(/(?<=_)[0-9]+/)?.toString() ?? "0", 1),
      targColInps = arrayRows.map(
        row =>
          Array.from(row.querySelectorAll("input")).filter(inp => inp.id?.match(`_${btnCol.toString()}`) ?? false)[0],
      ),
      inpsIds = targColInps.map(inp => inp?.id);
    if (inpsIds.length === arrayRows.length) {
      //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
      const protocoloNum = parseNotNaN(protocolValue.slice(-1));
      if (protocoloNum === 3 || protocoloNum === 7) {
        for (let iC = 0; iC < arrayRows.length; iC++) {
          if (arrayRows[iC].hidden === true) continue;
          colAcc += parseNotNaN(targColInps[iC].value);
        }
      } else
        console.error(`Erro obtaining the protocol number.
        Obtained number: ${protocoloNum ?? 0}`);
    } else console.error(`Error validating length of columnValues.`);
    const sumInp = document.getElementById(`tabInpRowDCut9_${btnCol}`);
    sumInp instanceof HTMLInputElement
      ? (sumInp.value = colAcc.toString())
      : console.error(`Error finding input for sum of skin folds.`);
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "arguments for createArrayRels()",
      `${arrayRows.toString() || null}`,
      btnId,
      protocolValue,
    );
  return colAcc;
}
export function getConsultasNums(arrayRow: targEl): number[] {
  let arrayConsultasNum: number[] = [];
  if (arrayRow instanceof HTMLTableRowElement) {
    const strConsultasNum = arrayRow.innerText.replaceAll(/[\D]/g, "");
    for (let iL = 0; iL < strConsultasNum.length; iL++) {
      arrayConsultasNum = arrayConsultasNum.concat(parseNotNaN(strConsultasNum?.slice(0 + iL, 1 + iL) ?? "0", 1));
    }
  } else elementNotFound(arrayRow, "arrayRow in getConsultasNum", extLine(new Error()));
  return arrayConsultasNum || [1];
}
export function handleSumClick(ev: React.MouseEvent): void {
  const protocolo = document.getElementById("tabSelectDCutId"),
    rowsDCArray = Array.from(document.getElementById("tabDCut")?.getElementsByClassName("tabRowDCutMed") ?? []).filter(
      rowDC => rowDC instanceof HTMLTableRowElement,
    );
  try {
    if (typeof person !== "object" && "sumDCut" in person)
      throw typeError(`validating typeof person object`, "person", "object", extLine(new Error()));
    if (!(protocolo instanceof HTMLSelectElement || protocolo instanceof HTMLInputElement))
      throw elementNotFound(protocolo, `Protocolo Element`, extLine(new Error()));
    person.sumDCut = createArraysRels(rowsDCArray as HTMLTableRowElement[], ev.currentTarget?.id, protocolo.value);
    if (Number.isFinite(person.sumDCut) || person.sumDCut <= 0) person.sumDCut = 0;
    if (tabProps.isAutoFillActive === true) {
      if (
        person instanceof Person &&
        tabProps.targInpPGC instanceof HTMLInputElement &&
        protocolo.value === "pollock3" &&
        person.age >= 0
      ) {
        const numCol = getNumCol(ev.currentTarget) ?? 0;
        typeof numCol === "number" && numCol > 0
          ? ([tabProps.PGC, tabProps.targInpSumDCut, tabProps.targInpPGC] = updatePGC(
              person,
              document.getElementById("fsProgConsId"),
              tabProps.numCol,
              "col",
            ))
          : typeError("obtaining column number", tabProps.numCol, "number (natural)", extLine(new Error()));
      } else
        console.warn(`Error updating PGC using .sumDCut.
            Obtained person.age: ${person?.age || 0}
            Used Protocol: ${protocolo?.value || "null"} (Apenas pollock3 aceito, por enquanto);
            Is person classified? ${person instanceof Person};
            Instance of the targeted input for PGC: ${
              Object.prototype.toString.call(tabProps.targInpPGC).slice(8, -1) ?? "null"
            }`);
    } else console.warn(`Autofill not active. PGC not affected.`);
  } catch (e) {
    console.error(`Error executing callback for Button for Sum of Skin Folds:\n${(e as Error).message}`);
  }
}
export function handleIndEv(ev: React.MouseEvent | React.FormEvent | React.ChangeEvent, context: IndCases): void {
  try {
    if (!(person instanceof Person))
      console.warn(
        `Error validating the treated person as as gendered instance in handleIndEv. That will probably lead to data errors. Consider deactivating autofill.`,
      );
    if (
      !(
        ev.currentTarget instanceof HTMLButtonElement ||
        (ev.currentTarget instanceof HTMLInputElement &&
          (ev.currentTarget.type === "number" || ev.currentTarget.type === "text")) ||
        ev.currentTarget instanceof HTMLSelectElement
      )
    )
      throw elementNotFound(
        ev.currentTarget,
        `Instance of ${ev.currentTarget.id || ev.currentTarget.tagName} in handleIndEv`,
        extLine(new Error()),
      );
    tabProps.numCol = getNumCol(ev.currentTarget) ?? 0;
    if (!Number.isFinite(tabProps.numCol)) tabProps.numCol = 0;
    if (typeof tabProps.factorAtleta !== "string")
      throw typeError(`typeof Factor Atleta`, tabProps.factorAtleta, `string`, extLine(new Error()));
    const consTablesFs = document.getElementById("fsProgConsId");
    [
      ...document.getElementsByClassName("tabInpProgIndPerc"),
      ...document.getElementsByClassName("inpHeigth"),
      ...document.getElementsByClassName("inpWeigth"),
      ...document.getElementsByClassName("tabInpProgSumDCut"),
    ].forEach(targInp => {
      if (targInp instanceof HTMLElement) {
        if (targInp.dataset[`active`]) targInp.dataset[`active`] = "false";
        else targInp.setAttribute("data-active", "false");
      }
    });
    if (!(consTablesFs instanceof HTMLElement))
      throw elementNotFound(consTablesFs, `Cons Table Fieldset`, extLine(new Error()));
    if (tabProps.isAutoFillActive && typeof tabProps.isAutoFillActive === "boolean") {
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
      ] = defineTargInps(consTablesFs, tabProps.numCol, "col");
      tabProps.targInpPGC = document.querySelector(`#inpPgc${tabProps.numCol - 1}Cel4_${tabProps.numCol}`);
      [tabProps.PGC, , tabProps.targInpPGC] = updatePGC(person, consTablesFs, tabProps.numCol, "col");
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        tabProps.targInpPGC,
        tabProps.targInpSumDCut,
      ].forEach(targ => {
        if (targ instanceof HTMLElement) targ.dataset[`active`] = "true";
        else targ?.setAttribute("data-active", "true");
      });
    } else if (typeof tabProps.isAutoFillActive !== "boolean")
      console.warn(`Error validating typeof tabProps.isAutoFillActive`);
    if (
      context !== "BTN" &&
      context !== "IMC" &&
      context !== "MLG" &&
      context !== "TMB" &&
      context !== "GET" &&
      context !== "PGC"
    )
      throw stringError(
        `validation of context argument in handleIndEv for ${ev.currentTarget.id || ev.currentTarget.tagName}`,
        context,
        extLine(new Error()),
      );
    context = context.toUpperCase() as IndCases;
    switch (context) {
      case "BTN":
        break;
      case "IMC":
        tabProps.IMC = checkReturnIndex(tabProps.targInpIMC, tabProps.IMC, "IMC");
        break;
      case "MLG":
        tabProps.MLG = checkReturnIndex(tabProps.targInpMLG, tabProps.MLG, "MLG");
        break;
      case "TMB":
        tabProps.TMB = checkReturnIndex(tabProps.targInpTMB, tabProps.TMB, "tabProps.");
        break;
      case "GET":
        tabProps.GET = checkReturnIndex(tabProps.targInpGET, tabProps.GET, "GET");
        break;
      case "PGC":
        tabProps.PGC = checkReturnIndex(tabProps.targInpPGC, tabProps.PGC, "PGC");
        break;
      default:
        stringError("value for callbackTabBtnsInps() context", context, extLine(new Error()));
    }
    const gordCorpLvl = document.getElementById("gordCorpLvl"),
      formTMBTypeElement = document.getElementById("formCalcTMBType");
    if (!(gordCorpLvl instanceof HTMLElement))
      throw elementNotFound(gordCorpLvl, `Instance of Body Fat Level Element`, extLine(new Error()));
    if (!(formTMBTypeElement instanceof HTMLElement))
      throw elementNotFound(formTMBTypeElement, `Instance of Form TMB Type Element`, extLine(new Error()));
    if (context === "BTN" || tabProps.isAutoFillActive === true) {
      [person.weight, person.height] = matchPersonPropertiesWH(person, tabProps.targInpWeigth, tabProps.targInpHeigth);
      if (typeof tabProps.factorAtvLvl !== "number")
        throw typeError(`typeof FactorAtvLvl`, tabProps.factorAtleta, `number`, extLine(new Error()));
      if (typeof tabProps.factorAtleta !== "string")
        throw typeError(`typeof Factor Atleta`, tabProps.factorAtleta, `string`, extLine(new Error()));
      //UPDATE AUTOMÁTICO DE VALUES DOS INPUTS AQUI
      [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET] = updateIndexesContexts(
        person,
        [gordCorpLvl, tabProps.targInpIMC, tabProps.targInpMLG],
        [tabProps.targInpTMB, tabProps.targInpGET, formTMBTypeElement],
        tabProps.factorAtvLvl,
        tabProps.factorAtleta,
      );
    }
    const callbackResult: btnFillResult = [
      [person?.weight || 0, person?.height || 0],
      [tabProps.IMC || 0, tabProps.MLG || 0, tabProps.TMB || 0, tabProps.GET || 0, tabProps.PGC || 0] || [
        0, 0, 0, 0, 0,
      ],
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        tabProps.targInpPGC,
      ] || [],
    ] || [[0, 0], [0, 0, 0, 0, 0], []];
    if (context === "BTN" || tabProps.isAutoFillActive === true) {
      [
        [person.weight, person.height],
        [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET, tabProps.PGC],
        [
          tabProps.targInpWeigth,
          tabProps.targInpHeigth,
          tabProps.targInpIMC,
          tabProps.targInpMLG,
          tabProps.targInpTMB,
          tabProps.targInpGET,
          tabProps.targInpPGC,
        ],
      ] = callbackResult;
    } else {
      switch (context) {
        case "IMC":
          tabProps.IMC = checkReturnIndex(callbackResult[2][2], callbackResult[1][0], context);
          break;
        case "MLG":
          tabProps.MLG = checkReturnIndex(callbackResult[2][3], callbackResult[1][1], context);
          break;
        case "TMB":
          tabProps.TMB = checkReturnIndex(callbackResult[2][4], callbackResult[1][2], context);
          break;
        case "GET":
          tabProps.GET = checkReturnIndex(callbackResult[2][5], callbackResult[1][3], context);
          break;
        case "PGC":
          tabProps.PGC = checkReturnIndex(callbackResult[2][6], callbackResult[1][4], context);
          break;
        default:
          stringError("value for callbackTabBtnsInps() context", context, extLine(new Error()));
      }
    }
  } catch (e) {
    console.error(
      `Error executing handleIndEv with ${ev.currentTarget.id || ev.currentTarget.tagName}:\n${(e as Error).message}`,
    );
  }
}
export function exeAutoFill(targ: targEl, isAutoFillActive: boolean = true, context: string = "cons"): autofillResult {
  let numRef = 1,
    arrIndexes: number[] = [],
    arrtargInps: targEl[] = [];
  try {
    const consTablesFs = document.getElementById("fsProgConsId"),
      gordCorpLvl = document.getElementById("gordCorpLvl"),
      formTMBTypeElement = document.getElementById("formCalcTMBType");
    if (
      (targ instanceof HTMLInputElement || targ instanceof HTMLTextAreaElement || targ instanceof HTMLSelectElement) &&
      tabProps.isAutoFillActive === true &&
      person instanceof Person &&
      typeof context === "string"
    ) {
      if (context === "cons") {
        const selectNumCons = document.getElementById("selectNumCons");
        selectNumCons instanceof HTMLInputElement || selectNumCons instanceof HTMLSelectElement
          ? (tabProps.numCons = parseInt(selectNumCons?.value || "1"))
          : inputNotFound(selectNumCons, "selectNumCons in exeAutoFill()", extLine(new Error()));
        numRef = tabProps.numCons;
      } else if (context === "col") {
        tabProps.numCol = getNumCol(targ) || 2;
        numRef = tabProps.numCol;
      } else console.warn(`defaulted numRef`);
      [
        ...document.getElementsByClassName("tabInpProgIndPerc"),
        ...document.getElementsByClassName("inpHeigth"),
        ...document.getElementsByClassName("inpWeigth"),
        ...document.getElementsByClassName("tabInpProgSumDCut"),
      ].forEach(targInp => {
        if (targInp instanceof HTMLElement) targInp.dataset[`active`] = "false";
      });
      arrtargInps = defineTargInps(consTablesFs, numRef, context);
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
      ] = arrtargInps;
      arrIndexes = updateIndexesContexts(
        person,
        [gordCorpLvl, tabProps.targInpIMC, tabProps.targInpMLG],
        [tabProps.targInpTMB, tabProps.targInpGET, formTMBTypeElement],
        tabProps.factorAtvLvl,
        tabProps.factorAtleta,
      );
      [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET] = arrIndexes;
      [person.weight, person.height] = matchPersonPropertiesWH(person, tabProps.targInpWeigth, tabProps.targInpHeigth);
      const arrPGC = updatePGC(person, consTablesFs, numRef, context);
      //PGC, targInpSumDCut, targInpPGC
      [tabProps.PGC, tabProps.targInpSumDCut, tabProps.targInpPGC] = arrPGC;
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        tabProps.targInpPGC,
        tabProps.targInpSumDCut,
      ].forEach(targ => {
        if (targ instanceof HTMLElement) targ.dataset[`active`] = "true";
        else targ?.setAttribute("data-active", "true");
      });
      arrIndexes.push(tabProps.PGC);
      arrtargInps.push(tabProps.targInpSumDCut, tabProps.targInpPGC);
      person.sumDCut = matchPersonPropertiesDC(person, arrPGC[1]);
      //APLICAÇÃO DE VALUES NOS TARG INPUTS
      if (
        arrtargInps.every(
          targ =>
            targ instanceof HTMLInputElement ||
            targ instanceof HTMLSelectElement ||
            targ instanceof HTMLTextAreaElement,
        )
      ) {
        (tabProps.targInpIMC as entryEl).value = tabProps.IMC.toString();
        (tabProps.targInpMLG as entryEl).value = tabProps.MLG.toString();
        (tabProps.targInpTMB as entryEl).value = tabProps.TMB.toString();
        (tabProps.targInpGET as entryEl).value = tabProps.GET.toString();
        (tabProps.targInpPGC as entryEl).value = tabProps.PGC.toString();
      } else
        console.error(
          `Error validating instances of arrtargInps in exeAutoFill(). Values for respective <input> Elements not updated.`,
        );
      return [
        numRef || 1,
        [person.weight || 0, person.height || 0, person.sumDCut || 0],
        arrIndexes || [0, 0, 0, 0, 0],
        arrtargInps || [],
      ];
    } else {
      multipleElementsNotFound(
        extLine(new Error()),
        "arguments for exeAutoFill",
        targ,
        isAutoFillActive,
        `${JSON.stringify(person)}`,
        context,
      );
      arrIndexes = [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET, tabProps.PGC];
      arrtargInps = [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        tabProps.targInpSumDCut,
        tabProps.targInpPGC,
      ];
    }
    return [
      numRef || 1,
      [person.weight || 0, person.height || 0, person.sumDCut || 0],
      arrIndexes || [0, 0, 0, 0, 0],
      arrtargInps || [],
    ];
  } catch (e) {
    console.error(`Error executing exeAutoFill:\n${(e as Error).message}`);
    return [
      numRef || 1,
      [person.weight || 0, person.height || 0, person.sumDCut || 0],
      arrIndexes || [0, 0, 0, 0, 0],
      arrtargInps || [],
    ];
  }
}
export function callbackTextBodyEl(person: Person): [string, string, string] {
  const textBodytype = document.getElementById("textBodytype"),
    protocolo = document.getElementById("tabSelectDCutId"),
    tabDC = document.getElementById("tabDCut"),
    genElement = document.getElementById("genId"),
    genBirthRel = document.getElementById("genBirthRelId"),
    genFisAlin = document.getElementById("genFisAlinId");
  try {
    if (typeof person !== "object")
      throw typeError(`typeof person in callback for Text Body Element`, person, `object`, extLine(new Error()));
    if (!(textBodytype instanceof HTMLSelectElement || textBodytype instanceof HTMLInputElement))
      throw elementNotFound(textBodytype, `Text Body Type Element`, extLine(new Error()));
    if (!(protocolo instanceof HTMLSelectElement || protocolo instanceof HTMLInputElement))
      throw elementNotFound(protocolo, `Protocolo Element`, extLine(new Error()));
    if (!(tabDC instanceof HTMLTableElement)) throw elementNotFound(tabDC, `Table of Skin Folds`, extLine(new Error()));
    if (!(genElement instanceof HTMLSelectElement || genElement instanceof HTMLInputElement))
      throw elementNotFound(genElement, `Gender Element`, extLine(new Error()));
    if (!(genBirthRel instanceof HTMLSelectElement || genBirthRel instanceof HTMLInputElement))
      throw elementNotFound(genBirthRel, `Gender Birth Relation Element`, extLine(new Error()));
    if (!(genFisAlin instanceof HTMLSelectElement || genFisAlin instanceof HTMLInputElement))
      throw elementNotFound(genFisAlin, `Gen Physical Alignment Element`, extLine(new Error()));
    changeTabDCutLayout(protocolo, tabDC, textBodytype);
    person.gen = textBodytype.value;
    if ((genElement.value === "masculino" || genElement.value === "feminino") && genBirthRel.value === "cis")
      genElement.value = textBodytype.value;
    switch (textBodytype.value) {
      case "masculino":
        genFisAlin.value = "masculinizado";
        break;
      case "feminino":
        genFisAlin.value = "feminilizado";
        break;
      case "neutro":
        genFisAlin.value = "neutro";
        break;
      default:
        stringError("verifying textBodytype.value", textBodytype?.value, extLine(new Error()));
    }
  } catch (e) {
    console.error(`Error executing callbackTextBodyEl:\n${(e as Error).message}`);
  }
  return [
    person?.gen || "masculino",
    (genElement as entryEl)?.value || "masculino",
    (genFisAlin as entryEl)?.value || "masculinizado",
  ];
}
export function callbackAtvLvlElementNaf(contextData: [number[], targEl[]], mainEl: string): [string, number] {
  [tabProps.factorAtvLvl, tabProps.IMC] = contextData[0];
  const [atvLvlElement, gordCorpLvl, formTMBTypeElement, nafType] = contextData[1];
  try {
    if (!(person instanceof Person)) throw new Error(`Failed to validate patient person instance`);
    if (typeof tabProps.factorAtvLvl !== "number")
      throw typeError(`typeof Factor for activity level`, tabProps.factorAtvLvl, `number`, extLine(new Error()));
    if (typeof tabProps.IMC !== "number") throw typeError(`typeof IMC`, tabProps.IMC, `number`, extLine(new Error()));
    if (!(atvLvlElement instanceof HTMLInputElement || atvLvlElement instanceof HTMLSelectElement))
      throw elementNotFound(atvLvlElement, `Activity Level Element instance`, extLine(new Error()));
    if (!(gordCorpLvl instanceof HTMLInputElement || gordCorpLvl instanceof HTMLSelectElement))
      throw elementNotFound(gordCorpLvl, `Body Fat Level Element`, extLine(new Error()));
    if (!(formTMBTypeElement instanceof HTMLInputElement || formTMBTypeElement instanceof HTMLSelectElement))
      throw elementNotFound(formTMBTypeElement, `TMB Type Element`, extLine(new Error()));
    if (!(nafType instanceof HTMLInputElement || nafType instanceof HTMLSelectElement))
      throw elementNotFound(nafType, `Level of Physical Activity Type Element`, extLine(new Error()));
    //ajusta elementos <select> com base em combinações
    fluxFormIMC(gordCorpLvl, formTMBTypeElement, tabProps.IMC || 0);
    if (/LvlAtFis/gi.test(mainEl) || /TMBType/gi.test(mainEl) || /gordCorpLvl/gi.test(mainEl)) {
      matchTMBElements(
        atvLvlElement,
        gordCorpLvl,
        formTMBTypeElement,
        document.getElementById("spanFactorAtleta"),
        document.getElementById("lockGordCorpLvl"),
        tabProps.IMC || 0,
      );
      person.atvLvl = updateAtvLvl(atvLvlElement, nafType, person.atvLvl);
      //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
      const returnedFactorAtvLvl = person.checkAtvLvl(person);
      typeof returnedFactorAtvLvl === "number"
        ? (tabProps.factorAtvLvl = returnedFactorAtvLvl || 1.4)
        : typeError("returnedFactorAtvLvl", returnedFactorAtvLvl, "number", extLine(new Error()));
    } else if (/nafType/gi.test(mainEl)) {
      matchTMBElements(
        nafType,
        gordCorpLvl,
        formTMBTypeElement,
        document.getElementById("spanFactorAtleta"),
        document.getElementById("lockGordCorpLvl"),
        tabProps.IMC || 0,
      );
      person.atvLvl = updateAtvLvl(nafType, atvLvlElement, person.atvLvl);
      //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
      const returnedFactorAtvLvl = person.checkAtvLvl(person);
      typeof returnedFactorAtvLvl === "number"
        ? (tabProps.factorAtvLvl = returnedFactorAtvLvl || 1.4)
        : typeError("returnedFactorAtvLvl", returnedFactorAtvLvl, "number", extLine(new Error()));
    } else
      console.error(`Error validating mainEl.
        obtained .id: ${mainEl ?? "UNDEFINED ID"}`);
    return [person.atvLvl, tabProps.factorAtvLvl];
  } catch (e) {
    console.error(`Error executing callbackAtvLvlElementNaf:\n${(e as Error).message}`);
    return [person.atvLvl, tabProps.factorAtvLvl];
  }
}
export function handleCallbackWHS(
  contextComp: [contextAutofill, contextAutofillNums],
  inpWHS: targEl,
  isAutoFillActive: boolean = true,
): [number, autofillResult] {
  tabProps.numCol = contextComp[1][0];
  let prop = 0,
    result: autofillResult = [
      tabProps.numCol || 2,
      [person.weight || 0, person.height || 0, person.sumDCut || 0],
      contextComp[1][3] || [0, 0, 0, 0, 0], //[1][3] === arrIndexes
      contextComp[0][3] || [], //[0][3] === arrTargs
    ];
  const fillResult = (callbackResult: autofillResult, mainNum: number): void => {
    if (tabProps.isAutoFillActive === true) {
      if (mainNum === 0) {
        tabProps.targInpWeigth = callbackResult[3][mainNum];
        for (const targWeight of document.getElementsByClassName("inpWeigth")) {
          if (targWeight instanceof HTMLElement) {
            targWeight.dataset.active
              ? (targWeight.dataset[`active`] = "false")
              : targWeight.setAttribute("data-active", "false");
          }
        }
        if (tabProps.targInpWeigth instanceof HTMLElement) {
          tabProps.targInpWeigth.dataset.active
            ? (tabProps.targInpWeigth.dataset[`active`] = "true")
            : tabProps.targInpWeigth?.setAttribute("data-active", "true");
        }
      } else if (mainNum === 1) {
        tabProps.targInpHeigth = callbackResult[3][mainNum];
        for (const targHeigth of document.getElementsByClassName("inpHeigth")) {
          if (targHeigth instanceof HTMLElement) {
            targHeigth.dataset.active
              ? (targHeigth.dataset[`active`] = "false")
              : targHeigth.setAttribute("data-active", "false");
          }
        }
        if (tabProps.targInpHeigth instanceof HTMLElement) {
          tabProps.targInpHeigth.dataset.active
            ? (tabProps.targInpHeigth.dataset[`active`] = "true")
            : tabProps.targInpHeigth?.setAttribute("data-active", "true");
        }
      } else if (mainNum === 2) {
        tabProps.targInpSumDCut = callbackResult[3].at(-mainNum);
        for (const targSumDCut of document.getElementsByClassName("tabInpProgSumDCut")) {
          if (targSumDCut instanceof HTMLElement) {
            targSumDCut.dataset.active
              ? (targSumDCut.dataset[`active`] = "false")
              : targSumDCut.setAttribute("data-active", "false");
          }
        }
        if (tabProps.targInpSumDCut instanceof HTMLElement) {
          tabProps.targInpSumDCut.dataset.active
            ? (tabProps.targInpSumDCut.dataset[`active`] = "true")
            : tabProps.targInpSumDCut?.setAttribute("data-active", "true");
        }
      } else console.error(`Error validating mainNum in fillResult()`);
      [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET, tabProps.PGC] = callbackResult[2];
      [tabProps.targInpIMC, tabProps.targInpMLG, tabProps.targInpTMB, tabProps.targInpGET, , tabProps.targInpPGC] =
        callbackResult[3].slice(2);
    }
  };
  try {
    if (!(person instanceof Person))
      throw typeError(`instanceof person`, (person as any).toString(), `formClassPerson`, extLine(new Error()));
    if (
      !(
        inpWHS instanceof HTMLInputElement ||
        inpWHS instanceof HTMLSelectElement ||
        inpWHS instanceof HTMLTextAreaElement
      )
    )
      throw elementNotFound(inpWHS, `${inpWHS?.id || inpWHS?.tagName || "unidentified"}`, extLine(new Error()));
    if (
      inpWHS.value.length > 0 &&
      inpWHS.value !== "" &&
      (/NaN/gi.test(inpWHS.value) || /Infinity/gi.test(inpWHS.value))
    )
      inpWHS.value = "0";
    if (inpWHS.classList.contains("inpWeigth")) {
      if (parseNotNaN(inpWHS.value, 0, "float") > 999) inpWHS.value = "999";
      prop = person.weight;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.weight = prop;
      if (tabProps.isAutoFillActive === true) result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [prop || 0, result || defaultResult];
      fillResult(callbackResult[1], 0);
    } else if (inpWHS.classList.contains("inpHeigth")) {
      if (parseNotNaN(inpWHS.value, 0, "float") > 3) inpWHS.value = "3";
      prop = person.height;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.height = prop;
      if (tabProps.isAutoFillActive === true) result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [prop || 0, result || defaultResult];
      fillResult(callbackResult[1], 1);
    } else if (inpWHS.classList.contains("inpSumDCut") || inpWHS.classList.contains("selFactorAtletaClass")) {
      if (inpWHS.classList.contains("inpSumDCut") && parseNotNaN(inpWHS.value, 0, "float") > 999) inpWHS.value = "999";
      prop = person.sumDCut;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.sumDCut = prop;
      if (tabProps.isAutoFillActive === true) result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [prop || 0, result || defaultResult];
      fillResult(callbackResult[1], 2);
    } else throw elementNotFound(inpWHS, `Inp WHS classList`, extLine(new Error()));
  } catch (e) {
    console.error(`Error executing callbackWHS for ${inpWHS?.id || "unidentified"}:${(e as Error).message}`);
  }
  return [prop || 0, result || defaultResult];
}
