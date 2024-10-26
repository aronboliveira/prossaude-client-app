import { ErrorBoundary } from "react-error-boundary";
import { addExportFlags } from "@/lib/global/gController";
import { clearPhDates, normalizeSizeSb } from "@/lib/global/gStyleScript";
import { providers, panelRoots, exporters } from "@/vars";
import { handleClientPermissions } from "@/lib/locals/panelPage/handlers/consHandlerUsers";
import { handleSubmit } from "@/lib/global/data-service";
import { panelFormsVariables } from "../panelFormsData";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import ReseterBtn from "../defs/ReseterBtn";
import { nlBtn, nlFm, nlInp } from "@/lib/global/declarations/types";
import { addEmailExtension, assignFormAttrs, autoCapitalizeInputs, formatCPF, formatTel } from "@/lib/global/gModel";
import { elementNotFound, elementNotPopulated, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { handleCondtReq, handleEventReq, validateForm, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { PanelCtx } from "../defs/client/SelectLoader";
import { ExportHandler } from "@/lib/global/declarations/classes";
import useExportHandler from "@/lib/hooks/useExportHandler";
export default function StudentForm(): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    [showForm] = useState<boolean>(true),
    formRef = useRef<nlFm>(null),
    CPFStudRef = useRef<nlInp>(null),
    telStudRef = useRef<nlInp>(null),
    btnExportStudsRef = useRef<nlBtn>(null),
    callbackNormalizeSizeSb = useCallback(() => {
      normalizeSizeSb([
        ...document.querySelectorAll(".formPadded"),
        ...document.querySelectorAll(".ovFlAut"),
        ...document.querySelectorAll("[scrollbar-width=none]"),
      ]);
      const nextDiv = document.getElementById("avPacsTab")?.nextElementSibling;
      if (nextDiv?.id === "" && nextDiv instanceof HTMLDivElement) nextDiv.remove() as void;
    }, []);
  useEffect(() => assignFormAttrs(formRef.current));
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      providers.globalDataProvider &&
        providers.globalDataProvider.initPersist(formRef.current, providers.globalDataProvider);
      const emailInput = formRef.current.querySelector("#inpEmailStud"),
        nameInput = formRef.current.querySelector("#inpNameStud"),
        dateInputs = Array.from(formRef.current.querySelectorAll('input[type="date"]')),
        toggleAutoFill = document.getElementById("deactAutofilltBtnStud"),
        toggleAutocorrect = document.getElementById("deactAutocorrectBtnStud");
      //adição de listeners para autopreenchimento
      if (toggleAutoFill instanceof HTMLInputElement) {
        toggleAutoFill.checked = true;
        panelFormsVariables.isAutofillStudOn = true;
        toggleAutoFill.addEventListener("change", () => {
          panelFormsVariables.isAutofillStudOn = !panelFormsVariables.isAutofillStudOn;
          emailInput instanceof HTMLInputElement && addEmailExtension(emailInput);
          CPFStudRef.current instanceof HTMLInputElement && formatCPF(CPFStudRef.current);
          telStudRef.current instanceof HTMLInputElement && formatTel(telStudRef.current);
        });
      } else inputNotFound(toggleAutoFill, "Element for toggling autofill in new Student form", extLine(new Error()));
      if (
        toggleAutocorrect instanceof HTMLInputElement &&
        (toggleAutocorrect.type === "checkbox" || toggleAutocorrect.type === "radio")
      ) {
        toggleAutocorrect.checked = true;
        panelFormsVariables.isAutocorrectStudOn = true;
        toggleAutocorrect.addEventListener("change", () => {
          panelFormsVariables.isAutocorrectStudOn = !panelFormsVariables.isAutocorrectStudOn;
          nameInput instanceof HTMLInputElement && autoCapitalizeInputs(nameInput);
        });
      } else elementNotFound(toggleAutocorrect, `toggleAutocorrect in StudentForm`, extLine(new Error()));
      nameInput instanceof HTMLInputElement
        ? nameInput.addEventListener("input", () => {
            toggleAutocorrect instanceof HTMLInputElement && toggleAutocorrect.checked === true
              ? (panelFormsVariables.isAutocorrectStudOn = true)
              : (panelFormsVariables.isAutocorrectStudOn = false);
            autoCapitalizeInputs(nameInput, panelFormsVariables.isAutocorrectStudOn);
          })
        : inputNotFound(nameInput, "nameInput in form for new Student register", extLine(new Error()));
      if (emailInput instanceof HTMLInputElement) {
        emailInput.addEventListener("input", () => {
          (panelFormsVariables.isAutofillStudOn ||
            (toggleAutoFill instanceof HTMLInputElement && toggleAutoFill.checked)) &&
            addEmailExtension(emailInput);
        });
        emailInput.addEventListener("click", () => {
          (panelFormsVariables.isAutofillStudOn ||
            (toggleAutoFill instanceof HTMLInputElement && toggleAutoFill.checked)) &&
            addEmailExtension(emailInput);
        });
      } else inputNotFound(emailInput, "emailInput in form for new students", extLine(new Error()));
      //adição de listener para exportar excel
      const exportBtn = btnExportStudsRef.current || document.querySelector("#btnExport");
      exportBtn instanceof HTMLButtonElement
        ? addExportFlags(formRef.current)
        : elementNotFound(exportBtn, "exportBtn in New Student form", extLine(new Error()));
      //chamadas de estilização
      if (dateInputs.length > 0 && dateInputs.every(inp => inp instanceof HTMLInputElement && inp.type === "date")) {
        clearPhDates(dateInputs);
        for (const dateInp of dateInputs) {
          (dateInp as HTMLInputElement).value = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
          (dateInp as HTMLInputElement).style.color = "initial";
        }
      } else elementNotPopulated(dateInputs, "dateInputs in form for new students", extLine(new Error()));
      callbackNormalizeSizeSb();
      syncAriaStates([...formRef.current!.querySelectorAll("*"), formRef.current]);
    } else inputNotFound(formRef.current, "formRef.current in useEffect()", extLine(new Error()));
  }, [formRef, callbackNormalizeSizeSb]);
  useEffect(() => {
    if (CPFStudRef.current instanceof HTMLInputElement && CPFStudRef.current.id.match(/cpf/gi)) {
      //adição de listener para corrigir cpf
      CPFStudRef.current.addEventListener("input", () => {
        panelFormsVariables.isAutofillStudOn && formatCPF(CPFStudRef.current);
      });
    }
  }, []);
  useEffect(() => {
    if (telStudRef?.current instanceof HTMLInputElement && telStudRef.current.id.match(/tel/gi)) {
      //adição de listener para corrigir telefone
      telStudRef.current.addEventListener("input", () => {
        panelFormsVariables.isAutofillStudOn && formatTel(telStudRef.current, true);
      });
    } else inputNotFound(telStudRef.current, "telStudRef.current in useEffect()", extLine(new Error()));
  }, []);
  useEffect(() => {
    if (formRef.current instanceof HTMLElement)
      handleClientPermissions(
        userClass,
        ["supervisor", "coordenador"],
        ...document.getElementsByTagName("input"),
        ...document.getElementsByTagName("button"),
        ...document.querySelector("form")!.getElementsByTagName("select"),
      );
  }, [formRef, userClass]);
  useExportHandler("studExporter", formRef.current, true);
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Erro carregando formulário para profissionais' />}>
      {showForm && (
        <form
          id='formAddStud'
          name='form_stud'
          action='submit_stud_form'
          encType='application/x-www-form-urlencoded'
          method='post'
          target='_top'
          autoComplete='on'
          ref={formRef}
          onSubmit={ev =>
            (userClass === "coordenador" || userClass === "supervisor") &&
            validateForm(ev, ev.currentTarget).then(validation =>
              validation[0] ? handleSubmit("studs", validation[2], true) : ev.preventDefault(),
            )
          }>
          <div role='group' id='formAddStudHDiv' className='mg__3b'>
            <h1 id='titleAddStudHBlock' className='bolded'>
              <strong>Cadastro de Aluno</strong>
            </h1>
            <small role='textbox' id='detailsAddStudHBlock'>
              <em>Detalhe aqui os dados de entrada para um novo estudante</em>
            </small>
          </div>
          <div role='group' className='flexNoWR flexQ460NoWC'>
            <span role='group' className='form-switch spanRight' id='autocorrectDivStud'>
              <input
                type='checkbox'
                className='deActBtn form-check-input'
                role='switch'
                id='deactAutocorrectBtnStud'
                title='Correção automática de Nomes'
                data-title='Autocorreção(Estudante)'
              />
              <strong>Autocorreção</strong>
            </span>
            <span role='group' className='form-switch spanRight' id='autofillDivStud'>
              <input
                type='checkbox'
                className='deActBtn form-check-input'
                role='switch'
                id='deactAutofilltBtnStud'
                title='Correção automática de CPF, Telefone e E-mail'
                data-title='Autopreenchimento(Estudante)'
              />
              <strong>Autopreenchimento</strong>
            </span>
          </div>
          <hr className='rdc05rHr460Q' />
          <fieldset className='flexColumn' id='formAddStudBodyFs'>
            <label htmlFor='inpNameStud'>
              <strong id='titleNameStud'>Nome Completo:</strong>
              <input
                type='text'
                list='listStudRegstName'
                id='inpNameStud'
                name='name'
                className='form-control autocorrectAll ssPersist minText maxText patternText'
                placeholder='Preencha com o nome completo'
                autoFocus
                autoComplete='given-name'
                autoCapitalize='true'
                data-title='Nome Completo: Aluno'
                data-reqlength='3'
                data-maxlength='99'
                data-pattern='[^0-9]'
                data-flags='gi'
                minLength={3}
                maxLength={99}
                required
                onInput={ev => {
                  handleEventReq(ev.currentTarget);
                  if (window) localStorage.setItem("name", ev.currentTarget.value);
                }}
              />
              <datalist id='listStudRegstName'></datalist>
            </label>
            <label htmlFor='inpCPFStud'>
              <strong id='titleCPFStud'>CPF:</strong>
              <input
                type='text'
                list='listStudRegstCPF'
                id='inpCPFStud'
                name='cpf'
                className='form-control ssPersist minText maxText patternText'
                minLength={15}
                maxLength={16}
                placeholder='Preencha com o CPF'
                autoComplete='username'
                pattern='^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$'
                data-title='CPF Estudante'
                data-reqlength='15'
                data-max-length='16'
                data-pattern='^(d{3}.){2}d{3}-d{2}$'
                required
                ref={CPFStudRef}
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listStudRegstCPF'></datalist>
            </label>
            <label htmlFor='inpDRE'>
              <strong id='titleDREStud'>DRE:</strong>
              <input
                type='number'
                id='inpDRE'
                name='dre'
                className='form-control ssPersist minText maxText patternText'
                list='listStudRegstDRE'
                minLength={1}
                maxLength={12}
                pattern='/^\d{9,}$/'
                placeholder='Preencha com o DRE'
                autoComplete='username'
                data-title='DRE'
                data-reqlength='1'
                data-maxlength='12'
                data-pattern='^\d{9,}$'
                required
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listStudRegstDRE'></datalist>
            </label>
            <label htmlFor='inpTel'>
              <strong id='titleTelStud'>Telefone (com DDD):</strong>
              <input
                type='tel'
                list='listStudRegstTel'
                id='inpTel'
                name='telephone'
                pattern='/^(\+\d{2}\s?)?(\(\d{2}\)\s?)?\d{3,5}[-\s]?\d{4}$/'
                className='form-control ssPersist minText maxText patternText'
                minLength={8}
                maxLength={20}
                placeholder='Preencha com o Telefone para contato'
                autoComplete='tel'
                data-title='Telefone Estudante'
                data-reqlength='8'
                data-maxlength='20'
                data-pattern='^(\+\d{2}\s?)?(\(\d{2}\)\s?)?\d{3,5}[-\s]?\d{4}$'
                required
                ref={telStudRef}
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listStudRegstTel'></datalist>
            </label>
            <label htmlFor='inpEmailStud'>
              <strong id='titleEmailStud' className='forceInvert'>
                E-mail:
              </strong>
              <input
                type='email'
                list='listStudRegstEmail'
                id='inpEmailStud'
                name='email'
                className='form-control ssPersist'
                placeholder='Preencha com o E-mail para contato'
                autoComplete='email'
                data-title='E-mail'
                onInput={ev =>
                  handleCondtReq(ev.currentTarget, {
                    min: 6,
                    pattern: ["@", "g"],
                  })
                }
              />
              <datalist id='listStudRegstEmail'></datalist>
            </label>
            <label htmlFor='inpCourseStud'>
              <strong id='titleOrigStud'>Curso de Origem:</strong>
              <input
                type='text'
                list='listCoursesStud'
                id='inpCourseStud'
                name='origin'
                className='form-control ssPersist minText maxText patternText'
                minLength={3}
                maxLength={99}
                placeholder='Preencha com o Curso do Estudante'
                autoCapitalize='true'
                data-title='Curso de Origem do Estudante'
                data-reqlength='3'
                data-maxlength='99'
                data-pattern='educação\sfísica|medicina|nutrição|odontologia|psicologia'
                required
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listCoursesStud'>
                {["Educação Física", "Medicina", "Nutrição", "Odontologia", "Psicologia"].map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </label>
            <label htmlFor='inpAtuacaoStud'>
              <strong id='titleActStud' className='forceInvert'>
                Área de atuação:
              </strong>
              <select
                id='inpAtuacaoStud'
                name='area'
                className='form-select ssPersist'
                data-title='Área de Atuação do Estudante'
                required>
                <option value='educacaofisicanut'>Educação Física & Nutrição</option>
                <option value='odontologia'>Odontologia</option>
                <option value='psiq'>Psiquiatria & Psicologia</option>
              </select>
            </label>
            <label htmlFor='inpPeriodo'>
              <strong>Período Atual:</strong>
              <input
                type='number'
                id='inpPeriodo'
                name='curr_semester'
                min={1}
                max={20}
                minLength={1}
                maxLength={2}
                className='form-control ssPersist minText maxText minNum maxNum patternText'
                placeholder='Preencha com o Período Atual do aluno (em número simples)'
                data-title='Período Atual Estudante'
                data-reqlength='1'
                data-maxlength='2'
                data-minnum='1'
                data-maxnum='20'
                data-pattern='^\d+$'
                required
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listPeriodos'>
                {Array.from({ length: 15 }, (_, index) => index + 1).map((op, i) => (
                  <option key={`${op}_${i}`} value={op}>
                    {op}
                  </option>
                ))}
              </datalist>
            </label>
            <label htmlFor='inpEntr'>
              <strong>Período de Entrada no Projeto:</strong>
              <input
                type='text'
                id='inpEntr'
                name='beginning_semester'
                className='form-control ssPersist'
                placeholder='Preencha com o Período do Aluno (ano.semestre, em número) na sua entrada'
                data-title='Período de Entrada do aluno'
                onInput={ev =>
                  handleCondtReq(ev.currentTarget, {
                    min: 1,
                    max: 2,
                    minNum: 1,
                    maxNum: 20,
                    pattern: ["^\\d+$", ""],
                  })
                }
              />
            </label>
            <label htmlFor='inpDayEntr' className='forceInvert'>
              <strong className='forceInvert'>Dia de Entrada no Projeto:</strong>
              <input
                type='date'
                id='inpDayEntr'
                name='beginning_day'
                className='form-control forceInvert ssPersist maxCurrDate'
                placeholder='Preencha com o Dia de Entrada do Aluno no projeto'
                data-title='Dia de Entrada do aluno'
                required
              />
            </label>
            <span role='group' id='spanDias' className='mg__3b flexNoWC rGap1v'>
              <strong className='forceInvert'>Dias de Atividade:</strong>
              <div role='group' id='divDiasAtv' className='flexSimple flexLineDiv flexQ460R'>
                <label className='flexWR gap1v' id='labQuarta'>
                  <slot
                    className='bolded lcPersist'
                    role='textbox'
                    id='titleQuarta'
                    contentEditable='true'
                    title='Modifique o rótulo de dia selecionando-o e digitando'>
                    Quarta-feira
                  </slot>
                  <input
                    type='checkbox'
                    id='checkQuarta'
                    name='quarta-feira'
                    className='form-check-input mdGreen ssPersist'
                    data-title='Quarta-feira'
                  />
                </label>
                <label className='flexWR gap1v' id='labSexta'>
                  <slot
                    className='bolded lcPersist'
                    role='textbox'
                    id='titleSexta'
                    contentEditable='true'
                    title='Modifique o rótulo de dia selecionando-o e digitando'>
                    Sexta-Feira
                  </slot>
                  <input
                    type='checkbox'
                    id='checkSexta'
                    name='sexta-feira'
                    className='form-check-input mdGreen ssPersist'
                    data-title='Sexta-feira'
                  />
                </label>
              </div>
            </span>
            <div role='group' className='flexNoW flexJSe cGap2v flexAlItCt flexQ900NoWC rGapQ9002v noInvert'>
              <button
                type='submit'
                id='btnSubmitNewStud'
                className='btn btn-success flexAlItCt flexJC flexBasis50 widFull noInvert'>
                <strong>Finalizar Cadastro</strong>
              </button>
              <button
                id='btnExport'
                type='button'
                className='btn btn-primary flexAlItCt flexJC flexBasis50 widFull bolded noInvert'
                ref={btnExportStudsRef}
                data-active='false'
                title='Gere um .xlsx com os dados preenchidos'
                onClick={ev => {
                  if (!exporters.studExporter) exporters.studExporter = new ExportHandler();
                  exporters.studExporter.handleExportClick(
                    ev,
                    "newStudent",
                    formRef.current ?? document,
                    localStorage.getItem("name")?.replace(/\s/g, "-") || "anonymous",
                  );
                }}>
                Gerar Planilha
              </button>
              <ReseterBtn root={panelRoots.mainRoot!} renderForm={<StudentForm />} />
            </div>
          </fieldset>
        </form>
      )}
    </ErrorBoundary>
  );
}
