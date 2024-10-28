"use client";
import { highlightChange } from "@/lib/global/gStyleScript";
import { nlInp, nlLab } from "@/lib/global/declarations/types";
import { applyFieldConstraints, parseNotNaN } from "@/lib/global/gModel";
import { switchNumConsTitles } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import { ENCtx } from "./ENForm";
import { PseudoNum } from "@/lib/global/declarations/testVars";
import { tabProps, timers } from "@/vars";
import sEn from "@/styles//modules/enStyles.module.scss";
import useMount from "@/lib/hooks/useMount";
export default function TrioReadNumCons(): JSX.Element {
  const mainRef = useRef<nlLab>(null),
    r = useRef<nlInp | HTMLSelectElement>(null),
    trusted = useRef<boolean>(false),
    { fspr } = useContext<ENCtxProps>(ENCtx).refs,
    [v, setValue] = useState<PseudoNum>("1"),
    switchCons = useCallback(() => {
      try {
        if (!(r.current instanceof HTMLInputElement || r.current instanceof HTMLSelectElement))
          throw new Error(`Failed to validate instance for Input of Trio of Appointments`);
        r.current.value !== "" &&
          Number.isFinite(parseNotNaN(r.current.value)) &&
          parseNotNaN(r.current.value) > 99 &&
          (r.current.value = "99");
        const fsProgCons = fspr?.current ?? document.getElementById("fsProgConsId");
        const numTotalTabsCons = fsProgCons?.querySelectorAll("table")?.length || 0;
        if (r.current instanceof HTMLInputElement && parseInt(r.current.value) <= 0 && r.current.value !== "") {
          r.current.value = "";
          const range = document.createRange();
          range.setStart(r.current, 0);
        }
        let numTotalTitledColsCons = fsProgCons?.querySelectorAll("col")?.length || 0;
        const numConsTextHeadCels = Array.from(document.querySelectorAll(".numConsTextHeadCel"));
        const tabsNum = fsProgCons?.querySelectorAll("table")?.length || 0;
        numTotalTitledColsCons = numTotalTitledColsCons - tabsNum;
        if (numConsTextHeadCels.length !== numTotalTitledColsCons) return;
        switchNumConsTitles(numConsTextHeadCels, r.current, numTotalTitledColsCons, numTotalTabsCons);
        numConsTextHeadCels.forEach(numConsCel => highlightChange(numConsCel, "rgba(250, 30, 0, 0.3)"));
      } catch (e) {
        return;
      }
    }, [v, r, fspr, trusted]),
    mounted = useMount();
  useEffect(() => {
    try {
      if (!trusted.current || !(mainRef.current instanceof HTMLElement)) return;
      syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
    } catch (e) {
      return;
    }
  }, [mainRef, trusted]);
  useEffect(switchCons, [switchCons, v]);
  useEffect(() => {
    try {
      setTimeout(() => {
        if (!mounted || !(r.current instanceof HTMLInputElement || r.current instanceof HTMLSelectElement)) return;
        setValue((r.current.value as PseudoNum) || 1);
      }, timers.personENTimer * 0.75);
    } catch (e) {
      return;
    }
  }, [mounted, setValue]);
  return (
    <label htmlFor='trioReadNumCons' id='labTrioReadNumCons' className={`min52_900 ${sEn.consLab}`} ref={mainRef}>
      Número inicial da Consulta em Leitura:
      <input
        ref={r as any}
        value={v}
        type='number'
        className={`form-control min52_900 noInvert consInp minText maxText minNum maxNum patternText ${sEn.trioReadNumCons}`}
        id='trioReadNumCons'
        name='trio_read_num_cons'
        min='1'
        max='255'
        data-title='Numero_Inicial_Consulta'
        data-reqlength='1'
        data-maxlength='5'
        data-minnum='1'
        data-maxnum='255'
        data-pattern='^\d+$'
        onInput={ev => {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          tabProps.edIsAutoCorrectOn && applyFieldConstraints(r.current);
          setValue(ev.currentTarget.value as PseudoNum);
        }}
      />
    </label>
  );
}
