import { addExportFlags } from "@/lib/global/gController";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { normalizeSizeSb } from "@/lib/global/gStyleScript";
import { initLoadedTab } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { exporters, navigatorVars } from "@/vars";
import { useEffect, useRef, useCallback, useContext } from "react";
import StudRow from "./StudRow";
import { formCases, nlBtn, nlFm, nlTab } from "@/lib/global/declarations/types";
import { StudInfo } from "@/lib/global/declarations/interfacesCons";
import { assignFormAttrs } from "@/lib/global/gModel";
import { PanelCtx } from "../defs/client/SelectLoader";
import { ExportHandler } from "@/lib/global/declarations/classes";
import useExportHandler from "@/lib/hooks/useExportHandler";
import Link from "next/link";
import { privilege } from "@/lib/locals/basePage/declarations/serverInterfaces";
import { useDataFetch } from "@/lib/hooks/useDataFetch";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import useRevalidate from "@/lib/hooks/useRevalidate";
export default function TabStudForm(): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    formRef = useRef<nlFm>(null),
    tabRef = useRef<nlTab>(null),
    tbodyRef = useRef<HTMLTableSectionElement | null>(null),
    btnExportTabStudsRef = useRef<nlBtn>(null),
    {
      data: studData,
      setData,
      validator,
      loaded,
    } = useDataFetch("studs", tabRef, (stud, i) => (
      <ErrorBoundary
        key={`stud_row_err__${i + 2}`}
        FallbackComponent={() => <GenericErrorComponent message={`Error carregando linha ${i + 1}`} />}>
        <StudRow nRow={i + 2} stud={stud as StudInfo} tabRef={tabRef} key={`stud_row__${i + 2}`} />
      </ErrorBoundary>
    )),
    { caption } = useRevalidate({
      apiRoute: "studs",
      onSuccess: (
        <strong>
          <small role='textbox'>
            <em>
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
      ),
      onError: (
        <strong>
          <small role='textbox' className='noInvert'>
            Erro obtendo dados de estudantes. Aguarde revalidação ou recarregue a página.
          </small>
        </strong>
      ),
      rowFn: (p: { desc: formCases; ind: StudInfo }, i: number) => (
        <ErrorBoundary
          key={`${p.desc}_row_err__${i + 2}`}
          FallbackComponent={() => <GenericErrorComponent message={`Error carregando linha ${i + 1}`} />}>
          <StudRow nRow={i + 2} stud={p.ind} tabRef={tabRef} key={`stud_row__${i + 2}`} />
        </ErrorBoundary>
      ),
      validator,
      dispatch: setData,
      ref: tabRef,
    }),
    callbackNormalizeSizesSb = useCallback(() => {
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
    if (!loaded) return;
    initLoadedTab(tabRef.current, userClass as privilege);
    const btnExportTabStuds = btnExportTabStudsRef.current || formRef.current!.querySelector("#btnExport");
    btnExportTabStuds instanceof HTMLButtonElement
      ? addExportFlags(formRef.current)
      : elementNotFound(
          btnExportTabStuds,
          "<button> for triggering generation of spreadsheet in the table for checking students",
          extLine(new Error()),
        );
    handleClientPermissions(
      userClass,
      ["coordenador", "supervisor"],
      tabRef.current,
      document.getElementById("btnExport"),
    );
    callbackNormalizeSizesSb();
  }, [loaded, tabRef, userClass, callbackNormalizeSizesSb]);
  useExportHandler("tabStudExporter", formRef.current);
  useEffect(() => assignFormAttrs(formRef.current));
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
      <section className='form-padded pdL0 mg-0b' id='sectStudsTab' style={{ overflow: "auto", maxWidth: "97vw" }}>
        <table className='table table-striped table-responsive table-hover tabPacs' id='avPacsTab' ref={tabRef}>
          <caption className='caption-t' style={{ captionSide: "top", paddingBottom: "1.5rem" }}>
            {caption}
          </caption>
          <colgroup>
            {Array.from({ length: 5 }, (_, i) => (
              <col key={`tab_stud_col__${i}`} data-col={i + 1}></col>
            ))}
            {userClass === "coordenador" &&
              Array.from({ length: 4 }, (_, i) => <col key={`tab_stud_col__${i + 6}`} data-col={i + 6}></col>)}
          </colgroup>
          <thead className='thead-dark'>
            <tr id='avPacs-row1' style={{ wordBreak: "keep-all" }}>
              {userClass === "coordenador" && (
                <th scope='col' data-col='1'>
                  CPF
                </th>
              )}
              {userClass === "coordenador" && (
                <th scope='col' data-col='2'>
                  DRE
                </th>
              )}
              {["Nome", "E-mail", "Telefone", "Área de Atividade", "Dia de Atividade", "Período de Atividade"].map(
                (l, i) => (
                  <th key={`tab_stud_th__${i}`} data-col={userClass === "coordenador" ? i + 3 : i + 1}>
                    {l}
                  </th>
                ),
              )}
              {userClass === "coordenador" && (
                <th scope='col' data-col='9'>
                  Alteração
                </th>
              )}
              {userClass === "coordenador" && (
                <th scope='col' data-col='10'>
                  Exclusão
                </th>
              )}
            </tr>
          </thead>
          <ErrorBoundary
            FallbackComponent={() => (
              <GenericErrorComponent
                message={
                  navigatorVars.pt ? `Houve algum erro criando a tabela!` : `There was some error creating the table`
                }
              />
            )}>
            <tbody ref={tbodyRef}>{studData}</tbody>
          </ErrorBoundary>
        </table>
      </section>
      <button
        type='button'
        id='btnExport'
        className='btn btn-success flexAlItCt flexJC flexBasis50 bolded widQ460FullW'
        name='btnExportTabStuds'
        ref={btnExportTabStudsRef}
        data-active='false'
        title='Gere um .xlsx com os dados preenchidos'
        onClick={ev => {
          if (!exporters.tabStudExporter) exporters.tabStudExporter = new ExportHandler();
          exporters.tabStudExporter.handleExportClick(
            ev,
            "tabelaDeEstudantes",
            document.getElementById("titleTabStuds") ?? formRef.current ?? document,
            `d${new Date().getDate()}_m${new Date().getMonth() + 1}_y${new Date().getFullYear()}`,
          );
        }}>
        Gerar Planilha
      </button>
    </form>
  );
}
