import { Person } from "@/lib/global/declarations/classes";
import {
  IndCases,
  btnFillResult,
  nullishDiv,
} from "@/lib/global/declarations/types";
import {
  elementNotFound,
  extLine,
  stringError,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { checkReturnIndex } from "@/lib/locals/edFisNutPage/edFisNutController";
import {
  defineTargInps,
  getNumCol,
  matchPersonPropertiesWH,
  updateIndexesContexts,
  updatePGC,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "@/pages/edfis";
import { useRef, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Col from "./tabs/Col";
import Th from "./tabs/Th";
import LockTabInd from "./tabs/LobTackInd";
import TabBtnInd from "./client/tabs/TabBtnInd";
import WatcherTab from "./client/tabs/WatcherTab";
import GenericErrorComponent from "../../error/GenericErrorComponent";

export default function TabIndPerc(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  const columns = [1, 2, 3, 4];
  useEffect(() => {
    setMounted(true);
  }, []);
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Table for Indexes" />
      )}
    >
      <div role="group" className="divTab" id="divTabInd" ref={mainRef}>
        <table className="tabProgCons noInvert" id="tabIndPerc">
          <colgroup>
            {columns.map(nCol => (
              <Col ctx="IndPerc" nCol={nCol} />
            ))}
          </colgroup>
          <caption className="tabLegProgCons">
            Índices e Percentuais Corporais
          </caption>
          <thead>
            <tr
              className="tabRowProg tabRowProgIndPerc"
              id="tabRowProgIndPerc1"
              itemProp="rowIndPerc"
            >
              {columns.map(nCol => (
                <Th ctx="IndPerc" nCol={nCol} nRow={1} />
              ))}
            </tr>
          </thead>
          <tbody className="tbodyProgCons">
            <tr
              className="tabRowProg tabRowProgIndPerc"
              id="tabRowProgIndPerc2"
              itemProp="rowIndPerc"
            >
              <Th ctx="IndPerc" nRow={2} nCol={1} lab="IMC" />
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc2">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpImc1Cel2_2"
                    id="labImcCel2_2"
                    className="form-control tabLabProgCons labInd labImc"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC2_2"
                      id="inpImc1Cel2_2"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpImc inpCol2 sevenCharLongNum"
                      min="0"
                      data-title="IMC_1_Consulta"
                      required
                      onInput={ev => {
                        handleIndEv(ev, "IMC");
                        handleEventReq(ev.currentTarget);
                      }}
                    />
                    <p className="msrProgCons indMsr">kg/m²</p>
                  </label>
                  <TabBtnInd nRow={2} nCol={2} lab="IMC" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="IMC" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc2">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpImc2Cel2_3"
                    id="labImc2Cel2_3"
                    className="form-control tabLabProgCons labInd labImc"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC2_3"
                      id="inpImc2Cel2_3"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpImc inpCol3 sevenCharLongNum"
                      min="0"
                      data-title="IMC_2_Consulta"
                      onInput={ev => handleIndEv(ev, "IMC")}
                    />
                    <p className="msrProgCons indMsr">kg/m²</p>
                  </label>
                  <TabBtnInd nRow={2} nCol={3} lab="IMC" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="IMC" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc2">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpImc3Cel2_4"
                    id="labImc3Cel2_4"
                    className="form-control tabLabProgCons labInd labImc"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC2_4"
                      id="inpImc3Cel2_4"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpImc inpCol4 sevenCharLongNum"
                      min="0"
                      data-title="IMC_3_Consulta"
                      onInput={ev => handleIndEv(ev, "IMC")}
                    />
                    <p className="msrProgCons indMsr">kg/m²</p>
                  </label>
                  <TabBtnInd nRow={2} nCol={4} lab="IMC" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="IMC" />
                </div>
              </td>
            </tr>
            <tr
              className="tabRowProg tabRowProgIndPerc"
              id="tabRowProgIndPerc3"
              itemProp="rowIndPerc"
            >
              <Th ctx="IndPerc" nRow={3} nCol={1} lab="MLG" />
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc3">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpMlg1Cel3_2"
                    id="labMlg1Cel3_2"
                    className="form-control tabLabProgCons labInd labMlg"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC3_2"
                      id="inpMlg1Cel3_2"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpMlg inpCol2 sevenCharLongNum"
                      min="0"
                      max="100"
                      data-title="MLG_1_Consulta"
                      required
                      onInput={ev => {
                        handleIndEv(ev, "MLG");
                        handleEventReq(ev.currentTarget);
                      }}
                    />
                    <p className="msrProgCons indMsr">%</p>
                  </label>
                  <TabBtnInd nRow={3} nCol={2} lab="MLG" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="MLG" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc3">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpMlg2Cel3_3"
                    id="labMlg2Cel3_3"
                    className="form-control tabLabProgCons labInd labMlg"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC3_3"
                      id="inpMlg2Cel3_3"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpMlg inpCol3 sevenCharLongNum"
                      min="0"
                      max="100"
                      data-title="MLG_2_Consulta"
                      onInput={ev => handleIndEv(ev, "MLG")}
                    />
                    <p className="msrProgCons indMsr">%</p>
                  </label>
                  <TabBtnInd nRow={3} nCol={3} lab="MLG" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="MLG" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc3">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpMlg3Cel3_4"
                    id="labMlg3Cel3_4"
                    className="form-control tabLabProgCons labInd labMlg"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC3_4"
                      id="inpMlg3Cel3_4"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpMlg inpCol4 sevenCharLongNum"
                      min="0"
                      max="100"
                      data-title="MLG_3_Consulta"
                      onInput={ev => handleIndEv(ev, "MLG")}
                    />
                    <p className="msrProgCons indMsr">%</p>
                  </label>
                  <TabBtnInd nRow={3} nCol={4} lab="MLG" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="MLG" />
                </div>
              </td>
            </tr>
            <tr
              className="tabRowProg tabRowProgIndPerc"
              id="tabRowProgIndPerc4"
              itemProp="rowIndPerc"
            >
              <Th ctx="IndPerc" nRow={4} nCol={1} lab="PGC" />
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc4">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpPgc1Cel4_2"
                    id="labPgc1Cel4_2"
                    className="form-control tabLabProgCons labInd labPgc"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC4_2"
                      id="inpPgc1Cel4_2"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpPgc inpCol2 sevenCharLongNum"
                      min="0"
                      max="100"
                      data-title="PGC_1_Consulta"
                      required
                      onInput={ev => {
                        handleIndEv(ev, "PGC");
                        handleEventReq(ev.currentTarget);
                      }}
                    />
                    <p className="msrProgCons indMsr">%</p>
                  </label>
                  <TabBtnInd nRow={4} nCol={2} lab="PGC" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="PGC" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc4">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpPgc2Cel4_3"
                    id="labPgc2Cel4_3"
                    className="form-control tabLabProgCons labInd labPgc"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC4_3"
                      id="inpPgc2Cel4_3"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpPgc inpCol3 sevenCharLongNum"
                      min="0"
                      max="100"
                      data-title="PGC_2_Consulta"
                      onInput={ev => handleIndEv(ev, "PGC")}
                    />
                    <p className="msrProgCons indMsr">%</p>
                  </label>
                  <TabBtnInd nRow={4} nCol={3} lab="PGC" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="PGC" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc4">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpPgc3Cel4_4"
                    id="labPgc3Cel4_4"
                    className="form-control tabLabProgCons labInd labPgc"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC4_4"
                      id="inpPgc3Cel4_4"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpPgc inpCol4 sevenCharLongNum"
                      min="0"
                      max="100"
                      data-title="PGC_3_Consulta"
                      onInput={ev => handleIndEv(ev, "PGC")}
                    />
                    <p className="msrProgCons indMsr">%</p>
                  </label>
                  <TabBtnInd nRow={4} nCol={4} lab="PGC" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="PGC" />
                </div>
              </td>
            </tr>
            <tr
              className="tabRowProg tabRowProgIndPerc"
              id="tabRowProgIndPerc5"
              itemProp="rowIndPerc"
            >
              <Th ctx="IndPerc" nRow={5} nCol={1} lab="TMB" />
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc5">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpTmb1Cel5_2"
                    id="labTmb1Cel5_2"
                    className="form-control tabLabProgCons labInd labTmb"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC5_2"
                      id="inpTmb1Cel5_2"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpTmb inpCol2 sevenCharLongNum"
                      min="0"
                      data-title="TMB_1_Consulta"
                      required
                      onInput={ev => {
                        handleIndEv(ev, "TMB");
                        handleEventReq(ev.currentTarget);
                      }}
                    />
                    <p className="msrProgCons indMsr">kcal</p>
                  </label>
                  <TabBtnInd nRow={5} nCol={2} lab="TMB" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="TMB" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc5">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpTmb2Cel5_3"
                    id="labTmb1Cel5_3"
                    className="form-control tabLabProgCons labInd labTmb"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC5_3"
                      id="inpTmb2Cel5_3"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpTmb inpCol3 sevenCharLongNum"
                      min="0"
                      data-title="TMB_2_Consulta"
                      onInput={ev => handleIndEv(ev, "TMB")}
                    />
                    <p className="msrProgCons indMsr">kcal</p>
                  </label>
                  <TabBtnInd nRow={5} nCol={3} lab="TMB" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="TMB" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc5">
                <div
                  role="group"
                  className="flexDiv flexDivTab flexAlItCt noInvert"
                >
                  <label
                    htmlFor="inpTmb3Cel5_4"
                    id="labTmb1Cel5_4"
                    className="form-control tabLabProgCons labInd labTmb"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC5_4"
                      id="inpTmb3Cel5_4"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpTmb inpCol4 sevenCharLongNum"
                      min="0"
                      data-title="TMB_3_Consulta"
                      onInput={ev => handleIndEv(ev, "TMB")}
                    />
                    <p className="msrProgCons indMsr">kcal</p>
                  </label>
                  <TabBtnInd nRow={5} nCol={4} lab="TMB" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="TMB" />
                </div>
              </td>
            </tr>
            <tr
              className="tabRowProg tabRowProgIndPerc"
              id="tabRowProgIndPerc5"
              itemProp="rowIndPerc"
            >
              <Th ctx="IndPerc" nRow={6} nCol={1} lab="GET" />
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc6">
                <div role="group" className="flexDiv flexDivTab flexAlItCt">
                  <label
                    htmlFor="inpGet1Cel6_2"
                    id="labGet1Cel6_2"
                    className="form-control tabLabProgCons labInd labGet"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC6_2"
                      id="inpGet1Cel6_2"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpGet inpCol2 sevenCharLongNum"
                      min="0"
                      data-title="GET_1_Consulta"
                      onInput={ev => handleIndEv(ev, "GET")}
                    />
                    <p className="msrProgCons indMsr">kcal</p>
                  </label>
                  <TabBtnInd nRow={6} nCol={2} lab="GET" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="GET" />
                </div>
              </td>
              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc6">
                <div role="group" className="flexDiv flexDivTab flexAlItCt">
                  <label
                    htmlFor="inpGet2Cel6_3"
                    id="labGet1Cel6_3"
                    className="form-control tabLabProgCons labInd labGet"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC6_3"
                      id="inpGet2Cel6_3"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpGet inpCol3 sevenCharLongNum"
                      min="0"
                      data-title="GET_2_Consulta"
                      onInput={ev => handleIndEv(ev, "GET")}
                    />
                    <p className="msrProgCons indMsr">kcal</p>
                  </label>
                  <TabBtnInd nRow={6} nCol={3} lab="GET" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="GET" />
                </div>
              </td>

              <td className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc6">
                <div role="group" className="flexDiv flexDivTab flexAlItCt">
                  <label
                    htmlFor="inpGet3Cel6_4"
                    id="labGet1Cel6_4"
                    className="form-control tabLabProgCons labInd labGet"
                  >
                    <input
                      type="number"
                      name="tabInpProgDC6_4"
                      id="inpGet3Cel6_4"
                      className="form-control tabInpProg tabInpProgIndPerc inpInd inpGet inpCol4 sevenCharLongNum"
                      min="0"
                      data-title="GET_3_Consulta"
                      onInput={ev => handleIndEv(ev, "GET")}
                    />
                    <p className="msrProgCons indMsr">kcal</p>
                  </label>
                  <TabBtnInd nRow={6} nCol={4} lab="GET" />
                  <LockTabInd addGroup={["lockTabInd"]} ctx="GET" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <WatcherTab tabName="divTabInd" />
    </ErrorBoundary>
  );
}

export function handleIndEv(
  ev: React.MouseEvent | React.FormEvent | React.ChangeEvent,
  context: IndCases
): void {
  try {
    if (!(person instanceof Person))
      console.warn(
        `Error validating the treated person as as gendered instance in handleIndEv. That will probably lead to data errors. Consider deactivating autofill.`
      );
    if (
      !(
        ev.currentTarget instanceof HTMLButtonElement ||
        (ev.currentTarget instanceof HTMLInputElement &&
          (ev.currentTarget.type === "number" ||
            ev.currentTarget.type === "text")) ||
        ev.currentTarget instanceof HTMLSelectElement
      )
    )
      throw elementNotFound(
        ev.currentTarget,
        `Instance of ${
          ev.currentTarget.id || ev.currentTarget.tagName
        } in handleIndEv`,
        extLine(new Error())
      );
    tabProps.numCol = getNumCol(ev.currentTarget) ?? 0;
    if (!Number.isFinite(tabProps.numCol)) tabProps.numCol = 0;
    if (typeof tabProps.factorAtleta !== "string")
      throw typeError(
        `typeof Factor Atleta`,
        tabProps.factorAtleta,
        `string`,
        extLine(new Error())
      );
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
      throw elementNotFound(
        consTablesFs,
        `Cons Table Fieldset`,
        extLine(new Error())
      );
    if (
      tabProps.isAutoFillActive &&
      typeof tabProps.isAutoFillActive === "boolean"
    ) {
      [
        tabProps.targInpWeigth,
        tabProps.targInpHeigth,
        tabProps.targInpIMC,
        tabProps.targInpMLG,
        tabProps.targInpTMB,
        tabProps.targInpGET,
      ] = defineTargInps(consTablesFs, tabProps.numCol, "col");
      tabProps.targInpPGC = document.querySelector(
        `#inpPgc${tabProps.numCol - 1}Cel4_${tabProps.numCol}`
      );
      [tabProps.PGC, , tabProps.targInpPGC] = updatePGC(
        person,
        consTablesFs,
        tabProps.numCol,
        "col"
      );
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
        `validation of context argument in handleIndEv for ${
          ev.currentTarget.id || ev.currentTarget.tagName
        }`,
        context,
        extLine(new Error())
      );
    context = context.toUpperCase() as IndCases;
    switch (context) {
      case "BTN":
        break;
      case "IMC":
        tabProps.IMC = checkReturnIndex(
          tabProps.targInpIMC,
          tabProps.IMC,
          "IMC"
        );
        break;
      case "MLG":
        tabProps.MLG = checkReturnIndex(
          tabProps.targInpMLG,
          tabProps.MLG,
          "MLG"
        );
        break;
      case "TMB":
        tabProps.TMB = checkReturnIndex(
          tabProps.targInpTMB,
          tabProps.TMB,
          "tabProps."
        );
        break;
      case "GET":
        tabProps.GET = checkReturnIndex(
          tabProps.targInpGET,
          tabProps.GET,
          "GET"
        );
        break;
      case "PGC":
        tabProps.PGC = checkReturnIndex(
          tabProps.targInpPGC,
          tabProps.PGC,
          "PGC"
        );
        break;
      default:
        stringError(
          "value for callbackTabBtnsInps() context",
          context,
          extLine(new Error())
        );
    }
    const gordCorpLvl = document.getElementById("gordCorpLvl");
    const formTMBTypeElement = document.getElementById("formCalcTMBType");
    if (!(gordCorpLvl instanceof HTMLElement))
      throw elementNotFound(
        gordCorpLvl,
        `Instance of Body Fat Level Element`,
        extLine(new Error())
      );
    if (!(formTMBTypeElement instanceof HTMLElement))
      throw elementNotFound(
        formTMBTypeElement,
        `Instance of Form TMB Type Element`,
        extLine(new Error())
      );
    if (context === "BTN" || tabProps.isAutoFillActive === true) {
      [person.weight, person.height] = matchPersonPropertiesWH(
        person,
        tabProps.targInpWeigth,
        tabProps.targInpHeigth
      );
      if (typeof tabProps.factorAtvLvl !== "number")
        throw typeError(
          `typeof FactorAtvLvl`,
          tabProps.factorAtleta,
          `number`,
          extLine(new Error())
        );
      if (typeof tabProps.factorAtleta !== "string")
        throw typeError(
          `typeof Factor Atleta`,
          tabProps.factorAtleta,
          `string`,
          extLine(new Error())
        );
      //UPDATE AUTOMÁTICO DE VALUES DOS INPUTS AQUI
      [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET] =
        updateIndexesContexts(
          person,
          [gordCorpLvl, tabProps.targInpIMC, tabProps.targInpMLG],
          [tabProps.targInpTMB, tabProps.targInpGET, formTMBTypeElement],
          tabProps.factorAtvLvl,
          tabProps.factorAtleta
        );
      console.log(
        `índices capturados: ${JSON.stringify([
          tabProps.IMC,
          tabProps.MLG,
          tabProps.TMB,
          tabProps.GET,
        ])}`
      );
    }
    const callbackResult: btnFillResult = [
      [person?.weight || 0, person?.height || 0],
      [
        tabProps.IMC || 0,
        tabProps.MLG || 0,
        tabProps.TMB || 0,
        tabProps.GET || 0,
        tabProps.PGC || 0,
      ] || [0, 0, 0, 0, 0],
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
          tabProps.IMC = checkReturnIndex(
            callbackResult[2][2],
            callbackResult[1][0],
            context
          );
          break;
        case "MLG":
          tabProps.MLG = checkReturnIndex(
            callbackResult[2][3],
            callbackResult[1][1],
            context
          );
          break;
        case "TMB":
          tabProps.TMB = checkReturnIndex(
            callbackResult[2][4],
            callbackResult[1][2],
            context
          );
          break;
        case "GET":
          tabProps.GET = checkReturnIndex(
            callbackResult[2][5],
            callbackResult[1][3],
            context
          );
          break;
        case "PGC":
          tabProps.PGC = checkReturnIndex(
            callbackResult[2][6],
            callbackResult[1][4],
            context
          );
          break;
        default:
          stringError(
            "value for callbackTabBtnsInps() context",
            context,
            extLine(new Error())
          );
      }
    }
    console.log("-----LOG DE HANDLE TABLE INDEXES ---");
    // console.log("INPUTS CAPTURADOS");
    // console.log([
    //   tabProps.targInpWeigth,
    //   tabProps.targInpHeigth,
    //   tabProps.targInpIMC,
    //   tabProps.targInpMLG,
    //   tabProps.targInpTMB,
    //   tabProps.targInpGET,
    //   tabProps.targInpPGC,
    // ]);
    // console.log("VALUES APLICADOS NOS INPUTS ");
    // console.log(
    //   [
    //     tabProps.targInpWeigth,
    //     tabProps.targInpHeigth,
    //     tabProps.targInpIMC,
    //     tabProps.targInpMLG,
    //     tabProps.targInpTMB,
    //     tabProps.targInpGET,
    //     tabProps.targInpPGC,
    //   ].map(targ => (targ as entryEl).value)
    // );
    // console.log("VALORES APLICADOS INTERNAMENTE ");
    // console.log([
    //   person.weight,
    //   person.height,
    //   tabProps.IMC || 0,
    //   tabProps.MLG || 0,
    //   tabProps.TMB || 0,
    //   tabProps.GET || 0,
    //   tabProps.PGC || 0,
    // ]);
    console.log("-----FIM DE LOG DE HANDLE INDEXES---");
  } catch (e) {
    console.error(
      `Error executing handleIndEv with ${
        ev.currentTarget.id || ev.currentTarget.tagName
      }:\n${(e as Error).message}`
    );
  }
}
