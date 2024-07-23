"use client";

import { TdProps } from "@/lib/global/declarations/interfaces";
import { handleIndEv } from "../../TabIndPerc";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { textTransformPascal } from "@/lib/global/gModel";

export default function TabInpProg({
  nRow,
  nCol,
  ctx,
  lab,
}: TdProps): JSX.Element {
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
  return ctx === "IndPerc" ? (
    <input
      type="number"
      name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
      id={`inp${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
      className={`form-control tabInpProg tabInpProgIndPerc inpInd inpImc inpCol2 sevenCharLongNum`}
      min="0"
      data-title={`IMC (Consulta ${nCol - 1})`}
      required
      onInput={
        lab === "IMC" ||
        lab === "MLG" ||
        lab === "PGC" ||
        lab === "TMB" ||
        lab === "GET"
          ? ev => {
              handleIndEv(ev, lab);
              handleEventReq(ev.currentTarget);
            }
          : ev => {
              handleEventReq(ev.currentTarget);
            }
      }
    />
  ) : (
    <input
      type="number"
      name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
      className={`form-control tabInpProg tabInpProgSum${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum`}
      id={`tabInpRow${ctx}${nRow}_${nCol}`}
      min="0"
      max="65535"
      data-title={`Dobras Cutâneas ${fullName} (Consulta ${nCol - 1})`}
      data-row={nRow}
      data-col={nCol}
    />
  );
}
