import FormExcludeBtn from "../defs/FormExcludeBtn";
import { ProfRowProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import AlterFieldList from "../../lists/AlterFieldList";

export default function ProfRow({
  dispatch,
  tabRef,
  nRow,
  inDlg = false,
  userClass = "estudante",
  state = false,
  external = false,
  prof = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    area: "Não definido",
    day: "Não definido",
    interv: "Não definido",
    idf: "Não fornecido",
  },
}: ProfRowProps) {
  nRow = typeof nRow === "string" ? parseInt(nRow) : nRow;
  if (!Number.isFinite(nRow)) nRow = 2;
  return (
    <tr id={`avProfs-row${nRow}`}>
      {userClass === "coordenador" && (
        <th scope="row" className="celCPFProf">
          <output
            className={`outputAvProf outputAvProf${nRow - 1}`}
            id={`outpCPFProf-row${nRow}`}
            data-title={`cpf-prof-row${nRow}`}
          >
            {prof.idf || "Não fornecido"}
          </output>
        </th>
      )}
      <td className="celNameProf">
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpNameProf-row${nRow}`}
          data-title={`name-prof-row${nRow}`}
        >
          {prof.name || "Anônimo"}
        </output>
      </td>
      <td className="celExtProf">
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpExtProf-row${nRow}`}
          data-title={`ext-prof-row${nRow}`}
        >
          {external ? "Externo" : "Interno"}
        </output>
      </td>
      <td className="celEmailProf">
        <output
          className={`outputAvProf outputAvProf outputAvProf${nRow - 1}`}
          id={`outpEmailProf-row${nRow}`}
          data-title={`email-prof-row${nRow}`}
        >
          <address>
            <a
              href={`mailto:${prof.email || "null"}`}
              target="_blank"
              rel="nofollow"
              id={`emaila-prof-row${nRow}`}
            >
              {`${prof.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td className="celTelProf">
        <output
          className={`outputAv outputAvProf outputAvProf${nRow - 1}`}
          id={`outpTelProf-row${nRow}`}
          data-title={`email-prof-row${nRow}`}
        >
          {`${prof.tel || "Não fornecido"}`}
        </output>
      </td>
      <td className="celAreaProf">
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpAreaProf-row${nRow}`}
          data-title={`area-prof-row${nRow}`}
        >
          {`${prof.area || "Não definido"}`}
        </output>
      </td>
      <td className="celDayProf">
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpDayProf-row${nRow}`}
          data-title={`day-prof-row${nRow}`}
        >
          {`${prof.day || "Não definido"}`}
        </output>
      </td>
      <td className="celIntervProf">
        <output
          className={`outputAvProf outputAvProf outputAvProf${nRow - 1}`}
          id={`outpIntervProf-row${nRow}`}
          data-title={`interv-prof-row${nRow}`}
        >
          {`${prof.interv || "Não definido"}`}
        </output>
      </td>
      {!inDlg &&
        dispatch &&
        typeof state === "boolean" &&
        userClass === "coordenador" && (
          <>
            <td className="celAlterProf">
              <button
                type="button"
                id="btnAlterRegstProf"
                className="btn btn-info btnAffectRegst btnAlterRegst opaquelightEl"
                onClick={() => dispatch(!state)}
              >
                <small role="textbox" className="bolded fontLightWt">
                  Alterar
                </small>
              </button>
              {state && (
                <AlterFieldList
                  setDisplayRowData={dispatch}
                  tabRef={tabRef}
                  shouldDisplayRowData={state}
                />
              )}
            </td>
            <td>
              <FormExcludeBtn context="Prof" />
            </td>
          </>
        )}
      {inDlg && (
        <td className="alocCel">
          <button
            className="btnAlocProf btn btn-success widFull"
            id={`btnAlocProf-row${nRow}`}
          >
            <span role="textbox">Alocar</span>
          </button>
        </td>
      )}
    </tr>
  );
}
