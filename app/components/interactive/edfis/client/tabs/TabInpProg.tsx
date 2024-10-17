"use client";
import { ENCtxProps, ENTabsCtxProps, TdProps } from "@/lib/global/declarations/interfaces";
import { handleCallbackWHS } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { handleIndEv } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { applyFieldConstraints, checkContext, textTransformPascal } from "@/lib/global/gModel";
import { handleCondtReq, handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useState, useEffect, useRef, useContext } from "react";
import { NlMRef, nlFs, nlInp, nlSel } from "@/lib/global/declarations/types";
import { tabProps } from "@/vars";
import { ENCtx } from "../ENForm";
import { ENTabsCtx } from "../FsTabs";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function TabInpProg({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    fspr: NlMRef<nlFs> = null,
    fct: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    { targs } = useContext<ENTabsCtxProps>(ENTabsCtx),
    inpRef = useRef<nlInp>(null),
    pascalLab = textTransformPascal(lab),
    fullName = ((): string => {
      switch (lab) {
        case "Abdominal":
          return "Abdominais";
        case "Antebraço":
          return "do Antebraço";
        case "Axilar Média":
          return "Axilares Mediais";
        case "Braço":
          return "Braçais";
        case "Cintura":
          return "da Cintura";
        case "Cintura / Quadril":
          return "da Razão Cintadura por Quadril";
        case "Coxa":
          return "da Coxa";
        case "Panturrilha":
          return "da Panturrilha";
        case "Peitoral":
          return "Peitorais";
        case "Quadril":
          return "do Quadril";
        case "Subescapular":
          return "Subescapulares";
        case "Suprailíaca":
          return "Suprailíacas";
        case "Tríciptal":
          return "Tríciptais";
        case "Tórax":
          return "Toráxicas";
        case "Soma":
          return "(Soma)";
        case "PA":
          return "Pressão Arterial";
        case "FC":
          return "Frequência Cardíaca";
        default:
          return lab;
      }
    })(),
    [v, setValue] = useState<string>("");
  if (ctx1?.refs) ({ gl, fspr, fct } = ctx1.refs);
  let medAntCase = "";
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", TabInpProg);
  const ctx2 = useContext<ENTabsCtxProps>(ENTabsCtx);
  checkContext(ctx2, "ENTabsCtx", TabInpProg);
  useEffect(() => {
    if (!inpRef.current) {
      //TODO REMOVER APÓS TESTE
      console.warn("Failed to recognize input reference");
      return;
    }
    if (inpRef.current.required) handleEventReq(inpRef.current);
    else {
      if (inpRef.current.required) handleEventReq(inpRef.current);
      else {
        inpRef.current.type === "number"
          ? handleCondtReq(inpRef.current, {
              minNum: 0.05,
              maxNum: 999999,
              min: 1,
              max: 99,
              pattern: ["^[\\d,.]+$", ""],
            })
          : handleCondtReq(inpRef.current as HTMLInputElement, {
              min: 1,
              max: 99,
              pattern: ["^[\\d,.]+$", ""],
            });
      }
      if (
        inpRef.current.classList.contains("inpInd") &&
        (lab === "IMC" || lab === "MLG" || lab === "PGC" || lab === "TMB" || lab === "GET")
      )
        handleIndEv(lab, {
          el: inpRef.current,
          fsp: fspr?.current ?? document.getElementById("fsProgConsId"),
          gl: gl?.current ?? document.getElementById("gordCorpLvl"),
          fct: fct?.current ?? document.getElementById("formCalcTMBType"),
          refs: targs,
        });
      if (inpRef.current.classList.contains("tabInpProgMedAnt") || inpRef.current.classList.contains("tabInpProgDCut"))
        handleCallbackWHS(inpRef.current);
    }
  }, [v, inpRef, fct, fspr, gl, lab, targs]);
  useEffect(() => {
    setTimeout(() => {
      let col: { [k: string]: NlMRef<nlInp> } = targs.firstCol;
      if (nCol === 3) col = targs.secondCol;
      else if (nCol === 4) col = targs.thirdCol;
      const sign = (() => {
        const l = lab.toLowerCase();
        switch (l) {
          case "peso":
            return "w";
          case "altura":
            return "h";
          case "somadcut":
            return "dc";
          default:
            return l;
        }
      })();
      const k = `ti${sign}${nRow - 1}`;
      col[k] = inpRef;
      //TODO REMOVER APÓS TESTE
      console.log(`Assigned ${inpRef.current ?? "undefined"} to ${k}`);
    }, 1000);
  }, [inpRef, lab, nCol, nRow, targs.firstCol, targs.secondCol, targs.thirdCol]);
  if (ctx === "MedAnt") {
    medAntCase = ((): string => {
      switch (lab) {
        case "Peso":
          return "Weight";
        case "Altura":
          return "Height";
        case "Tórax":
          return "Torax";
        case "Cintura":
          return "Waist";
        case "Quadril":
          return "Hips";
        case "Cintura / Quadril":
          return "WaistToHips";
        case "Braço":
          return "Arm";
        case "Antebraço":
          return "Forearm";
        case "Coxa":
          return "Thigh";
        case "Panturrilha":
          return "Calf";
        default:
          return "";
      }
    })();
  }
  return ctx === "IndPerc" ? (
    <input
      type='number'
      value={v}
      ref={inpRef}
      name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
      id={`inp${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
      className={`form-control tabInpProg tabInpProgIndPerc inpInd inp${pascalLab} inpCol${nCol} sevenCharLongNum ${sEn.tabInpProg}`}
      min={nCol - 1 === tabProps.numCons ? "0.05" : "0"}
      data-title={`${lab} (Consulta ${nCol - 1})`}
      data-row={nRow}
      data-col={nCol}
      required={nCol - 1 === tabProps.numCons ? true : false}
      onInput={ev => {
        tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
        setValue(ev.currentTarget.value);
      }}
    />
  ) : (
    ((): JSX.Element => {
      if (ctx === "MedAnt") {
        return (
          <input
            type='number'
            value={v}
            ref={inpRef}
            name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
            className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum ${
              sEn.tabInpProg
            } ${medAntCase !== "" ? ` inp${medAntCase}` : ""}`}
            id={`tabInpRow${ctx}${nRow}_${nCol}`}
            min={nCol - 1 === tabProps.numCons ? "0.05" : "0"}
            max='65535'
            data-title={`Medidas Antropométricas ${fullName} (Consulta ${nCol - 1})`}
            data-row={nRow}
            data-col={nCol}
            required={nCol - 1 === tabProps.numCons ? true : false}
            onInput={ev => {
              tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
              setValue(ev.currentTarget.value);
            }}
          />
        );
      } else {
        return (
          <input
            type='number'
            value={v}
            ref={inpRef}
            name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
            className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum ${sEn.tabInpProg}`}
            id={`tabInpRow${ctx}${nRow}_${nCol}`}
            min={nCol - 1 === tabProps.numCons ? "0.05" : "0"}
            max='65535'
            data-title={`${ctx === "DCut" ? "Dobras Cutâneas" : "Sinais Vitais"} ${fullName} (Consulta ${nCol - 1})`}
            data-row={nRow}
            data-col={nCol}
            required={nCol - 1 === tabProps.numCons ? true : false}
            onInput={ev => {
              tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
              setValue(ev.currentTarget.value);
            }}
          />
        );
      }
    })()
  );
}
