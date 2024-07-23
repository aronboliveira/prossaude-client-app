import { nullishDiv } from "@/lib/global/declarations/types";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useRef, useState, useEffect } from "react";
import Col from "./tabs/Col";
import Th from "./tabs/Th";
import WatcherTab from "./client/tabs/WatcherIndPerc";

export default function TabProgSVi(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  const columns = [1, 2, 3, 4];
  useEffect(() => {
    setMounted(true);
  }, []);
  return !mounted ? (
    <></>
  ) : (
    <>
      <div role="group" className="divTab" id="divTabSVi" ref={mainRef}>
        <table className="tabProgCons noInvert" id="tabProgSVi" itemScope>
          <caption
            className="tabLegProg"
            id="tabLegProgSVi"
            itemProp="headerSVi"
          >
            Sinais Vitais
          </caption>
          <colgroup
            className="tabColGrpProg"
            id="tabColGrpProgSVi"
            itemProp="blockSVi"
          >
            {columns.map(nCol => (
              <Col ctx="ProgSVi" nCol={nCol} />
            ))}
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
              {columns.map(nCol => (
                <Th ctx="ProgSVi" nCol={nCol} nRow={1} />
              ))}
            </tr>
          </thead>
          <tbody
            className="tbodyProgCons"
            id="tbodyProgSvi"
            itemProp="blockSVi"
          >
            <tr
              className="tabRowProg tabRowProgSVi"
              id="tabRowProgSVi2"
              itemProp="rowSVi"
            >
              <Th ctx="ProgSVi" nRow={2} nCol={1} lab="PA" />
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
                    onInput={ev => handleEventReq(ev.currentTarget)}
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
              <Th ctx="ProgSVi" nRow={3} nCol={1} lab="FC" />
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
                    onInput={ev => handleEventReq(ev.currentTarget)}
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
      <WatcherTab tabName="divTabSVi" />
    </>
  );
}
