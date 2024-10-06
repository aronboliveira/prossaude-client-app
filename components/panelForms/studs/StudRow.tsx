import { StudRowProps } from "@/lib/global/declarations/interfacesCons";
import { dateISOtoBRL } from "@/lib/global/gModel";
import { useContext, useState } from "react";
import AlterFieldList from "../../lists/AlterFieldList";
import FormExcludeBtn from "../defs/FormExcludeBtn";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function StudRow({
  tabRef,
  nRow,
  inDlg = false,
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
}: StudRowProps): JSX.Element {
  nRow = typeof nRow === "string" ? parseInt(nRow) : nRow;
  const [shouldShowAlterDlg, setAlterDlg] = useState<boolean>(false),
    userClass = useContext(PanelCtx).userClass;
  if (!Number.isFinite(nRow)) nRow = 2;
  return (
    <tr id={`avStuds-row${nRow}`} data-row={nRow}>
      {userClass === "coordenador" && (
        <th scope='row' className='celCPFStud' data-row={nRow} data-col='1'>
          <output
            className={`outputAvStud ouputAvStud${nRow - 1}`}
            id={`outpCPFStud-row${nRow}`}
            data-title={`cpf-stud-row${nRow}`}
            data-row={nRow}
            data-col='1'
            data-aloc='cpf-stud'>
            {stud.cpf || "Não fornecido"}
          </output>
        </th>
      )}
      {userClass === "coordenador" && (
        <td className='celDREStud' data-row={nRow} data-col='2'>
          <output
            className={`outputAvStud ouputAvStud${nRow - 1}`}
            id={`outpDREStud-row${nRow}`}
            data-title={`dre-stud-row${nRow}`}
            data-row={nRow}
            data-col='2'
            data-aloc='dre-stud'>
            {stud.dre || "Não fornecido"}
          </output>
        </td>
      )}
      <td className='celNameStud' data-row={nRow} data-col={userClass === "coordenador" ? "3" : "1"}>
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpNameStud-row${nRow}`}
          data-title={`name-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "3" : "1"}
          data-aloc='name-stud'>
          {stud.name || "Anônimo"}
        </output>
      </td>
      <td className='celEmailStud' data-row={nRow} data-col={userClass === "coordenador" ? "4" : "2"}>
        <output
          className={`outputAvStud outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpEmailStud-row${nRow}`}
          data-title={`email-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "4" : "2"}
          data-aloc='email-stud'>
          <address data-row={nRow} data-col={userClass === "coordenador" ? "4" : "2"}>
            <a
              href={`mailto:${stud.email || "null"}`}
              target='_blank'
              rel='nofollow'
              id={`emaila-stud-row${nRow}`}
              data-row={nRow}
              data-col={userClass === "coordenador" ? "4" : "2"}>
              {`${stud.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td className='celTelStud' data-row={nRow} data-col={userClass === "coordenador" ? "5" : "3"}>
        <output
          className={`outputAv outputAvStud outputAvStud${nRow - 1}`}
          id={`outpTelStud-row${nRow}`}
          data-title={`email-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "5" : "3"}
          data-aloc='tel-stud'>
          {`${stud.tel || "Não fornecido"}`}
        </output>
      </td>
      <td className='celAreaStud' data-row={nRow} data-col={userClass === "coordenador" ? "6" : "4"}>
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpAreaStud-row${nRow}`}
          data-title={`area-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "6" : "4"}
          data-aloc='area-stud'>
          {`${stud.area || "Não definido"}`}
        </output>
      </td>
      <td className='celDayStud' data-row={nRow} data-col={userClass === "coordenador" ? "7" : "5"}>
        <output
          className={`outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpDayStud-row${nRow}`}
          data-title={`day-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "7" : "5"}
          data-aloc='day-stud'>
          {`${stud.day || "Não definido"}`}
        </output>
      </td>
      <td className='celIntervStud' data-row={nRow} data-col={userClass === "coordenador" ? "8" : "6"}>
        <output
          className={`outputAvStud outputAvStud ouputAvStud${nRow - 1}`}
          id={`outpIntervStud-row${nRow}`}
          data-title={`interv-stud-row${nRow}`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? "8" : "6"}
          data-aloc='interv-stud'>
          {`${dateISOtoBRL(stud.start_day) || "Não definido"} — ${dateISOtoBRL(stud.end_day) || "Não definido"}`}
        </output>
      </td>
      {!inDlg && userClass === "coordenador" && (
        <>
          <td className='celAlterStud' data-row={nRow} data-col='9'>
            <button
              type='button'
              id='btnAlterRegstStud'
              className='btn btn-info btnAffectRegst btnAlterRegst opaquelightEl'
              onClick={() => setAlterDlg(!shouldShowAlterDlg)}
              data-row={nRow}
              data-col='9'>
              <small role='textbox' className='bolded fontLightWt' data-row={nRow} data-col='9'>
                Alterar
              </small>
            </button>
            {shouldShowAlterDlg && (
              <AlterFieldList dispatch={setAlterDlg} tabRef={tabRef} state={shouldShowAlterDlg} name={stud.name} />
            )}
          </td>
          <td data-row={nRow} data-col='10'>
            <FormExcludeBtn context='Stud' />
          </td>
        </>
      )}
      {inDlg && (
        <td className='alocCel' data-row={nRow} data-col={userClass === "coordenador" ? "9" : "7"}>
          <button
            className='btnAloc btnAlocStud btn btn-success widFull'
            id={`btnAlocStud-row${nRow}`}
            data-row={nRow}
            data-col={userClass === "coordenador" ? "9" : "7"}>
            <span role='textbox' data-row={nRow} data-col={userClass === "coordenador" ? "9" : "7"}>
              Alocar
            </span>
          </button>
        </td>
      )}
    </tr>
  );
}
