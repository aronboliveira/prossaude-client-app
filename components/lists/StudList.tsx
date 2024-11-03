"use client";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { equalizeTabCells } from "@/lib/global/gStyleScript";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
  filterTabMembers,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleFetch } from "@/lib/global/data-service";
import { nlTab, nlTabSect } from "@/lib/global/declarations/types";
import { panelRoots } from "@/vars";
import { useRef, useEffect, useContext, useMemo } from "react";
import GenericErrorComponent from "../error/GenericErrorComponent";
import Spinner from "../icons/Spinner";
import StudRow from "../panelForms/studs/StudRow";
import { StudInfo, StudListProps } from "@/lib/global/declarations/interfacesCons";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { PanelCtx } from "../panelForms/defs/client/SelectLoader";
export default function StudList({ mainDlgRef, dispatch, state = true }: StudListProps): JSX.Element {
  const tabRef = useRef<nlTab>(null),
    tbodyRef = useRef<nlTabSect>(null),
    studs: StudInfo[] = useMemo(() => [], []),
    userClass = useContext(PanelCtx).userClass;
  useEffect(() => {
    try {
      if (!(tbodyRef.current instanceof HTMLTableSectionElement)) return;
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
              if (!(tabRef.current instanceof HTMLElement)) return;
              if (!(tbodyRef.current instanceof HTMLElement)) return;
              if (
                panelRoots[`${tbodyRef.current.id}`] &&
                !(panelRoots[`${tbodyRef.current.id}`] as any)["_internalRoot"]
              ) {
                setTimeout(() => {
                  try {
                    if (!(tabRef.current instanceof HTMLElement)) return;
                    if (!(tbodyRef.current instanceof HTMLElement)) return;
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
                        )}>
                        <caption className='caption_t'>
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
                              data-col={userClass === "coordenador" ? "9" : "7"}></th>
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
                      </ErrorBoundary>,
                    );
                    tbodyRef.current = document.getElementById("avStudsTbody") as nlTabSect;
                    if (!(tbodyRef.current instanceof HTMLElement)) return;
                    if (!panelRoots[`${tbodyRef.current.id}`])
                      panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
                    if (!tbodyRef.current.querySelector("tr"))
                      panelRoots[`${tbodyRef.current.id}`]?.render(
                        studs.map((stud, i) => (
                          <StudRow nRow={i + 2} stud={stud} tabRef={tabRef} key={`stud_row__${i + 2}`} inDlg={true} />
                        )),
                      );
                    setTimeout(() => {
                      if (tabRef?.current instanceof HTMLTableElement) {
                        equalizeTabCells(tabRef.current);
                        fillTabAttr(tabRef.current);
                      }
                    }, 300);
                  } catch (e) {
                    return;
                  }
                }, 1000);
              } else panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
              if (!tbodyRef.current.querySelector("tr"))
                panelRoots[`${tbodyRef.current.id}`]?.render(
                  studs.map((stud, i) => {
                    return Array.from(tbodyRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (stud as StudInfo)["cpf"],
                    ) ||
                      Array.from(tbodyRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`),
                      ) ? (
                      <></>
                    ) : (
                      <StudRow nRow={i + 2} stud={stud} tabRef={tabRef} key={`stud_row__${i + 2}`} inDlg={true} />
                    );
                  }),
                );
              setTimeout(() => {
                if (tabRef?.current instanceof HTMLTableElement) {
                  equalizeTabCells(tabRef.current);
                  fillTabAttr(tabRef.current);
                }
              }, 300);
              setTimeout(() => {
                if (!document.querySelector("tr") && document.querySelector("table")) {
                  if (!panelRoots[`${document.querySelector("table")!.id}`])
                    panelRoots[`${document.querySelector("table")!.id}`] = createRoot(document.querySelector("table")!);
                  panelRoots[`${document.querySelector("table")!.id}`]?.render(
                    <GenericErrorComponent message='Failed to render table' />,
                  );
                }
              }, 5000);
            } catch (e) {
              return;
            }
            const handleAttempt = (): void => {
              try {
                if (!(tabRef.current instanceof HTMLElement)) return;
                dispatch &&
                  tabRef.current.querySelectorAll(".btnAloc").forEach(btn => {
                    try {
                      addListenerAlocation(
                        btn,
                        document.getElementById("avStudListDlg") ?? tabRef.current?.closest("dialog"),
                        mainDlgRef.current,
                        "Stud",
                        state,
                        dispatch,
                        userClass,
                      );
                    } catch (e) {
                      return;
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
                    document.getElementById("btnExport"),
                  );
                const typeConsSel = mainDlgRef.current?.querySelector("#typeConsSel");
                if (!(typeConsSel instanceof HTMLSelectElement)) return;
                const [selectedOp] = Array.from(typeConsSel.querySelectorAll("option"));
                if (!(selectedOp instanceof HTMLOptionElement)) return;
                const relOptgrp = selectedOp.closest("optgroup");
                if (relOptgrp instanceof HTMLOptGroupElement && relOptgrp.label !== "")
                  filterTabMembers(tabRef.current, relOptgrp.label.toLowerCase().trim());
              } catch (e) {
                return;
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
      return;
    }
  }, [dispatch, state, mainDlgRef, userClass]);
  return (
    <table className='table table-striped table-responsive table-hover tabProfs' id='avStudsTab' ref={tabRef}>
      <caption className='caption_t'>
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
