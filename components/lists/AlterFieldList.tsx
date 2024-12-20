"use client";
import { AlterFieldListProps } from "@/lib/global/declarations/interfacesCons";
import { ErrorBoundary } from "react-error-boundary";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nlDlg, nlFm, nlSel } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef, useState } from "react";
import ErrorFallbackDlg from "../error/ErrorFallbackDlg";
import GenericErrorComponent from "../error/GenericErrorComponent";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import {
  addEmailExtension,
  assignFormAttrs,
  autoCapitalizeInputs,
  camelToKebab,
  formatCPF,
  formatTel,
} from "@/lib/global/gModel";
export default function AlterFieldList({
  dispatch,
  tabRef,
  name = "anonimo",
  state = true,
}: AlterFieldListProps): JSX.Element {
  const alterFieldRef = useRef<nlDlg>(null),
    formRef = useRef<nlFm>(null),
    optsRef = useRef<nlSel>(null),
    [, setChosenOp] = useState(optsRef.current?.value || null),
    handleChange = (targ: HTMLSelectElement): void => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}${camelToKebab(targ.value)}${location.hash}`,
      );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    },
    toggleDisplayRowData = (state: boolean = true): void => dispatch(!state);
  useEffect(() => {
    if (alterFieldRef.current instanceof HTMLDialogElement) {
      alterFieldRef.current.showModal();
      syncAriaStates([...alterFieldRef.current!.querySelectorAll("*"), alterFieldRef.current]);
      alterFieldRef.current.addEventListener(
        "click",
        click => {
          if (isClickOutside(click, alterFieldRef.current!).filter(point => point === true).length >= 1) {
            alterFieldRef.current!.close();
            toggleDisplayRowData(state);
          }
        },
        true,
      );
      const handleKeyDown = (press: KeyboardEvent): void => {
        if (press.key === "Escape") {
          dispatch(!state);
        }
      };
      addEventListener("keydown", handleKeyDown);
      return (): void => removeEventListener("keydown", handleKeyDown);
    }
  }, [alterFieldRef, dispatch, toggleDisplayRowData]);
  //push em history
  useEffect(() => {
    history.pushState(
      {},
      "",
      `${location.origin}${location.pathname}${location.search}&alter-dlg=open#${btoa(
        String.fromCodePoint(...new TextEncoder().encode(name.toLowerCase().replaceAll(" ", "-"))),
      )}`,
    );
    optsRef.current instanceof HTMLSelectElement && handleChange(optsRef.current);
    setTimeout(() => {
      history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
    }, 300);
    return (): void => {
      optsRef.current instanceof HTMLSelectElement
        ? history.pushState(
            {},
            "",
            `${location.origin}${location.pathname}${location.search}`
              .replaceAll(`&alter-dlg=open`, "")
              .replaceAll(
                `#${btoa(String.fromCodePoint(...new TextEncoder().encode(name.toLowerCase().replaceAll(" ", "-"))))}`,
                "",
              )
              .replaceAll(`${camelToKebab(optsRef.current.value)}${location.hash}`, ""),
          )
        : history.pushState(
            {},
            "",
            `${location.origin}${location.pathname}${location.search}`
              .replaceAll(`&alter-dlg=open`, "")
              .replaceAll(`#${name.toLowerCase().replaceAll(" ", "-")}`, "")
              .replaceAll(`${location.hash}`, ""),
          );
      setTimeout(() => {
        history.pushState({}, "", `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#"));
      }, 300);
    };
  }, [name]);
  useEffect(() => {
    if (
      (optsRef?.current instanceof HTMLSelectElement || optsRef.current! instanceof HTMLInputElement) &&
      /opt/gi.test(optsRef.current.id)
    ) {
      const headers: Array<string> = [];
      if (tabRef.current instanceof HTMLTableElement) {
        const headerTitles = Array.from(tabRef.current.querySelector("thead")!.querySelectorAll("th"))
          .flatMap(th => (th as HTMLTableCellElement).textContent || "Nulo")
          .filter(opt => opt !== "");
        for (const title of headerTitles) {
          if (
            !(
              /histórico/gi.test(title) ||
              /alteração/gi.test(title) ||
              /nulo/gi.test(title) ||
              /null/gi.test(title) ||
              /undefined/gi.test(title) ||
              /exclusão/gi.test(title) ||
              /alocação/gi.test(title)
            ) &&
            title.length > 0
          )
            headers.push(title);
        }
      } else elementNotFound(tabRef?.current, "Ref for main table form in AlterFieldList", extLine(new Error()));
      optsRef.current.querySelectorAll("option").length < 2 &&
        headers.forEach(opt => {
          const newOpt = document.createElement("option");
          Object.assign(newOpt, {
            textContent: opt,
            value: opt.toLowerCase().trim().replaceAll(" ", "-"),
          });
          optsRef.current?.appendChild(newOpt);
        });
      if (optsRef.current.childElementCount < headers.length || optsRef.current.childElementCount === 0) {
        const replaceInp = document.createElement("input") as HTMLInputElement;
        Object.assign(replaceInp, optsRef.current);
        Object.assign(replaceInp.style, optsRef.current);
        replaceInp.classList.add(...optsRef.current.classList);
        replaceInp.classList.toggle("form-select");
        replaceInp.classList.toggle("form-control");
        optsRef.current.parentElement!.replaceChild(replaceInp, optsRef.current);
      }
    } else
      inputNotFound(optsRef?.current, "Reference for Field options in AlterFieldList component", extLine(new Error()));
  }, [optsRef, tabRef]);
  useEffect(() => {
    assignFormAttrs(formRef.current);
  });
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Erro carregando modal de alteração' />}>
      <dialog
        className='modalContent__stk2'
        ref={alterFieldRef}
        id='alterFieldDlg'
        onClick={ev => {
          if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
            dispatch(!state);
            ev.currentTarget.closest("dialog")?.close();
          }
        }}>
        <ErrorBoundary
          FallbackComponent={() => (
            <ErrorFallbackDlg
              renderError={new Error(`Erro carregando a janela modal!`)}
              onClick={() => toggleDisplayRowData(state)}
            />
          )}>
          <fieldset id='fsAlterFieldStud' className='flexNoWC flexJSt flexAlItSt noInvert'>
            <section className='flexRNoWBetCt widFull' id='headFieldsHead'>
              <h2 className='mg__1b'>
                <strong>Campos Disponíveis</strong>
              </h2>
              <button className='btn btn-close forceInvert' onClick={() => toggleDisplayRowData(state)}></button>
            </section>
            <section className='flexNoWC widFull cGap5v rGap2v'>
              <select
                id='avFieldOptions'
                className='form-select noMargin'
                ref={optsRef}
                onChange={ev => {
                  handleChange(ev.currentTarget);
                  setChosenOp(ev.currentTarget.value);
                  const newValueOpt = document.createElement("input") as HTMLInputElement;
                  Object.assign(newValueOpt, {
                    type: "text",
                    id: "newValueOpt",
                    ariaHidden: "false",
                    ariaRequired: "false",
                    ariaInvalid: "false",
                  });
                  newValueOpt.classList.add(...["form-control", "noMargin"]);
                  if (!document.getElementById("newValueOpt"))
                    document.getElementById("divValueOpt")?.append(newValueOpt);
                  else {
                    if (!((document.getElementById("newValueOpt") as HTMLInputElement).type === "text")) {
                      document
                        .getElementById("divValueOpt")
                        ?.replaceChild(newValueOpt, document.getElementById("newValueOpt")!);
                    } else {
                      newValueOpt.removeEventListener("input", () => autoCapitalizeInputs(newValueOpt));
                      newValueOpt.removeEventListener("input", () => formatCPF(newValueOpt));
                    }
                  }
                  if (newValueOpt instanceof HTMLInputElement) {
                    switch (ev.currentTarget.value) {
                      case "cpf":
                        newValueOpt.addEventListener("input", () => {
                          formatCPF(newValueOpt);
                        });
                        break;
                      case "nome":
                        newValueOpt.addEventListener("input", () => {
                          autoCapitalizeInputs(newValueOpt);
                        });
                        break;
                      case "e-mail":
                        const newValueEmailOpt = document.createElement("input") as HTMLInputElement;
                        Object.assign(newValueEmailOpt, {
                          type: "email",
                          id: "newValueOpt",
                          ariaHidden: "false",
                          ariaRequired: "false",
                          ariaInvalid: "false",
                        });
                        newValueEmailOpt.classList.add(...["form-control", "noMargin"]);
                        document
                          .getElementById("divValueOpt")
                          ?.replaceChild(newValueEmailOpt, document.getElementById("newValueOpt")!);
                        newValueEmailOpt.addEventListener("input", () => {
                          addEmailExtension(newValueEmailOpt);
                        });
                        newValueEmailOpt.addEventListener("click", () => {
                          addEmailExtension(newValueEmailOpt);
                        });
                        break;
                      case "telefone":
                        const newValueTelOpt = document.createElement("input") as HTMLInputElement;
                        Object.assign(newValueTelOpt, {
                          type: "tel",
                          id: "newValueOpt",
                          ariaHidden: "false",
                          ariaRequired: "false",
                          ariaInvalid: "false",
                        });
                        newValueTelOpt.classList.add(...["form-control", "noMargin"]);
                        document
                          .getElementById("divValueOpt")
                          ?.replaceChild(newValueTelOpt, document.getElementById("newValueOpt")!);
                        newValueOpt.addEventListener("input", () => {
                          formatTel(newValueOpt);
                        });
                        break;
                      case "assinatura":
                        const newValueFileOpt = document.createElement("input") as HTMLInputElement;
                        Object.assign(newValueFileOpt, {
                          type: "file",
                          accept: "image/*,.pdf",
                          id: "newValueOpt",
                          ariaHidden: "false",
                          ariaRequired: "false",
                          ariaInvalid: "false",
                        });
                        newValueFileOpt.classList.add(...["form-control", "noMargin"]);
                        document
                          .getElementById("divValueOpt")
                          ?.replaceChild(newValueFileOpt, document.getElementById("newValueOpt")!);
                        break;
                      case "status":
                        const newValueStatusOpt = document.createElement("select");
                        Object.assign(newValueStatusOpt, {
                          id: "newValueOpt",
                          ariaHidden: "false",
                          ariaRequired: "false",
                          ariaInvalid: "false",
                        });
                        newValueStatusOpt.classList.add(...["form-select", "noMargin"]);
                        newValueStatusOpt.innerHTML = `
                            <option value="avaliacao">Em Avaliação Inicial</option>
                            <option value="tratamento">Em Tratamento Geral</option>
                            <option value="emergência">Em emergência</option>
                            <option value="altaOdontologia">Alta — Odontologia</option>
                            <option value="altaEducacaoFisica">
                              Alta — Educação Física
                            </option>
                            <option value="altaNutricao">Alta — Nutrição</option>
                            <option value="altaOdontologiaEducaoFisica">
                              Alta — Odontologia — Educação Física
                            </option>
                            <option value="altaOdontologiaNutricao">
                              Alta — Odontologia — Nutrição
                            </option>
                            <option value="altaEducaoFisicaNutricao">
                              Alta — Educação Física — Nutrição
                            </option>
                            <option value="altaOdontologiaEducacaoFisicaNutricao">
                              Alta Geral
                            </option>
                          `;
                        document
                          .getElementById("divValueOpt")
                          ?.replaceChild(newValueStatusOpt, document.getElementById("newValueOpt")!);
                        break;
                      case "dre":
                        break;
                      case "área-de-atividade":
                        break;
                      case "dia-de-atividade":
                        break;
                      case "período-de-atividade":
                        break;
                      case "próximo-dia-de-consulta":
                        break;
                      case "período-de-acompanhamento":
                        break;
                      default:
                        break;
                    }
                  }
                }}></select>
              <form
                ref={formRef}
                className='flexNoW flexAlItCt flexQ900NoWC cGap2v rGap2v widFull'
                id='sectFieldsBody'
                name='alter_field'>
                <div role='group' className='flexNoW flexQ460NoWC wid75 cGap2v flexAlItCt pdL03' id='divValueOpt'>
                  <label htmlFor='newValueOpt' className='bolded wsNoW'>
                    Insira o Novo valor:
                  </label>
                  <input id='newValueOpt' className='form-control noMargin' />
                </div>
                <div role='group' className='flexNoWC'>
                  <button
                    type='submit'
                    formMethod='post'
                    formAction='#'
                    id='btnConfirmFieldOpt'
                    className='btn btn-success wsNoW'
                    onClick={() => toggleDisplayRowData(state)}
                    style={{ fontWeight: 600 }}>
                    Confirmar Alteração
                  </button>
                </div>
              </form>
            </section>
          </fieldset>
        </ErrorBoundary>
      </dialog>
    </ErrorBoundary>
  );
}
