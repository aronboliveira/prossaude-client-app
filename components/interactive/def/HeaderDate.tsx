import { clearPhDates } from "@/lib/global/gStyleScript";
import { inputNotFound } from "@/lib/global/handlers/errorHandler";
import { nullishInp } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";

export default function HeaderDate(): JSX.Element {
  const dateRef = useRef<nullishInp>(null);
  useEffect(() => {
    try {
      if (
        !(
          dateRef.current instanceof HTMLInputElement &&
          dateRef.current.type === "date"
        )
      )
        throw inputNotFound(
          dateRef.current,
          `Validation of Date on Header instance`,
          '<input type="date">'
        );
      clearPhDates([dateRef.current]);
    } catch (e) {
      console.error(
        `Error executing useEffect for HeaderDate:\n${(e as Error).message}`
      );
    }
  }, []);
  return (
    <span role="group" className="control flexJSt flexQ900NoW" id="spanHFlex">
      <input
        type="date"
        className="form-control d-ibl minCurrDate"
        id="dateHeader"
        placeholder="Date"
        data-title="data_cabecalho"
        ref={dateRef}
      />
      <button
        type="button"
        className="datBtn d-ibl btn btn-secondary"
        id="headerDatBtn"
      >
        Usar data atual
      </button>
    </span>
  );
}
