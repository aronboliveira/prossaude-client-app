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
import StudRow from "./StudRow";

export default function RemoveStudForm({
  userClass = "estudante",
}: GlobalFormProps): JSX.Element {
  const [shouldDisplayRowData, setDisplayRowData] = useState<boolean>(false);
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
      [document.getElementById("sectStudsTab")]
    );
    document.querySelector("table")!.style.minHeight = "revert";
  }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const btnExportTabStuds =
        btnExportTabStudsRef.current ||
        formRef.current!.querySelector("#btnExport");
      btnExportTabStuds instanceof HTMLButtonElement
        ? addListenerExportBtn(
            "tab_Estudantes",
            formRef.current,
            document.getElementById("titleTabStuds") || formRef.current
          )
        : elementNotFound(
            btnExportTabStuds,
            "<button> for triggering generation of spreadsheet in the table for checking students",
            extLine(new Error())
          );
      callbackNormalizeSizeSb();
      syncAriaStates([
        ...formRef.current!.querySelectorAll("*"),
        formRef.current,
      ]);
    } else
      elementNotFound(
        formRef?.current,
        "formRef.current in useEffect() for RemoveStudForm",
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
      id="formRemoveStud"
      name="formRemoveStudName"
      action="#"
      method="post"
      target="_top"
      ref={formRef}
      className="form-padded-nosb wid101"
    >
      <div role="group" className="wsBs flexNoWC cGap1v">
        <h1 className="mg-3b bolded">
          <strong id="titleTabStuds">Tabela de Estudantes Registrados</strong>
        </h1>
        <em>
          <small role="textbox">
            Verifique aqui as informações para leitura, alteração e remoção de
            estudantes
          </small>
        </em>
      </div>
      <hr />
      <section className="form-padded pdL0 mg-0b" id="sectStudsTab">
        <table
          className="table table-striped table-responsive table-hover tabPacs"
          id="avPacsTab"
          ref={tabRef}
        >
          <caption className="caption-t">
            <strong>
              <small role="textbox">
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
          <thead className="thead-dark">
            <tr id="avPacs-row1">
              {userClass === "coordenador" && <th scope="col">CPF</th>}
              {userClass === "coordenador" && <th scope="col">DRE</th>}
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Telefone</th>
              <th scope="col">Área de Atividade</th>
              <th scope="col">Dia de Atividade</th>
              <th scope="col">Período de Atividade</th>
              {userClass === "coordenador" && <th scope="col">Alteração</th>}
              {userClass === "coordenador" && <th scope="col">Exclusão</th>}
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            <StudRow
              dispatch={setDisplayRowData}
              count={2}
              tabRef={tabRef}
              userClass={userClass}
              state={shouldDisplayRowData}
              studInfo={{
                name: "Maria Eduarda Augusta",
                email: "mariaeduarda2001@gmail.com",
                tel: "+55 11 99887-2233",
                area: " Odontologia",
                day: "Sexta-feira",
                interv: "25/07/2023 – Presente",
                dre: "123456789",
                cpf: "123.456.789-12",
              }}
            />
            <StudRow
              dispatch={setDisplayRowData}
              count={3}
              tabRef={tabRef}
              userClass={userClass}
              state={shouldDisplayRowData}
              studInfo={{
                name: "Josefina Guedes Pereira",
                email: "josefinaguedes@gmail.com",
                tel: "+55 22 99777-1111",
                area: "Odontologia",
                day: "Quarta-feira",
                interv: "25/07/2023 – Presente",
                dre: "987654321",
                cpf: "123.789.456-22",
              }}
            />
            <StudRow
              dispatch={setDisplayRowData}
              count={4}
              tabRef={tabRef}
              userClass={userClass}
              state={shouldDisplayRowData}
              studInfo={{
                name: "Augusto Duarte Fonseca",
                email: "",
                tel: "+55 21 922334-2233",
                area: "Educação Física",
                day: "Quarta-feira",
                interv: "25/07/2023 – Presente",
                dre: "111222333",
                cpf: "789.123.456-78",
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
        name="btnExportTabStuds"
        ref={btnExportTabStudsRef}
        title="Gere um .xlsx com os dados preenchidos"
      >
        Gerar Planilha
      </button>
    </form>
  );
}
