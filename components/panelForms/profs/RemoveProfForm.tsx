import { useEffect, useRef, useState, useCallback } from "react";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { normalizeSizeSb } from "@/lib/global/gStyleScript";
import { addListenerExportBtn } from "@/lib/global/gController";
import {
  nullishBtn,
  nullishForm,
  nullishTab,
} from "@/lib/global/declarations/types";
import { GlobalFormProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import ProfRow from "./ProfRow";

export default function RemoveProfForm({
  userClass = "estudante",
}: GlobalFormProps): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState(false);
  const formRef = useRef<nullishForm>(null);
  const tabRef = useRef<nullishTab>(null);
  const tbodyRef = useRef<HTMLTableSectionElement | null>(null);
  const btnExportProfsTabRef = useRef<nullishBtn>(null);
  const callbackNormalizeSizesSb = useCallback(() => {
    normalizeSizeSb(
      [
        ...document.querySelectorAll(".form-padded"),
        ...document.querySelectorAll(".ovFlAut"),
        ...document.querySelectorAll("[scrollbar-width=none]"),
      ],
      [false, 0],
      true,
      [document.getElementById("sectProfsTab")]
    );
    document.querySelector("table")!.style.minHeight = "revert";
  }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const btnExportTabProfs =
        btnExportProfsTabRef.current ||
        formRef.current!.querySelector("#btnExport");
      btnExportTabProfs instanceof HTMLButtonElement
        ? addListenerExportBtn(
            "tab_Profissionais",
            formRef.current,
            document.getElementById("titleTabProfs") || formRef.current
          )
        : elementNotFound(
            btnExportTabProfs,
            "<button> for triggering generation of spreadsheet in the table for checking professionals",
            extLine(new Error())
          );
      callbackNormalizeSizesSb();
      syncAriaStates([
        ...formRef.current!.querySelectorAll("*"),
        formRef.current,
      ]);
    } else
      elementNotFound(
        formRef?.current,
        "formRef.current in useEffect() for RemoveProfForm",
        extLine(new Error())
      );
  }, [formRef]);
  useEffect(() => {
    if (tabRef.current instanceof HTMLElement) {
      handleClientPermissions(
        userClass,
        ["coordenador", "supervisor"],
        tabRef.current,
        document.getElementById("btnExport")
      );
    }
  }, [tabRef]);
  return (
    <form
      id="formRemoveProf"
      name="form_profs_table"
      className="form-padded-nosb wid101"
      action="profs_table"
      encType="multipart/form-data"
      method="get"
      target="_top"
      autoComplete="on"
      ref={formRef}
    >
      <div role="group" className="wsBs flexNoWC cGap1v">
        <h1 className="mg-3b bolded">
          <strong id="titleTabProfs">
            Tabela de Profissionais Registrados
          </strong>
        </h1>
        <em>
          <small role="textbox">
            Verifique aqui as informações para leitura, alteração e remoção de
            profissionais no projeto.
          </small>
        </em>
        <hr />
      </div>
      <section className="form-padded pdL0" id="sectProfsTab">
        <table
          className="table table-striped table-responsive table-hover tabPacs"
          id="avPacsTab"
          ref={tabRef}
        >
          <caption className="caption-t">
            <strong>
              <small role="textbox">
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
          <thead className="thead-dark">
            <tr id="avPacs-row1">
              {userClass === "coordenador" && <th scope="col">CPF</th>}
              <th scope="col">Nome</th>
              <th scope="col">Externo</th>
              <th scope="col">E-mail</th>
              <th scope="col">Telefone</th>
              <th scope="col">Área de Atuação</th>
              <th scope="col">Dia de Trablho</th>
              <th scope="col">Período de Participação</th>
              {userClass === "coordenador" && <th scope="col">Alteração</th>}
              {userClass === "coordenador" && <th scope="col">Exclusão</th>}
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            <ProfRow
              count={2}
              tabRef={tabRef}
              userClass={userClass}
              dispatch={setDisplayRowData}
              state={shouldDisplayRowData}
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
              tabRef={tabRef}
              userClass={userClass}
              dispatch={setDisplayRowData}
              state={shouldDisplayRowData}
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
              tabRef={tabRef}
              userClass={userClass}
              dispatch={setDisplayRowData}
              state={shouldDisplayRowData}
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
            <ProfRow
              count={5}
              tabRef={tabRef}
              userClass={userClass}
              external={true}
              dispatch={setDisplayRowData}
              state={shouldDisplayRowData}
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
              count={6}
              tabRef={tabRef}
              userClass={userClass}
              external={true}
              dispatch={setDisplayRowData}
              state={shouldDisplayRowData}
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
        <div role="group" className="form-padded pdL0 widQ460FullW "></div>
      </section>
      <button
        type="button"
        id="btnExport"
        className="btn btn-success flexAlItCt flexJC flexBasis50 bolded widQ460FullW"
        name="btnExportProfsTab"
        ref={btnExportProfsTabRef}
        title="Gere um .xlsx com os dados preenchidos"
      >
        Gerar Planilha
      </button>
    </form>
  );
}
