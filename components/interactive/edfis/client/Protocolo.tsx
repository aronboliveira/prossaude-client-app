"use client";
import { changeTabDCutLayout } from "@/lib/locals/edFisNutPage/edFisNutModel";
export default function Protocolo(): JSX.Element {
  return (
    <select
      className="form-select selectTabProgCons consInp"
      id="tabSelectDCutId"
      name="protocolo"
      data-title="Protocolo_DCut"
      required
      onChange={ev =>
        (ev.currentTarget.value = changeTabDCutLayout(
          ev.currentTarget,
          document.getElementById("tabDCut"),
          document.getElementById("textBodytype")
        ))
      }
    >
      <option
        value="pollock3"
        className="opTabProgCons opProtoc"
        id="opProtocJP3"
      >
        Jackson/Pollock 3
      </option>
      <option
        value="pollock7"
        className="opTabProgCons opProtoc"
        id="opProtocJP7"
      >
        Jackson/Pollock 7
      </option>
    </select>
  );
}
