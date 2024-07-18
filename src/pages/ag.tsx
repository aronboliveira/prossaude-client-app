import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useCallback, useState, memo } from "react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { entryEl, targEl } from "@/lib/global/declarations/types";
import {
  addCanvasListeners,
  addListenerExportBtn,
  addListenersGenConts,
  addResetAstListener,
  getGlobalEls,
  watchLabels,
} from "@/lib/global/gController";
import { clearPhDates, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import {
  addListenerCPFCont,
  addListenersCepElements,
  addListenersEmailInputs,
} from "@/lib/locals/aGPage/aGController";
import {
  deactTextInput,
  handleCondtReq,
  handleEventReq,
  opRadioHandler,
  syncAriaStates,
  toggleConformDlg,
} from "@/lib/global/handlers/gHandlers";
import { addDblQuotes } from "@/lib/locals/aGPage/aGModel";
import { formatTel } from "@/lib/global/gModel";
import AntMedFs from "../../components/interactive/ag/AntMedFs";
import AGTips from "../../components/interactive/ag/AGTips";
import AGDeclaration from "../../components/interactive/ag/AGDeclaration";
import ConfirmLocId from "../../components/interactive/def/ConfirmLocId";
import AgeElement from "../../components/interactive/edfis/defaulted/AgeElement";
import Signature from "../../components/interactive/def/Signature";
import Name from "../../components/interactive/def/Name";
import SocialName from "../../components/interactive/def/SocialName";
import GenDiv from "../../components/interactive/def/GenDiv";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import ConfirmDate from "../../components/interactive/def/ConfirmDate";
import SectConfirmBtns from "../../components/interactive/def/SectConfirmBtns";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import TipsBtn from "../../components/interactive/def/TipsBtn";
import BtnConform from "../../components/interactive/def/BtnConform";
import Declaration from "../../components/interactive/def/Declaration";
import RadioPair from "../../components/interactive/ag/RadioPair";
import DivAntFam from "../../components/interactive/ag/DivAntFam";

let agGenElement = undefined,
  agGenValue = "masculino",
  agIsAutoCorrectOn = true;
const MemoAge = memo(AgeElement);
const MemoLoc = memo(ConfirmLocId);

export default function AGPage(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
  const clearPhCb = useCallback(() => {
    clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
  }, []);
  const handleResize = () => {
    equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [
      ["width", "px"],
    ]);
  };
  const handleDivAddShow = (targ: targEl) => {
    try {
      if (
        !(
          targ instanceof HTMLInputElement &&
          (targ.type === "radio" || targ.type === "checkbox")
        )
      )
        throw elementNotFound(
          targ,
          `Validation of Event Current Target`,
          extLine(new Error())
        );
      const parentSpan =
        targ.closest(".spanSectAnt") ||
        targ.closest(".input-group") ||
        targ.closest('span[role="group"]');
      if (!(parentSpan instanceof HTMLElement))
        throw elementNotFound(
          parentSpan,
          `Validation of Parent Section Span`,
          extLine(new Error())
        );
      let divAdd: targEl = parentSpan.nextElementSibling;
      if (!divAdd?.classList.contains(".divAdd"))
        divAdd = parentSpan.nextElementSibling?.nextElementSibling;
      if (!divAdd?.classList.contains(".divAdd"))
        divAdd =
          parentSpan.nextElementSibling?.nextElementSibling?.nextElementSibling;
      if (!divAdd?.classList.contains(".divAdd"))
        divAdd =
          parentSpan.nextElementSibling?.nextElementSibling?.nextElementSibling
            ?.nextElementSibling;
      if (
        !(divAdd instanceof HTMLElement && divAdd.classList.contains("divAdd"))
      )
        divAdd = document.getElementById(
          `divAdd${targ.id.replace("ant", "").replace("Id", "")}`
        );
      if (
        !(divAdd instanceof HTMLElement && divAdd.classList.contains("divAdd"))
      )
        throw elementNotFound(
          divAdd,
          `Validation of Div Add`,
          extLine(new Error())
        );
      if (targ.checked) {
        divAdd.style.display = "grid";
        divAdd.style.opacity = "0.8";
        divAdd.style.minWidth = "70vw";
      } else {
        divAdd.style.display = "none";
        divAdd.style.opacity = "0";
        divAdd.style.minWidth = "0";
      }
    } catch (e) {
      console.error(
        `Error executing callback for ${
          targ instanceof HTMLElement
            ? targ.id || targ.className || targ.tagName
            : "undefined target"
        }:\n${(e as Error).message}
        Attempts for divAdd:
        1. ${
          (targ instanceof HTMLElement && targ.closest(".spanSectAnt")?.id) ||
          "null"
        }
        2. ${
          (targ instanceof HTMLElement && targ.closest(".input-group")?.id) ||
          "null"
        }
        3. ${
          (targ instanceof HTMLElement &&
            targ.closest('span[role="group"]')?.id) ||
          "null"
        }
        4. ${
          (targ instanceof HTMLElement &&
            document.getElementById(
              `divAdd${targ.id.replace("ant", "").replace("Id", "")}`
            )) ||
          "null"
        }`
      );
    }
  };
  useEffect(() => {
    agGenElement = document.getElementById("genId");
    agGenValue = (agGenElement as entryEl)?.value || "masculino";
    agIsAutoCorrectOn = getGlobalEls(agIsAutoCorrectOn, "num");
    handleLinkChanges("ag", "AG Page Style");
    equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [
      ["width", "px"],
    ]);
    clearPhCb();
    agGenElement instanceof HTMLInputElement ||
    agGenElement instanceof HTMLTextAreaElement ||
    agGenElement instanceof HTMLSelectElement
      ? (agGenElement.value = addListenersGenConts(agGenElement, agGenValue))
      : elementNotFound(
          agGenElement,
          "instance of agGenElement for DOM initialization",
          extLine(new Error())
        );
    addListenerCPFCont();
    addListenersEmailInputs();
    addListenersCepElements();
    deactTextInput(
      document.querySelectorAll('input[type="number"][id$=NumId]'),
      document.querySelectorAll("input[id$=NullId]")
    );
    addListenerExportBtn("anamG");
    addCanvasListeners();
    addResetAstListener();
    toggleConformDlg();
    addEventListener("resize", handleResize);
    syncAriaStates(document.querySelectorAll("*"));
    watchLabels();
    document.querySelectorAll(".cbFam").forEach(handleDivAddShow);
    const UFid = document.getElementById("UFid");
    if (UFid instanceof HTMLInputElement) UFid.value = "RJ";
    return () => removeEventListener("resize", handleResize);
  }, []);
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <div className="pad1pc" id="bgDiv" role="document">
        <header>
          <div
            className="flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC"
            id="hDiv"
            role="group"
          >
            <div role="group">
              <div className="noInvert">
                <h1 className="bolded flexJBt" id="hForm">
                  Anamnese Geral
                </h1>
                <h2 className="bolded">PROSSaúde, UFRJ</h2>
                <TipsBtn dispatch={setTips} state={shouldShowTips} />
                {shouldShowTips && (
                  <AGTips dispatch={setTips} state={shouldShowTips} />
                )}
              </div>
              <SwitchDiv />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <hr />
          <form
            name="formAnamGName"
            id="formAnamGId"
            method="post"
            target="_top"
            action="#"
          >
            <fieldset name="fsAnamGName" id="fsAnamGIdId" className="fsMain">
              <legend id="fsAnamGLeg" className="legMain form-padded">
                Identificação
              </legend>
              <section className="sectionMain" id="fsAnamGSect">
                <div className="flexQ900NoWC" id="div1_div2flex" role="group">
                  <Name />
                  <div
                    className="fsAnamGDiv alItSt900Q flexQ900NoWC flexAlItE noAdj flexNoWR flexTwin-width"
                    role="group"
                    id="divIdentif_2"
                  >
                    <SocialName />
                    <span
                      role="group"
                      className="fsAnamGSpan flexAlItCt col"
                      id="fsAnamGSpanCPF"
                    >
                      <label htmlFor="inpCPF" className="labelIdentif">
                        CPF:
                        <input
                          type="text"
                          id="inpCPF"
                          maxLength={16}
                          pattern="/^(\d{3}\.){2}\d{3}-\d{2}$/"
                          className="form-control noInvert"
                          placeholder="Preencha com o CPF"
                          autoComplete="username"
                          data-title="CPF"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 1,
                              max: 16,
                              pattern: ["^(d{3}.){2}d{3}-d{2}$", ""],
                            })
                          }
                        />
                      </label>
                    </span>
                    <span role="group" className="fsAnamGSpan flexAlItCt col">
                      <label className="labelIdentif">
                        Status:
                        <select
                          className="form-select noInvert ssPersist"
                          id="statusPac"
                          name="statusPac-in"
                          data-title="Status Paciente"
                          required
                        >
                          <option value="avaliacao">
                            Em Avaliação Inicial
                          </option>
                          <option value="tratamento">
                            Em Tratamento Geral
                          </option>
                          <option value="emergência">Em Emergência</option>
                          <option value="altaOdontologia">
                            Alta — Odontologia
                          </option>
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
                        </select>
                      </label>
                    </span>
                  </div>
                  <hr />
                  <div
                    className="divMain fsAnamGDiv alItSt900Q flexQ900NoWC gridAlItE gridTwoCol noGapDiv noEqualize"
                    id="fsAnamGDiv2"
                    role="group"
                  >
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan16"
                    >
                      <label htmlFor="telAreaCodeId" className="labelIdentif">
                        DDD:
                        <input
                          type="number"
                          name="ddd"
                          id="telAreaCodeId"
                          className="form-control inpIdentif noInvert inpDDD minText maxText patternText minNum maxNum"
                          min="11"
                          max="99"
                          autoComplete="tel-area-code"
                          data-title="ddd_prim"
                          data-reqlength="2"
                          data-maxlength="4"
                          data-pattern="[0-9]{2,}"
                          data-flags="g"
                          minLength={2}
                          maxLength={4}
                          required
                          onInput={ev => handleEventReq(ev.currentTarget)}
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan19"
                    >
                      <label htmlFor="tel2AreaCodeId" className="labelIdentif">
                        DDD do Telefone Secundário:
                        <input
                          type="number"
                          name="ddd_sec"
                          id="tel2AreaCodeId"
                          className="form-control inpIdentif noInvert inpDDD"
                          min="11"
                          max="99"
                          autoComplete="tel-area-code"
                          data-title="ddd_sec"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 2,
                              max: 4,
                              minNum: 11,
                              maxNum: 11,
                              pattern: ["[0-9]{2,}", "g"],
                            })
                          }
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan17"
                    >
                      <label htmlFor="telId" className="labelIdentif">
                        Telefone:
                        <input
                          type="text"
                          name="tel"
                          id="telId"
                          className="form-control inpIdentif noInvert inpTel minText maxText patternText"
                          minLength={8}
                          maxLength={10}
                          inputMode="tel"
                          data-title="tel_prim"
                          data-reqlength="8"
                          data-maxlength="10"
                          data-pattern="9?\d{4}-\d{4}"
                          data-flags="g"
                          required
                          onInput={ev => {
                            formatTel(ev.currentTarget, false);
                            handleEventReq(ev.currentTarget);
                          }}
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan20"
                    >
                      <label htmlFor="tel2Id" className="labelIdentif">
                        Telefone Secundário:
                        <input
                          type="text"
                          name="tel_sec"
                          id="tel2Id"
                          className="form-control inpIdentif noInvert inpTel"
                          inputMode="tel"
                          data-title="tel_sec"
                          onInput={ev => {
                            formatTel(ev.currentTarget, false);
                            handleCondtReq(ev.currentTarget, {
                              min: 3,
                              max: 10,
                              pattern: ["9?d{4}-d{4}", "g"],
                            });
                          }}
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan18"
                    >
                      <label
                        htmlFor="telCountryCodeId"
                        className="labelIdentif"
                      >
                        Se estrangeiro, informe o código do País:
                        <input
                          type="number"
                          name="country_code"
                          id="telCountryCodeId"
                          className="form-control inpIdentif noInvert"
                          min="1"
                          max="999"
                          autoComplete="tel-country-code"
                          data-title="cod_pais_prim"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 1,
                              max: 6,
                              minNum: 1,
                              maxNum: 999,
                            })
                          }
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan21"
                    >
                      <label
                        htmlFor="tel2CountryCodeId"
                        className="labelIdentif"
                      >
                        Se estrangeiro, informe o código do País:
                        <input
                          type="number"
                          name="country_code_sec"
                          id="tel2CountryCodeId"
                          className="form-control inpIdentif noInvert"
                          min="1"
                          max="999"
                          autoComplete="tel-country-code"
                          data-title="cod_pais_sec"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 1,
                              max: 6,
                              minNum: 1,
                              maxNum: 999,
                            })
                          }
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan22"
                    >
                      <label htmlFor="email2Id" className="labelIdentif">
                        E-mail:
                        <input
                          type="text"
                          name="email"
                          id="email1Id"
                          className="form-control inpIdentif noInvert inpEmail"
                          autoComplete="email"
                          data-title="email_prim"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 6,
                              pattern: ["@", "g"],
                            })
                          }
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="spanMain fsAnamGSpan"
                      id="fsAnamGSpan22"
                    >
                      <label
                        htmlFor="email2Id"
                        className="labelIdentif noInvert"
                      >
                        E-mail Secundário:
                        <input
                          type="text"
                          name="email_sec"
                          id="email2Id"
                          className="form-control inpIdentif noInvert inpEmail"
                          autoComplete="email"
                          data-title="email_sec"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 6,
                              pattern: ["@", "g"],
                            })
                          }
                        />
                      </label>
                    </span>
                  </div>
                  <hr />
                </div>
                <div
                  className="divMain fsAnamGDiv alItSt900Q flexQ900NoWC gridAlItE gridTwoCol widFull900Q noEqualize"
                  id="fsAnamGDiv3"
                  role="group"
                >
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan6">
                    <label
                      htmlFor="countryId"
                      className="labelIdentif noInvert"
                    >
                      Nacionalidade:
                      <input
                        type="text"
                        name="country"
                        id="countryId"
                        className="form-control autocorrect inpIdentif noInvert minText patternText"
                        autoComplete="country"
                        data-title="nacionalidade"
                        minLength={3}
                        data-reqlength="3"
                        data-pattern="[^0-9]"
                        data-flags="g"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>
                    <br role="presentation" />
                  </span>

                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan10">
                    <label htmlFor="streetId" className="labelIdentif noInvert">
                      Cidade:
                      <input
                        type="text"
                        name="city"
                        id="cityId"
                        className="form-control autocorrect inpIdentif noInvert minText"
                        data-title="cidade"
                        minLength={3}
                        data-reqlength="3"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan7">
                    <label
                      htmlFor="munId"
                      className="labelIdentif noInvert"
                      id="labMunId"
                    >
                      Naturalidade:
                      <input
                        type="text"
                        name="naturality"
                        id="munId"
                        className="form-control autocorrect inpIdentif noInvert minText"
                        autoComplete="address-level2"
                        data-title="naturalidade"
                        minLength={3}
                        data-reqlength="3"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan12">
                    <label htmlFor="streetId" className="labelIdentif noInvert">
                      Endereço | Logradouro | Rua:
                      <input
                        type="text"
                        name="street"
                        id="streetId"
                        className="form-control autocorrect inpIdentif noInvert minText"
                        autoComplete="address-level3"
                        data-title="endereco"
                        minLength={3}
                        data-reqlength="3"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan8">
                    <label
                      htmlFor="streetId"
                      className="labelIdentif noInvert flexWC"
                    >
                      CEP:
                      <input
                        type="text"
                        name="cep"
                        id="cepId"
                        className="form-control inpIdentif noInvert minText maxText patternText"
                        minLength={3}
                        maxLength={11}
                        data-title="cep"
                        data-reqlength="3"
                        data-maxlength="11"
                        data-pattern="^\d{2}[\s.-]?\d{3}[\s.-]?\d{2,3}$"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                      <button
                        type="button"
                        id="autoCompCepBtn"
                        className="btn btn-secondary"
                        disabled
                      >
                        Preencher com CEP
                      </button>
                      <div
                        className="min20H"
                        id="divProgCEP"
                        style={{ height: "1rem" }}
                        role="separator"
                      ></div>
                      <div
                        className="min20H customBlValidityWarn"
                        id="divCEPWarn"
                        style={{ height: "1.6rem" }}
                        role="separator"
                      ></div>
                    </label>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan11">
                    <label htmlFor="streetId" className="labelIdentif noInvert">
                      Bairro:
                      <input
                        type="text"
                        name="neighbourhood"
                        id="neighbourhoodId"
                        className="form-control autocorrect inpIdentif noInvert minText"
                        minLength={3}
                        data-title="bairro"
                        data-reqlength="3"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan9">
                    <label htmlFor="UFId" className="labelIdentif forceInvert">
                      Unidade Federativa (Residência Atual):
                      <select
                        id="UFId"
                        autoComplete="address-level1"
                        className="form-select"
                        data-title="uf"
                        required
                      >
                        <optgroup label="Centro-Oeste">
                          <option className="optIdentif optUF" value="GO">
                            Goiás
                          </option>
                          <option className="optIdentif optUF" value="MT">
                            Mato Grosso
                          </option>
                          <option className="optIdentif optUF" value="MS">
                            Mato Grosso do Sul
                          </option>
                        </optgroup>

                        <optgroup label="Nordeste">
                          <option className="optIdentif optUF" value="AL">
                            Alagoas
                          </option>
                          <option className="optIdentif optUF" value="BA">
                            Bahia
                          </option>
                          <option className="optIdentif optUF" value="CE">
                            Ceará
                          </option>
                          <option className="optIdentif optUF" value="MA">
                            Maranhão
                          </option>
                          <option className="optIdentif optUF" value="PB">
                            Paraíba
                          </option>
                          <option className="optIdentif optUF" value="PE">
                            Pernambuco
                          </option>
                          <option className="optIdentif optUF" value="PI">
                            Piauí
                          </option>
                          <option className="optIdentif optUF" value="RN">
                            Rio Grande do Norte
                          </option>
                          <option className="optIdentif optUF" value="SE">
                            Sergipe
                          </option>
                        </optgroup>

                        <optgroup label="Norte">
                          <option className="optIdentif optUF" value="AC">
                            Acre
                          </option>
                          <option className="optIdentif optUF" value="AP">
                            Amapá
                          </option>
                          <option className="optIdentif optUF" value="AM">
                            Amazonas
                          </option>
                          <option className="optIdentif optUF" value="RO">
                            Rondônia
                          </option>
                          <option className="optIdentif optUF" value="RR">
                            Roraima
                          </option>
                          <option className="optIdentif optUF" value="TO">
                            Tocantins
                          </option>
                        </optgroup>

                        <optgroup label="Sudeste">
                          <option className="optIdentif optUF" value="ES">
                            Espírito Santo
                          </option>
                          <option className="optIdentif optUF" value="MG">
                            Minas Gerais
                          </option>
                          <option className="optIdentif optUF" value="RJ">
                            Rio de Janeiro
                          </option>
                          <option className="optIdentif optUF" value="SP">
                            São Paulo
                          </option>
                        </optgroup>

                        <optgroup label="Sul">
                          <option className="optIdentif optUF" value="PR">
                            Paraná
                          </option>
                          <option className="optIdentif optUF" value="RS">
                            Rio Grande do Sul
                          </option>
                          <option className="optIdentif optUF" value="SC">
                            Santa Catarina
                          </option>
                        </optgroup>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>
                  <span
                    role="group"
                    className="fsAnamGSpan locSpan form-switch flexColumn noInvert"
                    id="fsAnamGSpan13"
                  >
                    <span role="textbox">Número:</span>
                    <span
                      role="group"
                      className="flexDiv spanLoc fitSpaced mg-07t"
                    >
                      <input
                        type="number"
                        name="street_num"
                        id="streetNumId"
                        className="form-control inpIdentif noInvert inpLocNum halfL"
                        min="1"
                        autoComplete="address-level4"
                        data-title="num_rua"
                        onInput={ev =>
                          handleCondtReq(ev.currentTarget, {
                            min: 1,
                            minNum: 0,
                          })
                        }
                      />
                      <span
                        role="group"
                        className="halfSpanCheck halfR flexAlItCt noInvert"
                      >
                        <input
                          type="checkbox"
                          name="streetNumNullName"
                          id="streetNumNullId"
                          className="noInvert numNullId form-check-input"
                          role="switch"
                          data-title="switch_num_rua"
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    role="group"
                    className="fsAnamGSpan locSpan form-switch flexColumn noInvert"
                    id="fsAnamGSpan14"
                  >
                    <span role="textbox">Complemento:</span>
                    <span
                      role="group"
                      className="flexDiv spanLoc fitSpaced mg-07t"
                    >
                      <input
                        type="number"
                        name="loc_complement"
                        id="compNumId"
                        className="form-control inpIdentif noInvert inpLocNum halfL"
                        min="1"
                        autoComplete="address-level4"
                        data-title="comp_casa"
                        onInput={ev =>
                          handleCondtReq(ev.currentTarget, {
                            min: 1,
                            minNum: 0,
                          })
                        }
                      />
                      <span
                        role="group"
                        className="halfSpanCheck halfR flexAlItCt noInvert"
                      >
                        <input
                          type="checkbox"
                          name="compNumNullName"
                          id="compNumNullId"
                          className="noInvert numNullId form-check-input"
                          role="switch"
                          data-title="switch_comp_casa"
                        />
                      </span>
                    </span>
                  </span>
                </div>
                <hr />
                <div
                  className="flexDiv fsAnamGDiv alItSt900Q flexQ900NoWC gridTwoCol"
                  id="fsAnamGDiv4"
                  role="group"
                >
                  <span
                    role="group"
                    className="fsAnamGSpan mgr-3v"
                    id="fsAnamGSpan11"
                  >
                    <label htmlFor="dateBdayId" className="labelIdentif">
                      Data de Nascimento:
                      <input
                        type="date"
                        name="birth"
                        id="dateBdayId"
                        className="form-control inpIdentif noInvert maxCurrDate"
                        autoComplete="bday"
                        data-title="Nascimento"
                        required
                      />
                    </label>
                  </span>
                  <span role="group" className="fsAnamGSpan" id="fsAnamGSpan12">
                    <label htmlFor="dateAgeId" className="labelIdentif">
                      Idade:
                      <MemoAge />
                    </label>
                  </span>
                </div>
                <GenDiv />
              </section>
              <hr />
            </fieldset>
            <fieldset
              name="fsSdGeralName"
              id="fsSdGeralId"
              className="fsMain form-padded"
            >
              <legend id="fsSdGeralLeg" className="legMain">
                Dados de Saúde Geral
              </legend>
              <section className="sectionMain" id="fsSdGeralSect">
                <span
                  role="group"
                  className="fsSdGeralSpan"
                  id="fsSdGeralSpan1"
                >
                  <label htmlFor="qxPrinc" className="labelSdGeral">
                    Queixa Principal
                  </label>
                  <textarea
                    className="form-control taSdGeral"
                    name="issue"
                    id="qxPrinc"
                    maxLength={1000}
                    placeholder="Escreva aqui a(s) queixa(s)"
                    data-title="queixa_principal"
                    onClick={ev => addDblQuotes(ev.currentTarget)}
                    onInput={ev => addDblQuotes(ev.currentTarget)}
                  ></textarea>
                  <br role="presentation" />
                </span>
                <span
                  role="group"
                  className="fsSdGeralSPan"
                  id="fsSdGeralSpan2"
                >
                  <label htmlFor="histDc" className="labelSdGeral">
                    História da(s) Doença(s)
                  </label>
                  <textarea
                    className="form-control autocorrect autocorrectFirst ttaSdGeral"
                    id="histDc"
                    name="history"
                    maxLength={1000}
                    placeholder="Escreva aqui a história"
                    data-title="historia_doencas"
                  ></textarea>
                </span>
                <hr />
              </section>
            </fieldset>
            <fieldset
              name="fsAnamGRadName"
              id="fsAnamGRadId"
              className="fsMain form-padded"
            >
              <legend id="fsAnamGRadLegId" className="legMain">
                Possíveis Doenças
              </legend>
              <section
                className="sectionMain sectionConfirm flexDiv flexColumn flexQ900NoWC"
                id="fsAnamGRadSectId"
              >
                <div
                  id="fsAGRadDiv1"
                  className="flexDiv flexColumn fsAGRadDiv"
                  role="group"
                >
                  <RadioPair name="febr_r" fullName="Febre Reumática" />
                  <RadioPair
                    name="hep"
                    fullName="Hepatite ou Outra(s) Doença(s) Hepática(s)"
                    ctx={true}
                  />
                  <div className="divAdd gridTwoCol" id="divAddHep" role="list">
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_a"
                        id="hepAId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite A"
                      />{" "}
                      A
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_b"
                        id="hepBId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite B"
                      />{" "}
                      B
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_c"
                        id="hepCId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite C"
                      />{" "}
                      C
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_d"
                        id="hepDId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite D"
                      />{" "}
                      D
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_e"
                        id="hepEId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite E"
                      />{" "}
                      E
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_indirect"
                        id="hepInfcId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite por outras infecções"
                      />{" "}
                      Induzida por Outras Infecções
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_imun"
                        id="hepImunId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite Autoimune"
                      />{" "}
                      Autoimune
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_onc"
                        id="hepOncId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite Oncológica"
                      />{" "}
                      Oncológica
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_alc"
                        id="hepAlcId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite Alcoólica"
                      />{" "}
                      Alcoólica
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hep_tox"
                        id="hepDrgId"
                        className="cpbOp indivOp opHep"
                        data-title="Hepatite por intoxicação"
                      />{" "}
                      Induzida por Toxinas, Medicamentos ou Outra(s) Droga(s)
                    </span>
                  </div>
                  <RadioPair name="diab" fullName="Diabetes" ctx={true} />
                  <div
                    className="divAdd gridTwoCol"
                    id="divAddDiab"
                    role="list"
                  >
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diab_1"
                        id="diabTipo1Id"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="Diabetes tipo 1"
                      />{" "}
                      Tipo 1
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diab_2"
                        id="diabTipo2Id"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="Diabetes tipo 2"
                      />{" "}
                      Tipo 2
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diab_gest"
                        id="diabGestId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="Diabetes Gestacional"
                      />{" "}
                      Gestacional
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diab_ins"
                        id="diabInsId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="Diabetes Insipidus"
                      />{" "}
                      Insípido
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diab_lada"
                        id="diabLadaId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="Diabetes LADA"
                      />{" "}
                      LADA
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diab_mody"
                        id="diabModyId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="Diabetes MODY"
                      />{" "}
                      MODY
                    </span>
                  </div>
                  <RadioPair name="hiv" fullName="Portador de HIV" ctx={true} />
                  <div
                    className="divAdd gridTwoCol"
                    id="divAddHiv"
                    role="group"
                  >
                    <div role="group">
                      <span
                        role="group"
                        className="spanSub spanSubFsAnamGRad spanDivAddHiv"
                        id="spanCargHiv"
                      >
                        Carga Viral:
                      </span>
                      <div
                        className="flexDiv fsAnamGSpan labFlexDiv"
                        role="group"
                      >
                        <input
                          type="number"
                          name="hiv_copies"
                          id="hivCargId"
                          className="form-control cpbOp indivOp opHiv"
                          data-title="HIV — Carga Viral (cópias/ml)"
                        />
                        <label
                          htmlFor="hivCargId"
                          className="LbCpbOp"
                          id="labHivCarg"
                        >
                          cópias/ml
                        </label>
                      </div>
                    </div>
                    <br role="presentation" />
                    <div role="group">
                      <span
                        role="group"
                        className="spanSub spanSubFsAnamGRad spanDivAddHiv spanDivAddDatHiv"
                        id="spanDatDiagHiv"
                      >
                        Data do Diagnóstico:
                      </span>
                      <input
                        type="date"
                        name="hiv_diagnosis"
                        id="hivDateDiagId"
                        className="form-control cpbOp indivOp opHiv maxCurrDate"
                        data-title="HIV — Data do Diagnóstico"
                      />
                    </div>
                    <div role="group">
                      <span
                        role="group"
                        className="spanSub spanSubFsAnamGRad spanDivAddHiv spanDivAddDatHiv"
                        id="spanExamHiv"
                      >
                        Data do Último Exame:
                      </span>
                      <input
                        type="date"
                        name="hiv_last_exam"
                        id="hivDateExamId"
                        className="form-control cpbOp indivOp opHiv maxCurrDate"
                        data-title="HIV — Data do Último Exame"
                      />
                    </div>
                  </div>
                  <RadioPair name="t_sang" fullName="Transfusão de Sangue" />
                  <RadioPair
                    name="pr_alta"
                    fullName="Hipertensão Arterial Sistêmica"
                    ctx={true}
                  />
                  <div
                    className="divAdd gridTwoCol"
                    id="divAddPrAlta"
                    role="list"
                  >
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="has_stg"
                        id="HASPreId"
                        className="cpbOp indivOp opHAS"
                        data-title="Pré-hipertensão"
                        data-value="pre"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />{" "}
                      Pré-hipertensão
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="has_stg"
                        id="HASStg1Id"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Estágio 1"
                        data-value="1"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />{" "}
                      Estágio 1
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="has_stg"
                        id="HASStg2Id"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Estágio 2"
                        data-value="2"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />{" "}
                      Estágio 2
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="has_stg"
                        id="HASStg3Id"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Estágio 3"
                        data-value="3"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />{" "}
                      Estágio 3 | Em Crise
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="has_stg"
                        id="HASPrimId"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Primária | Essencial"
                        data-value="prim"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />{" "}
                      Primária | Essencial
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="has_stg"
                        id="HASSecId"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Secundária"
                        data-value="sec"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />{" "}
                      Secundária
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="has_res"
                        id="HASResId"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Resistente"
                      />{" "}
                      Resistente
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="has_sist"
                        id="HASIsolId"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Sistólica Isolada"
                      />{" "}
                      Sistólica Isolada
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="has_mal"
                        id="HASMalId"
                        className="cpbOp indivOp opHAS"
                        data-title="Hipertensão Maligna"
                      />{" "}
                      Maligna
                    </span>
                  </div>
                </div>
                <div
                  id="fsAGRadDiv2"
                  className="flexDiv flexColumn fsAGRadDiv"
                  role="group"
                >
                  <RadioPair
                    name="pb_card"
                    fullName="Problema(s) Cardíaco(s)"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_ren"
                    fullName="Problema(s) Renal(is)"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_gast"
                    fullName="Problema(s) Gástrico(s)"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_resp"
                    fullName="Problema(s) Respiratório(s)"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_alerg"
                    fullName="Problema(s) Alérgico(s)"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_art_reum"
                    fullName="Problema(s) Articular(es) ou Reumáticos"
                    add="ta"
                  />
                </div>
                <div
                  id="fsAGRadDiv3"
                  className="flexDiv flexColumn fsAGRadDiv"
                  role="group"
                >
                  <RadioPair
                    name="pb_sist"
                    fullName="Alguma Outra Doença Sistêmica"
                    add="ta"
                    altPh="Escreva aqui sobre as Doenças Sistêmicas específicas"
                  />
                  <RadioPair
                    name="pb_alc"
                    fullName="Uso de Bebidas Alcoólicas"
                    add="ta"
                    altPh="Escreva aqui sobre os problemas com uso de Bebidas alcoólicas"
                  />
                  <RadioPair name="fumo" fullName="É fumante" ctx={true} />
                  <div
                    className="divAdd gridTwoCol switchedDiv"
                    id="divAddFumo"
                    role="group"
                  >
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="spanFumSubs"
                    >
                      {" "}
                      <strong>Nível:</strong>
                      <br role="presentation" />
                      <span role="list" className="cbDoencaSubt">
                        <div role="listitem">
                          <input
                            type="radio"
                            name="fumo_lvl"
                            id="fumoLeveId"
                            className="radOp radAdd radFumo"
                            data-title="fumo_leve"
                            data-value="leve"
                          />{" "}
                          Leve
                        </div>
                        <div role="listitem">
                          <input
                            type="radio"
                            name="fumo_lvl"
                            id="fumoModId"
                            className="radOp radAdd radFumo"
                            data-title="fumo_moderado"
                            data-value="moderado"
                          />{" "}
                          Moderado
                        </div>
                        <div role="listitem">
                          <input
                            type="radio"
                            name="fumo_lvl"
                            id="fumoAltoId"
                            className="radOp radAdd radFumo"
                            data-title="fumo_alto"
                            data-value="alto"
                          />{" "}
                          Alto
                        </div>
                      </span>
                    </span>
                    <span
                      role="list"
                      className="spanSub spanSubFsAnamGRad form-check flexColumn"
                      id="spanFumSubs"
                    >
                      <strong>Substância de Consumo</strong>
                      <div role="listitem">
                        <input
                          type="checkbox"
                          className="opFumSubs"
                          name="fumo_tab"
                          id="fumIdTab"
                          data-title="Fumo — Consumo de Tabaco"
                        />
                        <label
                          htmlFor="fumIdTab"
                          className="labOpFumSubs"
                          id="labFumTab"
                        >
                          Tabaco
                        </label>
                      </div>
                      <div role="listitem">
                        <input
                          type="checkbox"
                          className="opFumSubs"
                          name="fumo_can"
                          id="fumIdCan"
                          data-title="Fumo — Consumo de Cannabis"
                        />
                        <label
                          htmlFor="fumIdCan"
                          className="labOpFumSubs"
                          id="labFumCan"
                        >
                          Cannabis
                        </label>
                      </div>
                      <div role="listitem">
                        <input
                          type="checkbox"
                          className="opFumSubs"
                          name="fumo_other"
                          id="fumIdOther"
                          data-title="Fumo — Consumo de Outras Substâncias"
                        />
                        <label
                          htmlFor="fumIdOther"
                          className="labOpFumSubs"
                          id="labFumOther"
                        >
                          Outros
                        </label>
                      </div>
                    </span>
                    <label
                      htmlFor="tempApFumoId"
                      className="labFum form-check"
                      id="tempFum"
                    >
                      <strong>Tempo aproximado do hábito, em meses:</strong>
                      <input
                        type="number"
                        name="fumo_months"
                        className="form-control"
                        id="tempApFumoId"
                        min="0"
                        data-title="Fumo — Tempo aproximado (meses)"
                      />
                    </label>
                    <br role="presentation" />
                  </div>
                  <RadioPair
                    name="pb_drg"
                    fullName="Uso de Outras Drogas"
                    add="ta"
                    altPh="Escreva aqui sobre os problemas com uso de drogas"
                  />
                  <RadioPair name="grv" fullName="Gravidez" ctx={true} />
                  <div className="divMain divAdd" id="divAddGrv" role="group">
                    <input
                      type="checkbox"
                      name="GrvAtName"
                      id="GrvAtId"
                      className="radOp radAdd radGrv"
                      data-title="gravidez_atual"
                    />{" "}
                    Atual
                    <input
                      type="checkbox"
                      name="GrvPasName"
                      id="GrvPasId"
                      className="radOp radAdd radGrv"
                      data-title="gravidez_passada"
                    />{" "}
                    Passada
                  </div>
                  <RadioPair
                    name="ant_c"
                    fullName="Uso de Anticoncepcional(is)"
                    add="ta"
                    altPh="Escreva aqui sobre o uso de Anticoncepcionais"
                  />
                </div>
                <div
                  id="fsAGRadDiv4"
                  className="flexDiv flexColumn fsAGRadDiv"
                  role="group"
                >
                  <RadioPair
                    name="op"
                    fullName="Operação ou Extração de Dente(s)"
                    add="ta"
                    altPh="Qual ou quais Dente(s) Operado(s) e/ou Extraído(s)?"
                  />
                  <RadioPair
                    name="pb_cic"
                    fullName="Problema(s) com Cicatrização"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_anst"
                    fullName="Problema(s) com Anestesia(s)"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_hem"
                    fullName="Problema(s) com Hemorragia"
                    add="ta"
                  />
                  <RadioPair
                    name="pb_intrn"
                    fullName="Internação Recente"
                    add="ta"
                    altPh="Tempo aproximado de Internação"
                  />
                  <RadioPair
                    name="pb_med"
                    fullName="Uso Atual de Medicação Controlada"
                    add="ta"
                    altPh="Qual ou quais Medicações Controladas?"
                  />
                </div>
              </section>
              <hr />
              <fieldset
                className="sectionMain sectionConfirm noInvert"
                id="fsAnamGRadODSectId"
              >
                <legend className="bolded" id="hOD">
                  Outras Doenças
                </legend>
                <div
                  className="divMain gridThreeCol"
                  id="divOtherD"
                  role="list"
                >
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanCand"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="cand"
                        id="candId"
                        className="radOD"
                        data-title="Candidiase"
                      />
                    </div>
                    <label
                      htmlFor="candId"
                      className="labelOD input-group-text"
                      id="labCand"
                    >
                      Candidíase
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanGon"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="gon"
                        id="gonId"
                        className="radOD"
                        data-title="Gonorreia"
                      />
                    </div>
                    <label
                      htmlFor="gonId"
                      className="labelOd input-group-text"
                      id="labGon"
                    >
                      Gonorreia
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanHerp"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="herp"
                        id="herpId"
                        className="radOD"
                        data-title="Herpes"
                      />
                    </div>
                    <label
                      htmlFor="herpId"
                      className="labelOd input-group-text"
                      id="labHerp"
                    >
                      Herpes
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanHerpZ"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="herp_z"
                        id="herpZId"
                        className="radOD"
                        data-title="Herpes Zoster"
                      />
                    </div>
                    <label
                      htmlFor="herpZId"
                      className="labelOd input-group-text"
                      id="labHerpZ"
                    >
                      Herpes Zoster
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanPneu"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="pneumonia"
                        id="pneuId"
                        className="radOD"
                        data-title="Pneumonia"
                      />
                    </div>
                    <label
                      htmlFor="pneuId"
                      className="labelOd input-group-text"
                      id="labPneu"
                    >
                      Pneumonia
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanSif"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="sif"
                        id="sifId"
                        className="radOD"
                        data-title="Sífilis"
                      />
                    </div>
                    <label
                      htmlFor="sifId"
                      className="labelOd input-group-text"
                      id="labSif"
                    >
                      Sífilis
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3 noExpandRad"
                    id="spanToxop"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="toxop"
                        id="toxopId"
                        className="radOD noExpandRad"
                        data-title="Toxoplasmose"
                      />
                    </div>
                    <label
                      htmlFor="toxopId"
                      className="labelOd input-group-text"
                      id="labToxop"
                    >
                      Toxoplasmose
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3 noExpandRad"
                    id="spanTuberc"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="checkbox"
                        name="tuberc"
                        id="tubercId"
                        className="radOD noExpandRad"
                        data-title="Tuberculose"
                      />
                    </div>
                    <label
                      htmlFor="tubercId"
                      className="labelOd input-group-text"
                      id="labTuberc"
                    >
                      Tuberculose
                    </label>
                  </span>
                  <span
                    role="listem"
                    className="spanMain sectODSpan input-group mb-3"
                    id="spanOtherD"
                  >
                    <div className="input-group-text" role="group">
                      <input
                        type="radio"
                        name="pbOtherDName"
                        id="pbOtherDIdYes"
                        className="radOD"
                        data-title="outras_doencas"
                        onKeyDown={keydown => {
                          opRadioHandler(
                            keydown,
                            Array.from(
                              document.querySelectorAll(
                                'input[id$="Yes"], input[id$="No"]'
                              )
                            )
                          );
                        }}
                      />
                    </div>
                    <label
                      htmlFor="pbOtherDIdYes"
                      className="labelOd input-group-text"
                      id="labPbOtherIdYes"
                    >
                      Outra(s)
                    </label>
                    <textarea
                      id="textAddOtherDId"
                      className="form-control tAOD textAdd"
                      name="other_d"
                      maxLength={1000}
                      placeholder="Qual ou quais?"
                      data-title="Descrição – Outras Doenças"
                    ></textarea>
                  </span>
                </div>
              </fieldset>
              <hr />
              <section
                className="sectionMain sectionConfirm"
                id="fsAnamGCBAntSectId"
              >
                <fieldset name="fsAntFamName" id="fsAntFamId" className="fsSub">
                  <legend id="fsAntFamLeg" className="bolded">
                    Antecedentes Familiares
                  </legend>
                  <section id="fsAntFamSect" className="sectionSub">
                    <span
                      role="group"
                      className="spanMain spanSectAnt input-group mb-3"
                      id="spanMainAddDiabFam"
                    >
                      <div
                        className="input-group-text"
                        id="divCheckDiabFam"
                        role="group"
                      >
                        <input
                          type="checkbox"
                          name="fam_diab"
                          id="antFamDiabId"
                          className="cbFam"
                          data-title="Antecedentes Familiares — Diabetes"
                          onClick={ev => handleDivAddShow(ev.currentTarget)}
                        />
                      </div>
                      <label
                        htmlFor="antFamDiabId"
                        className="famLabel input-group-text"
                        id="labAntFamDiab"
                      >
                        Diabetes
                      </label>
                    </span>
                    <div
                      className="divAdd divAntFam"
                      id="divAddFamDiab"
                      role="group"
                    >
                      <strong style={{ marginLeft: "0.5rem" }}>Subtipo:</strong>
                      <div
                        className="divAdd gridThreeCol divAntFamCheck"
                        role="list"
                        style={{ marginBlock: "0.5rem", padding: "0.5rem" }}
                      >
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamTipo1Name"
                            id="diabFamTipo1Id"
                            className="cpbOp famOp opDiab opDiabFam opDiabTypeFam"
                            data-title="familia_diabetes1"
                          />{" "}
                          Tipo 1
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamTipo2Name"
                            id="diabFamTipo2Id"
                            className="cpbOp famOp opDiab opDiabFam opDiabTypeFam"
                            data-title="familia_diabetes2"
                          />{" "}
                          Tipo 2
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamGestName"
                            id="diabFamGestId"
                            className="cpbOp famOp opDiab opDiabFam opDiabTypeFam"
                            data-title="familia_diabetes_gestacional"
                          />{" "}
                          Gestacional
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamInsName"
                            id="diabFamInsId"
                            className="cpbOp famOp opDiab opDiabFam opDiabTypeFam"
                            data-title="familia_diabetes_insipida"
                          />{" "}
                          Insípido
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamLadaName"
                            id="diabFamLadaId"
                            className="cpbOp famOp opDiab opDiabFam opDiabTypeFam"
                            data-title="familia_diabetes_lada"
                          />{" "}
                          LADA
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamModyName"
                            id="diabFamModyId"
                            className="cpbOp famOp opDiab opDiabFam opDiabTypeFam"
                            data-title="familia_diabetes_mody"
                          />{" "}
                          MODY
                        </span>
                      </div>
                      <DivAntFam name="diab" fullName="Diabetes" div={false} />
                    </div>
                    <span
                      role="group"
                      className="spanMain spanSectAnt input-group mb-3"
                      id="spanMainAddDislipFam"
                    >
                      <div
                        className="input-group-text"
                        id="divCheckDislipFam"
                        role="group"
                      >
                        <input
                          type="checkbox"
                          name="fam_dislip"
                          id="antFamDislipId"
                          className="cbFam"
                          data-title="Antecedentes Familiares — Dislipidemia"
                          onClick={ev => handleDivAddShow(ev.currentTarget)}
                        />
                      </div>
                      <label
                        htmlFor="antFamDislipId"
                        className="famLabel input-group-text"
                        id="labAntFamDislip"
                      >
                        Dislipidemia(s)
                      </label>
                    </span>
                    <div
                      className="divAdd divAntFam"
                      id="divAddFamDislip"
                      role="group"
                    >
                      <div
                        className="divSubtype container-lg"
                        id="divSubtypeDislip"
                        role="group"
                      >
                        <strong>Subtipo:</strong>
                        <br role="presentation" />
                        <div
                          className="divAdd gridThreeCol divAntFamCheck"
                          role="list"
                        >
                          <span role="listitem" className="cbDoencaSubt">
                            <input
                              type="checkbox"
                              name="dislipFamGeralName"
                              id="dislipFamGeralId"
                              className="cpbOp famOp opDislip opDislipFam opDislipTypeFam"
                              data-title="dislip_geral"
                            />{" "}
                            Geral
                          </span>
                          <span role="listitem" className="cbDoencaSubt">
                            <input
                              type="checkbox"
                              name="dislipFamIsolName"
                              id="dislipFamIsolId"
                              className="cpbOp famOp opDislip opDislipFam opDislipTypeFam"
                              data-title="dislip_isolada"
                            />{" "}
                            Isolada
                          </span>
                          <span role="listitem" className="cbDoencaSubt">
                            <input
                              type="checkbox"
                              name="dislipFamMixName"
                              id="dislipFamMixId"
                              className="cpbOp famOp opDislip opDislipFam opDislipTypeFam"
                              data-title="dislip_mista"
                            />{" "}
                            Mista | Combinada
                          </span>
                          <span role="listitem" className="cbDoencaSubt">
                            <input
                              type="checkbox"
                              name="dislipFamHipoName"
                              id="dislipFamHipoId"
                              className="cpbOp famOp opDislip opDislipFam opDislipTypeFam"
                              data-title="dislip_hipoalfa"
                            />{" "}
                            Hipoalfalipoproteinemia
                          </span>
                          <span role="listitem" className="cbDoencaSubt">
                            <input
                              type="checkbox"
                              name="dislipFamHiperName"
                              id="dislipFamHiperId"
                              className="cpbOp famOp opDislip opDislipFam opDislipTypeFam"
                              data-title="dislip_hipertrig"
                            />{" "}
                            Hipertrigliceridemia
                          </span>
                        </div>
                      </div>
                      <DivAntFam
                        name="dislip"
                        fullName="Dislipidemia"
                        gen={true}
                      />
                    </div>
                    <span
                      role="group"
                      className="spanMain spanSectAnt input-group mb-3"
                      id="spanMainAddCardFam"
                    >
                      <div
                        className="input-group-text"
                        id="divCheckCardFam"
                        role="group"
                      >
                        <input
                          type="checkbox"
                          name="fam_card"
                          id="antFamCardId"
                          className="cbFam"
                          data-title="Antecedentes Familiares — Doença(s) Cardíaca(s)"
                          onClick={ev => handleDivAddShow(ev.currentTarget)}
                        />
                      </div>
                      <label
                        htmlFor="antFamCardId"
                        className="famLabel input-group-text"
                        id="labAntFamCard"
                      >
                        Doença(s) Cardíaca(s)
                      </label>
                    </span>
                    <DivAntFam
                      name="card"
                      fullName="Doenças Cardíacas(s)"
                      ta={true}
                    />
                    <span
                      role="group"
                      className="spanMain spanSectAnt input-group mb-3"
                    >
                      <div
                        className="input-group-text"
                        id="divCheckPulmFam"
                        role="group"
                      >
                        <input
                          type="checkbox"
                          name="fam_pulm"
                          id="antFamPulmId"
                          className="cbFam"
                          data-title="Antecedentes Familiares — Doença(s) Pulmonar(es)"
                          onClick={ev => handleDivAddShow(ev.currentTarget)}
                        />
                      </div>
                      <label
                        htmlFor="antFamPulmId"
                        className="famLabel input-group-text"
                        id="labAntFamPulm"
                      >
                        Doença(s) Pulmonar(es)
                      </label>
                      <br role="presentation" />
                    </span>
                    <DivAntFam
                      name="pulm"
                      fullName="Doença(s) Pulmonar(es)"
                      ta={true}
                    />
                    <span
                      role="group"
                      className="spanMain spanSectAnt input-group mb-3"
                    >
                      <div
                        className="input-group-text"
                        id="divCheckOncFam"
                        role="group"
                      >
                        <input
                          type="checkbox"
                          name="fam_onc"
                          id="antFamOncId"
                          className="cbFam"
                          data-title="Antecedentes Familiares — Doença(s) Oncológica(s)"
                          onClick={ev => handleDivAddShow(ev.currentTarget)}
                        />
                      </div>
                      <label
                        htmlFor="antFamOncId"
                        className="famLabel input-group-text"
                        id="labAntFamOnc"
                      >
                        Doença(s) Oncológica(s)
                      </label>
                    </span>
                    <DivAntFam
                      name="onc"
                      fullName="Doença(s) Oncológica(s)"
                      ta={true}
                    />
                  </section>
                  <hr />
                </fieldset>
                <AntMedFs phCb={clearPhCb} />
              </section>
              <hr />
              <fieldset
                className="sectionMain sectionConfirm noInvert"
                id="fsAnamGFreqSectId"
              >
                <legend className="bolded" id="hFreq">
                  Frequências de Rotina
                </legend>
                <div
                  className="divMain divFreq gridTwoCol"
                  id="divFreqOdont"
                  role="group"
                >
                  <span
                    role="group"
                    className="sectFreqSpan"
                    id="spanFreqEscov"
                  >
                    <label
                      htmlFor="escovNId"
                      className="labDlist"
                      id="labEscovN"
                    >
                      Escovações por dia:
                    </label>
                    <input
                      type="number"
                      list="escovN"
                      name="escov_n_day"
                      id="escovNId"
                      className="form-control freqInpList"
                      data-title="Escovações por dia"
                      autoCapitalize="on"
                    />
                    <datalist id="escovN">
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                      <option value="4"></option>
                    </datalist>
                    <br role="presentation" />
                  </span>

                  <span role="group" className="sectFreqSpan" id="spanFreqFio">
                    <label htmlFor="fioNId" className="labDlist" id="labFioN">
                      Uso de Fio Dental por dia:
                    </label>
                    <input
                      type="number"
                      list="fioN"
                      name="fio_n_day"
                      id="fioNId"
                      className="form-control freqInpList"
                      data-title="Uso de Fio Dental por dia"
                      autoCapitalize="on"
                    />
                    <datalist id="fioN">
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                      <option value="4"></option>
                    </datalist>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="sectFreqSpan" id="spanFreqEnxg">
                    <label htmlFor="enxgNId" className="labDlist" id="labEnxgN">
                      Uso de Enxaguante Bucal por dia:
                    </label>
                    <input
                      type="number"
                      list="enxgN"
                      name="enxg_n_day"
                      id="enxgNId"
                      className="form-control freqInpList"
                      data-title="Uso de Enxaguante Bucal por dia"
                      autoCapitalize="on"
                    />
                    <datalist className="dlistFreq" id="enxgN">
                      <option
                        className="optDlist optDlistEnxg"
                        value="1"
                      ></option>
                      <option
                        className="optDlist optDlistEnxg"
                        value="2"
                      ></option>
                      <option
                        className="optDlist optDlistEnxg"
                        value="3+"
                      ></option>
                    </datalist>
                    <br role="presentation" />
                  </span>
                  <span role="group" className="sectFreqSpan" id="spanDoce">
                    <span
                      role="group"
                      className="sectFreqSubSpan"
                      id="pbAlmSpan"
                    >
                      Consumo de Corantes ou Doces:
                      <br role="presentation" />
                      <span
                        role="group"
                        className="sectFreqSubSpan form-check"
                        id="pbAlmSubSubSpan"
                      >
                        <input
                          type="radio"
                          name="cor_doces"
                          id="pbAlmYes"
                          className="freqRad freqAlmRad boolOp form-check-input"
                          data-title="Doces (Sim)"
                          onKeyDown={keydown => {
                            opRadioHandler(
                              keydown,
                              Array.from(
                                document.querySelectorAll(
                                  'input[id$="Yes"], input[id$="No"]'
                                )
                              )
                            );
                          }}
                        />
                        <label
                          htmlFor="pbAlmYes"
                          className="labRad inpFreqRot form-check-label"
                        >
                          Sim
                        </label>
                        <input
                          type="radio"
                          name="cor_doces"
                          id="pbAlmNo"
                          className="freqRad freqAlmRad boolOp"
                          data-title="Doces (Não)"
                          onKeyDown={keydown => {
                            opRadioHandler(
                              keydown,
                              Array.from(
                                document.querySelectorAll(
                                  'input[id$="Yes"], input[id$="No"]'
                                )
                              )
                            );
                          }}
                        />
                        <label
                          htmlFor="pbAlmNo"
                          className="labRad inpFreqRot form-check-label"
                        >
                          Não
                        </label>
                      </span>
                    </span>
                    <textarea
                      id="textAddAlm"
                      name="notes_cor_doces"
                      maxLength={1000}
                      placeholder="Qual ou quais?"
                      className="divAdd form-control"
                      data-title="Descrição — Doces e/ou Corantes"
                    ></textarea>
                    <br role="presentation" />
                  </span>
                </div>
              </fieldset>
              <hr />
            </fieldset>
            <fieldset
              name="fsConfirmName"
              id="fsConfirmId"
              className="fsMain form-padded"
            >
              <section
                className="sectionMain sectionConfirm"
                id="sectConfirmCheck"
              >
                <Declaration text="&#34;DECLARO SEREM VERDADEIRAS AS INFORMAÇÕES ACIMA&#34;" />
                <div className="divMain" id="divConfirm" role="group">
                  <BtnConform
                    dispatch={setDeclaration}
                    state={shouldShowDeclaration}
                  />
                  {shouldShowDeclaration && (
                    <AGDeclaration
                      state={shouldShowDeclaration}
                      dispatch={setDeclaration}
                    />
                  )}
                  <div
                    className="divSub flexEl divConfirm flexQ900NoW"
                    id="divConfirm2"
                    role="group"
                  >
                    <label
                      htmlFor="confirmLocId"
                      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC bolded widHalf900Q noInvert"
                      id="labConfirmLoc"
                    >
                      Local:
                      <MemoLoc />
                    </label>
                    <ConfirmDate />
                    <hr />
                  </div>
                  <Signature />
                </div>
                <hr />
              </section>
              <SectConfirmBtns />
              <hr />
            </fieldset>
          </form>
        </main>
      </div>
    </ErrorBoundary>
  );
}
