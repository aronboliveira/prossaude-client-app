"use client";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells } from "@/lib/global/gStyleScript";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
  filterTabMembers,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleFetch } from "@/pages/api/ts/handlers";
import { nullishTab, nullishTabSect } from "@/lib/global/declarations/types";
import { panelRoots } from "../panelForms/defs/client/SelectPanel";
import { useRef, useEffect } from "react";
import GenericErrorComponent from "../error/GenericErrorComponent";
import Spinner from "../icons/Spinner";
import StudRow from "../panelForms/studs/StudRow";

import { StudInfo, StudListProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
export default function StudList({
  mainDlgRef,
  dispatch,
  state = true,
  userClass = "estudante",
}: StudListProps): JSX.Element {
  const tabRef = useRef<nullishTab>(null);
  const tbodyRef = useRef<nullishTabSect>(null);
  const studs: StudInfo[] = [];
  useEffect(() => {
    try {
      if (!(tbodyRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(tbodyRef.current, `Validation of Table Body instance`, extLine(new Error()));
      if (studs.length > 0 && tbodyRef.current.querySelector("tr")) return;
      setTimeout(() => {
        if (studs.length > 0) return;
        handleFetch("studs", "_table", true)
          .then(res => {
            res.forEach(stud => {
              !studs.includes(stud as StudInfo) &&
                studs.push({
                  name: stud.name,
                  tel: stud.tel,
                  email: stud.email,
                  area: (stud as StudInfo)["area"],
                  start_day: (stud as StudInfo)["start_day"],
                  end_day: (stud as StudInfo)["end_day"],
                  day: (stud as StudInfo)["day"],
                  cpf: (stud as StudInfo)["cpf"],
                  dre: (stud as StudInfo)["dre"],
                });
            });
            try {
              if (!(tabRef.current instanceof HTMLElement))
                throw elementNotFound(tabRef.current, `Validation of Table reference`, extLine(new Error()));
              if (!(tbodyRef.current instanceof HTMLElement))
                throw elementNotFound(tbodyRef.current, `Validation of Table Body Reference`, extLine(new Error()));
              if (
                panelRoots[`${tbodyRef.current.id}`] &&
                !(panelRoots[`${tbodyRef.current.id}`] as any)["_internalRoot"]
              ) {
                setTimeout(() => {
                  try {
                    if (!(tabRef.current instanceof HTMLElement))
                      throw elementNotFound(tabRef.current, `Validation of Table reference`, extLine(new Error()));
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(
                        tbodyRef.current,
                        `Validation of Table Body Reference`,
                        extLine(new Error())
                      );
                    if (tbodyRef.current.querySelector("tr")) return;
                    panelRoots[`${tbodyRef.current.id}`]?.unmount();
                    delete panelRoots[`${tbodyRef.current.id}`];
                    tbodyRef.current.remove() as void;
                    if (!panelRoots[`${tabRef.current.id}`])
                      panelRoots[`${tabRef.current.id}`] = createRoot(tabRef.current);
                    panelRoots[`${tabRef.current.id}`]?.render(
                      <ErrorBoundary
                        FallbackComponent={() => (
                          <GenericErrorComponent message='Error reloading replacement for table body' />
                        )}
                      >
                        <caption className='caption-t'>
                          <strong>
                            <small role='textbox' className='noInvert'>
                              <em className='noInvert'>
                                Lista Recuperada da Ficha de Estudantes registrados. Acesse
                                <samp>
                                  <a> ROTA_PLACEHOLDER </a>
                                </samp>{" "}
                                para cadastrar
                              </em>
                            </small>
                          </strong>
                        </caption>
                        <colgroup>
                          <col data-col='1'></col>
                          <col data-col='2'></col>
                          <col data-col='3'></col>
                          <col data-col='4'></col>
                          <col data-col='5'></col>
                          <col data-col='6'></col>
                          <col data-col='7'></col>
                          {userClass === "coordenador" && <col data-col='8'></col>}
                          {userClass === "coordenador" && <col data-col='9'></col>}
                        </colgroup>
                        <thead className='thead-dark'>
                          <tr id='avStuds-row1' data-row='1'>
                            {userClass === "coordenador" && (
                              <th scope='col' data-row='1' data-col='1'>
                                CPF
                              </th>
                            )}
                            {userClass === "coordenador" && (
                              <th scope='col' data-row='1' data-col='2'>
                                DRE
                              </th>
                            )}
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "3" : "1"}>
                              Nome
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "4" : "2"}>
                              E-mail
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "5" : "3"}>
                              Telefone
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "6" : "4"}>
                              Curso
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "7" : "5"}>
                              Dia De Atividade
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "8" : "6"}>
                              Período de Participação
                            </th>
                            <th
                              className='alocCel'
                              scope='col'
                              data-row='1'
                              data-col={userClass === "coordenador" ? "9" : "7"}
                            ></th>
                          </tr>
                        </thead>
                        <tbody id='avStudsTbody' ref={tbodyRef}>
                          <span style={{ margin: "2rem", position: "absolute" }}>
                            <Spinner
                              spinnerClass='spinner-border'
                              spinnerColor='text-info'
                              message='Loading Students Table...'
                            />
                          </span>
                        </tbody>
                      </ErrorBoundary>
                    );
                    tbodyRef.current = document.getElementById("avStudsTbody") as nullishTabSect;
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(tbodyRef.current, `Validation of replaced tbody`, extLine(new Error()));
                    if (!panelRoots[`${tbodyRef.current.id}`])
                      panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
                    if (!tbodyRef.current.querySelector("tr"))
                      panelRoots[`${tbodyRef.current.id}`]?.render(
                        studs.map((stud, i) => (
                          <StudRow
                            nRow={i + 2}
                            stud={stud}
                            userClass={userClass}
                            tabRef={tabRef}
                            key={`stud_row__${i + 2}`}
                            inDlg={true}
                          />
                        ))
                      );
                    setTimeout(() => {
                      if (tabRef?.current instanceof HTMLTableElement) {
                        equalizeTabCells(tabRef.current);
                        fillTabAttr(tabRef.current);
                      } else
                        elementNotFound(
                          tabRef.current,
                          `tabRef id ${(tabRef?.current as any)?.id || "UNIDENTIFIED"} in useEffect() for tableRef`,
                          extLine(new Error())
                        );
                    }, 300);
                  } catch (e) {
                    console.error(
                      `Error executing scheduled rendering of Table Body Content Replacement:\n${(e as Error).message}`
                    );
                  }
                  if (document) {
                  }
                }, 1000);
              } else panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
              if (!tbodyRef.current.querySelector("tr"))
                panelRoots[`${tbodyRef.current.id}`]?.render(
                  studs.map((stud, i) => {
                    return Array.from(tbodyRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (stud as StudInfo)["cpf"]
                    ) ||
                      Array.from(tbodyRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`)
                      ) ? (
                      <></>
                    ) : (
                      <StudRow
                        nRow={i + 2}
                        stud={stud}
                        userClass={userClass}
                        tabRef={tabRef}
                        key={`stud_row__${i + 2}`}
                        inDlg={true}
                      />
                    );
                  })
                );
              setTimeout(() => {
                if (tabRef?.current instanceof HTMLTableElement) {
                  equalizeTabCells(tabRef.current);
                  fillTabAttr(tabRef.current);
                } else
                  elementNotFound(
                    tabRef.current,
                    `tabRef id ${(tabRef?.current as any)?.id || "UNIDENTIFIED"} in useEffect() for tableRef`,
                    extLine(new Error())
                  );
              }, 300);
              setTimeout(() => {
                if (!document.querySelector("tr") && document.querySelector("table")) {
                  if (!panelRoots[`${document.querySelector("table")!.id}`])
                    panelRoots[`${document.querySelector("table")!.id}`] = createRoot(document.querySelector("table")!);
                  panelRoots[`${document.querySelector("table")!.id}`]?.render(
                    <GenericErrorComponent message='Failed to render table' />
                  );
                }
              }, 5000);
            } catch (e) {
              console.error(`Error executing rendering of Table Body Content:\n${(e as Error).message}`);
            }
            const handleAttempt = () => {
              try {
                if (!(tabRef.current instanceof HTMLElement))
                  throw elementNotFound(tabRef.current, `Validation of Students Table`, extLine(new Error()));
                dispatch &&
                  tabRef.current.querySelectorAll(".btnAloc").forEach((btn, i) => {
                    try {
                      addListenerAlocation(
                        btn,
                        document.getElementById("avStudListDlg") ?? tabRef.current?.closest("dialog"),
                        mainDlgRef.current,
                        "Stud",
                        state,
                        dispatch,
                        userClass
                      );
                    } catch (e) {
                      console.error(
                        `Error executing iteration ${i} for adding listener for alocation:\n${(e as Error).message}`
                      );
                    }
                  });
                equalizeTabCells(tabRef.current);
                checkLocalIntervs(tabRef.current);
                strikeEntries(tabRef.current);
                document.getElementById("btnExport") &&
                  handleClientPermissions(
                    userClass,
                    ["coordenador"],
                    tabRef.current,
                    document.getElementById("btnExport")
                  );
                const typeConsSel = mainDlgRef.current?.querySelector("#typeConsSel");
                if (!(typeConsSel instanceof HTMLSelectElement))
                  throw inputNotFound(
                    typeConsSel,
                    `<select> for getting type of appointment for ${tabRef.current?.id || "UNIDENTIFIED"}`,
                    extLine(new Error())
                  );
                const [selectedOp] = Array.from(typeConsSel.querySelectorAll("option"));
                if (!(selectedOp instanceof HTMLOptionElement))
                  throw elementNotFound(
                    selectedOp,
                    `<option> for getting type of appointment for ${tabRef.current?.id || "UNIDENTIFIED"}`,
                    extLine(new Error())
                  );
                const relOptgrp = selectedOp.closest("optgroup");
                if (relOptgrp instanceof HTMLOptGroupElement && relOptgrp.label !== "")
                  filterTabMembers(tabRef.current, relOptgrp.label.toLowerCase().trim());
              } catch (e) {
                console.error(
                  `Error executing handleAttempt for filtering of Students Table:\n${(e as Error).message}`
                );
              }
            };
            setTimeout(() => {
              !tbodyRef.current?.querySelector("tr") ? setTimeout(() => handleAttempt(), 1800) : handleAttempt();
            }, 1200);
          })
          .catch(e => console.error(`Failed to fetch from Studs Table: ${e.message}`))
          .finally(() => {
            setTimeout(() => syncAriaStates([...(tabRef.current?.querySelectorAll("*") ?? []), tabRef.current!]), 1200);
            setTimeout(() => syncAriaStates([...(tabRef.current?.querySelectorAll("*") ?? []), tabRef.current!]), 3000);
          });
      }, 300);
    } catch (e) {
      console.error(`Error executing useEffect for Table Body Reference:\n${(e as Error).message}`);
    }
  }, []);
  return (
    <table className='table table-striped table-responsive table-hover tabProfs' id='avStudsTab' ref={tabRef}>
      <caption className='caption-t'>
        <strong>
          <small role='textbox' className='noInvert'>
            <em className='noInvert'>
              Lista Recuperada da Ficha de Estudantes registrados. Acesse
              <samp>
                <a> ROTA_PLACEHOLDER </a>
              </samp>{" "}
              para cadastrar
            </em>
          </small>
        </strong>
      </caption>
      <colgroup>
        <col data-col='1'></col>
        <col data-col='2'></col>
        <col data-col='3'></col>
        <col data-col='4'></col>
        <col data-col='5'></col>
        <col data-col='6'></col>
        <col data-col='7'></col>
        {userClass === "coordenador" && <col data-col='8'></col>}
        {userClass === "coordenador" && <col data-col='9'></col>}
      </colgroup>
      <thead className='thead-dark'>
        <tr id='avStuds-row1' data-row='1'>
          {userClass === "coordenador" && (
            <th scope='col' data-row='1' data-col='1'>
              CPF
            </th>
          )}
          {userClass === "coordenador" && (
            <th scope='col' data-row='1' data-col='2'>
              DRE
            </th>
          )}
          <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "3" : "1"}>
            Nome
          </th>
          <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "4" : "2"}>
            E-mail
          </th>
          <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "5" : "3"}>
            Telefone
          </th>
          <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "6" : "4"}>
            Curso
          </th>
          <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "7" : "5"}>
            Dia De Atividade
          </th>
          <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "8" : "6"}>
            Período de Participação
          </th>
          <th className='alocCel' scope='col' data-row='1' data-col={userClass === "coordenador" ? "9" : "7"}></th>
        </tr>
      </thead>
      <tbody id='avStudsTbody' ref={tbodyRef}>
        <span style={{ margin: "2rem", position: "absolute" }}>
          <Spinner spinnerClass='spinner-border' spinnerColor='text-info' message='Loading Students Table...' />
        </span>
      </tbody>
    </table>
  );
}
