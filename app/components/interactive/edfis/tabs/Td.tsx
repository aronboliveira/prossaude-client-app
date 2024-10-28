import { TdProps } from "@/lib/global/declarations/interfaces";
import { compProp, parseNotNaN, textTransformPascal } from "@/lib/global/gModel";
import LockTabInd from "./LobTackInd";
import TabBtnDCut from "../client/tabs/TabBtnDCut";
import TabBtnInd from "../client/tabs/TabBtnInd";
import TabInpProg from "../client/tabs/TabInpProg";
import TabInpSvi from "../client/tabs/TabInpSvi";
import sEn from "@/styles//modules/enStyles.module.scss";
import { useRef, useEffect, useCallback } from "react";
import { nlFs, nlHtEl } from "@/lib/global/declarations/types";
import useMount from "@/lib/hooks/useMount";
export default function Td({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  const pascalLab = textTransformPascal(lab),
    td = useRef<HTMLTableCellElement | null>(null),
    lock = useRef<nlHtEl>(null),
    btn = useRef<nlHtEl>(null),
    field = useRef<nlFs | HTMLLabelElement | undefined>(null),
    mounted = useMount(),
    handleResize = useCallback(() => {
      try {
        td.current ??= document.getElementById(`tabCelRow${ctx}${nRow}_${nCol}`) as HTMLTableCellElement | null;
        if (!(td.current instanceof HTMLElement)) return;
        field.current ??= Array.from(td.current.children).find(
          c => c instanceof HTMLFieldSetElement || c instanceof HTMLLabelElement,
        ) as nlFs | HTMLLabelElement | undefined;
        if (ctx === "IndPerc" || (ctx === "DCut" && lab === "Soma")) btn.current ??= td.current.querySelector("button");
        if (ctx === "IndPerc") lock.current ??= td.current.querySelector(".lockEl");
        if (
          !(field.current instanceof HTMLElement) ||
          ((ctx === "IndPerc" || (ctx === "DCut" && lab === "Soma")) && !(btn.current instanceof HTMLElement)) ||
          (ctx === "IndPerc" && !(lock.current instanceof HTMLElement))
        )
          return;
        const tallest = Math.max(
          lock.current ? parseNotNaN(compProp(lock.current, "height")) : 0,
          btn.current ? parseNotNaN(compProp(btn.current, "height")) : 0,
          parseNotNaN(compProp(field.current, "height")),
        );
        if (!Number.isFinite(tallest) || tallest < 0) return;
        if (btn.current instanceof HTMLElement) {
          btn.current.style.margin = "0";
          btn.current.style.transform = "scale(1.01) translateY(0.5px)";
        }
        for (const e of [lock.current, btn.current, field.current, ...field.current.children])
          if (e instanceof HTMLElement) e.style.height = `${tallest}px`;
      } catch (e) {
        return;
      }
    }, [lock, btn, field]);
  useEffect(() => {
    if (!mounted) return;
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, [mounted]);
  return (
    <td
      ref={td}
      className={`tabCelProgCons tabCel${ctx} tabCelRow${ctx}${nRow}`}
      id={`tabCelRow${ctx}${nRow}_${nCol}`}
      data-row={nRow}
      data-col={nCol}>
      {ctx === "IndPerc" ? (
        <fieldset
          ref={field as any}
          role='group'
          className={`flexDiv flexDivTab flexAlItCt noInvert div${ctx} div${lab} ${sEn.flexDivEn} ${sEn.flexDivTab}`}>
          <label
            htmlFor={`inp${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
            id={`lab${pascalLab}${nCol - 1}Cel${nRow}_${nCol}`}
            className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} labInd lab${pascalLab} ${sEn.tabLabProgCons} ${sEn.formControl}`}
            data-row={nRow}
            data-col={nCol}>
            <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
            <p className={`${sEn.msrProgCons} ${sEn.indMsr}`}>
              {lab === "MLG" || lab === "PGC" ? "%" : lab === "TMB" || lab === "GET" ? "kcal" : "—"}
            </p>
          </label>
          <TabBtnInd nRow={nRow} nCol={nCol} lab={lab} />
          <LockTabInd addGroup={["lockTabInd"]} ctx={lab} />
        </fieldset>
      ) : (
        ((): JSX.Element => {
          if (ctx === "MedAnt")
            return (
              <label
                ref={field as any}
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} ${sEn.tabLabProgCons} ${sEn.formControl}`}
                data-row={nRow}
                data-col={nCol}>
                <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`${sEn.msrProgCons}`}>{/peso|weight/gi.test(lab) ? "kg" : "cm"}</p>
              </label>
            );
          else if (ctx === "DCut") {
            return (
              <label
                ref={field as any}
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} ${sEn.tabLabProgCons} ${sEn.formControl}`}
                data-row={nRow}
                data-col={nCol}>
                <TabInpProg nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`${sEn.msrProgCons}${lab === "Soma" ? ` ${sEn.sumMsr}` : ""}`}>mm</p>
                {lab === "Soma" ? <TabBtnDCut nCol={nCol}></TabBtnDCut> : <></>}
              </label>
            );
          } else {
            return (
              <label
                ref={field as any}
                htmlFor={`tabInpRow${ctx}${nRow}_${nCol}`}
                id={`labInpRow${ctx}${nRow}_${nCol}`}
                className={`form-control tabLabProgCons tabLabRow${ctx}${nRow} ${sEn.tabLabProgCons} ${sEn.formControl}`}
                data-row={nRow}
                data-col={nCol}>
                <TabInpSvi nRow={nRow} nCol={nCol} ctx={ctx} lab={lab} />
                <p className={`${sEn.msrProgCons}`}>mm</p>
              </label>
            );
          }
        })()
      )}
    </td>
  );
}
