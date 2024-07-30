"use client";
import { highlightChange } from "@/lib/global/gStyleScript";
import { nullishLab } from "@/lib/global/declarations/types";
import { parseNotNaN } from "@/lib/global/gModel";
import { switchNumConsTitles } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import {
  elementNotFound,
  elementNotPopulated,
  extLine,
} from "@/lib/global/handlers/errorHandler";
export default function TrioReadNumCons(): JSX.Element {
  const mainRef = useRef<nullishLab>(null);
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(
          mainRef.current,
          `Main Reference for TrioReadNumCons`,
          extLine(new Error())
        );
      syncAriaStates([
        mainRef.current,
        ...mainRef.current.querySelectorAll("*"),
      ]);
    } catch (e) {
      console.error(
        `Error executing useEffect for TrioReadNumCons:\n${
          (e as Error).message
        }`
      );
    }
  }, []);
  return (
    <label
      htmlFor="trioReadNumCons"
      id="labTrioReadNumCons"
      className="consLab"
      ref={mainRef}
    >
      Número inicial da Consulta em Leitura:
      <input
        type="number"
        className="form-control noInvert consInp minText maxText minNum maxNum patternText"
        id="trioReadNumCons"
        name="trio_read_num_cons"
        min="1"
        max="255"
        defaultValue="1"
        data-title="Numero_Inicial_Consulta"
        data-reqlength="1"
        data-maxlength="5"
        data-minnum="1"
        data-maxnum="255"
        data-pattern="^\d+$"
        onInput={ev => {
          try {
            ev.currentTarget.value !== "" &&
              Number.isFinite(parseNotNaN(ev.currentTarget.value)) &&
              parseNotNaN(ev.currentTarget.value) > 99 &&
              (ev.currentTarget.value = "99");
            const numTotalTabsCons =
              document.getElementById("fsProgConsId")?.querySelectorAll("table")
                ?.length || 0;
            if (
              ev.currentTarget instanceof HTMLInputElement &&
              parseInt(ev.currentTarget.value) <= 0 &&
              ev.currentTarget.value !== ""
            ) {
              ev.currentTarget.value = "";
              const range = document.createRange();
              range.setStart(ev.currentTarget, 0);
            }
            let numTotalTitledColsCons =
              document.getElementById("fsProgConsId")?.querySelectorAll("col")
                ?.length || 0;
            const numConsTextHeadCels = Array.from(
              document.getElementsByClassName("numConsTextHeadCel")
            );
            const tabsNum =
              document.getElementById("fsProgConsId")?.querySelectorAll("table")
                ?.length || 0;
            numTotalTitledColsCons = numTotalTitledColsCons - tabsNum;
            numConsTextHeadCels.length === numTotalTitledColsCons
              ? switchNumConsTitles(
                  numConsTextHeadCels,
                  ev.currentTarget,
                  numTotalTitledColsCons,
                  numTotalTabsCons
                )
              : elementNotPopulated(
                  numConsTextHeadCels,
                  "numConsTextHeadCels in callbackTrioReadNumCons()",
                  extLine(new Error())
                );
            numConsTextHeadCels.forEach(numConsCel =>
              highlightChange(numConsCel, "rgba(250, 30, 0, 0.3)")
            );
          } catch (e) {
            console.error(
              `Error executing callback for ${
                ev.currentTarget.id || ev.currentTarget.tagName
              }:\n${(e as Error).message}`
            );
          }
        }}
      />
    </label>
  );
}
