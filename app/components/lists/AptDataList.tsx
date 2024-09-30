import { AptDataListProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { addListenerExportBtn } from "@/lib/global/gController";
import { consVariablesData } from "../consRegst/consVariables";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nullishDlg } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
export default function AptDataList({
  setDisplayAptList,
  data,
  btnId,
  shouldDisplayAptList,
  userClass,
  isDirectRender = false,
}: AptDataListProps): JSX.Element {
  const transfArea = document.getElementById("transfArea")!;
  if (!transfArea) console.warn(`Transfer area was not found by AptDataList.`);
  const transferBtn = document.querySelector(`[id*="${btnId}"]`);
  const aptDlgRef = useRef<nullishDlg>(null);
  const renderDirectly = (): void => {
    try {
      shouldDisplayAptList = !shouldDisplayAptList;
      if (consVariablesData.rootDlg)
        !shouldDisplayAptList
          ? consVariablesData.rootDlg.unmount()
          : consVariablesData.rootDlg.render(
              <AptDataList
                setDisplayAptList={setDisplayAptList}
                shouldDisplayAptList={shouldDisplayAptList}
                data={data}
                btnId={btnId}
                userClass={userClass}
              />,
            );
    } catch (e) {
      console.warn(`Error rendering AptDataList:
      ${(e as Error).message};
      Initiating root recovering attempt.`);
      try {
        const fallbackRootDlg = document.getElementById("rootDlgList");
        if (!(fallbackRootDlg instanceof HTMLElement))
          throw elementNotFound(fallbackRootDlg, `attemp to recreate rootDlg`, extLine(new Error()));
        createRoot(fallbackRootDlg).unmount();
      } catch (e2) {
        console.error(`Error rendering AptDataList:
        ${(e2 as Error).message};
        Failed to salvage rootDlg.`);
      }
    }
  };
  useEffect(() => {
    if (aptDlgRef.current instanceof HTMLDialogElement) {
      aptDlgRef.current.showModal();
      aptDlgRef.current.addEventListener("click", function (this: HTMLDialogElement, click) {
        if (
          click.currentTarget &&
          isClickOutside(click, click.currentTarget as HTMLElement).some(coord => coord === true)
        ) {
          !isDirectRender ? setDisplayAptList(!shouldDisplayAptList) : renderDirectly();
        }
      });
      syncAriaStates([...aptDlgRef.current!.querySelectorAll("*"), aptDlgRef.current]);
      const btnExport = aptDlgRef.current.querySelector('[id*="btnExport"]');
      btnExport instanceof HTMLButtonElement
        ? addListenerExportBtn(
            `spreadsheet_${data.cpf}_${data.date}`,
            aptDlgRef.current,
            (aptDlgRef.current.querySelector(`[id*="outpNamePac"]`) as HTMLOutputElement) ??
              (aptDlgRef.current as HTMLElement),
          )
        : elementNotFound(btnExport, "Button for generating spreadsheet in appointment modal", extLine(new Error()));
      transferBtn instanceof HTMLButtonElement
        ? transferBtn.addEventListener("click", () => {
            //como isso ocorre na montagem na raíz, então não há inversão, só set
            setDisplayAptList(shouldDisplayAptList);
            shouldDisplayAptList ? aptDlgRef.current?.showModal() : aptDlgRef.current?.close();
          })
        : elementNotFound(transferBtn, "transferBtn for AptDataList", extLine(new Error()));
      const handleKeyDown = (press: KeyboardEvent): void => {
        if (press.key === "Escape") {
          !isDirectRender ? setDisplayAptList(!shouldDisplayAptList) : renderDirectly();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return (): void => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [aptDlgRef]);
  return !shouldDisplayAptList ? (
    <></>
  ) : (
    <div role='group' className='aptDiv'>
      {shouldDisplayAptList && (
        <dialog
          className='modal-content-stk2'
          id={`dlg-${btnId}`}
          ref={aptDlgRef}
          onClick={ev => {
            if (isClickOutside(ev, ev.currentTarget).some(coords => coords === true))
              setDisplayAptList(!shouldDisplayAptList);
          }}>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={() => {
                  !isDirectRender ? setDisplayAptList(!shouldDisplayAptList) : renderDirectly();
                }}
              />
            )}>
            <div role='group' className='flexRNoWBetCt cGap2v widQ460_120v' id='headRegstPac'>
              <h2 className='mg-1b'>
                <strong>Registro de Consulta</strong>
              </h2>
              <button
                className='btn btn-close forceInvert'
                onClick={() => {
                  !isDirectRender ? setDisplayAptList(!shouldDisplayAptList) : renderDirectly();
                }}></button>
            </div>
            <table className='table table-striped table-responsive table-hover tabApt'>
              <caption className='caption-t'>
                <strong>
                  <small role='textbox'>
                    <em className='noInvert'>
                      Lista Recuperada da Ficha de Consultas registradas. Acesse
                      <samp>
                        <a> ROTA_PLACEHOLDER </a>
                      </samp>
                      para cadastrar
                    </em>
                  </small>
                </strong>
              </caption>
              <colgroup>
                <col></col>
                <col></col>
              </colgroup>
              <thead className='thead-dark'>
                <tr id='avPacs-row1'>
                  <th scope='col'>Informação</th>
                  <th scope='col'>Valor</th>
                </tr>
              </thead>
              <tbody>
                {userClass === "coordenador" && (
                  <tr className='rowCPFPacCons'>
                    <th>
                      <output>
                        <strong>CPF do Paciente: </strong>
                      </output>
                    </th>
                    <td>
                      <output
                        id={`outpCPFPac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                        name={`CPFPac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                        data-title={`CPF Paciente ${data.name || "Anônimo"}-out`}>{`${
                        data.cpf || "000.000.000-00"
                      }`}</output>
                    </td>
                  </tr>
                )}
                <tr className='rowNamePacCons'>
                  <th>
                    <span role='textbox'>
                      <strong>Nome: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpNamePac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                      name={`namePac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Nome Paciente ${data.name || "Anônimo"}_${data.date || "0000-00-00"}-out`}>{`${
                      data.name || "Anônimo"
                    }`}</output>
                  </td>
                </tr>
                <tr className='rowTelPacCons'>
                  <th>
                    <span role='textbox'>
                      <strong>Telefone: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpTelPac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                      name={`namePac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Nome Paciente ${data.name || "Anônimo"}_${data.date || "0000-00-00"}-out`}>{`${
                      data.tel || "00 00 0000-0000"
                    }`}</output>
                  </td>
                </tr>
                <tr className='rowEmailPacCons'>
                  <th>
                    <span role='textbox'>
                      <strong>E-mail: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpEmailPac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                      name={`emailPac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Nome Paciente ${data.name || "Anônimo"}_${data.date || "0000-00-00"}-out`}>{`${
                      data.email || "Não preenchido"
                    }`}</output>
                  </td>
                </tr>
                <tr className='rowTypeCons'>
                  <th>
                    <span role='textbox'>
                      <strong>Tipo da Consulta: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpTypeConsPac${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                      name={`typeCons${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Tipo da Consulta Paciente ${data.name || "Anônimo"}_${
                        data.date || "0000-00-00"
                      }-out`}>{`${
                      data.typecons?.slice(0, 1).toUpperCase() + data.typecons?.slice(1, data.typecons.length) ||
                      "Indefinida"
                    }`}</output>
                  </td>
                </tr>
                <tr className='rowStudCons'>
                  <th>
                    <span role='textbox'>
                      <strong>Estudante Alocado: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpStudCons${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      name={`relStud${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Nome do Estudante Alocado Paciente ${data.name || "Anônimo"}_${
                        data.date || "0000-00-00"
                      }-out`}>{`${data.relstud || "Indefinido"}`}</output>
                  </td>
                </tr>
                <tr className='rowProfCons'>
                  <th>
                    <span role='textbox'>
                      <strong>Profissional Alocado: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpProfCons${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      name={`relProf${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                      data-title={`Nome do Profissional Alocado Paciente ${data.name || "Anônimo"}_${
                        data.date || "0000-00-00"
                      }-out`}>{`${data.relprof || "Indefinido"}`}</output>
                  </td>
                </tr>
                <tr className='rowNotes'>
                  <th>
                    <span role='textbox'>
                      <strong>Observações: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpNotesCons${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      name={`notes${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Notas Paciente ${data.name || "Anônimo"}_${data.date || "0000-00-00"}-out`}>{`${
                      data.notes || "Não preenchido"
                    }`}</output>
                  </td>
                </tr>
                <tr className='confirmCons'>
                  <th>
                    <span role='textbox'>
                      <strong>Confirmado: </strong>
                    </span>
                  </th>
                  <td>
                    <output
                      id={`outpConfirmCons${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      name={`confirm${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}-out`}
                      data-title={`Confirmação Paciente ${data.name || "Anônimo"}_${
                        data.date || "0000-00-00"
                      }-out`}>{`${data.confirm || "Não"}`}</output>
                  </td>
                </tr>
              </tbody>
            </table>
            <div role='group' className='flexWR flexAlItCt flexJSb widFull widQ460MinFull' id='divExportPac'>
              <button
                type='button'
                id={`btnExport${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}}`}
                name={`btnExport${data.cpf || "Unidentified"}_${data.date || "0000-00-00"}`}
                data-active='false'
                className='btn btn-info opaqueLightEl widFull'>
                <small role='textbox'>
                  <em>Gerar Planilha</em>
                </small>
              </button>
            </div>
          </ErrorBoundary>
        </dialog>
      )}
    </div>
  );
}
