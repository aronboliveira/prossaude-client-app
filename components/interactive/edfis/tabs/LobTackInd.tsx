import { nlInp, nlSpan, validTabLabs } from "@/lib/global/declarations/types";
import { timers } from "@/vars";
import { useEffect, useRef } from "react";
export default function LockTabInd({
  ctx,
  addGroup,
  isSpan,
}: {
  ctx: validTabLabs | "GordCorpLvl" | "formCalcTMB";
  addGroup?: string[];
  isSpan?: boolean;
}): JSX.Element {
  const r = useRef<nlSpan>(null),
    siblingInput = useRef<nlInp | HTMLSelectElement>(null),
    siblingButton = useRef<nlInp | HTMLButtonElement>(null);
  useEffect(() => {
    setTimeout(() => {
      try {
        if (!(r.current instanceof HTMLElement)) return;
        if (!(ctx === "IMC" || ctx === "MLG" || ctx === "PGC" || ctx === "TMB" || ctx === "GET")) return;
        const td = r.current.closest("td") || r.current.closest("th");
        if (!td) return;
        siblingInput.current ??= r.current?.closest("td")?.querySelector(".tabInpProg") as nlInp | HTMLSelectElement;
        siblingButton.current ??= td.querySelector(".tabBtnInd") as nlInp | HTMLButtonElement;
        const svg = r.current?.querySelector("svg"),
          sbi = siblingInput.current,
          sbb = siblingButton.current;
        if (!svg) return;
        if (svg.classList.contains("bi-lock")) {
          if (sbi instanceof HTMLInputElement) sbi.readOnly = true;
          else if (sbi instanceof HTMLSelectElement) sbi.disabled = true;
          if (sbb instanceof HTMLInputElement || sbb instanceof HTMLButtonElement) sbb.disabled = true;
        } else {
          if (sbi instanceof HTMLInputElement) sbi.readOnly = false;
          else if (sbi instanceof HTMLSelectElement) sbi.disabled = false;
          if (sbb instanceof HTMLInputElement || sbb instanceof HTMLButtonElement) sbb.disabled = false;
        }
      } catch (e) {
        return;
      }
    }, timers.personENTimer);
  }, [siblingInput, r]);
  return isSpan ? (
    <span
      ref={r}
      role='img'
      className={`noInvert lockEl lock_inpGet${addGroup ? addGroup.map(group => ` ${group}`).join("") : ""}`}
      id={`lock${ctx}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        className='bi bi-lock'
        viewBox='0 0 16 16'>
        <defs>
          <linearGradient id='gradiente-lock' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{
                stopColor: "rgb(233, 180, 7)",
              }}
            />
            <stop
              offset='100%'
              style={{
                stopColor: "rgb(243, 221, 93)",
              }}
            />
          </linearGradient>
        </defs>
        <path d='M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4' className='svg-lock-hook' />
        <path d='M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2' className='svg-lock-body' />
        <line x1='5' y1='7' x2='11' y2='7' stroke='black' />
      </svg>
    </span>
  ) : (
    <div style={{ border: "none", boxShadow: "none" }} role='group' className={`noInvert lockEl`} id={`div${ctx}`}>
      <span
        ref={r}
        role='img'
        style={{ border: "none", boxShadow: "none" }}
        className={`noInvert lock_inpGet${addGroup ? addGroup.map(group => ` ${group}`).join("") : ""}`}
        id={`lock${ctx}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className={`bi bi-lock`}
          viewBox='0 0 16 16'>
          <defs>
            <linearGradient id='gradiente-lock' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop
                offset='0%'
                style={{
                  stopColor: "rgb(233, 180, 7)",
                }}
              />
              <stop
                offset='100%'
                style={{
                  stopColor: "rgb(243, 221, 93)",
                }}
              />
            </linearGradient>
          </defs>
          <path d='M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4' className='svg-lock-hook' />
          <path
            d='M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2'
            className='svg-lock-body'
          />
          <line x1='5' y1='7' x2='11' y2='7' stroke='black' />
        </svg>
      </span>
    </div>
  );
}
