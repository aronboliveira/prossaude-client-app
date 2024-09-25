import { GlobalFormProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { addListenerExportBtn } from "@/lib/global/gController";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { normalizeSizeSb } from "@/lib/global/gStyleScript";
import { nullishBtn, nullishForm } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState, useCallback } from "react";
import PacList from "../../lists/PacList";
export default function PacTabForm({ userClass = "estudante" }: GlobalFormProps): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState<boolean>(false);
  const formRef = useRef<nullishForm>(null);
  const btnExportPacsTabRef = useRef<nullishBtn>(null);
  const callbackNormalizeSizesSb = useCallback(() => {
    normalizeSizeSb(
      [
        ...document.querySelectorAll(".form-padded"),
        ...document.querySelectorAll(".ovFlAut"),
        ...document.querySelectorAll("[scrollbar-width=none]"),
      ],
      [false, 0],
      true,
      [document.getElementById("sectPacsTab")]
    );
    document.querySelector("table")!.style.minHeight = "revert";
    const nextDiv = document.getElementById("sectsPacsTab")?.nextElementSibling;
    if (nextDiv?.id === "" && nextDiv instanceof HTMLDivElement) nextDiv.remove() as void;
  }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const btnExportTabPacs = btnExportPacsTabRef.current || formRef.current!.querySelector("#btnExport");
      btnExportTabPacs instanceof HTMLButtonElement
        ? addListenerExportBtn(
            "tab_Pacissionais",
            formRef.current,
            document.getElementById("titleTabPacs") || formRef.current
          )
        : elementNotFound(
            btnExportTabPacs,
            "<button> for triggering generation of spreadsheet in the table for checking pacients",
            extLine(new Error())
          );
      callbackNormalizeSizesSb();
      syncAriaStates([...formRef.current!.querySelectorAll("*"), formRef.current]);
    } else elementNotFound(formRef?.current, "formRef.current in useEffect() for PacTabForm", extLine(new Error()));
  }, [formRef]);
  return (
    <form
      id='formRemovePac'
      name='form_pacs_table'
      className='form-padded-nosb wid101'
      action='patients_table'
      method='get'
      target='_top'
      ref={formRef}
    >
      <div role='group' className='wsBs flexNoWC cGap1v'>
        <h1 className='mg-3b bolded'>
          <strong id='titleTabPacs'>Tabela de Pacientes Registrados</strong>
        </h1>
        <em>
          <small role='textbox'>
            Verifique aqui as informações para leitura, alteração e remoção de pacissionais no projeto.
          </small>
        </em>
        <hr />
      </div>
      <section className='form-padded pdL0' id='sectPacsTab'>
        <PacList
          setDisplayRowData={setDisplayRowData}
          shouldDisplayRowData={shouldDisplayRowData}
          shouldShowAlocBtn={false}
          userClass={userClass}
        />
        <div role='group' className='form-padded pdL0 widQ460FullW '></div>
      </section>
      <button
        type='button'
        id='btnExport'
        className='btn btn-success flexAlItCt flexJC flexBasis50 bolded widQ460FullW'
        name='btnExportPacsTab'
        ref={btnExportPacsTabRef}
        title='Gere um .xlsx com os dados preenchidos'
      >
        Gerar Planilha
      </button>
    </form>
  );
}
