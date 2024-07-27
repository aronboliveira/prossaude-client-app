import { useEffect, useRef, MutableRefObject, useCallback } from "react";
import {
  nullishBtn,
  nullishDlg,
  nullishTab,
  nullishTabSect,
} from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, isClickOutside } from "@/lib/global/gStyleScript";
import { ErrorBoundary } from "react-error-boundary";
import {
  AvProfListDlgProps,
  ProfInfo,
} from "@/lib/locals/panelPage/declarations/interfacesCons";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
  filterTabMembers,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import ProfRow from "../panelForms/profs/ProfRow";
import Spinner from "../icons/Spinner";
import { panelRoots } from "../panelForms/defs/client/SelectPanel";
import { createRoot } from "react-dom/client";
import GenericErrorComponent from "../error/GenericErrorComponent";
import { handleFetch } from "@/pages/api/ts/handlers";

export default function AvProfListDlg(props: AvProfListDlgProps): JSX.Element {
  const dialogRef = useRef<nullishDlg>(null);
  const alocBtnRef = useRef<nullishBtn>(null);
  const tabProfIntRef = useRef<nullishTab>(null);
  const tabProfExtRef = useRef<nullishTab>(null);
  const tbodyIntRef = useRef<nullishTabSect>(null);
  const tbodyExtRef = useRef<nullishTabSect>(null);
  const internalProfs: ProfInfo[] = [];
  const externalProfs: ProfInfo[] = [];
  useEffect(() => {
    if (dialogRef.current instanceof HTMLDialogElement) {
      dialogRef.current!.showModal();
      syncAriaStates([
        ...dialogRef.current!.querySelectorAll("*"),
        dialogRef.current,
      ]);
      const handleKeyDown = (press: KeyboardEvent) => {
        if (press.key === "Escape") {
          props.onClick(props.isCPFFillerActive);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else
      elementNotFound(
        dialogRef.current,
        "dialogElement in AvStudListDlg",
        extLine(new Error())
      );
  }, [props.mainDlgRef]);
  useEffect(() => {
    if (tabProfIntRef?.current instanceof HTMLTableElement) {
      const typeConsSel =
        props.mainDlgRef.current?.querySelector("#typeConsSel");
      if (typeConsSel instanceof HTMLSelectElement) {
        const [selectedOp] = Array.from(
          typeConsSel.querySelectorAll("option")
        ).filter(opt => opt.selected === true);
        if (selectedOp instanceof HTMLOptionElement) {
          const relOptgrp = selectedOp.closest("optgroup");
          if (
            relOptgrp instanceof HTMLOptGroupElement &&
            relOptgrp.label !== ""
          )
            filterTabMembers(
              tabProfIntRef.current,
              relOptgrp.label.toLowerCase().trim()
            );
        } else
          elementNotFound(
            selectedOp,
            `<option> for getting type of appointment for ${
              tabProfIntRef.current?.id || "UNIDENTIFIED"
            }`,
            extLine(new Error())
          );
      } else
        elementNotFound(
          typeConsSel,
          `<select> for getting type of appointment for ${
            tabProfIntRef.current?.id || "UNIDENTIFIED"
          }`,
          extLine(new Error())
        );
      equalizeTabCells(tabProfIntRef.current);
    } else
      elementNotFound(
        tabProfIntRef.current,
        `tabProfIntRef id ${
          (tabProfIntRef?.current as any)?.id || "UNIDENTIFIED"
        } in useEffect() for tableRef`,
        extLine(new Error())
      );
  }, [props.mainDlgRef, dialogRef, tabProfIntRef]);
  useEffect(() => {
    gatherProfData(alocBtnRef, dialogRef);
  }, [alocBtnRef, dialogRef]);
  const gatherProfData = useCallback(
    (
      alocBtnRef: MutableRefObject<nullishBtn>,
      dialogRef: MutableRefObject<nullishDlg>
    ) => {
      addListenerAlocation(
        alocBtnRef.current,
        dialogRef.current,
        props.mainDlgRef.current!,
        "Prof",
        props.isCPFFillerActive,
        props.onClick,
        props.userClass
      );
    },
    [dialogRef, props.mainDlgRef, alocBtnRef]
  );
  useEffect(() => {
    try {
      if (!(tbodyExtRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(
          tbodyExtRef.current,
          `Validation of Table Body instance`,
          extLine(new Error())
        );
      if (!(tbodyIntRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(
          tbodyExtRef.current,
          `Validation of Table Body instance`,
          extLine(new Error())
        );
      if (
        internalProfs.length > 0 &&
        externalProfs.length > 0 &&
        tbodyExtRef.current.querySelector("tr") &&
        tbodyIntRef.current.querySelector("tr")
      )
        return;
      setTimeout(() => {
        if (internalProfs.length > 0 || externalProfs.length > 0) return;
        handleFetch("profs", "_table", true).then(res => {
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
          try {
            if (!(tabProfIntRef.current instanceof HTMLElement))
              throw elementNotFound(
                tabProfIntRef.current,
                `Validation of Table reference`,
                extLine(new Error())
              );
            if (!(tabProfIntRef.current instanceof HTMLElement))
              throw elementNotFound(
                tabProfExtRef.current,
                `Validation of Table reference`,
                extLine(new Error())
              );
            if (!(tbodyExtRef.current instanceof HTMLTableSectionElement))
              throw elementNotFound(
                tbodyExtRef.current,
                `Validation of Table Body instance`,
                extLine(new Error())
              );
            if (!(tbodyIntRef.current instanceof HTMLTableSectionElement))
              throw elementNotFound(
                tbodyExtRef.current,
                `Validation of Table Body instance`,
                extLine(new Error())
              );
            if (
              panelRoots[`${tbodyIntRef.current.id}`] &&
              !(panelRoots[`${tbodyIntRef.current.id}`] as any)["_internalRoot"]
            ) {
              setTimeout(() => {
                try {
                  if (!(tabProfIntRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tabProfIntRef.current,
                      `Validation of Table reference`,
                      extLine(new Error())
                    );
                  if (!(tbodyIntRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tbodyIntRef.current,
                      `Validation of Table Body Reference`,
                      extLine(new Error())
                    );
                  if (tbodyIntRef.current.querySelector("tr")) return;
                  panelRoots[`${tbodyIntRef.current.id}`]?.unmount();
                  delete panelRoots[`${tbodyIntRef.current.id}`];
                  tbodyIntRef.current.remove();
                  if (!panelRoots[`${tabProfIntRef.current.id}`])
                    panelRoots[`${tabProfIntRef.current.id}`] = createRoot(
                      tabProfIntRef.current
                    );
                  panelRoots[`${tabProfIntRef.current.id}`]?.render(
                    <ErrorBoundary
                      FallbackComponent={() => (
                        <GenericErrorComponent message="Error reloading replacement for table body" />
                      )}
                    >
                      <caption className="caption-t">
                        <hgroup className="noInvert">
                          <h3 className="noInvert">
                            <strong>Membros Internos</strong>
                          </h3>
                          <strong>
                            <small role="textbox" className="noInvert">
                              <em className="noInvert">
                                Lista Recuperada da Ficha de Profissionais
                                registrados. Acesse
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
                        <col data-row="1" data-col="1"></col>
                        <col data-row="1" data-col="2"></col>
                        <col data-row="1" data-col="3"></col>
                        <col data-row="1" data-col="4"></col>
                        <col data-row="1" data-col="5"></col>
                        <col data-row="1" data-col="6"></col>
                        <col data-row="1" data-col="7"></col>
                        {props.userClass === "coordenador" && (
                          <col data-row="1" data-col="8"></col>
                        )}
                      </colgroup>
                      <thead className="thead-dark">
                        <tr id="avProfsInt-row1" data-row="1">
                          {props.userClass === "coordenador" && (
                            <th scope="col" data-row="1" data-col="1">
                              Identificador
                            </th>
                          )}
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "2" : "1"
                            }
                          >
                            Nome
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "3" : "2"
                            }
                          >
                            E-mail
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "4" : "3"
                            }
                          >
                            Telefone
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "5" : "4"
                            }
                          >
                            Área de Atuação
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "6" : "5"
                            }
                          >
                            Dia de Trablho
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "7" : "6"
                            }
                          >
                            Período de Participação
                          </th>
                          <th
                            className="alocCel"
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "8" : "7"
                            }
                          ></th>
                        </tr>
                      </thead>
                      <tbody id="profsIntTbody" ref={tbodyIntRef}>
                        <span style={{ margin: "2rem", position: "absolute" }}>
                          <Spinner
                            spinnerClass="spinner-border"
                            spinnerColor="text-info"
                            message="Loading Internal Professionals Table..."
                          />
                        </span>
                      </tbody>
                    </ErrorBoundary>
                  );
                  tbodyIntRef.current = document.getElementById(
                    "profsIntTbody"
                  ) as nullishTabSect;
                  if (!(tbodyIntRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tbodyIntRef.current,
                      `Validation of replaced tbody`,
                      extLine(new Error())
                    );
                  if (!panelRoots[`${tbodyIntRef.current.id}`])
                    panelRoots[`${tbodyIntRef.current.id}`] = createRoot(
                      tbodyIntRef.current
                    );
                  if (!tbodyIntRef.current.querySelector("tr"))
                    panelRoots[`${tbodyIntRef.current.id}`]?.render(
                      internalProfs.map((prof, i) => (
                        <ProfRow
                          nRow={i + 2}
                          prof={prof}
                          userClass={props.userClass}
                          tabRef={tabProfIntRef}
                          key={`prof_int_row__${i + 2}`}
                          inDlg={true}
                        />
                      ))
                    );
                  setTimeout(() => {
                    if (tabProfIntRef?.current instanceof HTMLTableElement) {
                      equalizeTabCells(tabProfIntRef.current);
                      fillTabAttr(tabProfIntRef.current);
                    } else
                      elementNotFound(
                        tabProfIntRef.current,
                        `tabProfIntRef id ${
                          (tabProfIntRef?.current as any)?.id || "UNIDENTIFIED"
                        } in useEffect() for tableRef`,
                        extLine(new Error())
                      );
                  }, 300);
                } catch (e) {
                  console.error(
                    `Error executing scheduled rendering of Table Body Content Replacement:\n${
                      (e as Error).message
                    }`
                  );
                }
                if (document) {
                }
              }, 1000);
            } else
              panelRoots[`${tbodyIntRef.current.id}`] = createRoot(
                tbodyIntRef.current
              );
            if (!tbodyIntRef.current.querySelector("tr"))
              panelRoots[`${tbodyIntRef.current.id}`]?.render(
                internalProfs.map((prof, i) => {
                  return Array.from(
                    tbodyIntRef.current?.querySelectorAll("output") ?? []
                  ).some(
                    outp => outp.innerText === (prof as ProfInfo)["idf"]
                  ) ||
                    Array.from(
                      tbodyIntRef.current?.querySelectorAll("tr") ?? []
                    ).some(
                      tr =>
                        tr.dataset.key &&
                        tbodyIntRef.current?.querySelector(
                          `tr[data-key=${tr.dataset.key}`
                        )
                    ) ? (
                    <></>
                  ) : (
                    <ProfRow
                      nRow={i + 2}
                      prof={prof}
                      userClass={props.userClass}
                      tabRef={tabProfIntRef}
                      key={`prof_int_row__${i + 2}`}
                      inDlg={true}
                    />
                  );
                })
              );
            setTimeout(() => {
              if (tabProfIntRef?.current instanceof HTMLTableElement) {
                equalizeTabCells(tabProfIntRef.current);
                fillTabAttr(tabProfIntRef.current);
              } else
                elementNotFound(
                  tabProfIntRef.current,
                  `tabProfIntRef id ${
                    (tabProfIntRef?.current as any)?.id || "UNIDENTIFIED"
                  } in useEffect() for tableRef`,
                  extLine(new Error())
                );
            }, 300);
            setTimeout(() => {
              if (
                !document.querySelector("tr") &&
                document.querySelector("table")
              ) {
                if (!panelRoots[`${document.querySelector("table")!.id}`])
                  panelRoots[`${document.querySelector("table")!.id}`] =
                    createRoot(document.querySelector("table")!);
                panelRoots[`${document.querySelector("table")!.id}`]?.render(
                  <GenericErrorComponent message="Failed to render table" />
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
                  if (!(tabProfIntRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tabProfIntRef.current,
                      `Validation of Table reference`,
                      extLine(new Error())
                    );
                  if (!(tbodyExtRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tbodyExtRef.current,
                      `Validation of Table Body Reference`,
                      extLine(new Error())
                    );
                  if (tbodyExtRef.current.querySelector("tr")) return;
                  panelRoots[`${tbodyExtRef.current.id}`]?.unmount();
                  delete panelRoots[`${tbodyExtRef.current.id}`];
                  tbodyExtRef.current.remove();
                  if (!panelRoots[`${tabProfIntRef.current.id}`])
                    panelRoots[`${tabProfIntRef.current.id}`] = createRoot(
                      tabProfIntRef.current
                    );
                  panelRoots[`${tabProfIntRef.current.id}`]?.render(
                    <ErrorBoundary
                      FallbackComponent={() => (
                        <GenericErrorComponent message="Error reloading replacement for table body" />
                      )}
                    >
                      <caption className="caption-t">
                        <hgroup className="noInvert">
                          <h3 className="noInvert">
                            <strong>Membros Externos</strong>
                          </h3>
                          <strong>
                            <small role="textbox" className="noInvert">
                              <em className="noInvert">
                                Lista Recuperada da Ficha de Profissionais
                                registrados. Acesse
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
                        <col data-row="1" data-col="1"></col>
                        <col data-row="1" data-col="2"></col>
                        <col data-row="1" data-col="3"></col>
                        <col data-row="1" data-col="4"></col>
                        <col data-row="1" data-col="5"></col>
                        <col data-row="1" data-col="6"></col>
                        <col data-row="1" data-col="7"></col>
                        {props.userClass === "coordenador" && (
                          <col data-row="1" data-col="8"></col>
                        )}
                      </colgroup>
                      <thead className="thead-dark">
                        <tr id="avProfsExt-row1" data-row="1">
                          {props.userClass === "coordenador" && (
                            <th scope="col" data-row="1" data-col="1">
                              Identificador
                            </th>
                          )}
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "2" : "1"
                            }
                          >
                            Nome
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "3" : "2"
                            }
                          >
                            E-mail
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "4" : "3"
                            }
                          >
                            Telefone
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "5" : "4"
                            }
                          >
                            Área de Atuação
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "6" : "5"
                            }
                          >
                            Dia de Trablho
                          </th>
                          <th
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "7" : "6"
                            }
                          >
                            Período de Participação
                          </th>
                          <th
                            className="alocCel"
                            scope="col"
                            data-row="1"
                            data-col={
                              props.userClass === "coordenador" ? "8" : "7"
                            }
                          ></th>
                        </tr>
                      </thead>
                      <tbody id="profsExtTbody" ref={tbodyExtRef}>
                        <span style={{ margin: "2rem", position: "absolute" }}>
                          <Spinner
                            spinnerClass="spinner-border"
                            spinnerColor="text-info"
                            message="Loading External Professionals Table..."
                          />
                        </span>
                      </tbody>
                    </ErrorBoundary>
                  );
                  tbodyExtRef.current = document.getElementById(
                    "profsExtTbody"
                  ) as nullishTabSect;
                  if (!(tbodyExtRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tbodyExtRef.current,
                      `Validation of replaced tbody`,
                      extLine(new Error())
                    );
                  if (!panelRoots[`${tbodyExtRef.current.id}`])
                    panelRoots[`${tbodyExtRef.current.id}`] = createRoot(
                      tbodyExtRef.current
                    );
                  if (!tbodyExtRef.current.querySelector("tr"))
                    panelRoots[`${tbodyExtRef.current.id}`]?.render(
                      externalProfs.map((prof, i) => (
                        <ProfRow
                          nRow={i + 2}
                          prof={prof}
                          userClass={props.userClass}
                          tabRef={tabProfIntRef}
                          key={`prof_ext_row__${i + 2}`}
                          inDlg={true}
                        />
                      ))
                    );
                  setTimeout(() => {
                    if (tabProfIntRef?.current instanceof HTMLTableElement) {
                      equalizeTabCells(tabProfIntRef.current);
                      fillTabAttr(tabProfIntRef.current);
                    } else
                      elementNotFound(
                        tabProfIntRef.current,
                        `tabProfIntRef id ${
                          (tabProfIntRef?.current as any)?.id || "UNIDENTIFIED"
                        } in useEffect() for tableRef`,
                        extLine(new Error())
                      );
                  }, 300);
                } catch (e) {
                  console.error(
                    `Error executing scheduled rendering of Table Body Content Replacement:\n${
                      (e as Error).message
                    }`
                  );
                }
                if (document) {
                }
              }, 1000);
            } else
              panelRoots[`${tbodyExtRef.current.id}`] = createRoot(
                tbodyExtRef.current
              );
            if (!tbodyExtRef.current.querySelector("tr"))
              panelRoots[`${tbodyExtRef.current.id}`]?.render(
                externalProfs.map((prof, i) => {
                  return Array.from(
                    tbodyExtRef.current?.querySelectorAll("output") ?? []
                  ).some(
                    outp => outp.innerText === (prof as ProfInfo)["idf"]
                  ) ||
                    Array.from(
                      tbodyExtRef.current?.querySelectorAll("tr") ?? []
                    ).some(
                      tr =>
                        tr.dataset.key &&
                        tbodyExtRef.current?.querySelector(
                          `tr[data-key=${tr.dataset.key}`
                        )
                    ) ? (
                    <></>
                  ) : (
                    <ProfRow
                      nRow={i + 2}
                      prof={prof}
                      userClass={props.userClass}
                      tabRef={tabProfIntRef}
                      key={`prof_ext_row__${i + 2}`}
                      inDlg={true}
                    />
                  );
                })
              );
            setTimeout(() => {
              if (tabProfIntRef?.current instanceof HTMLTableElement) {
                equalizeTabCells(tabProfIntRef.current);
                fillTabAttr(tabProfIntRef.current);
              } else
                elementNotFound(
                  tabProfIntRef.current,
                  `tabProfIntRef id ${
                    (tabProfIntRef?.current as any)?.id || "UNIDENTIFIED"
                  } in useEffect() for tableRef`,
                  extLine(new Error())
                );
            }, 300);
            setTimeout(() => {
              if (
                !document.querySelector("tr") &&
                document.querySelector("table")
              ) {
                if (!panelRoots[`${document.querySelector("table")!.id}`])
                  panelRoots[`${document.querySelector("table")!.id}`] =
                    createRoot(document.querySelector("table")!);
                panelRoots[`${document.querySelector("table")!.id}`]?.render(
                  <GenericErrorComponent message="Failed to render table" />
                );
              }
            }, 5000);
          } catch (e) {
            console.error(
              `Error executing rendering of Table Body Content:\n${
                (e as Error).message
              }`
            );
          }
        });
      }, 300);
    } catch (e) {
      console.error(
        `Error executing useEffect for Table Body Reference:\n${
          (e as Error).message
        }`
      );
    }
  }, []);
  useEffect(() => {
    if (tabProfExtRef?.current instanceof HTMLTableElement) {
      fillTabAttr(tabProfExtRef.current);
      equalizeTabCells(tabProfExtRef.current);
      const typeConsSel =
        props.mainDlgRef.current?.querySelector("#typeConsSel");
      if (typeConsSel instanceof HTMLSelectElement) {
        const [selectedOp] = Array.from(
          typeConsSel.querySelectorAll("option")
        ).filter(opt => opt.selected === true);
        if (selectedOp instanceof HTMLOptionElement) {
          const relOptgrp = selectedOp.closest("optgroup");
          if (
            relOptgrp instanceof HTMLOptGroupElement &&
            relOptgrp.label !== ""
          )
            filterTabMembers(
              tabProfExtRef.current,
              relOptgrp.label.toLowerCase().trim()
            );
        } else
          elementNotFound(
            selectedOp,
            `<option> for getting type of appointment for ${
              tabProfExtRef.current?.id || "UNIDENTIFIED"
            }`,
            extLine(new Error())
          );
      } else
        elementNotFound(
          typeConsSel,
          `<select> for getting type of appointment for ${
            tabProfExtRef.current?.id || "UNIDENTIFIED"
          }`,
          extLine(new Error())
        );
    } else
      elementNotFound(
        tabProfExtRef.current,
        `tabProfExtRef id ${
          (tabProfExtRef?.current as any)?.id || "UNIDENTIFIED"
        } in useEffect() for tableRef`,
        extLine(new Error())
      );
    if (tabProfIntRef?.current instanceof HTMLTableElement) {
      fillTabAttr(tabProfIntRef.current);
    } else
      elementNotFound(
        tabProfIntRef.current,
        `Table id ${(tabProfIntRef?.current as any)?.id || "UNIDENTIFIED"}`,
        extLine(new Error())
      );
  }, [props.mainDlgRef, dialogRef, tabProfExtRef, tabProfIntRef]);
  const secttabProfIntRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (secttabProfIntRef?.current instanceof HTMLElement) {
      checkLocalIntervs(secttabProfIntRef.current);
      strikeEntries(secttabProfIntRef.current);
    } else
      elementNotFound(
        secttabProfIntRef.current,
        "secttabProfIntRef in useEffect()",
        extLine(new Error())
      );
  }, [secttabProfIntRef]);
  return (
    <>
      {props.isCPFFillerActive &&
        props.btnProf instanceof HTMLButtonElement && (
          <dialog
            className="modal-content-stk2"
            id="avProfListDlg"
            ref={dialogRef}
            onClick={ev => {
              isClickOutside(ev, ev.currentTarget).some(
                coord => coord === true
              ) && props.onClick(props.isCPFFillerActive);
            }}
          >
            <ErrorBoundary
              FallbackComponent={() => (
                <ErrorFallbackDlg
                  renderError={new Error(`Erro carregando a janela modal!`)}
                  onClick={() => props.onClick(props.isCPFFillerActive)}
                />
              )}
            >
              <section className="flexRNoWBetCt widFull" id="headProfList">
                <h2 className="mg-1b noInvert">
                  <strong>Profissionais Cadastrados</strong>
                </h2>
                <button
                  className="btn btn-close forceInvert"
                  onClick={() => props.onClick(props.isCPFFillerActive)}
                ></button>
              </section>
              <section
                className="form-padded"
                id="sectProfsTabs"
                ref={secttabProfIntRef}
              >
                <table
                  className="table table-striped table-responsive table-hover tabProfs"
                  id="avProfsIntTab"
                  ref={tabProfIntRef}
                >
                  <caption className="caption-t">
                    <hgroup className="noInvert">
                      <h3 className="noInvert">
                        <strong>Membros Internos</strong>
                      </h3>
                      <strong>
                        <small role="textbox" className="noInvert">
                          <em className="noInvert">
                            Lista Recuperada da Ficha de Profissionais
                            registrados. Acesse
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
                    <col data-row="1" data-col="1"></col>
                    <col data-row="1" data-col="2"></col>
                    <col data-row="1" data-col="3"></col>
                    <col data-row="1" data-col="4"></col>
                    <col data-row="1" data-col="5"></col>
                    <col data-row="1" data-col="6"></col>
                    <col data-row="1" data-col="7"></col>
                    {props.userClass === "coordenador" && (
                      <col data-row="1" data-col="8"></col>
                    )}
                  </colgroup>
                  <thead className="thead-dark">
                    <tr id="avProfsInt-row1" data-row="1">
                      {props.userClass === "coordenador" && (
                        <th scope="col" data-row="1" data-col="1">
                          Identificador
                        </th>
                      )}
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "2" : "1"}
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "3" : "2"}
                      >
                        E-mail
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "4" : "3"}
                      >
                        Telefone
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "5" : "4"}
                      >
                        Área de Atuação
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "6" : "5"}
                      >
                        Dia de Trablho
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "7" : "6"}
                      >
                        Período de Participação
                      </th>
                      <th
                        className="alocCel"
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "8" : "7"}
                      ></th>
                    </tr>
                  </thead>
                  <tbody id="profsIntTbody" ref={tbodyIntRef}>
                    <span style={{ margin: "2rem", position: "absolute" }}>
                      <Spinner
                        spinnerClass="spinner-border"
                        spinnerColor="text-info"
                        message="Loading Internal Professionals Table..."
                      />
                    </span>
                  </tbody>
                </table>
                <table
                  className="table table-striped table-responsive table-hover tabProfs"
                  id="avProfsExtTab"
                  ref={tabProfExtRef}
                >
                  <caption className="caption-t">
                    <hgroup className="noInvert">
                      <h3 className="noInvert">
                        <strong>Membros Externos</strong>
                      </h3>
                      <strong>
                        <small role="textbox" className="noInvert">
                          <em className="noInvert">
                            Lista Recuperada da Ficha de Profissionais
                            registrados. Acesse
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
                    <col data-row="1" data-col="1"></col>
                    <col data-row="1" data-col="2"></col>
                    <col data-row="1" data-col="3"></col>
                    <col data-row="1" data-col="4"></col>
                    <col data-row="1" data-col="5"></col>
                    <col data-row="1" data-col="6"></col>
                    <col data-row="1" data-col="7"></col>
                    {props.userClass === "coordenador" && (
                      <col data-row="1" data-col="8"></col>
                    )}
                  </colgroup>
                  <thead className="thead-dark">
                    <tr id="avProfsExt-row1" data-row="1">
                      {props.userClass === "coordenador" && (
                        <th scope="col" data-row="1" data-col="1">
                          Identificador
                        </th>
                      )}
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "2" : "1"}
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "3" : "2"}
                      >
                        E-mail
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "4" : "3"}
                      >
                        Telefone
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "5" : "4"}
                      >
                        Área de Atuação
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "6" : "5"}
                      >
                        Dia de Trablho
                      </th>
                      <th
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "7" : "6"}
                      >
                        Período de Participação
                      </th>
                      <th
                        className="alocCel"
                        scope="col"
                        data-row="1"
                        data-col={props.userClass === "coordenador" ? "8" : "7"}
                      ></th>
                    </tr>
                  </thead>
                  <tbody id="profsExtTbody" ref={tbodyExtRef}>
                    <span style={{ margin: "2rem", position: "absolute" }}>
                      <Spinner
                        spinnerClass="spinner-border"
                        spinnerColor="text-info"
                        message="Loading External Professionals Table..."
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
