import { ErrorBoundary } from "react-error-boundary";
import { addExportFlags } from "@/lib/global/gController";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, normalizeSizeSb } from "@/lib/global/gStyleScript";
import { fillTabAttr } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { handleFetch } from "@/lib/global/data-service";
import { exporters, panelRoots } from "@/vars";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useCallback, useContext, useMemo } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import ProfRow from "./ProfRow";
import Spinner from "../../icons/Spinner";
import { nlBtn, nlFm, nlTab, nlTabSect } from "@/lib/global/declarations/types";
import { ProfInfo } from "@/lib/global/declarations/interfacesCons";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { assignFormAttrs } from "@/lib/global/gModel";
import { PanelCtx } from "../defs/client/SelectLoader";
import { ExportHandler } from "@/lib/global/declarations/classes";
import useExportHandler from "@/lib/hooks/useExportHandler";
export default function TableProfForm(): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    profs: ProfInfo[] = useMemo(() => [], []),
    formRef = useRef<nlFm>(null),
    tabRef = useRef<nlTab>(null),
    tbodyRef = useRef<nlTabSect>(null),
    btnExportProfsTabRef = useRef<nlBtn>(null),
    callbackNormalizeSizesSb = useCallback(() => {
      normalizeSizeSb(
        [
          ...document.querySelectorAll(".formPadded"),
          ...document.querySelectorAll(".ovFlAut"),
          ...document.querySelectorAll("[scrollbar-width=none]"),
        ],
        [false, 0],
        true,
        [document.getElementById("sectProfsTab")],
      );
      document.querySelector("table")!.style.minHeight = "revert";
      const nextDiv = document.getElementById("avPacsTab")?.nextElementSibling;
      if (nextDiv?.id === "" && nextDiv instanceof HTMLDivElement) nextDiv.remove() as void;
    }, []);
  useEffect(() => {
    try {
      if (!(tbodyRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(tbodyRef.current, `Validation of Table Body instance`, extLine(new Error()));
      if (profs.length > 0 && tbodyRef.current.querySelector("tr")) return;
      setTimeout(() => {
        if (profs.length > 0) return;
        handleFetch("profs", "_table", true)
          .then(res => {
            res.forEach(prof => {
              !profs.includes(prof as ProfInfo) &&
                profs.push({
                  name: prof.name,
                  tel: prof.tel,
                  email: prof.email,
                  area: (prof as ProfInfo)["area"],
                  start_day: (prof as ProfInfo)["start_day"],
                  end_day: (prof as ProfInfo)["end_day"],
                  day: (prof as ProfInfo)["day"],
                  idf: (prof as ProfInfo)["idf"],
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
                        extLine(new Error()),
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
                        )}>
                        <caption className='caption_t'>
                          <strong>
                            <small role='textbox'>
                              <em>
                                Lista Recuperada da Ficha de Profissionais registrados. Acesse
                                <samp>
                                  <a> ROTA_PLACEHOLDER </a>
                                </samp>
                                para cadastrar
                              </em>
                            </small>
                          </strong>
                        </caption>
                        <colgroup>
                          {userClass === "coordenador" && <col></col>}
                          <col></col>
                          <col></col>
                          <col></col>
                          <col></col>
                          <col></col>
                          {userClass === "coordenador" && <col></col>}
                          {userClass === "coordenador" && <col></col>}
                        </colgroup>
                        <thead className='thead-dark'>
                          <tr id='avPacs-row1'>
                            {userClass === "coordenador" && <th scope='col'>CPF</th>}
                            <th scope='col'>Nome</th>
                            <th scope='col'>Externo</th>
                            <th scope='col'>E-mail</th>
                            <th scope='col'>Telefone</th>
                            <th scope='col'>Área de Atuação</th>
                            <th scope='col'>Dia de Trablho</th>
                            <th scope='col'>Período de Participação</th>
                            {userClass === "coordenador" && <th scope='col'>Alteração</th>}
                            {userClass === "coordenador" && <th scope='col'>Exclusão</th>}
                          </tr>
                        </thead>
                        <tbody id='profsTbody' ref={tbodyRef}>
                          <span style={{ margin: "2rem", position: "absolute" }}>
                            <Spinner
                              spinnerClass='spinner-border'
                              spinnerColor='text-info'
                              message='Loading Professionals Table...'
                            />
                          </span>
                        </tbody>
                      </ErrorBoundary>,
                    );
                    tbodyRef.current = document.getElementById("profsTbody") as nlTabSect;
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(tbodyRef.current, `Validation of replaced tbody`, extLine(new Error()));
                    if (!panelRoots[`${tbodyRef.current.id}`])
                      panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
                    if (!tbodyRef.current.querySelector("tr"))
                      panelRoots[`${tbodyRef.current.id}`]?.render(
                        profs.map((prof, i) => (
                          <ProfRow nRow={i + 2} prof={prof} tabRef={tabRef} key={`prof_row__${i + 2}`} />
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
              } else panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
              if (!tbodyRef.current.querySelector("tr"))
                panelRoots[`${tbodyRef.current.id}`]?.render(
                  profs.map((prof, i) => {
                    return Array.from(tbodyRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (prof as ProfInfo)["idf"],
                    ) ||
                      Array.from(tbodyRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`),
                      ) ? (
                      <></>
                    ) : (
                      <ProfRow nRow={i + 2} prof={prof} tabRef={tabRef} key={`prof_row__${i + 2}`} />
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
            const handleAttempt = (): void => {
              try {
                if (!(tabRef.current instanceof HTMLElement))
                  throw elementNotFound(tabRef.current, `Validation of Table instance`, extLine(new Error()));
                equalizeTabCells(tabRef.current);
                strikeEntries(tabRef.current);
                document.getElementById("btnExport") &&
                  handleClientPermissions(
                    userClass,
                    ["coordenador"],
                    tabRef.current,
                    document.getElementById("btnExport"),
                  );
              } catch (e) {
                console.error(`Error executing handleAttempt for Professionals table:\n${(e as Error).message}`);
              }
            };
            setTimeout(() => {
              !tbodyRef.current?.querySelector("tr") ? setTimeout(() => handleAttempt(), 1800) : handleAttempt();
            }, 1200);
          })
          .catch(e => console.error(`Failed to fetch from Professionals Table: ${e.message}`))
          .finally(() => {
            setTimeout(() => syncAriaStates([...(tabRef.current?.querySelectorAll("*") ?? []), tabRef.current!]), 1200);
            setTimeout(() => syncAriaStates([...(tabRef.current?.querySelectorAll("*") ?? []), tabRef.current!]), 3000);
          });
      }, 300);
    } catch (e) {
      console.error(`Error executing useEffect for Table Body Reference:\n${(e as Error).message}`);
    }
  }, [userClass]);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const btnExportTabProfs = btnExportProfsTabRef.current || formRef.current!.querySelector("#btnExport");
      btnExportTabProfs instanceof HTMLButtonElement
        ? addExportFlags(formRef.current)
        : elementNotFound(
            btnExportTabProfs,
            "<button> for triggering generation of spreadsheet in the table for checking professionals",
            extLine(new Error()),
          );
      callbackNormalizeSizesSb();
      syncAriaStates([...formRef.current!.querySelectorAll("*"), formRef.current]);
    } else elementNotFound(formRef?.current, "formRef.current in useEffect() for TableProfForm", extLine(new Error()));
  }, [formRef, callbackNormalizeSizesSb]);
  useEffect(() => {
    if (tabRef.current instanceof HTMLElement) {
      handleClientPermissions(
        userClass,
        ["coordenador", "supervisor"],
        tabRef.current,
        document.getElementById("btnExport"),
      );
    }
  }, [tabRef, userClass]);
  useExportHandler("tabProfExporter", formRef.current);
  useEffect(() => assignFormAttrs(formRef.current));
  return (
    <form
      id='formRemoveProf'
      name='form_profs_table'
      className='formPadded__nosb wid101'
      action='profs_table'
      encType='multipart/form-data'
      method='get'
      target='_top'
      autoComplete='on'
      ref={formRef}>
      <div role='group' className='wsBs flexNoWC cGap1v'>
        <h1 className='mg__3b bolded'>
          <strong id='titleTabProfs'>Tabela de Profissionais Registrados</strong>
        </h1>
        <em>
          <small role='textbox'>
            Verifique aqui as informações para leitura, alteração e remoção de profissionais no projeto.
          </small>
        </em>
        <hr />
      </div>
      <section className='formPadded pdL0' id='sectProfsTab'>
        <table className='table table-striped table-responsive table-hover tabPacs' id='avPacsTab' ref={tabRef}>
          <caption className='caption_t'>
            <strong>
              <small role='textbox'>
                <em>
                  Lista Recuperada da Ficha de Profissionais registrados. Acesse
                  <samp>
                    <a> ROTA_PLACEHOLDER </a>
                  </samp>
                  para cadastrar
                </em>
              </small>
            </strong>
          </caption>
          <colgroup>
            {userClass === "coordenador" && <col></col>}
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            {userClass === "coordenador" && <col></col>}
            {userClass === "coordenador" && <col></col>}
          </colgroup>
          <thead className='thead-dark'>
            <tr id='avPacs-row1'>
              {userClass === "coordenador" && <th scope='col'>CPF</th>}
              <th scope='col'>Nome</th>
              <th scope='col'>Externo</th>
              <th scope='col'>E-mail</th>
              <th scope='col'>Telefone</th>
              <th scope='col'>Área de Atuação</th>
              <th scope='col'>Dia de Trablho</th>
              <th scope='col'>Período de Participação</th>
              {userClass === "coordenador" && <th scope='col'>Alteração</th>}
              {userClass === "coordenador" && <th scope='col'>Exclusão</th>}
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            <span style={{ margin: "2rem", position: "absolute" }}>
              <Spinner
                spinnerClass='spinner-border'
                spinnerColor='text-info'
                message='Loading Professionals Table...'
              />
            </span>
          </tbody>
        </table>
      </section>
      <button
        type='button'
        id='btnExport'
        className='btn btn-success flexAlItCt flexJC flexBasis50 bolded widQ460FullW'
        name='btnExportProfsTab'
        ref={btnExportProfsTabRef}
        data-active='false'
        title='Gere um .xlsx com os dados preenchidos'
        onClick={ev => {
          try {
            if (!exporters.tabProfExporter) exporters.tabProfExporter = new ExportHandler();
            exporters.tabProfExporter.handleExportClick(
              ev,
              "tabelaDeProfissionais",
              document.getElementById("titleTabProfs") ?? formRef.current ?? document,
              `d${new Date().getDate()}_m${new Date().getMonth() + 1}_y${new Date().getFullYear()}`,
            );
          } catch (e) {
            console.error(`Error executing callback:\n${(e as Error).message}`);
          }
          {
            signal: new AbortController().signal;
          }
        }}>
        Gerar Planilha
      </button>
    </form>
  );
}
