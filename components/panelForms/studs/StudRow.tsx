import FormExcludeBtn from "../defs/FormExcludeBtn";
import { StudRowProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import AlterFieldList from "../../lists/AlterFieldList";
import { dateISOtoBRL } from "@/lib/global/gModel";
import { useState } from "react";

export default function StudRow({
  tabRef,
  nRow,
  inDlg = false,
  userClass = "estudante",
  stud = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    area: "Não definido",
    day: "Não definido",
    start_day: "Não definido",
    end_day: "Não definido",
    dre: "Não fornecido",
    cpf: "Não fornecido",
  },
}: StudRowProps) {
  nRow = typeof nRow === "string" ? parseInt(nRow) : nRow;
  const [shouldShowAlterDlg, setAlterDlg] = useState<boolean>(false);
  if (!Number.isFinite(nRow)) nRow = 2;
  return (
    <tr id={`avStuds-row${nRow}`} data-row={nRow}>
      {userClass === "coordenador" && (
        <th scope="row" className="celCPFStud" data-row={nRow} data-col="1">
          <output
            className={`outputAvStud ouputAvStud${nRow - 1}`}
            id={`outpCPFStud-row${nRow}`}
            data-title={`cpf-stud-row${nRow}`}
            data-row={nRow}
            data-col="1"
          >
            {stud.cpf || "Não fornecido"}
          </output>
        </th>
      )}
      {userClass === "coordenador" && (
        <td className="celDREStud" data-row={nRow} data-col="2">
          <output
            className={`outputAvStud ouputAvStud${nRow - 1}`}
            id={`outpDREStud-row${nRow}`}
            data-title={`dre-stud-row${nRow}`}
            data-row={nRow}
            data-col="2"
          >
            {stud.dre || "Não fornecido"}
          </output>
        </td>
      )}
      <td
        className="celNameStud"
        data-row={nRow}
        data-col={userClass === "coordenador" ? "3" : "1"}
      >
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpNameStud-row${nRow}`}
          data-title={`name-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "3" : "1"}
        >
          {stud.name || "Anônimo"}
        </output>
      </td>
      <td
        className="celEmailStud"
        data-row={nRow}
        data-col={userClass === "coordenador" ? "4" : "2"}
      >
        <output
          className={`outputAvStud outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpEmailStud-row${nRow}`}
          data-title={`email-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "4" : "2"}
        >
          <address
            data-row={nRow}
            data-col={userClass === "coordenador" ? "4" : "2"}
          >
            <a
              href={`mailto:${stud.email || "null"}`}
              target="_blank"
              rel="nofollow"
              id={`emaila-stud-row${nRow}`}
              data-row={nRow}
              data-col={userClass === "coordenador" ? "4" : "2"}
            >
              {`${stud.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td
        className="celTelStud"
        data-row={nRow}
        data-col={userClass === "coordenador" ? "5" : "3"}
      >
        <output
          className={`outputAv outputAvStud outputAvStud${nRow - 1}`}
          id={`outpTelStud-row${nRow}`}
          data-title={`email-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "5" : "3"}
        >
          {`${stud.tel || "Não fornecido"}`}
        </output>
      </td>
      <td
        className="celAreaStud"
        data-row={nRow}
        data-col={userClass === "coordenador" ? "6" : "4"}
      >
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpAreaStud-row${nRow}`}
          data-title={`area-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "6" : "4"}
        >
          {`${stud.area || "Não definido"}`}
        </output>
      </td>
      <td
        className="celDayStud"
        data-row={nRow}
        data-col={userClass === "coordenador" ? "7" : "5"}
      >
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpDayStud-row${nRow}`}
          data-title={`day-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "7" : "5"}
        >
          {`${stud.day || "Não definido"}`}
        </output>
      </td>
      <td
        className="celIntervStud"
        data-row={nRow}
        data-col={userClass === "coordenador" ? "8" : "6"}
      >
        <output
          className={`outputAvStud outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpIntervStud-row${nRow}`}
          data-title={`interv-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "8" : "6"}
        >
          {`${dateISOtoBRL(stud.start_day) || "Não definido"} — ${
            dateISOtoBRL(stud.end_day) || "Não definido"
          }`}
        </output>
      </td>
      {!inDlg && userClass === "coordenador" && (
        <>
          <td className="celAlterStud" data-row={nRow} data-col="9">
            <button
              type="button"
              id="btnAlterRegstStud"
              className="btn btn-info btnAffectRegst btnAlterRegst opaquelightEl"
              onClick={() => setAlterDlg(!shouldShowAlterDlg)}
              data-row={nRow}
              data-col="9"
            >
              <small
                role="textbox"
                className="bolded fontLightWt"
                data-row={nRow}
                data-col="9"
              >
                Alterar
              </small>
            </button>
            {shouldShowAlterDlg && (
              <AlterFieldList
                setDisplayRowData={setAlterDlg}
                tabRef={tabRef}
                shouldDisplayRowData={shouldShowAlterDlg}
              />
            )}
          </td>
          <td data-row={nRow} data-col="10">
            <FormExcludeBtn context="Stud" />
          </td>
        </>
      )}
      {inDlg && (
        <td
          className="alocCel"
          data-row={nRow}
          data-col={userClass === "coordenador" ? "9" : "7"}
        >
          <button
            className="btnAlocStud btn btn-success widFull"
            id={`btnAlocStud-row${nRow}`}
            data-row={nRow}
            data-col={userClass === "coordenador" ? "9" : "7"}
          >
            <span
              role="textbox"
              data-row={nRow}
              data-col={userClass === "coordenador" ? "9" : "7"}
            >
              Alocar
            </span>
          </button>
        </td>
      )}
    </tr>
  );
}
