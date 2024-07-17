import { nullishDiv } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import {
  handleEventReq,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import { handleCallbackWHS, tabProps } from "@/pages/edfis";
import { useRef, useState, useEffect } from "react";

export default function TabMedAnt(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!document.getElementById("divTabMedAnt")) return;
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
          TabMedAnt.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }, [mounted]);
  return !mounted ? (
    <></>
  ) : (
    <div role="group" className="divTab" id="divTabMedAnt" ref={mainRef}>
      <table className="tabProgCons noInvert" id="tabMedAnt" itemScope>
        <caption
          className="tabLegProgCons"
          id="tabLegMedAnt"
          itemProp="headerMedAnt"
        >
          Medidas Antropométricas (exceto Dobras Cutâneas)
        </caption>
        <colgroup
          className="tabLegProgCons"
          id="tabColGrpMedAnt"
          itemProp="blockMedAnt"
        >
          <col
            className="tabColProgCons tabColMedAnt"
            id="tabColMedAnt1"
            itemProp="colMedAnt"
          />
          <col
            className="tabColProgCons tabColMedAnt"
            id="tabColMedAnt2"
            itemProp="colMedAnt"
          />
          <col
            className="tabColProgCons tabColMedAnt"
            id="tabColMedAnt3"
            itemProp="colMedAnt"
          />
          <col
            className="tabColProgCons tabColMedAnt"
            id="tabColMedAnt4"
            itemProp="colMedAnt"
          />
        </colgroup>
        <thead
          className="tabTheadProgCons"
          id="tabTheadMedAnt"
          itemProp="blockMedAnt"
        >
          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt1"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt1"
              id="tabCelRowMedAnt1_1"
              itemProp="celMedAnt"
            ></th>
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt1 numConsTextHeadCel"
              id="tabCelRowMedAnt1_2"
              itemProp="celMedAnt"
            >
              1ª Consulta
            </th>
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt1 numConsTextHeadCel"
              id="tabCelRowMedAnt1_3"
              itemProp="celMedAnt"
            >
              2ª Consulta
            </th>
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt1 numConsTextHeadCel"
              id="tabCelRowMedAnt1_4"
              itemProp="celMedAnt"
            >
              3ª Consulta
            </th>
          </tr>
        </thead>
        <tbody
          className="tbodyProgCons"
          id="tbodyMedAnt"
          itemProp="blockMedAnt"
        >
          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt2"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt2"
              id="tabCelRowMedAnt2_1"
              itemProp="celMedAnt"
            >
              Peso
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt2"
              id="tabCelRowMedAnt2_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt2_2"
                className="form-control tabLabProgCons tabLabRowMedAnt2"
                id="tabLabRowMedAnt2_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt2 inpWeigth float sevenCharLongNum"
                  id="tabInpRowMedAnt2_2"
                  min="0"
                  max="65535"
                  data-title="Peso_1_Consulta"
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
                <p className="msrProgCons">kg</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt2"
              id="tabCelRowMedAnt2_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt2_3"
                className="form-control tabLabProgCons tabLabRowMedAnt2"
                id="tabLabRowMedAnt2_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt2 inpWeigth float sevenCharLongNum"
                  id="tabInpRowMedAnt2_3"
                  min="0"
                  max="65535"
                  data-title="Peso_2_Consulta"
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
                <p className="msrProgCons">kg</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt2"
              id="tabCelRowMedAnt2_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt2_4"
                className="form-control tabLabProgCons tabLabRowMedAnt2"
                id="tabLabRowMedAnt2_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt2 inpWeigth float sevenCharLongNum"
                  id="tabInpRowMedAnt2_4"
                  min="0"
                  max="65535"
                  data-title="Peso_3_Consulta"
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
                <p className="msrProgCons">kg</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt3"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt3"
              id="tabCelRowMedAnt3_1"
              itemProp="celMedAnt"
            >
              Altura
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt3"
              id="tabCelRowMedAnt3_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt3_2"
                className="form-control tabLabProgCons tabLabRowMedAnt3"
                id="tabLabRowMedAnt3_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt3 inpHeigth float sevenCharLongNum"
                  id="tabInpRowMedAnt3_2"
                  min="0"
                  max="65535"
                  data-title="Altura_1_Consulta"
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
                <p className="msrProgCons">m</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt3"
              id="tabCelRowMedAnt3_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt3_3"
                className="form-control tabLabProgCons tabLabRowMedAnt3"
                id="tabLabRowMedAnt3_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt3 inpHeigth float sevenCharLongNum"
                  id="tabInpRowMedAnt3_3"
                  min="0"
                  max="65535"
                  data-title="Altura_2_Consulta"
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
                <p className="msrProgCons">m</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt3"
              id="tabCelRowMedAnt3_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt3_4"
                className="form-control tabLabProgCons tabLabRowMedAnt3"
                id="tabLabRowMedAnt3_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt3 inpHeigth float sevenCharLongNum"
                  id="tabInpRowMedAnt3_4"
                  min="0"
                  max="65535"
                  data-title="Altura_3_Consulta"
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
                <p className="msrProgCons">m</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt4"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt4"
              id="tabCelRowMedAnt4_1"
              itemProp="celMedAnt"
            >
              Tórax
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt4"
              id="tabCelRowMedAnt4_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt4_2"
                className="form-control tabLabProgCons tabLabRowMedAnt4"
                id="tabLabRowMedAnt4_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt4 float sevenCharLongNum"
                  id="tabInpRowMedAnt4_2"
                  min="0"
                  max="65535"
                  data-title="Torax_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt4"
              id="tabCelRowMedAnt4_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt4_3"
                className="form-control tabLabProgCons tabLabRowMedAnt4"
                id="tabLabRowMedAnt4_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt4 float sevenCharLongNum"
                  id="tabInpRowMedAnt4_3"
                  min="0"
                  max="65535"
                  data-title="Torax_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt4"
              id="tabCelRowMedAnt4_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt4_4"
                className="form-control tabLabProgCons tabLabRowMedAnt4"
                id="tabLabRowMedAnt4_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt4 float sevenCharLongNum"
                  id="tabInpRowMedAnt4_4"
                  min="0"
                  max="65535"
                  data-title="Torax_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt5"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt5"
              id="tabCelRowMedAnt5_1"
              itemProp="celMedAnt"
            >
              Cintura
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt5"
              id="tabCelRowMedAnt5_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt5_2"
                className="form-control tabLabProgCons tabLabRowMedAnt5"
                id="tabLabRowMedAnt5_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt5 float sevenCharLongNum"
                  id="tabInpRowMedAnt5_2"
                  min="0"
                  max="65535"
                  data-title="Cintura_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt5"
              id="tabCelRowMedAnt5_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt5_3"
                className="form-control tabLabProgCons tabLabRowMedAnt5"
                id="tabLabRowMedAnt5_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt5 float sevenCharLongNum"
                  id="tabInpRowMedAnt5_3"
                  min="0"
                  max="65535"
                  data-title="Cintura_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt5"
              id="tabCelRowMedAnt5_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt5_4"
                className="form-control tabLabProgCons tabLabRowMedAnt5"
                id="tabLabRowMedAnt5_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt5 float sevenCharLongNum"
                  id="tabInpRowMedAnt5_4"
                  min="0"
                  max="65535"
                  data-title="Cintura_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt6"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt6"
              id="tabCelRowMedAnt6_1"
              itemProp="celMedAnt"
            >
              Quadril
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt6"
              id="tabCelRowMedAnt6_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt6_2"
                className="form-control tabLabProgCons tabLabRowMedAnt6"
                id="tabLabRowMedAnt6_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt6 float sevenCharLongNum"
                  id="tabInpRowMedAnt6_2"
                  min="0"
                  max="65535"
                  data-title="Quadril_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt6"
              id="tabCelRowMedAnt6_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt6_3"
                className="form-control tabLabProgCons tabLabRowMedAnt6"
                id="tabLabRowMedAnt6_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt6 float sevenCharLongNum"
                  id="tabInpRowMedAnt6_3"
                  min="0"
                  max="65535"
                  data-title="Quadril_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt6"
              id="tabCelRowMedAnt6_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt6_4"
                className="form-control tabLabProgCons tabLabRowMedAnt6"
                id="tabLabRowMedAnt6_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt6 float sevenCharLongNum"
                  id="tabInpRowMedAnt6_4"
                  min="0"
                  max="65535"
                  data-title="Quadril_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt7"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt7"
              id="tabCelRowMedAnt7_1"
              itemProp="celMedAnt"
            >
              Cintura × Quadril
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt7"
              id="tabCelRowMedAnt7_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt7_2"
                className="form-control tabLabProgCons tabLabRowMedAnt7"
                id="tabLabRowMedAnt7_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt7 float sevenCharLongNum"
                  id="tabInpRowMedAnt7_2"
                  min="0"
                  max="65535"
                  data-title="Cintura_×_Quadril_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt7"
              id="tabCelRowMedAnt7_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt7_3"
                className="form-control tabLabProgCons tabLabRowMedAnt7"
                id="tabLabRowMedAnt7_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt7 float sevenCharLongNum"
                  id="tabInpRowMedAnt7_3"
                  min="0"
                  max="65535"
                  data-title="Cintura_×_Quadril_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt7"
              id="tabCelRowMedAnt7_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt7_4"
                className="form-control tabLabProgCons tabLabRowMedAnt7"
                id="tabLabRowMedAnt7_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt7 float sevenCharLongNum"
                  id="tabInpRowMedAnt7_4"
                  min="0"
                  max="65535"
                  data-title="Cintura_×_Quadril_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt8"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt8"
              id="tabCelRowMedAnt8_1"
              itemProp="celMedAnt"
            >
              Antebraço
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt8"
              id="tabCelRowMedAnt8_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt8_2"
                className="form-control tabLabProgCons tabLabRowMedAnt8"
                id="tabLabRowMedAnt8_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt8 float sevenCharLongNum"
                  id="tabInpRowMedAnt8_2"
                  min="0"
                  max="65535"
                  data-title="Antebraço_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt8"
              id="tabCelRowMedAnt8_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt8_3"
                className="form-control tabLabProgCons tabLabRowMedAnt8"
                id="tabLabRowMedAnt8_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt8 float sevenCharLongNum"
                  id="tabInpRowMedAnt8_3"
                  min="0"
                  max="65535"
                  data-title="Antebraço_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt8"
              id="tabCelRowMedAnt8_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt8_4"
                className="form-control tabLabProgCons tabLabRowMedAnt8"
                id="tabLabRowMedAnt8_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt8 float sevenCharLongNum"
                  id="tabInpRowMedAnt8_4"
                  min="0"
                  max="65535"
                  data-title="Antebraço_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt9"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt9"
              id="tabCelRowMedAnt9_1"
              itemProp="celMedAnt"
            >
              Braço
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt9"
              id="tabCelRowMedAnt9_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt9_2"
                className="form-control tabLabProgCons tabLabRowMedAnt9"
                id="tabLabRowMedAnt9_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt9 float sevenCharLongNum"
                  id="tabInpRowMedAnt9_2"
                  min="0"
                  max="65535"
                  data-title="Braço_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt9"
              id="tabCelRowMedAnt9_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt9_3"
                className="form-control tabLabProgCons tabLabRowMedAnt9"
                id="tabLabRowMedAnt9_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt9 float sevenCharLongNum"
                  id="tabInpRowMedAnt9_3"
                  min="0"
                  max="65535"
                  data-title="Braço_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt9"
              id="tabCelRowMedAnt9_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt9_4"
                className="form-control tabLabProgCons tabLabRowMedAnt9"
                id="tabLabRowMedAnt9_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt9 float sevenCharLongNum"
                  id="tabInpRowMedAnt9_4"
                  min="0"
                  max="65535"
                  data-title="Braço_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt10"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt10"
              id="tabCelRowMedAnt10_1"
              itemProp="celMedAnt"
            >
              Coxa
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt10"
              id="tabCelRowMedAnt10_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt10_2"
                className="form-control tabLabProgCons tabLabRowMedAnt10"
                id="tabLabRowMedAnt10_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt10 float sevenCharLongNum"
                  id="tabInpRowMedAnt10_2"
                  min="0"
                  max="65535"
                  data-title="Coxa_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt10"
              id="tabCelRowMedAnt10_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt10_3"
                className="form-control tabLabProgCons tabLabRowMedAnt10"
                id="tabLabRowMedAnt10_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt10 float sevenCharLongNum"
                  id="tabInpRowMedAnt10_3"
                  min="0"
                  max="65535"
                  data-title="Coxa_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt10"
              id="tabCelRowMedAnt10_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt10_4"
                className="form-control tabLabProgCons tabLabRowMedAnt10"
                id="tabLabRowMedAnt10_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt10 float sevenCharLongNum"
                  id="tabInpRowMedAnt10_4"
                  min="0"
                  max="65535"
                  data-title="Coxa_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>

          <tr
            className="tabRowProgCons tabRowMedAnt"
            id="tabRowMedAnt11"
            itemProp="rowMedAnt"
          >
            <th
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt11"
              id="tabCelRowMedAnt11_1"
              itemProp="celMedAnt"
            >
              Panturrilha
            </th>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt11"
              id="tabCelRowMedAnt11_2"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt11_2"
                className="form-control tabLabProgCons tabLabRowMedAnt11"
                id="tabLabRowMedAnt11_2"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt11 float sevenCharLongNum"
                  id="tabInpRowMedAnt11_2"
                  min="0"
                  max="65535"
                  data-title="Panturrilha_1_Consulta"
                  required
                  onInput={ev => handleEventReq(ev.currentTarget)}
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt11"
              id="tabCelRowMedAnt11_3"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt11_3"
                className="form-control tabLabProgCons tabLabRowMedAnt11"
                id="tabLabRowMedAnt11_3"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt11 float sevenCharLongNum"
                  id="tabInpRowMedAnt11_3"
                  min="0"
                  max="65535"
                  data-title="Panturrilha_2_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
            <td
              className="tabCelProgCons tabCelMedAnt tabCelRowMedAnt11"
              id="tabCelRowMedAnt11_4"
              itemProp="celMedAnt"
            >
              <label
                htmlFor="tabInpRowMedAnt11_4"
                className="form-control tabLabProgCons tabLabRowMedAnt11"
                id="tabLabRowMedAnt11_4"
              >
                <input
                  type="number"
                  className="form-control tabInpProg tabInpProgMedAnt tabInpRowMedAnt11 float sevenCharLongNum"
                  id="tabInpRowMedAnt11_4"
                  min="0"
                  max="65535"
                  data-title="Panturrilha_3_Consulta"
                />
                <p className="msrProgCons">cm</p>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
