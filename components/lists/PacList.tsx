"use client";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells } from "@/lib/global/gStyleScript";
import { handleFetch } from "@/lib/locals/panelPage/handlers/handlers";
import { panelRoots } from "../panelForms/defs/client/SelectPanel";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import GenericErrorComponent from "../error/GenericErrorComponent";
import PacRow from "../panelForms/pacs/PacRow";
import Spinner from "../icons/Spinner";
import { nullishHtEl, nullishTab, nullishTabSect } from "@/lib/global/declarations/types";
import { PacInfo, PacListProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { addListenerAlocation, checkLocalIntervs, fillTabAttr } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
export default function PacList({
  shouldDisplayRowData,
  setDisplayRowData,
  dispatch,
  shouldShowAlocBtn = true,
  state = true,
  userClass = "estudante",
}: PacListProps): JSX.Element {
  const pacs: PacInfo[] = [];
  const tabPacRef = useRef<nullishTab>(null);
  const sectTabRef = useRef<nullishHtEl>(null);
  const tbodyRef = useRef<nullishTabSect>(null);
  useEffect(() => {
    try {
      if (!(tbodyRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(tbodyRef.current, `Validation of Table Body instance`, extLine(new Error()));
      if (pacs.length > 0 && tbodyRef.current.querySelector("tr")) return;
      setTimeout(() => {
        if (pacs.length > 0) return;
        handleFetch("patients", "_table", true)
          .then(res => {
            res.forEach(pac => {
              !pacs.includes(pac as PacInfo) &&
                pacs.push({
                  name: pac.name,
                  tel: pac.tel,
                  email: pac.email,
                  next_appointed_day: (pac as PacInfo)["next_appointed_day"],
                  treatment_beg: (pac as PacInfo)["treatment_beg"],
                  treatment_end: (pac as PacInfo)["treatment_end"],
                  current_status: (pac as PacInfo)["current_status"],
                  signature: (pac as PacInfo)["signature"],
                  historic: (pac as PacInfo)["historic"],
                  idf: (pac as PacInfo)["idf"],
                });
            });
            try {
              if (!(tabPacRef.current instanceof HTMLElement))
                throw elementNotFound(tabPacRef.current, `Validation of Table reference`, extLine(new Error()));
              if (!(tbodyRef.current instanceof HTMLElement))
                throw elementNotFound(tbodyRef.current, `Validation of Table Body Reference`, extLine(new Error()));
              if (
                panelRoots[`${tbodyRef.current.id}`] &&
                !(panelRoots[`${tbodyRef.current.id}`] as any)["_internalRoot"]
              ) {
                setTimeout(() => {
                  try {
                    if (!(tabPacRef.current instanceof HTMLElement))
                      throw elementNotFound(tabPacRef.current, `Validation of Table reference`, extLine(new Error()));
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(
                        tbodyRef.current,
                        `Validation of Table Body Reference`,
                        extLine(new Error()),
                      );
                    if (tbodyRef.current.querySelector("tr")) return;
                    panelRoots[`${tbodyRef.current.id}`]?.unmount();
                    delete panelRoots[`${tbodyRef.current.id}`];
                    tbodyRef.current.remove() as void;
                    if (!panelRoots[`${tabPacRef.current.id}`])
                      panelRoots[`${tabPacRef.current.id}`] = createRoot(tabPacRef.current);
                    panelRoots[`${tabPacRef.current.id}`]?.render(
                      <ErrorBoundary
                        FallbackComponent={() => (
                          <GenericErrorComponent message='Error reloading replacement for table body' />
                        )}>
                        <caption className='caption-t'>
                          <strong>
                            <small role='textbox' className='noInvert'>
                              <em className='noInvert'>
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
                          <col data-col={7}></col>
                          <col data-col={8}></col>
                          {userClass === "coordenador" && <col data-col={9}></col>}
                          {userClass === "coordenador" && <col data-col={10}></col>}
                          {userClass === "coordenador" && <col data-col={11}></col>}
                          {shouldShowAlocBtn && <col data-col={12}></col>}
                        </colgroup>
                        <thead className='thead-dark'>
                          <tr id={`avPacs-rowUnfilled0`} data-row={1}>
                            {userClass === "coordenador" && (
                              <th scope='col' data-row={1} data-col={1}>
                                CPF
                              </th>
                            )}
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 2 : 1}>
                              Nome
                            </th>
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 3 : 2}>
                              E-mail
                            </th>
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 4 : 3}>
                              Telefone
                            </th>
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 5 : 4}>
                              Próximo Dia de Consulta
                            </th>
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 6 : 5}>
                              Período de Acompanhamento
                            </th>
                            {userClass === "coordenador" && (
                              <th scope='col' data-row={1} data-col={7}>
                                Assinatura
                              </th>
                            )}
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 8 : 6}>
                              Status
                            </th>
                            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 9 : 7}>
                              Histórico
                            </th>
                            {userClass === "coordenador" && (
                              <th scope='col' data-row={1} data-col={10}>
                                Alteração
                              </th>
                            )}
                            {userClass === "coordenador" && (
                              <th scope='col' data-row={1} data-col={11}>
                                Exclusão
                              </th>
                            )}
                            {shouldShowAlocBtn && (
                              <th
                                className='alocCel'
                                scope='col'
                                data-row={1}
                                data-col={userClass === "coordenador" ? 12 : 8}>
                                Alocação
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className='pacTbody' ref={tbodyRef}>
                          <span
                            style={{
                              marginBlock: "2rem",
                              position: "absolute",
                            }}>
                            <Spinner
                              spinnerClass='spinner-border'
                              spinnerColor='text-info'
                              message='Loading Patients Table...'
                            />
                          </span>
                        </tbody>
                      </ErrorBoundary>,
                    );
                    tbodyRef.current = document.querySelector(".pacTbody");
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(tbodyRef.current, `Validation of replaced tbody`, extLine(new Error()));
                    if (!panelRoots[`${tbodyRef.current.id}`])
                      panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
                    if (!tbodyRef.current.querySelector("tr"))
                      panelRoots[`${tbodyRef.current.id}`]?.render(
                        pacs.map((pac, i) => (
                          <PacRow
                            nRow={i + 2}
                            pac={pac}
                            userClass={userClass}
                            shouldShowAlocBtn={shouldShowAlocBtn}
                            tabRef={tabPacRef}
                            key={`pac_row__${i + 2}`}
                          />
                        )),
                      );
                    setTimeout(() => {
                      if (tabPacRef?.current instanceof HTMLTableElement) {
                        equalizeTabCells(tabPacRef.current);
                        fillTabAttr(tabPacRef.current);
                      } else
                        elementNotFound(
                          tabPacRef.current,
                          `tabPacRef id ${
                            (tabPacRef?.current as any)?.id || "UNIDENTIFIED"
                          } in useEffect() for tableRef`,
                          extLine(new Error()),
                        );
                    }, 300);
                  } catch (e) {
                    console.error(
                      `Error executing scheduled rendering of Table Body Content Replacement:\n${(e as Error).message}`,
                    );
                  }
                }, 1000);
              } else panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
              if (!tbodyRef.current.querySelector("tr"))
                panelRoots[`${tbodyRef.current.id}`]?.render(
                  pacs.map((pac, i) => {
                    return Array.from(tbodyRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (pac as PacInfo)["idf"],
                    ) ||
                      Array.from(tbodyRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`),
                      ) ? (
                      <></>
                    ) : (
                      <PacRow
                        nRow={i + 2}
                        pac={pac}
                        userClass={userClass}
                        shouldShowAlocBtn={shouldShowAlocBtn}
                        tabRef={tabPacRef}
                        key={`pac_row__${i + 2}`}
                      />
                    );
                  }),
                );
              setTimeout(() => {
                if (tabPacRef?.current instanceof HTMLTableElement) {
                  equalizeTabCells(tabPacRef.current);
                  fillTabAttr(tabPacRef.current);
                } else
                  elementNotFound(
                    tabPacRef.current,
                    `tabPacRef id ${(tabPacRef?.current as any)?.id || "UNIDENTIFIED"} in useEffect() for tableRef`,
                    extLine(new Error()),
                  );
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
              console.error(`Error executing rendering of Table Body Content:\n${(e as Error).message}`);
            }
            const handleAttempt = () => {
              try {
                if (!(sectTabRef?.current instanceof HTMLElement))
                  throw elementNotFound(sectTabRef.current, "sectTabRef in useEffect()", extLine(new Error()));
                syncAriaStates([...sectTabRef.current.querySelectorAll("*"), sectTabRef.current]);
                checkLocalIntervs(sectTabRef.current);
                strikeEntries(sectTabRef.current);
                document.getElementById("btnExport") &&
                  handleClientPermissions(
                    userClass,
                    ["coordenador"],
                    sectTabRef.current,
                    document.getElementById("btnExport"),
                  );
                document.querySelectorAll(".outpPacStatus").forEach((status, i) => {
                  try {
                    if (!(status instanceof HTMLElement))
                      throw elementNotFound(status, `Validation of output for patient status`, extLine(new Error()));
                    if (status.innerText.toLowerCase().trim() === "em emergência") status.style.color = `red`;
                  } catch (e) {
                    console.error(
                      `Error executing iteration ${i} for checking Patient Status:\n${(e as Error).message}`,
                    );
                  }
                });
                const ancestral = document.getElementById("regstPacDlg");
                ancestral &&
                  dispatch &&
                  sectTabRef.current.querySelectorAll(".btnAloc").forEach((btn, i) => {
                    try {
                      addListenerAlocation(btn, ancestral, ancestral, "Pac", state, dispatch, userClass);
                    } catch (e) {
                      console.error(
                        `Error executing iteration ${i} for adding alocation button listener in patients table:\n${
                          (e as Error).message
                        }`,
                      );
                    }
                  });
              } catch (e) {
                console.error(`Error executing for styling table:\n${(e as Error).message}`);
              }
            };
            setTimeout(() => {
              !tbodyRef.current?.querySelector("tr") ? setTimeout(() => handleAttempt(), 1800) : handleAttempt();
            }, 1200);
          })
          .catch(e => console.error(`Failed to fetch from Patients Table: ${e.message}`));
      }, 300);
    } catch (e) {
      console.error(`Error executing useEffect for Table Body Reference:\n${(e as Error).message}`);
    }
  }, []);
  useEffect(() => {
    if (sectTabRef?.current instanceof HTMLElement) {
      const handleKeyDown = (press: KeyboardEvent) =>
        press.key === "Escape" && setDisplayRowData(!shouldDisplayRowData);
      addEventListener("keydown", handleKeyDown);
      return (): void => removeEventListener("keydown", handleKeyDown);
    } else elementNotFound(sectTabRef.current, "sectTabRef in useEffect()", extLine(new Error()));
  }, [sectTabRef]);
  return (
    <section className='form-padded' id='sectPacsTab' ref={sectTabRef}>
      <table className='table table-striped table-responsive table-hover tabPacs' id='avPacsTab' ref={tabPacRef}>
        <caption className='caption-t'>
          <strong>
            <small role='textbox' className='noInvert'>
              <em className='noInvert'>
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
          <col data-col={7}></col>
          <col data-col={8}></col>
          {userClass === "coordenador" && <col data-col={9}></col>}
          {userClass === "coordenador" && <col data-col={10}></col>}
          {userClass === "coordenador" && <col data-col={11}></col>}
          {shouldShowAlocBtn && <col data-col={12}></col>}
        </colgroup>
        <thead className='thead-dark'>
          <tr id={`avPacs-rowUnfilled0`} data-row={1}>
            {userClass === "coordenador" && (
              <th scope='col' data-row={1} data-col={1}>
                CPF
              </th>
            )}
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 2 : 1}>
              Nome
            </th>
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 3 : 2}>
              E-mail
            </th>
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 4 : 3}>
              Telefone
            </th>
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 5 : 4}>
              Próximo Dia de Consulta
            </th>
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 6 : 5}>
              Período de Acompanhamento
            </th>
            {userClass === "coordenador" && (
              <th scope='col' data-row={1} data-col={7}>
                Assinatura
              </th>
            )}
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 8 : 6}>
              Status
            </th>
            <th scope='col' data-row={1} data-col={userClass === "coordenador" ? 9 : 7}>
              Histórico
            </th>
            {userClass === "coordenador" && (
              <th scope='col' data-row={1} data-col={10}>
                Alteração
              </th>
            )}
            {userClass === "coordenador" && (
              <th scope='col' data-row={1} data-col={11}>
                Exclusão
              </th>
            )}
            {shouldShowAlocBtn && (
              <th className='alocCel' scope='col' data-row={1} data-col={userClass === "coordenador" ? 12 : 8}>
                Alocação
              </th>
            )}
          </tr>
        </thead>
        <tbody className='pacTbody' ref={tbodyRef}>
          <span style={{ marginBlock: "2rem", position: "absolute" }}>
            <Spinner spinnerClass='spinner-border' spinnerColor='text-info' message='Loading Patients Table...' />
          </span>
        </tbody>
      </table>
    </section>
  );
}
