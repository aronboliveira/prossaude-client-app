"use client";
import { switchAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { agProps, odProps, tabProps, timers } from "@/vars";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import s from "@/styles/locals/modules/sharedComponents.module.scss";
import { nlInp } from "@/lib/global/declarations/types";
export default function SwitchDiv({ autofill = false }: { autofill?: boolean }): JSX.Element {
  const router = useRouter(),
    isEdFis = /edfis/gi.test(router.pathname),
    fillRef = useRef<nlInp>(null),
    correctRef = useRef<nlInp>(null),
    spanStyle = { display: "flex", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
  useEffect(() => {
    if (!isEdFis) return;
    setTimeout(() => {
      try {
        const query = document.getElementById("autoFillBtn");
        tabProps.isAutoFillActive =
          fillRef.current?.checked ||
          (query instanceof HTMLInputElement && (query as HTMLInputElement).checked) ||
          tabProps.isAutoFillActive;
      } catch (e) {
        return;
      }
      try {
        const query = document.getElementById("deactAutocorrectBtnPac");
        tabProps.edIsAutoCorrectOn =
          correctRef.current?.checked ||
          (query instanceof HTMLInputElement && (query as HTMLInputElement).checked) ||
          tabProps.edIsAutoCorrectOn;
      } catch (e) {
        return;
      }
    }, timers.personENTimer * 0.75);
  }, [correctRef, isEdFis, fillRef]);
  return (
    <div role='group' className={`switchDiv flexQ900NoWC divTab ${isEdFis ? `${s.switchDivEn} ${s.divTabEn}` : ""}`}>
      {autofill && (
        <span role='group' className='form-switch spanLeft' id='autofillDiv' style={spanStyle}>
          <input
            ref={fillRef}
            type='checkbox'
            className={`deActBtn form-check-input ${isEdFis ? `${s.autoFillBtnEn}` : ""}`}
            role='switch'
            id={`autoFillBtn`}
            data-title='Cálculo automático'
            defaultChecked
            onChange={ev => {
              ev.currentTarget.checked ? (tabProps.isAutoFillActive = true) : (tabProps.isAutoFillActive = false);
              switchAutoFill(ev.currentTarget);
            }}
          />
          <strong className={s.calcText}>Cálculo Automático</strong>
        </span>
      )}
      <span role='group' className='form-switch spanRight' id='autocorrectDiv' style={spanStyle}>
        <input
          ref={correctRef}
          type='checkbox'
          className={`deActBtn form-check-input ${isEdFis ? `${s.deactAutocorrectBtnPacEn}` : ""}`}
          role='switch'
          id={`deactAutocorrectBtnPac`}
          data-title='Autocorreção'
          defaultChecked
          onClick={ev => {
            if (location.pathname.toLowerCase().includes("edfis"))
              ev.currentTarget.checked ? (tabProps.edIsAutoCorrectOn = true) : (tabProps.edIsAutoCorrectOn = false);
            else if (location.pathname.toLowerCase().includes("od"))
              ev.currentTarget.checked ? (odProps.odIsAutoCorrectOn = true) : (odProps.odIsAutoCorrectOn = false);
            else if (location.pathname.toLowerCase().includes("ag"))
              ev.currentTarget.checked ? (agProps.agIsAutoCorrectOn = true) : (agProps.agIsAutoCorrectOn = false);
          }}
        />
        <label htmlFor='deactAutocorrectBtnPac' style={{ display: "inline", marginLeft: "0.3rem" }}>
          <strong>Autocorreção</strong>
        </label>
      </span>
    </div>
  );
}
