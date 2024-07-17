import { nullishDiv } from "@/lib/global/declarations/types";
import {
  elementNotFound,
  extLine,
  typeError,
} from "@/lib/global/handlers/errorHandler";
import {
  handleEventReq,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import { useRef, useState, useEffect } from "react";
import { handleCallbackWHS, person, tabProps } from "@/pages/edfis";
import {
  createArraysRels,
  getNumCol,
  updatePGC,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { Person } from "@/lib/global/declarations/classes";

export default function TabDCut(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!document.getElementById("divTabDobrCut") || !mounted) return;
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(
          mainRef.current,
          `Main Reference in TabIndPerc`,
          extLine(new Error())
        );
      syncAriaStates([
        mainRef.current,
        ...mainRef.current.querySelectorAll("*"),
      ]);
    } catch (e) {
      console.error(
        `Error executing procedure for syncing aria states in ${
          TabDCut.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }, [mounted]);
  const handleSumClick = (ev: React.MouseEvent) => {
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
  return !mounted ? (
    <></>
  ) : (
    <div role="group" className="divTab" id="divTabDobrCut" ref={mainRef}>
      <table className="tabProgCons noInvert" id="tabDCut" itemScope>
        <caption className="tabLegProgCons" id="tabLegDCut" itemProp="capDCut">
          Dobras Cutâneas
        </caption>
        <colgroup
          className="tabLegProgCons"
          id="tabColGrpDCut"
          itemProp="blockDCut"
        >
          <col
            className="tabColProgCons tabColDCut"
            id="tabColDCut1"
            itemProp="colDCut"
          />
          <col
            className="tabColProgCons tabColDCut"
            id="tabColDCut2"
            itemProp="colDCut"
          />
          <col
            className="tabColProgCons tabColDCut"
            id="tabColDCut3"
            itemProp="colDCut"
          />
          <col
            className="tabColProgCons tabColDCut"
            id="tabColDCut4"
            itemProp="colDCut"
          />
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
          >
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut1"
              id="tabCelRowDCut1_1"
              itemProp="celDCut"
            ></th>
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut1 numConsTextHeadCel"
              id="tabCelRowDCut1_2"
              itemProp="celDCut"
            >
              1ª Consulta
            </th>
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut1 numConsTextHeadCel"
              id="tabCelRowDCut1_3"
              itemProp="celDCut"
            >
              2ª Consulta
            </th>
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut1 numConsTextHeadCel"
              id="tabCelRowDCut1_4"
              itemProp="celDCut"
            >
              3ª Consulta
            </th>
          </tr>
        </thead>
        <tbody className="tbodyProgCons" id="tbodyDCut" itemProp="blockDCut">
          <tr
            className="tabRowProgCons tabRowDCutMed"
            id="rowSubescap2_"
            hidden
          >
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut2"
              id="tabCelRowDCut2_1"
              itemProp="subescapularStr"
            >
              Subescapular
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut2"
              id="tabCelRowDCut2_2"
              itemProp="subescapularNum"
            >
              <label
                htmlFor="tabInpRowDCut2_2"
                id="labInpRowDCut2_2"
                className="form-control tabLabProgCons tabLabRowDCut2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut2 float sevenCharLongNum"
                  id="tabInpRowDCut2_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Subescapular_1_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut2"
              id="tabCelRowDCut2_3"
              itemProp="subescapularNum"
            >
              <label
                htmlFor="tabInpRowDCut2_3"
                id="labInpRowDCut2_3"
                className="form-control tabLabProgCons tabLabRowDCut2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut2 float sevenCharLongNum"
                  id="tabInpRowDCut2_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Subescapular_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut2"
              id="tabCelRowDCut2_4"
              itemProp="subescapularNum"
            >
              <label
                htmlFor="tabInpRowDCut2_4"
                id="labInpRowDCut2_4"
                className="form-control tabLabProgCons tabLabRowDCut2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut2 float sevenCharLongNum"
                  id="tabInpRowDCut2_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Subescapular_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutMed" id="rowAxilm3_" hidden>
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut3"
              id="tabCelRowDCut3_1"
              itemProp="axilarMediaStr"
            >
              Axilar Média
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut3"
              id="tabCelRowDCut3_2"
              itemProp="axilarMediaNum"
            >
              <label
                htmlFor="tabInpRowDCut3_2"
                id="labInpRowDCut3_2"
                className="form-control tabLabProgCons tabLabRowDCut3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut3 float sevenCharLongNum"
                  id="tabInpRowDCut3_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Axilar_Med_1_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut3"
              id="tabCelRowDCut3_3"
              itemProp="axilarMediaNum"
            >
              <label
                htmlFor="tabInpRowDCut3_3"
                id="labInpRowDCut3_3"
                className="form-control tabLabProgCons tabLabRowDCut3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut3 float sevenCharLongNum"
                  id="tabInpRowDCut3_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Axilar_Med_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut3"
              id="tabCelRowDCut3_4"
              itemProp="axilarMediaNum"
            >
              <label
                htmlFor="tabInpRowDCut3_4"
                id="labInpRowDCut3_4"
                className="form-control tabLabProgCons tabLabRowDCut3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut3 float sevenCharLongNum"
                  id="tabInpRowDCut3_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Axilar_Med_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutMed" id="rowCoxa4_">
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut4"
              id="tabCelRowDCut4_1"
              itemProp="coxaStr"
            >
              Coxa
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut4"
              id="tabCelRowDCut4_2"
              itemProp="coxaNum"
            >
              <label
                htmlFor="tabInpRowDCut4_2"
                id="labInpRowDCut4_2"
                className="form-control tabLabProgCons tabLabRowDCut4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut4 float sevenCharLongNum"
                  id="tabInpRowDCut4_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Coxa_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut4"
              id="tabCelRowDCut4_3"
              itemProp="coxaNum"
            >
              <label
                htmlFor="tabInpRowDCut4_3"
                id="labInpRowDCut4_3"
                className="form-control tabLabProgCons tabLabRowDCut4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut4 float sevenCharLongNum"
                  id="tabInpRowDCut4_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Coxa_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut4"
              id="tabCelRowDCut4_4"
              itemProp="coxaNum"
            >
              <label
                htmlFor="tabInpRowDCut4_4"
                id="labInpRowDCut4_4"
                className="form-control tabLabProgCons tabLabRowDCut4 forceInvert"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut4 float sevenCharLongNum"
                  id="tabInpRowDCut4_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Coxa_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutMed" id="rowTricp5_" hidden>
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut5"
              id="tabCelRowDCut5_1"
              itemProp="triciptalStr"
            >
              Tríciptal
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut5"
              id="tabCelRowDCut5_2"
              itemProp="triciptalNum"
            >
              <label
                htmlFor="tabInpRowDCut5_2"
                id="labInpRowDCut5_2"
                className="form-control tabLabProgCons tabLabRowDCut5"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut5 float sevenCharLongNum"
                  id="tabInpRowDCut5_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Triciptal_1_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut5"
              id="tabCelRowDCut5_3"
              itemProp="triciptalNum"
            >
              <label
                htmlFor="tabInpRowDCut5_3"
                id="labInpRowDCut5_3"
                className="form-control tabLabProgCons tabLabRowDCut5"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut5 float sevenCharLongNum"
                  id="tabInpRowDCut5_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Triciptal_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut5"
              id="tabCelRowDCut5_4"
              itemProp="triciptalNum"
            >
              <label
                htmlFor="tabInpRowDCut5_4"
                id="labInpRowDCut5_4"
                className="form-control tabLabProgCons tabLabRowDCut5"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut5 float sevenCharLongNum"
                  id="tabInpRowDCut5_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Triciptal_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutMed" id="rowSuprail6_" hidden>
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut6"
              id="tabCelRowDCut6_1"
              itemProp="suprailiacaStr"
            >
              Suprailíaca
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut6"
              id="tabCelRowDCut6_2"
              itemProp="suprailiacaNum"
            >
              <label
                htmlFor="tabInpRowDCut6_2"
                id="labInpRowDCut6_2"
                className="form-control tabLabProgCons tabLabRowDCut6"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut6 float sevenCharLongNum"
                  id="tabInpRowDCut6_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Suprailiaca_1_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut6"
              id="tabCelRowDCut6_3"
              itemProp="suprailiacaNum"
            >
              <label
                htmlFor="tabInpRowDCut6_3"
                id="labInpRowDCut6_3"
                className="form-control tabLabProgCons tabLabRowDCut6"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut6 float sevenCharLongNum"
                  id="tabInpRowDCut6_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Suprailiaca_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut6"
              id="tabCelRowDCut6_4"
              itemProp="suprailiacaNum"
            >
              <label
                htmlFor="tabInpRowDCut6_4"
                id="labInpRowDCut6_4"
                className="form-control tabLabProgCons tabLabRowDCut6"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut6 float sevenCharLongNum"
                  id="tabInpRowDCut6_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Suprailiaca_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutMed" id="rowPeit7_">
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut7"
              id="tabCelRowDCut7_1"
              itemProp="peitoralStr"
            >
              Peitoral
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut7"
              id="tabCelRowDCut7_2"
              itemProp="peitoralNum"
            >
              <label
                htmlFor="tabInpRowDCut7_2"
                id="labInpRowDCut7_2"
                className="form-control tabLabProgCons tabLabRowDCut7"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut7 float sevenCharLongNum"
                  id="tabInpRowDCut7_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Peitoral_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut7"
              id="tabCelRowDCut7_3"
              itemProp="peitoralNum"
            >
              <label
                htmlFor="tabInpRowDCut7_3"
                id="labInpRowDCut7_3"
                className="form-control tabLabProgCons tabLabRowDCut7"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut7 float sevenCharLongNum"
                  id="tabInpRowDCut7_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Peitoral_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut7"
              id="tabCelRowDCut7_4"
              itemProp="peitoralNum"
            >
              <label
                htmlFor="tabInpRowDCut7_4"
                id="labInpRowDCut7_4"
                className="form-control tabLabProgCons tabLabRowDCut7"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut7 float sevenCharLongNum"
                  id="tabInpRowDCut7_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Peitoral_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutMed" id="rowAbd8_">
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut8"
              id="tabCelRowDCut8_1"
              itemProp="abdominalStr"
            >
              Abdominal
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut8"
              id="tabCelRowDCut8_2"
              itemProp="abdominalNum"
            >
              <label
                htmlFor="tabInpRowDCut8_2"
                id="labInpRowDCut8_2"
                className="form-control tabLabProgCons tabLabRowDCut8"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut8 float sevenCharLongNum"
                  id="tabInpRowDCut8_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Abdominal_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut8"
              id="tabCelRowDCut8_3"
              itemProp="abdominalNum"
            >
              <label
                htmlFor="tabInpRowDCut8_3"
                id="labInpRowDCut8_3"
                className="form-control tabLabProgCons tabLabRowDCut8"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut8 float sevenCharLongNum"
                  id="tabInpRowDCut8_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Abdominal_2_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut8"
              id="tabCelRowDCut8_4"
              itemProp="abdominalNum"
            >
              <label
                htmlFor="tabInpRowDCut8_4"
                id="labInpRowDCut8_4"
                className="form-control tabLabProgCons tabLabRowDCut8"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut8 float sevenCharLongNum"
                  id="tabInpRowDCut8_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Abdominal_3_Consulta"
                />
                <p className="msrProgCons">mm</p>
              </label>
            </td>
          </tr>

          <tr className="tabRowProgCons tabRowDCutSum" id="rowSum9_">
            <th
              className="tabCelProgCons tabCelDCut tabCelRowDCut9"
              id="tabCelRowDCut9_1"
              itemProp="somaStr"
            >
              Soma
            </th>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut9"
              id="tabCelRowDCut9_2"
              itemProp="somaNum"
            >
              <label
                htmlFor="tabInpRowDCut9_2"
                id="labInpRowDCut9_2"
                className="form-control tabLabProgCons tabLabRowDCut9"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut9 inpSumDCut float sevenCharLongNum"
                  data-targ="true"
                  id="tabInpRowDCut9_2"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Soma_1_Consulta"
                  required
                  onInput={ev => {
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
                      tabProps.isAutoFillActive
                    );
                    handleEventReq(ev.currentTarget);
                  }}
                />
                <p className="msrProgCons sumMsr">mm</p>
                <button
                  type="button"
                  id="sumDCBtn9_2"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnSum tabBtnRowDCut9"
                  onClick={handleSumClick}
                >
                  Calcular
                </button>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut9"
              id="tabCelRowDCut9_2"
              itemProp="somaNum"
            >
              <label
                htmlFor="tabInpRowDCut9_3"
                id="labInpRowDCut9_3"
                className="form-control tabLabProgCons tabLabRowDCut9 noInvert"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut9 inpSumDCut float sevenCharLongNum"
                  data-targ="false"
                  id="tabInpRowDCut9_3"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Soma_2_Consulta"
                  onInput={ev =>
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
                      tabProps.isAutoFillActive
                    )
                  }
                />
                <p className="msrProgCons sumMsr">mm</p>
                <button
                  type="button"
                  id="sumDCBtn9_3"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnSum tabBtnRowDCut9"
                  onClick={handleSumClick}
                >
                  Calcular
                </button>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelDCut tabCelRowDCut9"
              id="tabCelRowDCut9_2"
              itemProp="somaNum"
            >
              <label
                htmlFor="tabInpRowDCut9_4"
                id="labInpRowDCut9_4"
                className="form-control tabLabProgCons tabLabRowDCut9 noInvert"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgSumDCut tabInpRowDCut9 inpSumDCut float sevenCharLongNum"
                  data-targ="false"
                  id="tabInpRowDCut9_4"
                  min="0"
                  max="65535"
                  data-title="Dobras Cutâneas_Soma_3_Consulta"
                  onInput={ev =>
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
                      tabProps.isAutoFillActive
                    )
                  }
                />
                <p className="msrProgCons sumMsr">mm</p>
                <button
                  type="button"
                  id="sumDCBtn9_4"
                  className="btn btn-secondary tabBtn tabBtnProgCons tabBtnSum tabBtnRowDCut9"
                  onClick={handleSumClick}
                >
                  Calcular
                </button>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
