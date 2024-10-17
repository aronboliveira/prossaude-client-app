"use client";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { changeTabDCutLayout } from "@/lib/locals/edFisNutPage/edFisNutModel";
import { useContext, useEffect, useState } from "react";
import { ENCtx } from "./ENForm";
import { checkContext, limitedError } from "@/lib/global/gModel";
import { Protocol } from "@/lib/global/declarations/testVars";
import { FspCtx } from "./FsProgCons";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
import { NlMRef, nlSel, nlTab } from "@/lib/global/declarations/types";
export default function Protocolo(): JSX.Element {
  let txbr: NlMRef<nlSel> = null,
    td: NlMRef<nlTab> = null,
    prt: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    ctx2 = useContext<FspCtxProps>(FspCtx),
    [v, setValue] = useState<Protocol>("pollock3"),
    protocols: Protocol[] = ["pollock3", "pollock7"];
  if (ctx1?.refs) ({ txbr } = ctx1.refs);
  if (ctx2?.refs) ({ td, prt } = ctx2.refs);
  useEffect(() => {
    try {
      if (!(prt?.current instanceof HTMLSelectElement)) throw new Error(`Failed to validate reference for input`);
      prt.current.value = changeTabDCutLayout(
        prt.current,
        td?.current ?? document.getElementById("tabDCut"),
        txbr?.current ?? document.getElementById("textBodytype"),
      );
    } catch (e) {
      limitedError(
        `Error executing effect for ${Protocolo.prototype.constructor.name}:${(e as Error).message}`,
        Protocolo.prototype.constructor.name,
      );
    }
  }, [prt, td, txbr, v]);
  //TODO REMOVER APÓS TESTE
  checkContext(ctx1, "ENCtx", Protocolo);
  checkContext(ctx2, "FspCtx", Protocolo);
  return (
    <select
      ref={prt}
      value={v}
      className={`form-select selectTabProgCons consInp ${sEn.select} ${sEn.tabSelectDCutId}`}
      id='tabSelectDCutId'
      name='protocolo'
      data-title='Protocolo_DCut'
      data-xls='Protocolo de Dobras Cutâneas'
      required
      onChange={ev => setValue(ev.currentTarget.value as Protocol)}>
      {protocols.map(p => (
        <option
          key={p}
          value={p}
          className='opTabProgCons opProtoc'
          id={`opProtocJP${p.replace(/[^0-9]/g, "")}`}>{`Jackson/${p.charAt(0).toUpperCase()}${p
          .slice(1)
          .replace(/[0-9]/g, "")} ${p.slice(1).replace(/[^0-9]/g, "")}`}</option>
      ))}
    </select>
  );
}
