import { ErrorBoundary } from "react-error-boundary";
import { addListenerExportBtn } from "@/lib/global/gController";
import { createRoot } from "react-dom/client";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { equalizeTabCells, normalizeSizeSb } from "@/lib/global/gStyleScript";
import { fillTabAttr } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { handleFetch } from "@/lib/locals/panelPage/handlers/handlers";
import { panelRoots } from "@/vars";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useCallback, useContext } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import Spinner from "../../icons/Spinner";
import StudRow from "./StudRow";
import { nullishBtn, nullishForm, nullishTab, nullishTabSect } from "@/lib/global/declarations/types";
import { StudInfo } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import { assignFormAttrs } from "@/lib/global/gModel";
import { PanelCtx } from "../defs/client/SelectLoader";
export default function RemoveStudForm(): JSX.Element {
  const userClass = useContext(PanelCtx).userClass;
  const studs: StudInfo[] = [];
  const formRef = useRef<nullishForm>(null);
  const tabRef = useRef<nullishTab>(null);
  const tbodyRef = useRef<HTMLTableSectionElement | null>(null);
  const btnExportTabStudsRef = useRef<nullishBtn>(null);
  const callbackNormalizeSizeSb = useCallback(() => {
    normalizeSizeSb(
      [
        ...document.querySelectorAll(".form-padded"),
        ...document.querySelectorAll(".ovFlAut"),
        ...document.querySelectorAll("[scrollbar-width=none]"),
      ],
      [false, 0],
      true,
      [document.getElementById("sectStudsTab")],
    );
    document.querySelector("table")!.style.minHeight = "revert";
  }, []);
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
                        <caption className='caption-t'>
                          <strong>
                            <small role='textbox'>
                              <em>
                                Lista Recuperada da Ficha de Estudantes registrados. Acesse
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
                            {userClass === "coordenador" && <th scope='col'>DRE</th>}
                            <th scope='col'>Nome</th>
                            <th scope='col'>E-mail</th>
                            <th scope='col'>Telefone</th>
                            <th scope='col'>Área de Atividade</th>
                            <th scope='col'>Dia de Atividade</th>
                            <th scope='col'>Período de Atividade</th>
                            {userClass === "coordenador" && <th scope='col'>Alteração</th>}
                            {userClass === "coordenador" && <th scope='col'>Exclusão</th>}
                          </tr>
                        </thead>
                        <tbody ref={tbodyRef}>
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
                    tbodyRef.current = document.getElementById("studsTbody") as nullishTabSect;
                    if (!(tbodyRef.current instanceof HTMLElement))
                      throw elementNotFound(tbodyRef.current, `Validation of replaced tbody`, extLine(new Error()));
                    if (!panelRoots[`${tbodyRef.current.id}`])
                      panelRoots[`${tbodyRef.current.id}`] = createRoot(tbodyRef.current);
                    if (!tbodyRef.current.querySelector("tr"))
                      panelRoots[`${tbodyRef.current.id}`]?.render(
                        studs.map((stud, i) => (
                          <StudRow nRow={i + 2} stud={stud} tabRef={tabRef} key={`stud_row__${i + 2}`} />
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
                  studs.map((stud, i) => {
                    return Array.from(tbodyRef.current?.querySelectorAll("output") ?? []).some(
                      outp => outp.innerText === (stud as StudInfo)["cpf"],
                    ) ||
                      Array.from(tbodyRef.current?.querySelectorAll("tr") ?? []).some(
                        tr => tr.dataset.key && tbodyRef.current?.querySelector(`tr[data-key=${tr.dataset.key}`),
                      ) ? (
                      <></>
                    ) : (
                      <StudRow nRow={i + 2} stud={stud} tabRef={tabRef} key={`stud_row__${i + 2}`} />
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
          .catch(e => console.error(`Failed to fetch from Students Table: ${e.message}`))
          .finally(() => {
            setTimeout(() => syncAriaStates([...(tabRef.current?.querySelectorAll("*") ?? []), tabRef.current!]), 1200);
            setTimeout(() => syncAriaStates([...(tabRef.current?.querySelectorAll("*") ?? []), tabRef.current!]), 3000);
          });
      }, 300);
      assignFormAttrs(formRef.current);
    } catch (e) {
      console.error(`Error executing useEffect for Table Body Reference:\n${(e as Error).message}`);
    }
  }, [userClass]);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const btnExportTabStuds = btnExportTabStudsRef.current || formRef.current!.querySelector("#btnExport");
      btnExportTabStuds instanceof HTMLButtonElement
        ? addListenerExportBtn(
            "tab_Estudantes",
            formRef.current,
            document.getElementById("titleTabStuds") || formRef.current,
          )
        : elementNotFound(
            btnExportTabStuds,
            "<button> for triggering generation of spreadsheet in the table for checking students",
            extLine(new Error()),
          );
      callbackNormalizeSizeSb();
      syncAriaStates([...formRef.current!.querySelectorAll("*"), formRef.current]);
    } else elementNotFound(formRef?.current, "formRef.current in useEffect() for RemoveStudForm", extLine(new Error()));
  }, [formRef, callbackNormalizeSizeSb]);
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
  return (
    <form
      id='formRemoveStud'
      name='form_studs_table'
      action='studs_table'
      encType='multipart/form-data'
      method='get'
      target='_top'
      ref={formRef}
      className='form-padded-nosb wid101'>
      <div role='group' className='wsBs flexNoWC cGap1v'>
        <h1 className='mg-3b bolded'>
          <strong id='titleTabStuds'>Tabela de Estudantes Registrados</strong>
        </h1>
        <em>
          <small role='textbox'>Verifique aqui as informações para leitura, alteração e remoção de estudantes</small>
        </em>
      </div>
      <hr />
      <section className='form-padded pdL0 mg-0b' id='sectStudsTab'>
        <table className='table table-striped table-responsive table-hover tabPacs' id='avPacsTab' ref={tabRef}>
          <caption className='caption-t'>
            <strong>
              <small role='textbox'>
                <em>
                  Lista Recuperada da Ficha de Estudantes registrados. Acesse
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
              {userClass === "coordenador" && <th scope='col'>DRE</th>}
              <th scope='col'>Nome</th>
              <th scope='col'>E-mail</th>
              <th scope='col'>Telefone</th>
              <th scope='col'>Área de Atividade</th>
              <th scope='col'>Dia de Atividade</th>
              <th scope='col'>Período de Atividade</th>
              {userClass === "coordenador" && <th scope='col'>Alteração</th>}
              {userClass === "coordenador" && <th scope='col'>Exclusão</th>}
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            <span style={{ margin: "2rem", position: "absolute" }}>
              <Spinner spinnerClass='spinner-border' spinnerColor='text-info' message='Loading Students Table...' />
            </span>
          </tbody>
        </table>
      </section>
      <button
        type='button'
        id='btnExport'
        className='btn btn-success flexAlItCt flexJC flexBasis50 bolded widQ460FullW'
        name='btnExportTabStuds'
        ref={btnExportTabStudsRef}
        data-active='false'
        title='Gere um .xlsx com os dados preenchidos'>
        Gerar Planilha
      </button>
    </form>
  );
}
