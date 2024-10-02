"use client";
import { CounterAction } from "@/lib/global/declarations/interfaces";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishFs } from "@/lib/global/declarations/types";
import { switchRowComorb } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useReducer, useRef, useState } from "react";
export default function TabComorb({ children = <></> }: { children: JSX.Element }): JSX.Element {
  const mainRef = useRef<nullishFs>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [blockCount, setBlockCount] = useReducer((s: number, a: CounterAction) => {
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
  return !mounted ? (
    <></>
  ) : (
    <fieldset name='fsComorbName' id='fsComorbId' className='fsMain divTab' ref={mainRef}>
      <legend id='fsComorbLeg'>
        Comorbidades
        <button
          type='button'
          className='countComorb biBtn noInvert'
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
            className='bi bi-plus'
            viewBox='0 0 16 16'>
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
          </svg>
        </button>
        <button
          type='button'
          className='countComorb biBtn noInvert'
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
            className='bi bi-dash'
            viewBox='0 0 16 16'>
            <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
          </svg>
        </button>
      </legend>
      <div role='group' className='divTab noInvert'>
        <table id='tabComorb'>
          <colgroup id='tabColGrpComorb'>
            <col className='tabColComorb' id='tabColComorb1' />
            <col className='tabColComorb' id='tabColComorb2' />
            <col className='tabColComorb' id='tabColComorb3' />
          </colgroup>
          {children}
        </table>
      </div>
      <br role='presentation' />
    </fieldset>
  );
}
