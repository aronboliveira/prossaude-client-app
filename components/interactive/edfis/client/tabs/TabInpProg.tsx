"use client";
import { ENCtxProps, TargInps, TdProps } from "@/lib/global/declarations/interfaces";
import { handleCallbackWHS } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { handleIndEv } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { applyFieldConstraints, textTransformPascal } from "@/lib/global/gModel";
import { handleCondtReq, handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useRef, useContext } from "react";
import { NlMRef, nlFs, nlSel } from "@/lib/global/declarations/types";
import { MAX_SMALLINT, maxProps, tabProps } from "@/vars";
import { ENCtx } from "../ENForm";
import sEn from "@/styles//modules/enStyles.module.scss";
export default function TabInpProg({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  let gl: NlMRef<nlSel> = null,
    fspr: NlMRef<nlFs> = null,
    fct: NlMRef<nlSel> = null,
    targs: TargInps | null = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    trusted = useRef<boolean>(false),
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
    max = ((): number => {
      switch (lab.toLowerCase()) {
        case "peso":
          return maxProps.weight;
        case "altura":
          return maxProps.height;
        case "imc":
          return maxProps.perc;
        case "mlg":
          return maxProps.perc;
        case "pgc":
          return maxProps.perc;
        case "tmb":
          return maxProps.tmb;
        case "get":
          return maxProps.get;
        default:
          return MAX_SMALLINT;
      }
    })();
  if (ctx1?.refs) ({ gl, fspr, fct } = ctx1.refs);
  let medAntCase = "";
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
      name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
      id={`inp${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
      className={`form-control tabInpProg tabInpProgIndPerc inpInd inp${pascalLab} inpCol${nCol} sevenCharLongNum ${sEn.tabInpProg}`}
      maxLength={max.toString().length + 4}
      data-max={max.toString().length + 4}
      min='0'
      max={max}
      data-minnum='0'
      data-maxnum={max}
      data-title={`${lab} (Consulta ${nCol - 1})`}
      data-pattern='^[d,.]+$'
      data-row={nRow}
      data-col={nCol}
      required={nCol - 1 === tabProps.numCons ? true : false}
      onInput={ev => {
        try {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
          if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
          else
            handleCondtReq(ev.currentTarget, {
              minNum: 0,
              maxNum: 32767,
              min: 1,
              max: 99,
              pattern: ["^[\\d,.]+$", ""],
            });
          if (!(lab === "IMC" || lab === "MLG" || lab === "PGC" || lab === "TMB" || lab === "GET")) return;
          handleIndEv(lab, {
            el: ev.currentTarget,
            fsp: fspr?.current ?? document.getElementById("fsProgConsId"),
            gl: gl?.current ?? document.getElementById("gordCorpLvl"),
            fct: fct?.current ?? document.getElementById("formCalcTMBType"),
            refs: targs,
          });
        } catch (e) {
          return;
        }
      }}
    />
  ) : (
    ((): JSX.Element => {
      if (ctx === "MedAnt") {
        return (
          <input
            type='number'
            name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
            className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum ${
              sEn.tabInpProg
            } ${medAntCase !== "" ? ` inp${medAntCase}` : ""}`}
            id={`tabInpRow${ctx}${nRow}_${nCol}`}
            maxLength={max.toString().length + 4}
            data-max={max.toString().length + 4}
            min='0'
            max={max}
            data-minnum='0'
            data-maxnum={max}
            data-pattern='^[d,.]+$'
            data-title={`Medidas Antropométricas ${fullName} (Consulta ${nCol - 1})`}
            data-row={nRow}
            data-col={nCol}
            required={nCol - 1 === tabProps.numCons ? true : false}
            onInput={ev => {
              try {
                if (ev.isTrusted) trusted.current = true;
                if (!trusted.current) return;
                tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
                if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
                else
                  handleCondtReq(ev.currentTarget, {
                    minNum: 0,
                    maxNum: 32767,
                    min: 1,
                    max: 99,
                    pattern: ["^[\\d,.]+$", ""],
                  });
                handleCallbackWHS(ev.currentTarget);
              } catch (e) {
                return;
              }
            }}
          />
        );
      } else {
        return (
          <input
            type='number'
            name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
            className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum ${sEn.tabInpProg}`}
            id={`tabInpRow${ctx}${nRow}_${nCol}`}
            maxLength={max.toString().length + 4}
            data-max={max.toString().length + 4}
            min='0'
            max={max}
            data-minnum='0'
            data-maxnum={max}
            data-pattern='^[d,.]+$'
            data-title={`${ctx === "DCut" ? "Dobras Cutâneas" : "Sinais Vitais"} ${fullName} (Consulta ${nCol - 1})`}
            data-row={nRow}
            data-col={nCol}
            required={
              nCol - 1 === tabProps.numCons &&
              (lab === "Coxa" ||
                lab === "Peitoral" ||
                lab === "Abdominal" ||
                lab === "Soma" ||
                ((document.getElementById("tabSelectDCutId") instanceof HTMLSelectElement ||
                  document.getElementById("tabSelectDCutId") instanceof HTMLInputElement) &&
                  (document.getElementById("tabSelectDCutId") as HTMLSelectElement).value === "pollock7"))
                ? true
                : false
            }
            style={{ transition: "height .5s ease-in-out" }}
            onInput={ev => {
              try {
                if (ev.isTrusted) trusted.current = true;
                if (!trusted.current) return;
                tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
                if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
                else
                  handleCondtReq(ev.currentTarget, {
                    minNum: 0,
                    maxNum: 32767,
                    min: 1,
                    max: 99,
                    pattern: ["^[\\d,.]+$", ""],
                  });
                if (ev.currentTarget.classList.contains("tabInpProgDCut")) handleCallbackWHS(ev.currentTarget);
              } catch (e) {
                return;
              }
            }}
          />
        );
      }
    })()
  );
}
