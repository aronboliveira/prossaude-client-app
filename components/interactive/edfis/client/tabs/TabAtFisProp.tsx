"use client";
import { PayloadCounterAction } from "@/lib/global/declarations/interfaces";
import { nlFs } from "@/lib/global/declarations/types";
import { useEffect, useReducer, useRef } from "react";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { addRowAtivFis, removeRowAtivFis } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import s from "@/styles//modules/sharedComponents.module.scss";
import sEn from "@/styles//modules/enStyles.module.scss";
export default function TabAtFirsProp({ children = <></> }: { children: JSX.Element }): JSX.Element {
  const mainRef = useRef<nlFs>(null),
    flag = useRef<string>("+"),
    trusted = useRef<boolean>(false),
    [blockCount, setBlockCount] = useReducer((s: number, a: PayloadCounterAction) => {
      switch (a.type) {
        case "INCREMENT":
          s = (document.getElementById(`tbodyAtFisProp`) as HTMLTableElement)!.rows.length + 1;
          return s;
        case "DECREMENT":
          const nRows = (document.getElementById(`tbodyAtFisProp`) as HTMLTableElement)!.rows.length;
          if (nRows > 2) return nRows + 1;
          else return 2;
        default:
          return s;
      }
    }, 2);
  useEffect(() => {
    try {
      if (!trusted.current || !(mainRef.current instanceof HTMLElement)) return;
      if (flag.current === "+") addRowAtivFis(blockCount, "Prop");
      else if (flag.current === "-") removeRowAtivFis(blockCount, "Prop");
      setTimeout(() => {
        if (!mainRef.current) return;
        syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      }, 500);
    } catch (e) {
      return;
    }
  }, [blockCount, trusted]);
  return (
    <fieldset role='group' className={`divTab ${s.divTabEn} ${sEn.divDynamicTabs}`} ref={mainRef}>
      <legend className='legAtFis' id='tabLegAtFisProp'>
        Atividades Físicas Propostas
        <button
          type='button'
          name='addAtFisPropName'
          id='addAtFisPropId'
          className={`countAtFis countAtFisProp addAtFis addAtFisProp biBtn ${sEn.biBtn} ${sEn.countAtFis} ${sEn.addAtFis}`}
          defaultValue='addComorb'
          style={{ cursor: "cell" }}
          onClick={ev => {
            if (ev.isTrusted) trusted.current = true;
            if (!trusted.current) return;
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
          name='removeAtFisPropName'
          id='removeAtFisPropId'
          className={`countAtFis countAtFisProp removeAtFis removeAtFisProp biBtn ${sEn.biBtn} ${sEn.countAtFis}`}
          defaultValue='removeComorb'
          style={{ cursor: "vertical-text" }}
          onClick={ev => {
            if (ev.isTrusted) trusted.current = true;
            if (!trusted.current) return;
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
      <table className={`tabAtFis tabAtFisProp ${sEn.tabAtFisProp}`} id='tabAtFisProp' itemScope>
        <colgroup id='tabColGrpAtFisProp'>
          {Array.from({ length: 5 }, (_, i) => (
            <col
              key={`atFisProp_col__${i}`}
              className='tabColAtFis tabColAtFisProp'
              id={`tabColAtFisProp${i + 1}`}></col>
          ))}
        </colgroup>
        {children}
      </table>
    </fieldset>
  );
}
