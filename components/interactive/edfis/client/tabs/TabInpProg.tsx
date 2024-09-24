"use client";
import { TdProps } from "@/lib/global/declarations/interfaces";
import { handleCallbackWHS, tabProps } from "@/pages/edfis";
import { handleIndEv } from "../../TabIndPerc";
import { textTransformPascal } from "@/lib/global/gModel";
import { handleCondtReq, handleEventReq } from "@/lib/global/handlers/gHandlers";
export default function TabInpProg({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  const pascalLab = textTransformPascal(lab);
  const fullName = (() => {
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
  })();
  let medAntCase = "";
  if (ctx === "MedAnt") {
    medAntCase = (() => {
      switch (lab) {
        case "Peso":
          return "Weigth";
        case "Altura":
          return "Heigth";
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
      className={`form-control tabInpProg tabInpProgIndPerc inpInd inp${pascalLab} inpCol${nCol} sevenCharLongNum`}
      min={nCol === 2 ? "0.05" : "0"}
      data-title={`${lab} (Consulta ${nCol - 1})`}
      data-row={nRow}
      data-col={nCol}
      required={nCol === 2 ? true : false}
      onInput={
        lab === "IMC" || lab === "MLG" || lab === "PGC" || lab === "TMB" || lab === "GET"
          ? ev => {
              handleIndEv(ev, lab);
              if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
              else {
                ev.currentTarget.type === "number"
                  ? handleCondtReq(ev.currentTarget, {
                      minNum: 0.05,
                      maxNum: 999999,
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    })
                  : handleCondtReq(ev.currentTarget as HTMLInputElement, {
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    });
              }
            }
          : ev => {
              if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
              else {
                ev.currentTarget.type === "number"
                  ? handleCondtReq(ev.currentTarget, {
                      minNum: 0.05,
                      maxNum: 999999,
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    })
                  : handleCondtReq(ev.currentTarget as HTMLInputElement, {
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    });
              }
            }
      }
    />
  ) : (
    (() => {
      if (ctx === "MedAnt") {
        return (
          <input
            type='number'
            name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
            className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum ${
              medAntCase !== "" ? ` inp${medAntCase}` : ""
            }`}
            id={`tabInpRow${ctx}${nRow}_${nCol}`}
            min={nCol === 2 ? "0.05" : "0"}
            max='65535'
            data-title={`Medidas Antropométricas ${fullName} (Consulta ${nCol - 1})`}
            data-row={nRow}
            data-col={nCol}
            required={nCol === 2 ? true : false}
            onInput={ev => {
              if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
              else {
                ev.currentTarget.type === "number"
                  ? handleCondtReq(ev.currentTarget, {
                      minNum: 0.05,
                      maxNum: 999999,
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    })
                  : handleCondtReq(ev.currentTarget as HTMLInputElement, {
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    });
              }
              handleCallbackWHS(
                [
                  [
                    document.getElementById("gordCorpLvl"),
                    document.getElementById("formCalcTMBType"),
                    document.getElementById("nafType"),
                    [
                      tabProps.targInpWeigth,
                      tabProps.targInpHeigth,
                      tabProps.targInpIMC,
                      tabProps.targInpMLG,
                      tabProps.targInpTMB,
                      tabProps.targInpGET,
                      tabProps.targInpSumDCut,
                      tabProps.targInpPGC,
                    ],
                  ],
                  [
                    tabProps.numCol,
                    tabProps.factorAtvLvl,
                    tabProps.factorAtleta,
                    [tabProps.IMC, tabProps.MLG, tabProps.TMB, tabProps.GET, tabProps.PGC],
                  ],
                ],
                ev.currentTarget,
                tabProps.isAutoFillActive
              );
            }}
          />
        );
      } else {
        return (
          <input
            type='number'
            name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
            className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum`}
            id={`tabInpRow${ctx}${nRow}_${nCol}`}
            min={nCol === 2 ? "0.05" : "0"}
            max='65535'
            data-title={`${ctx === "DCut" ? "Dobras Cutâneas" : "Sinais Vitais"} ${fullName} (Consulta ${nCol - 1})`}
            data-row={nRow}
            data-col={nCol}
            required={nCol === 2 ? true : false}
            onInput={ev => {
              if (ev.currentTarget.required) handleEventReq(ev.currentTarget);
              else {
                ev.currentTarget.type === "number"
                  ? handleCondtReq(ev.currentTarget, {
                      minNum: 0.05,
                      maxNum: 999999,
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    })
                  : handleCondtReq(ev.currentTarget as HTMLInputElement, {
                      min: 1,
                      max: 99,
                      pattern: ["^[\\d,.]+$", ""],
                    });
              }
            }}
          />
        );
      }
    })()
  );
}
