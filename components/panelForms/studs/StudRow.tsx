import FormExcludeBtn from "../defs/FormExcludeBtn";
import { StudRowProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import AlterFieldList from "../../lists/AlterFieldList";

export default function StudRow({
  dispatch,
  tabRef,
  nRow,
  inDlg = false,
  userClass = "estudante",
  state = false,
  stud = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    area: "Não definido",
    day: "Não definido",
    interv: "Não definido",
    dre: "Não fornecido",
    cpf: "Não fornecido",
  },
}: StudRowProps) {
  nRow = typeof nRow === "string" ? parseInt(nRow) : nRow;
  if (!Number.isFinite(nRow)) nRow = 2;
  return (
    <tr id={`avStuds-row${nRow}`}>
      {userClass === "coordenador" && (
        <th scope="row" className="celCPFStud">
          <output
            className={`outputAvStud ouputAvStud${nRow - 1}`}
            id={`outpCPFStud-row${nRow}`}
            data-title={`cpf-stud-row${nRow}`}
          >
            {stud.cpf || "Não fornecido"}
          </output>
        </th>
      )}
      {userClass === "coordenador" && (
        <td className="celDREStud">
          <output
            className={`outputAvStud ouputAvStud${nRow - 1}`}
            id={`outpDREStud-row${nRow}`}
            data-title={`dre-stud-row${nRow}`}
          >
            {stud.dre || "Não fornecido"}
          </output>
        </td>
      )}
      <td className="celNameStud">
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpNameStud-row${nRow}`}
          data-title={`name-stud-row${nRow}`}
        >
          {stud.name || "Anônimo"}
        </output>
      </td>
      <td className="celEmailStud">
        <output
          className={`outputAvStud outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpEmailStud-row${nRow}`}
          data-title={`email-stud-row${nRow}`}
        >
          <address>
            <a
              href={`mailto:${stud.email || "null"}`}
              target="_blank"
              rel="nofollow"
              id={`emaila-stud-row${nRow}`}
            >
              {`${stud.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td className="celTelStud">
        <output
          className={`outputAv outputAvStud outputAvStud${nRow - 1}`}
          id={`outpTelStud-row${nRow}`}
          data-title={`email-stud-row${nRow}`}
        >
          {`${stud.tel || "Não fornecido"}`}
        </output>
      </td>
      <td className="celAreaStud">
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpAreaStud-row${nRow}`}
          data-title={`area-stud-row${nRow}`}
        >
          {`${stud.area || "Não definido"}`}
        </output>
      </td>
      <td className="celDayStud">
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpDayStud-row${nRow}`}
          data-title={`day-stud-row${nRow}`}
        >
          {`${stud.day || "Não definido"}`}
        </output>
      </td>
      <td className="celIntervStud">
        <output
          className={`outputAvStud outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpIntervStud-row${nRow}`}
          data-title={`interv-stud-row${nRow}`}
        >
          {`${stud.interv || "Não definido"}`}
        </output>
      </td>
      {!inDlg &&
        dispatch &&
        typeof state === "boolean" &&
        userClass === "coordenador" && (
          <>
            <td className="celAlterStud">
              <button
                type="button"
                id="btnAlterRegstStud"
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
              <FormExcludeBtn context="Stud" />
            </td>
          </>
        )}
      {inDlg && (
        <td className="alocCel">
          <button
            className="btnAlocStud btn btn-success widFull"
            id={`btnAlocStud-row${nRow}`}
          >
            <span role="textbox">Alocar</span>
          </button>
        </td>
      )}
    </tr>
  );
}
