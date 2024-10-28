"use client";
import { ENCtxProps, FspCtxProps } from "@/lib/global/declarations/interfaces";
import { changeTabDCutLayout } from "@/lib/locals/edFisNutPage/edFisNutModel";
import { useContext, useEffect, useRef, useState } from "react";
import { ENCtx } from "./ENForm";
import { checkContext, compProp, parseNotNaN } from "@/lib/global/gModel";
import { Protocol } from "@/lib/global/declarations/testVars";
import { FspCtx } from "./FsProgCons";
import sEn from "@/styles//modules/enStyles.module.scss";
import { NlMRef, nlSel, nlTab } from "@/lib/global/declarations/types";
export default function Protocolo(): JSX.Element {
  let txbr: NlMRef<nlSel> = null,
    td: NlMRef<nlTab> = null,
    prt: NlMRef<nlSel> = null;
  const ctx1 = useContext<ENCtxProps>(ENCtx),
    ctx2 = useContext<FspCtxProps>(FspCtx),
    trusted = useRef<boolean>(false),
    [v, setValue] = useState<Protocol>("pollock3"),
    protocols: Protocol[] = ["pollock3", "pollock7"];
  if (ctx1?.refs) ({ txbr } = ctx1.refs);
  if (ctx2?.refs) ({ td, prt } = ctx2.refs);
  useEffect(() => {
    try {
      if (!trusted.current) return;
      if (!(prt?.current instanceof HTMLSelectElement)) throw new Error(`Failed to validate reference for input`);
      changeTabDCutLayout(
        prt.current,
        td?.current ?? document.getElementById("tabDCut"),
        txbr?.current ?? document.getElementById("textBodytype"),
      );
      if (!(td?.current instanceof HTMLElement)) return;
      const inps = Array.from(td.current.querySelectorAll(".tabInpProg"))
        .map(c => c.parentElement)
        .filter(c => c instanceof HTMLElement) as HTMLElement[];
      if (inps.length === 0) return;
      const grp = [...inps];
      const tallest = Math.max(...grp.map(c => (c instanceof HTMLElement ? parseNotNaN(compProp(c, "height")) : 0)));
      console.log(tallest);
      if (!Number.isFinite(tallest) || tallest < 0) return;
      grp.forEach(c => {
        if (c instanceof HTMLElement) {
          c.style.height = `${tallest}px`;
          for (const ch of c.children) {
            if (ch instanceof HTMLElement) ch.style.height = `${tallest}px`;
          }
        }
      });
    } catch (e) {
      return;
    }
  }, [prt, td, txbr, v, trusted]);
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
      onChange={ev => {
        if (ev.isTrusted) trusted.current = true;
        if (!trusted.current) return;
        setValue(ev.currentTarget.value as Protocol);
      }}>
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
