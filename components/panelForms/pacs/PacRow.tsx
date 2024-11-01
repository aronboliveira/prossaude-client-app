"use client";
import { PacRowProps } from "@/lib/global/declarations/interfacesCons";
import { dateISOtoBRL } from "@/lib/global/gModel";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nlBtn } from "@/lib/global/declarations/types";
import { useState, useRef, useContext } from "react";
import AlterFieldList from "../../lists/AlterFieldList";
import FormExcludeBtn from "../defs/FormExcludeBtn";
import PrevConsList from "../../lists/PrevConsList";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function PacRow({
  tabRef,
  pac = {
    name: "Anônimo",
    email: "Não fornecido",
    tel: "Não fornecido",
    next_appointed_day: "Não definido",
    treatment_beg: "Não definido",
    treatment_end: "Não definido",
    current_status: "Não definido",
    idf: "Não fornecido",
    signature: new File([], "error"),
    historic: [
      {
        type: "Indefinido",
        day: "0000-00-00",
        prof: "Anônimo",
        stud: "Anônimo",
        notes: "",
      },
    ],
  },
  nRow = -1,
  shouldShowAlocBtn = false,
}: PacRowProps): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    btnPrevListRef = useRef<nlBtn>(null),
    alocBtnRef = useRef<nlBtn>(null),
    [shouldDisplayPrevList, setDisplayPrevList] = useState<boolean>(false),
    [shouldDisplayRowData, setDisplayRowData] = useState<boolean>(false),
    toggleDisplayRowData = (s: boolean = true): void => setDisplayRowData(!s),
    togglePacPrevList = (s: boolean = false): void => {
      btnPrevListRef.current instanceof HTMLButtonElement
        ? setDisplayPrevList(!s)
        : elementNotFound(
            btnPrevListRef.current,
            "<button> for toggling Pacient previous appointments in Pacient Table",
            extLine(new Error()),
          );
    };
  return (
    <tr
      id={`avPacs-row${nRow}`}
      data-row={nRow}
      data-key={`${pac.name.toLowerCase().replaceAll(" ", "_")}__${pac.tel.replaceAll(/[^0-9]/g, "_")}`}>
      {userClass === "coordenador" && (
        <th scope='row' className={`tagPhUnfilledTextPac`} data-row={nRow} data-col={1}>
          <output
            className={`tagPhAvPac tagPhAvPac${nRow} outpIdf`}
            id={`tagPhUnfilledTextPac-row${nRow}`}
            data-title={`UnfilledText Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
            data-aloc={`cpf-pac`}
            data-row={nRow}
            data-col={1}>
            {pac.idf || "Não identificado"}
          </output>
        </th>
      )}
      <td className={`cel${nRow}Pac`} data-row={nRow} data-col={userClass === "coordenador" ? 2 : 1}>
        <output
          className={`tagPhAvPac tagPhAvPac${nRow} outpName`}
          id={`outpUnfilledTextPac-row${nRow}`}
          data-title={`UnfilledText Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
          data-aloc={`UnfilledText-pac`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? 2 : 1}>
          {pac.name || "Anônimo"}
        </output>
      </td>
      <td className={`cel${nRow}Pac`} data-row={nRow} data-col={userClass === "coordenador" ? 3 : 2}>
        <output
          className={`tagPhAvPac tagPhAvPac${nRow} outpfEmail`}
          id={`outpUnfilledTextPac-row${nRow}`}
          data-title={`UnfilledText Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
          data-aloc={`email-pac`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? 3 : 2}>
          <address data-row={nRow} data-col={userClass === "coordenador" ? 3 : 2}>
            <a
              href={`mailto:${pac.email}`}
              target='_blank'
              rel='nofollow'
              id={`emaila-Pac-row${nRow}`}
              data-row={nRow}
              data-col={userClass === "coordenador" ? 3 : 2}>
              {pac.email || "Não fornecido"}
            </a>
          </address>
        </output>
      </td>
      <td className='celTelPac' data-row={nRow} data-col={userClass === "coordenador" ? 4 : 3}>
        <output
          className={`tagPhAvPac tagPhAvPac${nRow} outpTel`}
          id={`tagP4TelPac${nRow}`}
          data-title={`Telefone Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
          data-aloc={`UnfilledText-pac`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? 4 : 3}>
          {pac.tel || "Não fornecido"}
        </output>
      </td>
      <td className='celUnfilledTextPac' data-row={nRow} data-col={userClass === "coordenador" ? 5 : 4}>
        <output
          className={`tagPhAvPac tagPhAvPac${nRow} outpNextDay`}
          id={`tagP4UnfilledTextPac${nRow}`}
          data-title={`Próximo dia de atendimento de Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
          data-aloc={`UnfilledText-pac`}
          data-row={nRow}
          data-col={userClass === "coordenador" ? 5 : 4}>
          {pac.next_appointed_day || "Indefinido"}
        </output>
      </td>
      <td className='celIntervPac' data-row={nRow} data-col={userClass === "coordenador" ? 6 : 5}>
        <div
          role='group'
          className='flexAlItCt cGap1v noInvert'
          data-row={nRow}
          data-col={userClass === "coordenador" ? 6 : 5}>
          <output
            className={`tagPhAvPac tagPhAvPac${nRow} outpInterv`}
            id={`tagP4IntervPac${nRow}`}
            data-title={`Intervalo de Atendimento Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
            data-aloc={`UnfilledText-pac`}
            data-row={nRow}
            data-col={userClass === "coordenador" ? 6 : 5}>
            {`${dateISOtoBRL(pac.treatment_beg) || "Não definido"} — ${
              dateISOtoBRL(pac.treatment_end) || "Não definido"
            }`}
          </output>
        </div>
      </td>
      {userClass === "coordenador" && (
        <td className='celSignPac' data-row={nRow} data-col={userClass === "coordenador" ? 7 : 6}>
          <div
            role='group'
            className='flexAlItCt flexJC cGap1v noInvert'
            data-row={nRow}
            data-col={userClass === "coordenador" ? 7 : 6}>
            <output
              className={`tagPhAvPac tagPhAvPac${nRow} outpSign`}
              id={`tagP4AstPac${nRow}`}
              data-title={`Assinatura de Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
              data-aloc={`UnfilledText-pac`}
              data-row={nRow}
              data-col={userClass === "coordenador" ? 7 : 6}>
              <a className='astAnchor' id={`tagPhAstPac${nRow}`} href='../img/teste-exame-clinico.pdf' download>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-filetype-pdf'
                  viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z'
                  />
                </svg>
              </a>
            </output>
          </div>
        </td>
      )}
      <td data-row={nRow} data-col={userClass === "coordenador" ? 8 : 7}>
        <div
          role='group'
          className='flexAlItCt cGap1v noInvert'
          data-row={nRow}
          data-col={userClass === "coordenador" ? 8 : 7}>
          <output
            className={`outpPacStatus tagPhAvPac tagPhAvPac${nRow} outpStatus`}
            id={`tagP4Status${nRow}`}
            data-title={`Status de Paciente Linha ${nRow} (${pac.name || "Anônimo"})`}
            data-aloc={`status-pac`}
            data-row={nRow}
            data-col={userClass === "coordenador" ? 8 : 7}>
            {pac.current_status || "Indefinido"}
          </output>
        </div>
      </td>
      <td className='previousRegstPac' data-row={nRow} data-col={userClass === "coordenador" ? 9 : 8}>
        <button
          type='button'
          id={`btnPacPrevCons-row${nRow}`}
          className='btn btn-info flexJC flexAlItCt wsNoW opaquelightEl outpHist'
          data-row={nRow}
          data-col={userClass === "coordenador" ? 9 : 8}
          ref={btnPrevListRef}
          onClick={() => typeof shouldDisplayPrevList === "boolean" && togglePacPrevList(shouldDisplayPrevList)}>
          <small role='textbox' className='bolded'>
            Atendimentos Anteriores
          </small>
        </button>
        {shouldDisplayPrevList && (
          <PrevConsList
            dispatch={setDisplayPrevList}
            state={shouldDisplayPrevList}
            historic={pac.historic}
            name={pac.name}
          />
        )}
      </td>
      {userClass === "coordenador" && (
        <td className='celAlterProf' data-row={nRow} data-col={10}>
          <button
            type='button'
            id='btnAlterRegstStud'
            className='btn btn-info btnAffectRegst btnAlterRegst opaquelightEl widFull'
            data-row={nRow}
            data-col={10}
            onClick={() => toggleDisplayRowData(shouldDisplayRowData)}>
            <span role='textbox' className='bolded fontLightWt'>
              Alterar
            </span>
          </button>
          {shouldDisplayRowData && (
            <AlterFieldList dispatch={setDisplayRowData} tabRef={tabRef} state={shouldDisplayRowData} name={pac.name} />
          )}
        </td>
      )}
      {userClass === "coordenador" && (
        <td data-row={nRow} data-col={11}>
          <FormExcludeBtn context='Pac' />
        </td>
      )}
      {shouldShowAlocBtn && (
        <td className='alocCel' data-row={nRow} data-col={userClass === "coordenador" ? 12 : 9}>
          <div role='group' className='widFull flexAlItCt flexJC'>
            <button
              type='button'
              className='btnAloc btnAlocPac btn btn-success widFull flexJC flexAlItCt wsNoW opaquelightEl'
              id={`btnAlocPac${nRow}`}
              ref={alocBtnRef}>
              <span role='textbox'>Alocar</span>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
