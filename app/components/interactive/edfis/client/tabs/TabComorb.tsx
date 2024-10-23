"use client";
import { CounterAction } from "@/lib/global/declarations/interfaces";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nlFs } from "@/lib/global/declarations/types";
import { switchRowComorb } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useReducer, useRef } from "react";
import useMount from "@/lib/hooks/useMount";
import { styled } from "styled-components";
import s from "@/styles//modules/sharedComponents.module.scss";
import sEn from "@/styles//modules/enStyles.module.scss";
const FsComorbLeg = styled.legend`
  margin-left: 0.3rem;
  + div {
    padding-left: 0;
  }
`;
export default function TabComorb({ children = <></> }: { children: JSX.Element }): JSX.Element {
  const mainRef = useRef<nlFs>(null),
    [mounted] = useMount(),
    [blockCount, setBlockCount] = useReducer((s: number, a: CounterAction) => {
      switch (a.type) {
        case "INCREMENT":
          return s + 1;
        case "DECREMENT":
          return s > 3 ? s - 1 : s;
        default:
          return s;
      }
    }, 3);
  useEffect(() => {
    try {
      if (mounted) {
        if (!(mainRef.current instanceof HTMLElement))
          throw elementNotFound(mainRef.current, `Main reference for AntMedFs`, extLine(new Error()));
        syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      }
    } catch (e) {
      console.error(`Error executing useEffect for blockCount:\n${(e as Error).message}`);
    }
  }, [blockCount, mounted]);
  return (
    <fieldset name='fsComorbName' id='fsComorbId' className={`fsMain divTab ${s.divTabEn}`} ref={mainRef}>
      <FsComorbLeg id='fsComorbLeg'>
        Comorbidades
        <button
          type='button'
          className={`${sEn.biBtn} ${sEn.countComorb} ${sEn.addComorb} biBtn noInvert`}
          id='addComorb'
          onClick={ev => {
            setBlockCount({ type: "INCREMENT" });
            switchRowComorb(ev.currentTarget, blockCount);
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
          className={`${sEn.biBtn} ${sEn.countComorb} biBtn noInvert`}
          id='removeComorb'
          onClick={ev => {
            setBlockCount({ type: "DECREMENT" });
            switchRowComorb(ev.currentTarget, blockCount);
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
      </FsComorbLeg>
      <div role='group' className={`noInvert divTab ${s.divTabEn} ${sEn.divDynamicTabs}`}>
        <table id='tabComorb'>
          <colgroup id='tabColGrpComorb'>
            {Array.from({ length: 3 }, (_, i) => (
              <col key={`col_comorb__${i}`} id={`tabColComorb${i + 1}`} className='tabColComorb'></col>
            ))}
          </colgroup>
          {children}
        </table>
      </div>
      <br role='presentation' />
    </fieldset>
  );
}
