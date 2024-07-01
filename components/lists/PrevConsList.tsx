import { nullishDlg, nullishTab } from "@/lib/global/declarations/types";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { PrevConsListProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import GenericErrorComponent from "../error/GenericErrorComponent";

export default function PrevConsList({
  setDisplayPrevList,
  shouldDisplayPrevList = true,
}: PrevConsListProps): JSX.Element {
  const prevConsDlgRef = useRef<nullishDlg>(null);
  const prevConsTabRef = useRef<nullishTab>(null);
  useEffect(() => {
    if (prevConsDlgRef.current instanceof HTMLDialogElement) {
      prevConsDlgRef.current.showModal();
      syncAriaStates([
        ...prevConsDlgRef.current!.querySelectorAll("*"),
        prevConsDlgRef.current,
      ]);
    } else
      elementNotFound(
        prevConsDlgRef.current,
        "Reference for Previous appointments list dialog",
        extLine(new Error())
      );
  }, [prevConsDlgRef]);
  const togglePrevConsDisplay = (shouldDisplayPrevList: boolean = true) => {
    setDisplayPrevList(!shouldDisplayPrevList);
  };
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Erro carregando modal" />
      )}
    >
      <dialog
        className="modal-content-stk2"
        ref={prevConsDlgRef}
        onClick={ev => {
          if (
            isClickOutside(ev, ev.currentTarget).some(coord => coord === true)
          ) {
            ev.currentTarget.close();
            setDisplayPrevList(!shouldDisplayPrevList);
          }
        }}
      >
        <ErrorBoundary
          FallbackComponent={() => (
            <ErrorFallbackDlg
              renderError={new Error(`Erro carregando a janela modal!`)}
              onClick={() => togglePrevConsDisplay(shouldDisplayPrevList)}
            />
          )}
        >
          <section className="flexRNoWBetCt widFull" id="headPrevConsList">
            <h2 className="mg-1b">
              <strong>Consultas Anteriores</strong>
            </h2>
            <button
              className="btn btn-close forceInvert"
              onClick={() => togglePrevConsDisplay(shouldDisplayPrevList)}
            ></button>
          </section>
          <section className="form-padded" id="sectPacsTab">
            <table
              className="table table-striped table-responsive table-hover tabPacs"
              id="avPacsTab"
              ref={prevConsTabRef}
            >
              <caption className="caption-t">
                <strong>
                  <small role="textbox">
                    <em className="noInvert">
                      Lista Recuperada da Ficha de Pacientes registrados. Acesse
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
                <col></col>
                <col></col>
                <col></col>
              </colgroup>
              <thead className="thead-dark">
                <tr id="avPacs-row1">
                  <th scope="col">Data</th>
                  <th scope="col">Tipo da Consulta</th>
                  <th scope="col">Profissional Responsável</th>
                  <th scope="col">Estudante Alocado</th>
                  <th scope="col">Anotações</th>
                </tr>
              </thead>
              <tbody>
                <tr id="prevCons-row2">
                  <td className="celDatePrevCons">
                    <output
                      className="outputPrevCons outputPrevConsPac1"
                      id="outpDatePrevCons-row2"
                      data-title="date-prevcons-row2"
                    >
                      01/01/2024
                    </output>
                  </td>
                  <td className="celTypePrevCons">
                    <output
                      className="outputPrevCons outputPrevConsPac1"
                      id="outpTypePrevCons-row2"
                      data-title="type-prevcons-row2"
                    >
                      Anamnese Geral
                    </output>
                  </td>
                  <td className="celProfPrevCons">
                    <output
                      className="outputPrevCons outputPrevConsPac1"
                      id="outpProfPrevCons-row2"
                      data-title="prof-prevcons-row2"
                    >
                      Ângela Celeste Barreto de Azevedo
                    </output>
                  </td>
                  <td className="celStudPrevCons">
                    <output
                      className="outputPrevCons outputPrevConsPac1"
                      id="outpStudPrevCons-row2"
                      data-title="stud-prevcons-row2"
                    >
                      Marina Celani Guedes
                    </output>
                  </td>
                  <td className="celNotesPrevCons">
                    <output
                      className="outputPrevCons outputPrevConsPac1"
                      id="outpNotesPrevCons-row2"
                      data-title="notes-prevcons-row2"
                    >
                      Fulaninho tem medo de agulha.
                    </output>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </ErrorBoundary>
      </dialog>
    </ErrorBoundary>
  );
}
