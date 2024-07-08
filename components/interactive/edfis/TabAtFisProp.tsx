import { PayloadCounterAction } from "@/lib/global/declarations/interfaces";
import { nullishDiv } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import {
  addRowAtivFis,
  removeRowAtivFis,
} from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { useEffect, useReducer, useRef } from "react";

export default function TabAtFirsProp(): JSX.Element {
  const mainRef = useRef<nullishDiv>(null);
  const [blockCount, setBlockCount] = useReducer(
    (s: number, a: PayloadCounterAction) => {
      switch (a.type) {
        case "INCREMENT":
          return s + 1;
        case "DECREMENT":
          return s > 2 ? s - 1 : s;
        default:
          return s;
      }
    },
    3
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
    } catch (e) {
      console.error(
        `Error executing useEffect for blockCount:\n${(e as Error).message}`
      );
    }
  }, [blockCount]);
  return (
    <div role="group" className="divTab" ref={mainRef}>
      <legend
        className="legAtFis"
        id="tabLegAtFisProp"
        itemProp="headerAtFisProp"
      >
        Atividades Físicas Propostas
        <button
          type="button"
          name="addAtFisPropName"
          id="addAtFisPropId"
          className="countAtFis countAtFisProp addAtFis addAtFisProp biBtn"
          defaultValue="addComorb"
          onClick={ev => {
            setBlockCount({
              type: "INCREMENT",
              payload: ev.currentTarget.classList.toString(),
            });
            addRowAtivFis(blockCount, "Prop");
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
          name="removeAtFisPropName"
          id="removeAtFisPropId"
          className="countAtFis countAtFisProp removeAtFis removeAtFisProp biBtn"
          defaultValue="removeComorb"
          onClick={ev => {
            setBlockCount({
              type: "DECREMENT",
              payload: ev.currentTarget.classList.toString(),
            });
            removeRowAtivFis(blockCount, "Prop");
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
      </legend>
      <table className="tabAtFis tabAtFisProp" id="tabAtFisProp" itemScope>
        <colgroup id="tabColGrpAtFisProp" itemProp="blockAtFisProp">
          <col
            className="tabColAtFis tabColAtFisProp"
            id="tabColAtFisProp1"
            itemProp="colAtFisProp"
          />
          <col
            className="tabColAtFis tabColAtFisProp"
            id="tabColAtFisProp2"
            itemProp="colAtFisProp"
          />
          <col
            className="tabColAtFis tabColAtFisProp"
            id="tabColAtFisProp3"
            itemProp="colAtFisProp"
          />
          <col
            className="tabColAtFis tabColAtFisProp"
            id="tabColAtFisProp4"
            itemProp="colAtFisProp"
          />
          <col
            className="tabColAtFis tabColAtFisProp"
            id="tabColAtFisProp5"
            itemProp="colAtFisProp"
          />
        </colgroup>
        <tbody
          className="tbodyAtFis noInvert"
          id="tbodyAtFisProp"
          itemProp="blockAtFisProp"
        >
          <tr
            className="tabRowAtFis tabRowAtFisProp"
            id="tabRowAtFis tabRowAtFisProp1"
            itemProp="rowAtFisProp"
          >
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp1_1"
              itemProp="celAtFisProp"
            ></td>
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp1_2"
            >
              Qual atividade?
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp1_3"
            >
              Quantas vezes por semana?
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp1_4"
            >
              Quanto tempo por sessão, em minutos?
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp1_5"
            >
              Por quanto tempo, em meses?
            </td>
          </tr>
          <tr
            className="tabRowAtFis tabRowAtFisProp"
            id="tabRowAtFis tabRowAtFisPropId2"
            itemProp="rowAtFisProp"
          >
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp2_1"
              itemProp="celAtFisProp"
            >
              1)
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp tabCelLeft"
              id="tabCelRowAtFisProp2_2"
              itemProp="celAtFisProp"
            >
              <input
                type="text"
                className="tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert"
                id="tabInpRowAtFisProp2_1"
                itemProp="inpAtFisProp"
                data-title="Atividade_Fisica_Proposta_Nome_1"
                data-reqlength="3"
                required
              />
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp tabCelLeft"
              id="tabCelRowAtFisProp2_3"
              itemProp="celAtFisProp"
            >
              <input
                type="number"
                minLength={1}
                maxLength={5}
                min="0"
                max="255"
                className="inpAtivFis tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert"
                id="tabInpRowAtFisProp2_2"
                itemProp="inpAtFisProp"
                data-title="Atividade_Fisica_Proposta_NSemana_1"
                data-reqlength="1"
                data-maxlength="3"
                data-minnum="0"
                data-maxnum="255"
                required
              />
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp"
              id="tabCelRowAtFisProp2_4"
              itemProp="celAtFisProp"
            >
              <input
                type="number"
                minLength={1}
                maxLength={7}
                min="0"
                max="65535"
                className="tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert"
                id="tabInpRowAtFisProp2_3 sevenCharLongNum"
                itemProp="inpAtFisProp"
                data-title="Atividade_Fisica_Proposta_SessãoMin_1"
                data-reqlength="1"
                data-maxlength="3"
                data-minnum="0"
                data-maxnum="65535"
                required
              />
            </td>
            <td
              className="tabCelAtFis tabCelAtFisProp tabCelRight"
              id="tabCelRowAtFisProp2_5"
              itemProp="celAtFisProp"
            >
              <input
                type="number"
                minLength={1}
                maxLength={7}
                min="0"
                max="65535"
                className="tabInpAtFisProp tabInpRowAtFisProp2 form-control noInvert"
                id="tabInpRowAtFisProp2_4 sevenCharLongNum"
                itemProp="inpAtFisProp"
                data-title="Atividade_Fisica_Proposta_Meses_1"
                data-reqlength="1"
                data-maxlength="3"
                data-minnum="0"
                data-maxnum="65535"
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
