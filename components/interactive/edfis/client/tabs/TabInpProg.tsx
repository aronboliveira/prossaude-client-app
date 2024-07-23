"use client";

import { TdProps } from "@/lib/global/declarations/interfaces";

export default function TabInpProg({
  nRow,
  nCol,
  ctx,
  lab,
}: TdProps): JSX.Element {
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
  return (
    <input
      type="number"
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
