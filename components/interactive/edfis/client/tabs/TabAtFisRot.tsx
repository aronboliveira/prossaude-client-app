"use client";
import { PayloadCounterAction } from "@/lib/global/declarations/interfaces";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nlDiv } from "@/lib/global/declarations/types";
import { useEffect, useReducer, useRef } from "react";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { addRowAtivFis, removeRowAtivFis } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import s from "@/styles/locals/modules/sharedComponents.module.scss";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function TabAtFisRot({ children = <></> }: { children: JSX.Element }): JSX.Element {
  const mainRef = useRef<nlDiv>(null),
    flag = useRef<string>("+"),
    trusted = useRef<boolean>(false),
    [blockCount, setBlockCount] = useReducer((s: number, a: PayloadCounterAction) => {
      switch (a.type) {
        case "INCREMENT":
          s = (document.getElementById(`tbodyAtFisRot`) as HTMLTableElement)!.rows.length + 1;
          return s;
        case "DECREMENT":
          const nRows = (document.getElementById(`tbodyAtFisRot`) as HTMLTableElement)!.rows.length;
          if (nRows > 2) return nRows + 1;
          else return 2;
        default:
          return s;
      }
    }, 2);
  useEffect(() => {
    try {
      if (!trusted.current) return;
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(mainRef.current, `Main reference for AntMedFs`, extLine(new Error()));
      if (flag.current === "+") addRowAtivFis(blockCount, "Rot");
      else if (flag.current === "-") removeRowAtivFis(blockCount, "Rot");
      setTimeout(() => {
        if (!mainRef.current) return;
        syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      }, 500);
    } catch (e) {
      console.error(`Error executing useEffect for blockCount:\n${(e as Error).message}`);
    }
  }, [blockCount, trusted]);
  return (
    <div role='group' className={`divTab ${s.divTabEn} ${sEn.divDynamicTabs}`} ref={mainRef}>
      <legend className='legAtFis' id='tabLegAtFisRot'>
        Atividades Físicas Rotineiras
        <button
          type='button'
          name='addAtFisRotName'
          id='addAtFisRotId'
          className={`countAtFis countAtFisRot addAtFis addAtFisRot biBtn ${sEn.biBtn} ${sEn.countAtFis} ${sEn.addAtFis}`}
          defaultValue='addComorb'
          onClick={ev => {
            if (ev.isTrusted) trusted.current = true;
            flag.current = "+";
            setBlockCount({
              type: "INCREMENT",
              payload: ev.currentTarget.classList.toString(),
            });
          }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className={`bi bi-plus ${sEn.bi} ${sEn.biPlus}`}
            viewBox='0 0 16 16'>
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
          </svg>
        </button>
        <button
          type='button'
          name='removeAtFisRotName'
          id='removeAtFisRotId'
          className={`countAtFis countAtFisRot removeAtFis removeAtFisRot biBtn ${sEn.biBtn} ${sEn.countAtFis}`}
          defaultValue='removeComorb'
          onClick={ev => {
            if (ev.isTrusted) trusted.current = true;
            flag.current = "-";
            setBlockCount({
              type: "DECREMENT",
              payload: ev.currentTarget.classList.toString(),
            });
          }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className={`bi bi-dash ${sEn.bi} ${sEn.biDash}`}
            viewBox='0 0 16 16'>
            <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
          </svg>
        </button>
      </legend>
      <table
        className={`tabAtFis tabAtFisRot ${sEn.divDynamicTabs}`}
        id='tabAtFisRot'
        style={{ overflow: "auto" }}
        itemScope>
        <colgroup id='tabColGrpAtFisRot'>
          {Array.from({ length: 5 }, (_, i) => (
            <col key={`atFisRot_col__${i}`} className='tabColAtFis tabColAtFisRot' id={`tabColAtFisRot${i + 1}`}></col>
          ))}
        </colgroup>
        {children}
      </table>
    </div>
  );
}
