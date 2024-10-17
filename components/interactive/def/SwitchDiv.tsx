"use client";
import { switchAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { agProps, odProps, tabProps } from "@/vars";
import { useRouter } from "next/router";
import s from "@/styles/locals/modules/sharedComponents.module.scss";
export default function SwitchDiv({ autofill = false }: { autofill?: boolean }): JSX.Element {
  const router = useRouter(),
    isEdFis = /edfis/gi.test(router.pathname);
  return (
    <div role='group' className={`switchDiv flexQ900NoWC divTab ${isEdFis ? `${s.switchDivEn} ${s.divTabEn}` : ""}`}>
      {autofill && (
        <span role='group' className='form-switch spanLeft' id='autofillDiv'>
          <input
            type='checkbox'
            className='deActBtn form-check-input'
            role='switch'
            id={`autoFillBtn ${isEdFis ? `${s.autoFillBtnEn}` : ""}`}
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
      <span role='group' className='form-switch spanRight' id='autocorrectDiv'>
        <input
          type='checkbox'
          className='deActBtn form-check-input'
          role='switch'
          id={`deactAutocorrectBtnPac ${isEdFis ? `${s.deactAutocorrectBtnPacEn}` : ""}`}
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
