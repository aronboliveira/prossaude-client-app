"use client";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { equalizeTabCells, isClickOutside } from "@/lib/global/gStyleScript";
import { handleFetch } from "@/lib/global/data-service";
import { panelRoots } from "@/vars";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useContext, useEffect, useMemo, useRef } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import GenericErrorComponent from "../error/GenericErrorComponent";
import ProfRow from "../panelForms/profs/ProfRow";
import Spinner from "../icons/Spinner";
import { nlDlg, nlHtEl, nlTab, nlTabSect } from "@/lib/global/declarations/types";
import { AvProfListDlgProps, ProfInfo } from "@/lib/global/declarations/interfacesCons";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
  filterTabMembers,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { PanelCtx } from "../panelForms/defs/client/SelectLoader";
export default function AvProfListDlg(props: AvProfListDlgProps): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    internalProfs: ProfInfo[] = useMemo(() => [], []),
    externalProfs: ProfInfo[] = useMemo(() => [], []),
    dialogRef = useRef<nlDlg>(null),
    tabProfIntRef = useRef<nlTab>(null),
    tabProfExtRef = useRef<nlTab>(null),
    tbodyIntRef = useRef<nlTabSect>(null),
    tbodyExtRef = useRef<nlTabSect>(null),
    secttabProfIntRef = useRef<nlHtEl>(null);
  //push em history
  useEffect(() => {
    !/av-prof=open/gi.test(location.search) &&
      history.pushState({}, "", `${location.origin}${location.pathname}${location.search}&av-prof=open`);
    setTimeout(() => {
      history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
    }, 300);
    return (): void => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll("&av-prof=open", ""),
      );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, []);
  //listeners para dialog
  useEffect(() => {
    if (dialogRef.current instanceof HTMLDialogElement) {
      dialogRef.current!.showModal();
      const handleKeyDown = (press: KeyboardEvent): void => {
        press.key === "Escape" && props.dispatch(!props.state);
      };
      addEventListener("keydown", handleKeyDown);
      return (): void => removeEventListener("keydown", handleKeyDown);
    }
  }, [props.mainDlgRef]);
  useEffect(() => {
    try {
      if (!(tbodyExtRef.current instanceof HTMLTableSectionElement)) return;
      if (!(tbodyIntRef.current instanceof HTMLTableSectionElement)) return;
      if (
        internalProfs.length > 0 &&
        externalProfs.length > 0 &&
        tbodyExtRef.current.querySelector("tr") &&
        tbodyIntRef.current.querySelector("tr")
      )
        return;
      setTimeout(() => {
        if (internalProfs.length > 0 || externalProfs.length > 0) return;
        handleFetch("profs", "_table", true)
          .then(res => {
            res.forEach(prof => {
              if ((prof as ProfInfo).external) {
                !externalProfs.includes(prof as ProfInfo) &&
                  externalProfs.push({
                    name: prof.name,
                    tel: prof.tel,
                    email: prof.email,
                    area: (prof as ProfInfo)["area"],
                    start_day: (prof as ProfInfo)["start_day"],
                    end_day: (prof as ProfInfo)["end_day"],
                    day: (prof as ProfInfo)["day"],
                    idf: (prof as ProfInfo)["idf"],
                    external: (prof as ProfInfo)["external"] || false,
                  });
              } else {
                !internalProfs.includes(prof as ProfInfo) &&
                  internalProfs.push({
                    name: prof.name,
                    tel: prof.tel,
                    email: prof.email,
                    area: (prof as ProfInfo)["area"],
                    start_day: (prof as ProfInfo)["start_day"],
                    end_day: (prof as ProfInfo)["end_day"],
                    day: (prof as ProfInfo)["day"],
                    idf: (prof as ProfInfo)["idf"],
                    external: (prof as ProfInfo)["external"] || false,
                  });
              }
            });
            //renderização
            try {
              if (!(tabProfIntRef.current instanceof HTMLElement)) return;
              if (!(tabProfIntRef.current instanceof HTMLElement)) return;
              if (!(tbodyExtRef.current instanceof HTMLTableSectionElement)) return;
              if (!(tbodyIntRef.current instanceof HTMLTableSectionElement)) return;
              if (
                panelRoots[`${tbodyIntRef.current.id}`] &&
                !(panelRoots[`${tbodyIntRef.current.id}`] as any)["_internalRoot"]
              ) {
                setTimeout(() => {
                  try {
                    if (!(tabProfIntRef.current instanceof HTMLElement)) return;
                    if (!(tbodyIntRef.current instanceof HTMLElement)) return;
                    if (tbodyIntRef.current.querySelector("tr")) return;
                    panelRoots[`${tbodyIntRef.current.id}`]?.unmount();
                    delete panelRoots[`${tbodyIntRef.current.id}`];
                    tbodyIntRef.current.remove() as void;
                    if (!panelRoots[`${tabProfIntRef.current.id}`])
                      panelRoots[`${tabProfIntRef.current.id}`] = createRoot(tabProfIntRef.current);
                    panelRoots[`${tabProfIntRef.current.id}`]?.render(
                      <ErrorBoundary
                        FallbackComponent={() => (
                          <GenericErrorComponent message='Error reloading replacement for table body' />
                        )}>
                        <caption className='caption_t'>
                          <hgroup className='noInvert'>
                            <h3 className='noInvert'>
                              <strong>Membros Internos</strong>
                            </h3>
                            <strong>
                              <small role='textbox' className='noInvert'>
                                <em className='noInvert'>
                                  Lista Recuperada da Ficha de Profissionais registrados. Acesse
                                  <samp>
                                    {" "}
                                    <a> ROTA_PLACEHOLDER </a>{" "}
                                  </samp>{" "}
                                  para cadastrar
                                </em>
                              </small>
                            </strong>
                          </hgroup>
                        </caption>
                        <colgroup>
                          <col data-row='1' data-col='1'></col>
                          <col data-row='1' data-col='2'></col>
                          <col data-row='1' data-col='3'></col>
                          <col data-row='1' data-col='4'></col>
                          <col data-row='1' data-col='5'></col>
                          <col data-row='1' data-col='6'></col>
                          <col data-row='1' data-col='7'></col>
                          {userClass === "coordenador" && <col data-row='1' data-col='8'></col>}
                        </colgroup>
                        <thead className='thead-dark'>
                          <tr id='avProfsInt-row1' data-row='1'>
                            {userClass === "coordenador" && (
                              <th scope='col' data-row='1' data-col='1'>
                                Identificador
                              </th>
                            )}
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "2" : "1"}>
                              Nome
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "3" : "2"}>
                              E-mail
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "4" : "3"}>
                              Telefone
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "5" : "4"}>
                              Área de Atuação
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "6" : "5"}>
                              Dia de Trablho
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "7" : "6"}>
                              Período de Participação
                            </th>
                            <th
                              className='alocCel'
                              scope='col'
                              data-row='1'
                              data-col={userClass === "coordenador" ? "8" : "7"}></th>
                          </tr>
                        </thead>
                        <tbody id='profsIntTbody' ref={tbodyIntRef}>
                          <span style={{ margin: "2rem", position: "absolute" }}>
                            <Spinner
                              spinnerClass='spinner-border'
                              spinnerColor='text-info'
                              message='Loading Internal Professionals Table...'
                            />
                          </span>
                        </tbody>
                      </ErrorBoundary>,
                    );
                    tbodyIntRef.current = document.getElementById("profsIntTbody") as nlTabSect;
                    if (!(tbodyIntRef.current instanceof HTMLElement)) return;
                    if (!panelRoots[`${tbodyIntRef.current.id}`])
                      panelRoots[`${tbodyIntRef.current.id}`] = createRoot(tbodyIntRef.current);
                    if (!tbodyIntRef.current.querySelector("tr"))
                      panelRoots[`${tbodyIntRef.current.id}`]?.render(
                        internalProfs.map((prof, i) => (
                          <ProfRow
                            nRow={i + 2}
                            prof={prof}
                            tabRef={tabProfIntRef}
                            key={`prof_int_row__${i + 2}`}
                            inDlg={true}
                          />
                        )),
                      );
                    setTimeout(() => {
                      if (tabProfIntRef?.current instanceof HTMLTableElement) {
                        equalizeTabCells(tabProfIntRef.current);
                        fillTabAttr(tabProfIntRef.current);
                      }
                    }, 300);
                  } catch (e) {
                    return;
                  }
                }, 1000);
              } else panelRoots[`${tbodyIntRef.current.id}`] = createRoot(tbodyIntRef.current);
              if (!tbodyIntRef.current.querySelector("tr"))
                panelRoots[`${tbodyIntRef.current.id}`]?.render(
                  internalProfs.map((prof, i) => {
                    return Array.from(tbodyIntRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (prof as ProfInfo)["idf"],
                    ) ||
                      Array.from(tbodyIntRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyIntRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`),
                      ) ? (
                      <></>
                    ) : (
                      <ProfRow
                        nRow={i + 2}
                        prof={prof}
                        tabRef={tabProfIntRef}
                        key={`prof_int_row__${i + 2}`}
                        inDlg={true}
                      />
                    );
                  }),
                );
              setTimeout(() => {
                if (tabProfIntRef?.current instanceof HTMLTableElement) {
                  equalizeTabCells(tabProfIntRef.current);
                  fillTabAttr(tabProfIntRef.current);
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
              //
              //
              if (
                panelRoots[`${tbodyExtRef.current.id}`] &&
                !(panelRoots[`${tbodyExtRef.current.id}`] as any)["_internalRoot"]
              ) {
                setTimeout(() => {
                  try {
                    if (!(tabProfIntRef.current instanceof HTMLElement)) return;
                    if (!(tbodyExtRef.current instanceof HTMLElement)) return;
                    if (tbodyExtRef.current.querySelector("tr")) return;
                    panelRoots[`${tbodyExtRef.current.id}`]?.unmount();
                    delete panelRoots[`${tbodyExtRef.current.id}`];
                    tbodyExtRef.current.remove() as void;
                    if (!panelRoots[`${tabProfIntRef.current.id}`])
                      panelRoots[`${tabProfIntRef.current.id}`] = createRoot(tabProfIntRef.current);
                    panelRoots[`${tabProfIntRef.current.id}`]?.render(
                      <ErrorBoundary
                        FallbackComponent={() => (
                          <GenericErrorComponent message='Error reloading replacement for table body' />
                        )}>
                        <caption className='caption_t'>
                          <hgroup className='noInvert'>
                            <h3 className='noInvert'>
                              <strong>Membros Externos</strong>
                            </h3>
                            <strong>
                              <small role='textbox' className='noInvert'>
                                <em className='noInvert'>
                                  Lista Recuperada da Ficha de Profissionais registrados. Acesse
                                  <samp>
                                    {" "}
                                    <a> ROTA_PLACEHOLDER </a>{" "}
                                  </samp>{" "}
                                  para cadastrar
                                </em>
                              </small>
                            </strong>
                          </hgroup>
                        </caption>
                        <colgroup>
                          <col data-row='1' data-col='1'></col>
                          <col data-row='1' data-col='2'></col>
                          <col data-row='1' data-col='3'></col>
                          <col data-row='1' data-col='4'></col>
                          <col data-row='1' data-col='5'></col>
                          <col data-row='1' data-col='6'></col>
                          <col data-row='1' data-col='7'></col>
                          {userClass === "coordenador" && <col data-row='1' data-col='8'></col>}
                        </colgroup>
                        <thead className='thead-dark'>
                          <tr id='avProfsExt-row1' data-row='1'>
                            {userClass === "coordenador" && (
                              <th scope='col' data-row='1' data-col='1'>
                                Identificador
                              </th>
                            )}
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "2" : "1"}>
                              Nome
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "3" : "2"}>
                              E-mail
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "4" : "3"}>
                              Telefone
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "5" : "4"}>
                              Área de Atuação
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "6" : "5"}>
                              Dia de Trablho
                            </th>
                            <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "7" : "6"}>
                              Período de Participação
                            </th>
                            <th
                              className='alocCel'
                              scope='col'
                              data-row='1'
                              data-col={userClass === "coordenador" ? "8" : "7"}></th>
                          </tr>
                        </thead>
                        <tbody id='profsExtTbody' ref={tbodyExtRef}>
                          <span style={{ margin: "2rem", position: "absolute" }}>
                            <Spinner
                              spinnerClass='spinner-border'
                              spinnerColor='text-info'
                              message='Loading External Professionals Table...'
                            />
                          </span>
                        </tbody>
                      </ErrorBoundary>,
                    );
                    tbodyExtRef.current = document.getElementById("profsExtTbody") as nlTabSect;
                    if (!(tbodyExtRef.current instanceof HTMLElement)) return;
                    if (!panelRoots[`${tbodyExtRef.current.id}`])
                      panelRoots[`${tbodyExtRef.current.id}`] = createRoot(tbodyExtRef.current);
                    if (!tbodyExtRef.current.querySelector("tr"))
                      panelRoots[`${tbodyExtRef.current.id}`]?.render(
                        externalProfs.map((prof, i) => (
                          <ProfRow
                            nRow={i + 2}
                            prof={prof}
                            tabRef={tabProfIntRef}
                            key={`prof_ext_row__${i + 2}`}
                            inDlg={true}
                          />
                        )),
                      );
                    setTimeout(() => {
                      if (tabProfIntRef?.current instanceof HTMLTableElement) {
                        equalizeTabCells(tabProfIntRef.current);
                        fillTabAttr(tabProfIntRef.current);
                      }
                    }, 300);
                  } catch (e) {
                    return;
                  }
                }, 1000);
              } else panelRoots[`${tbodyExtRef.current.id}`] = createRoot(tbodyExtRef.current);
              if (!tbodyExtRef.current.querySelector("tr"))
                panelRoots[`${tbodyExtRef.current.id}`]?.render(
                  externalProfs.map((prof, i) => {
                    return Array.from(tbodyExtRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (prof as ProfInfo)["idf"],
                    ) ||
                      Array.from(tbodyExtRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyExtRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`),
                      ) ? (
                      <></>
                    ) : (
                      <ProfRow
                        nRow={i + 2}
                        prof={prof}
                        tabRef={tabProfIntRef}
                        key={`prof_ext_row__${i + 2}`}
                        inDlg={true}
                      />
                    );
                  }),
                );
              setTimeout(() => {
                if (tabProfIntRef?.current instanceof HTMLTableElement) {
                  equalizeTabCells(tabProfIntRef.current);
                  fillTabAttr(tabProfIntRef.current);
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
            //ajustes em tabela de externos
            const handleInternalAttempt = (): void => {
              try {
                if (!(tabProfExtRef?.current instanceof HTMLTableElement)) return;
                fillTabAttr(tabProfExtRef.current);
                equalizeTabCells(tabProfExtRef.current);
                props.dispatch &&
                  tabProfExtRef.current.querySelectorAll(".btnAloc").forEach(btn => {
                    try {
                      addListenerAlocation(
                        btn,
                        dialogRef.current,
                        props.mainDlgRef.current,
                        "Prof",
                        props.state,
                        props.dispatch,
                        userClass,
                      );
                    } catch (e) {
                      return;
                    }
                  });
                const typeConsSel = props.mainDlgRef.current?.querySelector("#typeConsSel");
                if (!(typeConsSel instanceof HTMLSelectElement)) return;
                const [selectedOp] = Array.from(typeConsSel.querySelectorAll("option")).filter(
                  opt => opt.selected === true,
                );
                if (!(selectedOp instanceof HTMLOptionElement)) return;
                const relOptgrp = selectedOp.closest("optgroup");
                if (relOptgrp instanceof HTMLOptGroupElement && relOptgrp.label !== "")
                  filterTabMembers(tabProfExtRef.current, relOptgrp.label.toLowerCase().trim());
              } catch (e) {
                return;
              }
            };
            //ajustes em tabela de internos
            const handleExternalAttempt = (): void => {
              try {
                if (!(tabProfIntRef?.current instanceof HTMLTableElement)) return;
                fillTabAttr(tabProfIntRef.current);
                equalizeTabCells(tabProfIntRef.current);
                props.dispatch &&
                  tabProfIntRef.current.querySelectorAll(".btnAloc").forEach(btn => {
                    try {
                      addListenerAlocation(
                        btn,
                        dialogRef.current,
                        props.mainDlgRef.current,
                        "Prof",
                        props.state,
                        props.dispatch,
                        userClass,
                      );
                    } catch (e) {
                      return;
                    }
                  });
                const typeConsSel = props.mainDlgRef.current?.querySelector("#typeConsSel");
                if (!(typeConsSel instanceof HTMLSelectElement)) return;
                const [selectedOp] = Array.from(typeConsSel.querySelectorAll("option")).filter(
                  opt => opt.selected === true,
                );
                if (!(selectedOp instanceof HTMLOptionElement)) return;
                const relOptgrp = selectedOp.closest("optgroup");
                if (relOptgrp instanceof HTMLOptGroupElement && relOptgrp.label !== "")
                  filterTabMembers(tabProfIntRef.current, relOptgrp.label.toLowerCase().trim());
                if (!(secttabProfIntRef?.current instanceof HTMLElement)) return;
                checkLocalIntervs(secttabProfIntRef.current);
                strikeEntries(secttabProfIntRef.current);
              } catch (e) {
                return;
              }
            };
            setTimeout(() => {
              !tbodyExtRef.current?.querySelector("tr")
                ? setTimeout(() => handleInternalAttempt(), 1800)
                : handleInternalAttempt();
              !tbodyIntRef.current?.querySelector("tr")
                ? setTimeout(() => handleExternalAttempt(), 1800)
                : handleExternalAttempt();
            }, 1200);
          })
          .catch(e => console.error(`Failed to fetch from Professionals Table: ${e.message}`))
          .finally(() => {
            setTimeout(
              () => syncAriaStates([...(dialogRef.current?.querySelectorAll("*") ?? []), dialogRef.current!]),
              1200,
            );
            setTimeout(
              () => syncAriaStates([...(dialogRef.current?.querySelectorAll("*") ?? []), dialogRef.current!]),
              3000,
            );
          });
      }, 300);
    } catch (e) {
      return;
    }
  }, [props.dispatch, props.mainDlgRef, props.state, userClass]);
  return (
    <>
      {props.state && props.btnProf instanceof HTMLButtonElement && (
        <dialog
          className='modalContent__stk2'
          id='avProfListDlg'
          ref={dialogRef}
          onClick={ev => {
            isClickOutside(ev, ev.currentTarget).some(coord => coord === true) && props.dispatch(!props.state);
          }}>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorFallbackDlg
                renderError={new Error(`Erro carregando a janela modal!`)}
                onClick={() => props.dispatch(props.state)}
              />
            )}>
            <section className='flexRNoWBetCt widFull' id='headProfList'>
              <h2 className='mg__1b noInvert'>
                <strong>Profissionais Cadastrados</strong>
              </h2>
              <button className='btn btn-close forceInvert' onClick={() => props.dispatch(!props.state)}></button>
            </section>
            <section className='formPadded' id='sectProfsTabs' ref={secttabProfIntRef}>
              <table
                className='table table-striped table-responsive table-hover tabProfs'
                id='avProfsIntTab'
                ref={tabProfIntRef}>
                <caption className='caption_t'>
                  <hgroup className='noInvert'>
                    <h3 className='noInvert'>
                      <strong>Membros Internos</strong>
                    </h3>
                    <strong>
                      <small role='textbox' className='noInvert'>
                        <em className='noInvert'>
                          Lista Recuperada da Ficha de Profissionais registrados. Acesse
                          <samp>
                            {" "}
                            <a> ROTA_PLACEHOLDER </a>{" "}
                          </samp>{" "}
                          para cadastrar
                        </em>
                      </small>
                    </strong>
                  </hgroup>
                </caption>
                <colgroup>
                  <col data-row='1' data-col='1'></col>
                  <col data-row='1' data-col='2'></col>
                  <col data-row='1' data-col='3'></col>
                  <col data-row='1' data-col='4'></col>
                  <col data-row='1' data-col='5'></col>
                  <col data-row='1' data-col='6'></col>
                  <col data-row='1' data-col='7'></col>
                  {userClass === "coordenador" && <col data-row='1' data-col='8'></col>}
                </colgroup>
                <thead className='thead-dark'>
                  <tr id='avProfsInt-row1' data-row='1'>
                    {userClass === "coordenador" && (
                      <th scope='col' data-row='1' data-col='1'>
                        Identificador
                      </th>
                    )}
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "2" : "1"}>
                      Nome
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "3" : "2"}>
                      E-mail
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "4" : "3"}>
                      Telefone
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "5" : "4"}>
                      Área de Atuação
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "6" : "5"}>
                      Dia de Trablho
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "7" : "6"}>
                      Período de Participação
                    </th>
                    <th
                      className='alocCel'
                      scope='col'
                      data-row='1'
                      data-col={userClass === "coordenador" ? "8" : "7"}></th>
                  </tr>
                </thead>
                <tbody id='profsIntTbody' ref={tbodyIntRef}>
                  <span style={{ margin: "2rem", position: "absolute" }}>
                    <Spinner
                      spinnerClass='spinner-border'
                      spinnerColor='text-info'
                      message='Loading Internal Professionals Table...'
                    />
                  </span>
                </tbody>
              </table>
              <table
                className='table table-striped table-responsive table-hover tabProfs'
                id='avProfsExtTab'
                ref={tabProfExtRef}>
                <caption className='caption_t'>
                  <hgroup className='noInvert'>
                    <h3 className='noInvert'>
                      <strong>Membros Externos</strong>
                    </h3>
                    <strong>
                      <small role='textbox' className='noInvert'>
                        <em className='noInvert'>
                          Lista Recuperada da Ficha de Profissionais registrados. Acesse
                          <samp>
                            {" "}
                            <a> ROTA_PLACEHOLDER </a>{" "}
                          </samp>{" "}
                          para cadastrar
                        </em>
                      </small>
                    </strong>
                  </hgroup>
                </caption>
                <colgroup>
                  <col data-row='1' data-col='1'></col>
                  <col data-row='1' data-col='2'></col>
                  <col data-row='1' data-col='3'></col>
                  <col data-row='1' data-col='4'></col>
                  <col data-row='1' data-col='5'></col>
                  <col data-row='1' data-col='6'></col>
                  <col data-row='1' data-col='7'></col>
                  {userClass === "coordenador" && <col data-row='1' data-col='8'></col>}
                </colgroup>
                <thead className='thead-dark'>
                  <tr id='avProfsExt-row1' data-row='1'>
                    {userClass === "coordenador" && (
                      <th scope='col' data-row='1' data-col='1'>
                        Identificador
                      </th>
                    )}
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "2" : "1"}>
                      Nome
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "3" : "2"}>
                      E-mail
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "4" : "3"}>
                      Telefone
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "5" : "4"}>
                      Área de Atuação
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "6" : "5"}>
                      Dia de Trablho
                    </th>
                    <th scope='col' data-row='1' data-col={userClass === "coordenador" ? "7" : "6"}>
                      Período de Participação
                    </th>
                    <th
                      className='alocCel'
                      scope='col'
                      data-row='1'
                      data-col={userClass === "coordenador" ? "8" : "7"}></th>
                  </tr>
                </thead>
                <tbody id='profsExtTbody' ref={tbodyExtRef}>
                  <span style={{ margin: "2rem", position: "absolute" }}>
                    <Spinner
                      spinnerClass='spinner-border'
                      spinnerColor='text-info'
                      message='Loading External Professionals Table...'
                    />
                  </span>
                </tbody>
              </table>
            </section>
          </ErrorBoundary>
        </dialog>
      )}
    </>
  );
}
