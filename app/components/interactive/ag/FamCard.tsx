"use client";
import { handleDivAddShow } from "@/pages/ag";
export default function FamCard(): JSX.Element {
  return (
    <input
      type="checkbox"
      name="fam_card"
      id="antFamCardId"
      className="cbFam"
      data-title="Antecedentes Familiares — Doença(s) Cardíaca(s)"
      onClick={ev => handleDivAddShow(ev.currentTarget)}
    />
  );
}