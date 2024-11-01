"use client";
import { createContext, lazy, useContext, useEffect, useRef, useState } from "react";
import TrioReadNumCons from "./TrioReadNumCons";
import FormCalcTmbType from "./FormCalcTmbType";
import GordCorpLvl from "./GordCorpLvl";
import NafType from "./NafType";
import SelFactorAtleta from "./SelFactorAtleta";
import SelectNumCons from "./SelectNumCons";
import TextBodyType from "./TextBodyType";
import LockTabInd from "../tabs/LobTackInd";
import { Suspense } from "react";
import ReactSpinner from "../../../icons/ReactSpinner";
import { ENCtx } from "./ENForm";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { NlMRef, entryEl, nlInp, nlSel, nlTab, nlFs, nlSpan } from "@/lib/global/declarations/types";
import useMount from "@/lib/hooks/useMount";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
import { person, tabProps } from "@/vars";
import { parseNotNaN } from "@/lib/global/gModel";
import { addListenerInnerTabs } from "@/lib/locals/edFisNutPage/edFisNutController";
import { NafTypeValue } from "@/lib/global/declarations/testVars";
import { styled } from "styled-components";
import s from "@/styles//modules/sharedComponents.module.scss";
import sEn from "@/styles//modules/enStyles.module.scss";
import { dispatchFactorAtvLvl } from "@/lib/locals/edFisNutPage/edFisNutModel";
const FsTabs = lazy(() => import("./FsTabs")),
  DivProgSels = styled.div`
    ~ hr {
      width: 93vw;
      margin-left: 0.5rem;
      opacity: 0.25;
    }
    @media screen and (max-width: 900px) {
      margin-left: 0.25rem;
    }
    @media screen and (max-width: 550px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-items: left;
      padding-left: 0.5rem;
    }
  `;
export const FspCtx = createContext<FspCtxProps>({
  cons: {
    numCons: 1,
    setNumCons: null,
  },
  refs: {
    prt: null,
    snc: null,
    td: null,
    tip: null,
    tma: null,
    tsv: null,
  },
});
export default function FsProgCons(): JSX.Element {
  let af: NlMRef<nlInp> = null,
    fspr: NlMRef<nlFs> = null,
    gr: NlMRef<nlSel> = null,
    nafr: NlMRef<nlSel> = null,
    sar: NlMRef<nlSel> = null;
  const snc = useRef<nlSel>(null),
    prt = useRef<nlSel>(null),
    td = useRef<nlTab>(null),
    tsv = useRef<nlTab>(null),
    tma = useRef<nlTab>(null),
    tip = useRef<nlTab>(null),
    glSpan = useRef<nlSpan>(null),
    fctSpan = useRef<nlSpan>(null),
    nc = useRef<nlSpan>(null),
    id = "fsProgConsId",
    [mounted] = useMount(),
    [numCons, setNumCons] = useState<number>(1),
    ctx = useContext<ENCtxProps>(ENCtx);
  if (ctx?.refs) ({ af, fspr, gr, nafr, sar } = ctx.refs);
  useEffect(() => {
    if (!mounted || document.querySelectorAll("table").length <= 3) return;
    if (gr) gr.current ??= document.getElementById("genId") as HTMLSelectElement;
    const selectNumCons = snc?.current ?? document.getElementById("selectNumCons"),
      consTablesFs = fspr?.current ?? document.getElementById(id);
    document.querySelectorAll(".tabInpProg").forEach(inp => {
      try {
        if (!(inp instanceof HTMLInputElement && (inp.type === "number" || inp.type === "text"))) return;
        if (inp.dataset.conditioned && inp.dataset.conditioned === "true") return;
        if (inp.required) {
          if (inp.minLength === -1) inp.minLength = 1;
          if (inp.maxLength === -1) inp.maxLength = 99;
          if (inp.pattern === "") inp.pattern = "^[\\d,.]+$";
          inp.classList.add("minText", "maxText", "pattern");
          if (inp.type === "number") {
            if (inp.min === "") inp.min = "0";
            if (inp.max === "") inp.max = "999999";
            inp.classList.add("minNum", "maxNum");
          }
        } else {
          inp.type === "number"
            ? inp.addEventListener("input", ev =>
                handleCondtReq(ev.currentTarget as HTMLInputElement, {
                  minNum: 0,
                  maxNum: 999999,
                  min: 1,
                  max: 99,
                  pattern: ["^[\\d,.]+$", ""],
                }),
              )
            : inp.addEventListener("input", ev =>
                handleCondtReq(ev.currentTarget as HTMLInputElement, {
                  min: 1,
                  max: 99,
                  pattern: ["^[\\d,.]+$", ""],
                }),
              );
          inp.dataset.conditioned = "true";
        }
      } catch (e) {
        return;
      }
    });
    for (const { p, t } of [
      { p: "IMC", t: tabProps.tiimc },
      { p: "MLG", t: tabProps.timlg },
      { p: "TMB", t: tabProps.titmb },
      { p: "GET", t: tabProps.tiget },
      { p: "PGC", t: tabProps.tiget },
    ])
      (tabProps as any)[p] = parseNotNaN(parseNotNaN((t as entryEl)?.value ?? "0").toFixed(4)) ?? 0;
    dispatchFactorAtvLvl((nafr?.current ?? (document.getElementById("nafType") as entryEl))?.value as NafTypeValue);
    try {
      if (!(selectNumCons instanceof HTMLSelectElement || selectNumCons instanceof HTMLDataListElement)) return;
      tabProps.numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
      if (!(selectNumCons.lastElementChild instanceof HTMLOptionElement)) return;
      tabProps.numConsLastOp = parseNotNaN(selectNumCons?.lastElementChild?.value ?? "1", 1);
      tabProps.numColsCons = Math.min(
        ...Array.from(document.querySelectorAll("table")).map(tab => {
          return tab instanceof HTMLTableElement ? tab.querySelectorAll("col").length : 0;
        }),
      );
      if (!(tabProps.numConsLastOp === tabProps.numColsCons && tabProps.numConsLastOp >= 3)) return;
      tabProps.areNumConsOpsValid = true;
    } catch (e) {
      return;
    }
    tabProps.numCons ||= 1;
    person.dispatchDC(
      parseNotNaN((document.getElementById(`tabInpRowDCut9_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0"),
    );
    person.dispatchWeight(
      parseNotNaN((document.getElementById(`tabInpRowMedAnt2_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0"),
    );
    person.dispatchHeight(
      parseNotNaN((document.getElementById(`tabInpRowMedAnt3_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0"),
    );
    addListenerInnerTabs(consTablesFs, tabProps.numColsCons);
  }, [mounted, gr, snc, fspr, sar, af, nafr]);
  useEffect(() => {
    tabProps.fsp = fspr?.current ?? document.getElementById(id);
  }, [fspr]);
  useEffect(() => {
    const handleResize = (): void => {
      try {
        glSpan.current ??= document.getElementById("glSpan");
        fctSpan.current ??= document.getElementById("fctSpan");
        nc.current ??= document.getElementById("trioReadNumCons");
        if (!(glSpan.current instanceof HTMLElement && fctSpan.current instanceof HTMLElement)) return;
        const fctWid = getComputedStyle(fctSpan.current).width;
        glSpan.current.style.width = fctWid;
        if (!(nc.current instanceof HTMLElement)) return;
        nc.current.style.width = fctWid;
        nc.current.style.maxWidth = fctWid;
      } catch (e) {
        return;
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, []);
  return (
    <FspCtx.Provider
      value={{
        cons: { numCons, setNumCons },
        refs: { prt, snc, td, tip, tma, tsv },
      }}>
      <fieldset ref={fspr} name='fsProgConsName' id={id} className={`fsMain divTab ${s.divTabEn} ${s.fsProgCons}`}>
        <h4 className='bolded' id='hProgCons'>
          Progresso em Consultas
        </h4>
        <DivProgSels role='group' id='divProgSels'>
          <div
            role='group'
            className={`flexDiv flexDivProg ${sEn.flexDivEn} ${sEn.flexDivProg} ${sEn.divProgCons}`}
            id='divProgCons'>
            <label htmlFor='selectNumCons' id='labSelectNumCons' className={`${sEn.consLab}`}>
              <span>Consulta em Leitura:</span>
              <SelectNumCons />
            </label>
            <TrioReadNumCons />
          </div>
          <div
            role='group'
            className={`flexDiv flexDivProg ${sEn.flexDivEn} ${sEn.flexDivProg} ${sEn.divProgType}`}
            id='divProgType'>
            <div role='group' className={`${sEn.divLab}`}>
              <span>Tipo corporal aplicado:</span>
              <TextBodyType />
            </div>
            <div role='group' className={`spanForm ${sEn.divLab}`}>
              <label htmlFor='gordCorpLvl' style={{ display: "inline", fontWeight: "600", marginBottom: "0.5rem" }}>
                Nível de Gordura Corporal aplicado:
              </label>
              <span
                ref={glSpan}
                role='group'
                id='glSpan'
                className={`form-control noInvert spanSubForm consInp max52_900 ${sEn.glSpan}`}>
                <GordCorpLvl />
                <LockTabInd ctx='GordCorpLvl' addGroup={["spanLock"]} isSpan={true} />
              </span>
            </div>
          </div>
          <div
            role='group'
            className={`flexDiv flexDivProg ${sEn.flexDivEn} ${sEn.flexDivProg} ${sEn.divProgFactor}`}
            id='divProgFactor'>
            <div role='group' className={`${sEn.divLab}`}>
              <label htmlFor='nafType' style={{ display: "inline", fontWeight: "600", marginBottom: "0.5rem" }}>
                Fator de Nível de Atividade Física:
              </label>
              <NafType />
            </div>
            <div role='group' className={`${sEn.divLab} spanForm max52_900`}>
              <label htmlFor='formCalcTMBType' style={{ display: "inline", fontWeight: "600", marginBottom: "0.5rem" }}>
                Fórmula para Cálculo de TMB:
              </label>
              <span
                ref={fctSpan}
                id='fctSpan'
                role='group'
                className={`form-control noInvert spanSubForm consInp ${sEn.glSpan}`}>
                <FormCalcTmbType />
                <LockTabInd ctx='formCalcTMB' addGroup={["spanLock"]} isSpan={true} />
              </span>
            </div>
            <div role='group' className={`${sEn.divLab}`} id='spanFactorAtleta' hidden>
              <span>Fator para Calcúlo de TMB em Atletas:</span>
              <SelFactorAtleta />
            </div>
          </div>
        </DivProgSels>
        <hr className={sEn.hr} />
        <Suspense fallback={<ReactSpinner scale={0.5} />}>
          <FsTabs />
        </Suspense>
      </fieldset>
    </FspCtx.Provider>
  );
}
