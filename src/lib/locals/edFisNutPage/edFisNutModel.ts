import { Person } from "../../global/declarations/classes";
import { entryEl, targEl } from "../../global/declarations/types";
import { filterIdsByGender } from "../../global/gModel";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
import {
  extLine,
  elementNotFound,
  inputNotFound,
  multipleElementsNotFound,
  stringError,
} from "../../global/handlers/errorHandler";

export function checkInnerColGroups(
  parentEl: targEl,
  areAllColGroupsSimilar: boolean = false
): [number, boolean] {
  const validColGroupsChildCount = [];
  const colGroups = Array.from(parentEl?.querySelectorAll("colgroup") ?? []);

  if (parentEl instanceof HTMLElement && colGroups?.flat(1)?.length > 0) {
    //popula arrays de colgroups com base em filtragem de instância
    for (let i = 0; i < colGroups.length; i++) {
      const arrColGrpChilds = Array.from(colGroups[i].children);
      if (arrColGrpChilds?.every(col => col instanceof HTMLTableColElement))
        validColGroupsChildCount.push(colGroups[i].childElementCount);
      else {
        //filtragem para incluir somente as instâncias validadas como colunas
        validColGroupsChildCount.push(
          arrColGrpChilds.filter(col => col instanceof HTMLTableColElement)
            .length
        );
        console.warn(`Some children of <colgroup> are not HTMLTableColElement.
        Number of valid children obtained: ${validColGroupsChildCount.length}.
        Total of children: ${arrColGrpChilds?.length}`);

        //descreve as instâncias achadas, para detalhar quais elementos não foram validados como colunas
        const colsInstances = [];
        arrColGrpChilds.forEach(arrColGrpChild => {
          const childInstance = `${
            Object.prototype.toString.call(arrColGrpChild).slice(8, -1) ??
            "null"
          }`;
          colsInstances.push(childInstance);
          if (childInstance !== `HTMLTableColElement`)
            elementNotFound(
              arrColGrpChild,
              "child <col>",
              extLine(new Error())
            );
        });
      }
    }

    //filtra array de colgroups válida com base em colunas de tamanho similar
    const pairedColGroupsValid = [];
    for (let m = 0; m < validColGroupsChildCount.length; m++) {
      if (m === 0) continue;
      else {
        if ((validColGroupsChildCount[m] = validColGroupsChildCount[m - 1]))
          pairedColGroupsValid.push(true);
        else {
          console.warn(`Erro validando par de Col Groups.
          Par invalidado: ${validColGroupsChildCount[m] ?? "null"} com ${
            validColGroupsChildCount[m - 1] ?? "null"
          }`);
          pairedColGroupsValid.push(false);
        }
      }
    }

    //verifica se todos os pares são válidos para, em caso negativo, fornecer warn
    if (pairedColGroupsValid.every(pairedColGroup => pairedColGroup === true))
      areAllColGroupsSimilar = true;
    else
      console.warn(`Grupos de Colunas não são similares no número de children`);
    areAllColGroupsSimilar = false;
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      `arguments for checkInnerColGroups(), areColGroupValids: ${
        areAllColGroupsSimilar ?? false
      }`,
      parentEl,
      `${JSON.stringify(colGroups) || null}`
    );

  return [validColGroupsChildCount?.length ?? 0, areAllColGroupsSimilar];
}

export function checkTabRowsIds(tab: targEl): string[] {
  const arrTabRowsIds: string[] = [];

  tab instanceof HTMLTableElement && tab.id === "tabDCut"
    ? Array.from(tab.querySelectorAll("tr.tabRowDCutMed")).forEach(tabRow => {
        const rowId = tabRow?.id;
        rowId?.match(/^row/)?.toString()
          ? arrTabRowsIds?.push(rowId.slice(3).toLowerCase())
          : stringError(
              `obtendo id da row ${tabRow}`,
              rowId,
              extLine(new Error())
            );
      })
    : elementNotFound(tab, "tabDC in checkTabRowsIds", extLine(new Error()));

  return arrTabRowsIds || [""];
}

export function changeTabDCutLayout(
  protocolo: targEl,
  tabDC: targEl,
  bodyType: targEl
): string {
  if (
    (protocolo instanceof HTMLSelectElement ||
      protocolo instanceof HTMLInputElement) &&
    tabDC instanceof HTMLTableElement &&
    (bodyType instanceof HTMLSelectElement ||
      bodyType instanceof HTMLInputElement)
  ) {
    const filteredOpsProtocolo = Array.from(protocolo.children)?.filter(
      childProtocolo => childProtocolo instanceof HTMLOptionElement
    );

    if (
      filteredOpsProtocolo?.length >= Array.from(protocolo.children)?.length
    ) {
      //executa loop para todas as opções de protocolo válidas
      for (let iOp = 0; iOp < filteredOpsProtocolo.length - 1; iOp++) {
        const arrayTabIds = checkTabRowsIds(tabDC);
        const genderedIds = filterIdsByGender(arrayTabIds, bodyType.value);
        /*após checagem de ids e filtragem por gênero da pessoa, 
        valida se de fato as rows sem informação (visuais) não estão sendo capturadas,
        e se a filtragem por gênero ocorreu corretamente*/
        if (
          arrayTabIds?.length ===
            Array.from(tabDC.rows).filter(row =>
              row.classList.contains("tabRowDCutMed")
            )?.length &&
          genderedIds?.length > 0
        ) {
          //separa casos por tipo de protocolo
          if ((protocolo as entryEl)?.value.match(/^pollock3$/i)?.toString()) {
            if (
              (bodyType.value === "masculino" ||
                bodyType.value === "feminino") &&
              genderedIds.length === 3
            )
              defineHiddenRows(tabDC, arrayTabIds, genderedIds);
            else if (bodyType.value === "neutro" && genderedIds.length === 5)
              defineHiddenRows(tabDC, arrayTabIds, genderedIds, "nb");
            else
              stringError(
                "validating .value of bodyType",
                bodyType?.value,
                extLine(new Error())
              );
          } else if (
            (protocolo as entryEl)?.value.match(/^pollock7$/i)?.toString()
          ) {
            Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"))?.forEach(
              medTr => {
                if ((medTr as HTMLElement)?.hidden) {
                  medTr.removeAttribute("hidden");
                  const innerInp = medTr.querySelector("input");
                  if (innerInp) innerInp.setAttribute("required", "");
                }
              }
            );
            return "pollock7";
          } else
            stringError(
              "obtaining pollock value",
              (protocolo as entryEl)?.value,
              extLine(new Error())
            );
        } else
          console.warn(
            `Error verifying number and/or id from rows. Row Elements ${
              JSON.stringify(arrayTabIds) || null
            }; Obtained number: ${arrayTabIds?.length}; Expected number: ${
              Array.from(tabDC.rows).filter(row =>
                row.classList.contains("tabRowDCutMed")
              )?.length
            }
            Gender-filtered elements ${
              JSON.stringify(genderedIds) || null
            }; Obtained number: ${genderedIds?.length}; Expected number: 3`
          );
      }
    } else
      console.warn(
        `Error checking protocol options. Total of options validated: ${filteredOpsProtocolo.length}`
      );
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "validating elements for initial execution of changeTabDCutLayout()",
      protocolo,
      tabDC,
      bodyType
    );

  return "pollock3";
}

export function defineHiddenRows(
  tabDC: targEl,
  arrayTabIds: string[] = [],
  genderedIds: string[] = [],
  context: string = "bin"
): void {
  if (
    tabDC instanceof HTMLTableElement &&
    arrayTabIds?.length > 0 &&
    arrayTabIds.every(tabId => typeof tabId === "string") &&
    genderedIds?.length > 0 &&
    genderedIds.every(genId => typeof genId === "string") &&
    (context === "bin" || context === "nb")
  ) {
    const matchedIds = [];
    /*percorrimento de matriz da tabela para capitalizar primeiro dígito
    e definir matchedIds*/
    for (const genId of genderedIds) {
      for (const tabId of arrayTabIds) {
        if (
          genId?.toLowerCase() === tabId &&
          genId.charAt(0).toUpperCase() + genId.slice(1)
        )
          matchedIds.push(
            `row${genId.charAt(0).toUpperCase() + genId.slice(1)}`
          );
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
              stringError("context", context, extLine(new Error()));
          }
        }
      }
    });
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "argumentos para defineHiddenRows",
      tabDC,
      `${JSON.stringify(arrayTabIds) || null}`,
      `${JSON.stringify(genderedIds) || null}`,
      context
    );
}
//correção para limitação da fórmula de PGC
export function evaluatePGCDecay(
  person: Person,
  targInpPGC: targEl,
  PGC: number = 0
): [boolean, number] {
  let foundDecayPoint = false;
  if (
    person instanceof Person &&
    (targInpPGC instanceof HTMLInputElement ||
      targInpPGC instanceof HTMLSelectElement ||
      targInpPGC instanceof HTMLTextAreaElement) &&
    typeof PGC === "number"
  ) {
    const initSumDCut = person.sumDCut;
    const decreasedPerson = new Person(
      person.gen,
      person.age,
      person.weight,
      person.height,
      person.sumDCut,
      person.atvLvl
    );
    decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
    let decreasedPGC = decreasedPerson.calcPGC(decreasedPerson)[0],
      sumAcc = 1;
    //caso padrão de decay
    if (decreasedPGC > PGC) {
      foundDecayPoint = true;
      alertPGCRounding(targInpPGC);
      const arrDecreasedPGC = [];
      //busca pontos de decay anteriores
      while (decreasedPerson?.sumDCut > 0) {
        sumAcc++;
        decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
        decreasedPGC = decreasedPerson.calcPGC(decreasedPerson)[0];
        arrDecreasedPGC.push(decreasedPGC);
        if (decreasedPGC < PGC) break;
        if (sumAcc > 999) break;
      }
      //caso ponto de decays sejam validados, normaliza valor para evitar anomalias de entrada
      if (arrDecreasedPGC?.length > 0) {
        decreasedPerson?.sumDCut > 515
          ? (PGC = 60.5)
          : (PGC =
              Math.ceil((Math.max(...arrDecreasedPGC) + 0.05) * 10) / 10 +
              ((initSumDCut - 260) / 100) * 5);
      } else PGC = decreasedPGC;
    }
    /*casos específicos para handling de input anômalo (além do possível para um ser humano), 
      evitando bugs nos listeners devido a NaN e loops de normalização */
    if (decreasedPGC <= PGC && (PGC > 100 || decreasedPerson?.sumDCut > 514)) {
      console.warn(
        `Valor anômalo de entrada para sumDCut e/ou PGC. Valor aproximado fornecido`
      );
      foundDecayPoint = true;
      alertPGCRounding(targInpPGC);
      PGC = 60.45 + 0.05 * ((decreasedPerson?.sumDCut ?? 514) - 513);
    }
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "argumentos para evaluatePGCDecay",
      `${JSON.stringify(person) || null}`,
      targInpPGC,
      PGC
    );

  if (PGC < 0 || Number.isNaN(PGC) || PGC === Math.abs(Infinity)) PGC = 0;
  return [foundDecayPoint, PGC];
}

export function alertPGCRounding(targInpPGC: targEl): void {
  if (targInpPGC instanceof HTMLInputElement) {
    const spanRoundingAlertIcon = document.getElementById(
      `alert_${(targInpPGC as entryEl).id}`
    );
    spanRoundingAlertIcon instanceof HTMLSpanElement &&
    spanRoundingAlertIcon.hidden === false
      ? (spanRoundingAlertIcon.hidden = true)
      : elementNotFound(
          spanRoundingAlertIcon,
          "spanRoundingAlertIcon",
          extLine(new Error())
        );
  } else
    inputNotFound(
      targInpPGC,
      "targInpPGC in alertPGCRounding",
      extLine(new Error())
    );
}
