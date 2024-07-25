import { ErrorBoundary } from "react-error-boundary";
import { memo } from "react";
import {
  elementNotFound,
  extLine,
  inputNotFound,
  multipleElementsNotFound,
  stringError,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import {
  autofillResult,
  contextAutofill,
  contextAutofillNums,
  entryEl,
  targEl,
} from "@/lib/global/declarations/types";
import { defaultResult } from "@/lib/locals/edFisNutPage/edFisNutController";
import { parseNotNaN } from "@/lib/global/gModel";
import { Person } from "@/lib/global/declarations/classes";
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
import { ENTabsProps } from "@/lib/global/declarations/interfaces";
import TrioReadNumCons from "../../components/interactive/edfis/TrioReadNumCons";
import TabAtFirsRot from "../../components/interactive/edfis/TabAtFisRot";
import TabAtFirsProp from "../../components/interactive/edfis/TabAtFisProp";
import TabComorb from "../../components/interactive/edfis/TabComorb";
import TabIndPerc from "../../components/interactive/edfis/TabIndPerc";
import TabDCut from "../../components/interactive/edfis/TabDCut";
import TabProgSVi from "../../components/interactive/edfis/TabProgSVi";
import TabMedAnt from "../../components/interactive/edfis/TabMedAnt";
import { changeTabDCutLayout } from "@/lib/locals/edFisNutPage/edFisNutModel";
import AgeElement from "../../components/interactive/edfis/defaulted/AgeElement";
import ConfirmLocId from "../../components/interactive/def/ConfirmLocId";
import Signature from "../../components/interactive/def/Signature";
import Name from "../../components/interactive/def/Name";
import SocialName from "../../components/interactive/def/SocialName";
import GenDiv from "../../components/interactive/def/GenDiv";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import ConfirmDate from "../../components/interactive/def/ConfirmDate";
import SectConfirmBtns from "../../components/interactive/def/SectConfirmBtns";
import Declaration from "../../components/interactive/def/Declaration";
import ENTipsBtnWrapper from "../../components/interactive/edfis/ENTipsBtnWrapper";
import ENBtnConformWrapper from "../../components/interactive/edfis/ENBtnConformWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import DivRot from "../../components/interactive/edfis/DivRot";
import InpCorUr from "../../components/interactive/edfis/client/InpCorUr";
import InpDiur from "../../components/interactive/edfis/client/InpDiur";
import ProtUrLvl from "../../components/interactive/edfis/client/ProtUrLvl";
import SelectLvlAtFis from "../../components/interactive/edfis/client/SelectLvlAtFis";
import SelectNumCons from "../../components/interactive/edfis/client/SelectNumCons";
import TextBodyType from "../../components/interactive/edfis/client/TextBodyType";
import GordCorpLvl from "../../components/interactive/edfis/client/GordCorpLvl";
import NafType from "../../components/interactive/edfis/client/NafType";
import FormCalcTmbType from "../../components/interactive/edfis/client/FormCalcTmbType";
import SelFactorAtleta from "../../components/interactive/edfis/client/SelFactorAtleta";
import Protocolo from "../../components/interactive/edfis/client/Protocolo";
import WatcherEN from "../../components/interactive/def/WatcherEN";
import OpProtUr from "../../components/interactive/edfis/OpProtUr";
import LockTabInd from "../../components/interactive/edfis/tabs/LobTackInd";
import { validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "./api/ts/handlers";

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
// setInterval(() => {
//   console.log(person);
//   console.log(tabProps);
// }, 2000);
const MemoAge = memo(AgeElement);
const MemoLoc = memo(ConfirmLocId);

export default function EdFisNutPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading form Physical Education and Nutrition" />
      )}
    >
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
                <ENTipsBtnWrapper />
              </div>
              <HeaderDate />
            </div>
          </div>
        </header>
        <main>
          <SwitchDiv autofill={true} />
          <hr />
          <form
            name="ed_form"
            action="submit_ed_form"
            method="post"
            target="_top"
            id="formEdFis"
            autoComplete="on"
            onSubmit={ev =>
              validateForm(ev.currentTarget).then(validation =>
                validation[0]
                  ? handleSubmit('ed', new Map(), true)
                  : ev.preventDefault()
              )
            }
          >
            <fieldset name="fsAnamGName" id="fsAnamGId" className="fsMain">
              <legend className="legMain form-padded" id="fsAnamGLeg">
                Identificação
              </legend>
              <section className="sectionMain" id="fsAnamGSect">
                <Name />
                <SocialName />
                <span role="group" className="fsAnamGSpan" id="fsAnamGSpan12">
                  <label htmlFor="dateAgeId" className="labelIdentif">
                    Idade:
                    <MemoAge />
                  </label>
                </span>
                <GenDiv flux={true} />
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
                <DivRot
                  quest="Faz quantas refeições por dia"
                  grp="Alim"
                  ctx="RefDia"
                />
                <DivRot
                  quest="Quantas das refeições diárias são completas"
                  grp="Alim"
                  ctx="RefCompDia"
                />
                <hr />
                <h2 className="hRot legMain noInvert">
                  Hábitos Rotineiros — Hidratação
                </h2>
                <DivRot
                  quest="Ingere quantos litros de água por dia"
                  grp="Alim"
                  ctx="AguaDia"
                />
                <hr />
                <h2 className="hRot legMain noInvert">
                  Hábitos Rotineiros — Excreção
                </h2>
                <DivRot
                  quest="Quantas micções por dia"
                  grp="Alim"
                  ctx="UrDia"
                  ur={{
                    ctx: "Elim",
                  }}
                />
                <DivRot
                  quest="Qual é o intervalo mínimo (em horas) entre cada micção?"
                  grp="Alim"
                  ctx="UrInterv"
                />
                <div role="group" className="flexDiv divRot widMax900q80vw">
                  <label
                    htmlFor="inpCorUrDef"
                    className="labAlimRot fitSpaced labUr widMax900q80vw"
                  >
                    <span>Qual é a coloração da urina?</span>
                    <InpCorUr />
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
                    <span>Diurese:</span>
                    <label
                      htmlFor="inpDiur"
                      id="labDiur"
                      className="form-control noInvert labAlimRot fitSpaced labUr labUrInterval widMax900q80vw noInvert"
                    >
                      <InpDiur />
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
                        name="protur"
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
                        name="protur"
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
                      <OpProtUr ctx="Persist" />
                      <br role="presentation" />
                      <OpProtUr ctx="Ort" />
                      <br role="presentation" />
                      <OpProtUr ctx="Tr" />
                      <br role="presentation" />
                      <label
                        htmlFor="protUrLvl"
                        id="labProtUrLvl"
                        className="form-control noInvert labUr"
                      >
                        <ProtUrLvl />
                        <p className="msrProgCons noInvert">mg/dL</p>
                      </label>
                    </div>
                  </div>
                </div>
                <DivRot
                  quest="Evacua quantas vezes por dia"
                  ctx="EvDia"
                  ev={{ ctx: "Elim" }}
                />
                <DivRot
                  quest="Qual é o intervalo mínimo (em horas) entre evacuações?"
                  ctx="EvInterv"
                  ev={{ ctx: "Interv" }}
                />
                <hr />
              </section>
              <div role="group" id="divAtFisRot">
                <span
                  role="group"
                  className="spanMain atvSpan fitSpaced flexQ900NoWC"
                  id="divLvlAtFis"
                >
                  <strong>Nível de Atividade Física:</strong>
                  <SelectLvlAtFis />
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
                    <span>Consulta em Leitura:</span>
                    <SelectNumCons />
                  </label>
                  <TrioReadNumCons />
                </div>
                <div
                  role="group"
                  className="flexDiv flexDivProg"
                  id="divProgType"
                >
                  <div role="group" className="divLab">
                    <span>Tipo corporal aplicado:</span>
                    <TextBodyType />
                  </div>
                  <div role="group" className="spanForm divLab">
                    <span>Nível de Gordura Corporal aplicado:</span>
                    <span
                      role="group"
                      className="form-control noInvert spanSubForm consInp"
                    >
                      <GordCorpLvl />
                      <LockTabInd
                        ctx="GordCorpLvl"
                        addGroup={["spanLock"]}
                        isSpan={true}
                      />
                    </span>
                  </div>
                </div>
                <div
                  role="group"
                  className="flexDiv flexDivProg"
                  id="divProgFactor"
                >
                  <div role="group" className="divLab">
                    <span>Fator de Nível de Atividade Física:</span>
                    <NafType />
                  </div>
                  <div role="group" className="divLab spanForm">
                    <span>Fórmula aplicada para Cálculo de TMB:</span>
                    <span
                      role="group"
                      className="form-control noInvert spanSubForm consInp"
                    >
                      <FormCalcTmbType />
                      <LockTabInd
                        ctx="formCalcTMB"
                        addGroup={["spanLock"]}
                        isSpan={true}
                      />
                    </span>
                  </div>
                  <div
                    role="group"
                    className="divLab"
                    id="spanFactorAtleta"
                    hidden
                  >
                    <span>Fator para Calcúlo de TMB em Atletas:</span>
                    <SelFactorAtleta />
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
                  <Protocolo />
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
                <Declaration text='"DECLARO QUE CONCORDO COM AS AVALIAÇÕES DESCRITAS ACIMA"' />
                <div className="divMain" id="divConfirm" role="group">
                  <ENBtnConformWrapper />
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
                      <span>Local:</span>
                      <MemoLoc />
                    </label>
                    <ConfirmDate />
                    <hr />
                  </div>
                  <Signature />
                </div>
                <hr />
              </section>
              <br role="presentation" />
              <SectConfirmBtns />
              <hr />
            </fieldset>
          </form>
        </main>
      </div>
      <WatcherEN />
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
      tabProps.isAutoFillActive === true &&
      person instanceof Person &&
      typeof context === "string"
    ) {
      if (context === "cons") {
        const selectNumCons = document.getElementById("selectNumCons");
        selectNumCons instanceof HTMLInputElement ||
        selectNumCons instanceof HTMLSelectElement
          ? (tabProps.numCons = parseInt(selectNumCons?.value || "1"))
          : inputNotFound(
              selectNumCons,
              "selectNumCons in exeAutoFill()",
              extLine(new Error())
            );
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
        (tabProps.targInpIMC as entryEl).value = tabProps.IMC.toString();
        (tabProps.targInpMLG as entryEl).value = tabProps.MLG.toString();
        (tabProps.targInpTMB as entryEl).value = tabProps.TMB.toString();
        (tabProps.targInpGET as entryEl).value = tabProps.GET.toString();
        (tabProps.targInpPGC as entryEl).value = tabProps.PGC.toString();
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
      if (tabProps.isAutoFillActive === true)
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
      if (tabProps.isAutoFillActive === true)
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
      if (tabProps.isAutoFillActive === true)
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
