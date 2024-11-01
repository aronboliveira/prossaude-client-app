"use client";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { parseNotNaN } from "@/lib/global/gModel";
import { switchRequiredCols } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { tabProps, timers } from "@/vars";
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
      document.querySelectorAll(".tabInpProg").forEach(inp => {
        try {
          if (!(inp instanceof HTMLInputElement && (inp.type === "number" || inp.type === "text"))) return;
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
          return;
        }
      });
    } catch (e) {
      return;
    }
  }, [snc, fspr, td, tsv, tma, tip, numCons]);
  useEffect(() => {
    try {
      if (!trusted.current) return;
      switchNumCons();
    } catch (e) {
      return;
    }
  }, [numCons, switchNumCons]);
  useEffect(() => {
    setTimeout(() => {
      if (snc) snc.current ??= document.getElementById("selectNumCons") as nlSel;
      const query = snc
        ? snc.current ?? document.getElementById("selectNumCons")
        : document.getElementById("selectNumCons");
      if (!(query instanceof HTMLSelectElement || query instanceof HTMLInputElement)) return;
      setNumCons(evalPseudoNum(query.value || 1).toString());
    }, timers.personENTimer * 0.75);
  }, [snc, setNumCons]);
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
          setNumCons && setNumCons(() => evalPseudoNum(snc?.current?.value || 1).toString());
        } catch (e) {
          return;
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
