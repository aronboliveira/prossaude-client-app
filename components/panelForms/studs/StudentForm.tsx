import { useEffect, useRef, useState, useCallback } from "react";
import ReseterBtn from "../defs/ReseterBtn";
import { GlobalFormProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import {
  nullishBtn,
  nullishForm,
  nullishInp,
} from "@/lib/global/declarations/types";
import { DataProvider } from "@/lib/locals/panelPage/declarations/classesCons";
import { panelFormsVariables } from "../panelFormsData";
import {
  addEmailExtension,
  autoCapitalizeInputs,
  formatCPF,
  formatTel,
} from "@/lib/global/gModel";
import {
  elementNotFound,
  elementNotPopulated,
  extLine,
  inputNotFound,
} from "@/lib/global/handlers/errorHandler";
import { clearPhDates, normalizeSizeSb } from "@/lib/global/gStyleScript";
import { subForm, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { addListenerExportBtn } from "@/lib/global/gController";
import { globalDataProvider } from "@/pages/panel";

export default function StudentForm({
  mainRoot,
  userClass = "estudante",
}: GlobalFormProps): JSX.Element {
  const [showForm] = useState<boolean>(true);
  const formRef = useRef<nullishForm>(null);
  const CPFStudRef = useRef<nullishInp>(null);
  const telStudRef = useRef<nullishInp>(null);
  const btnExportStudsRef = useRef<nullishBtn>(null);
  const callbackNormalizeSizeSb = useCallback(() => {
    normalizeSizeSb([
      ...document.querySelectorAll(".form-padded"),
      ...document.querySelectorAll(".ovFlAut"),
      ...document.querySelectorAll("[scrollbar-width=none]"),
    ]);
  }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      const studDataProvider = new DataProvider(
        DataProvider.persistSessionEntries(formRef.current)
      );
      globalDataProvider &&
        globalDataProvider.initPersist(
          formRef.current,
          studDataProvider,
          globalDataProvider
        );
      const emailInput = formRef.current.querySelector("#inpEmailStud");
      const nameInput = formRef.current.querySelector("#inpNameStud");
      const dateInputs = Array.from(
        formRef.current.querySelectorAll('input[type="date"]')
      );
      const toggleAutoFill = document.getElementById("deactAutofilltBtnStud");
      const toggleAutocorrect = document.getElementById(
        "deactAutocorrectBtnStud"
      );
      //adição de listeners para autopreenchimento
      if (toggleAutoFill instanceof HTMLInputElement) {
        toggleAutoFill.checked = true;
        panelFormsVariables.isAutofillStudOn = true;
        toggleAutoFill.addEventListener("change", () => {
          panelFormsVariables.isAutofillStudOn =
            !panelFormsVariables.isAutofillStudOn;
          emailInput instanceof HTMLInputElement &&
            addEmailExtension(emailInput);
          CPFStudRef.current instanceof HTMLInputElement &&
            formatCPF(CPFStudRef.current);
          telStudRef.current instanceof HTMLInputElement &&
            formatTel(telStudRef.current);
        });
      } else
        inputNotFound(
          toggleAutoFill,
          "Element for toggling autofill in new Student form",
          extLine(new Error())
        );
      if (
        toggleAutocorrect instanceof HTMLInputElement &&
        (toggleAutocorrect.type === "checkbox" ||
          toggleAutocorrect.type === "radio")
      ) {
        toggleAutocorrect.checked = true;
        panelFormsVariables.isAutocorrectStudOn = true;
        toggleAutocorrect.addEventListener("change", () => {
          panelFormsVariables.isAutocorrectStudOn =
            !panelFormsVariables.isAutocorrectStudOn;
          nameInput instanceof HTMLInputElement &&
            autoCapitalizeInputs(nameInput);
        });
      } else
        elementNotFound(
          toggleAutocorrect,
          `toggleAutocorrect in StudentForm`,
          extLine(new Error())
        );
      nameInput instanceof HTMLInputElement
        ? nameInput.addEventListener("input", () => {
            toggleAutocorrect instanceof HTMLInputElement &&
            toggleAutocorrect.checked === true
              ? (panelFormsVariables.isAutocorrectStudOn = true)
              : (panelFormsVariables.isAutocorrectStudOn = false);
            autoCapitalizeInputs(
              nameInput,
              panelFormsVariables.isAutocorrectStudOn
            );
          })
        : inputNotFound(
            nameInput,
            "nameInput in form for new Student register",
            extLine(new Error())
          );
      if (emailInput instanceof HTMLInputElement) {
        emailInput.addEventListener("input", () => {
          (panelFormsVariables.isAutofillStudOn ||
            (toggleAutoFill instanceof HTMLInputElement &&
              toggleAutoFill.checked)) &&
            addEmailExtension(emailInput);
        });
        emailInput.addEventListener("click", () => {
          (panelFormsVariables.isAutofillStudOn ||
            (toggleAutoFill instanceof HTMLInputElement &&
              toggleAutoFill.checked)) &&
            addEmailExtension(emailInput);
        });
      } else
        inputNotFound(
          emailInput,
          "emailInput in form for new students",
          extLine(new Error())
        );
      //adição de listener para submissão
      const btnSubmitStud = document.getElementById("btnSubmitNewStud");
      if (btnSubmitStud instanceof HTMLButtonElement) {
        (userClass === "coordenador" || userClass === "supervisor") &&
          btnSubmitStud.addEventListener("click", click => {
            const validation = subForm(btnSubmitStud, formRef.current!);
            if (!validation) click.preventDefault();
          });
        (userClass === "coordenador" || userClass === "supervisor") &&
          formRef.current!.addEventListener("submit", submit => {
            const validation = subForm(btnSubmitStud, formRef.current!);
            if (!validation) submit.preventDefault();
          });
      } else
        elementNotFound(
          btnSubmitStud,
          "Button for submiting new student form",
          extLine(new Error())
        );
      //adição de listener para exportar excel
      const exportBtn =
        btnExportStudsRef.current || document.querySelector("#btnExport");
      exportBtn instanceof HTMLButtonElement
        ? addListenerExportBtn(
            "novoEstudante",
            formRef.current,
            nameInput as HTMLElement | null
          )
        : elementNotFound(
            exportBtn,
            "exportBtn in New Student form",
            extLine(new Error())
          );
      //chamadas de estilização
      if (
        dateInputs.length > 0 &&
        dateInputs.every(
          inp => inp instanceof HTMLInputElement && inp.type === "date"
        )
      ) {
        clearPhDates(dateInputs);
        for (const dateInp of dateInputs) {
          (dateInp as HTMLInputElement).value = `${new Date().getFullYear()}-${(
            new Date().getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date()
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          (dateInp as HTMLInputElement).style.color = "initial";
        }
      } else
        elementNotPopulated(
          dateInputs,
          "dateInputs in form for new students",
          extLine(new Error())
        );
      callbackNormalizeSizeSb();
      syncAriaStates([
        ...formRef.current!.querySelectorAll("*"),
        formRef.current,
      ]);
    } else
      inputNotFound(
        formRef.current,
        "formRef.current in useEffect()",
        extLine(new Error())
      );
  }, [formRef]);
  useEffect(() => {
    if (
      CPFStudRef.current instanceof HTMLInputElement &&
      CPFStudRef.current.id.match(/cpf/gi)
    ) {
      //adição de listener para corrigir cpf
      CPFStudRef.current.addEventListener("input", () => {
        panelFormsVariables.isAutofillStudOn && formatCPF(CPFStudRef.current);
      });
    }
  }, [CPFStudRef.current]);
  useEffect(() => {
    if (
      telStudRef?.current instanceof HTMLInputElement &&
      telStudRef.current.id.match(/tel/gi)
    ) {
      //adição de listener para corrigir telefone
      telStudRef.current.addEventListener("input", () => {
        panelFormsVariables.isAutofillStudOn &&
          formatTel(telStudRef.current, true);
      });
    } else
      inputNotFound(
        telStudRef.current,
        "telStudRef.current in useEffect()",
        extLine(new Error())
      );
  }, [telStudRef.current]);
  useEffect(() => {
    if (formRef.current instanceof HTMLElement)
      handleClientPermissions(
        userClass,
        ["supervisor", "coordenador"],
        ...document.getElementsByTagName("input"),
        ...document.getElementsByTagName("button"),
        ...document.querySelector("form")!.getElementsByTagName("select")
      );
  }, [formRef]);
  return (
    <>
      {showForm && (
        <form
          id="formAddStud"
          name="formStudName"
          action="#"
          method="post"
          target="_top"
          ref={formRef}
        >
          <div role="group" id="formAddStudHDiv" className="mg-3b">
            <h1 id="titleAddStudHBlock" className="bolded">
              <strong>Cadastro de Aluno</strong>
            </h1>
            <small role="textbox" id="detailsAddStudHBlock">
              <em>Detalhe aqui os dados de entrada para um novo estudante</em>
            </small>
          </div>
          <div role="group" className="flexNoWR flexQ460NoWC">
            <span
              role="group"
              className="form-switch spanRight"
              id="autocorrectDivStud"
            >
              <input
                type="checkbox"
                className="deActBtn form-check-input"
                role="switch"
                id="deactAutocorrectBtnStud"
                title="Correção automática de Nomes"
                data-title="Autocorreção(Estudante)"
              />{" "}
              <strong>Autocorreção</strong>
            </span>
            <span
              role="group"
              className="form-switch spanRight"
              id="autofillDivStud"
            >
              <input
                type="checkbox"
                className="deActBtn form-check-input"
                role="switch"
                id="deactAutofilltBtnStud"
                title="Correção automática de CPF, Telefone e E-mail"
                data-title="Autopreenchimento(Estudante)"
              />{" "}
              <strong>Autopreenchimento</strong>
            </span>
          </div>
          <hr className="rdc05rHr460Q" />
          <fieldset className="flexColumn" id="formAddStudBodyFs">
            <label htmlFor="inpNameStud">
              <strong id="titleNameStud">Nome Completo:</strong>
              <input
                type="text"
                list="listStudRegstName"
                id="inpNameStud"
                className="form-control autocorrectAll ssPersist"
                maxLength={999}
                placeholder="Preencha com o nome completo"
                autoFocus
                autoComplete="given-name"
                autoCapitalize="true"
                data-title="Nome Completo: Aluno"
                required
              />
              <datalist id="listStudRegstName"></datalist>
            </label>
            <label htmlFor="inpCPFStud">
              <strong id="titleCPFStud">CPF:</strong>
              <input
                type="text"
                list="listStudRegstCPF"
                id="inpCPFStud"
                className="form-control ssPersist"
                maxLength={16}
                placeholder="Preencha com o CPF"
                autoComplete="username"
                pattern="^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$"
                data-title="CPF"
                required
                ref={CPFStudRef}
              />
              <datalist id="listStudRegstCPF"></datalist>
            </label>
            <label htmlFor="inpDRE">
              <strong id="titleDREStud">DRE:</strong>
              <input
                type="number"
                id="inpDRE"
                className="form-control ssPersist"
                list="listStudRegstDRE"
                maxLength={12}
                pattern="/^\d{9,}$/"
                placeholder="Preencha com o DRE"
                autoComplete="username"
                data-title="DRE"
                required
              />
              <datalist id="listStudRegstDRE"></datalist>
            </label>
            <label htmlFor="inpTel">
              <strong id="titleTelStud">Telefone (com DDD):</strong>
              <input
                type="tel"
                list="listStudRegstTel"
                id="inpTel"
                pattern="/^(\+\d{2}\s?)?(\(\d{2}\)\s?)?\d{3,5}[-\s]?\d{4}$/"
                className="form-control ssPersist"
                maxLength={20}
                placeholder="Preencha com o Telefone para contato"
                autoComplete="tel"
                data-title="Telefone"
                required
                ref={telStudRef}
              />
              <datalist id="listStudRegstTel"></datalist>
            </label>
            <label htmlFor="inpEmailStud">
              <strong id="titleEmailStud" className="forceInvert">
                E-mail:
              </strong>
              <input
                type="email"
                list="listStudRegstEmail"
                id="inpEmailStud"
                className="form-control ssPersist"
                maxLength={20}
                placeholder="Preencha com o E-mail para contato"
                autoComplete="email"
                data-title="E-mail"
              />
              <datalist id="listStudRegstEmail"></datalist>
            </label>
            <label htmlFor="inpCourseStud">
              <strong id="titleOrigStud">Curso de Origem:</strong>
              <input
                type="text"
                list="listCoursesStud"
                id="inpCourseStud"
                className="form-control ssPersist"
                maxLength={99}
                placeholder="Preencha com o Curso do Estudante"
                autoCapitalize="true"
                data-title="Curso de Origem do Estudante"
                required
              />
              <datalist id="listCoursesStud">
                <option value="Educação Física"></option>
                <option value="Medicina"></option>
                <option value="Nutrição"></option>
                <option value="Odontologia"></option>
                <option value="Psicologia"></option>
              </datalist>
            </label>
            <label htmlFor="inpAtuacaoStud">
              <strong id="titleActStud" className="forceInvert">
                Área de atuação:
              </strong>
              <select
                id="inpAtuacaoStud"
                className="form-select ssPersist"
                data-title="Área de Atuação do Estudante"
                required
              >
                <option value="educacaofisicanut">
                  Educação Física & Nutrição
                </option>
                <option value="odontologia">Odontologia</option>
                <option value="psiq">Psiquiatria & Psicologia</option>
              </select>
            </label>
            <label htmlFor="inpPeriodo">
              <strong>Período Atual:</strong>
              <input
                type="number"
                id="inpPeriodo"
                min={1}
                max={20}
                maxLength={2}
                className="form-control ssPersist"
                placeholder="Preencha com o Período Atual do aluno (em número simples)"
                data-title="Período Atual Estudante"
                required
              />
              <datalist id="listPeriodos">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
                <option value="7"></option>
                <option value="8"></option>
                <option value="9"></option>
                <option value="10"></option>
                <option value="11"></option>
                <option value="12"></option>
                <option value="13"></option>
                <option value="14"></option>
                <option value="15"></option>
              </datalist>
            </label>
            <label htmlFor="inpEntr">
              <strong>Período de Entrada no Projeto:</strong>
              <input
                type="text"
                id="inpEntr"
                min={1}
                max={20}
                maxLength={2}
                className="form-control ssPersist"
                placeholder="Preencha com o Período do Aluno (ano.semestre, em número) na sua entrada"
                data-title="Período de Entrada do aluno"
              />
            </label>
            <label htmlFor="inpDayEntr" className="forceInvert">
              <strong className="forceInvert">
                Dia de Entrada no Projeto:
              </strong>
              <input
                type="date"
                id="inpDayEntr"
                min={1}
                max={31}
                maxLength={3}
                className="form-control forceInvert ssPersist"
                placeholder="Preencha com o Dia de Entrada do Aluno no projeto"
                data-title="Dia de Entrada do aluno"
                required
              />
            </label>
            <span role="group" id="spanDias" className="mg-3b flexNoWC rGap1v">
              <strong className="forceInvert">Dias de Atividade:</strong>
              <div
                role="group"
                id="divDiasAtv"
                className="flexSimple flexLineDiv flexQ460R"
              >
                <label className="flexWR gapped1v" id="labQuarta">
                  <slot
                    className="bolded lcPersist"
                    role="textbox"
                    id="titleQuarta"
                    contentEditable="true"
                    title="Modifique o rótulo de dia selecionando-o e digitando"
                  >
                    Quarta-feira
                  </slot>
                  <input
                    type="checkbox"
                    id="checkQuarta"
                    className="form-check-input mdGreen ssPersist"
                    data-title="Quarta-feira"
                  />
                </label>
                <label className="flexWR gapped1v" id="labSexta">
                  <slot
                    className="bolded lcPersist"
                    role="textbox"
                    id="titleSexta"
                    contentEditable="true"
                    title="Modifique o rótulo de dia selecionando-o e digitando"
                  >
                    Sexta-Feira
                  </slot>
                  <input
                    type="checkbox"
                    id="checkSexta"
                    className="form-check-input mdGreen ssPersist"
                    data-title="Sexta-feira"
                  />
                </label>
              </div>
            </span>
            <div
              role="group"
              className="flexNoW flexJSe cGap2v flexAlItCt flexQ900NoWC rGapQ9002v noInvert"
            >
              <button
                type="submit"
                id="btnSubmitNewStud"
                className="btn btn-success flexAlItCt flexJC flexBasis50 widFull noInvert"
                formAction="#"
              >
                <strong>Finalizar Cadastro</strong>
              </button>
              <button
                id="btnExport"
                type="button"
                className="btn btn-primary flexAlItCt flexJC flexBasis50 widFull bolded noInvert"
                ref={btnExportStudsRef}
                title="Gere um .xlsx com os dados preenchidos"
              >
                Gerar Planilha
              </button>
              <ReseterBtn
                root={mainRoot}
                renderForm={
                  <StudentForm mainRoot={mainRoot} userClass={userClass} />
                }
              />
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
}
