"use client";
import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells } from "@/lib/global/gStyleScript";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
  filterTabMembers,
  renderTable,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleFetch } from "@/lib/global/data-service";
import { nlTab, nlTabSect } from "@/lib/global/declarations/types";
import { panelRoots } from "@/vars";
import { useRef, useEffect, useContext, useMemo } from "react";
import GenericErrorComponent from "../error/GenericErrorComponent";
import Spinner from "../icons/Spinner";
import StudRow from "../panelForms/studs/StudRow";
import { StudInfo, StudListProps } from "@/lib/global/declarations/interfacesCons";
import { registerRoot, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { PanelCtx } from "../panelForms/defs/client/SelectLoader";
import Link from "next/link";
export default function StudList({ mainDlgRef, dispatch, state = true }: StudListProps): JSX.Element {
  const tabRef = useRef<nlTab>(null),
    tbodyRef = useRef<nlTabSect>(null),
    studs: StudInfo[] = useMemo(() => [], []),
    userClass = useContext(PanelCtx).userClass;
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
              if (panelRoots[tbodyRef.current.id] && !(panelRoots[tbodyRef.current.id] as any)["_internalRoot"]) {
                setTimeout(() => {
                  try {
                    if (!(tabRef.current instanceof HTMLElement))
                      throw elementNotFound(tabRef.current, `Validation of Table reference`, extLine(new Error()));
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(
                        tbodyRef.current,
                        `Validation of Table Body Reference`,
                        extLine(new Error()),
                      );
                    if (tbodyRef.current.querySelector("tr")) return;
                    panelRoots[tbodyRef.current.id]?.unmount();
                    delete panelRoots[tbodyRef.current.id];
                    tbodyRef.current.remove() as void;
                    panelRoots[tabRef.current.id] = registerRoot(
                      panelRoots[tabRef.current.id],
                      `#${tabRef.current.id}}`,
                      tabRef,
                      true,
                    );
                    panelRoots[tabRef.current.id]?.render(
                      <ErrorBoundary
                        FallbackComponent={() => (
                          <GenericErrorComponent message='Error reloading replacement for table body' />
                        )}>
                        <caption className='caption-t'>
                          <strong>
                            <small role='textbox' className='noInvert'>
                              <em className='noInvert'>
                                Lista Recuperada da Ficha de Estudantes registrados. Acesse
                                <samp>
                                  <Link
                                    href={`${location.origin}/panel?panel=regist-stud`}
                                    id='linkRegistStud'
                                    style={{ display: "inline" }}>
                                    &nbsp;Cadastrar Aluno&nbsp;
                                  </Link>
                                </samp>
                                para cadastrar
                              </em>
                            </small>
                          </strong>
                        </caption>
                        <colgroup>
                          {Array.from({ length: 7 }, (_, i) => (
                            <col key={`stud_col__${i}`} data-col={i + 1}></col>
                          ))}
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
                            {[
                              "Nome",
                              "E-mail",
                              "Telefone",
                              "Próximo Dia de Consulta",
                              "Período de Acompanhamento",
                              "",
                            ].map((l, i) => (
                              <th
                                scope='col'
                                key={`pac_th__${i}`}
                                data-row={1}
                                data-col={userClass === "coordenador" ? i + 3 : i + 1}>
                                {l}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody id='avStudsTbody' ref={tbodyRef}>
                          <span style={{ margin: "2rem", position: "absolute" }}>
                            <Spinner
                              key={crypto.randomUUID()}
                              spinnerClass='spinner-border'
                              spinnerColor='text-info'
                              message='Loading Students Table...'
                            />
                          </span>
                        </tbody>
                      </ErrorBoundary>,
                    );
                    tbodyRef.current = document.getElementById("avStudsTbody") as nlTabSect;
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(tbodyRef.current, `Validation of replaced tbody`, extLine(new Error()));
                    panelRoots[tbodyRef.current.id] = registerRoot(
                      panelRoots[tbodyRef.current.id],
                      `#${tbodyRef.current.id}}`,
                      tbodyRef,
                      true,
                    );
                    if (!tbodyRef.current.querySelector("tr"))
                      panelRoots[tbodyRef.current.id]?.render(
                        studs.map((stud, i) => (
                          <StudRow nRow={i + 2} stud={stud} tabRef={tabRef} key={`stud_row__${i + 2}`} inDlg={true} />
                        )),
                      );
                    setTimeout(() => {
                      if (tabRef?.current instanceof HTMLTableElement) {
                        equalizeTabCells(tabRef.current);
                        fillTabAttr(tabRef.current);
                      } else
                        elementNotFound(
                          tabRef.current,
                          `tabRef id ${(tabRef?.current as any)?.id || "UNIDENTIFIED"} in useEffect() for tableRef`,
                          extLine(new Error()),
                        );
                    }, 300);
                  } catch (e) {
                    console.error(
                      `Error executing scheduled rendering of Table Body Content Replacement:\n${(e as Error).message}`,
                    );
                  }
                }, 1000);
              } else
                panelRoots[tbodyRef.current.id] = registerRoot(
                  panelRoots[tbodyRef.current.id],
                  `#${tbodyRef.current.id}}`,
                  tbodyRef,
                  true,
                );
              if (!tbodyRef.current.querySelector("tr"))
                panelRoots[tbodyRef.current.id]?.render(
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
                } else
                  elementNotFound(
                    tabRef.current,
                    `tabRef id ${(tabRef?.current as any)?.id || "UNIDENTIFIED"} in useEffect() for tableRef`,
                    extLine(new Error()),
                  );
              }, 300);
              setTimeout(() => {
                if (!document.querySelector("tr") && document.querySelector("table")) renderTable();
              }, 5000);
            } catch (e) {
              console.error(`Error executing rendering of Table Body Content:\n${(e as Error).message}`);
            }
            const handleAttempt = (): void => {
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
                        userClass,
                      );
                    } catch (e) {
                      console.error(
                        `Error executing iteration ${i} for adding listener for alocation:\n${(e as Error).message}`,
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
                    document.getElementById("btnExport"),
                  );
                const typeConsSel = mainDlgRef.current?.querySelector("#typeConsSel");
                if (!(typeConsSel instanceof HTMLSelectElement))
                  throw inputNotFound(
                    typeConsSel,
                    `<select> for getting type of appointment for ${tabRef.current?.id || "UNIDENTIFIED"}`,
                    extLine(new Error()),
                  );
                const [selectedOp] = Array.from(typeConsSel.querySelectorAll("option"));
                if (!(selectedOp instanceof HTMLOptionElement))
                  throw elementNotFound(
                    selectedOp,
                    `<option> for getting type of appointment for ${tabRef.current?.id || "UNIDENTIFIED"}`,
                    extLine(new Error()),
                  );
                const relOptgrp = selectedOp.closest("optgroup");
                if (relOptgrp instanceof HTMLOptGroupElement && relOptgrp.label !== "")
                  filterTabMembers(tabRef.current, relOptgrp.label.toLowerCase().trim());
              } catch (e) {
                console.error(
                  `Error executing handleAttempt for filtering of Students Table:\n${(e as Error).message}`,
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
  }, [dispatch, state, mainDlgRef, userClass]);
  return (
    <table className='table table-striped table-responsive table-hover tabProfs' id='avStudsTab' ref={tabRef}>
      <caption className='caption-t'>
        <strong>
          <small role='textbox' className='noInvert'>
            <em className='noInvert'>
              Lista Recuperada da Ficha de Estudantes registrados. Acesse
              <samp>
                <Link
                  href={`${location.origin}/panel?panel=regist-stud`}
                  id='linkRegistStud'
                  style={{ display: "inline" }}>
                  &nbsp;Cadastrar Aluno&nbsp;
                </Link>
              </samp>
              para cadastrar
            </em>
          </small>
        </strong>
      </caption>
      <colgroup>
        {Array.from({ length: 7 }, (_, i) => (
          <col key={`stud_col__${i}`} data-col={i + 1}></col>
        ))}
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
          {["Nome", "E-mail", "Telefone", "Próximo Dia de Consulta", "Período de Acompanhamento", ""].map((l, i) => (
            <th scope='col' key={`pac_th__${i}`} data-row={1} data-col={userClass === "coordenador" ? i + 3 : i + 1}>
              {l}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id='avStudsTbody' ref={tbodyRef}>
        <span style={{ margin: "2rem", position: "absolute" }}>
          <Spinner
            key={crypto.randomUUID()}
            spinnerClass='spinner-border'
            spinnerColor='text-info'
            message='Loading Students Table...'
          />
        </span>
      </tbody>
    </table>
  );
}
