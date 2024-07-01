import { useEffect, useRef, MutableRefObject, useCallback } from "react";
import {
  nullishBtn,
  nullishDlg,
  nullishTab,
} from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, isClickOutside } from "@/lib/global/gStyleScript";
import { ErrorBoundary } from "react-error-boundary";
import { AvProfListDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
  filterTabMembers,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import ProfRow from "../panelForms/profs/ProfRow";

export default function AvProfListDlg(props: AvProfListDlgProps): JSX.Element {
  const dialogRef = useRef<nullishDlg>(null);
  const alocBtnRef = useRef<nullishBtn>(null);
  const tabProfIntRef = useRef<nullishTab>(null);
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
  const tabProfExtRef = useRef<nullishTab>(null);
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
  const sectTabRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (sectTabRef?.current instanceof HTMLElement) {
      checkLocalIntervs(sectTabRef.current);
      strikeEntries(sectTabRef.current);
    } else
      elementNotFound(
        sectTabRef.current,
        "sectTabRef in useEffect()",
        extLine(new Error())
      );
  }, [sectTabRef]);
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
                ref={sectTabRef}
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
                    {props.userClass === "coordenador" && <col></col>}
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                  </colgroup>
                  <thead className="thead-dark">
                    <tr id="avProfsInt-row1">
                      {props.userClass === "coordenador" && (
                        <th scope="col">Identificador</th>
                      )}
                      <th scope="col">Nome</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Área de Atuação</th>
                      <th scope="col">Dia de Trablho</th>
                      <th scope="col">Período de Participação</th>
                      <th className="alocCel" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <ProfRow
                      count={2}
                      tabRef={tabProfIntRef}
                      inDlg={true}
                      userClass={props.userClass}
                      profInfo={{
                        idf: "156.789.99-00",
                        name: "João Almeida dos Santos",
                        area: "Odontologia & Coordenação",
                        email: "almeida.joao@gmail.com",
                        tel: "+55 21 99988-7766",
                        interv: "08/01/2020 – Presente",
                        day: "Quarta-feira & Sexta-Feira",
                      }}
                    />
                    <ProfRow
                      count={3}
                      tabRef={tabProfIntRef}
                      inDlg={true}
                      userClass={props.userClass}
                      profInfo={{
                        idf: "156.789.99-00",
                        name: "Jéssica Bonifácio Barbosa",
                        area: "Educação Física",
                        email: "jess.barb@gmail.com",
                        tel: "+55 21 91516-7788",
                        interv: "08/01/2020 – 08/10/2020",
                        day: "Inativa",
                      }}
                    />
                    <ProfRow
                      count={4}
                      tabRef={tabProfIntRef}
                      inDlg={true}
                      userClass={props.userClass}
                      profInfo={{
                        idf: "129.222.333-11",
                        name: "Gislayne Duarte Tavares",
                        area: "Nutrição & Supervisão",
                        email: "gislayne1994@gmail.com",
                        tel: "+55 11 91010-6689",
                        interv: "08/01/2020 – Presente",
                        day: "Sexta-Feira",
                      }}
                    />
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
                    {props.userClass === "coordenador" && <col></col>}
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                  </colgroup>
                  <thead className="thead-dark">
                    <tr id="avProfsExt-row1">
                      {props.userClass === "coordenador" && (
                        <th scope="col">Identificador</th>
                      )}
                      <th scope="col">Nome</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Área de Atuação</th>
                      <th scope="col">Dia de Trablho</th>
                      <th scope="col">Período de Participação</th>
                      <th className="alocCel" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <ProfRow
                      count={2}
                      tabRef={tabProfExtRef}
                      inDlg={true}
                      userClass={props.userClass}
                      profInfo={{
                        idf: "158.354.458-12",
                        name: "André Alfredo Gusmão",
                        area: "Educação Física",
                        email: "andregus@gmail.com",
                        tel: "+55 31 92015-6678",
                        interv: "08/01/2020 – Presente",
                        day: "Quarta-Feira",
                      }}
                    />
                    <ProfRow
                      count={3}
                      tabRef={tabProfExtRef}
                      inDlg={true}
                      userClass={props.userClass}
                      profInfo={{
                        idf: "158.555.459-19",
                        name: "Aline dos Santos Wanderhaus",
                        area: "Odontologia",
                        email: "aliwander@outlook.com",
                        tel: "+55 11 92299-6779",
                        interv: "08/01/2020 – 08/01/2021",
                        day: "Inativo",
                      }}
                    />
                  </tbody>
                </table>
              </section>
            </ErrorBoundary>
          </dialog>
        )}
    </>
  );
}
