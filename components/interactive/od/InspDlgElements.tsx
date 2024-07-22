"use client";

import { looseNum } from "@/lib/global/declarations/types";
import {
  addTextToObs,
  showInspDialogs,
  showInspSpanSub,
} from "@/lib/locals/odPage/odHandler";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import { searchNextSiblings } from "@/lib/global/handlers/gHandlers";

export default function InspDlgElements({
  count,
  ctx,
  fullName,
}: {
  count: looseNum;
  ctx:
    | "lab"
    | "jug"
    | "vest"
    | "pltd"
    | "pltm"
    | "of"
    | "lg"
    | "asb"
    | "mast"
    | "peri";
  fullName: string;
}) {
  const [shouldShowDlg, setDlg] = useState<boolean>(false);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Inspection Elements" />
      )}
    >
      <fieldset className="fsSub fsInsp noInvert" id={`inspFs${count}`}>
        <legend className="legSub inspLeg" id={`inspLegSub${count}`}>
          {fullName}
        </legend>
        <div role="group" className="inspDiv" id={`inspDiv${count}`}>
          <span>Há alteração?</span>
          <span
            role="group"
            className="spanMain inspSpanMain"
            id={`inspSpanMain${count}`}
          >
            <input
              type="radio"
              name={`insp_${ctx}`}
              id={`inpYes${count}`}
              className="radOp radYes"
              data-title={`${fullName} (Sim)`}
              onClick={showInspSpanSub}
              onDoubleClick={ev => {
                const validSibling = searchNextSiblings(
                  ev.currentTarget,
                  "inspSpanSub"
                );
                !ev.currentTarget.checked &&
                  validSibling.setAttribute("hidden", "");
              }}
            />
            <label
              htmlFor={`inpYes${count}`}
              id={`labInpYes${count}`}
              className="labOp labInsp"
            >
              Sim
            </label>
            <input
              type="radio"
              name={`insp_${ctx}`}
              id={`inpNo${count}`}
              className="radOp radNo"
              data-title={`${fullName} (Não)`}
              onClick={showInspSpanSub}
            />
            <label
              htmlFor={`inpNo${count}`}
              id={`labInpNo${count}`}
              className="labOp labInsp"
            >
              Não
            </label>
            <br role="presentation" />
            <span
              role="group"
              className="spanSub inspSpanSub"
              id={`inspSpanSub${count}`}
            >
              <textarea
                className="form-control inspTa noInvert"
                id={`inspTa${count}`}
                placeholder={`Insira aqui as observações sobre ${fullName}`}
                data-title={`Observações: ${fullName}`}
              ></textarea>
              <button
                type="button"
                className="btn btn-secondary inspBtn inspBtnDialog"
                id={`inspDialogBtn${count}`}
                onClick={ev => setDlg(!showInspDialogs(ev, shouldShowDlg))}
              >
                Mostrar Sugestões
              </button>
              {shouldShowDlg && (
                <dialog
                  className="inspDialog modal-content"
                  id={`inspDialog${count}`}
                  draggable="true"
                >
                  <ol className="inspList" id={`inspList${count}`}>
                    <span
                      role="group"
                      className="inspLITitle modal-title noInvert"
                    >
                      Considere observar:
                    </span>
                    <div role="group" className="modal-body">
                      {(ctx === "lab" ||
                        ctx === "jug" ||
                        ctx === "vest" ||
                        ctx === "pltm" ||
                        ctx === "of" ||
                        ctx === "lg") && (
                        <>
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_1`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_6`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_7`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_1`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_6`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_6`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_7`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_8`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_9`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_10`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_11`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_1`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_6`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_1`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_1`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_2`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_3`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_4`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_5`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_6`}
                          >
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
                          <li
                            className="inspLI form-control"
                            id={`inspLI${count}_7`}
                          >
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
            </span>
          </span>
        </div>
      </fieldset>
    </ErrorBoundary>
  );
}
