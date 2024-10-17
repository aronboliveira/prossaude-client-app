//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import { Person } from "@/lib/global/declarations/classes";
import {
  changeTabDCutLayout,
  evalActivityLvl,
  evalFactorAtleta,
  evalFactorAtvLvl,
  evalIMC,
  evalMatchTMBElements,
  evalPseudoNum,
  evaluatePGCDecay,
} from "./edFisNutModel";
import { checkReturnIndex, formatValue } from "./edFisNutController";
import { highlightChange, fadeElement } from "../../global/gStyleScript";
import { parseNotNaN, numberLimit, autoCapitalizeInputs, checkAutoCorrect, limitedError } from "../../global/gModel";
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
} from "../../global/handlers/errorHandler";
import {
  elCollection,
  entryEl,
  primitiveType,
  targEl,
  textEl,
  looseNum,
  nlHtEl,
  nlEl,
  IndCases,
  autofillResult,
  nlInp,
  NlMRef,
  nlSel,
  nlTab,
} from "../../global/declarations/types";
import { person, tabProps } from "@/vars";
import { ActiveTargInps, TargInps } from "@/lib/global/declarations/interfaces";
import { Gender, GordLvl, Intensity, NafTypeValue, Protocol } from "@/lib/global/declarations/testVars";
import { CacheEN as cen } from "./cache";
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
    <td class="tabCelAtFis tabCelAtFis${context}" id="tabCelRowAtFis${context}${count}_1">${count - 1}&#41</td>
    <td class="tabCelAtFis tabCelAtFis${context} tabCelLeft" id="tabCelRowAtFis${context}${count}_2">
      <input type="text" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText" id="tabInpRowAtFis${context}${count}_1"Nome da Atividade Física ${title} ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_Nome_${count - 1}" data-reqlength="3" required />
    <td class="tabCelAtFis tabCelAtFis${context} tabCelLeft" id="tabCelRowAtFis${context}${count}_3">
      <input type="number" min-length="1" max-length"5" min="0" max="255" class="inpAtivFis tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_2"Número de Semanas para a Atividade Física Proposta ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_NSemana_${
      count - 1
    }" data-reqlength="1" data-maxlength='3' data-minnum="0" data-maxnum="255" required />
    </td>
    <td class="tabCelAtFis tabCelAtFis${context}" id="tabCelRowAtFis${context}${count}_4">
      <input type="number" min-length="1" max-length="7" min="0" max="255" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_3"Tempo de Sessão Mínimo para Atividade Física ${title} ${
      count - 1
    }' data-title="Atividade_Fisica_${title}_SessãoMin_${
      count - 1
    }" data-reqlength="1" data-maxlength="3" data-minnum="0" data-maxnum="65535"required />
    </td>
    <td class="tabCelAtFis tabCelAtFis${context} tabCelRight" id="tabCelRowAtFis${context}${count}_5">
      <input type="number" min-length="1" max-length="7" min="0" max="255" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_4"Número de Meses para a Atividade Física ${title} ${
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
    return;
  } else elementNotFound(comorbContainer, "comorbContainer in switchRowComorb", extLine(new Error()));
}
export function switchAutoFill(autoFillBtn: targEl): void {
  if (!cen.locksinds || cen.locksinds.length === 0)
    cen.locksinds = Array.from(document.querySelectorAll(".lockTabInd"));
  const locksTabInd = cen.locksinds;
  try {
    if (
      !(
        autoFillBtn instanceof HTMLButtonElement ||
        (autoFillBtn instanceof HTMLInputElement &&
          (autoFillBtn.type === "checkbox" || autoFillBtn.type === "radio" || autoFillBtn.type === "button"))
      )
    )
      throw new Error(`Error validating typeof Autofill Button`);
    if (autoFillBtn.innerText.match(/Desativar C[aá]lculo Autom[aá]tico/gi))
      autoFillBtn.textContent = "Ativar Cálculo Automático";
    else if (autoFillBtn.innerText.match(/Ativar C[aá]lculo Autom[aá]tico/gi))
      autoFillBtn.textContent = "Desativar Cálculo Automático";
    locksTabInd?.length > 0 && locksTabInd.every(lockTabInd => lockTabInd instanceof HTMLElement)
      ? switchLockInputs(locksTabInd)
      : elementNotPopulated(locksTabInd, "locksTabInd", extLine(new Error()));
  } catch (e) {
    limitedError(`Error executing switchAutoFill:\n${(e as Error).message}`, "switchAutoFill");
  }
}
export function switchLockInputs(locksTabInd: targEl[]): void {
  try {
    locksTabInd.filter(l => l instanceof Element);
    if (locksTabInd.length === 0) throw new Error(`List of Locks empty`);
    locksTabInd.forEach((lock, i) => {
      const siblingInput = lock?.parentElement?.parentElement?.querySelector(".tabInpProg");
      try {
        if (
          !(
            siblingInput instanceof HTMLInputElement ||
            siblingInput instanceof HTMLSelectElement ||
            siblingInput instanceof HTMLTextAreaElement
          )
        )
          throw new Error(`Failed to validate siblingInput`);
        if (!(lock instanceof HTMLElement)) throw new Error(`Failed to validate lock instance`);
        if (tabProps.isAutoFillActive) {
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
      } catch (e) {
        console.error(`Error executing iteration ${i} for Locks change:\n${(e as Error).message}`);
      }
    });
  } catch (e) {
    console.error(`Error executing switchLockInputs:\n${(e as Error).message}`);
  }
}
export function getNumCol(evEl: targEl): void {
  try {
    if (!(evEl instanceof HTMLElement)) throw new Error(`Failed to validate instance of Targeted Element`);
    if (evEl.dataset.col && evEl.dataset.col !== "") tabProps.numCol = parseNotNaN(evEl.dataset.col, 2, "int");
    else {
      (evEl && evEl.id?.match(/[0-9]+_[0-9]+$/g)) ||
      (evEl instanceof HTMLInputElement && evEl.name?.match(/[0-9]+_[0-9]+$/g)) ||
      (evEl instanceof HTMLLabelElement && evEl.htmlFor?.match(/[0-9]+_[0-9]+$/g))
        ? (tabProps.numCol = parseNotNaN(evEl.id.slice(-1)) || 2)
        : matchError(".id do Elemento de Evento", evEl, evEl?.id ?? "null", extLine(new Error()));
    }
  } catch (e) {
    limitedError(`Error executing getNumCol:${(e as Error).message}`, "getNumCol");
  }
}
export function validateEvResultNum(evEl: targEl, prop: primitiveType = 0): number {
  try {
    if (
      !(
        (evEl instanceof HTMLInputElement && (evEl.type === "number" || evEl.type === "text")) ||
        evEl instanceof HTMLSelectElement ||
        evEl instanceof HTMLTextAreaElement
      )
    )
      throw new Error(`Invalid Event Target instance or type`);
    if (!(typeof prop === "number" || typeof prop === "string")) throw new Error(`Invalid typeof prop`);
    let returnedProperty: looseNum = 0;
    typeof prop === "number"
      ? (returnedProperty = (updateSimpleProperty(evEl) as number) || 0)
      : (returnedProperty = (updateSimpleProperty(evEl) as string) || 0);
    if (typeof returnedProperty === "number") prop = returnedProperty;
    else prop = parseNotNaN(returnedProperty.replaceAll(/[^0-9.,+-]/g, ""));
    if (!Number.isFinite(prop)) prop = 0;
    return prop;
  } catch (e) {
    console.error(`Error executing Validation of Event Result as a Number:\n${(e as Error).message}`);
    return 0;
  }
}
export function matchPersonPropertiesWH(): void {
  try {
    const tiw = tabProps.tiw,
      tih = tabProps.tih;
    if (!("weight" in person && typeof person.weight !== "number" && Number.isFinite(person.weight))) person.weight = 0;
    if (!("height" in person && typeof person.height !== "number" && Number.isFinite(person.height))) person.height = 0;
    tiw instanceof HTMLInputElement
      ? (person.weight = validateEvResultNum(tiw, person.weight))
      : inputNotFound(tiw, "tiw", extLine(new Error()));
    tih instanceof HTMLInputElement
      ? (person.height = validateEvResultNum(tih, person.height))
      : inputNotFound(tih, "tih", extLine(new Error()));
  } catch (e) {
    limitedError(`Error executing matchPersonPropertiesWH:${(e as Error).message}`, "matchPersonPropertiesWH");
  }
}
export function matchPersonPropertiesDC(): void {
  try {
    const tidc = tabProps.tidc;
    if (!("sumDCut" in person && typeof person.sumDCut !== "number" && Number.isFinite(person.sumDCut)))
      person.sumDCut = 0;
    tidc instanceof HTMLInputElement
      ? (person.sumDCut = validateEvResultNum(tidc, person.sumDCut))
      : inputNotFound(tidc, "tidc", extLine(new Error()));
  } catch (e) {
    limitedError(`Error execu:${(e as Error).message}`, "matchPersonPropertiesDC");
  }
}
export function updateIndexesContexts({ gl, fct }: { gl: targEl; fct: targEl }): void {
  //TODO REMOVER DEPOIS, FINS DE TESTE
  if (!gl) console.warn(`gl passed as void to updateIndexesContexts`);
  if (!fct) console.warn(`fct passed as void to updateIndeesContexts`);
  evalFactorAtleta();
  gl ??=
    tabProps.gl ?? document.getElementById("gordCorpLvl") ?? document.querySelector('[data-title*="Gordura Corporal"]');
  fct ??=
    tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
  try {
    if (!(person instanceof Person)) throw new Error(`Failed to validate person instance`);
    if (!(gl instanceof HTMLElement)) throw new Error(`Failed to validate instance of Element for Body Fat Level`);
    if (!(fct instanceof HTMLElement)) throw new Error(`Failed to validate instance of Element for Body Type`);
    const { l, v } = person.calcIMC(person);
    tabProps.IMC = parseNotNaN(v.toFixed(4));
    updateIMCContext({ els: { gl, fct }, imc: { l, v } });
    const { pgc, mlg } = person.calcPGC(person);
    tabProps.MLG = parseNotNaN(mlg.toFixed(4)) || 0;
    const timlg = tabProps.timlg;
    if (timlg instanceof HTMLInputElement || timlg instanceof HTMLSelectElement) formatValue(timlg, tabProps.MLG);
    tabProps.PGC = parseNotNaN(pgc.toFixed(4)) || 0;
    const tipgc = tabProps.tipgc;
    if (tipgc instanceof HTMLInputElement || tipgc instanceof HTMLSelectElement) formatValue(tipgc, tabProps.PGC);
    updateTMBContext(fct);
    evalFactorAtvLvl();
    if (!(tabProps.TMB && tabProps.TMB >= 0 && (tabProps.factorAtvLvl as number) >= 0)) throw new Error(`Invalid TMB`);
    updateGETContext(person);
  } catch (e) {
    limitedError(`Error executing updateIndexesContexts:\n${(e as Error).message}`, "updateIndexesContexts");
  }
}
export function updateIMCContext({
  els: { gl, fct },
  imc: { l, v },
  ignored,
}: {
  els: { gl: targEl; fct: targEl };
  imc: { l: GordLvl; v: number };
  ignored?: "IMC" | "MLG" | "BOTH" | "NONE";
}): void {
  try {
    gl ??=
      tabProps.gl ??
      document.getElementById("gordCorpLvl") ??
      document.querySelector('[data-title*="Gordura Corporal"]');
    if (!(gl instanceof HTMLSelectElement || gl instanceof HTMLInputElement))
      throw inputNotFound(gl, `Element for body fat level`, extLine(new Error()));
    fct ??=
      tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLSelectElement || gl instanceof HTMLInputElement))
      throw inputNotFound(fct, `Element for Protocol Formula`, extLine(new Error()));
    if (!(tabProps.tiimc instanceof HTMLInputElement || tabProps.tiimc instanceof HTMLSelectElement))
      throw inputNotFound(fct, `Target Input for IMC`, extLine(new Error()));
    if (!ignored || (ignored && !["IMC", "MLG", "BOTH"].includes(ignored))) ignored = "NONE";
    if (!(l === "abaixo" || l === "eutrofico" || l === "sobrepeso" || /obeso/g.test(l)))
      throw typeError("l", l, "string", extLine(new Error()));
    gl.value = l || "abaixo";
    fluxFormIMC(gl, fct);
    if (!(ignored === "IMC" || ignored === "BOTH")) formatValue(tabProps.tiimc, v);
  } catch (e) {
    limitedError(`Error executing updateIMCContext:\n${(e as Error).message}`, "updateIMCContext");
  }
}
export function fluxFormIMC(gl: targEl, fct: targEl): void {
  try {
    gl ??=
      tabProps.gl ??
      document.getElementById("gordCorpLvl") ??
      document.querySelector('[data-title=*"Gordura Corporal"]');
    if (!(gl instanceof HTMLSelectElement || gl instanceof HTMLInputElement))
      throw inputNotFound(gl, `Element for body fat level`, extLine(new Error()));
    fct ??=
      tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLInputElement))
      throw new Error(`Failed to validate instance of Element for Protocol Formula`);
    const naf =
      tabProps.naf ??
      document.getElementById("nafType") ??
      document.querySelector('[data-title*="Fator de Nível de Atividade Física"');
    if (!(naf instanceof HTMLSelectElement || naf instanceof HTMLInputElement))
      throw new Error(`Failed to validate instance of Level of Physical Activity element`);
    if (naf.value === "muitoIntenso") {
      if (!(fct.value === "tinsley")) highlightChange(fct);
      fct.value = "tinsley";
    } else {
      const IMC = tabProps.IMC ?? 0;
      if (IMC >= 0 && IMC < 25.0) {
        if (!(fct.value === "harrisBenedict")) highlightChange(fct);
        fct.value = "harrisBenedict";
        if (IMC < 18.5) {
          if (!(gl.value === "abaixo")) highlightChange(gl);
          gl.value = "abaixo";
        } else {
          if (!(gl.value === "eutrofico")) highlightChange(gl);
          gl.value = "eutrofico";
        }
      } else if (IMC >= 25.0) {
        if (!(fct.value === "mifflinStJeor")) highlightChange(fct);
        fct.value = "mifflinStJeor";
        if (IMC < 30) {
          if (!(gl.value === "sobrepeso")) highlightChange(gl);
          gl.value = "sobrepeso";
        } else if (IMC >= 30 && IMC < 35) {
          if (!(gl.value === "obeso1")) highlightChange(gl);
          gl.value = "obeso1";
        } else if (IMC >= 35 && IMC < 40) {
          if (!(gl.value === "obeso2")) highlightChange(gl);
          gl.value = "obeso2";
        } else if (IMC > 40) {
          if (!(gl.value === "obeso3")) highlightChange(gl);
          gl.value = "obeso3";
        }
      } else
        throw new Error(`Error obtaining IMC value in fluxFormIMC(), line ${extLine(new Error())}.
      Obtained value: ${IMC ?? "NaN"}`);
    }
  } catch (e) {
    limitedError(`Error executing fluxFormIMC:\n${(e as Error).message}`, "fluxFormIMC");
  }
}
export function updateTMBContext(fct: targEl): void {
  try {
    fct ??=
      tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLInputElement))
      throw new Error(`Failed to validate Formula Element`);
    evalFactorAtleta();
    const { l, v } = person.calcTMB(person);
    fct.value = l;
    tabProps.TMB = parseNotNaN(v.toFixed(4));
    const titmb = tabProps.titmb;
    if (titmb instanceof HTMLSelectElement || titmb instanceof HTMLInputElement)
      formatValue(tabProps.titmb as entryEl, tabProps.TMB);
  } catch (e) {
    limitedError(`Error executing updateTMBContext:\n${(e as Error).message}`, "updateTMBContext");
  }
}
export function updateGETContext(person: Person): void {
  tabProps.GET = parseNotNaN(person.calcGET().toFixed(4)) || 0;
  const tiget = tabProps.tiget;
  tiget instanceof HTMLInputElement || tiget instanceof HTMLSelectElement
    ? formatValue(tiget, tabProps.GET)
    : inputNotFound(tiget, "tiget em updateGETContext", extLine(new Error()));
}
export function matchTMBElements({
  idf,
  naf,
  gl,
  fct,
  sa,
}: {
  idf: string;
  naf: targEl;
  gl: targEl;
  fct: targEl;
  sa: targEl;
}): void {
  try {
    if (typeof idf !== "string") throw new Error(`Failed to validate target string`);
    gl ??=
      tabProps.gl ??
      document.getElementById("gordCorpLvl") ??
      document.querySelector('[data-title*="Gordura Corporal"]');
    if (!(gl instanceof HTMLSelectElement || gl instanceof HTMLInputElement))
      throw inputNotFound(gl, `Selector for Body Fat Level`, extLine(new Error()));
    fct ??=
      tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLInputElement))
      throw inputNotFound(fct, `Selector for TMB type formula`, extLine(new Error()));
    naf ??=
      tabProps.naf ??
      document.getElementById("nafType") ??
      document.querySelector('[data-title*="Fator de Nível de Atividade Física"');
    if (!(naf instanceof HTMLSelectElement || naf instanceof HTMLInputElement))
      throw inputNotFound(naf, `Selector for Intensity of Physical Activity`, extLine(new Error()));
    const spanFactorAtleta = tabProps.spanFa;
    if (!(spanFactorAtleta instanceof HTMLElement))
      throw elementNotFound(spanFactorAtleta, `Span for Athlete Factor`, extLine(new Error()));
    const lockGl = tabProps.lockGl;
    if (!(lockGl instanceof Element))
      throw elementNotFound(lockGl, `Element for Displaying Lock for Body Fat Level`, extLine(new Error()));
    //update em selects secundários (nível de gordura e fórmula)
    const switchSecSelects = (fct: entryEl): false | void => fct.value !== "tinsley" && fluxFormIMC(gl, fct);
    //garante coesão de selects primários (nível e fator)
    if (/LvlAtFis/gi.test(idf)) {
      switchSecSelects(fct);
      // mainSelect.value = nafType.value;
    } else if (/nafType/gi.test(idf)) {
      sa ??=
        tabProps.sa ??
        document.getElementById("selectLvlAtFis") ??
        document.querySelector('[data-title*="Nível de Atividade Física"]');
      if (!(sa instanceof HTMLInputElement || sa instanceof HTMLSelectElement))
        throw inputNotFound(sa, "Selector for Level of Physical Activity factor", extLine(new Error()));
      switchSecSelects(fct);
    } else stringError("testing idf in matchTMBElements()", idf, extLine(new Error()));
    if (naf.value === "muitoIntenso") {
      fct.value = "tinsley";
      spanFactorAtleta.hidden = false;
      fadeElement(spanFactorAtleta, "0");
      setTimeout(() => fadeElement(spanFactorAtleta, "1"), 500);
      fadeElement(lockGl, "0");
      setTimeout(() => {
        lockGl.innerHTML = `<svg
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
        fadeElement(lockGl, "1");
      }, 500);
    } else if (
      naf.value === "sedentario" ||
      naf.value === "leve" ||
      naf.value === "moderado" ||
      naf.value === "intenso"
    ) {
      setTimeout(() => {
        fadeElement(spanFactorAtleta, "0");
        setTimeout(() => (spanFactorAtleta.hidden = true), 500);
      }, 500);
      if (
        gl.value === "sobrepeso" ||
        gl.value === "obeso1" ||
        gl.value === "obeso2" ||
        gl.value === "obeso3" ||
        (tabProps.IMC && tabProps.IMC >= 25)
      )
        fct.value = "mifflinStJeor";
      else if (gl.value === "abaixo" || gl.value === "eutrofico" || (tabProps.IMC && tabProps.IMC < 25))
        fct.value = "harrisBenedict";
      else
        console.error(`Error obtaining the value for Body Fat, line ${extLine(new Error())}.
            Obtained level of Gordura Corporal: ${gl?.value};
            Obtained IMC: ${tabProps.IMC ?? 0}.`);
      fadeElement(lockGl, "0");
      setTimeout(() => {
        lockGl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><defs><linearGradient id="gradiente-lock" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(233, 180, 7)"></stop><stop offset="100%" style="stop-color:rgb(243, 221, 93)"></stop></linearGradient></defs><path d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4" class="svg-lock-hook"></path><path d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2" class="svg-lock-body"></path><line x1="5" y1="7" x2="11" y2="7" stroke="black"></line></svg>`;
        fadeElement(lockGl, "1");
      }, 500);
    } else
      console.error(`Error obtaining the value for Targeted Main Selector, line ${extLine(new Error())}.
          Obtained value: ${naf?.value ?? "undefined"}`);
  } catch (e) {
    console.error(`Error executing matchTMBElements:\n${(e as Error).message}`);
  }
}
export function updatePGC(parentEl: targEl | Document, ctx: string = "cons"): void {
  try {
    if (!(person instanceof Person)) throw new Error(`Failed to validate instance of person`);
    if (typeof ctx !== "string" || (ctx !== "cons" && ctx !== "col"))
      throw new Error(`Failed to validate context argument`);
    if (!(parentEl instanceof HTMLElement)) parentEl = document;
    const tidc = tabProps.tidc,
      tipgc = tabProps.tipgc;
    if ((tidc instanceof HTMLInputElement || tidc instanceof HTMLSelectElement) && tidc.type === "number") {
      person.sumDCut = parseNotNaN(tidc?.value) || 0;
      tidc.value = person.sumDCut.toString();
    } else inputNotFound(tidc, "tidc", extLine(new Error()));
    if ((tipgc instanceof HTMLInputElement || tipgc instanceof HTMLSelectElement) && tipgc.type === "number") {
      tabProps.PGC = parseNotNaN(person.calcPGC(person).pgc.toFixed(4)) ?? 0;
      evaluatePGCDecay(person, tipgc, tabProps.PGC)[0] === true
        ? formatValue(tipgc, tabProps.PGC)
        : formatValue(tipgc, tabProps.PGC, 2);
    } else inputNotFound(tipgc, "tipgc", extLine(new Error()));
  } catch (e) {
    console.error(`Error executing updatePGC:\n${(e as Error).message}`);
  }
}
export function updateAtvLvl(caller: "naf" | "sa"): void {
  try {
    evalFactorAtvLvl();
    if (!(tabProps.naf instanceof HTMLSelectElement || tabProps.naf instanceof HTMLInputElement))
      throw inputNotFound(tabProps.naf, `Validation of Selector for Physical Activity Factor`, extLine(new Error()));
    if (!(tabProps.sa instanceof HTMLSelectElement || tabProps.sa instanceof HTMLInputElement))
      throw inputNotFound(tabProps.sa, `Validation of Selector for Physical Activity Intensity`, extLine(new Error()));
    evalActivityLvl();
    caller === "naf" ? (tabProps.sa.value = tabProps.naf.value) : (tabProps.naf.value = tabProps.sa.value);
  } catch (e) {
    limitedError(`Error executing updateAtvLvl:${(e as Error).message}`, "updateAtvLvl");
  }
}
export function defineTargInps({
  el,
  parent,
  refs,
  ctx = "cons",
}: {
  el: targEl;
  parent: targEl;
  ctx: string;
  refs?: TargInps;
}): ActiveTargInps {
  const arrayTargInps: Array<[string, nlHtEl]> = [];
  try {
    if (!(el instanceof HTMLElement)) throw new Error(`Error validating instance of element`);
    if (!(parent instanceof HTMLElement)) throw new Error(`Error validating instance of ancestral`);
    if (typeof ctx !== "string") throw new Error(`Failed to validate typeof ctx value`);
    switch (ctx) {
      case "cons": {
        let num = evalPseudoNum(tabProps.numCons) || 1;
        if (
          refs &&
          Object.values(refs)
            .map((col: { [k: string]: NlMRef<nlInp> }) =>
              Object.values(col).every((t: NlMRef<nlInp>) => t?.current instanceof HTMLElement),
            )
            .every(colEval => colEval)
        ) {
          switch (num) {
            case 1:
              return Object.fromEntries(
                Object.entries(refs.firstCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
            case 2:
              return Object.fromEntries(
                Object.entries(refs.secondCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
            case 3:
              return Object.fromEntries(
                Object.entries(refs.thirdCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
            default:
              return Object.fromEntries(
                Object.entries(refs.firstCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
          }
        } else {
          //TODO REMOVER APÓS TESTE
          console.log("Nem toda referência foi validada");
          for (const [k, v] of [
            ["tiw", `#tabInpRowMedAnt2_${num + 1}`],
            ["tih", `#tabInpRowMedAnt3_${num + 1}`],
            ["tidc", `#tabInpRowDCut9_${num + 1}`],
            ["tiimc", `#inpImc${num}Cel2_${num + 1}`],
            ["timlg", `#inpMlg${num}Cel3_${num + 1}`],
            [`tipgc`, `#inpPgc${num}Cel4_${num + 1}`],
            ["titmb", `#inpTmb${num}Cel5_${num + 1}`],
            ["tiget", `#inpGet${num}Cel6_${num + 1}`],
          ])
            arrayTargInps.push([k, parent.querySelector(v)]);
          return Object.fromEntries(arrayTargInps) as {
            [k: string]: nlInp | undefined;
          } as any;
        }
      }
      case "col": {
        let num =
          el.dataset.col && el.dataset.col !== ""
            ? parseInt(el.dataset.col, 10)
            : /_/g.test(el.id)
            ? parseInt(el.id.slice(el.id.lastIndexOf("_") + 1).replace(/[^0-9]/g, ""), 10)
            : 1;
        if (!Number.isFinite(num)) num = 2;
        if (
          refs &&
          Object.values(refs)
            .map((col: { [k: string]: NlMRef<nlInp> }) =>
              Object.values(col).every((t: NlMRef<nlInp>) => t?.current instanceof HTMLElement),
            )
            .every(colEval => colEval)
        ) {
          switch (num) {
            case 2:
              return Object.fromEntries(
                Object.entries(refs.firstCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
            case 3:
              return Object.fromEntries(
                Object.entries(refs.secondCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
            case 4:
              return Object.fromEntries(
                Object.entries(refs.thirdCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
            default:
              return Object.fromEntries(
                Object.entries(refs.firstCol).map(([k, v]) => [k.replace(/[0-9]/g, ""), v?.current]),
              ) as any;
          }
        } else {
          //TODO REMOVER APÓS TESTE
          console.log("Nem toda referência foi validada");
          for (const [k, v] of [
            ["tiw", `#tabInpRowMedAnt2_${num}`],
            ["tih", `#tabInpRowMedAnt3_${num}`],
            ["tidc", `#tabInpRowDCut9_${num}`],
            ["tiimc", `#inpImc${num - 1}Cel2_${num}`],
            ["timlg", `#inpMlg${num - 1}Cel3_${num}`],
            [`tipgc`, `#inpPgc${num - 1}Cel4_${num}`],
            ["titmb", `#inpTmb${num - 1}Cel5_${num}`],
            ["tiget", `#inpGet${num - 1}Cel6_${num}`],
          ])
            arrayTargInps.push([k, parent.querySelector(v)]);
          return Object.fromEntries(arrayTargInps) as {
            [k: string]: nlInp | undefined;
          } as any;
        }
      }
      default: {
        return Object.fromEntries([
          ["tiw", undefined],
          ["tih", undefined],
          ["tidc", undefined],
          ["tiimc", undefined],
          ["timlg", undefined],
          [`tipgc`, undefined],
          ["titmb", undefined],
          ["tiget", undefined],
        ]) as any;
      }
    }
  } catch (e) {
    console.error(`Error executing defineTargInps:\n${(e as Error).message}`);
    return Object.fromEntries([
      ["tiw", undefined],
      ["tih", undefined],
      ["tidc", undefined],
      ["tiimc", undefined],
      ["timlg", undefined],
      [`tipgc`, undefined],
      ["titmb", undefined],
      ["tiget", undefined],
    ]) as any;
  }
}
export function switchRequiredCols({
  snc,
  fsp,
  td,
  tsv,
  tma,
  tip,
}: {
  snc: targEl;
  fsp: targEl;
  td: targEl;
  tsv: targEl;
  tma: targEl;
  tip: targEl;
}): void {
  const areNumConsOpsValid = tabProps.areNumConsOpsValid;
  try {
    if (!(snc instanceof HTMLSelectElement || snc instanceof HTMLInputElement))
      throw new Error(`Failed to validate instance of Number of Appointment Selector`);
    if (!(fsp instanceof HTMLElement)) throw new Error(`Failed to validate instance of Fieldset for Tabs`);
    if (!(td instanceof HTMLElement)) throw new Error(`Failed to validate instance of Table for Skin Folds`);
    if (!(tsv instanceof HTMLElement)) throw new Error(`Failed to validate instance of Table for Vital Signs`);
    if (!(tma instanceof HTMLElement)) throw new Error(`Failed to validate Table for Anthropometric measurements`);
    if (!(tip instanceof HTMLElement)) throw new Error(`Failed to validate instance of Table for Indexes`);
    if (!areNumConsOpsValid) throw new Error(`Invalidated Number of Appointments Options`);
    tabProps.numCons = evalPseudoNum(tabProps.numCons) || 1;
    const numCons = tabProps.numCons;
    if (typeof numCons !== "number" || numCons <= 0 || numCons > 3)
      throw new Error(`Invalidated Number for Appointment: Obtained value as ${numCons ?? "undefined"}`);
    //inicia construção de matriz para reset de required na tabela
    if (!cen.fsptb || cen.fsptb.length === 0) cen.fsptb = Array.from(fsp.querySelectorAll("table"));
    const tabs = cen.fsptb;
    if (tabs.length === 0) throw new Error(`No table was found in the fieldset`);
    if (!cen.fsptrs || cen.fsptrs.length === 0) cen.fsptrs = Array.from(fsp.querySelectorAll("tr"));
    const trs = cen.fsptrs;
    if (trs.length === 0) throw new Error(`No table row was found in the fieldset.`);
    if (!cen.fspcols || cen.fspcols.length === 0) cen.fspcols = Array.from(fsp.querySelectorAll("col"));
    const cols = cen.fspcols;
    if (cols.length === 0) throw new Error(`No table col was found in the fieldset`);
    const nTotalRows = trs.length - tabs.length,
      nTotalCols = cols.length - tabs.length;
    if (!(nTotalRows > 0 && nTotalCols > 0))
      throw new Error(`Failed to calculate Number of Total Rows and/or Total Columns.
      Number of Rows: ${nTotalRows}
      Number of Columns: ${nTotalCols}`);
    if (!cen.tsvis || cen.tsvis.length === 0) cen.tsvis = Array.from(tsv.querySelectorAll(".tabInpProgSVi"));
    if (!cen.tmais || cen.tmais.length === 0) cen.tmais = Array.from(tma.querySelectorAll(".tabInpProgMedAnt"));
    if (!cen.dcis || cen.dcis.length === 0) cen.dcis = Array.from(td.querySelectorAll(".tabInpProg"));
    if (!cen.indis || cen.dcis.length === 0) cen.indis = Array.from(tip.querySelectorAll(".inpInd"));
    const matrix = nTotalRows * nTotalCols,
      inpsSvi = cen.tsvis,
      inpsMedAnt = cen.tmais,
      inpsDC = cen.dcis,
      inpsInd = cen.indis,
      inpsCells = [...inpsSvi, ...inpsMedAnt, ...inpsDC, ...inpsInd];
    //reseta o atributo required das cells para novas atribuições de required
    if (!(inpsCells.length > 0 && inpsCells.length === matrix / tabs.length))
      throw new Error(`Error defining .length of <input> array in the cells.
    Obtained number: ${inpsCells.length ?? 0};
    Equals to the desired number for filling the axes: ${inpsCells.length === matrix};
    Accepted number: ${matrix / tabs.length};
    Obtained number of <input> Elements for Sinais Vitais: ${inpsSvi?.length ?? 0};
    Obtained number of <input> Elements for Medidas Antropométricas: ${inpsMedAnt?.length ?? 0};
    Obtained number of <input> Elements for Dobras Cutâneas: ${inpsDC?.length ?? 0};
    Obtained numbe of <input> Elements for Índices e Percentuais: ${inpsInd?.length ?? 0}.`);
    for (const i of inpsCells) {
      if (!(i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement || i instanceof HTMLSelectElement))
        continue;
      i.required = false;
    }
    const listValidations = [
      validateTabInpList(inpsSvi, defineAxes(tsv)),
      validateTabInpList(inpsMedAnt, defineAxes(tma)),
      validateTabInpList(inpsDC, defineAxes(td)),
      validateTabInpList(inpsInd, defineAxes(tip)),
    ];
    //validação de NodeLists para inputs nas tabelas
    if (listValidations.some(v => !v))
      throw new Error(`Error validating NodeLists of inputs in tables.
    Obtained validation array for NodeLists: ${listValidations.toString()}`);
    const reqSV: Array<nlEl[]> = [],
      reqMA: Array<nlEl[]> = [],
      reqDC: Array<nlEl[]> = [],
      reqPI: Array<nlEl[]> = [];
    /* percorre a tabela usando o número de consulta como números de ciclos
        ou seja, length dos arrays formados pelas querries === length do número de consulta === número de colunas
        + são extraídas as células de interesse, com base na .id relativa à coluna, e então populam requiredCels */
    for (let iC = 0; iC < numCons; iC++) {
      const pattern = new RegExp(`_${iC + 2}`);
      reqSV.push(filterCellsPattern({ inps: inpsSvi, pattern }));
      reqMA.push(filterCellsPattern({ inps: inpsMedAnt, pattern }));
      reqDC.push(filterCellsPattern({ inps: inpsDC, pattern }));
      reqPI.push(filterCellsPattern({ inps: inpsInd, pattern, attr: "name" }));
    }
    const flatRequiredCells = [...reqSV, ...reqMA, ...reqDC, ...reqPI].flat(1);
    if (!(flatRequiredCells?.length > 0 && flatRequiredCells.length === nTotalRows * numCons))
      throw new Error(`Failed to validate number of required inputs for tables`);
    for (const i of flatRequiredCells) {
      highlightChange(i, "red", "both");
      if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement || i instanceof HTMLSelectElement)
        i.required = true;
    }
  } catch (e) {
    console.error(`Error executing switchRequiredCols:\n${(e as Error).message}`);
  }
}
export function defineAxes(tab: targEl): number {
  try {
    if (!(tab instanceof HTMLTableElement)) throw new Error(`Failed to validate Table instance`);
    if (tab.rows.length === 0) throw new Error(`No row was found for table`);
    let nCols: elCollection;
    if (tab.id !== "" && (!cen.lists[tab.id] || cen.lists[tab.id].length === 0))
      cen.lists[tab.id] = tab.querySelectorAll("col");
    nCols = cen.lists[tab.id];
    if (nCols.length === 0) throw new Error(`No col was found for table`);
    return (tab.rows.length - 1) * (nCols.length - 1) ?? 0;
  } catch (e) {
    limitedError(
      `Error executing defineAxes:${(e as Error).message}`,
      `${tab?.id || tab?.className || tab?.tagName || "defineAxes"}`,
    );
    return 0;
  }
}
export function validateTabInpList(list: elCollection, nAxes: number = 4): boolean {
  try {
    if (!("length" in validateTabInpList)) throw new Error(`Passed object is not a List`);
    list = Array.from(list).filter(
      e => e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement,
    );
    if (list.length === 0) throw new Error(`List has no Entry Elements`);
    if (typeof nAxes !== "number") throw new Error(`Invalid type of nAxes`);
    return list.length === nAxes ? true : false;
  } catch (e) {
    limitedError(`Error executing validateTabInpList:\n${(e as Error).message}`, "validateTabInpList");
    return false;
  }
}
export function filterCellsPattern({
  inps,
  pattern,
  attr = "id",
}: {
  inps: elCollection;
  pattern: RegExp;
  attr?: "id" | "name";
}) {
  try {
    if (!("length" in inps)) throw new Error(`inps argument is not a list`);
    if (!(pattern instanceof RegExp)) throw new Error(`Failed to validate instance of Pattern argument`);
    if (attr !== "id" && attr !== "name") throw new Error(`Failed to validate typeof attr argument`);
    inps = Array.from(inps).filter(
      e => e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement,
    );
    if (inps.length === 0) throw new Error(`List has no Entry elements`);
    let filterInpCell: Element[] = [];
    switch (attr) {
      case "id":
        filterInpCell = Array.from(inps).filter(inp => pattern.test(inp.id));
        break;
      case "name":
        filterInpCell = Array.from(inps).filter(inp => pattern.test((inp as HTMLInputElement).name));
        break;
      default:
        stringError("argument for attr in filterCellsPatern()", attr, extLine(new Error()));
    }
    if (filterInpCell.length === 0) throw new Error(`Failed to populate list of filtered elements`);
    return filterInpCell;
  } catch (e) {
    limitedError(
      `Error executing filterCellsPattern:\n${(e as Error).message}`,
      pattern?.toString() || "filterCellsPattern",
    );
    return [];
  }
}
export function switchNumConsTitles(
  titles: elCollection,
  el: targEl,
  numTitled: number = 1,
  numTabs: number = 1,
): void {
  try {
    if (!("length" in titles)) throw new Error(`Title List is empty.`);
    if (!(el instanceof HTMLSelectElement || el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement))
      throw new Error(`Failed to validate instance of Caller Element`);
    if (typeof numTitled !== "number" || numTitled === 0 || !Number.isFinite(numTitled))
      throw new Error(`Failed to validate typeof Number of Titled`);
    if (typeof numTabs !== "number" || numTitled === 0 || !Number.isFinite(numTabs))
      throw new Error(`Failed to validate number of Tables`);
    titles = Array.from(titles).filter(t => t instanceof HTMLElement);
    if (titles.length === 0) throw new Error(`No HTMLElement was found for the titles list`);
    let iniValue = parseNotNaN(el.value, 1, "int") || 1;
    if (!cen.ncthc || cen.ncthc.length === 0) cen.ncthc = Array.from(document.querySelectorAll(".numConsTextHeadCel"));
    cen.ncthc.forEach(h => {
      if (!(h instanceof HTMLElement)) return;
      let col = parseNotNaN(
        h.dataset.col &&
          h.dataset.col !== "" &&
          Number.isFinite(parseNotNaN(h.dataset.col.replace(/[^0-9]/g, ""), 2, "int"))
          ? h.dataset.col.replace(/[^0-9]/g, "")
          : `${/_/g.test(h.id) ? h.id.slice(h.id.lastIndexOf("_") + 1).replace(/[^0-9]/g, "") : 2}`,
        2,
        "int",
      );
      if (col <= 1) {
        console.warn(`Failed to assing col for switch. Defaulting.`);
        col = 2;
      }
      h.innerText = `${col - 2 + iniValue}ª Consulta`;
    });
    if (!cen.tip || cen.tip.length === 0) cen.tip = Array.from(document.querySelectorAll(".tabInpProg"));
    cen.tip.forEach((inp, i) => {
      if (!(inp instanceof HTMLElement)) return;
      if (!inp.dataset.title) return;
      try {
        let col = parseNotNaN(
          inp.dataset.col &&
            inp.dataset.col !== "" &&
            Number.isFinite(parseNotNaN(inp.dataset.col.replace(/[^0-9]/g, ""), 2, "int"))
            ? inp.dataset.col.replace(/[^0-9]/g, "")
            : `${/_/g.test(inp.id) ? inp.id.slice(inp.id.lastIndexOf("_") + 1).replace(/[^0-9]/g, "") : 2}`,
          2,
          "int",
        );
        const relHeader = inp.closest("form")?.querySelector(`.numConsTextHeadCell[data-col="${col}"]`);
        if (!(relHeader instanceof HTMLElement)) return;
        const consNum = relHeader.innerText.match(/\d+/g);
        if (!consNum) return;
        inp.dataset.title = /Consulta/gi.test(inp.dataset.title)
          ? inp.dataset.title.replace(/(Consulta\s)\d+/gi, `$1${consNum[0]}`)
          : `Consulta ${consNum[0]}`;
        if (!inp.dataset.xls) return;
        inp.dataset.xls = /Consulta/gi.test(inp.dataset.xls)
          ? inp.dataset.xls.replace(/(Consulta\s)\d+/gi, `$1${consNum[0]}`)
          : `Consulta ${consNum[0]}`;
      } catch (e) {
        console.error(
          `Error validating iteration ${i} for renaming titles for Table Progress Inputs:\n${(e as Error).message}`,
        );
      }
    });
  } catch (e) {
    console.error(`Error executing switchNumConsTitles:\n${(e as Error).message}`);
  }
}
export function handleSumClick(ev: React.MouseEvent, refs: { prt: targEl; td: targEl; fsp: targEl }): void {
  const { prt, td, fsp } = refs;
  try {
    if (!(prt instanceof HTMLSelectElement || prt instanceof HTMLInputElement))
      throw elementNotFound(prt, `prt Element`, extLine(new Error()));
    if (!(td instanceof HTMLElement)) throw new Error(`Failed to validate Table of Skin Folds reference`);
    if (typeof person !== "object" || !("sumDCut" in person))
      throw typeError(`validating typeof person object`, "person", "object", extLine(new Error()));
    if (!cen.dctrs || cen.dctrs.length === 0) cen.dctrs = Array.from(td.querySelectorAll(".tabRowDCutMed"));
    const rowsDCArray = cen.dctrs.filter(rowDC => rowDC instanceof HTMLTableRowElement);
    if (!(ev.currentTarget instanceof HTMLElement)) throw new Error(`Failed to validate event target instance`);
    person.sumDCut = createArraysRels({
      btn: ev.currentTarget,
      arrayRows: rowsDCArray,
      protocolValue: prt.value as Protocol,
    });
    if (!Number.isFinite(person.sumDCut) || person.sumDCut < 0) person.sumDCut = 0;
    if (
      !(
        tabProps.isAutoFillActive &&
        person instanceof Person &&
        (tabProps.tiget instanceof HTMLInputElement ||
          tabProps.tiget instanceof HTMLSelectElement ||
          tabProps.tiget instanceof HTMLTextAreaElement) &&
        person.age >= 0
      )
    )
      return;
    getNumCol(ev.currentTarget);
    updatePGC(fsp ?? document.getElementById("fsProgConsId"), "col");
  } catch (e) {
    limitedError(
      `Error executing callback for Button for Sum of Skin Folds:\n${(e as Error).message}`,
      "handleSumClick",
    );
  }
}
export function createArraysRels({
  btn,
  arrayRows,
  protocolValue,
}: {
  btn: HTMLElement;
  arrayRows: Element[];
  protocolValue: Protocol;
}): number {
  const btnId = btn.id;
  let colAcc = 0;
  try {
    if (!("length" in arrayRows)) throw new Error(`List not validated as such`);
    if (typeof btnId !== "string") throw new Error(`Failed to validate typeof Button Id as argumented`);
    if (!(btnId?.match(/(?<=_)[0-9]+/) && btnId?.match(/[0-9]+(?=_)/))) throw new Error(`Id pattern invalid`);
    if (typeof protocolValue !== "string") throw new Error(`Failed to validate typeof Protocol Value`);
    if (protocolValue !== "pollock3" && protocolValue !== "pollock7")
      throw new Error(`Failed to validate string for protocol value`);
    const btnCol =
        btn.dataset.col && btn.dataset.col !== ""
          ? evalPseudoNum(btn.dataset.col) || 2
          : parseNotNaN(
              btnId
                .match(/(?<=_)[0-9]+/)
                ?.at(0)
                ?.toString() || "0",
              2,
              "int",
            ),
      targColInps = arrayRows.map(row => {
        if (row.id !== "" && (!cen.targs[`${row.id}__inputs`] || cen.targs[`${row.id}__inputs`].length === 0))
          cen.targs[`${row.id}__inputs`] = Array.from(row.querySelectorAll("input"));
        const list = cen.targs[`${row.id}__inputs`];
        return list && list.length > 0
          ? Array.from(list).filter(inp =>
              inp instanceof HTMLElement && inp.dataset.col && inp.dataset.col !== ""
                ? inp.dataset.col === btn.dataset.col
                : (inp as any).id.match(`_${btnCol.toString()}`) ?? false,
            )[0]
          : Array.from(row.querySelectorAll("input")).filter(inp =>
              inp instanceof HTMLElement && inp.dataset.col && inp.dataset.col !== ""
                ? inp.dataset.col === btn.dataset.col
                : inp.id.match(`_${btnCol.toString()}`) ?? false,
            )[0];
      }),
      inpsIds = targColInps.map(inp => (inp as any).id);
    if (inpsIds.length !== arrayRows.length) throw new Error(`Error validating length of columnValues.`);
    //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
    const protocoloNum = parseNotNaN(protocolValue.slice(-1));
    if (!(protocoloNum === 3 || protocoloNum === 7))
      throw new Error(`Error obtaining the protocol number.
      Obtained number: ${protocoloNum ?? 0}`);
    for (let iC = 0; iC < arrayRows.length; iC++) {
      if (
        !(
          arrayRows[iC] instanceof HTMLInputElement ||
          arrayRows[iC] instanceof HTMLSelectElement ||
          arrayRows[iC] instanceof HTMLTextAreaElement
        ) ||
        ((arrayRows[iC] instanceof HTMLInputElement ||
          arrayRows[iC] instanceof HTMLSelectElement ||
          arrayRows[iC] instanceof HTMLTextAreaElement) &&
          (arrayRows[iC] as HTMLElement).hidden === true)
      )
        continue;
      colAcc += parseNotNaN((targColInps[iC] as HTMLInputElement).value);
    }
    const sumInp = document.getElementById(`tabInpRowDCut9_${btnCol}`);
    if (
      !(
        sumInp instanceof HTMLInputElement ||
        sumInp instanceof HTMLSelectElement ||
        sumInp instanceof HTMLTextAreaElement
      )
    )
      throw new Error(`Error finding input for sum of skin folds.`);
    sumInp.value = colAcc.toString();
    return colAcc;
  } catch (e) {
    console.error(`Error executing createArraysRels:\n${(e as Error).message}`);
  }
  return colAcc;
}
export function handleIndEv(
  ctx: IndCases,
  ctxEls: { el: targEl; fsp: targEl; gl: targEl; fct: targEl; refs: TargInps | null },
): void {
  let { el, fsp, gl, fct, refs } = ctxEls;
  try {
    if (
      !(
        el instanceof HTMLButtonElement ||
        el instanceof HTMLSelectElement ||
        (el instanceof HTMLInputElement &&
          (el.type === "text" || el.type === "number" || el.type === "button" || el.type === "submit"))
      )
    )
      throw elementNotFound(el, `Validation of Activated Element`, extLine(new Error()));
    getNumCol(el);
    if (!Number.isFinite(tabProps.numCol)) tabProps.numCol = 2;
    evalFactorAtleta();
    const consTablesFs = fsp ?? document.getElementById("fsProgConsId");
    if (!(consTablesFs instanceof HTMLElement))
      throw elementNotFound(consTablesFs, `Cons Table Fieldset`, extLine(new Error()));
    if (tabProps.isAutoFillActive) {
      const { tiw, tih, tidc, tiimc, timlg, titmb, tiget, tipgc } = defineTargInps({
        el,
        parent: fsp,
        refs: refs ?? undefined,
        ctx,
      });
      console.log([
        tiw ?? "NOT FOUND",
        tih ?? "NOT FOUND",
        tidc ?? "NOT FOUND",
        tiimc ?? "NOT FOUND",
        timlg ?? "NOT FOUND",
        titmb ?? "NOT FOUND",
        tiget ?? "NOT FOUND",
        tipgc ?? "NOT FOUND",
      ]);
      Object.assign(tabProps, {
        tiw,
        tih,
        tidc,
        tiimc,
        timlg,
        titmb,
        tiget,
        tipgc,
      });
      updatePGC(consTablesFs, "col");
      for (const t of [
        tabProps.tiw,
        tabProps.tih,
        tabProps.tiimc,
        tabProps.timlg,
        tabProps.titmb,
        tabProps.tiget,
        tabProps.tiget,
        tabProps.tidc,
      ])
        if (t instanceof HTMLElement) t.dataset.target = "true";
    } else {
      if (!cen.indisDoc || cen.indisDoc.length === 0)
        cen.indis = Array.from(document.querySelectorAll(".tabInpProgIndPerc"));
      if (!cen.wis || cen.wis.length === 0) cen.wis = Array.from(document.querySelectorAll(".inpWeight"));
      if (!cen.his || cen.his.length === 0) cen.his = Array.from(document.querySelectorAll(".inpHeight"));
      if (!cen.dcisDoc || cen.dcisDoc.length === 0)
        cen.dcisDoc = Array.from(document.querySelectorAll(".tabInpProgDCut"));
      const dcis = cen.dcisDoc,
        his = cen.his,
        wis = cen.wis,
        indis = cen.indis;
      [...dcis, ...his, ...wis, ...indis].forEach(targInp => {
        if (!(targInp instanceof HTMLElement)) return;
        if (targInp.dataset[`autofill`]) targInp.dataset[`autofill`] = "false";
        else targInp.setAttribute("data-autofill", "false");
      });
    }
    if (ctx !== "BTN" && ctx !== "IMC" && ctx !== "MLG" && ctx !== "TMB" && ctx !== "GET" && ctx !== "PGC")
      throw stringError(
        `validation of ctx argument in handleIndEv for ${el.id || el.tagName}`,
        ctx,
        extLine(new Error()),
      );
    ctx = ctx.toUpperCase() as IndCases;
    switch (ctx) {
      case "BTN":
        break;
      case "IMC":
        tabProps.IMC = checkReturnIndex(tabProps.tiimc, tabProps.IMC);
        break;
      case "MLG":
        tabProps.MLG = checkReturnIndex(tabProps.timlg, tabProps.MLG);
        break;
      case "TMB":
        tabProps.TMB = checkReturnIndex(tabProps.titmb, tabProps.TMB);
        break;
      case "GET":
        tabProps.GET = checkReturnIndex(tabProps.tiget, tabProps.GET);
        break;
      case "PGC":
        tabProps.PGC = checkReturnIndex(tabProps.tiget, tabProps.PGC);
        break;
      default:
        stringError("value for callbackTabBtnsInps() ctx", ctx, extLine(new Error()));
    }
    fct ??=
      tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLElement))
      throw elementNotFound(fct, `Instance of Form TMB Type Element`, extLine(new Error()));
    if (ctx === "BTN" || tabProps.isAutoFillActive) {
      matchPersonPropertiesWH();
      if (typeof tabProps.factorAtvLvl !== "number")
        throw typeError(`typeof FactorAtvLvl`, tabProps.factorAtleta, `number`, extLine(new Error()));
      evalFactorAtleta();
      //UPDATE AUTOMÁTICO DE VALUES DOS INPUTS AQUI
      updateIndexesContexts({ gl, fct });
    }
  } catch (e) {
    console.error(
      `Error executing handleIndEv with ${el?.id || el?.className || el?.tagName}:\n${(e as Error).message}`,
    );
  }
}
export function exeAutoFill(el: targEl, context: string = "cons"): autofillResult {
  let numRef = 1;
  const iniResult = {
    ncl: numRef || 1,
    ps: {
      w: person.weight || 0,
      h: person.height || 0,
      sd: person.sumDCut || 0,
    },
    i: {
      imc: tabProps.IMC ?? 0,
      mlg: tabProps.MLG ?? 0,
      tmb: tabProps.TMB ?? 0,
      get: tabProps.GET ?? 0,
      pgc: tabProps.PGC ?? 0,
    },
    ts: {
      tiw: tabProps.tiw,
      tih: tabProps.tih,
      tii: tabProps.tiimc,
      tim: tabProps.timlg,
      tit: tabProps.titmb,
      tidc: tabProps.tidc,
      tip: tabProps.tiget,
    },
  };
  try {
    const fsp = tabProps.fsp ?? document.getElementById("fsProgConsId"),
      gl = tabProps.gl ?? document.getElementById("gordCorpLvl"),
      fct = tabProps.fct ?? document.getElementById("formCalcTMBType");
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement))
      throw new Error(`Failed to validate target instance`);
    if (!(person instanceof Person)) throw new Error(`Failed to validate person instance`);
    if (typeof context !== "string") throw new Error(`Failed to validate typeof context argument`);
    if (context === "cons") {
      const selectNumCons = tabProps.sa ?? document.getElementById("selectNumCons");
      selectNumCons instanceof HTMLInputElement || selectNumCons instanceof HTMLSelectElement
        ? (tabProps.numCons = evalPseudoNum(selectNumCons?.value || "1") || 1)
        : inputNotFound(selectNumCons, "selectNumCons in exeAutoFill()", extLine(new Error()));
      numRef = evalPseudoNum(tabProps.numCons) || 1;
    } else {
      getNumCol(el);
      numRef = Number.isFinite(tabProps.numCol) ? tabProps.numCol || 2 : 2;
    }
    return runAutoFill({ el, fsp, gl, fct }, context);
  } catch (e) {
    console.error(`Error executing exeAutoFill:\n${(e as Error).message}`);
    return iniResult;
  }
}
export function runAutoFill(
  contextEls: { el: targEl; fsp: targEl; gl: targEl; fct: targEl },
  ctx: string = "cons",
  refs?: TargInps,
): autofillResult {
  let arrIndexes: number[] = [],
    arrtargInps: targEl[] = [];
  const { el, fsp, gl, fct } = contextEls,
    numRef =
      ctx === "cons"
        ? evalPseudoNum(tabProps.numCons) || 1
        : el instanceof HTMLElement && el.dataset.col && el.dataset.col !== ""
        ? parseNotNaN(el.dataset.col || "2", 2, "int") ||
          (/_/g.test(el.id)
            ? parseNotNaN(el.id.slice(el.id.lastIndexOf("_") + 1) || "2", 2, "int")
            : evalPseudoNum(tabProps.numCol) || 2)
        : evalPseudoNum(tabProps.numCol) || 2;
  if (!cen.indisDoc || cen.indisDoc.length === 0)
    cen.indis = Array.from(document.querySelectorAll(".tabInpProgIndPerc"));
  if (!cen.wis || cen.wis.length === 0) cen.wis = Array.from(document.querySelectorAll(".inpWeight"));
  if (!cen.his || cen.his.length === 0) cen.his = Array.from(document.querySelectorAll(".inpHeight"));
  if (!cen.dcisDoc || cen.dcisDoc.length === 0) cen.dcisDoc = Array.from(document.querySelectorAll(".tabInpProgDCut"));
  const indis = cen.indis,
    wis = cen.wis,
    his = cen.his,
    dcis = cen.dcisDoc;
  [...indis, ...his, ...wis, ...dcis].forEach(t => {
    if (t instanceof HTMLElement) t.dataset[`target`] = "false";
    else t?.setAttribute("data-target", "false");
  });
  const { tiw, tih, tidc, tiimc, timlg, titmb, tiget, tipgc } = defineTargInps({ el, parent: fsp, refs, ctx });
  console.log([
    tiw ?? "NOT FOUND",
    tih ?? "NOT FOUND",
    tidc ?? "NOT FOUND",
    tiimc ?? "NOT FOUND",
    timlg ?? "NOT FOUND",
    titmb ?? "NOT FOUND",
    tiget ?? "NOT FOUND",
    tipgc ?? "NOT FOUND",
  ]);
  Object.assign(tabProps, {
    tiw,
    tih,
    tidc,
    tiimc,
    timlg,
    titmb,
    tiget,
    tipgc,
  });
  [
    tabProps.tiw,
    tabProps.tih,
    tabProps.tiimc,
    tabProps.timlg,
    tabProps.titmb,
    tabProps.tiget,
    tabProps.tiget,
    tabProps.tidc,
  ].forEach(targ => {
    if (targ instanceof HTMLElement) targ.dataset[`target`] = "true";
    else targ?.setAttribute("data-target", "true");
  });
  matchPersonPropertiesWH();
  matchPersonPropertiesDC();
  updateIndexesContexts({ gl, fct });
  updatePGC(fsp, ctx);
  arrIndexes.push(tabProps.PGC ?? 0);
  arrtargInps.push(tabProps.tidc, tabProps.tiget);
  [
    { k: "tiimc", v: tabProps.IMC?.toString() ?? "0" },
    { k: "timlg", v: tabProps.MLG?.toString() ?? "0" },
    { k: "titmb", v: tabProps.TMB?.toString() ?? "0" },
    { k: "tiget", v: tabProps.GET?.toString() ?? "0" },
    { k: "tipgc", v: tabProps.PGC?.toString() ?? "0" },
  ].forEach(({ k, v }, i) => {
    try {
      const inputElement = tabProps[k as keyof typeof tabProps] as Element;
      if (
        !(
          inputElement instanceof HTMLInputElement ||
          inputElement instanceof HTMLSelectElement ||
          inputElement instanceof HTMLTextAreaElement
        )
      )
        throw elementNotFound(inputElement, `Targeted input element ${k}`, extLine(new Error()));
      inputElement.value = v;
    } catch (e) {
      console.error(
        `Error executing iteration ${i} for assigning the values for the target inputs:\n${(e as Error).message}`,
      );
    }
  });
  return {
    ncl: numRef || 1,
    ps: {
      w: person.weight || 0,
      h: person.height || 0,
      sd: person.sumDCut || 0,
    },
    i: {
      imc: tabProps.IMC ?? 0,
      mlg: tabProps.MLG ?? 0,
      tmb: tabProps.TMB ?? 0,
      get: tabProps.GET ?? 0,
      pgc: tabProps.PGC ?? 0,
    },
    ts: {
      tiw: tabProps.tiw,
      tih: tabProps.tih,
      tii: tabProps.tiimc,
      tim: tabProps.timlg,
      tit: tabProps.titmb,
      tidc: tabProps.tidc,
      tip: tabProps.tiget,
    },
  };
}
export function callbackTextBodyEl({
  gr,
  gar,
  gbr,
  prt,
  td,
  txbr,
}: {
  gr: NlMRef<nlSel>;
  gar: NlMRef<nlSel>;
  gbr: NlMRef<nlSel>;
  prt: NlMRef<nlSel>;
  td: NlMRef<nlTab>;
  txbr: NlMRef<nlSel>;
}): [string, string, string] {
  const textBodytype = txbr?.current ?? document.getElementById("textBodytype"),
    protocolo = prt?.current ?? document.getElementById("tabSelectDCutId"),
    tde = td?.current ?? document.getElementById("tabDCut"),
    genElement = gr?.current ?? document.getElementById("genId"),
    genBirthRel = gbr?.current ?? document.getElementById("genBirthRelId"),
    genFisAlin = gar?.current ?? document.getElementById("genFisAlinId");
  try {
    if (typeof person !== "object")
      throw typeError(`typeof person in callback for Text Body Element`, person, `object`, extLine(new Error()));
    if (!(textBodytype instanceof HTMLSelectElement || textBodytype instanceof HTMLInputElement))
      throw elementNotFound(textBodytype, `Text Body Type Element`, extLine(new Error()));
    if (!(protocolo instanceof HTMLSelectElement || protocolo instanceof HTMLInputElement))
      throw elementNotFound(protocolo, `Protocolo Element`, extLine(new Error()));
    if (!(tde instanceof HTMLTableElement)) throw elementNotFound(tde, `Table of Skin Folds`, extLine(new Error()));
    if (!(genElement instanceof HTMLSelectElement || genElement instanceof HTMLInputElement))
      throw elementNotFound(genElement, `Gender Element`, extLine(new Error()));
    if (!(genBirthRel instanceof HTMLSelectElement || genBirthRel instanceof HTMLInputElement))
      throw elementNotFound(genBirthRel, `Gender Birth Relation Element`, extLine(new Error()));
    if (!(genFisAlin instanceof HTMLSelectElement || genFisAlin instanceof HTMLInputElement))
      throw elementNotFound(genFisAlin, `Gen Physical Alignment Element`, extLine(new Error()));
    changeTabDCutLayout(protocolo, tde, textBodytype);
    person.gen = textBodytype.value as Gender;
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
export function callbackAtvLvlElementNaf(
  idf: string,
  { sa, gl, naf, fct }: { sa: targEl; gl: targEl; naf: targEl; fct: targEl },
): void {
  try {
    if (!(person instanceof Person)) throw new Error(`Failed to validate patient person instance`);
    sa ??=
      tabProps.sa ??
      document.getElementById("selectLvlAtFis") ??
      document.querySelector('[data-title*="Nível de Atividade Física"]');
    if (!(sa instanceof HTMLSelectElement || sa instanceof HTMLInputElement))
      throw inputNotFound(sa, `Validation of Selector for Level of Physical activity`, extLine(new Error()));
    gl ??=
      tabProps.gl ??
      document.getElementById("gordCorpLvl") ??
      document.querySelector('[data-title*="Gordura Corporal"]');
    if (!(gl instanceof HTMLSelectElement || sa instanceof HTMLInputElement))
      throw inputNotFound(gl, `Validation of Selector for Level of Body Fat`, extLine(new Error()));
    naf ??=
      tabProps.naf ??
      document.getElementById("nafType") ??
      document.querySelector('[data-title*="Fator de Nível de Atividade Física"');
    if (!(naf instanceof HTMLSelectElement || naf instanceof HTMLInputElement))
      throw inputNotFound(
        naf,
        `Validation of Selector for Factor for Level of Physical activity`,
        extLine(new Error()),
      );
    fct ??=
      tabProps.fct ?? document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLSelectElement))
      throw inputNotFound(fct, `Validation of Selector for Formula of Protocol`, extLine(new Error()));
    if (![sa.id, gl?.id ?? "gordCorpLvl", naf.id, fct.id].includes(idf))
      throw new Error(`Identifier for callback invalid`);
    evalFactorAtvLvl();
    evalIMC();
    fluxFormIMC(gl, fct);
    evalMatchTMBElements();
    if (/LvlAtFis/gi.test(idf) || /TMBType/gi.test(idf) || /gordCorpLvl/gi.test(idf)) {
      matchTMBElements({ idf, sa, gl, fct, naf });
      updateAtvLvl("sa");
    } else if (/nafType/gi.test(idf)) {
      matchTMBElements({ idf, sa, gl, fct, naf });
      updateAtvLvl("naf");
    } else
      console.error(`Error validating idf.
        obtained .id: ${idf ?? "UNDEFINED ID"}`);
    person.atvLvl = sa.value as Intensity;
    const returnedFactorAtvLvl = person.checkAtvLvl(person);
    typeof returnedFactorAtvLvl === "number"
      ? (tabProps.factorAtvLvl = (returnedFactorAtvLvl as NafTypeValue) || 1.4)
      : typeError("returnedFactorAtvLvl", returnedFactorAtvLvl, "number", extLine(new Error()));
  } catch (e) {
    console.error(`Error executing callbackAtvLvlElementNaf:\n${(e as Error).message}`);
  }
}
export function handleCallbackWHS(inpWHS: targEl): void {
  try {
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
    if (cen.wis.length > 0 && cen.his.length > 0 && cen.dcisDoc.length > 0) {
      for (const t of [...cen.wis, ...cen.his, ...cen.dcisDoc])
        if (t instanceof HTMLElement)
          t.dataset.target ? (t.dataset["target"] = "false") : t.setAttribute("data-target", "false");
    } else {
      for (const i of [".inpWeight", ".inpHeight", ".tabInpProgSumDCut"])
        for (const t of document.querySelectorAll(i))
          if (t instanceof HTMLElement)
            t.dataset.target ? (t.dataset["target"] = "false") : t.setAttribute("data-target", "false");
    }
    const fillResult = (autofillResult: autofillResult, mainNum: number): void => {
      const {
        ts: { tiw, tih, tidc },
      } = autofillResult;
      switch (mainNum) {
        case 1:
          if (tiw instanceof HTMLElement) tiw.dataset.target = "true";
          break;
        case 2:
          if (tih instanceof HTMLElement) tih.dataset.target = "true";
          break;
        case 3:
          if (tidc instanceof HTMLElement) tidc.dataset.target = "true";
          break;
        default:
          document.insertBefore(document.createComment("Input failed to active dataset.target"), inpWHS);
      }
      if (mainNum === 0) {
        if (tiw instanceof HTMLElement)
          tiw.dataset.target ? (tiw.dataset[`target`] = "true") : tiw?.setAttribute("data-target", "true");
      } else if (mainNum === 1) {
        if (tih instanceof HTMLElement)
          tih.dataset.target ? (tih.dataset[`target`] = "true") : tih?.setAttribute("data-target", "true");
      } else if (mainNum === 2) {
        if (tidc instanceof HTMLElement)
          tidc.dataset.target ? (tidc.dataset[`target`] = "true") : tidc?.setAttribute("data-target", "true");
      }
    };
    [
      { p: "weight", m: 600 },
      { p: "height", m: 3 },
      { p: "sumDCut", m: 999 },
    ].forEach(({ p, m }, i) => {
      if (inpWHS.classList.contains(`inp${p.charAt(0).toUpperCase()}${p.slice(1).toLowerCase()}`)) {
        if (!(p in person)) {
          console.warn(`Failed to locate ${p} in person props`);
          return;
        }
        if (parseNotNaN(inpWHS.value, 0) > m) inpWHS.value = m.toString();
        (person as any)[p] = validateEvResultNum(inpWHS, parseFloat(inpWHS.value || "0"));
        tabProps.isAutoFillActive && fillResult(exeAutoFill(inpWHS, "col"), i);
      }
    });
  } catch (e) {
    console.error(`Error executing callbackWHS for ${inpWHS?.id || "unidentified"}:${(e as Error).message}`);
    if (inpWHS instanceof HTMLElement && "value" in inpWHS) inpWHS.value = "0";
  }
}
