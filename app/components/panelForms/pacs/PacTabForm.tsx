import { addExportFlags } from "@/lib/global/gController";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { normalizeSizeSb } from "@/lib/global/gStyleScript";
import { nlBtn, nlFm } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState, useCallback } from "react";
import PacList from "../../lists/PacList";
import { assignFormAttrs } from "@/lib/global/gModel";
import { ExportHandler } from "@/lib/global/declarations/classes";
import { exporters } from "@/vars";
import useExportHandler from "@/lib/hooks/useExportHandler";
export default function PacTabForm(): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState<boolean>(false),
    formRef = useRef<nlFm>(null),
    btnExportPacsTabRef = useRef<nlBtn>(null),
    callbackNormalizeSizesSb = useCallback(() => {
      normalizeSizeSb(
        [
          ...document.querySelectorAll(".formPadded"),
          ...document.querySelectorAll(".ovFlAut"),
          ...document.querySelectorAll("[scrollbar-width=none]"),
        ],
        [false, 0],
        true,
        [document.getElementById("sectPacsTab")],
      );
      document.querySelector("table")!.style.minHeight = "revert";
      const nextDiv = document.getElementById("sectsPacsTab")?.nextElementSibling;
      if (nextDiv?.id === "" && nextDiv instanceof HTMLDivElement) nextDiv.remove() as void;
    }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const btnExportTabPacs = btnExportPacsTabRef.current || formRef.current!.querySelector("#btnExport");
      btnExportTabPacs instanceof HTMLButtonElement
        ? addExportFlags(formRef.current)
        : elementNotFound(
            btnExportTabPacs,
            "<button> for triggering generation of spreadsheet in the table for checking pacients",
            extLine(new Error()),
          );
      callbackNormalizeSizesSb();
      syncAriaStates([...formRef.current!.querySelectorAll("*"), formRef.current]);
    } else elementNotFound(formRef?.current, "formRef.current in useEffect() for PacTabForm", extLine(new Error()));
  }, [formRef, callbackNormalizeSizesSb]);
  useExportHandler("pacExporter", formRef.current);
  useEffect(() => assignFormAttrs(formRef.current));
  return (
    <form
      id='formRemovePac'
      name='form_pacs_table'
      className='formPadded__nosb wid101'
      action='patients_table'
      method='get'
      target='_top'
      ref={formRef}>
      <div role='group' className='wsBs flexNoWC cGap1v'>
        <h1 className='mg__3b bolded'>
          <strong id='titleTabPacs'>Tabela de Pacientes Registrados</strong>
        </h1>
        <em>
          <small role='textbox'>
            Verifique aqui as informações para leitura, alteração e remoção de pacissionais no projeto.
          </small>
        </em>
        <hr />
      </div>
      <section className='formPadded pdL0' id='sectPacsTab'>
        <PacList
          setDisplayRowData={setDisplayRowData}
          shouldDisplayRowData={shouldDisplayRowData}
          shouldShowAlocBtn={false}
        />
        <div role='group' className='formPadded pdL0 widQ460FullW '></div>
      </section>
      <button
        type='button'
        id='btnExport'
        className='btn btn-success flexAlItCt flexJC flexBasis50 bolded widQ460FullW'
        name='btnExportPacsTab'
        ref={btnExportPacsTabRef}
        data-active='false'
        title='Gere um .xlsx com os dados preenchidos'
        onClick={ev => {
          if (!exporters.pacExporter) exporters.pacExporter = new ExportHandler();
          exporters.pacExporter.handleExportClick(
            ev,
            `tabelaDePacientes__d${new Date().getDay()}_m${new Date().getMonth() + 1}_y${new Date().getFullYear()}`,
            formRef.current,
            document.getElementById("titleTabPacs") || formRef.current,
          ),
            { signal: new AbortController().signal };
        }}>
        Gerar Planilha
      </button>
    </form>
  );
}
