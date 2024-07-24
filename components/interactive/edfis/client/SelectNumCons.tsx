"use client";

import { elCollection } from "@/lib/global/declarations/types";
import { parseNotNaN } from "@/lib/global/gModel";
import {
  extLine,
  inputNotFound,
  multipleElementsNotFound,
} from "@/lib/global/handlers/errorHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { switchRequiredCols } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps } from "@/pages/edfis";

export default function SelectNumCons(): JSX.Element {
  return (
    <select
      id="selectNumCons"
      name="num_cons"
      className="form-select noInvert consInp"
      data-title="Consulta Lida"
      onChange={ev => {
        const contextEls = [
          document.getElementById("selectNumCons"),
          document.getElementById("fsProgConsId"),
          document.getElementById("tabDCut"),
        ];
        if (typeof tabProps.numCons === "number") {
          tabProps.numCons = parseNotNaN(ev.currentTarget.value || "1", 1) || 1;
          switchRequiredCols(
            contextEls as elCollection,
            tabProps.numCons,
            tabProps.areNumConsOpsValid
          );
          document.querySelectorAll(".tabInpProg").forEach((inp, i) => {
            try {
              if (
                !(
                  inp instanceof HTMLInputElement &&
                  (inp.type === "number" || inp.type === "text")
                )
              )
                throw inputNotFound(
                  inp,
                  `Validation of Input instance and type`,
                  extLine(new Error())
                );
              if (inp.required) {
                inp.minLength = 1;
                inp.maxLength = 99;
                inp.pattern = "^[\\d,.]+$";
                inp.dataset.reqlength = "1";
                inp.dataset.maxlength = "99";
                inp.dataset.pattern = "^[\\d,.]+$";
                !inp.classList.contains("minText") &&
                  inp.classList.add("minText");
                !inp.classList.contains("maxText") &&
                  inp.classList.add("maxText");
                !inp.classList.contains("patternText") &&
                  inp.classList.add("patternText");
                if (inp.type === "number") {
                  inp.min = "0.05";
                  inp.max = "999999";
                  !inp.classList.contains("minNum") &&
                    inp.classList.add("minNum");
                  !inp.classList.contains("maxNum") &&
                    inp.classList.add("maxNum");
                }
                inp.addEventListener("input", handleEventReq);
              } else {
                inp.minLength = 0;
                inp.maxLength = 99;
                inp.pattern = "";
                delete inp.dataset.reqlength;
                delete inp.dataset.maxlength;
                delete inp.dataset.pattern;
                inp.classList.contains("minText") &&
                  inp.classList.remove("minText");
                inp.classList.contains("maxText") &&
                  inp.classList.remove("maxText");
                inp.classList.contains("patternText") &&
                  inp.classList.remove("patternText");
                if (inp.type === "number") {
                  inp.min = "0";
                  inp.max = "999999";
                  inp.classList.contains("minNum") &&
                    inp.classList.remove("minNum");
                  inp.classList.contains("maxNum") &&
                    inp.classList.remove("maxNum");
                }
                inp.removeEventListener("input", handleEventReq);
              }
            } catch (e) {
              console.error(
                `Error executing iteration ${i} for Tab Inp Prog application of requirements:\n${
                  (e as Error).message
                }`
              );
            }
          });
        } else
          multipleElementsNotFound(
            extLine(new Error()),
            "arguments for callbackNumCons()",
            ev.currentTarget,
            ...contextEls,
            tabProps.numCons
          );
      }}
    >
      <option value="1" id="opCons1">
        1ª
      </option>
      <option value="2" id="opCons2">
        2ª
      </option>
      <option value="3" id="opCons3">
        3ª
      </option>
    </select>
  );
}
