import { Person } from "@/lib/global/declarations/classes";
import {
  IndCases,
  btnFillResult,
  validTabLabs,
} from "@/lib/global/declarations/types";
import {
  elementNotFound,
  extLine,
  stringError,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import { checkReturnIndex } from "@/lib/locals/edFisNutPage/edFisNutController";
import {
  defineTargInps,
  getNumCol,
  matchPersonPropertiesWH,
  updateIndexesContexts,
  updatePGC,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { person, tabProps } from "@/pages/edfis";
import { ErrorBoundary } from "react-error-boundary";
import Col from "./tabs/Col";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherTab";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import Td from "./tabs/Td";

export default function TabIndPerc(): JSX.Element {
  const columns = [1, 2, 3, 4];
  const rows = [
    [2, "IMC"],
    [3, "MLG"],
    [4, "PGC"],
    [5, "TMB"],
    [6, "GET"],
  ];
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Table for Indexes" />
      )}
    >
      <div role="group" className="divTab" id="divTabInd">
        <table className="tabProgCons noInvert" id="tabIndPerc">
          <colgroup>
            {columns.map(nCol => (
              <Col ctx="IndPerc" nCol={nCol} key={`col_ind-perc__${nCol}`} />
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
                <Th
                  ctx="IndPerc"
                  nCol={nCol}
                  nRow={1}
                  key={`th_ind-perc__${nCol}`}
                />
              ))}
            </tr>
          </thead>
          <tbody className="tbodyProgCons">
            {rows.map(([nRow, lab], i) => (
              <tr
                className={`tabRowProg tabRowProgIndPerc`}
                id={`tabRowProgIndPerc${nRow}`}
                itemProp="rowIndPerc"
                data-row={nRow}
                key={`tr_ind-perc__${nRow}`}
              >
                <Th
                  ctx="IndPerc"
                  nRow={nRow as number}
                  nCol={i + 1}
                  lab={lab as validTabLabs}
                />
                {columns.slice(1).map(nCol => (
                  <Td
                    ctx="IndPerc"
                    nRow={nRow as number}
                    nCol={nCol}
                    lab={lab as validTabLabs}
                    key={`td_${nCol}__${nRow}`}
                  />
                ))}
              </tr>
            ))}
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
