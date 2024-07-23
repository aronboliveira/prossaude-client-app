import { nullishDiv, validTabLabs } from "@/lib/global/declarations/types";
import {
  elementNotFound,
  extLine,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useRef, useState, useEffect } from "react";
import { handleCallbackWHS, person, tabProps } from "@/pages/edfis";
import {
  createArraysRels,
  getNumCol,
  updatePGC,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { Person } from "@/lib/global/declarations/classes";
import { ErrorBoundary } from "react-error-boundary";
import Col from "./tabs/Col";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherTab";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import Td from "./tabs/Td";

export default function TabDCut(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  const columns = [1, 2, 3, 4];
  const rows = [
    [2, "Subescapular", "Subescap"],
    [3, "Axilar Média", "Axilm"],
    [4, "Coxa", "Coxa"],
    [5, "Tríciptal", "Tricp"],
    [6, "Suprailíaca", "Suprail"],
    [7, "Peitoral", "Peit"],
    [8, "Abdominal", "Abd"],
    [9, "Soma", "Sum"],
  ];

  useEffect(() => {
    setMounted(true);
  }, []);
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Table for Skin Folds" />
      )}
    >
      <div role="group" className="divTab" id="divTabDobrCut" ref={mainRef}>
        <table className="tabProgCons noInvert" id="tabDCut" itemScope>
          <caption
            className="tabLegProgCons"
            id="tabLegDCut"
            itemProp="capDCut"
          >
            Dobras Cutâneas
          </caption>
          <colgroup
            className="tabLegProgCons"
            id="tabColGrpDCut"
            itemProp="blockDCut"
          >
            {columns.map(nCol => (
              <Col ctx="DCut" nCol={nCol} key={`col_dcut_${nCol}`} />
            ))}
          </colgroup>
          <thead
            className="tabTheadProgCons"
            id="tabTheadDCut"
            itemProp="blockDCut"
          >
            <tr
              className="tabRowProgCons tabRowDCutCons"
              id="tabRowDCut1"
              itemProp="rowDCut"
              data-row="1"
            >
              {columns.map(nCol => (
                <Th ctx="DCut" nCol={nCol} nRow={1} key={`th_dcut_${nCol}`} />
              ))}
            </tr>
          </thead>
          <tbody className="tbodyProgCons" id="tbodyDCut" itemProp="blockDCut">
            {rows.map(([rowNum, label, shortLabel]) => (
              <tr
                className={`tabRowProgCons${
                  label === "Soma" ? " tabRowDCutSum" : " tabRowDCutMed"
                }`}
                id={`row${shortLabel}${rowNum}_`}
                key={`tr_dcut__${rowNum}`}
                data-row={rowNum}
                hidden={[
                  "Subescapular",
                  "Axilar Média",
                  "Tríciptal",
                  "Suprailíaca",
                ].includes(label as string)}
              >
                <Th
                  ctx="DCut"
                  nRow={rowNum as number}
                  nCol={1}
                  lab={label as validTabLabs}
                />
                {[2, 3, 4].map(nCol => (
                  <Td
                    ctx="DCut"
                    nRow={rowNum as number}
                    nCol={nCol}
                    lab={label as validTabLabs}
                    key={`td_${nCol}__${rowNum}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <WatcherTab tabName="divTabDobrCut" />
    </ErrorBoundary>
  );
}

export const handleSumClick = (ev: React.MouseEvent) => {
  const protocolo = document.getElementById("tabSelectDCutId");
  const rowsDCArray = Array.from(
    document
      .getElementById("tabDCut")
      ?.getElementsByClassName("tabRowDCutMed") ?? []
  ).filter(rowDC => rowDC instanceof HTMLTableRowElement);
  try {
    if (typeof person !== "object" && "sumDCut" in person)
      throw typeError(
        `validating typeof person object`,
        "person",
        "object",
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
    person.sumDCut = createArraysRels(
      rowsDCArray as HTMLTableRowElement[],
      ev.currentTarget?.id,
      protocolo.value
    );
    if (Number.isFinite(person.sumDCut) || person.sumDCut <= 0)
      person.sumDCut = 0;
    if (tabProps.isAutoFillActive === true) {
      if (
        person instanceof Person &&
        tabProps.targInpPGC instanceof HTMLInputElement &&
        protocolo.value === "pollock3" &&
        person.age >= 0
      ) {
        const numCol = getNumCol(ev.currentTarget) ?? 0;
        typeof numCol === "number" && numCol > 0
          ? ([tabProps.PGC, tabProps.targInpSumDCut, tabProps.targInpPGC] =
              updatePGC(
                person,
                document.getElementById("fsProgConsId"),
                tabProps.numCol,
                "col"
              ))
          : typeError(
              "obtaining column number",
              tabProps.numCol,
              "number (natural)",
              extLine(new Error())
            );
      } else
        console.warn(`Error updating PGC using .sumDCut.
            Obtained person.age: ${person?.age || 0}
            Used Protocol: ${
              protocolo?.value || "null"
            } (Apenas pollock3 aceito, por enquanto);
            Is person classified? ${person instanceof Person};
            Instance of the targeted input for PGC: ${
              Object.prototype.toString
                .call(tabProps.targInpPGC)
                .slice(8, -1) ?? "null"
            }`);
    } else console.warn(`Autofill not active. PGC not affected.`);
  } catch (e) {
    console.error(
      `Error executing callback for Button for Sum of Skin Folds:\n${
        (e as Error).message
      }`
    );
  }
};
