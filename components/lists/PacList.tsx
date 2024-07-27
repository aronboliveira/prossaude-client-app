import {
  nullishBtn,
  nullishHtEl,
  nullishTab,
  nullishTabSect,
} from "@/lib/global/declarations/types";
import { equalizeTabCells } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import {
  PacInfo,
  PacListProps,
} from "@/lib/locals/panelPage/declarations/interfacesCons";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import { useEffect, useRef, useCallback, MutableRefObject } from "react";
import { handleFetch } from "@/pages/api/ts/handlers";
import { panelRoots } from "../panelForms/defs/client/SelectPanel";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../error/GenericErrorComponent";
import PacRow from "../panelForms/pacs/PacRow";
import Spinner from "../icons/Spinner";

export default function PacList({
  setDisplayRowData,
  shouldDisplayRowData,
  shouldShowAlocBtn = true,
  onClick,
  shouldDisplayPacList = true,
  userClass = "estudante",
}: PacListProps): JSX.Element {
  const pacs: PacInfo[] = [];
  const tabPacRef = useRef<nullishTab>(null);
  const sectTabRef = useRef<nullishHtEl>(null);
  const tbodyRef = useRef<nullishTabSect>(null);
  const alocBtnRef = useRef<nullishBtn>(null);
  const gatherPacData = useCallback(
    (alocBtnRef: MutableRefObject<nullishBtn>, ancestral: HTMLElement) => {
      addListenerAlocation(
        alocBtnRef.current,
        ancestral,
        ancestral,
        "Pac",
        shouldDisplayPacList,
        onClick,
        userClass
      );
    },
    [alocBtnRef]
  );
  useEffect(() => {
    try {
      if (!(tbodyRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(
          tbodyRef.current,
          `Validation of Table Body instance`,
          extLine(new Error())
        );
      if (pacs.length > 0 && tbodyRef.current.querySelector("tr")) return;
      setTimeout(() => {
        if (pacs.length > 0) return;
        handleFetch("patients", "_table", true).then(res => {
          res.forEach(pac => {
            !pacs.includes(pac as PacInfo) &&
              pacs.push({
                name: pac.name,
                tel: pac.tel,
                email: pac.email,
                next_appointed_day: (pac as PacInfo)["next_appointed_day"],
                treatment_period: (pac as PacInfo)["treatment_period"],
                current_status: (pac as PacInfo)["current_status"],
                signature: (pac as PacInfo)["signature"],
                historic: (pac as PacInfo)["historic"],
                idf: (pac as PacInfo)["idf"],
              });
          });
          try {
            if (!(tabPacRef.current instanceof HTMLElement))
              throw elementNotFound(
                tabPacRef.current,
                `Validation of Table reference`,
                extLine(new Error())
              );
            if (!(tbodyRef.current instanceof HTMLElement))
              throw elementNotFound(
                tbodyRef.current,
                `Validation of Table Body Reference`,
                extLine(new Error())
              );
            if (
              panelRoots[`${tbodyRef.current.id}`] &&
              !(panelRoots[`${tbodyRef.current.id}`] as any)["_internalRoot"]
            ) {
              setTimeout(() => {
                try {
                  if (!(tabPacRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tabPacRef.current,
                      `Validation of Table reference`,
                      extLine(new Error())
                    );
                  if (!(tbodyRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tbodyRef.current,
                      `Validation of Table Body Reference`,
                      extLine(new Error())
                    );
                  if (tbodyRef.current.querySelector("tr")) return;
                  panelRoots[`${tbodyRef.current.id}`]?.unmount();
                  delete panelRoots[`${tbodyRef.current.id}`];
                  tbodyRef.current.remove();
                  if (!panelRoots[`${tabPacRef.current.id}`])
                    panelRoots[`${tabPacRef.current.id}`] = createRoot(
                      tabPacRef.current
                    );
                  panelRoots[`${tabPacRef.current.id}`]?.render(
                    <ErrorBoundary
                      FallbackComponent={() => (
                        <GenericErrorComponent message="Error reloading replacement for table body" />
                      )}
                    >
                      <caption className="caption-t">
                        <strong>
                          <small role="textbox" className="noInvert">
                            <em className="noInvert">
                              Lista Recuperada da Ficha de Pacientes
                              registrados. Acesse
                              <samp>
                                <a> ROTA_PLACEHOLDER </a>
                              </samp>
                              para cadastrar
                            </em>
                          </small>
                        </strong>
                      </caption>
                      <colgroup>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        {userClass === "coordenador" && <col></col>}
                        {userClass === "coordenador" && <col></col>}
                        {userClass === "coordenador" && <col></col>}
                        {userClass === "coordenador" && <col></col>}
                        {shouldShowAlocBtn && <col></col>}
                      </colgroup>
                      <thead className="thead-dark">
                        <tr id={`avPacs-rowUnfilled0`}>
                          {userClass === "coordenador" && (
                            <th scope="col">CPF</th>
                          )}
                          <th scope="col">Nome</th>
                          <th scope="col">E-mail</th>
                          <th scope="col">Telefone</th>
                          <th scope="col">Próximo Dia de Consulta</th>
                          <th scope="col">Período de Acompanhamento</th>
                          {userClass === "coordenador" && (
                            <th scope="col">Assinatura</th>
                          )}
                          <th scope="col">Status</th>
                          <th scope="col">Histórico</th>
                          {userClass === "coordenador" && (
                            <th scope="col">Alteração</th>
                          )}
                          {userClass === "coordenador" && (
                            <th scope="col">Exclusão</th>
                          )}
                          {shouldShowAlocBtn && (
                            <th className="alocCel" scope="col">
                              Alocação
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="pacTbody" ref={tbodyRef}>
                        <span
                          style={{ marginBlock: "2rem", position: "absolute" }}
                        >
                          <Spinner
                            spinnerClass="spinner-border"
                            spinnerColor="text-info"
                            message="Loading Patients Table..."
                          />
                        </span>
                      </tbody>
                    </ErrorBoundary>
                  );
                  tbodyRef.current = document.querySelector(".pacTbody");
                  if (!(tbodyRef.current instanceof HTMLElement))
                    throw elementNotFound(
                      tbodyRef.current,
                      `Validation of replaced tbody`,
                      extLine(new Error())
                    );
                  if (!panelRoots[`${tbodyRef.current.id}`])
                    panelRoots[`${tbodyRef.current.id}`] = createRoot(
                      tbodyRef.current
                    );
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
                      ))
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
              panelRoots[`${tbodyRef.current.id}`] = createRoot(
                tbodyRef.current
              );
            if (!tbodyRef.current.querySelector("tr"))
              panelRoots[`${tbodyRef.current.id}`]?.render(
                pacs.map((pac, i) => {
                  return Array.from(
                    tbodyRef.current?.querySelectorAll("output") ?? []
                  ).some(outp => outp.innerText === (pac as PacInfo)["idf"]) ||
                    Array.from(
                      tbodyRef.current?.querySelectorAll("tr") ?? []
                    ).some(
                      tr =>
                        tr.dataset.key &&
                        tbodyRef.current?.querySelector(
                          `tr[data-key=${tr.dataset.key}`
                        )
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
                })
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
    if (sectTabRef?.current instanceof HTMLElement) {
      syncAriaStates([
        ...sectTabRef.current.querySelectorAll("*"),
        sectTabRef.current,
      ]);
      checkLocalIntervs(sectTabRef.current);
      strikeEntries(sectTabRef.current);
      const handleKeyDown = (press: KeyboardEvent) =>
        press.key === "Escape" && setDisplayRowData(!shouldDisplayRowData);
      addEventListener("keydown", handleKeyDown);
      return () => removeEventListener("keydown", handleKeyDown);
    } else
      elementNotFound(
        sectTabRef.current,
        "sectTabRef in useEffect()",
        extLine(new Error())
      );
  }, [sectTabRef]);
  useEffect(() => {
    const ancestral = document.getElementById("regstPacDlg");
    ancestral instanceof HTMLElement
      ? gatherPacData(alocBtnRef, ancestral)
      : elementNotFound(
          ancestral,
          "Dialog for registering new appointment when alocating patient",
          extLine(new Error())
        );
  }, [alocBtnRef]);
  useEffect(() => {
    document.querySelectorAll(".outpPacStatus").forEach((status, i) => {
      try {
        if (!(status instanceof HTMLElement))
          throw elementNotFound(
            status,
            `Validation of output for patient status`,
            extLine(new Error())
          );
        if (status.innerText.toLowerCase().trim() === "em emergência")
          status.style.color = `red`;
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for checking Patient Status:\n${
            (e as Error).message
          }`
        );
      }
    });
  }, []);
  return (
    <section className="form-padded" id="sectPacsTab" ref={sectTabRef}>
      <table
        className="table table-striped table-responsive table-hover tabPacs"
        id="avPacsTab"
        ref={tabPacRef}
      >
        <caption className="caption-t">
          <strong>
            <small role="textbox" className="noInvert">
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
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          {userClass === "coordenador" && <col></col>}
          {userClass === "coordenador" && <col></col>}
          {userClass === "coordenador" && <col></col>}
          {userClass === "coordenador" && <col></col>}
          {shouldShowAlocBtn && <col></col>}
        </colgroup>
        <thead className="thead-dark">
          <tr id={`avPacs-rowUnfilled0`}>
            {userClass === "coordenador" && <th scope="col">CPF</th>}
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">Telefone</th>
            <th scope="col">Próximo Dia de Consulta</th>
            <th scope="col">Período de Acompanhamento</th>
            {userClass === "coordenador" && <th scope="col">Assinatura</th>}
            <th scope="col">Status</th>
            <th scope="col">Histórico</th>
            {userClass === "coordenador" && <th scope="col">Alteração</th>}
            {userClass === "coordenador" && <th scope="col">Exclusão</th>}
            {shouldShowAlocBtn && (
              <th className="alocCel" scope="col">
                Alocação
              </th>
            )}
          </tr>
        </thead>
        <tbody className="pacTbody" ref={tbodyRef}>
          <span style={{ marginBlock: "2rem", position: "absolute" }}>
            <Spinner
              spinnerClass="spinner-border"
              spinnerColor="text-info"
              message="Loading Patients Table..."
            />
          </span>
        </tbody>
      </table>
    </section>
  );
}
