"use client";

import { nullishDlg, nullishTab } from "@/lib/global/declarations/types";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { HistoricDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import GenericErrorComponent from "../error/GenericErrorComponent";
import PrevConsRow from "./PrevConsRow";

export default function PrevConsList({
  dispatch,
  state = true,
  name = "Anônimo",
  historic = [
    {
      type: "avaliacao",
      day: "0000-00-00",
      prof: "Anônimo",
      stud: "Anônimo",
      notes: "",
    },
  ],
}: HistoricDlgProps): JSX.Element {
  const prevConsDlgRef = useRef<nullishDlg>(null);
  const prevConsTabRef = useRef<nullishTab>(null);
  //push em history
  useEffect(() => {
    history.pushState(
      {},
      "",
      `${location.origin}${location.pathname}${
        location.search
      }&prev-cons=open#${name.toLowerCase().replaceAll(" ", "-")}`
    );
    setTimeout(() => {
      history.pushState(
        {},
        "",
        `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")
      );
    }, 300);
    return () => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`
          .replaceAll(`&prev-cons=open`, "")
          .replaceAll(`#${name.toLowerCase().replaceAll(" ", "-")}`, "")
      );
      setTimeout(() => {
        history.pushState(
          {},
          "",
          `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")
        );
      }, 300);
    };
  }, []);
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
  const togglePrevConsDisplay = (state: boolean = true) => dispatch(!state);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Erro carregando modal" />
      )}
    >
      <dialog
        className="modal-content-stk2"
        ref={prevConsDlgRef}
        id={`prev-cons-${name.toLowerCase().replaceAll(" ", "-")}`}
        onClick={ev => {
          if (
            isClickOutside(ev, ev.currentTarget).some(coord => coord === true)
          ) {
            ev.currentTarget.close();
            dispatch(!state);
          }
        }}
      >
        <ErrorBoundary
          FallbackComponent={() => (
            <ErrorFallbackDlg
              renderError={new Error(`Erro carregando a janela modal!`)}
              onClick={() => togglePrevConsDisplay(state)}
            />
          )}
        >
          <section className="flexRNoWBetCt widFull" id="headPrevConsList">
            <h2 className="mg-1b">
              <strong>Consultas Anteriores</strong>
            </h2>
            <button
              className="btn btn-close forceInvert"
              onClick={() => togglePrevConsDisplay(state)}
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
                <col data-col={1}></col>
                <col data-col={2}></col>
                <col data-col={3}></col>
                <col data-col={4}></col>
                <col data-col={5}></col>
                <col data-col={6}></col>
              </colgroup>
              <thead className="thead-dark">
                <tr id="avPacs-row1" data-row={1}>
                  <th scope="col" data-row={1} data-col={1}>
                    Nome
                  </th>
                  <th scope="col" data-row={1} data-col={2}>
                    Data
                  </th>
                  <th scope="col" data-row={1} data-col={3}>
                    Tipo da Consulta
                  </th>
                  <th scope="col" data-row={1} data-col={4}>
                    Profissional Responsável
                  </th>
                  <th scope="col" data-row={1} data-col={5}>
                    Estudante Alocado
                  </th>
                  <th scope="col" data-row={1} data-col={6}>
                    Anotações
                  </th>
                </tr>
              </thead>
              <tbody>
                {historic.map((iHist, i) => (
                  <PrevConsRow
                    name={name}
                    nRow={i + 2}
                    historic={iHist}
                    key={`i-hist__${i + 2}`}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </ErrorBoundary>
      </dialog>
    </ErrorBoundary>
  );
}
