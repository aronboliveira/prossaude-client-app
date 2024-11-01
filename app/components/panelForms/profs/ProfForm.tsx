import { ErrorBoundary } from "react-error-boundary";
import { GlobalFormProps } from "@/lib/global/declarations/interfacesCons";
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
export default function ProfForm({ mainRoot }: GlobalFormProps): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    [showForm] = useState(true),
    formRef = useRef<nlFm>(null),
    CPFProfRef = useRef<nlInp>(null),
    telProfRef = useRef<nlInp>(null),
    btnExportProfForm = useRef<nlBtn>(null),
    callbackNormalizeSizeSb = useCallback(() => {
      normalizeSizeSb([
        ...document.querySelectorAll(".formPadded"),
        ...document.querySelectorAll(".ovFlAut"),
        ...document.querySelectorAll("[scrollbar-width=none]"),
      ]);
    }, []);
  useEffect(() => {
    if (formRef?.current instanceof HTMLFormElement) {
      providers.globalDataProvider &&
        providers.globalDataProvider.initPersist(formRef.current, providers.globalDataProvider);
      const emailInput = formRef.current.querySelector("#inpEmailProf"),
        nameInput = formRef.current.querySelector("#inpNameProf"),
        dateInputs = Array.from(formRef.current.querySelectorAll('input[type="date"]')),
        toggleAutocorrect = document.getElementById("deactAutocorrectBtnProf"),
        toggleAutoFill = document.getElementById("deactAutofilltBtnProf");
      //adição de listeners para autocorreção
      if (toggleAutoFill instanceof HTMLInputElement) {
        toggleAutoFill.checked = true;
        panelFormsVariables.isAutofillProfOn = true;
        toggleAutoFill.addEventListener("change", () => {
          panelFormsVariables.isAutofillProfOn = !panelFormsVariables.isAutofillProfOn;
          emailInput instanceof HTMLInputElement && addEmailExtension(emailInput);
          CPFProfRef.current instanceof HTMLInputElement && formatCPF(CPFProfRef.current);
          telProfRef.current instanceof HTMLInputElement && formatTel(telProfRef.current);
        });
      } else inputNotFound(toggleAutoFill, "Element for toggling autofill in new Student form", extLine(new Error()));
      if (
        toggleAutocorrect instanceof HTMLInputElement &&
        (toggleAutocorrect.type === "checkbox" || toggleAutocorrect.type === "radio")
      ) {
        toggleAutocorrect.checked = true;
        panelFormsVariables.isAutocorrectProfOn = true;
        toggleAutocorrect.addEventListener("change", () => {
          panelFormsVariables.isAutocorrectProfOn = !panelFormsVariables.isAutocorrectProfOn;
          nameInput instanceof HTMLInputElement && autoCapitalizeInputs(nameInput);
        });
      } else elementNotFound(toggleAutocorrect, `toggleAutocorrect in ProfForm`, extLine(new Error()));
      nameInput instanceof HTMLInputElement
        ? nameInput.addEventListener("input", () => {
            toggleAutocorrect instanceof HTMLInputElement && toggleAutocorrect.checked === true
              ? (panelFormsVariables.isAutocorrectProfOn = true)
              : (panelFormsVariables.isAutocorrectProfOn = false);
            autoCapitalizeInputs(nameInput, panelFormsVariables.isAutocorrectProfOn);
          })
        : inputNotFound(nameInput, "nameInput in form for new Prof register", extLine(new Error()));
      if (emailInput instanceof HTMLInputElement) {
        emailInput.addEventListener("input", () => {
          (panelFormsVariables.isAutofillProfOn ||
            (toggleAutoFill instanceof HTMLInputElement && toggleAutoFill.checked)) &&
            addEmailExtension(emailInput);
        });
        emailInput.addEventListener("click", () => {
          (panelFormsVariables.isAutofillProfOn ||
            (toggleAutoFill instanceof HTMLInputElement && toggleAutoFill.checked)) &&
            addEmailExtension(emailInput);
        });
      } else inputNotFound(emailInput, "emailInput in form for new Profents", extLine(new Error()));
      //estilização
      if (dateInputs.length > 0 && dateInputs.every(inp => inp instanceof HTMLInputElement && inp.type === "date")) {
        clearPhDates(dateInputs);
        for (const dateInp of dateInputs) {
          (dateInp as HTMLInputElement).value = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
          (dateInp as HTMLInputElement).style.color = "initial";
        }
      } else elementNotPopulated(dateInputs, "dateInputs in form for new Profents", extLine(new Error()));
      //adição de listener para exportação de excel
      const exportBtn = btnExportProfForm.current || document.querySelector("#btnExport");
      exportBtn instanceof HTMLButtonElement
        ? addExportFlags(formRef.current)
        : elementNotFound(exportBtn, "exportBtn in New Professional form", extLine(new Error()));
      //estilização e aria
      callbackNormalizeSizeSb();
      syncAriaStates([...formRef.current!.querySelectorAll("*"), formRef.current]);
    } else elementNotFound(formRef.current, "formRef.current in useEffect()", extLine(new Error()));
  }, [formRef, callbackNormalizeSizeSb]);
  useEffect(() => {
    if (CPFProfRef?.current instanceof HTMLInputElement && CPFProfRef.current.id.match(/cpf/gi)) {
      CPFProfRef.current.addEventListener("input", () => {
        panelFormsVariables.isAutofillProfOn && formatCPF(CPFProfRef.current);
      });
    } else inputNotFound(CPFProfRef.current, "CPFProfRef.current in useEffect()", extLine(new Error()));
  }, [CPFProfRef]);
  useEffect(() => {
    if (telProfRef?.current instanceof HTMLInputElement && telProfRef.current.id.match(/tel/gi)) {
      telProfRef.current.addEventListener("input", () => {
        panelFormsVariables.isAutofillProfOn && formatTel(telProfRef.current, true);
      });
    } else inputNotFound(telProfRef.current, "telProfRef.current in useEffect()", extLine(new Error()));
  }, [telProfRef]);
  useEffect(() => {
    handleClientPermissions(
      userClass,
      ["coordenador"],
      ...document.getElementsByTagName("input"),
      ...document.getElementsByTagName("button"),
      ...document.querySelector("form")!.getElementsByTagName("select"),
    );
  }, [formRef, userClass]);
  useExportHandler("profExporter", formRef.current, true);
  useEffect(() => assignFormAttrs(formRef.current));
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Erro carregando formulário para profissionais' />}>
      {showForm && (
        <form
          id='formAddProf'
          name='form_prof'
          action='submit_prof_form'
          encType='application/x-www-form-urlencoded'
          method='post'
          target='_top'
          autoComplete='on'
          ref={formRef}
          onSubmit={ev =>
            userClass === "coordenador" &&
            validateForm(ev, ev.currentTarget).then(validation =>
              validation[0] ? handleSubmit("profs", validation[2], true) : ev.preventDefault(),
            )
          }>
          <div role='group' id='formAddProfHDiv' className='mg__3b'>
            <h1 id='titleAddProfHBlock' className='bolded'>
              <strong id='titleAddProfH'>Cadastro de Profissional</strong>
            </h1>
            <small role='textbox' id='detailsAddProfHBlock'>
              <em>Detalhe aqui os dados para o Profissional</em>
            </small>
          </div>
          <div role='group' className='flexNoWR flexQ460NoWC'>
            <span role='group' className='form-switch spanRight' id='autocorrectDivprof'>
              <input
                type='checkbox'
                className='deActBtn form-check-input'
                role='switch'
                id='deactAutocorrectBtnProf'
                title='Correção automática de Nomes'
                data-title='Autocorreção(Profissional)'
              />
              <strong>Autocorreção</strong>
            </span>
            <span role='group' className='form-switch spanRight' id='autofillDivprof'>
              <input
                type='checkbox'
                className='deActBtn form-check-input'
                role='switch'
                id='deactAutofilltBtnProf'
                title='Correção automática de CPF, Telefone e E-mail'
                data-title='Autopreenchimento(Profissional)'
              />
              <strong>Autopreenchimento</strong>
            </span>
          </div>
          <hr className='rdc05rHr460Q' />
          <fieldset className='flexColumn' id='formAddProfBodyFs'>
            <label htmlFor='inpNameProf'>
              <strong id='titleNameProf'>Nome Completo:</strong>
              <input
                type='text'
                id='inpNameProf'
                name='name'
                className='form-control autocorrectAll ssPersist minText maxText patternText'
                placeholder='Preencha com o nome completo'
                autoFocus
                autoComplete='given-name'
                autoCapitalize='true'
                data-title='Nome Completo: Profissional'
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
            </label>
            <label htmlFor='inpCPFProf'>
              <strong id='titleCPFProf'>CPF:</strong>
              <input
                type='text'
                id='inpCPFProf'
                name='cpf'
                minLength={15}
                maxLength={16}
                pattern='^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$'
                className='form-control ssPersist minText maxText patternText'
                placeholder='Preencha com o CPF'
                autoComplete='username'
                data-title='CPF Profissional'
                data-reqlength='15'
                data-max-length='16'
                data-pattern='^(d{3}.){2}d{3}-d{2}$'
                ref={CPFProfRef}
                required
              />
            </label>
            <label htmlFor='inpTel'>
              <strong id='titleTelProf'>Telefone (com DDD):</strong>
              <input
                type='tel'
                list='listProfRegstTel'
                id='inpTel'
                name='telephone'
                className='form-control ssPersist minText maxText patternText'
                minLength={8}
                maxLength={20}
                placeholder='Preencha com o Telefone para contato'
                autoComplete='tel'
                data-title='Telefone Profissional'
                data-reqlength='8'
                data-maxlength='20'
                data-pattern='^(\+\d{2}\s?)?(\(\d{2}\)\s?)?\d{3,5}[-\s]?\d{4}$'
                required
                ref={telProfRef}
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listProfRegstTel'></datalist>
            </label>
            <label htmlFor='inpEmailProf'>
              <strong id='titleEmailProf'>E-mail:</strong>
              <input
                type='email'
                list='listProfRegstEmail'
                id='inpEmailProf'
                name='email'
                className='form-control ssPersist'
                maxLength={20}
                placeholder='Preencha com o E-mail para contato'
                autoComplete='email'
                data-title='E-mail Profissional'
                onInput={ev =>
                  handleCondtReq(ev.currentTarget, {
                    min: 6,
                    pattern: ["@", "g"],
                  })
                }
              />
              <datalist id='listProfRegstEmail'></datalist>
            </label>
            <label htmlFor='inpCourseProf'>
              <strong id='titleOrigProf'>Curso de Origem:</strong>
              <input
                type='text'
                list='listCoursesProf'
                id='inpCourseProf'
                name='origin'
                minLength={3}
                maxLength={99}
                className='form-control ssPersist minText maxText patternText'
                placeholder='Preencha com o Curso do Membro Profissional'
                autoCapitalize='true'
                data-title='Curso de Origem do Membro Profissional'
                data-reqlength='3'
                data-maxlength='99'
                data-pattern='educação\sfísica|medicina|nutrição|odontologia|psicologia'
                required
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
              <datalist id='listCoursesProf'>
                <option value='Educação Física'></option>
                <option value='Medicina'></option>
                <option value='Nutrição'></option>
                <option value='Odontologia'></option>
                <option value='Psicologia'></option>
              </datalist>
            </label>
            <label htmlFor='inpAtuacao'>
              <strong id='titleActProf'>Área de atuação:</strong>
              <select
                id='inpAtuacao'
                name='area'
                className='form-select ssPersist'
                data-title='Área de Atuação do Profissional'>
                <option value='educacaofisicanut'>Educação Física & Nutrição</option>
                <option value='odontologia'>Odontologia</option>
                <option value='psiq'>Psiquiatria & Psicologia</option>
              </select>
            </label>
            <label htmlFor='inpEntr'>
              <strong>Período de Entrada no Projeto:</strong>
              <input
                type='text'
                id='inpEntr'
                name='beginning_semester'
                maxLength={7}
                className='form-control ssPersist'
                placeholder='Preencha com o Período (do Calendário) na entrada'
                data-title='Período de Entrada do Profissional'
                required
                onInput={ev => handleEventReq(ev.currentTarget)}
              />
            </label>
            <label htmlFor='inpDayEntrProf' className='forceInvert'>
              <strong>Dia de Entrada no Projeto:</strong>
              <input
                type='date'
                id='inpDayEntrProf'
                name='beginning_day'
                className='form-control ssPersist maxCurrDate'
                placeholder='Preencha com o Dia de Entrada do Profissional no projeto'
                data-title='Dia de Entrada do Profissional'
                required
              />
            </label>
            <div role='group' className='flexNoW flexJSe cGap2v flexAlItCt flexQ900NoWC rGapQ9002v'>
              <button
                type='submit'
                id='btnSubmitNewProf'
                className='btn btn-success flexAlItCt flexJC flexBasis50 widFull noInvert'>
                <strong>Finalizar Cadastro</strong>
              </button>
              <button
                type='button'
                id='btnExport'
                name='btnExportProfsForm'
                className='btn btn-primary flexAlItCt flexJC flexBasis50 widFull bolded noInvert'
                ref={btnExportProfForm}
                data-active='false'
                title='Gere um .xlsx com os dados preenchidos'
                onClick={ev => {
                  if (!exporters.profExporter) exporters.profExporter = new ExportHandler();
                  exporters.profExporter.handleExportClick(
                    ev,
                    "newProfessional",
                    formRef.current ?? document,
                    localStorage.getItem("name")?.replace(/\s/g, "-") || "anonymous",
                  );
                }}>
                Gerar Planilha
              </button>
              <ReseterBtn root={panelRoots.mainRoot!} renderForm={<ProfForm mainRoot={mainRoot} />} />
            </div>
          </fieldset>
        </form>
      )}
    </ErrorBoundary>
  );
}
