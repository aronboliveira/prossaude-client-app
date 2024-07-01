import FormExcludeBtn from "../defs/FormExcludeBtn";
import { StudRowProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import AlterFieldList from "../../lists/AlterFieldList";

export default function StudRow({
  dispatch,
  tabRef,
  count,
  inDlg = false,
  userClass = "estudante",
  state = false,
  studInfo = {
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
  count = typeof count === "string" ? parseInt(count) : count;
  if (!Number.isFinite(count)) count = 2;
  return (
    <tr id={`avStuds-row${count}`}>
      {userClass === "coordenador" && (
        <th scope="row" className="celCPFStud">
          <output
            className={`outputAvStud ouputAvStud${count - 1}`}
            id={`outpCPFStud-row${count}`}
            data-title={`cpf-stud-row${count}`}
          >
            {studInfo.cpf || "Não fornecido"}
          </output>
        </th>
      )}
      {userClass === "coordenador" && (
        <td className="celDREStud">
          <output
            className={`outputAvStud ouputAvStud${count - 1}`}
            id={`outpDREStud-row${count}`}
            data-title={`dre-stud-row${count}`}
          >
            {studInfo.dre || "Não fornecido"}
          </output>
        </td>
      )}
      <td className="celNameStud">
        <output
          className={`outputAvStud ouputAvStud${count - 1}`}
          id={`outpNameStud-row${count}`}
          data-title={`name-stud-row${count}`}
        >
          {studInfo.name || "Anônimo"}
        </output>
      </td>
      <td className="celEmailStud">
        <output
          className={`outputAvStud outputAvStud ouputAvStud${count - 1}`}
          id={`outpEmailStud-row${count}`}
          data-title={`email-stud-row${count}`}
        >
          <address>
            <a
              href={`mailto:${studInfo.email || "null"}`}
              target="_blank"
              rel="nofollow"
              id={`emaila-stud-row${count}`}
            >
              {`${studInfo.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td className="celTelStud">
        <output
          className={`outputAv outputAvStud outputAvStud${count - 1}`}
          id={`outpTelStud-row${count}`}
          data-title={`email-stud-row${count}`}
        >
          {`${studInfo.tel || "Não fornecido"}`}
        </output>
      </td>
      <td className="celAreaStud">
        <output
          className={`outputAvStud ouputAvStud${count - 1}`}
          id={`outpAreaStud-row${count}`}
          data-title={`area-stud-row${count}`}
        >
          {`${studInfo.area || "Não definido"}`}
        </output>
      </td>
      <td className="celDayStud">
        <output
          className={`outputAvStud ouputAvStud${count - 1}`}
          id={`outpDayStud-row${count}`}
          data-title={`day-stud-row${count}`}
        >
          {`${studInfo.day || "Não definido"}`}
        </output>
      </td>
      <td className="celIntervStud">
        <output
          className={`outputAvStud outputAvStud ouputAvStud${count - 1}`}
          id={`outpIntervStud-row${count}`}
          data-title={`interv-stud-row${count}`}
        >
          {`${studInfo.interv || "Não definido"}`}
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
            id={`btnAlocStud-row${count}`}
          >
            <span role="textbox">Alocar</span>
          </button>
        </td>
      )}
    </tr>
  );
}
