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
  evalPGCDecay,
  dispatchFactorAtvLvl,
} from "./edFisNutModel";
import { checkReturnIndex, assignFormatedValue } from "./edFisNutController";
import { highlightChange, fadeElement } from "../../global/gStyleScript";
import { parseNotNaN, numberLimit, autoCapitalizeInputs, checkAutoCorrect } from "../../global/gModel";
import { handleEventReq, syncAriaStates, updateSimpleProperty } from "../../global/handlers/gHandlers";
import { extLine } from "../../global/handlers/errorHandler";
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
import { maxProps, person, tabProps } from "@/vars";
import { ActiveTargInps, TargInps } from "@/lib/global/declarations/interfaces";
import { NafTypeValue, Protocol } from "@/lib/global/declarations/testVars";
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
      <input type="text" placeholder='Preencha aqui o nome da Atividade Física ${title} ${count - 1}' 
    class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText" id="tabInpRowAtFis${context}${count}_1"Nome da Atividade Física ${title} ${
      count - 1
    }" 
    data-title="Atividade_Fisica_${title}_Nome_${count - 1}" 
    data-xls='Nome da Atividade Física ${title} ${count - 1}'
    data-reqlength="3" required />
    <td class="tabCelAtFis tabCelAtFis${context} tabCelLeft" id="tabCelRowAtFis${context}${count}_3">
      <input type="number" 
      placeholder='Preencha aqui o Número de Semanas para a Atividade Física ${title} ${count - 1}'
      min-length="1" max-length"5" min="0" max="255" class="inpAtivFis tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_2"Número de Semanas para a Atividade Física Proposta ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_NSemana_${
      count - 1
    }" data-reqlength="1" data-maxlength='3' data-minnum="0" data-maxnum="255" 
    data-xls='Número de Semanas para a Atividade Física ${title} ${count - 1}'
    required />
    </td>
    <td class="tabCelAtFis tabCelAtFis${context}" id="tabCelRowAtFis${context}${count}_4">
      <input type="number" 
      placeholder='Preencha aqui o Tempo de Sessão da Atividade Física ${title} ${count - 1}'
      min-length="1" max-length="7" min="0" max="255" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_3"Tempo de Sessão Mínimo para Atividade Física ${title} ${
      count - 1
    }' data-title="Atividade_Fisica_${title}_SessãoMin_${
      count - 1
    }" data-reqlength="1" data-maxlength="3" data-minnum="0" data-maxnum="65535"
    data-xls='Tempo de Sessão Mínimo para Atividade Física ${title} ${count - 1}'
    required />
    </td>
    <td class="tabCelAtFis tabCelAtFis${context} tabCelRight" id="tabCelRowAtFis${context}${count}_5">
      <input type="number" 
      placeholder='Preencha aqui o Número de Meses para a Atividade Física ${title} ${count - 1}'
      min-length="1" 
      data-xls='Número de Meses para a Atividade Física ${title} ${count - 1}'
      max-length="7" min="0" max="255" class="tabInpAtFis${context} tabInpRowAtFis${context}2 form-control minText maxText minNum maxNum patternText" id="tabInpRowAtFis${context}${count}_4"Número de Meses para a Atividade Física ${title} ${
      count - 1
    }" data-title="Atividade_Fisica_${title}_Meses_${
      count - 1
    }" data-reqlength="1" data-maxlength="3" data-minnum="0" data-maxnum="65535" required />
    </td>
      `;
    tBodyContainer.appendChild(newRow);
    newRow.querySelectorAll('input[type="number"]').forEach(numInp => {
      numInp.addEventListener("input", () => {
        tabProps.edIsAutoCorrectOn && numberLimit(numInp as HTMLInputElement);
        handleEventReq(numInp as textEl);
      });
    });
    newRow.querySelectorAll('input[type="text"]').forEach(textEl => {
      textEl.addEventListener("input", () => {
        tabProps.edIsAutoCorrectOn &&
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
  }
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
  }
}
const locks: { current: HTMLCollectionOf<Element> | null } = {
  current: null,
};
export function switchAutoFill(autoFillBtn: targEl): void {
  try {
    if (
      !(
        autoFillBtn instanceof HTMLButtonElement ||
        (autoFillBtn instanceof HTMLInputElement &&
          (autoFillBtn.type === "checkbox" || autoFillBtn.type === "radio" || autoFillBtn.type === "button"))
      )
    )
      throw new Error(`Error validating typeof Autofill Button`);
    if (!(locks.current && Object.values(locks.current).every(r => r?.isConnected)))
      locks.current = document.getElementsByClassName("lockTabInd");
    if (autoFillBtn.innerText.match(/Desativar C[aá]lculo Autom[aá]tico/gi))
      autoFillBtn.textContent = "Ativar Cálculo Automático";
    else if (autoFillBtn.innerText.match(/Ativar C[aá]lculo Autom[aá]tico/gi))
      autoFillBtn.textContent = "Desativar Cálculo Automático";
    const filteredLocks = Array.from(locks.current).filter(lockTabInd => lockTabInd instanceof HTMLElement);
    if (filteredLocks.length === 0) return;
    filteredLocks.forEach(lock => {
      try {
        if (!(lock instanceof Element)) return;
        const td = lock.closest("td") || lock.closest("th");
        if (!td) return;
        const siblingInput = td.querySelector(".tabInpProg");
        const siblingButton = td.querySelector(".tabBtnInd");
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
          if (siblingInput instanceof HTMLInputElement) siblingInput.readOnly = true;
          else if (siblingInput instanceof HTMLSelectElement) siblingInput.disabled = true;
          if (siblingButton instanceof HTMLButtonElement || siblingButton instanceof HTMLInputElement)
            siblingButton.disabled = true;
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
          if (!(tabProps.gl instanceof HTMLSelectElement || tabProps.gl instanceof HTMLInputElement)) return;
          if (siblingInput instanceof HTMLInputElement) siblingInput.readOnly = false;
          else if (siblingInput instanceof HTMLSelectElement) siblingInput.disabled = false;
          if (siblingButton instanceof HTMLButtonElement || siblingButton instanceof HTMLInputElement)
            siblingButton.disabled = false;
        }
      } catch (e) {
        return;
      }
    });
  } catch (e) {
    return;
  }
}
export function getNumCol(evEl: targEl): void {
  try {
    if (!(evEl instanceof HTMLElement)) throw new Error(`Failed to validate instance of Targeted Element`);
    if (evEl.dataset.col && evEl.dataset.col !== "") tabProps.numCol = parseNotNaN(evEl.dataset.col, 2, "int");
    else if (
      (evEl && evEl.id?.match(/[0-9]+_[0-9]+$/g)) ||
      (evEl instanceof HTMLInputElement && evEl.name?.match(/[0-9]+_[0-9]+$/g)) ||
      (evEl instanceof HTMLLabelElement && evEl.htmlFor?.match(/[0-9]+_[0-9]+$/g))
    )
      tabProps.numCol = parseNotNaN(evEl.id.slice(-1)) || 2;
  } catch (e) {
    return;
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
    return 0;
  }
}
export function matchPersonPropertiesWH(): void {
  try {
    const tiw = tabProps.tiw,
      tih = tabProps.tih;
    if (!("weight" in person && typeof person.weight !== "number" && Number.isFinite(person.weight))) person.weight = 0;
    if (!("height" in person && typeof person.height !== "number" && Number.isFinite(person.height))) person.height = 0;
    if (tiw instanceof HTMLInputElement) person.dispatchWeight(validateEvResultNum(tiw, person.weight));
    if (tih instanceof HTMLInputElement) person.dispatchHeight(validateEvResultNum(tih, person.height));
  } catch (e) {
    return;
  }
}
export function updateIndexesContexts(): void {
  try {
    if (!tabProps.gl || !tabProps.gl.isConnected)
      tabProps.gl =
        document.getElementById("gordCorpLvl") ?? document.querySelector('[data-title*="Gordura Corporal"]');
    if (!tabProps.fct || !tabProps.fct.isConnected)
      tabProps.fct = document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    const gl = tabProps.gl,
      fct = tabProps.fct;
    if (!(person instanceof Person)) throw new Error(`Failed to validate person instance`);
    if (!(gl instanceof HTMLSelectElement || gl instanceof HTMLInputElement))
      throw new Error(`Failed to validate instance of Element for Body Fat Level`);
    if (!(fct instanceof HTMLElement)) throw new Error(`Failed to validate instance of Element for Body Type`);
    evalFactorAtleta();
    const { l: glv, v: imc } = person.calcIMC(person);
    tabProps.IMC = parseNotNaN(imc.toFixed(4));
    const tiimc = tabProps.tiimc;
    if (tiimc instanceof HTMLInputElement || tiimc instanceof HTMLSelectElement)
      assignFormatedValue(tiimc, tabProps.IMC);
    gl.value = glv || "abaixo";
    fluxFormIMC();
    const { pgc, mlg } = person.calcPGC(person);
    tabProps.MLG = parseNotNaN(mlg.toFixed(4));
    tabProps.PGC = parseNotNaN(pgc.toFixed(4));
    const timlg = tabProps.timlg,
      tipgc = tabProps.tipgc;
    if (timlg instanceof HTMLInputElement || timlg instanceof HTMLSelectElement)
      assignFormatedValue(timlg, tabProps.MLG);
    if (tipgc instanceof HTMLInputElement || tipgc instanceof HTMLSelectElement)
      assignFormatedValue(tipgc, tabProps.PGC);
    if (!tabProps.fct || !tabProps.fct.isConnected)
      tabProps.fct = document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLInputElement))
      throw new Error(`Failed to validate Formula Element`);
    evalFactorAtleta();
    const { l: formula, v: tmb } = person.calcTMB(person);
    fct.value = formula;
    tabProps.TMB = parseNotNaN(tmb.toFixed(4));
    const titmb = tabProps.titmb;
    if (titmb instanceof HTMLSelectElement || titmb instanceof HTMLInputElement)
      assignFormatedValue(tabProps.titmb as entryEl, tabProps.TMB);
    evalFactorAtvLvl();
    if (!(tabProps.TMB && tabProps.TMB >= 0 && (tabProps.factorAtvLvl as number) >= 0)) return;
    tabProps.GET = parseNotNaN(person.calcGET().toFixed(4));
    const tiget = tabProps.tiget;
    if (tiget instanceof HTMLInputElement || tiget instanceof HTMLSelectElement)
      assignFormatedValue(tiget, tabProps.GET);
  } catch (e) {
    return;
  }
}
export function fluxFormIMC(): { glChanged: boolean; fctChanged: boolean } {
  try {
    if (!tabProps.gl || !tabProps.gl.isConnected)
      tabProps.gl =
        document.getElementById("gordCorpLvl") ?? document.querySelector('[data-title=*"Gordura Corporal"]');
    const gl = tabProps.gl;
    if (!(gl instanceof HTMLSelectElement || gl instanceof HTMLInputElement))
      return { glChanged: false, fctChanged: false };
    if (!tabProps.fct || !tabProps.fct.isConnected)
      tabProps.fct = document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    const fct = tabProps.fct;
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLInputElement))
      return { glChanged: false, fctChanged: false };
    if (!tabProps.naf || !tabProps.naf.isConnected)
      tabProps.naf =
        document.getElementById("nafType") ??
        document.querySelector('[data-title*="Fator de Nível de Atividade Física"');
    const naf = tabProps.naf;
    if (!(naf instanceof HTMLSelectElement || naf instanceof HTMLInputElement))
      return { glChanged: false, fctChanged: false };
    let prevGl = gl.value;
    let prevFct = fct.value;
    if (naf.value === "2.2") {
      if (fct.value !== "tinsley") highlightChange(fct, "#fdaa0b");
      fct.value = "tinsley";
    } else {
      const IMC = tabProps.IMC ?? 0;
      if (IMC >= 0 && IMC < 25.0) {
        if (fct.value !== "harrisBenedict") highlightChange(fct, "#fdaa0b");
        fct.value = "harrisBenedict";
        if (IMC < 18.5) {
          if (gl.value !== "abaixo") highlightChange(gl, "#fdaa0b");
          gl.value = "abaixo";
        } else {
          if (gl.value !== "eutrofico") highlightChange(gl, "#fdaa0b");
          gl.value = "eutrofico";
        }
      } else if (IMC >= 25.0) {
        if (fct.value !== "mifflinStJeor") highlightChange(fct, "#fdaa0b");
        fct.value = "mifflinStJeor";
        if (IMC < 30) {
          if (gl.value !== "sobrepeso") highlightChange(gl, "#fdaa0b");
          gl.value = "sobrepeso";
        } else if (IMC >= 30 && IMC < 35) {
          if (gl.value !== "obeso1") highlightChange(gl, "#fdaa0b");
          gl.value = "obeso1";
        } else if (IMC >= 35 && IMC < 40) {
          if (gl.value !== "obeso2") highlightChange(gl, "#fdaa0b");
          gl.value = "obeso2";
        } else if (IMC > 40) {
          if (gl.value !== "obeso3") highlightChange(gl, "#fdaa0b");
          gl.value = "obeso3";
        }
      } else
        throw new Error(`Error obtaining IMC value in fluxFormIMC(), line ${extLine(new Error())}.
      Obtained value: ${IMC ?? "NaN"}`);
    }
    return {
      glChanged: prevGl !== gl.value,
      fctChanged: prevFct !== fct.value,
    };
  } catch (e) {
    return { glChanged: false, fctChanged: false };
  }
}
export function updatePGC(ctx: string = "cons"): void {
  try {
    if (!(person instanceof Person)) throw new Error(`Failed to validate instance of person`);
    if (typeof ctx !== "string" || (ctx !== "cons" && ctx !== "col"))
      throw new Error(`Failed to validate context argument`);
    const tidc = tabProps.tidc,
      tipgc = tabProps.tipgc;
    if (
      (tidc instanceof HTMLInputElement && (tidc.type === "number" || tidc.type === "text")) ||
      tidc instanceof HTMLSelectElement
    ) {
      person.dispatchDC(tidc?.value ?? "0");
      tidc.value = person.sumDCut.toString();
    }
    if (
      (tipgc instanceof HTMLInputElement && (tipgc.type === "number" || tipgc.type === "text")) ||
      tipgc instanceof HTMLSelectElement
    ) {
      tabProps.PGC = parseNotNaN(person.calcPGC(person).pgc.toFixed(4)) ?? 0;
      evalPGCDecay(tipgc) ? assignFormatedValue(tipgc, tabProps.PGC) : assignFormatedValue(tipgc, tabProps.PGC, 2);
      tabProps.MLG ??= 0;
      const max = 100 - tabProps.PGC;
      if (tabProps.MLG > max) tabProps.MLG = max;
      if (!(tabProps.timlg instanceof HTMLElement)) return;
      tabProps.timlg.dataset.maxnum = max.toString();
      if (!(tabProps.timlg instanceof HTMLInputElement && tabProps.timlg.type === "number")) return;
      tabProps.timlg.max = max.toString();
    }
  } catch (e) {
    return;
  }
}
export function updateAtvLvl(caller: "naf" | "sa"): void {
  try {
    if (!(tabProps.naf instanceof HTMLSelectElement || tabProps.naf instanceof HTMLInputElement)) return;
    if (!(tabProps.sa instanceof HTMLSelectElement || tabProps.sa instanceof HTMLInputElement)) return;
    const nafIntensity =
      tabProps.naf instanceof HTMLSelectElement
        ? tabProps.naf.dataset.intensity ||
          Array.from(tabProps.naf.options)
            [tabProps.naf.options.selectedIndex].innerText.toLowerCase()
            .replace("á", "")
            .replace("intenso", "Intenso") ||
          tabProps.naf.value
        : tabProps.naf.innerText.toLowerCase().replace("á", "").replace("intenso", "Intenso") || tabProps.naf.value;
    evalFactorAtvLvl();
    evalActivityLvl();
    caller === "naf" ? (tabProps.sa.value = nafIntensity) : (tabProps.naf.dataset.intensity = tabProps.sa.value);
  } catch (e) {
    return;
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
        if (refs) {
          console.log(
            Object.values(refs).map((col: { [k: string]: NlMRef<nlInp> }) =>
              Object.values(col).every((t: NlMRef<nlInp>) => t?.current instanceof HTMLElement),
            ),
          );
          console.log(
            Object.values(refs)
              .map((col: { [k: string]: NlMRef<nlInp> }) =>
                Object.values(col).every((t: NlMRef<nlInp>) => t?.current instanceof HTMLElement),
              )
              .every(colEval => colEval),
          );
        }
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
          const relNum = num + 1;
          for (const [k, v] of [
            ["tiw", `#tabInpRowMedAnt2_${relNum}`],
            ["tih", `#tabInpRowMedAnt3_${relNum}`],
            ["tidc", `#tabInpRowDCut9_${relNum}`],
            ["tiimc", `#inpImc${num}Cel2_${relNum}`],
            ["timlg", `#inpMlg${num}Cel3_${relNum}`],
            [`tipgc`, `#inpPgc${num}Cel4_${relNum}`],
            ["titmb", `#inpTmb${num}Cel5_${relNum}`],
            ["tiget", `#inpGet${num}Cel6_${relNum}`],
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
        if (refs) {
          console.log("Validation for Col");
          console.log(
            Object.values(refs).map((col: { [k: string]: NlMRef<nlInp> }) =>
              Object.values(col).every((t: NlMRef<nlInp>) => t?.current instanceof HTMLElement),
            ),
          );
          console.log(
            Object.values(refs)
              .map((col: { [k: string]: NlMRef<nlInp> }) =>
                Object.values(col).every((t: NlMRef<nlInp>) => t?.current instanceof HTMLElement),
              )
              .every(colEval => colEval),
          );
        }
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
          const relNum = num - 1;
          for (const [k, v] of [
            ["tiw", `#tabInpRowMedAnt2_${num}`],
            ["tih", `#tabInpRowMedAnt3_${num}`],
            ["tidc", `#tabInpRowDCut9_${num}`],
            ["tiimc", `#inpImc${relNum}Cel2_${num}`],
            ["timlg", `#inpMlg${relNum}Cel3_${num}`],
            [`tipgc`, `#inpPgc${relNum}Cel4_${num}`],
            ["titmb", `#inpTmb${relNum}Cel5_${num}`],
            ["tiget", `#inpGet${relNum}Cel6_${num}`],
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
const fspElements: {
  tabs: HTMLCollectionOf<Element> | null;
  trs: HTMLCollectionOf<Element> | null;
  cols: HTMLCollectionOf<Element> | null;
} = {
  tabs: null,
  trs: null,
  cols: null,
};
export function switchRequiredCols({
  snc,
  td,
  tsv,
  tma,
  tip,
}: {
  snc: targEl;
  td: targEl;
  tsv: targEl;
  tma: targEl;
  tip: targEl;
}): void {
  const areNumConsOpsValid = tabProps.areNumConsOpsValid;
  try {
    if (!(snc instanceof HTMLSelectElement || snc instanceof HTMLInputElement))
      throw new Error(`Failed to validate instance of Number of Appointment Selector`);
    if (!tabProps.fsp || !tabProps.fsp.isConnected) tabProps.fsp = document.getElementById("fsProgConsId");
    const fsp = tabProps.fsp;
    if (!(fsp instanceof HTMLElement)) throw new Error(`Failed to validate instance of Fieldset for Tabs`);
    if (!(td instanceof HTMLElement)) throw new Error(`Failed to validate instance of Table for Skin Folds`);
    if (!(tsv instanceof HTMLElement)) throw new Error(`Failed to validate instance of Table for Vital Signs`);
    if (!(tma instanceof HTMLElement)) throw new Error(`Failed to validate Table for Anthropometric measurements`);
    if (!(tip instanceof HTMLElement)) throw new Error(`Failed to validate instance of Table for Indexes`);
    if (!areNumConsOpsValid) throw new Error(`Invalidated Number of Appointments Options`);
    const numCons = tabProps.numCons;
    if (typeof numCons !== "number" || numCons <= 0 || numCons > 3)
      throw new Error(`Invalidated Number for Appointment: Obtained value as ${numCons ?? "undefined"}`);
    //inicia construção de matriz para reset de required na tabela
    if (!(fspElements.tabs && Object.values(fspElements.tabs).every(r => r?.isConnected)))
      fspElements.tabs = fsp.getElementsByTagName("table");
    const tabs = fspElements.tabs;
    if (tabs.length === 0) throw new Error(`No table was found in the fieldset`);
    if (!(fspElements.trs && Object.values(fspElements.trs).every(r => r?.isConnected)))
      fspElements.trs = fsp.getElementsByTagName("tr");
    const trs = fspElements.trs;
    if (trs.length === 0) throw new Error(`No table row was found in the fieldset.`);
    if (!(fspElements.cols && Object.values(fspElements.cols).every(r => r?.isConnected)))
      fspElements.cols = fsp.getElementsByTagName("col");
    const cols = fspElements.cols;
    if (cols.length === 0) throw new Error(`No table col was found in the fieldset`);
    const nTotalRows = trs.length - tabs.length,
      nTotalCols = cols.length - tabs.length;
    if (!(nTotalRows > 0 && nTotalCols > 0))
      throw new Error(`Failed to calculate Number of Total Rows and/or Total Columns.
      Number of Rows: ${nTotalRows}
      Number of Columns: ${nTotalCols}`);
    const matrix = nTotalRows * nTotalCols,
      inpsSvi = tsv.getElementsByClassName("tabInpProgSVi"),
      inpsMedAnt = tma.getElementsByClassName("tabInpProgMedAnt"),
      inpsDC = td.getElementsByClassName("tabInpProg"),
      inpsInd = tip.getElementsByClassName("inpInd"),
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
      const pattern = new RegExp(`_${iC + 2}`, "g");
      reqSV.push(filterCellsPattern({ inps: inpsSvi, pattern }));
      reqMA.push(filterCellsPattern({ inps: inpsMedAnt, pattern }));
      reqDC.push(filterCellsPattern({ inps: inpsDC, pattern }));
      reqPI.push(filterCellsPattern({ inps: inpsInd, pattern }));
    }
    const flatRequiredCells = [...reqSV, ...reqMA, ...reqDC, ...reqPI].flat(1);
    if (!(flatRequiredCells.length > 0 && flatRequiredCells.length === nTotalRows * numCons))
      throw new Error(`Failed to validate number of required inputs for tables`);
    for (const i of flatRequiredCells) {
      highlightChange(i, "red", "both");
      if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement || i instanceof HTMLSelectElement)
        i.required = true;
    }
  } catch (e) {
    return;
  }
}
const cols: { [k: string]: HTMLCollectionOf<Element> } = {};
export function defineAxes(tab: targEl): number {
  try {
    if (!(tab instanceof HTMLTableElement)) throw new Error(`Failed to validate Table instance`);
    if (tab.rows.length === 0) throw new Error(`No row was found for table`);
    let nCols: elCollection;
    if (!cols[tab.id]) cols[tab.id] = tab.getElementsByTagName("col");
    nCols = cols[tab.id];
    if (nCols.length === 0) throw new Error(`No col was found for table`);
    return (tab.rows.length - 1) * (nCols.length - 1);
  } catch (e) {
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
        break;
    }
    if (filterInpCell.length === 0) throw new Error(`Failed to populate list of filtered elements`);
    return filterInpCell;
  } catch (e) {
    return [];
  }
}
const ncth: { current: HTMLCollectionOf<Element> | null } = {
  current: null,
};
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
    if (!(ncth.current && Object.values(ncth.current).every(r => r?.isConnected)))
      ncth.current = document.getElementsByClassName("numConsTextHeadCel");
    for (const h of ncth.current) {
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
      if (col <= 1) col = 2;
      h.innerText = `${col - 2 + iniValue}ª Consulta`;
    }
    const inps = document.getElementsByClassName("tabInpProg");
    for (let i = 0; i < inps.length; i++) {
      const inp = inps[i];
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
        continue;
      }
    }
  } catch (e) {
    return;
  }
}
const rowsDcut: { current: HTMLCollectionOf<Element> | null } = {
  current: null,
};
export function handleSumClick(
  ev: React.MouseEvent,
  refs: {
    prt: targEl;
    td: targEl;
  },
): void {
  const { prt, td } = refs;
  try {
    if (!(prt instanceof HTMLSelectElement || prt instanceof HTMLInputElement)) return;
    if (!(td instanceof HTMLElement)) throw new Error(`Failed to validate Table of Skin Folds reference`);
    if (typeof person !== "object" || !("sumDCut" in person)) return;
    if (!(rowsDcut.current && Object.values(rowsDcut.current).every(r => r?.isConnected)))
      rowsDcut.current = td.getElementsByClassName("tabRowDCutMed");
    const rowsDCArray = Array.from(rowsDcut.current).filter(rowDC => rowDC instanceof HTMLTableRowElement);
    if (rowsDCArray.length === 0) throw new Error(`Failed to populate rowsDCArray`);
    if (!(ev.currentTarget instanceof HTMLElement)) throw new Error(`Failed to validate event target instance`);
    person.dispatchDC(
      createArraysRels({
        btn: ev.currentTarget,
        arrayRows: rowsDCArray as Element[],
        protocolValue: prt.value as Protocol,
      }),
    );
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
    updatePGC("col");
  } catch (e) {
    return;
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
        const list = row.getElementsByTagName("input");
        return list && list.length > 0
          ? Array.from(list).find(inp => {
              return (
                inp instanceof HTMLElement &&
                ((inp.dataset.col && inp.dataset.col === btn.dataset.col) ||
                  (inp.id.match(`_${btnCol.toString()}`) ? true : false))
              );
            }) ?? null
          : null;
      }),
      inpsIds = targColInps.map(inp => (inp ? (inp as HTMLInputElement).id : null));
    if (inpsIds.filter(id => id !== null).length !== arrayRows.length)
      throw new Error(`Error validating length of columnValues.`);
    //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
    const protocoloNum = parseNotNaN(
      protocolValue
        .trim()
        .slice(-1)
        .replace(/[^0-9]/g, ""),
    );
    if (!(protocoloNum === 3 || protocoloNum === 7))
      throw new Error(`Error obtaining the protocol number.
      Obtained number: ${protocoloNum ?? 0}`);
    for (let iC = 0; iC < arrayRows.length; iC++) {
      if (!(arrayRows[iC] instanceof HTMLElement && !arrayRows[iC].hasAttribute("hidden"))) continue;
      const inp = targColInps[iC] as HTMLInputElement;
      if (inp && inp.value) colAcc += evalPseudoNum(inp.value);
    }
    const sumInp = document.getElementById(`tabInpRowDCut9_${btnCol}`) as nlEl;
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
    return colAcc;
  }
}
export function handleIndEv(
  ctx: IndCases,
  ctxEls: { el: targEl; fsp: targEl; gl: targEl; fct: targEl; refs?: TargInps | null },
): void {
  let { el, fsp, fct, refs } = ctxEls;
  try {
    if (
      !(
        el instanceof HTMLButtonElement ||
        el instanceof HTMLSelectElement ||
        (el instanceof HTMLInputElement &&
          (el.type === "text" || el.type === "number" || el.type === "button" || el.type === "submit"))
      )
    )
      return;
    getNumCol(el);
    if (!Number.isFinite(tabProps.numCol)) tabProps.numCol = 2;
    evalFactorAtleta();
    if (tabProps.isAutoFillActive) {
      const { tiw, tih, tidc, tiimc, timlg, titmb, tiget, tipgc } = defineTargInps({
        el,
        parent: fsp,
        refs: refs ?? undefined,
        ctx,
      });
      Object.assign(tabProps, {
        ...(tiw && { tiw }),
        ...(tih && { tih }),
        ...(tidc && { tidc }),
        ...(tiimc && { tiimc }),
        ...(timlg && { timlg }),
        ...(titmb && { titmb }),
        ...(tiget && { tiget }),
        ...(tipgc && { tipgc }),
      });
      updatePGC("col");
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
      const dcis = document.getElementsByClassName("tabInpProgIndPerc"),
        his = document.getElementsByClassName("inpWeight"),
        wis = document.getElementsByClassName("inpHeight"),
        indis = document.getElementsByClassName("tabInpProgDCut");
      [...dcis, ...his, ...wis, ...indis].forEach(targInp => {
        if (!(targInp instanceof HTMLElement)) return;
        if (targInp.dataset[`autofill`]) targInp.dataset[`autofill`] = "false";
        else targInp.setAttribute("data-autofill", "false");
      });
    }
    if (ctx !== "BTN" && ctx !== "IMC" && ctx !== "MLG" && ctx !== "TMB" && ctx !== "GET" && ctx !== "PGC") return;
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
        break;
    }
    if (!tabProps.fct || !tabProps.fct.isConnected)
      tabProps.fct = document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    fct = tabProps.fct;
    if (!(fct instanceof HTMLElement)) return;
    if (!(ctx === "BTN" || tabProps.isAutoFillActive)) return;
    matchPersonPropertiesWH();
    evalFactorAtvLvl();
    evalFactorAtleta();
    updateIndexesContexts();
  } catch (e) {
    return;
  }
}
export function exeAutoFill(el: targEl, context: string = "cons", refs?: TargInps): autofillResult {
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
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement))
      throw new Error(`Failed to validate target instance`);
    if (!(person instanceof Person)) throw new Error(`Failed to validate person instance`);
    if (typeof context !== "string") throw new Error(`Failed to validate typeof context argument`);
    if (context === "cons") numRef = evalPseudoNum(tabProps.numCons) || 1;
    else {
      getNumCol(el);
      numRef = Number.isFinite(tabProps.numCol) ? tabProps.numCol || 2 : 2;
    }
    return runAutoFill(el, context, refs);
  } catch (e) {
    return iniResult;
  }
}
export function runAutoFill(el: targEl, ctx: string = "cons", refs?: TargInps): autofillResult {
  const numRef =
    ctx === "cons"
      ? evalPseudoNum(tabProps.numCons) || 1
      : el instanceof HTMLElement && el.dataset.col && el.dataset.col !== ""
      ? parseNotNaN(el.dataset.col || "2", 2, "int") ||
        (/_/g.test(el.id)
          ? parseNotNaN(el.id.slice(el.id.lastIndexOf("_") + 1) || "2", 2, "int")
          : evalPseudoNum(tabProps.numCol) || 2)
      : evalPseudoNum(tabProps.numCol) || 2;
  const indis = document.getElementsByClassName("tabInpProgIndPerc"),
    wis = document.getElementsByClassName("inpWeight"),
    his = document.getElementsByClassName("inpHeight"),
    dcis = document.getElementsByClassName("tabInpProgDCut");
  [...indis, ...his, ...wis, ...dcis].forEach(t => {
    if (t instanceof HTMLElement) t.dataset[`target`] = "false";
    else t?.setAttribute("data-target", "false");
  });
  if (!tabProps.fsp || !tabProps.fsp.isConnected) tabProps.fsp = document.getElementById("fsProgConsId");
  const { tiw, tih, tidc, tiimc, timlg, titmb, tiget, tipgc } = defineTargInps({ el, parent: tabProps.fsp, refs, ctx });
  Object.assign(tabProps, {
    ...(tiw && { tiw }),
    ...(tih && { tih }),
    ...(tidc && { tidc }),
    ...(tiimc && { tiimc }),
    ...(timlg && { timlg }),
    ...(titmb && { titmb }),
    ...(tiget && { tiget }),
    ...(tipgc && { tipgc }),
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
  if (!("sumDCut" in person && typeof person.sumDCut !== "number" && Number.isFinite(person.sumDCut)))
    person.sumDCut = 0;
  if (tidc instanceof HTMLInputElement) person.dispatchDC(validateEvResultNum(tidc, person.sumDCut));
  updateIndexesContexts();
  updatePGC(ctx);
  [
    { k: "tiimc", v: tabProps.IMC?.toString() ?? "0" },
    { k: "timlg", v: tabProps.MLG?.toString() ?? "0" },
    { k: "titmb", v: tabProps.TMB?.toString() ?? "0" },
    { k: "tiget", v: tabProps.GET?.toString() ?? "0" },
    { k: "tipgc", v: tabProps.PGC?.toString() ?? "0" },
  ].forEach(({ k, v }) => {
    try {
      const inputElement = tabProps[k as keyof typeof tabProps] as Element;
      if (
        !(
          inputElement instanceof HTMLInputElement ||
          inputElement instanceof HTMLSelectElement ||
          inputElement instanceof HTMLTextAreaElement
        )
      )
        return;
      inputElement.value = v;
    } catch (e) {
      return;
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
    if (
      typeof person !== "object" ||
      !(textBodytype instanceof HTMLSelectElement || textBodytype instanceof HTMLInputElement) ||
      !(protocolo instanceof HTMLSelectElement || protocolo instanceof HTMLInputElement) ||
      !(tde instanceof HTMLTableElement) ||
      !(genElement instanceof HTMLSelectElement || genElement instanceof HTMLInputElement) ||
      !(genBirthRel instanceof HTMLSelectElement || genBirthRel instanceof HTMLInputElement) ||
      !(genFisAlin instanceof HTMLSelectElement || genFisAlin instanceof HTMLInputElement)
    )
      return [
        person?.gen || "masculino",
        (genElement as entryEl)?.value || "masculino",
        (genFisAlin as entryEl)?.value || "masculinizado",
      ];
    changeTabDCutLayout(protocolo, tde, textBodytype);
    person.dispatchGen(textBodytype.value);
  } catch (e) {
    return [
      person?.gen || "masculino",
      (genElement as entryEl)?.value || "masculino",
      (genFisAlin as entryEl)?.value || "masculinizado",
    ];
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
    if (!tabProps.sa || !tabProps.sa.isConnected)
      tabProps.sa =
        document.getElementById("selectLvlAtFis") ??
        document.querySelector('[data-title*="Nível de Atividade Física"]');
    sa = tabProps.sa;
    if (!(sa instanceof HTMLSelectElement || sa instanceof HTMLInputElement)) return;
    if (!tabProps.gl || !tabProps.gl.isConnected)
      tabProps.gl =
        document.getElementById("gordCorpLvl") ?? document.querySelector('[data-title*="Gordura Corporal"]');
    gl = tabProps.gl;
    if (!(gl instanceof HTMLSelectElement || sa instanceof HTMLInputElement)) return;
    if (!tabProps.naf || !tabProps.naf.isConnected)
      tabProps.naf =
        document.getElementById("nafType") ??
        document.querySelector('[data-title*="Fator de Nível de Atividade Física"');
    naf = tabProps.naf;
    if (!(naf instanceof HTMLSelectElement || naf instanceof HTMLInputElement)) return;
    if (!tabProps.fct || !tabProps.fct.isConnected)
      tabProps.fct = document.getElementById("formCalcTMBType") ?? document.querySelector('[data-title*="Fórmula"]');
    fct = tabProps.fct;
    if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLSelectElement)) return;
    if (![sa.id, gl?.id ?? "gordCorpLvl", naf.id, fct.id].includes(idf)) return;
    evalFactorAtvLvl();
    evalIMC();
    evalMatchTMBElements();
    evalActivityLvl();
    fluxFormIMC();
    (() => {
      try {
        if (typeof idf !== "string") throw new Error(`Failed to validate target string`);
        gl ??=
          tabProps.gl ??
          document.getElementById("gordCorpLvl") ??
          document.querySelector('[data-title*="Gordura Corporal"]');
        if (!(gl instanceof HTMLSelectElement || gl instanceof HTMLInputElement)) return;
        fct ??=
          tabProps.fct ??
          document.getElementById("formCalcTMBType") ??
          document.querySelector('[data-title*="Fórmula"]');
        if (!(fct instanceof HTMLSelectElement || fct instanceof HTMLInputElement)) return;
        naf ??=
          tabProps.naf ??
          document.getElementById("nafType") ??
          document.querySelector('[data-title*="Fator de Nível de Atividade Física"');
        if (!(naf instanceof HTMLSelectElement || naf instanceof HTMLInputElement)) return;
        const spanFactorAtleta = tabProps.spanFa;
        if (!(spanFactorAtleta instanceof HTMLElement)) return;
        const lockGl = tabProps.lockGl;
        if (!(lockGl instanceof Element)) return;
        fct.value !== "tinsley" && fluxFormIMC();
        if (naf.value === "2.2") {
          if (fct.value !== "tinsley") {
            setTimeout(() => fadeElement(spanFactorAtleta, "0"), 100);
            setTimeout(() => fadeElement(spanFactorAtleta, "1"), 500);
          }
          fct.value = "tinsley";
          spanFactorAtleta.hidden = false;
          if (/bi-lock/gi.test(lockGl.innerHTML) && !tabProps.isAutoFillActive) {
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
            if (!(tabProps.gl instanceof HTMLSelectElement || tabProps.gl instanceof HTMLInputElement)) return;
            tabProps.gl.disabled = false;
          }
        } else if (naf.value === "1.2" || naf.value === "1.4" || naf.value === "1.6" || naf.value === "1.9") {
          if (
            gl.value === "sobrepeso" ||
            gl.value === "obeso1" ||
            gl.value === "obeso2" ||
            gl.value === "obeso3" ||
            (tabProps.IMC && tabProps.IMC >= 25)
          ) {
            if (fct.value !== "mifflinStJeor")
              setTimeout(() => {
                fadeElement(spanFactorAtleta, "0");
                setTimeout(() => (spanFactorAtleta.hidden = true), 500);
              }, 500);
            fct.value = "mifflinStJeor";
          } else if (gl.value === "abaixo" || gl.value === "eutrofico" || (tabProps.IMC && tabProps.IMC < 25)) {
            if (fct.value !== "harrisBenedict")
              setTimeout(() => {
                fadeElement(spanFactorAtleta, "0");
                setTimeout(() => (spanFactorAtleta.hidden = true), 500);
              }, 500);
            fct.value = "harrisBenedict";
          }
          if (/bi-unlock/gi.test(lockGl.innerHTML)) {
            fadeElement(lockGl, "0");
            setTimeout(() => {
              lockGl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><defs><linearGradient id="gradiente-lock" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(233, 180, 7)"></stop><stop offset="100%" style="stop-color:rgb(243, 221, 93)"></stop></linearGradient></defs><path d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4" class="svg-lock-hook"></path><path d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2" class="svg-lock-body"></path><line x1="5" y1="7" x2="11" y2="7" stroke="black"></line></svg>`;
              fadeElement(lockGl, "1");
            }, 500);
            if (!(tabProps.gl instanceof HTMLSelectElement || tabProps.gl instanceof HTMLInputElement)) return;
            tabProps.gl.disabled = true;
          }
        }
      } catch (e) {
        return;
      }
    })();
    /nafType/gi.test(idf) ? updateAtvLvl("naf") : updateAtvLvl("sa");
    person.dispatchAtvLvl(sa.value);
    const returnedFactorAtvLvl = person.checkAtvLvl(person);
    dispatchFactorAtvLvl(returnedFactorAtvLvl as NafTypeValue);
  } catch (e) {
    return;
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
      return;
    if (
      inpWHS.value.length > 0 &&
      inpWHS.value !== "" &&
      (/NaN/gi.test(inpWHS.value) || /Infinity/gi.test(inpWHS.value))
    )
      inpWHS.value = "0";
    for (const i of ["inpWeight", "inpHeight", "tabInpProgSumDCut"])
      for (const t of document.getElementsByClassName(i))
        if (t instanceof HTMLElement)
          t.dataset.target ? (t.dataset["target"] = "false") : t.setAttribute("data-target", "false");
    const fillResult = (autofillResult: autofillResult): void => {
      const {
        ts: { tiw, tih, tidc },
      } = autofillResult;
      if (tiw instanceof HTMLElement) tiw.dataset.target = "true";
      if (tih instanceof HTMLElement) tih.dataset.target = "true";
      if (tidc instanceof HTMLElement) tidc.dataset.target = "true";
    };
    [
      { p: "weight", m: maxProps.weight },
      { p: "height", m: maxProps.height },
      { p: "sumDCut", m: maxProps.dc },
    ].forEach(({ p }) => {
      if (inpWHS.classList.contains(`inp${p.charAt(0).toUpperCase()}${p.slice(1).toLowerCase()}`)) {
        if (!(p in person)) return;
        (person as any)[p] = validateEvResultNum(inpWHS, parseFloat(inpWHS.value || "0"));
        tabProps.isAutoFillActive && fillResult(exeAutoFill(inpWHS, "col"));
      }
    });
  } catch (e) {
    if (inpWHS instanceof HTMLElement && "value" in inpWHS) inpWHS.value = "0";
  }
}
