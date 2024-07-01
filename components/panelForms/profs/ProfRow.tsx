import FormExcludeBtn from "../defs/FormExcludeBtn";
import { ProfRowProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import AlterFieldList from "../../lists/AlterFieldList";

export default function ProfRow({
  dispatch,
  tabRef,
  count,
  inDlg = false,
  userClass = "estudante",
  state = false,
  external = false,
  profInfo = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    area: "Não definido",
    day: "Não definido",
    interv: "Não definido",
    idf: "Não fornecido",
  },
}: ProfRowProps) {
  count = typeof count === "string" ? parseInt(count) : count;
  if (!Number.isFinite(count)) count = 2;
  return (
    <tr id={`avProfs-row${count}`}>
      {userClass === "coordenador" && (
        <th scope="row" className="celCPFProf">
          <output
            className={`outputAvProf outputAvProf${count - 1}`}
            id={`outpCPFProf-row${count}`}
            data-title={`cpf-prof-row${count}`}
          >
            {profInfo.idf || "Não fornecido"}
          </output>
        </th>
      )}
      <td className="celNameProf">
        <output
          className={`outputAvProf outputAvProf${count - 1}`}
          id={`outpNameProf-row${count}`}
          data-title={`name-prof-row${count}`}
        >
          {profInfo.name || "Anônimo"}
        </output>
      </td>
      <td className="celExtProf">
        <output
          className={`outputAvProf outputAvProf${count - 1}`}
          id={`outpExtProf-row${count}`}
          data-title={`ext-prof-row${count}`}
        >
          {external ? "Externo" : "Interno"}
        </output>
      </td>
      <td className="celEmailProf">
        <output
          className={`outputAvProf outputAvProf outputAvProf${count - 1}`}
          id={`outpEmailProf-row${count}`}
          data-title={`email-prof-row${count}`}
        >
          <address>
            <a
              href={`mailto:${profInfo.email || "null"}`}
              target="_blank"
              rel="nofollow"
              id={`emaila-prof-row${count}`}
            >
              {`${profInfo.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td className="celTelProf">
        <output
          className={`outputAv outputAvProf outputAvProf${count - 1}`}
          id={`outpTelProf-row${count}`}
          data-title={`email-prof-row${count}`}
        >
          {`${profInfo.tel || "Não fornecido"}`}
        </output>
      </td>
      <td className="celAreaProf">
        <output
          className={`outputAvProf outputAvProf${count - 1}`}
          id={`outpAreaProf-row${count}`}
          data-title={`area-prof-row${count}`}
        >
          {`${profInfo.area || "Não definido"}`}
        </output>
      </td>
      <td className="celDayProf">
        <output
          className={`outputAvProf outputAvProf${count - 1}`}
          id={`outpDayProf-row${count}`}
          data-title={`day-prof-row${count}`}
        >
          {`${profInfo.day || "Não definido"}`}
        </output>
      </td>
      <td className="celIntervProf">
        <output
          className={`outputAvProf outputAvProf outputAvProf${count - 1}`}
          id={`outpIntervProf-row${count}`}
          data-title={`interv-prof-row${count}`}
        >
          {`${profInfo.interv || "Não definido"}`}
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
            id={`btnAlocProf-row${count}`}
          >
            <span role="textbox">Alocar</span>
          </button>
        </td>
      )}
    </tr>
  );
}
