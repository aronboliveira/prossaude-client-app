"use client";
import { handleDivAddShow } from "@/pages/ag";
export default function FamPulm(): JSX.Element {
  return (
    <input
      type="checkbox"
      name="fam_pulm"
      id="antFamPulmId"
      className="cbFam"
      data-title="Antecedentes Familiares — Doença(s) Pulmonar(es)"
      onClick={ev => handleDivAddShow(ev.currentTarget)}
    />
  );
}
