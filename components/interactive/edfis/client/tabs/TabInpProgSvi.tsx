"use client";

import { TabInpProps } from "@/lib/global/declarations/interfaces";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";

export default function TabInpProgSvi(props: TabInpProps): JSX.Element {
  const fullName = (() => {
    switch (props.ctx) {
      case "PA":
        return "Pressão Arterial";
      case "FC":
        return "Frequência Cardíaca";
      default:
        return "";
    }
  })();
  return (
    <input
      type="number"
      min="0"
      max="65535"
      className={`form-control tabInpProg tabInpProgSVi tabInpRowProgSVi${props.nRow}`}
      id={`tabInpRowProgSVi${props.nRow}_${props.nCol}`}
      itemProp="celValueSvi"
      data-title={`${fullName || props.ctx} Consulta ${props.nCol - 1}`}
      data-row={props.nRow}
      data-col={props.nCol}
      required
      onInput={ev => handleEventReq(ev.currentTarget)}
    />
  );
}
