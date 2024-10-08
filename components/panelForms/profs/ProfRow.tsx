import { ProfRowProps } from "@/lib/global/declarations/interfacesCons";
import { dateISOtoBRL } from "@/lib/global/gModel";
import { useContext, useState } from "react";
import AlterFieldList from "../../lists/AlterFieldList";
import FormExcludeBtn from "../defs/FormExcludeBtn";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function ProfRow({
  tabRef,
  nRow,
  inDlg = false,
  external = false,
  prof = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    area: "Não definido",
    day: "Não definido",
    start_day: "Não definido",
    end_day: "Não definido",
    idf: "Não fornecido",
    external: false,
  },
}: ProfRowProps): JSX.Element {
  nRow = typeof nRow === "string" ? parseInt(nRow) : nRow;
  const [shouldShowAlterDlg, setAlterDlg] = useState<boolean>(false),
    userClass = useContext(PanelCtx).userClass;
  if (!Number.isFinite(nRow)) nRow = 2;
  return (
    <tr id={`avProfs-row${nRow}`} data-row={nRow}>
      {userClass === "coordenador" && (
        <th scope='row' className='celCPFProf' data-row={nRow} data-col='1'>
          <output
            className={`outputAvProf outputAvProf${nRow - 1}`}
            id={`outpCPFProf-row${nRow}`}
            data-title={`Identificador ${nRow}`}
            data-aloc='cpf-prof'>
            {prof.idf || "Não fornecido"}
          </output>
        </th>
      )}
      <td className='celNameProf' data-row={nRow} data-col={userClass === "coordenador" ? "2" : "1"}>
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpNameProf-row${nRow}`}
          data-title={`Nome do Profissional ${nRow}`}
          data-aloc='name-prof'>
          {prof.name || "Anônimo"}
        </output>
      </td>
      {!inDlg && (
        <td className='celExtProf' data-row={nRow} data-col={userClass === "coordenador" ? "3" : "2"}>
          <output
            className={`outputAvProf outputAvProf${nRow - 1}`}
            id={`outpExtProf-row${nRow}`}
            data-title={`Externo ${nRow}`}
            data-row={nRow}
            data-col={userClass === "coordenador" ? "3" : "2"}
            data-aloc='external-prof'>
            {external ? "Externo" : "Interno"}
          </output>
        </td>
      )}
      <td
        className='celEmailProf'
        data-row={nRow}
        data-col={userClass === "coordenador" ? (inDlg ? "4" : "3") : inDlg ? "3" : "2"}>
        <output
          className={`outputAvProf outputAvProf outputAvProf${nRow - 1}`}
          id={`outpEmailProf-row${nRow}`}
          data-title={`Email ${nRow}`}
          data-aloc='email-prof'
          data-row={nRow}
          data-col={userClass === "coordenador" ? (inDlg ? "4" : "3") : inDlg ? "3" : "2"}>
          <address data-row={nRow} data-col={userClass === "coordenador" ? (inDlg ? "4" : "3") : inDlg ? "3" : "2"}>
            <a
              href={`mailto:${prof.email || "null"}`}
              target='_blank'
              rel='nofollow'
              id={`emaila-prof-row${nRow}`}
              data-row={nRow}
              data-col={userClass === "coordenador" ? (inDlg ? "4" : "3") : inDlg ? "3" : "2"}>
              {`${prof.email || "Não fornecido"}`}
            </a>
          </address>
        </output>
      </td>
      <td
        className='celTelProf'
        data-row={nRow}
        data-col={userClass === "coordenador" ? (inDlg ? "5" : "4") : inDlg ? "4" : "3"}>
        <output
          className={`outputAv outputAvProf outputAvProf${nRow - 1}`}
          id={`outpTelProf-row${nRow}`}
          data-title={`Telefone ${nRow}`}
          data-aloc='tel-prof'
          data-row={nRow}
          data-col={userClass === "coordenador" ? (inDlg ? "5" : "4") : inDlg ? "5" : "4"}>
          {`${prof.tel || "Não fornecido"}`}
        </output>
      </td>
      <td
        className='celAreaProf'
        data-row={nRow}
        data-col={userClass === "coordenador" ? (inDlg ? "6" : "5") : inDlg ? "5" : "4"}>
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpAreaProf-row${nRow}`}
          data-title={`Área de atuação${nRow}`}
          data-aloc='area-prof'
          data-row={nRow}
          data-col={userClass === "coordenador" ? (inDlg ? "6" : "5") : inDlg ? "5" : "4"}>
          {`${prof.area || "Não definido"}`}
        </output>
      </td>
      <td
        className='celDayProf'
        data-row={nRow}
        data-col={userClass === "coordenador" ? (inDlg ? "7" : "6") : inDlg ? "6" : "5"}>
        <output
          className={`outputAvProf outputAvProf${nRow - 1}`}
          id={`outpDayProf-row${nRow}`}
          data-title={`Dia de atividade${nRow}`}
          data-aloc='day-prof'
          data-row={nRow}
          data-col={userClass === "coordenador" ? (inDlg ? "7" : "6") : inDlg ? "6" : "5"}>
          {`${prof.day || "Não definido"}`}
        </output>
      </td>
      <td
        className='celIntervProf'
        data-row={nRow}
        data-col={userClass === "coordenador" ? (inDlg ? "8" : "7") : inDlg ? "7" : "6"}>
        <output
          className={`outputAvProf outputAvProf outputAvProf${nRow - 1}`}
          id={`outpIntervProf-row${nRow}`}
          data-title={`Intervalo de Atividade ${nRow}`}
          data-aloc='interv-prof'
          data-row={nRow}
          data-col={userClass === "coordenador" ? (inDlg ? "8" : "7") : inDlg ? "7" : "6"}>
          {`${dateISOtoBRL(prof.start_day) || "Não definido"} — ${dateISOtoBRL(prof.end_day) || "Não definido"}`}
        </output>
      </td>
      {!inDlg && userClass === "coordenador" && (
        <>
          <td className='celAlterProf' data-row={nRow} data-col='9'>
            <button
              type='button'
              id='btnAlterRegstProf'
              className='btn btn-info btnAffectRegst btnAlterRegst opaquelightEl'
              onClick={() => setAlterDlg(!shouldShowAlterDlg)}
              data-row={nRow}
              data-col='9'>
              <small role='textbox' className='bolded fontLightWt'>
                Alterar
              </small>
            </button>
            {shouldShowAlterDlg && (
              <AlterFieldList dispatch={setAlterDlg} tabRef={tabRef} state={shouldShowAlterDlg} name={prof.name} />
            )}
          </td>
          <td data-row={nRow} data-col='10'>
            <FormExcludeBtn context='Prof' />
          </td>
        </>
      )}
      {inDlg && (
        <td className='alocCel' data-row={nRow} data-col={userClass === "coordenador" ? "9" : "8"}>
          <button className='btnAloc btnAlocProf btn btn-success widFull' id={`btnAlocProf-row${nRow}`}>
            <span role='textbox'>Alocar</span>
          </button>
        </td>
      )}
    </tr>
  );
}
