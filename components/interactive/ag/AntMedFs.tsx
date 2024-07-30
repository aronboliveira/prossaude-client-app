import { CounterAction } from "@/lib/global/declarations/interfaces";
import { addMedHistHandler } from "@/lib/locals/aGPage/aGHandlers";
import { clearPhDates } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishFs } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useReducer, useRef } from "react";


export default function AntMedFs(): JSX.Element {
  const mainRef = useRef<nullishFs>(null);
  const [blockCount, setBlockCount] = useReducer(
    (s: number, a: CounterAction) => {
      switch (a.type) {
        case "INCREMENT":
          return s + 1;
        case "DECREMENT":
          return s > 2 ? s - 1 : s;
        default:
          return s;
      }
    },
    2
  );
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(
          mainRef.current,
          `Main reference for AntMedFs`,
          extLine(new Error())
        );
      syncAriaStates([
        mainRef.current,
        ...mainRef.current.querySelectorAll("*"),
      ]);
      clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
    } catch (e) {
      console.error(
        `Error executing useEffect for blockCount:\n${(e as Error).message}`
      );
    }
  }, [blockCount]);
  return (
    <fieldset
      name="fsAntMedName"
      id="fsAntMedId"
      className="fsSub"
      ref={mainRef}
    >
      <legend id="fsAntMedLeg">
        Tratamentos Médicos Atuais e Anteriores e/ou Internações
        <span role="group" id="antMedBtnsDiv" className="btnsDiv">
          <button
            type="button"
            name="addAntMedName1"
            id="addAntMedId1"
            className="addAntMed countAntMed btn btn-secondary biBtn mg-1br"
            defaultValue="addAntMed"
            onClick={ev => {
              addMedHistHandler(ev, blockCount);
              setBlockCount({ type: "INCREMENT" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
          <button
            type="button"
            name="removeAntMedName1"
            id="removeAntMedId1"
            className="removeAntMed countAntMed btn btn-secondary biBtn mg-1br"
            defaultValue="removeAntMed"
            onClick={ev => {
              addMedHistHandler(ev, blockCount);
              setBlockCount({ type: "DECREMENT" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-dash"
              viewBox="0 0 16 16"
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>
          </button>
        </span>
      </legend>
      <div id="antMedContainer" role="group">
        <div className="antMedBlock flexNoW" id="antMedBlock1" role="group">
          <span
            role="group"
            className="divAntMedSpan spanMain spanAntMedText"
            id="antMedSpanInp1"
          >
            <label htmlFor="antMedId1" className="antMedLabel">
              1)
              <input
                type="text"
                name="antMedName1"
                id="antMedId1"
                className="form-control autocorrect autocorrectFirst inpAntMed antMedText"
                data-title="desc_tratamento1"
              />
            </label>
          </span>
          <span
            role="group"
            className="divAntMedSpan spanMain spanAntMedDate"
            id="antMedSpanMainDate1"
          >
            <span
              role="group"
              className="divAntMedSubSpan spanSub spanSubAntMedDate"
              id="antMedSpanSubDate1"
            >
              <div className="antMedDiv" role="group">
                <label
                  htmlFor="antMedDateIniId1"
                  className="antMedLabel"
                ></label>
                <div className="antMedDateDiv flexDiv" role="group">
                  <input
                    type="date"
                    name="antMedDateIniName1"
                    id="antMedDateIniId1"
                    className="form-control inpDate antMedDate inpAntMed"
                    data-title="data_ini_tratamento1"
                    required
                  />
                  <span role="textbox">até</span>
                  <input
                    type="date"
                    name="antMedDateEndName1"
                    id="antMedDateEndId1"
                    className="form-control inpDate antMedDate inpAntMed"
                    data-title="data_end_tratamento1"
                    required
                  />
                  <label
                    htmlFor="antMedDateEndId1"
                    className="antMedLabel"
                  ></label>
                  <button
                    type="button"
                    className="datBtn atualTratBtn btn btn-secondary"
                    id="atualTrat1DatBtn"
                  >
                    Usar data atual
                  </button>
                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
    </fieldset>
  );
}
