//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
import { Person } from "../../global/declarations/classes";
import { entryEl, primitiveType, targEl } from "../../global/declarations/types";
import { filterIdsByGender, parseNotNaN } from "../../global/gModel";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { BodyType, FactorAtletaValue, NafTypeValue } from "@/lib/global/declarations/testVars";
import { person, tabProps } from "@/vars";
export function checkInnerColGroups(parentEl: targEl): number {
  const validColGroupsChildCount: number[] = [],
    colGroups = Array.from(parentEl?.querySelectorAll("colgroup") ?? []);
  try {
    if (!(parentEl instanceof HTMLElement && colGroups?.flat(1)?.length > 0)) return validColGroupsChildCount.length;
    for (let i = 0; i < colGroups.length; i++) {
      const arrColGrpChilds = Array.from(colGroups[i].children);
      arrColGrpChilds.every(col => col instanceof HTMLTableColElement)
        ? validColGroupsChildCount.push(colGroups[i].childElementCount)
        : validColGroupsChildCount.push(arrColGrpChilds.filter(col => col instanceof HTMLTableColElement).length);
    }
    const pairedColGroupsValid: boolean[] = [];
    for (let m = 1; m < validColGroupsChildCount.length; m++)
      (validColGroupsChildCount[m] = validColGroupsChildCount[m - 1]) && pairedColGroupsValid.push(true);
    tabProps.areColGroupsSimilar = pairedColGroupsValid.every(pairedColGroup => pairedColGroup === true) ? true : false;
  } catch (e) {
    return validColGroupsChildCount.length;
  }
  return validColGroupsChildCount.length;
}
export function checkTabRowsIds(tab: targEl): string[] {
  const arrTabRowsIds: string[] = [];
  if (tab instanceof HTMLTableElement && tab.id === "tabDCut")
    Array.from(tab.querySelectorAll("tr.tabRowDCutMed")).forEach(tabRow => {
      const rowId = tabRow?.id;
      if (rowId?.match(/^row/)?.toString()) arrTabRowsIds?.push(rowId.slice(3).toLowerCase());
    });
  return arrTabRowsIds || [""];
}
export function changeTabDCutLayout(protocolo: targEl, tabDC: targEl, bodyType: targEl): string {
  if (
    (protocolo instanceof HTMLSelectElement || protocolo instanceof HTMLInputElement) &&
    tabDC instanceof HTMLTableElement &&
    (bodyType instanceof HTMLSelectElement || bodyType instanceof HTMLInputElement)
  ) {
    const filteredOpsProtocolo = Array.from(protocolo.children)?.filter(
      childProtocolo => childProtocolo instanceof HTMLOptionElement,
    );

    if (filteredOpsProtocolo?.length >= Array.from(protocolo.children)?.length) {
      //executa loop para todas as opções de protocolo válidas
      for (let iOp = 0; iOp < filteredOpsProtocolo.length - 1; iOp++) {
        const arrayTabIds = checkTabRowsIds(tabDC);
        const genderedIds = filterIdsByGender(arrayTabIds, bodyType.value);
        /* eslint-disable */
        /*após checagem de ids e filtragem por gênero da pessoa 
        valida se de fato as rows sem informação (visuais) não estão sendo capturadas
        e se a filtragem por gênero ocorreu corretamente*/
        /* eslint-enable */
        if (
          arrayTabIds?.length ===
            Array.from(tabDC.rows).filter(row => row.classList.contains("tabRowDCutMed"))?.length &&
          genderedIds?.length > 0
        ) {
          //separa casos por tipo de protocolo
          if ((protocolo as entryEl)?.value.match(/^pollock3$/i)?.toString()) {
            if ((bodyType.value === "masculino" || bodyType.value === "feminino") && genderedIds.length === 3)
              defineHiddenRows(tabDC, arrayTabIds, genderedIds);
            else if (bodyType.value === "neutro" && genderedIds.length === 5)
              defineHiddenRows(tabDC, arrayTabIds, genderedIds, "nb");
          } else if ((protocolo as entryEl)?.value.match(/^pollock7$/i)?.toString()) {
            Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"))?.forEach(medTr => {
              if ((medTr as HTMLElement)?.hidden) {
                medTr.removeAttribute("hidden");
                const innerInp = medTr.querySelector("input");
                if (innerInp) innerInp.setAttribute("required", "");
              }
            });
            return "pollock7";
          }
        }
      }
    }
  }
  return "pollock3";
}
export function defineHiddenRows(
  tabDC: targEl,
  arrayTabIds: string[] = [],
  genderedIds: string[] = [],
  context: string = "bin",
): void {
  if (
    tabDC instanceof HTMLTableElement &&
    arrayTabIds?.length > 0 &&
    arrayTabIds.every(tabId => typeof tabId === "string") &&
    genderedIds?.length > 0 &&
    genderedIds.every(genId => typeof genId === "string") &&
    (context === "bin" || context === "nb")
  ) {
    const matchedIds: string[] = [];
    /*percorrimento de matriz da tabela para capitalizar primeiro dígito
    e definir matchedIds*/
    for (const genId of genderedIds) {
      for (const tabId of arrayTabIds) {
        if (genId?.toLowerCase() === tabId && genId.charAt(0).toUpperCase() + genId.slice(1))
          matchedIds.push(`row${genId.charAt(0).toUpperCase() + genId.slice(1)}`);
      }
    }
    /*percorrimento de row para resetar todos as rows para hidden e unrequired*/
    Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed")).forEach(medTr => {
      medTr.setAttribute("hidden", "");
      const innerInp = medTr.querySelector("input");
      if (innerInp) {
        innerInp.removeEventListener("input", handleEventReq);
        if (innerInp.required) innerInp.removeAttribute("required");
        if (medTr?.id?.slice(-4) !== "Coxa") innerInp.value = "";
      }
    });
    /*percorrimento de row para remover hidden de elementos validados
    no percorrimento anteriro da matriz */
    matchedIds.forEach(matchedId => {
      const matchedTr = document.getElementById(matchedId);
      if (matchedTr?.hidden) {
        matchedTr.removeAttribute("hidden");
        const innerInp = matchedTr.querySelector("input");
        if (innerInp) {
          innerInp.addEventListener("input", handleEventReq);
          switch (context) {
            case "bin":
              innerInp.setAttribute("required", "");
              break;
            case "nb":
              matchedTr.id?.slice(-4) === "Coxa"
                ? innerInp.setAttribute("required", "")
                : innerInp.removeAttribute("required");
              break;
            default:
              break;
          }
        }
      }
    });
  }
}
//correção para limitação da fórmula de PGC
export function evalPGCDecay(tipgc: targEl): boolean {
  let foundDecayPoint = false;
  try {
    if (!(person instanceof Person)) throw new Error(`Failed to validate instance of Person`);
    if (
      !(tipgc instanceof HTMLInputElement || tipgc instanceof HTMLSelectElement || tipgc instanceof HTMLTextAreaElement)
    )
      throw new Error(`Failed to validate Target Input for PGC`);
    tabProps.PGC = evalPseudoNum(tabProps.PGC);
    const initSumDCut = person.sumDCut,
      decreasedPerson = new Person(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
    decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
    let decreasedPGC = decreasedPerson.calcPGC(decreasedPerson).pgc,
      sumAcc = 1;
    //caso padrão de decay
    if (decreasedPGC > tabProps.PGC) {
      foundDecayPoint = true;
      const arrDecreasedPGC: number[] = [];
      //busca pontos de decay anteriores
      while (decreasedPerson.sumDCut > 0) {
        if (sumAcc > 100) break;
        sumAcc++;
        decreasedPerson.sumDCut -= -1;
        decreasedPGC = decreasedPerson.calcPGC(decreasedPerson).pgc;
        if (decreasedPGC < 0 || !Number.isFinite(decreasedPGC)) decreasedPGC = 0;
        arrDecreasedPGC.push(decreasedPGC);
        if (decreasedPGC < tabProps.PGC) break;
      }
      //caso ponto de decays sejam validados, normaliza valor para evitar anomalias de entrada
      if (arrDecreasedPGC.length > 0) {
        decreasedPerson.sumDCut > 515
          ? (tabProps.PGC = 60.5) //limite hardcodado
          : (tabProps.PGC =
              Math.ceil((Math.max(...arrDecreasedPGC) + 0.05) * 10) / 10 + ((initSumDCut - 260) / 100) * 5);
      } else tabProps.PGC = decreasedPGC;
    } else if (decreasedPGC <= tabProps.PGC && (tabProps.PGC > 100 || decreasedPerson.sumDCut > 514)) {
      /* eslint-disable */
      /*casos específicos para handling de input anômalo (além do possível para um ser humano) 
      evitando bugs nos listeners devido a NaN e loops de normalização */
      /* eslint-enable */
      foundDecayPoint = true;
      tabProps.PGC = 60.45 + 0.05 * (decreasedPerson.sumDCut - 513);
    }
    if (tabProps.PGC < 0 || !Number.isFinite(tabProps.PGC)) tabProps.PGC = 0;
    if (person.sumDCut < 0 || !Number.isFinite(person.sumDCut)) person.sumDCut = 0;
    if (foundDecayPoint) tipgc.style.color = "#ff59";
    else tipgc.style.color = "rgb(33, 37, 41)";
    return foundDecayPoint;
  } catch (e) {
    tabProps.PGC = 0;
    person.sumDCut = 0;
    return foundDecayPoint;
  }
}
export const evalBodyType = (g: string): g is BodyType => ["masculino", "feminino", "neutro"].includes(g);
export function evalFactorAtleta(): boolean {
  if (typeof tabProps.factorAtleta !== "string" || tabProps.factorAtleta === ("" as any))
    tabProps.factorAtleta = "peso";
  if (tabProps.factorAtleta !== ("peso" as any)) tabProps.factorAtleta = tabProps.factorAtleta.toLowerCase() as any;
  if (tabProps.factorAtleta !== ("mlg" as any))
    tabProps.factorAtleta = (tabProps.factorAtleta?.toLowerCase() as any) ?? "peso";
  if (tabProps.factorAtleta !== "peso" && tabProps.factorAtleta !== "mlg") tabProps.factorAtleta = "peso";
  return (["peso", "mlg"] as FactorAtletaValue[]).includes(tabProps.factorAtleta);
}
export function dispatchFactorAtleta(newValue: FactorAtletaValue): void {
  if (["peso", "mlg"].includes(newValue)) tabProps.factorAtleta = newValue;
  else tabProps.factorAtleta = "peso";
}
export function evalFactorAtvLvl(): boolean {
  if (
    (typeof tabProps.factorAtvLvl !== "string" && typeof tabProps.factorAtvLvl !== "number") ||
    (typeof tabProps.factorAtvLvl === "number" && !Number.isFinite(tabProps.factorAtvLvl))
  )
    tabProps.factorAtvLvl = 1.4;
  if (typeof tabProps.factorAtvLvl === "string")
    tabProps.factorAtvLvl = parseNotNaN(tabProps.factorAtvLvl) as NafTypeValue;
  if (![1.2, 1.4, 1.6, 1.9, 2.2].includes(tabProps.factorAtvLvl as number)) tabProps.factorAtvLvl = 1.4;
  return ([1.2, 1.4, 1.6, 1.9, 2.2] as Omit<NafTypeValue, "1.2" | "1.4" | "1.6" | "1.9" | "2.2">[]).includes(
    tabProps.factorAtvLvl as number,
  );
}
export function dispatchFactorAtvLvl(newValue: NafTypeValue): void {
  if (typeof newValue === "string") newValue = parseNotNaN(newValue) as NafTypeValue;
  if ([1.2, 1.4, 1.6, 1.9, 2.2].includes(newValue as number)) tabProps.factorAtvLvl = newValue;
  else tabProps.factorAtvLvl = 1.4;
}
export function evalActivityLvl(): boolean {
  if (
    typeof person.atvLvl !== "string" ||
    !["sedentario", "leve", "moderado", "intenso", "muitoIntenso"].includes(person.atvLvl)
  )
    person.atvLvl = "leve";
  return ["sedentario", "leve", "moderado", "intenso", "muitoIntenso"].includes(person.atvLvl);
}
export function evalIMC(): boolean {
  if (typeof tabProps.IMC !== "number" || !Number.isFinite(tabProps.IMC)) tabProps.IMC = 0;
  return typeof tabProps.IMC === "number" && Number.isFinite(tabProps.IMC);
}
export function evalPseudoNum(n: primitiveType): number {
  if (typeof n === "number") {
    if (!Number.isFinite(n)) return 0;
    return n;
  } else if (typeof n === "string") {
    n = n.replaceAll(/[^0-9\.]/g, "");
    if (n === "") n = "0";
    return parseNotNaN(n);
  } else if (typeof n === "boolean") return n ? 1 : 0;
  else return 0;
}
export function evalMatchTMBElements(): boolean {
  if (!(tabProps.lockGl instanceof Element)) tabProps.lockGl = document.getElementById("lockGordCorpLvl");
  if (!(tabProps.spanFa instanceof HTMLElement)) tabProps.spanFa = document.getElementById("spanFactorAtleta");
  return tabProps.lockGl instanceof Element && tabProps.spanFa instanceof HTMLElement;
}
