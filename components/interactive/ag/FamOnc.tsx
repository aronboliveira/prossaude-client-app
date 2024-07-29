import { handleDivAddShow } from "@/pages/ag";
"use client";


export default function FamOnc(): JSX.Element {
  return (
    <input
      type="checkbox"
      name="fam_onc"
      id="antFamOncId"
      className="cbFam"
      data-title="Antecedentes Familiares — Doença(s) Oncológica(s)"
      onClick={ev => handleDivAddShow(ev.currentTarget)}
    />
  );
}
