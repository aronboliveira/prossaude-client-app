"use client";
import { TdProps } from "@/lib/global/declarations/interfaces";
import { nlInp } from "@/lib/global/declarations/types";
import { handleCondtReq, handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState } from "react";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function TabInpSvi({ nRow, nCol, ctx, lab }: TdProps): JSX.Element {
  const fullName = ((): string => {
      switch (lab) {
        case "PA":
          return "Pressão Arterial";
        case "FC":
          return "Frequência Cardíaca";
        default:
          return lab;
      }
    })(),
    inpRef = useRef<nlInp>(null),
    [v, setValue] = useState<string>("");
  if (/prog/gi.test(lab)) lab = lab.replace(/prog/gi, "") as any;
  if (/prog/gi.test(ctx)) ctx = ctx.replace(/prog/gi, "") as any;
  useEffect(() => {
    if (!inpRef.current) return;
    if (inpRef.current.required) handleEventReq(inpRef.current);
    else {
      inpRef.current.type === "number"
        ? handleCondtReq(inpRef.current, {
            minNum: 0,
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
  }, [v, inpRef]);
  return (
    <input
      ref={inpRef}
      value={v}
      type='number'
      name={`${lab.toLowerCase()}_${nRow}_${nCol}`}
      className={`form-control tabInpProg tabInpProg${ctx} tabInpProg${lab}${ctx} tabInpRow${ctx}${nRow} float sevenCharLongNum ${sEn.tabInpProg}`}
      id={`tabInpRow${ctx}${nRow}_${nCol}`}
      min={"0"}
      max='65535'
      data-title={`${"Sinais Vitais"} ${fullName} (Consulta ${nCol - 1})`}
      data-row={nRow}
      data-col={nCol}
      required={nCol === 2 ? true : false}
      onInput={ev => setValue(ev.currentTarget.value)}
    />
  );
}
