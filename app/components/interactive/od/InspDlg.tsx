"use client";
import { ErrorBoundary } from "react-error-boundary";
import { InspDlgProps } from "@/lib/global/declarations/interfaces";
import { addTextToObs } from "@/lib/locals/odPage/odHandler";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishDlg } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
export default function InspDlg({
  count,
  ctx,
  state,
  dispatch,
}: InspDlgProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  useEffect(() => {
    try {
      if (!(dlgRef.current instanceof HTMLDialogElement))
        throw elementNotFound(
          dlgRef.current,
          `Validation of Dialog Reference for ${ctx || "Undefined context"}`,
          extLine(new Error())
        );
      state ? dlgRef.current.show() : dlgRef.current.close();
    } catch (e) {
      console.error(
        `Error executing useEffect for InspDlg:\n${(e as Error).message}`
      );
    }
  }, [state, ctx]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Inspection Dialog" />
      )}
    >
      {state && (
        <dialog
          className="inspDialog modal-content"
          id={`inspDialog${count}`}
          draggable="true"
          ref={dlgRef}
        >
          <ol className="inspList" id={`inspList${count}`}>
            <span role="group" className="inspLITitle modal-title noInvert">
              <span>Considere observar:</span>
              <button
                className="btn btn-close"
                onClick={() => dispatch(!state)}
              ></button>
            </span>
            <div role="group" className="modal-body">
              {(ctx === "lab" ||
                ctx === "jug" ||
                ctx === "vest" ||
                ctx === "pltm" ||
                ctx === "of" ||
                ctx === "lg") && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_1`}>
                    Coloração
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_1`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {(ctx === "lab" ||
                ctx === "jug" ||
                ctx === "pltm" ||
                ctx === "lg") && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Textura
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {(ctx === "lab" || ctx === "jug") && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Grânulos de Fordyce
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "lab" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Presença de Glândulas Salivares Acessórias
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Fossetas
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "jug" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Papila do ducto da Parótida
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Linha alba
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_6`}>
                    Leucoedema
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_6`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_7`}>
                    Pigmentações
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_7`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "vest" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Bridas
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Freio labial
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "pltd" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_1`}>
                    Papila incisiva
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_1`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Rugosidade Palatina
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Rafe Mediana
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Tórus Palatino
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Glândulas Salivares
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_6`}>
                    Fóvea Palatina
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_6`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "pltm" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Movimentação
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Detalhes da Úvula
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "of" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Presença das Tonsilas
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Nódulos linfoides
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Pilares (Palatoglosso)
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Palatofaríngeo
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "lg" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Papilas filiformes
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Paplias fungiformes
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Paplias calciformes (circunvaladas)
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_6`}>
                    Fissuras
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_6`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_7`}>
                    Glossite migratória benigna
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_7`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_8`}>
                    Veias linguais
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_8`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_9`}>
                    Varizes linguais
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_9`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_10`}>
                    Fímbrias
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_10`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_11`}>
                    Papilas Foliadas
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_11`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "asb" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_1`}>
                    Carúncula
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_1`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Glândulas Submandibulares
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Glândulas Sublinguais
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Freio Lingual (implantação)
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Fímbrias
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_6`}>
                    Agregados Linfoides
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_6`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "mast" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_1`}>
                    Pterigoideo lateral
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_1`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Temporal
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Masseter
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
              {ctx === "peri" && (
                <>
                  <li className="inspLI form-control" id={`inspLI${count}_1`}>
                    Níveis de Inserção
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_1`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_2`}>
                    Presença de Inflamação
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_2`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_3`}>
                    Fístulas
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_3`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_4`}>
                    Abscessos
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_4`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_5`}>
                    Exostoses
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_5`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_6`}>
                    Tórus Mandibular
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_6`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                  <li className="inspLI form-control" id={`inspLI${count}_7`}>
                    Pigmentações
                    <button
                      type="button"
                      className="inspLIBtn btn btn-secondary"
                      id={`inspLIBtn${count}_7`}
                      onClick={addTextToObs}
                    >
                      Adicionar
                    </button>
                  </li>
                </>
              )}
            </div>
          </ol>
        </dialog>
      )}
    </ErrorBoundary>
  );
}
