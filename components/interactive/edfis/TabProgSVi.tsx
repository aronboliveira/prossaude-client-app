import { nullishDiv } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useRef, useState, useEffect } from "react";

export default function TabProgSVi(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!document.getElementById("divTabSVi") || !mounted) return;
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(
          mainRef.current,
          `Main Reference in TabProgSVi`,
          extLine(new Error())
        );
      syncAriaStates([
        mainRef.current,
        ...mainRef.current.querySelectorAll("*"),
      ]);
    } catch (e) {
      console.error(
        `Error executing procedure for syncing aria states in ${
          TabProgSVi.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }, [mounted]);
  return !mounted ? (
    <></>
  ) : (
    <div role="group" className="divTab" id="divTabSVi" ref={mainRef}>
      <table className="tabProgCons noInvert" id="tabProgSVi" itemScope>
        <caption className="tabLegProg" id="tabLegProgSVi" itemProp="headerSVi">
          Sinais Vitais
        </caption>
        <colgroup
          className="tabColGrpProg"
          id="tabColGrpProgSVi"
          itemProp="blockSVi"
        >
          <col
            className="tabColProg tabColProgSVi"
            id="tabColProgSVi1"
            itemProp="colSVi"
          />
          <col
            className="tabColProg tabColProgSVi"
            id="tabColProgSVi2"
            itemProp="colSVi"
          />
          <col
            className="tabColProg tabColProgSVi"
            id="tabColProgSVi3"
            itemProp="colSVi"
          />
          <col
            className="tabColProg tabColProgSVi"
            id="tabColProgSVi4"
            itemProp="colSVi"
          />
        </colgroup>
        <thead
          className="tabTheadProg"
          id="tabTheadProgSVi"
          itemProp="blockSVi"
        >
          <tr
            className="tabRowProg tabRowProgSVi"
            id="tabRowProgSVi1"
            itemProp="rowSVi"
          >
            <th
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi1"
              id="tabCelRowProgSVi1_1"
              itemProp="celSVi"
            ></th>
            <th
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi1 numConsTextHeadCel"
              id="tabCelRowProgSVi1_2"
              itemProp="celSVi"
            >
              1ª Consulta
            </th>
            <th
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi1 numConsTextHeadCel"
              id="tabCelRowProgSVi1_3"
              itemProp="celSVi"
            >
              2ª Consulta
            </th>
            <th
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi1 numConsTextHeadCel"
              id="tabCelRowProgSVi1_4"
              itemProp="celSVi"
            >
              3ª Consulta
            </th>
          </tr>
        </thead>
        <tbody className="tbodyProgCons" id="tbodyProgSvi" itemProp="blockSVi">
          <tr
            className="tabRowProg tabRowProgSVi"
            id="tabRowProgSVi2"
            itemProp="rowSVi"
          >
            <th
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi2_1"
              itemProp="celSVi"
            >
              PA
            </th>
            <td
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi2_2"
              itemProp="celSVi"
            >
              <label
                htmlFor="tabInpRowProgSVi2_2"
                className="form-control tabLabProg tabLabProgCons tabLabProgSvi tabLabRowProgSVi2"
                id="tabLabRowProgSVi2_2"
                itemProp="celLabSvi"
              >
                <input
                  type="number"
                  min="0"
                  max="65535"
                  className="form-control tabInpProg tabInpProgSVi tabInpRowProgSVi2"
                  id="tabInpRowProgSVi2_2"
                  itemProp="celValueSvi"
                  data-title="PA_1_Consulta"
                  required
                />
                <p className="msrProgCons">mmHg</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi2_3"
              itemProp="celSVi"
            >
              <label
                htmlFor="tabInpRowProgSVi2_3"
                className="form-control tabLabProg tabLabProgSvi tabLabRowProgSVi2"
                id="tabLabRowProgSVi2_3"
                itemProp="celLabSvi"
              >
                <input
                  type="number"
                  min="0"
                  max="65535"
                  className="form-control tabInpProg tabInpProgSVi tabInpRowProgSVi2"
                  id="tabInpRowProgSVi2_3"
                  itemProp="celValueSvi"
                  data-title="PA_2_Consulta"
                />
                <p className="msrProgCons">mmHg</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi2_4"
              itemProp="celSVi"
            >
              <label
                htmlFor="tabInpRowProgSVi2_4"
                className="form-control tabLabProg tabLabProgSvi tabLabRowProgSVi2"
                id="tabLabRowProgSVi2_4"
                itemProp="celLabSvi"
              >
                <input
                  type="number"
                  min="0"
                  max="65535"
                  className="form-control tabInpProg tabInpProgSVi tabInpRowProgSVi2"
                  id="tabInpRowProgSVi2_4"
                  itemProp="celValueSvi"
                  data-title="PA_3_Consulta"
                />
                <p className="msrProgCons">mmHg</p>
              </label>
            </td>
          </tr>
          <tr
            className="tabRowProg tabRowProgSVi"
            id="tabRowProgSVi3"
            itemProp="rowSVi"
          >
            <th
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi3_1"
              itemProp="celSVi"
            >
              FC
            </th>
            <td
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi3_2"
              itemProp="celSVi"
            >
              <label
                htmlFor="tabInpRowProgSVi3_2"
                className="form-control tabLabProg tabLabProgSvi tabLabRowProgSVi2"
                id="tabLabRowProgSVi3_2"
                itemProp="celLabSvi"
              >
                <input
                  type="number"
                  min="0"
                  max="65535"
                  className="form-control tabInpProg tabInpProgSVi tabInpRowProgSVi2"
                  id="tabInpRowProgSVi3_2"
                  itemProp="celValueSvi"
                  data-title="FC_1_Consulta"
                  required
                />
                <p className="msrProgCons">bpm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi3_3"
              itemProp="celSVi"
            >
              <label
                htmlFor="tabInpRowProgSVi3_3"
                className="form-control tabLabProg tabLabProgSvi tabLabRowProgSVi2"
                id="tabLabRowProgSVi3_3"
                itemProp="celLabSvi"
              >
                <input
                  type="number"
                  min="0"
                  max="65535"
                  className="form-control tabInpProg tabInpProgSVi tabInpRowProgSVi2"
                  id="tabInpRowProgSVi3_3"
                  itemProp="celValueSvi"
                  data-title="FC_2_Consulta"
                />
                <p className="msrProgCons">mmHg</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelProgSvi tabCelRowProgSVi2"
              id="tabCelRowProgSVi3_4"
              itemProp="celSVi"
            >
              <label
                htmlFor="tabInpRowProgSVi3_4"
                className="form-control tabLabProg tabLabProgSvi tabLabRowProgSVi2"
                id="tabLabRowProgSVi3_4"
                itemProp="celLabSvi"
              >
                <input
                  type="number"
                  min="0"
                  max="65535"
                  className="form-control tabInpProg tabInpProgSVi tabInpRowProgSVi2"
                  id="tabInpRowProgSVi3_4"
                  itemProp="celValueSvi"
                  data-title="FC_3_Consulta"
                />
                <p className="msrProgCons">mmHg</p>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
