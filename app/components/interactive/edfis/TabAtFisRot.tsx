"use client";
import { PayloadCounterAction } from "@/lib/global/declarations/interfaces";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nlDiv } from "@/lib/global/declarations/types";
import { useEffect, useReducer, useRef } from "react";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { addRowAtivFis, removeRowAtivFis } from "@/lib/locals/edFisNutPage/edFisNutHandler";
export default function TabAtFirsRot({ children = <></> }: { children: JSX.Element }): JSX.Element {
  const mainRef = useRef<nlDiv>(null);
  const [blockCount, setBlockCount] = useReducer<(s: number, a: PayloadCounterAction) => number>(
    (s: number, a: PayloadCounterAction) => {
      switch (a.type) {
        case "INCREMENT":
          return s + 1;
        case "DECREMENT":
          return s > 3 ? s - 1 : s;
        default:
          return s;
      }
    },
    3,
  );
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(mainRef.current, `Main reference for AntMedFs`, extLine(new Error()));
      syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
    } catch (e) {
      console.error(`Error executing useEffect for blockCount:\n${(e as Error).message}`);
    }
  }, [blockCount]);
  return (
    <div role='group' className='divTab' ref={mainRef}>
      <legend className='legAtFis' id='tabLegAtFisRot' itemProp='headerAtFisRot'>
        Atividades Físicas Rotineiras
        <button
          type='button'
          name='addAtFisRotName'
          id='addAtFisRotId'
          className='countAtFis countAtFisRot addAtFis addAtFisRot biBtn'
          defaultValue='addComorb'
          onClick={ev => {
            setBlockCount({
              type: "INCREMENT",
              payload: ev.currentTarget.classList.toString(),
            });
            addRowAtivFis(blockCount);
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
          name='removeAtFisRotName'
          id='removeAtFisRotId'
          className='countAtFis countAtFisRot removeAtFis removeAtFisRot biBtn'
          defaultValue='removeComorb'
          onClick={ev => {
            setBlockCount({
              type: "DECREMENT",
              payload: ev.currentTarget.classList.toString(),
            });
            removeRowAtivFis(blockCount);
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
      <table className='tabAtFis tabAtFisRot' id='tabAtFisRot' itemScope>
        <colgroup id='tabColGrpAtFisRot' itemProp='blockAtfisRot'>
          <col className='tabColAtFis tabColAtFisRot' id='tabColAtFisRot1' itemProp='colAtFisRot' />
          <col className='tabColAtFis tabColAtFisRot' id='tabColAtFisRot2' itemProp='colAtFisRot' />
          <col className='tabColAtFis tabColAtFisRot' id='tabColAtFisRot3' itemProp='colAtFisRot' />
          <col className='tabColAtFis tabColAtFisRot' id='tabColAtFisRot4' itemProp='colAtFisRot' />
          <col className='tabColAtFis tabColAtFisRot' id='tabColAtFisRot5' itemProp='colAtFisRot' />
        </colgroup>
        {children}
      </table>
    </div>
  );
}
