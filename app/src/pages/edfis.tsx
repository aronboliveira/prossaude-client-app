import { ENTabsProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { Person } from "@/lib/global/declarations/classes";
import { changeTabDCutLayout } from "@/lib/locals/edFisNutPage/edFisNutModel";
import { defaultResult } from "@/lib/locals/edFisNutPage/edFisNutController";
import { parseNotNaN } from "@/lib/global/gModel";
import ENTipsBtnWrapper from "../../components/interactive/edfis/ENTipsBtnWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import WatcherEN from "../../components/interactive/edfis/WatcherEN";
import {
  elementNotFound,
  extLine,
  inputNotFound,
  multipleElementsNotFound,
  stringError,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import { autofillResult, contextAutofill, contextAutofillNums, entryEl, targEl } from "@/lib/global/declarations/types";
import {
  defineTargInps,
  fluxFormIMC,
  getNumCol,
  matchPersonPropertiesDC,
  matchPersonPropertiesWH,
  matchTMBElements,
  updateAtvLvl,
  updateIndexesContexts,
  updatePGC,
  validateEvResultNum,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
export const tabProps: ENTabsProps = {
  edIsAutoCorrectOn: true,
  isAutoFillActive: true,
  areColGroupsSimilar: false,
  areNumConsOpsValid: false,
  numColsCons: 1,
  numCons: 1,
  numConsLastOp: 1,
  numCol: 1,
  IMC: 0,
  MLG: 0,
  TMB: 0,
  GET: 0,
  PGC: 0,
  factorAtvLvl: 1.4,
  factorAtleta: "Peso",
  edGenValue: "masculino",
  targInpWeigth: undefined,
  targInpHeigth: undefined,
  targInpIMC: undefined,
  targInpMLG: undefined,
  targInpTMB: undefined,
  targInpGET: undefined,
  targInpPGC: undefined,
  targInpSumDCut: undefined,
};
export const person = new Person("masculino", 0, 0, 0, 0, "leve");
const ENForm = lazy(() => import("../../components/interactive/edfis/EdFisForm"));
export default function EdFisNutPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Error loading form Physical Education and Nutrition' />}>
      <div id='bgDiv'>
        <header>
          <div role='group' className='pad1pc'>
            <div role='group' className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv'>
              <div role='group' id='hTextDiv' className='noInvert'>
                <h1 className='bolded flexJBt' id='hForm'>
                  <strong>Ficha de Avaliação:</strong>
                </h1>
                <h2>
                  <strong>Educação Física & Nutrição</strong>
                </h2>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
                <ENTipsBtnWrapper />
              </div>
              <HeaderDate />
            </div>
          </div>
        </header>
        <main>
          <SwitchDiv autofill={true} />
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <ENForm />
          </Suspense>
        </main>
      </div>
      <WatcherEN />
    </ErrorBoundary>
  );
}
export function exeAutoFill(targ: targEl, isAutoFillActive: boolean = true, context: string = "cons"): autofillResult {
  let numRef = 1,
    arrIndexes: number[] = [],
    arrtargInps: targEl[] = [];
  try {
    const consTablesFs = document.getElementById("fsProgConsId");
    const gordCorpLvl = document.getElementById("gordCorpLvl");
    const formTMBTypeElement = document.getElementById("formCalcTMBType");
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
      return (
        [
          numRef || 1,
          [person.weight || 0, person.height || 0, person.sumDCut || 0],
          arrIndexes || [0, 0, 0, 0, 0],
          arrtargInps || [],
        ] || [1, [0, 0, 0], [0, 0, 0, 0, 0], []]
      );
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
    return (
      [
        numRef || 1,
        [person.weight || 0, person.height || 0, person.sumDCut || 0],
        arrIndexes || [0, 0, 0, 0, 0],
        arrtargInps || [],
      ] || [1, [0, 0, 0], [0, 0, 0, 0, 0], []]
    );
  } catch (e) {
    console.error(`Error executing exeAutoFill:\n${(e as Error).message}`);
    return (
      [
        numRef || 1,
        [person.weight || 0, person.height || 0, person.sumDCut || 0],
        arrIndexes || [0, 0, 0, 0, 0],
        arrtargInps || [],
      ] || [1, [0, 0, 0], [0, 0, 0, 0, 0], []]
    );
  }
}
export function callbackTextBodyEl(person: Person): [string, string, string] {
  const textBodytype = document.getElementById("textBodytype");
  const protocolo = document.getElementById("tabSelectDCutId");
  const tabDC = document.getElementById("tabDCut");
  const genElement = document.getElementById("genId");
  const genBirthRel = document.getElementById("genBirthRelId");
  const genFisAlin = document.getElementById("genFisAlinId");
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
  return (
    [
      person?.gen || "masculino",
      (genElement as entryEl)?.value || "masculino",
      (genFisAlin as entryEl)?.value || "masculinizado",
    ] || ["masculino", "masculino", "masculinizado"]
  );
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
    result: autofillResult =
      [
        tabProps.numCol || 2,
        [person.weight || 0, person.height || 0, person.sumDCut || 0],
        contextComp[1][3] || [0, 0, 0, 0, 0], //[1][3] === arrIndexes
        contextComp[0][3] || [], //[0][3] === arrTargs
      ] || defaultResult;
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
      const callbackResult: [number, autofillResult] = [prop || 0, result || defaultResult] || [0, defaultResult];
      fillResult(callbackResult[1], 0);
    } else if (inpWHS.classList.contains("inpHeigth")) {
      if (parseNotNaN(inpWHS.value, 0, "float") > 3) inpWHS.value = "3";
      prop = person.height;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.height = prop;
      if (tabProps.isAutoFillActive === true) result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [prop || 0, result || defaultResult] || [0, defaultResult];
      fillResult(callbackResult[1], 1);
    } else if (inpWHS.classList.contains("inpSumDCut") || inpWHS.classList.contains("selFactorAtletaClass")) {
      if (inpWHS.classList.contains("inpSumDCut") && parseNotNaN(inpWHS.value, 0, "float") > 999) inpWHS.value = "999";
      prop = person.sumDCut;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.sumDCut = prop;
      if (tabProps.isAutoFillActive === true) result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [prop || 0, result || defaultResult] || [0, defaultResult];
      fillResult(callbackResult[1], 2);
    } else throw elementNotFound(inpWHS, `Inp WHS classList`, extLine(new Error()));
  } catch (e) {
    console.error(`Error executing callbackWHS for ${inpWHS?.id || "unidentified"}:${(e as Error).message}`);
  }
  return [prop || 0, result || defaultResult] || [0, defaultResult];
}
