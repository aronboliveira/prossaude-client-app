"use client";
import { handleDivAddShow } from "@/lib/locals/aGPage/aGHandlers";
export default function FamDiab(): JSX.Element {
  return (
    <input
      type='checkbox'
      name='fam_diab'
      id='antFamDiabId'
      className='cbFam'
      data-title='Antecedentes Familiares — Diabetes'
      onClick={ev => handleDivAddShow(ev.currentTarget)}
    />
  );
}
