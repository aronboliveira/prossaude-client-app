import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import {
  elementNotFound,
  extLine,
  inputNotFound,
  maxNumberError,
  multipleElementsNotFound,
  stringError,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import {
  autofillResult,
  contextAutofill,
  contextAutofillNums,
  elCollection,
  entryEl,
  targEl,
} from "@/lib/global/declarations/types";
import {
  addListenerInnerTabs,
  defaultResult,
  validateTitlesForTargs,
} from "@/lib/locals/edFisNutPage/edFisNutController";
import { fluxGen, parseNotNaN } from "@/lib/global/gModel";
import {
  addCanvasListeners,
  addListenerExportBtn,
  addResetAstListener,
  getGlobalEls,
  watchLabels,
} from "@/lib/global/gController";
import { dinamicGridAdjust } from "@/lib/global/gStyleScript";
import { Person } from "@/lib/global/declarations/classes";
import {
  changeToAstDigit,
  handleCondtReq,
  subForm,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import {
  defineTargInps,
  fluxFormIMC,
  getNumCol,
  matchPersonPropertiesDC,
  matchPersonPropertiesWH,
  matchTMBElements,
  switchAutoFill,
  switchRequiredCols,
  updateAtvLvl,
  updateIndexesContexts,
  updatePGC,
  validateEvResultNum,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { ENTabsProps } from "@/lib/global/declarations/interfaces";
import TrioReadNumCons from "../../components/interactive/edfis/TrioReadNumCons";
import TabAtFirsRot from "../../components/interactive/edfis/TabAtFisRot";
import TabAtFirsProp from "../../components/interactive/edfis/TabAtFisProp";
import TabComorb from "../../components/interactive/edfis/TabComorb";
import TabIndPerc from "../../components/interactive/edfis/TabIndPerc";
import TabDCut from "../../components/interactive/edfis/TabDCut";
import TabProgSVi from "../../components/interactive/edfis/TabProgSVi";
import TabMedAnt from "../../components/interactive/edfis/TabMedAnt";
import ENTips from "../../components/interactive/edfis/ENTips";
import ENDeclaration from "../../components/interactive/edfis/ENDeclaration";
import { changeTabDCutLayout } from "@/lib/locals/edFisNutPage/edFisNutModel";

export const tabProps: ENTabsProps = {
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
export let edIsAutoCorrectOn = true,
  isAutoFillActive = true,
  areColGroupsSimilar = false,
  areNumConsOpsValid = false,
  numColsCons = 1,
  numCons = 1,
  numConsLastOp = 1;

export default function EdFisNutPage(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    handleLinkChanges("edfis", "EN Page Style");
    //inicializações e chamadas
    const selFactorAtleta = document.getElementById("selFactorAtleta");
    const genElement = document.getElementById("genId");
    tabProps.edGenValue = (genElement as entryEl)?.value || "masculino";
    edIsAutoCorrectOn = getGlobalEls(edIsAutoCorrectOn, "num");
    addListenerExportBtn("edFisNut");
    dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
    selFactorAtleta instanceof HTMLSelectElement
      ? (tabProps.factorAtleta = selFactorAtleta.value)
      : elementNotFound(
          selFactorAtleta,
          "selFactorAtleta",
          extLine(new Error())
        );
    const mountInterval = setInterval(interv => {
      if (document.getElementById("tabIndPerc")) {
        setMounted(true);
        clearInterval(interv);
        return;
      }
    }, 200);
    setTimeout(() => {
      setMounted(true);
      clearInterval(mountInterval);
      !document.getElementById("tabIndPerc") &&
        console.warn(`Could not find tabIndPerc`);
    }, 10000);
  }, []);
  useEffect(() => {
    if (mounted && document.getElementsByTagName("table").length > 3) {
      const selectNumCons = document.getElementById("selectNumCons");
      const consTablesFs = document.getElementById("fsProgConsId");
      const genElement = document.getElementById("genId");
      const atvLvlElement = document.getElementById("selectLvlAtFis");
      document.querySelectorAll(".tabInpProg").forEach((inp, i) => {
        try {
          if (
            !(
              inp instanceof HTMLInputElement &&
              (inp.type === "number" || inp.type === "text")
            )
          )
            throw inputNotFound(
              inp,
              `Validation of Input instance and type`,
              extLine(new Error())
            );
          if (inp.required) {
            inp.minLength = 1;
            inp.maxLength = 99;
            inp.pattern = "^[d,.]+$";
            inp.classList.add("minText", "maxText", "pattern");
            if (inp.type === "number") {
              inp.min = "0.05";
              inp.max = "999999";
              inp.classList.add("minNum", "maxNum");
            }
          }
          inp.type === "number"
            ? inp.addEventListener("input", ev =>
                handleCondtReq(ev.currentTarget as HTMLInputElement, {
                  minNum: 0.05,
                  maxNum: 999999,
                  min: 1,
                  max: 99,
                  pattern: ["^[d,.]+$", ""],
                })
              )
            : inp.addEventListener("input", ev =>
                handleCondtReq(ev.currentTarget as HTMLInputElement, {
                  min: 1,
                  max: 99,
                  pattern: ["^[d,.]+$", ""],
                })
              );
        } catch (e) {
          console.error(
            `Error executing iteration ${i} for Tab Inp Prog application of requirements:\n${
              (e as Error).message
            }`
          );
        }
      });
      tabProps.IMC =
        parseFloat(
          parseFloat((tabProps.targInpIMC as entryEl)?.value || "0").toFixed(4)
        ) || 0;
      tabProps.MLG =
        parseFloat(
          parseFloat((tabProps.targInpMLG as entryEl)?.value || "0").toFixed(4)
        ) || 0;
      tabProps.TMB =
        parseFloat(
          parseFloat((tabProps.targInpTMB as entryEl)?.value || "0").toFixed(4)
        ) || 0;
      tabProps.GET =
        parseFloat(
          parseFloat((tabProps.targInpGET as entryEl)?.value || "0").toFixed(4)
        ) || 0;
      tabProps.PGC =
        parseFloat(
          parseFloat((tabProps.targInpPGC as entryEl)?.value || "0").toFixed(4)
        ) || 0;
      tabProps.factorAtvLvl =
        parseNotNaN((document.getElementById("nafType") as entryEl)?.value) ||
        1.4;
      try {
        if (
          !(
            selectNumCons instanceof HTMLSelectElement ||
            selectNumCons instanceof HTMLDataListElement
          )
        )
          throw elementNotFound(
            selectNumCons,
            `Select Num Cons instance`,
            extLine(new Error())
          );
        numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
        if (!(selectNumCons.lastElementChild instanceof HTMLOptionElement))
          throw elementNotFound(
            selectNumCons.lastElementChild,
            `Last Element of Select for Número de Consulta`,
            extLine(new Error())
          );
        numConsLastOp = parseNotNaN(
          selectNumCons?.lastElementChild?.value ?? "1",
          1
        );
        numColsCons = Math.min(
          ...Array.from(document.querySelectorAll("table")).map(tab => {
            return tab instanceof HTMLTableElement
              ? tab.querySelectorAll("col").length
              : 0;
          })
        );
        if (!(numConsLastOp === numColsCons && numConsLastOp >= 3)) {
          console.error(`
          numConsLastOp: ${numConsLastOp};
          numColsCons: ${numColsCons};
          numConsLastOp: ${numConsLastOp};
          `);
          throw maxNumberError(
            (selectNumCons?.lastElementChild as HTMLOptionElement)?.value ??
              "1",
            "Options para Consultas",
            extLine(new Error())
          );
        }
        areNumConsOpsValid = true;
      } catch (e) {
        console.error(
          `Error executing procedure for determining Número de Consulta:\n${
            (e as Error).message
          }`
        );
      }
      person.gen = (genElement as entryEl)?.value || "masculino";
      person.age =
        parseNotNaN(
          (document.getElementById("dateAgeId") as entryEl)?.value ?? "0"
        ) || 0;
      numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
      person.sumDCut =
        parseNotNaN(
          (document.getElementById(`tabInpRowDCut9_${numCons + 1}`) as entryEl)
            ?.value ?? "0",
          0,
          "float"
        ) || 0;
      person.weight =
        parseNotNaN(
          (
            document.getElementById(
              `tabInpRowMedAnt2_${numCons + 1}`
            ) as entryEl
          )?.value ?? "0",
          0,
          "float"
        ) || 0;
      person.height =
        parseNotNaN(
          (
            document.getElementById(
              `tabInpRowMedAnt3_${numCons + 1}`
            ) as entryEl
          )?.value ?? "0",
          0,
          "float"
        ) || 0;
      person.atvLvl = (atvLvlElement as entryEl)?.value ?? "leve";
      [numColsCons, areColGroupsSimilar] = addListenerInnerTabs(
        consTablesFs,
        numColsCons,
        areColGroupsSimilar
      );
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        tabProps.targInpSumDCut,
        tabProps.targInpPGC,
      ] = validateTitlesForTargs(numCons);
      try {
        if (
          !(
            genElement instanceof HTMLSelectElement ||
            genElement instanceof HTMLInputElement
          )
        )
          throw elementNotFound(
            genElement,
            `Gen Element`,
            extLine(new Error())
          );
      } catch (e) {
        console.error(
          `Error executing procure for adding listeners to genElements:\n${
            (e as Error).message
          }`
        );
      }
      addCanvasListeners();
      addResetAstListener();
      syncAriaStates(document.querySelectorAll("*"));
      watchLabels();
    }
  }, [mounted]);
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <div id="bgDiv">
        <header>
          <div role="group" className="pad1pc">
            <div
              role="group"
              className="flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC"
              id="hDiv"
            >
              <div role="group" id="hTextDiv" className="noInvert">
                <h1 className="bolded flexJBt" id="hForm">
                  <strong>Ficha de Avaliação:</strong>
                </h1>
                <h2>
                  <strong>Educação Física & Nutrição</strong>
                </h2>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
                <button
                  className="transparent-el-bg mg-2bv noInvert"
                  id="tipsBtn"
                  onClick={() => setTips(!shouldShowTips)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-question-circle-fill widMax-3r htMax1-5r"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                  </svg>
                </button>
                {shouldShowTips && (
                  <ENTips state={shouldShowTips} dispatch={setTips} />
                )}
              </div>
              <span
                role="group"
                className="control flexJSt flexQ900NoW"
                id="spanHFlex"
              >
                <input
                  type="date"
                  className="form-control d-ibl"
                  id="dateHeader"
                  placeholder="Date"
                  data-title="Data no cabeçalho"
                  required
                />
                <button
                  type="button"
                  className="datBtn d-ibl btn btn-secondary"
                  id="headerDatBtn"
                >
                  Usar data atual
                </button>
              </span>
            </div>
          </div>
        </header>
        <main>
          <div role="group" className="switchDiv flexQ900NoWC divTab">
            <span
              role="group"
              className="form-switch spanLeft"
              id="autofillDiv"
            >
              <input
                type="checkbox"
                className="deActBtn form-check-input"
                role="switch"
                id="autoFillBtn"
                data-title="Cálculo Automático"
                defaultChecked
                onChange={ev => {
                  isAutoFillActive = switchAutoFill(
                    ev.currentTarget,
                    isAutoFillActive
                  );
                }}
              />{" "}
              <strong>Cálculo Automático</strong>
            </span>
            <span
              role="group"
              className="form-switch spanRight"
              id="autocorrectDiv"
            >
              <input
                type="checkbox"
                className="deActBtn form-check-input"
                role="switch"
                id="deactAutocorrectBtnPac"
                data-title="Autocorreção"
                defaultChecked
              />{" "}
              <strong>Autocorreção</strong>
            </span>
          </div>
          <hr />
          <form
            name="formEdFisName"
            action="#"
            method="post"
            target="_top"
            id="formEdFis"
          >
            <fieldset name="fsAnamGName" id="fsAnamGId" className="fsMain">
              <legend className="legMain form-padded" id="fsAnamGLeg">
                Identificação
              </legend>
              <section className="sectionMain" id="fsAnamGSect">
                <div
                  role="group"
                  className="fsAnamGDiv alItSt900Q flexQ900NoWC flexAlItE flexNoW flexSimple wsNoW cGap0 ws900N noInvert"
                  id="fsAnamGDiv1"
                >
                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt col"
                    id="fsAnamGSpan1"
                  >
                    <label htmlFor="firstNameId" className="labelIdentif">
                      Primeiro Nome (Simples ou Composto):
                      <input
                        type="text"
                        name="firstNameName"
                        id="firstNameId"
                        className="form-control noInvert autocorrect inpIdentif minText maxText patternText"
                        autoComplete="given-name"
                        data-title="Primeiro nome"
                        data-reqlength="3"
                        data-maxlength="99"
                        data-pattern="[^0-9]"
                        data-flags="gi"
                        minLength={3}
                        maxLength={99}
                        required
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt col"
                    id="fsAnamGSpan2"
                  >
                    <label htmlFor="additionalNameId" className="labelIdentif">
                      Sobrenome(s) do Meio, se presente(s):
                      <input
                        type="text"
                        name="additionalNameName"
                        id="additionalNameId"
                        className="form-control noInvert autocorrect inpIdentif"
                        data-title="Nome do meio"
                        autoComplete="additional-name"
                        onInput={ev =>
                          handleCondtReq(ev.currentTarget, {
                            min: 3,
                            max: 99,
                            pattern: ["[^0-9]", "gi"],
                          })
                        }
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt col"
                    id="fsAnamGSpan3"
                  >
                    <label htmlFor="familyNameId" className="labelIdentif">
                      Último Sobrenome:
                      <input
                        type="text"
                        name="familyNameName"
                        id="familyNameId"
                        className="form-control noInvert autocorrect inpIdentif minText maxText patternText"
                        autoComplete="family-name"
                        required
                        data-title="Último nome"
                        data-reqlength="3"
                        data-maxlength="99"
                        data-pattern="[^0-9]"
                        data-flags="gi"
                        minLength={3}
                        maxLength={99}
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                </div>
                <span
                  role="group"
                  className="fsAnamGSpan flexAlItCt col"
                  id="fsAnamGSpan4"
                >
                  <label htmlFor="socialNameId" className="labelIdentif">
                    Nome Social:
                    <input
                      type="text"
                      name="socialNameName"
                      id="socialNameId"
                      className="form-control noInvert autocorrect inpIdentif"
                      data-title="Nome social"
                      autoComplete="given-name"
                      onInput={ev =>
                        handleCondtReq(ev.currentTarget, {
                          min: 3,
                          max: 99,
                          pattern: ["[^0-9]", "gi"],
                        })
                      }
                    />
                  </label>
                </span>
                <span role="group" className="fsAnamGSpan" id="fsAnamGSpan12">
                  <label htmlFor="dateAgeId" className="labelIdentif">
                    Idade:
                    <input
                      type="number"
                      name="dateAgeName"
                      id="dateAgeId"
                      className="form-control noInvert inpIdentif minText maxText minNum maxNum patternText"
                      min="0"
                      max="255"
                      defaultValue="30"
                      required
                      data-title="Idade"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="255"
                      data-pattern="^[\d,.]+$"
                      onInput={ev => {
                        if (
                          person instanceof Person &&
                          "age" in person &&
                          typeof person.age === "number" &&
                          typeof isAutoFillActive === "boolean"
                        ) {
                          person.age = validateEvResultNum(
                            ev.currentTarget,
                            person.age
                          );
                          //sem autofill, dá update somente em person.age
                          isAutoFillActive &&
                            exeAutoFill(
                              ev.currentTarget,
                              isAutoFillActive,
                              "cons"
                            );
                        } else
                          multipleElementsNotFound(
                            extLine(new Error()),
                            "argumentas for callbackAgeElement()",
                            `${JSON.stringify(person)}`,
                            person?.age,
                            ev.currentTarget,
                            `${[
                              numCons || 1,
                              [person.weight, person.height, person.sumDCut],
                              [
                                tabProps.IMC,
                                tabProps.MLG,
                                tabProps.TMB,
                                tabProps.GET,
                                tabProps.PGC,
                              ],
                              [
                                tabProps.targInpWeigth,
                                tabProps.targInpHeigth,
                                tabProps.targInpIMC,
                                tabProps.targInpMLG,
                                tabProps.targInpTMB,
                                tabProps.targInpGET,
                                tabProps.targInpSumDCut,
                                tabProps.targInpPGC,
                              ],
                            ].toString()}`,
                            isAutoFillActive
                          );
                      }}
                    />
                  </label>
                </span>

                <div role="group" id="genDiv" className="gridTwoCol noInvert">
                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan"
                    id="spanFsAnamG13"
                  >
                    <label htmlFor="genId" className="labelIdentif">
                      Gênero:
                      <select
                        name="genName"
                        id="genId"
                        className="form-select noInvert inpIdentif inpGen widMin75Q900"
                        data-title="Gênero"
                        defaultValue={"masculino"}
                        required
                        onChange={ev => {
                          const genBirthRel =
                            document.getElementById("genBirthRelId");
                          const genTrans =
                            document.getElementById("genTransId");
                          const genFisAlin =
                            document.getElementById("genFisAlinId");
                          const textBodytype =
                            document.getElementById("textBodytype");
                          try {
                            if (
                              !(
                                genBirthRel instanceof HTMLSelectElement ||
                                genBirthRel instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genBirthRel,
                                `Gen Birth Relation Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genTrans instanceof HTMLSelectElement ||
                                genTrans instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genTrans,
                                `Gen Trans Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genFisAlin instanceof HTMLSelectElement ||
                                genFisAlin instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genFisAlin,
                                `Gen Physical Alignment Element`,
                                extLine(new Error())
                              );
                            person.gen =
                              fluxGen(
                                [
                                  ev.currentTarget,
                                  genBirthRel,
                                  genTrans,
                                  genFisAlin,
                                ],
                                ev.currentTarget.value
                              ) || "masculino";
                            if (
                              (genTrans.value !== "avancado" ||
                                ev.currentTarget.value === "naoBinario") &&
                              genTrans.hidden === false &&
                              genFisAlin.hidden === false
                            ) {
                              textBodytype instanceof HTMLInputElement ||
                              textBodytype instanceof HTMLSelectElement
                                ? (textBodytype.value = person.gen)
                                : inputNotFound(
                                    textBodytype,
                                    "textBodyType in callback for gender Elements",
                                    extLine(new Error())
                                  );
                            }
                          } catch (e) {
                            console.error(
                              `Error executing callback for Gen Elements:\n${
                                (e as Error).message
                              }`
                            );
                          }
                        }}
                      >
                        <option className="optIdentif optGen" value="masculino">
                          Masculino | Homem binário
                        </option>
                        <option className="optIdentif optGen" value="feminino">
                          Feminino | Mulher binária
                        </option>
                        <option
                          className="optIdentif optGen"
                          value="naoBinario"
                        >
                          Não-Binário
                        </option>
                        <option className="optIdentif optGen" value="outros">
                          Outros
                        </option>
                        <option className="optIdentif optGen" value="undefined">
                          Não deseja declarar
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>

                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan"
                    id="spanFsAnamG14"
                  >
                    <label htmlFor="genBirthRelId" className="labelIdentif">
                      Identidade em relação ao gênero designado na nascença:
                      <select
                        name="genBirthRelName"
                        id="genBirthRelId"
                        className="form-select noInvert inpIdentif inpGen widMin75Q900"
                        data-title="Identidade de gênero (nascença)"
                        defaultValue={"cis"}
                        required
                        onChange={ev => {
                          const genElement = document.getElementById("genId");
                          const genTrans =
                            document.getElementById("genTransId");
                          const genFisAlin =
                            document.getElementById("genFisAlinId");
                          const textBodytype =
                            document.getElementById("textBodytype");
                          try {
                            if (
                              !(
                                genElement instanceof HTMLSelectElement ||
                                genElement instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genElement,
                                `Gen Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genTrans instanceof HTMLSelectElement ||
                                genTrans instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genTrans,
                                `Gen Trans Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genFisAlin instanceof HTMLSelectElement ||
                                genFisAlin instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genFisAlin,
                                `Gen Physical Alignment Element`,
                                extLine(new Error())
                              );
                            person.gen =
                              fluxGen(
                                [
                                  genElement,
                                  ev.currentTarget,
                                  genTrans,
                                  genFisAlin,
                                ],
                                genElement.value
                              ) || "masculino";
                            if (
                              (genTrans.value !== "avancado" ||
                                genElement.value === "naoBinario") &&
                              genTrans.hidden === false &&
                              genFisAlin.hidden === false
                            ) {
                              textBodytype instanceof HTMLInputElement ||
                              textBodytype instanceof HTMLSelectElement
                                ? (textBodytype.value = person.gen)
                                : inputNotFound(
                                    textBodytype,
                                    "textBodyType in callback for gender Elements",
                                    extLine(new Error())
                                  );
                            }
                          } catch (e) {
                            console.error(
                              `Error executing callback for Gen Elements:\n${
                                (e as Error).message
                              }`
                            );
                          }
                        }}
                      >
                        <option
                          className="optIdentif optgenBirthRel"
                          value="cis"
                        >
                          Cisgênero | Cissexual
                        </option>
                        <option
                          className="optIdentif optgenBirthRel"
                          value="trans"
                        >
                          Transgênero | Transsexual
                        </option>
                        <option
                          className="optIdentif optgenBirthRel"
                          value="outros"
                        >
                          Outros
                        </option>
                        <option
                          className="optIdentif optgenBirthRel"
                          value="undefined"
                        >
                          Não deseja declarar
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>

                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan"
                    id="spanFsAnamG15"
                    hidden
                  >
                    <label htmlFor="genTransId" className="labelIdentif">
                      Estágio da Transição Hormonal:
                      <select
                        name="genTransName"
                        id="genTransId"
                        className="form-select noInvert inpIdentif inpGen widMin75Q900"
                        data-title="Estágio de transicao hormonal"
                        defaultValue={"avancado"}
                        onChange={ev => {
                          const genElement = document.getElementById("genId");
                          const genBirthRel =
                            document.getElementById("genBirthRelId");
                          const genFisAlin =
                            document.getElementById("genFisAlinId");
                          const textBodytype =
                            document.getElementById("textBodytype");
                          try {
                            if (
                              !(
                                genElement instanceof HTMLSelectElement ||
                                genElement instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genElement,
                                `Gen Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genBirthRel instanceof HTMLSelectElement ||
                                genBirthRel instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genBirthRel,
                                `Gen Birth Relation Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genFisAlin instanceof HTMLSelectElement ||
                                genFisAlin instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genFisAlin,
                                `Gen Physical Alignment Element`,
                                extLine(new Error())
                              );
                            person.gen =
                              fluxGen(
                                [
                                  genElement,
                                  genBirthRel,
                                  ev.currentTarget,
                                  genFisAlin,
                                ],
                                genElement.value
                              ) || "masculino";
                            if (
                              (ev.currentTarget.value !== "avancado" ||
                                genElement.value === "naoBinario") &&
                              ev.currentTarget.hidden === false &&
                              genFisAlin.hidden === false
                            ) {
                              textBodytype instanceof HTMLInputElement ||
                              textBodytype instanceof HTMLSelectElement
                                ? (textBodytype.value = person.gen)
                                : inputNotFound(
                                    textBodytype,
                                    "textBodyType in callback for gender Elements",
                                    extLine(new Error())
                                  );
                            }
                          } catch (e) {
                            console.error(
                              `Error executing callback for Gen Elements:\n${
                                (e as Error).message
                              }`
                            );
                          }
                        }}
                      >
                        <option
                          className="optIdentif optgenTrans"
                          value="undefined"
                        >
                          Indefinido
                        </option>
                        <option className="optIdentif optgenTrans" value="no">
                          Não está em transição
                        </option>
                        <option
                          className="optIdentif optgenTrans"
                          value="inicial"
                        >
                          Inicial
                        </option>
                        <option
                          className="optIdentif optgenTrans"
                          value="intermediario"
                        >
                          Intermediário
                        </option>
                        <option
                          className="optIdentif optgenTrans"
                          value="avancado"
                        >
                          Avançado
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>

                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan noInvert inpIdentif"
                    id="spanFsAnamG16"
                    style={{
                      paddingLeft: "0",
                      paddingTop: "0",
                      marginTop: "0.1rem",
                    }}
                    hidden
                  >
                    <label htmlFor="genFisAlinId" className="labelIdentif">
                      Alinhamento de características físicas:
                      <select
                        name="genFisAlinName"
                        id="genFisAlinId"
                        className="form-select noInvert inpIdentif inpGen widMin75Q900"
                        data-title="Alinhamento Físico"
                        defaultValue={"masculinizado"}
                        onChange={ev => {
                          const genElement = document.getElementById("genId");
                          const genBirthRel =
                            document.getElementById("genBirthRelId");
                          const genTrans =
                            document.getElementById("genTransId");
                          const textBodytype =
                            document.getElementById("textBodytype");
                          try {
                            if (
                              !(
                                genElement instanceof HTMLSelectElement ||
                                genElement instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genElement,
                                `Gen Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genBirthRel instanceof HTMLSelectElement ||
                                genBirthRel instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genBirthRel,
                                `Gen Birth Relation Element`,
                                extLine(new Error())
                              );
                            if (
                              !(
                                genTrans instanceof HTMLSelectElement ||
                                genTrans instanceof HTMLInputElement
                              )
                            )
                              throw elementNotFound(
                                genTrans,
                                `Gen Trans Element`,
                                extLine(new Error())
                              );
                            person.gen =
                              fluxGen(
                                [
                                  genElement,
                                  genBirthRel,
                                  genTrans,
                                  ev.currentTarget,
                                ],
                                (genElement as entryEl)?.value
                              ) || "masculino";
                            if (
                              (genTrans.value !== "avancado" ||
                                genElement.value === "naoBinario") &&
                              genTrans.hidden === false &&
                              ev.currentTarget.hidden === false
                            ) {
                              textBodytype instanceof HTMLInputElement ||
                              textBodytype instanceof HTMLSelectElement
                                ? (textBodytype.value = person.gen)
                                : inputNotFound(
                                    textBodytype,
                                    "textBodyType in callback for gender Elements",
                                    extLine(new Error())
                                  );
                            }
                          } catch (e) {
                            console.error(
                              `Error executing callback for Gen Elements:\n${
                                (e as Error).message
                              }`
                            );
                          }
                        }}
                      >
                        <option
                          className="optIdentif optgenFisAlin"
                          value="masculinizado"
                        >
                          Masculinizado
                        </option>
                        <option
                          className="optIdentif optgenFisAlin"
                          value="feminilizado"
                        >
                          Feminilizado
                        </option>
                        <option
                          className="optIdentif optgenFisAlin"
                          value="neutro"
                        >
                          Indeterminado | Neutro
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>
                </div>
              </section>
            </fieldset>
            <hr />
            <TabComorb />
            <hr />
            <fieldset name="fsHabRotName" id="fsHabRotId" className="fsMain">
              <legend className="hRot legMain forceInvert" id="fsHabRotLeg">
                Hábitos Rotineiros — Alimentação
              </legend>
              <section className="sectionMain sectHabRot" id="sectAlimRot">
                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpRefDiaMin"
                    className="labAlimRot fitSpaced labRef labRefDia"
                  >
                    Faz quantas refeições por dia, no mínimo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="99"
                      className="form-control noInvert inpAlimRot inpRef inpRefDia minText maxText minNum maxNum patternText"
                      id="inpRefDiaMin"
                      required
                      data-title="Refeicoes_diarias_minimo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>

                  <label
                    htmlFor="inpRefDiaMax"
                    className="labAlimRot fitSpaced labRef labRefDia"
                  >
                    Faz quantas refeições por dia, no máximo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="1"
                      max="99"
                      className="form-control noInvert inpAlimRot inpRef inpRefDia minText maxText minNum maxNum patternText"
                      id="inpRefDiaMax"
                      required
                      data-title="Refeicoes_diarias_maximo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="1"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                </div>

                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpRefCompDiaMin"
                    className="labAlimRot fitSpaced labRef labRefCompDia"
                  >
                    Quantas das refeições diárias são completas, no mínimo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="99"
                      className="form-control noInvert inpAlimRot inpRef inpRefCompDia minText maxText minNum maxNum patternText"
                      id="inpRefCompDiaMin"
                      required
                      data-title="Refeicoes_completas_diarias_minimo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>

                  <label
                    htmlFor="inpRefCompDiaMax"
                    className="labAlimRot fitSpaced labRef labRefCompDia"
                  >
                    Quantas das refeições diárias são completas, no máximo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="1"
                      max="9"
                      className="form-control noInvert inpAlimRot inpRef inpRefCompDia minText maxText minNum maxNum patternText"
                      id="inpRefCompDiaMax"
                      required
                      data-title="Refeicoes_completas_diarias_maximo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="1"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                  <br role="presentation" />
                </div>
                <hr />
                <h2 className="hRot legMain noInvert">
                  Hábitos Rotineiros — Hidratação
                </h2>
                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpAguaDiaMin"
                    className="labAlimRot fitSpaced labAgua"
                  >
                    Ingere quantos litros de água por dia, no mínimo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="99"
                      className="form-control noInvert inpAlimRot inpAgua float sevenCharLongNum minText maxText minNum maxNum patternText"
                      id="inpAguaDiaMin"
                      required
                      data-title="L_agua_diario_minimo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>

                  <label
                    htmlFor="inpAguaDiaMax"
                    className="labAlimRot fitSpaced labAgua"
                  >
                    Ingere quantos litros de água por dia, no máximo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="1"
                      max="99"
                      className="form-control noInvert inpAlimRot inpAgua float sevenCharLongNum minText maxText minNum maxNum patternText"
                      id="inpAguaDiaMax"
                      required
                      data-title="L_agua_diario_maximo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                </div>
                <hr />
                <h2 className="hRot legMain noInvert">
                  Hábitos Rotineiros — Excreção
                </h2>
                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpElimUrDiaMin"
                    className="labAlimRot fitSpaced labUr labUrDia"
                  >
                    Quantas micções por dia, no mínimo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="99"
                      className="form-control noInvert inpAlimRot inpUr inpUrDia minText maxText minNum maxNum patternText"
                      id="inpElimUrDiaMin"
                      required
                      data-title="Miccoes_diarias_minimo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>

                  <label
                    htmlFor="inpElimUrDiaMax"
                    className="labAlimRot fitSpaced labUr labUrDia"
                  >
                    Quantas micções por dia, no máximo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="1"
                      max="99"
                      className="form-control noInvert inpAlimRot inpUr inpUrDia minText maxText minNum maxNum patternText"
                      id="inpElimUrDiaMax"
                      required
                      data-title="Miccoes_diarias_maximo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                </div>

                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpElimUrDiaMin"
                    className="labAlimRot fitSpaced labUr labUrInterval"
                  >
                    <span>
                      Qual é o intervalo mínimo (em horas) entre cada micção?
                    </span>
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="96"
                      className="form-control noInvert inpAlimRot inpUr inpUrInterval float sevenCharLongNum minText maxText minNum maxNum patternText"
                      id="inpElimUrIntervaloMin"
                      required
                      data-title="Miccoes_intervalo_minimo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="1"
                      data-maxnum="96"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>

                  <label
                    htmlFor="inpElimUrDiaMax"
                    className="labAlimRot fitSpaced labUr labUrInterval"
                  >
                    <span>
                      Qual é o intervalo máximo (em horas) entre cada micção?
                    </span>
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="96"
                      className="form-control noInvert inpAlimRot inpUr inpUrInterval float sevenCharLongNum minText maxText minNum maxNum patternText"
                      id="inpElimUrIntervaloMax"
                      required
                      data-title="Miccoes_intervalo_maximo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="1"
                      data-maxnum="96"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                </div>

                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpElimUrCor"
                    className="labAlimRot fitSpaced labUr widMax900q80vw"
                  >
                    Qual é a coloração da urina?
                    <input
                      type="text"
                      minLength={4}
                      maxLength={15}
                      list="corUr"
                      className="form-control noInvert inpAlimRot inpUr"
                      id="inpElimUrCor"
                      required
                      data-title="Urina_coloracao"
                      data-pattern="transparente|verde-claro|verde-escuro|amarelo-claro|amarelo-escuro|âmbar|laranja|rosa|avermelhada|marrom|azul|arroxeada|preta"
                      data-flags="gi"
                      data-reqlength="4"
                      data-maxlength="15"
                    />
                    <datalist id="corUr">
                      <option className="opCorUr" value="Transparente"></option>
                      <option className="opCorUr" value="Verde-claro"></option>
                      <option className="opCorUr" value="Verde-escuro"></option>
                      <option
                        className="opCorUr"
                        value="Amarelo-claro"
                      ></option>
                      <option
                        className="opCorUr"
                        value="Amarelo-escuro"
                      ></option>
                      <option className="opCorUr" value="Âmbar"></option>
                      <option
                        className="opCorUr"
                        value="Laranja intenso"
                      ></option>
                      <option className="opCorUr" value="Rosada"></option>
                      <option className="opCorUr" value="Avermelhada"></option>
                      <option className="opCorUr" value="Marrom"></option>
                      <option className="opCorUr" value="Azul"></option>
                      <option className="opCorUr" value="Arroxeada"></option>
                      <option className="opCorUr" value="Preta"></option>
                    </datalist>
                  </label>
                  <span
                    role="group"
                    id="spanDiur"
                    className="labAlimRot fitSpaced labUr labUrInterval widMax900q80vw"
                  >
                    Diurese:
                    <label
                      htmlFor="inpDiur"
                      id="labDiur"
                      className="form-control noInvert labAlimRot fitSpaced labUr labUrInterval widMax900q80vw noInvert"
                    >
                      <input
                        type="number"
                        className="form-control noInvert inpAlimRot inpUr float"
                        id="inpDiur"
                        data-title="Diurese"
                        onInput={ev =>
                          handleCondtReq(ev.currentTarget, {
                            minNum: 0,
                            maxNum: 9999,
                            min: 1,
                            max: 6,
                            pattern: ["^d+$", ""],
                          })
                        }
                      />
                      <p className="msrProgCons noInvert">ml/dia</p>
                    </label>
                  </span>
                  <div
                    role="group"
                    className="form-padded noInvert"
                    id="protUrDiv"
                  >
                    <span
                      role="group"
                      id="inpElimUrDiaMax"
                      className="spanAlimRot spanbUr spanProtUr"
                    >
                      <span style={{ marginBottom: "0.1rem" }}>
                        Proteinúria
                      </span>
                      <br role="presentation" />
                      <input
                        type="radio"
                        className="inpAlimRot inpUr inpUrRadio noInvert"
                        id="CpbinpProtUrRadioYes"
                        name="inpProtUrRadio"
                        data-title="Proteinuria_Sim"
                        style={{ marginTop: "0.7rem" }}
                      />
                      <label
                        htmlFor="CpbinpProtUrRadioYes"
                        id="labCpbinpProtUrRadioYes"
                      >
                        <span>Sim</span>
                      </label>
                      <input
                        type="radio"
                        className="inpAlimRot inpUr inpUrRadio"
                        id="CpbinpProtUrRadioNo"
                        name="inpProtUrRadio"
                        data-title="Proteinuria_Nao"
                        style={{ marginTop: "0.7rem" }}
                      />
                      <label
                        htmlFor="CpbinpProtUrRadioNo"
                        id="labCpbinpProtUrRadioNo"
                      >
                        Não
                      </label>
                    </span>
                    <br role="presentation" />
                    <div
                      role="group"
                      className="divMain divAdd"
                      id="divAddProtUr"
                    >
                      <input
                        type="radio"
                        name="protUrTypeRadio"
                        id="protUrOrtId"
                        className="cpbOp opProtUr noInvert"
                        data-title="Proteinuria_Ortostatica"
                      />{" "}
                      Ortostática
                      <br role="presentation" />
                      <input
                        type="radio"
                        name="protUrTypeRadio"
                        id="protUrTrId"
                        className="cpbOp opProtUr noInvert"
                        data-title="Proteinuria_Transitoria"
                      />{" "}
                      Transitória
                      <br role="presentation" />
                      <input
                        type="radio"
                        name="protUrTypeRadio"
                        id="protUrPersistId"
                        className="cpbOp opProtUr noInvert"
                        data-title="Proteinuria_Persistente"
                      />{" "}
                      Persistente
                      <br role="presentation" />
                      <label
                        htmlFor="protUrLvl"
                        id="labProtUrLvl"
                        className="form-control noInvert labUr"
                      >
                        <input
                          type="number"
                          id="protUrLvl"
                          className="form-control noInvert opProtUr"
                          data-title="Proteinuria_mg/dL"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              minNum: 0,
                              maxNum: 9999,
                              min: 1,
                              max: 6,
                              pattern: ["^d+$", ""],
                            })
                          }
                        />
                        <p className="msrProgCons noInvert">mg/dL</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpElimEvDiaMin"
                    className="labAlimRot fitSpaced labEv labEvDia"
                  >
                    Evacua quantas vezes por dia, no mínimo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="99"
                      className="form-control noInvert inpAlimRot inpEv inpEvDia minText maxText minNum maxNum patternText"
                      id="inpElimEvDiaMin"
                      required
                      data-title="Evacuacao_diaria_minimo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                  <label
                    htmlFor="inpElimEvDiaMax"
                    className="labAlimRot fitSpaced labEv labEvDia"
                  >
                    Evacua quantas vezes por dia, no máximo?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="1"
                      max="99"
                      className="form-control noInvert inpAlimRot inpEv inpEvDia minText maxText minNum maxNum patternText"
                      id="inpElimEvDiaMax"
                      required
                      data-title="Evacuacao_diaria_maximo"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="1"
                      data-maxnum="99"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                </div>

                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpElimEvDiaMin"
                    className="labAlimRot fitSpaced labEv labEvIntervalo"
                  >
                    Qual é o intervalo mínimo (em horas) entre evacuações?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="96"
                      className="form-control noInvert inpAlimRot inpEv inpEvIntervalo float sevenCharLongNum Evacuacao_intervalo_minimo minText maxText minNum maxNum patternText"
                      id="inpElimEvIntervaloMin"
                      required
                      data-title="Intervalo Mínimo de Evacuação"
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="0"
                      data-maxnum="96"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>

                  <label
                    htmlFor="inpElimEvDiaMax"
                    className="labAlimRot fitSpaced labEv labEvIntervalo"
                  >
                    Qual é o intervalo máximo (em horas) entre evacuações?
                    <input
                      type="number"
                      minLength={1}
                      maxLength={4}
                      min="0"
                      max="96"
                      className="form-control noInvert inpAlimRot inpEv inpEvIntervalo float sevenCharLongNum Evacuacao_intervalo_maximo minText maxText minNum maxNum patternText"
                      id="inpElimEvIntervaloMax"
                      data-title="Intervalo Mínimo de Evacuação"
                      required
                      data-reqlength="1"
                      data-maxlength="4"
                      data-minnum="1"
                      data-maxnum="96"
                      data-pattern="^[\d,.]+$"
                    />
                  </label>
                </div>
                <hr />
              </section>
              <div role="group" id="divAtFisRot">
                <span
                  role="group"
                  className="spanMain atvSpan fitSpaced flexQ900NoWC"
                  id="divLvlAtFis"
                >
                  <strong>Nível de Atividade Física:</strong>
                  <select
                    className="form-select labelIdentif"
                    id="selectLvlAtFis"
                    data-title="Nivel_atividade_fisica"
                    required
                    defaultValue={"leve"}
                    onChange={ev => {
                      [person.atvLvl, tabProps.factorAtvLvl] =
                        callbackAtvLvlElementNaf(
                          [
                            [tabProps.factorAtvLvl, tabProps.IMC],
                            [
                              ev.currentTarget,
                              document.getElementById("gordCorpLvl"),
                              document.getElementById("formCalcTMBType"),
                              document.getElementById("nafType"),
                            ],
                          ],
                          ev.currentTarget.id
                        );
                    }}
                  >
                    <option value="sedentario" className="opLvlAtFis">
                      Sedentário
                    </option>
                    <option value="leve" className="opLvlAtFis">
                      Leve
                    </option>
                    <option value="moderado" className="opLvlAtFis">
                      Moderado
                    </option>
                    <option value="intenso" className="opLvlAtFis">
                      Intenso
                    </option>
                    <option value="muitoIntenso" className="opLvlAtFis">
                      Muito intenso
                    </option>
                  </select>
                </span>
                <TabAtFirsRot />
                <br role="presentation" />
                <hr />
                <TabAtFirsProp />
              </div>
              <br role="presentation" />
            </fieldset>
            <hr />
            <fieldset
              name="fsProgConsName"
              id="fsProgConsId"
              className="fsMain divTab"
            >
              <h4 className="bolded" id="hProgCons">
                Progresso em Consultas
              </h4>

              <div role="group" id="divProgSels">
                <div
                  role="group"
                  className="flexDiv flexDivProg"
                  id="divProgCons"
                >
                  <label
                    htmlFor="selectNumCons"
                    id="labSelectNumCons"
                    className="consLab"
                  >
                    {" "}
                    Consulta em Leitura:
                    <select
                      id="selectNumCons"
                      className="form-select noInvert consInp"
                      data-title="Consulta_lida"
                      defaultValue={"1"}
                      onChange={ev => {
                        const contextEls = [
                          document.getElementById("selectNumCons"),
                          document.getElementById("fsProgConsId"),
                          document.getElementById("tabDCut"),
                        ];
                        if (typeof numCons === "number") {
                          numCons =
                            parseNotNaN(ev.currentTarget.value || "1", 1) || 1;
                          switchRequiredCols(
                            contextEls as elCollection,
                            numCons,
                            areNumConsOpsValid
                          );
                          document
                            .querySelectorAll(".tabInpProg")
                            .forEach((inp, i) => {
                              try {
                                if (
                                  !(
                                    inp instanceof HTMLInputElement &&
                                    (inp.type === "number" ||
                                      inp.type === "text")
                                  )
                                )
                                  throw inputNotFound(
                                    inp,
                                    `Validation of Input instance and type`,
                                    extLine(new Error())
                                  );
                                if (inp.required) {
                                  inp.minLength = 1;
                                  inp.maxLength = 99;
                                  inp.pattern = "^[d,.]+$";
                                  !inp.classList.contains("minText") &&
                                    inp.classList.add("minText");
                                  !inp.classList.contains("maxText") &&
                                    inp.classList.add("maxText");
                                  !inp.classList.contains("patternText") &&
                                    inp.classList.add("patternText");
                                  if (inp.type === "number") {
                                    inp.min = "0.05";
                                    inp.max = "999999";
                                    !inp.classList.contains("minNum") &&
                                      inp.classList.add("minNum");
                                    !inp.classList.contains("maxNum") &&
                                      inp.classList.add("maxNum");
                                  }
                                }
                              } catch (e) {
                                console.error(
                                  `Error executing iteration ${i} for Tab Inp Prog application of requirements:\n${
                                    (e as Error).message
                                  }`
                                );
                              }
                            });
                        } else
                          multipleElementsNotFound(
                            extLine(new Error()),
                            "arguments for callbackNumCons()",
                            ev.currentTarget,
                            ...contextEls,
                            numCons
                          );
                      }}
                    >
                      <option value="1" id="opCons1">
                        1ª
                      </option>
                      <option value="2" id="opCons2">
                        2ª
                      </option>
                      <option value="3" id="opCons3">
                        3ª
                      </option>
                    </select>
                  </label>
                  <TrioReadNumCons />
                </div>
                <div
                  role="group"
                  className="flexDiv flexDivProg"
                  id="divProgType"
                >
                  <div role="group" className="divLab">
                    Tipo corporal aplicado:
                    <select
                      id="textBodytype"
                      className="form-select noInvert consInp"
                      data-title="Tipo_corporal_genero"
                      defaultValue={"masculino"}
                      onChange={() => {
                        const genElement = document.getElementById("genId");
                        try {
                          if (
                            !(
                              genElement instanceof HTMLInputElement ||
                              genElement instanceof HTMLSelectElement
                            )
                          )
                            throw elementNotFound(
                              genElement,
                              `Gen Element`,
                              extLine(new Error())
                            );
                          const genFisAlin =
                            document.getElementById("genFisAlinId");
                          if (
                            !(
                              genFisAlin instanceof HTMLInputElement ||
                              genFisAlin instanceof HTMLSelectElement
                            )
                          )
                            throw elementNotFound(
                              genFisAlin,
                              `Gen Fis Alin Element`,
                              extLine(new Error())
                            );
                          [person.gen, genElement.value, genFisAlin.value] =
                            callbackTextBodyEl(person);
                        } catch (e) {
                          console.error(
                            `Error executing callback for textbodytype:\n${
                              (e as Error).message
                            }`
                          );
                        }
                      }}
                    >
                      <option value="masculino">
                        Masculino | Masculinizado
                      </option>
                      <option value="feminino">Feminino | Feminilizado</option>
                      <option value="neutro">Neutro</option>
                    </select>
                  </div>

                  <div role="group" className="spanForm divLab">
                    Nível de Gordura Corporal aplicado:
                    <span
                      role="group"
                      className="form-control noInvert spanSubForm consInp"
                    >
                      <select
                        id="gordCorpLvl"
                        className="form-select noInvert lockSelect"
                        data-title="Nivel_Gordura_Corporal"
                        defaultValue={"abaixo"}
                        onChange={ev => {
                          [person.atvLvl, tabProps.factorAtvLvl] =
                            callbackAtvLvlElementNaf(
                              [
                                [tabProps.factorAtvLvl, tabProps.IMC],
                                [
                                  document.getElementById("selectLvlAtFis"),
                                  ev.currentTarget,
                                  document.getElementById("formCalcTMBType"),
                                  document.getElementById("nafType"),
                                ],
                              ],
                              ev.currentTarget.id
                            );
                        }}
                      >
                        <option value="abaixo">Com Baixo Peso</option>
                        <option value="eutrofico">Eutrófico</option>
                        <option value="sobrepeso">
                          Com Sobrepeso (não Obeso)
                        </option>
                        <option value="obeso1">Obeso Grau 1</option>
                        <option value="obeso2">Obeso Grau 2</option>
                        <option value="obeso3">Obeso Grau 3</option>
                      </select>
                      <span
                        role="group"
                        className="spanLock noInvert"
                        id="lockGordCorpLvl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-lock"
                          viewBox="0 0 16 16"
                        >
                          <defs>
                            <linearGradient
                              id="gradiente-lock"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "rgb(233, 180, 7)" }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "rgb(243, 221, 93)" }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
                            className="svg-lock-hook"
                          />
                          <path
                            d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
                            className="svg-lock-body"
                          />
                          <line x1="5" y1="7" x2="11" y2="7" stroke="black" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div
                  role="group"
                  className="flexDiv flexDivProg"
                  id="divProgFactor"
                >
                  <div role="group" className="divLab">
                    Fator de Nível de Atividade Física:
                    <select
                      id="nafType"
                      className="form-select noInvert consInp"
                      data-title="Fator_Nivel_Atividade"
                      defaultValue={"leve"}
                      onChange={ev => {
                        [person.atvLvl, tabProps.factorAtvLvl] =
                          callbackAtvLvlElementNaf(
                            [
                              [tabProps.factorAtvLvl, tabProps.IMC],
                              [
                                document.getElementById("selectLvlAtFis"),
                                document.getElementById("gordCorpLvl"),
                                document.getElementById("formCalcTMBType"),
                                ev.currentTarget,
                              ],
                            ],
                            ev.currentTarget.id
                          );
                      }}
                    >
                      <option value="sedentario">1.2</option>
                      <option value="leve">1.4</option>
                      <option value="moderado">1.6</option>
                      <option value="intenso">1.9</option>
                      <option value="muitoIntenso">2.2</option>
                    </select>
                  </div>
                  <div role="group" className="divLab spanForm">
                    Fórmula aplicada para Cálculo de TMB:
                    <span
                      role="group"
                      className="form-control noInvert spanSubForm consInp"
                    >
                      <select
                        id="formCalcTMBType"
                        className="form-select noInvert lockSelect"
                        data-title="Formula_TMB"
                        onChange={ev => {
                          [person.atvLvl, tabProps.factorAtvLvl] =
                            callbackAtvLvlElementNaf(
                              [
                                [tabProps.factorAtvLvl, tabProps.IMC],
                                [
                                  document.getElementById("selectLvlAtFis"),
                                  document.getElementById("gordCorpLvl"),
                                  ev.currentTarget,
                                  document.getElementById("nafType"),
                                ],
                              ],
                              ev.currentTarget.id
                            );
                        }}
                      >
                        <option value="harrisBenedict">Harris-Benedict</option>
                        <option value="mifflinStJeor">Mifflin-St.Jeor</option>
                        <option value="tinsley">Tinsley</option>
                      </select>
                      <span
                        role="img"
                        className="spanLock noInvert"
                        id="lockformCalcTMB"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-lock"
                          viewBox="0 0 16 16"
                        >
                          <defs>
                            <linearGradient
                              id="gradiente-lock"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "rgb(233, 180, 7)" }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "rgb(243, 221, 93)" }}
                              />
                            </linearGradient>
                          </defs>
                          {/* <!-- gancho --> */}
                          <path
                            d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
                            className="svg-lock-hook"
                          />
                          <path
                            d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
                            className="svg-lock-body"
                          />
                          <line x1="5" y1="7" x2="11" y2="7" stroke="black" />
                        </svg>
                        {/* <!--
                          coordenada inicial
                          arco, x_inicial, y_inicial, ângulo, tamanho, direcao_rotacao
                          vertical_relativo,
                          horizontal_abs,
                          vert_abs
                          arco, x_inicial, y_inicial, ângulo, tamanho, calc(direcao_rotacao)
                          move, x, y
                          vertical, mov_y
                          arco, x_inicial, y_inicial, ângulo, tamanho, direcao_rotacao
                          vertical_relativo, mov_y
                          preenchimento do
                          arco do gancho
                          lado essquerdo do corpo
                          lado direito do corpo
                         --> */}
                      </span>
                    </span>
                  </div>

                  <div
                    role="group"
                    className="divLab"
                    id="spanFactorAtleta"
                    hidden
                  >
                    Fator para Calcúlo de TMB em Atletas:
                    <select
                      className="selFactorAtletaClass form-select noInvert consInp"
                      id="selFactorAtleta"
                      data-title="Fator_TMB_Atleta"
                      onChange={ev =>
                        handleCallbackWHS(
                          [
                            [
                              document.getElementById("gordCorpLvl"),
                              document.getElementById("formCalcTMBType"),
                              document.getElementById("nafType"),
                              [
                                tabProps.targInpWeigth,
                                tabProps.targInpHeigth,
                                tabProps.targInpIMC,
                                tabProps.targInpMLG,
                                tabProps.targInpTMB,
                                tabProps.targInpGET,
                                tabProps.targInpSumDCut,
                                tabProps.targInpPGC,
                              ],
                            ],
                            [
                              tabProps.numCol,
                              tabProps.factorAtvLvl,
                              tabProps.factorAtleta,
                              [
                                tabProps.IMC,
                                tabProps.MLG,
                                tabProps.TMB,
                                tabProps.GET,
                                tabProps.PGC,
                              ],
                            ],
                          ],
                          ev.currentTarget,
                          isAutoFillActive
                        )
                      }
                    >
                      <option value="Peso">Peso</option>
                      <option value="MLG">MLG</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <fieldset
                className="fsSub"
                name="fsSubProgConsName"
                id="fsSubProgConsId"
              >
                <TabProgSVi />
                <hr />
                <TabMedAnt />
                <hr />
                <div
                  role="group"
                  className="spanMain spanMainTabProgCons divLab"
                  id="tabSpanDCut"
                >
                  <span className="forceInvert">Protocolo:</span>
                  <select
                    className="form-select selectTabProgCons consInp"
                    id="tabSelectDCutId"
                    name="tabSelectDCutName"
                    data-title="Protocolo_DCut"
                    required
                    defaultValue={"pollock3"}
                    onChange={ev =>
                      (ev.currentTarget.value = changeTabDCutLayout(
                        ev.currentTarget,
                        document.getElementById("tabDCut"),
                        document.getElementById("textBodytype")
                      ))
                    }
                  >
                    <option
                      value="pollock3"
                      className="opTabProgCons opProtoc"
                      id="opProtocJP3"
                    >
                      Jackson/Pollock 3
                    </option>
                    <option
                      value="pollock7"
                      className="opTabProgCons opProtoc"
                      id="opProtocJP7"
                    >
                      Jackson/Pollock 7
                    </option>
                  </select>
                </div>
                <TabDCut />
                <hr />
                <TabIndPerc />
                <br role="presentation" />
                <hr />
              </fieldset>
            </fieldset>
            <hr />
            <fieldset
              name="fsConfirmName"
              id="fsConfirmId"
              className="fsMain form-padded"
            >
              <section
                className="sectionMain sectionConfirm"
                id="sectConfirmCheck"
              >
                <blockquote className="declr" id="declrEnd">
                  "DECLARO QUE CONCORDO COM AS AVALIAÇÕES DESCRITAS ACIMA"
                  <label htmlFor="confirmId" className="labConfirm"></label>
                  <input
                    type="checkbox"
                    name="confirmName"
                    id="confirmId"
                    data-title="Concordancia"
                    required
                  />
                </blockquote>
                <div className="divMain" id="divConfirm" role="group">
                  <button
                    type="button"
                    className="btn btn-info bolded mg-1t widThird widHalf900Q widFull600Q"
                    id="btnConform"
                    onClick={() => setDeclaration(!shouldShowDeclaration)}
                  >
                    Abrir Declaração de Concordância
                  </button>
                  {shouldShowDeclaration && (
                    <ENDeclaration
                      state={shouldShowDeclaration}
                      dispatch={setDeclaration}
                    />
                  )}
                  <div
                    className="divSub flexEl divConfirm flexQ900NoW"
                    id="divConfirm2"
                    role="group"
                  >
                    <label
                      htmlFor="confirmLocId"
                      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC bolded widHalf900Q noInvert"
                      id="labConfirmLoc"
                    >
                      Local:
                      <input
                        type="text"
                        name="confirmLocName"
                        id="confirmLocId"
                        className="inpConfirm form-control noInvert"
                        defaultValue="Rio de Janeiro, Rio de Janeiro"
                        data-title="assinatura_local"
                        required
                      />
                    </label>

                    <label
                      htmlFor="confirmDatId"
                      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC htHalf900Q bolded"
                      id="labConfirmDate"
                    >
                      {" "}
                      <span>Data:</span>
                      <div
                        className="widFull flexQ900NoW htFull900Q"
                        id="divConfirmDat"
                        role="group"
                      >
                        <input
                          type="date"
                          name="confirmDatName"
                          id="confirmDatId"
                          className="inpConfirm inpDate form-control noInvert"
                          data-title="assinatura_data"
                          required
                        />
                        <button
                          type="button"
                          className="datBtn confirmBtn btn btn-secondary widFull"
                          id="confirmDatBtn"
                        >
                          Usar data atual
                        </button>
                      </div>
                    </label>
                    <hr />
                  </div>

                  <div
                    className="divSub divConfirm flexEl"
                    id="divConfirm3"
                    role="group"
                  >
                    <span
                      role="group"
                      id="spanAstPct"
                      className="labConfirm labAst widHalf bolded"
                    >
                      <span>Assinatura do Paciente:</span>
                      <canvas id="inpAstConfirmId"></canvas>
                      <button
                        type="button"
                        className="astDigtBtn autocorrect confirmBtn btn btn-secondary"
                        id="confirmAstDigtBtn"
                        onClick={ev => {
                          changeToAstDigit(ev.currentTarget);
                        }}
                      >
                        Usar Assinatura Digital
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        id="resetAstBtn"
                      >
                        Resetar
                      </button>
                    </span>
                  </div>
                </div>
                <hr />
              </section>
              <br role="presentation" />
              <section
                className="sectionMain sectionConfirm"
                id="sectConfirmBut"
              >
                <button
                  type="submit"
                  name="submitFormButName"
                  id="submitFormButId"
                  className="confirmBut btn btn-success forceInvert"
                  formAction="_self"
                  formMethod="POST"
                  accessKey="enter"
                  onClick={ev => subForm(ev.currentTarget)}
                >
                  Submeter
                </button>
                <button
                  type="reset"
                  className="confirmBut btn btn-warning forceInvert"
                  id="resetFormBtn"
                >
                  Resetar
                </button>
                <button
                  type="button"
                  id="btnExport"
                  className="btn btn-secondary forceInvert"
                  style={{
                    backgroundColor: "rgba(0, 0, 255, 0.904)",
                    borderColor: "rgba(0, 0, 255, 0.904)",
                  }}
                >
                  Gerar Planilha
                </button>
              </section>
              <hr />
            </fieldset>
          </form>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export function exeAutoFill(
  targ: targEl,
  isAutoFillActive: boolean = true,
  context: string = "cons"
): autofillResult {
  let numRef = 1,
    arrIndexes: number[] = [],
    arrtargInps: targEl[] = [];
  try {
    const consTablesFs = document.getElementById("fsProgConsId");
    const gordCorpLvl = document.getElementById("gordCorpLvl");
    const formTMBTypeElement = document.getElementById("formCalcTMBType");
    if (
      (targ instanceof HTMLInputElement ||
        targ instanceof HTMLTextAreaElement ||
        targ instanceof HTMLSelectElement) &&
      isAutoFillActive === true &&
      person instanceof Person &&
      typeof context === "string"
    ) {
      if (context === "cons") {
        const selectNumCons = document.getElementById("selectNumCons");
        selectNumCons instanceof HTMLInputElement ||
        selectNumCons instanceof HTMLSelectElement
          ? (numCons = parseInt(selectNumCons?.value || "1"))
          : inputNotFound(
              selectNumCons,
              "selectNumCons in exeAutoFill()",
              extLine(new Error())
            );
        numRef = numCons;
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
        tabProps.factorAtleta
      );
      [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET] = arrIndexes;
      [person.weight, person.height] = matchPersonPropertiesWH(
        person,
        tabProps.targInpWeigth,
        tabProps.targInpHeigth
      );
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
            targ instanceof HTMLTextAreaElement
        )
      ) {
        const formatter = new Intl.NumberFormat("pt-BR");
        (tabProps.targInpIMC as entryEl).value = formatter.format(tabProps.IMC);
        (tabProps.targInpMLG as entryEl).value = formatter.format(tabProps.MLG);
        (tabProps.targInpTMB as entryEl).value = formatter.format(tabProps.TMB);
        (tabProps.targInpGET as entryEl).value = formatter.format(tabProps.GET);
        (tabProps.targInpPGC as entryEl).value = formatter.format(tabProps.PGC);
      } else
        console.error(
          `Error validating instances of arrtargInps in exeAutoFill(). Values for respective <input> Elements not updated.`
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
        context
      );
      arrIndexes = [
        tabProps.IMC,
        tabProps.MLG,
        tabProps.TMB,
        tabProps.GET,
        tabProps.PGC,
      ];
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
      throw typeError(
        `typeof person in callback for Text Body Element`,
        person,
        `object`,
        extLine(new Error())
      );
    if (
      !(
        textBodytype instanceof HTMLSelectElement ||
        textBodytype instanceof HTMLInputElement
      )
    )
      throw elementNotFound(
        textBodytype,
        `Text Body Type Element`,
        extLine(new Error())
      );
    if (
      !(
        protocolo instanceof HTMLSelectElement ||
        protocolo instanceof HTMLInputElement
      )
    )
      throw elementNotFound(
        protocolo,
        `Protocolo Element`,
        extLine(new Error())
      );
    if (!(tabDC instanceof HTMLTableElement))
      throw elementNotFound(tabDC, `Table of Skin Folds`, extLine(new Error()));
    if (
      !(
        genElement instanceof HTMLSelectElement ||
        genElement instanceof HTMLInputElement
      )
    )
      throw elementNotFound(genElement, `Gender Element`, extLine(new Error()));
    if (
      !(
        genBirthRel instanceof HTMLSelectElement ||
        genBirthRel instanceof HTMLInputElement
      )
    )
      throw elementNotFound(
        genBirthRel,
        `Gender Birth Relation Element`,
        extLine(new Error())
      );
    if (
      !(
        genFisAlin instanceof HTMLSelectElement ||
        genFisAlin instanceof HTMLInputElement
      )
    )
      throw elementNotFound(
        genFisAlin,
        `Gen Physical Alignment Element`,
        extLine(new Error())
      );
    changeTabDCutLayout(protocolo, tabDC, textBodytype);
    person.gen = textBodytype.value;
    if (
      (genElement.value === "masculino" || genElement.value === "feminino") &&
      genBirthRel.value === "cis"
    )
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
        stringError(
          "verifying textBodytype.value",
          textBodytype?.value,
          extLine(new Error())
        );
    }
  } catch (e) {
    console.error(
      `Error executing callbackTextBodyEl:\n${(e as Error).message}`
    );
  }
  return (
    [
      person?.gen || "masculino",
      (genElement as entryEl)?.value || "masculino",
      (genFisAlin as entryEl)?.value || "masculinizado",
    ] || ["masculino", "masculino", "masculinizado"]
  );
}

export function callbackAtvLvlElementNaf(
  contextData: [number[], targEl[]],
  mainEl: string
): [string, number] {
  [tabProps.factorAtvLvl, tabProps.IMC] = contextData[0];
  const [atvLvlElement, gordCorpLvl, formTMBTypeElement, nafType] =
    contextData[1];
  try {
    if (!(person instanceof Person))
      throw new Error(`Failed to validate patient person instance`);
    if (typeof tabProps.factorAtvLvl !== "number")
      throw typeError(
        `typeof Factor for activity level`,
        tabProps.factorAtvLvl,
        `number`,
        extLine(new Error())
      );
    if (typeof tabProps.IMC !== "number")
      throw typeError(
        `typeof IMC`,
        tabProps.IMC,
        `number`,
        extLine(new Error())
      );
    if (
      !(
        atvLvlElement instanceof HTMLInputElement ||
        atvLvlElement instanceof HTMLSelectElement
      )
    )
      throw elementNotFound(
        atvLvlElement,
        `Activity Level Element instance`,
        extLine(new Error())
      );
    if (
      !(
        gordCorpLvl instanceof HTMLInputElement ||
        gordCorpLvl instanceof HTMLSelectElement
      )
    )
      throw elementNotFound(
        gordCorpLvl,
        `Body Fat Level Element`,
        extLine(new Error())
      );
    if (
      !(
        formTMBTypeElement instanceof HTMLInputElement ||
        formTMBTypeElement instanceof HTMLSelectElement
      )
    )
      throw elementNotFound(
        formTMBTypeElement,
        `TMB Type Element`,
        extLine(new Error())
      );
    if (
      !(
        nafType instanceof HTMLInputElement ||
        nafType instanceof HTMLSelectElement
      )
    )
      throw elementNotFound(
        nafType,
        `Level of Physical Activity Type Element`,
        extLine(new Error())
      );
    //ajusta elementos <select> com base em combinações
    fluxFormIMC(gordCorpLvl, formTMBTypeElement, tabProps.IMC || 0);
    if (
      /LvlAtFis/gi.test(mainEl) ||
      /TMBType/gi.test(mainEl) ||
      /gordCorpLvl/gi.test(mainEl)
    ) {
      matchTMBElements(
        atvLvlElement,
        gordCorpLvl,
        formTMBTypeElement,
        document.getElementById("spanFactorAtleta"),
        document.getElementById("lockGordCorpLvl"),
        tabProps.IMC || 0
      );
      person.atvLvl = updateAtvLvl(atvLvlElement, nafType, person.atvLvl);
      //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
      const returnedFactorAtvLvl = person.checkAtvLvl(person);
      typeof returnedFactorAtvLvl === "number"
        ? (tabProps.factorAtvLvl = returnedFactorAtvLvl || 1.4)
        : typeError(
            "returnedFactorAtvLvl",
            returnedFactorAtvLvl,
            "number",
            extLine(new Error())
          );
    } else if (/nafType/gi.test(mainEl)) {
      matchTMBElements(
        nafType,
        gordCorpLvl,
        formTMBTypeElement,
        document.getElementById("spanFactorAtleta"),
        document.getElementById("lockGordCorpLvl"),
        tabProps.IMC || 0
      );
      person.atvLvl = updateAtvLvl(nafType, atvLvlElement, person.atvLvl);
      //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
      const returnedFactorAtvLvl = person.checkAtvLvl(person);
      typeof returnedFactorAtvLvl === "number"
        ? (tabProps.factorAtvLvl = returnedFactorAtvLvl || 1.4)
        : typeError(
            "returnedFactorAtvLvl",
            returnedFactorAtvLvl,
            "number",
            extLine(new Error())
          );
    } else
      console.error(`Error validating mainEl.
        obtained .id: ${mainEl ?? "UNDEFINED ID"}`);
    return [person.atvLvl, tabProps.factorAtvLvl];
  } catch (e) {
    console.error(
      `Error executing callbackAtvLvlElementNaf:\n${(e as Error).message}`
    );
    return [person.atvLvl, tabProps.factorAtvLvl];
  }
}

export function handleCallbackWHS(
  contextComp: [contextAutofill, contextAutofillNums],
  inpWHS: targEl,
  isAutoFillActive: boolean = true
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
  const fillResult = (
    callbackResult: autofillResult,
    mainNum: number
  ): void => {
    if (isAutoFillActive === true) {
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
        for (const targSumDCut of document.getElementsByClassName(
          "tabInpProgSumDCut"
        )) {
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
      [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET, tabProps.PGC] =
        callbackResult[2];
      [
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
        ,
        tabProps.targInpPGC,
      ] = callbackResult[3].slice(2);
    }
  };
  try {
    if (!(person instanceof Person))
      throw typeError(
        `instanceof person`,
        (person as any).toString(),
        `formClassPerson`,
        extLine(new Error())
      );
    if (
      !(
        inpWHS instanceof HTMLInputElement ||
        inpWHS instanceof HTMLSelectElement ||
        inpWHS instanceof HTMLTextAreaElement
      )
    )
      throw elementNotFound(
        inpWHS,
        `${inpWHS?.id || inpWHS?.tagName || "unidentified"}`,
        extLine(new Error())
      );
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
      if (isAutoFillActive === true)
        result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [
        prop || 0,
        result || defaultResult,
      ] || [0, defaultResult];
      fillResult(callbackResult[1], 0);
    } else if (inpWHS.classList.contains("inpHeigth")) {
      if (parseNotNaN(inpWHS.value, 0, "float") > 3) inpWHS.value = "3";
      prop = person.height;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.height = prop;
      if (isAutoFillActive === true)
        result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [
        prop || 0,
        result || defaultResult,
      ] || [0, defaultResult];
      fillResult(callbackResult[1], 1);
    } else if (
      inpWHS.classList.contains("inpSumDCut") ||
      inpWHS.classList.contains("selFactorAtletaClass")
    ) {
      if (
        inpWHS.classList.contains("inpSumDCut") &&
        parseNotNaN(inpWHS.value, 0, "float") > 999
      )
        inpWHS.value = "999";
      prop = person.sumDCut;
      prop = validateEvResultNum(inpWHS, parseInt(inpWHS.value || "0", 10));
      person.sumDCut = prop;
      if (isAutoFillActive === true)
        result = exeAutoFill(inpWHS, isAutoFillActive, "col");
      const callbackResult: [number, autofillResult] = [
        prop || 0,
        result || defaultResult,
      ] || [0, defaultResult];
      fillResult(callbackResult[1], 2);
    } else
      throw elementNotFound(inpWHS, `Inp WHS classList`, extLine(new Error()));
  } catch (e) {
    console.error(
      `Error executing callbackWHS for ${inpWHS?.id || "unidentified"}:${
        (e as Error).message
      }`
    );
  }
  return [prop || 0, result || defaultResult] || [0, defaultResult];
}
