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
import {
  handleEventReq,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import { checkReturnIndex } from "@/lib/locals/edFisNutPage/edFisNutController";
import {
  defineTargInps,
  getNumCol,
  matchPersonPropertiesWH,
  updateIndexesContexts,
  updatePGC,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { isAutoFillActive, person, tabProps } from "@/pages/edfis";
import { useRef, useState, useEffect } from "react";

export default function TabIndPerc(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  const handleIndEv = (
    ev: React.MouseEvent | React.FormEvent | React.ChangeEvent,
    context: IndCases
  ) => {
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
      if (isAutoFillActive && typeof isAutoFillActive === "boolean") {
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
      } else if (typeof isAutoFillActive !== "boolean")
        console.warn(`Error validating typeof isAutoFillActive`);
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
      if (context === "BTN" || isAutoFillActive === true) {
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
      if (context === "BTN" || isAutoFillActive === true) {
        [
          [person.weight, person.height],
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
  };
  useEffect(() => {
    if (!document.getElementById("divTabInd") || !mounted) return;
    try {
      const reference = mainRef.current ?? document.getElementById("divTabInd");
      if (!(reference instanceof HTMLElement))
        setTimeout(() => {
          if (!document.getElementById("divTabInd"))
            throw elementNotFound(
              reference,
              `Main Reference in TabIndPerc`,
              extLine(new Error())
            );
          syncAriaStates([
            mainRef.current!,
            ...mainRef.current!.querySelectorAll("*"),
          ]);
        }, 1000);
    } catch (e) {
      console.error(
        `Error executing procedure for syncing aria states in TabIndPerc:\n${
          (e as Error).message
        }`
      );
    }
  }, [mounted]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return !mounted ? (
    <></>
  ) : (
    <div role="group" className="divTab" id="divTabInd" ref={mainRef}>
      <table className="tabProgCons noInvert" id="tabIndPerc">
        <colgroup>
          <col className="tabColProgCons tabColProgIndPerc" />
          <col className="tabColProgCons tabColProgIndPerc" />
          <col className="tabColProgCons tabColProgIndPerc" />
          <col className="tabColProgCons tabColProgIndPerc" />
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
            <th className="tabCelProgCons" id="tabCelRowIndPerc1_1"></th>
            <th
              className="tabCelProgCons numConsTextHeadCel"
              id="tabCelRowIndPerc1_2"
            >
              1ª Consulta
            </th>
            <th
              className="tabCelProgCons numConsTextHeadCel"
              id="tabCelRowIndPerc1_3"
            >
              2ª Consulta
            </th>
            <th
              className="tabCelProgCons numConsTextHeadCel"
              id="tabCelRowIndPerc1_4"
            >
              3ª Consulta
            </th>
          </tr>
        </thead>
        <tbody className="tbodyProgCons">
          <tr
            className="tabRowProg tabRowProgIndPerc"
            id="tabRowProgIndPerc2"
            itemProp="rowIndPerc"
          >
            <th
              className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc2"
              id="tabCelRowIndPerc2_1"
              itemProp="imcStr"
            >
              IMC
            </th>
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
                <button
                  type="button"
                  id="btnImc1Cel2_2"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnImc tabBtnCol2"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpImc1Cel2_2"
                    className="lockTabInd noInvert lock_inpImc"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnImc1Cel2_3"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnImc tabBtnCol3"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpImc1Cel2_3"
                    className="lockTabInd noInvert lock_inpImc"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnImc3Cel2_4"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnImc tabBtnCol4"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpImc1Cel2_4"
                    className="lockTabInd noInvert lock_inpImc"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
              </div>
            </td>
          </tr>
          <tr
            className="tabRowProg tabRowProgIndPerc"
            id="tabRowProgIndPerc3"
            itemProp="rowIndPerc"
          >
            <th
              className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc3"
              id="tabCelRowIndPerc3_1"
              itemProp="mlgStr"
            >
              MLG
            </th>
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
                <button
                  type="button"
                  id="btnMlg1Cel3_2"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnMlg tabBtnCol2"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpMlg1Cel3_2"
                    className="lockTabInd noInvert lock_inpMlg"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnMlg2Cel3_3"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnMlg tabBtnCol3"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpMlg1Cel3_3"
                    className="lockTabInd noInvert lock_inpMlg"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnMlg1Cel3_4"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnMlg tabBtnCol4"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpMlg1Cel3_4"
                    className="lockTabInd noInvert lock_inpMlg"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
              </div>
            </td>
          </tr>

          <tr
            className="tabRowProg tabRowProgIndPerc"
            id="tabRowProgIndPerc4"
            itemProp="rowIndPerc"
          >
            <th
              className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc4"
              id="tabCelRowIndPerc4_1"
              itemProp="pgcStr"
            >
              PGC
            </th>
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
                <button
                  type="button"
                  id="btnPgc1Cel4_2"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnPgc tabBtnCol2"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span role="img" className="lockTabInd noInvert lock_inpPgc">
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                  <span role="img" id="alert_inpPgc1Cel4_2" hidden>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                    <span role="textbox">
                      Retorno é aproximação arredondada. Revise as entradas.
                    </span>
                  </span>
                </div>
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
                <button
                  type="button"
                  id="btnPgc2Cel4_3"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnPgc tabBtnCol3"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span role="img" className="lockTabInd noInvert lock_inpPgc">
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                  <span role="img" id="alert_inpPgc2Cel4_3" hidden>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                    <span role="textbox">
                      Retorno é aproximação arredondada. Revise as entradas.
                    </span>
                  </span>
                </div>
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
                <button
                  type="button"
                  id="btnPgc1Cel4_4"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnPgc tabBtnCol4"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span role="img" className="lockTabInd noInvert lock_inpPgc">
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                  <span role="img" id="alert_inpPgc3Cel4_4" hidden>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                    <span role="textbox">
                      Retorno é aproximação arredondada. Revise as entradas.
                    </span>
                  </span>
                </div>
              </div>
            </td>
          </tr>

          <tr
            className="tabRowProg tabRowProgIndPerc"
            id="tabRowProgIndPerc5"
            itemProp="rowIndPerc"
          >
            <th
              className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc5"
              id="tabCelRowIndPerc5_1"
              itemProp="tmbStr"
            >
              TMB
            </th>
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
                <button
                  type="button"
                  id="btnTmb1Cel5_2"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnTmb tabBtnCol2"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpTmb1Cel5_2"
                    className="lockTabInd noInvert lock_inpTmb"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnTmb2Cel5_3"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnTmb tabBtnCol3"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpTmb1Cel5_3"
                    className="lockTabInd noInvert lock_inpTmb"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnTmb3Cel5_4"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnInd tabBtnTmb tabBtnCol4"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span
                    role="img"
                    id="lock_inpTmb1Cel5_4"
                    className="lockTabInd noInvert lock_inpTmb"
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
              </div>
            </td>
          </tr>

          <tr
            className="tabRowProg tabRowProgIndPerc"
            id="tabRowProgIndPerc5"
            itemProp="rowIndPerc"
          >
            <th
              className="tabCelProgCons tabCelIndPerc tabCelRowIndPerc6 noInvert"
              id="tabCelRowIndPerc6_1"
              itemProp="getStr"
            >
              GET
            </th>
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
                <button
                  type="button"
                  id="btnGet1Cel6_2"
                  className="btn btn-secondary tabBtn tabBtnGet tabBtnInd tabBtnCol2"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span role="img" className="lockTabInd noInvert lock_inpGet">
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnGet2Cel6_3"
                  className="btn btn-secondary tabBtn tabBtnGet tabBtnInd tabBtnCol3"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span role="img" className="lockTabInd noInvert lock_inpGet">
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
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
                <button
                  type="button"
                  id="btnGet3Cel6_4"
                  className="btn btn-secondary tabBtn tabBtnGet tabBtnInd tabBtnCol2"
                  onClick={ev => handleIndEv(ev, "BTN")}
                >
                  Calcular
                </button>
                <div role="group" className="divLock noInvert">
                  <span role="img" className="lockTabInd noInvert lock_inpGet">
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
                            style={{
                              stopColor: "rgb(233, 180, 7)",
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "rgb(243, 221, 93)",
                            }}
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
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
