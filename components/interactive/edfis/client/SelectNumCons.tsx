"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { checkContext, limitedError, parseNotNaN } from "@/lib/global/gModel";
import { switchRequiredCols } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps, timers } from "@/vars";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { useContext, useEffect, useCallback, useRef } from "react";
import { ENCtx } from "./ENForm";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { FspCtx } from "./FsProgCons";
import { evalPseudoNum } from "@/lib/locals/edFisNutPage/edFisNutModel";
import sEn from "@/styles//modules/enStyles.module.scss";
import { NlMRef, NlrDispatch, nlFs, nlSel, nlTab } from "@/lib/global/declarations/types";
export default function SelectNumCons(): JSX.Element {
  let fspr: NlMRef<nlFs> = null,
    snc: NlMRef<nlSel> = null,
    td: NlMRef<nlTab> = null,
    tsv: NlMRef<nlTab> = null,
    tma: NlMRef<nlTab> = null,
    tip: NlMRef<nlTab> = null,
    setNumCons: NlrDispatch<number> = null,
    numCons = 1;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    ctx2 = useContext<FspCtxProps>(FspCtx),
    trusted = useRef<boolean>(false);
  if (ctx1?.refs) ({ fspr } = ctx1.refs);
  if (ctx2) {
    if (ctx2.refs) ({ snc, td, tsv, tma, tip } = ctx2.refs);
    if (ctx2.cons) ({ numCons, setNumCons } = ctx2.cons);
  }
  const switchNumCons = useCallback(() => {
    try {
      if (!(snc?.current instanceof HTMLElement)) throw new Error(`Failed to validate input reference instance`);
      tabProps.numCons = parseNotNaN(snc.current.value || "1", 1) || 1;
      switchRequiredCols({
        snc: snc.current ?? document.getElementById("selectNumCons"),
        td: td?.current ?? document.getElementById("tabDCut"),
        tsv: tsv?.current ?? document.getElementById("tabProgSVi"),
        tma: tma?.current ?? document.getElementById("tabMedAnt"),
        tip: tip?.current ?? document.getElementById("tabIndPerc"),
      });
      const textClasses = ["minText", "maxText", "patternText"],
        numClasses = ["minNum", "maxNum"],
        datasetAttributes = [
          { k: "reqlength", v: "1" },
          { k: "maxlength", v: "99" },
          { k: "pattern", v: "^[\\d,.]+$" },
        ],
        max = "999999",
        assignNumAttr = (inp: HTMLInputElement, min: string): void => {
          if (inp.type === "number") {
            inp.min = min;
            inp.max = max;
            numClasses.forEach(cls => !inp.classList.contains(cls) && inp.classList.add(cls));
          }
        };
      document.querySelectorAll(".tabInpProg").forEach((inp, i) => {
        try {
          if (!(inp instanceof HTMLInputElement && (inp.type === "number" || inp.type === "text")))
            throw inputNotFound(inp, `Validation of Input instance and type`, extLine(new Error()));
          if (inp.required) {
            Object.assign(inp, {
              minLength: 1,
              maxLength: 99,
              pattern: "^[\\d,.]+$",
            });
            datasetAttributes.forEach(({ k, v }) => (inp.dataset[k] = v));
            textClasses.forEach(cls => !inp.classList.contains(cls) && inp.classList.add(cls));
            inp.addEventListener("input", handleEventReq);
            if (inp.type === "number") assignNumAttr(inp, "0");
          } else {
            Object.assign(inp, {
              minLength: 0,
              maxLength: 99,
              pattern: "^[\\d,.]+$",
            });
            datasetAttributes.forEach(({ k }) => delete inp.dataset[k]);
            textClasses.forEach(cls => !inp.classList.contains(cls) && inp.classList.add(cls));
            inp.removeEventListener("input", handleEventReq);
            if (inp.type === "number") assignNumAttr(inp, "0");
          }
        } catch (e) {
          console.error(
            `Error executing iteration ${i} for Tab Inp Prog application of requirements:\n${(e as Error).message}`,
          );
        }
      });
    } catch (e) {
      limitedError(
        `Error executing effect for ${SelectNumCons.prototype.constructor.name}:${(e as Error).message}`,
        SelectNumCons.prototype.constructor.name,
      );
    }
  }, [snc, fspr, td, tsv, tma, tip, numCons]);
  useEffect(() => {
    try {
      if (!trusted.current) return;
      switchNumCons();
      console.log("Índice da Consulta: " + (tabProps.numCons || "INDEFINIDO"));
    } catch (e) {
      console.error(`Error executing effect for ${SelectNumCons.prototype.constructor.name}:\n${(e as Error).message}`);
    }
  }, [numCons, switchNumCons]);
  useEffect(() => {
    setTimeout(() => {
      const query = document.getElementById("selectNumCons");
      tabProps.numCons =
        parseNotNaN(snc?.current?.value || "1", 1, "int") ||
        parseNotNaN(
          ((query instanceof HTMLSelectElement || query instanceof HTMLInputElement) &&
            (query as HTMLSelectElement).value) ||
            "1",
          1,
          "int",
        );
    }, timers.personENTimer * 0.75);
  }, [snc]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", SelectNumCons);
  checkContext(ctx2, "FspCtx", SelectNumCons);
  return (
    <select
      ref={snc}
      value={numCons}
      id='selectNumCons'
      name='num_cons'
      className={`form-select noInvert consInp min52_900 ${sEn.select} ${sEn.selectNumCons}`}
      data-title='Consulta Lida'
      onChange={ev => {
        try {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          setNumCons && setNumCons(() => evalPseudoNum(snc?.current?.value ?? 1).toString());
        } catch (e) {
          const idf =
            ev.currentTarget.id || ev.currentTarget.name || ev.currentTarget.className || ev.currentTarget.tagName;
          limitedError(`Error executing ${ev.type} callback for ${idf}:\n${(e as Error).message}`, idf);
        }
      }}>
      {Array.from({ length: 3 }, (_, i) => (
        <option key={`cons_op__${i}`} value={i + 1} id={`opCons${i + 1}`}>
          {i + 1}ª
        </option>
      ))}
    </select>
  );
}
