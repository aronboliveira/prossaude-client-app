import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useCallback, useState } from "react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import { entryEl } from "@/lib/global/declarations/types";
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
  addListenerFamHistChecks,
  addListenersCepElements,
  addListenersEmailInputs,
} from "@/lib/locals/aGPage/aGController";
import {
  deactTextInput,
  handleCondtReq,
  handleEventReq,
  opRadioHandler,
  subForm,
  syncAriaStates,
  toggleConformDlg,
} from "@/lib/global/handlers/gHandlers";
import { addDblQuotes } from "@/lib/locals/aGPage/aGModel";
import AntMedFs from "../../components/interactive/ag/AntMedFs";
import AGTips from "../../components/interactive/ag/AGTips";
import { formatTel } from "@/lib/global/gModel";
import AGDeclaration from "../../components/interactive/ag/AGDeclaration";

let agGenElement = undefined,
  agGenValue = "masculino",
  agIsAutoCorrectOn = true;

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
    addListenerFamHistChecks();
    addListenerExportBtn("anamG");
    addCanvasListeners();
    addResetAstListener();
    toggleConformDlg();
    addEventListener("resize", handleResize);
    syncAriaStates(document.querySelectorAll("*"));
    watchLabels();
    return () => {
      removeEventListener("resize", handleResize);
    };
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
                <button
                  className="transparent-el-bg"
                  id="tipsBtn"
                  onClick={() => setTips(!shouldShowTips)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-question-circle-fill widMax-3r htMax1-5r"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                  </svg>
                </button>
                {shouldShowTips && (
                  <AGTips dispatch={setTips} state={shouldShowTips} />
                )}
              </div>
              <div className="switchDiv flexQ900NoWC" role="group">
                <span
                  role="group"
                  className="form-switch spanRight"
                  id="autocorrectDiv"
                >
                  <input
                    type="checkbox"
                    className="deActBtn form-check-input"
                    role="switch"
                    id="deactAutocorrectBtnPac"
                    data-title="autocorrecao"
                    defaultChecked
                  />{" "}
                  <strong>Autocorreção</strong>
                </span>
              </div>
            </div>
            <span
              role="group"
              className="control flexJSt flexQ900NoW"
              id="spanHFlex"
            >
              <input
                type="date"
                className="form-control d-ibl minCurrDate"
                id="dateHeader"
                placeholder="Date"
                data-title="data_cabecalho"
              />
              <button
                type="button"
                className="datBtn d-ibl btn btn-secondary"
                id="headerDatBtn"
              >
                Usar data atual
              </button>
            </span>
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
                  <div
                    className="fsAnamGDiv alItSt900Q flexQ900NoWC flexAlItE flexNoW flexSimple wsNoW cGap0 ws900N"
                    id="fsAnamGDiv1"
                    role="group"
                  >
                    <span
                      role="group"
                      className="fsAnamGSpan flexAlItCt col"
                      id="fsAnamGSpan1"
                    >
                      <label htmlFor="firstNameId" className="labelIdentif">
                        Primeiro Nome (Simples ou Composto):
                        <input
                          type="text"
                          name="firstNameName"
                          id="firstNameId"
                          className="form-control autocorrect inpIdentif noInvert minText maxText patternText"
                          autoComplete="given-name"
                          data-title="primeiro_nome"
                          data-reqlength="3"
                          data-maxlength="99"
                          data-pattern="[^0-9]"
                          data-flags="gi"
                          minLength={3}
                          maxLength={99}
                          required
                          onInput={ev => handleEventReq(ev.currentTarget)}
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="fsAnamGSpan flexAlItCt col"
                      id="fsAnamGSpan2"
                    >
                      <label
                        htmlFor="additionalNameId"
                        className="labelIdentif"
                      >
                        Sobrenome(s) do Meio, se presente(s):
                        <input
                          type="text"
                          name="additionalNameName"
                          id="additionalNameId"
                          className="form-control autocorrect inpIdentif noInvert"
                          data-title="nome_do_meio"
                          autoComplete="additional-name"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 3,
                              max: 99,
                              pattern: ["[^0-9]", "gi"],
                            })
                          }
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                    <span
                      role="group"
                      className="fsAnamGSpan flexAlItCt col"
                      id="fsAnamGSpan3"
                    >
                      <label htmlFor="familyNameId" className="labelIdentif">
                        Último Sobrenome:
                        <input
                          type="text"
                          name="familyNameName"
                          id="familyNameId"
                          className="form-control autocorrect inpIdentif noInvert minText maxText patternText"
                          autoComplete="family-name"
                          required
                          data-title="ultimo_nome"
                          data-reqlength="3"
                          data-maxlength="99"
                          data-pattern="[^0-9]"
                          data-flags="gi"
                          minLength={3}
                          maxLength={99}
                          onInput={ev => handleEventReq(ev.currentTarget)}
                        />
                      </label>
                      <br role="presentation" />
                    </span>
                  </div>
                  <div
                    className="fsAnamGDiv alItSt900Q flexQ900NoWC flexAlItE noAdj flexNoWR flexTwin-width"
                    role="group"
                    id="divIdentif_2"
                  >
                    <span
                      role="group"
                      className="fsAnamGSpan flexAlItCt col"
                      id="fsAnamGSpan4"
                    >
                      <label htmlFor="socialNameId" className="labelIdentif">
                        Nome Social:
                        <input
                          type="text"
                          name="socialNameName"
                          id="socialNameId"
                          className="form-control autocorrect inpIdentif noInvert"
                          data-title="nome_social"
                          autoComplete="given-name"
                          onInput={ev =>
                            handleCondtReq(ev.currentTarget, {
                              min: 3,
                              max: 99,
                              pattern: ["[^0-9]", "gi"],
                            })
                          }
                        />
                      </label>
                    </span>
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
                          name="telAreaCodeName"
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
                          name="tel2AreaCodeName"
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
                          name="telName"
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
                          name="tel2Name"
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
                          name="telCountryCodeName"
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
                          name="tel2CountryCodeName"
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
                          name="email1Name"
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
                          name="email2Name"
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
                        name="countryName"
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
                        name="cityName"
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
                        name="munName"
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
                        name="streetName"
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
                        name="cepName"
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
                        name="neighbourhoodName"
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
                        defaultValue="RJ"
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
                        name="streetNumName"
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
                        name="compNumName"
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
                        name="dateBdayName"
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
                      <input
                        type="number"
                        name="dateAgeName"
                        id="dateAgeId"
                        className="form-control inpIdentif noInvert minText maxText minNum maxNum patternText"
                        min="0"
                        max="255"
                        minLength={1}
                        maxLength={4}
                        defaultValue="30"
                        required
                        data-title="Idade"
                        data-reqlength="1"
                        data-maxlength="4"
                        data-minnum="0"
                        data-maxnum="255"
                        data-pattern="^[\d,.]+$"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>
                  </span>
                </div>
                <div className="gridTwoCol noInvert" id="genDiv" role="group">
                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan"
                    id="spanFsAnamG13"
                  >
                    <label htmlFor="genId" className="labelIdentif">
                      Gênero:
                      <select
                        name="genName"
                        id="genId"
                        className="form-select inpIdentif noInvert"
                        data-title="genero"
                        defaultValue="masculino"
                        required
                      >
                        <option className="optIdentif optGen" value="masculino">
                          Masculino | Homem binário
                        </option>
                        <option className="optIdentif optGen" value="feminino">
                          Feminino | Mulher binária
                        </option>
                        <option
                          className="optIdentif optGen"
                          value="naoBinario"
                        >
                          Não-Binário
                        </option>
                        <option className="optIdentif optGen" value="outros">
                          Outros
                        </option>
                        <option className="optIdentif optGen" value="undefined">
                          Não deseja declarar
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>

                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan"
                    id="spanFsAnamG14"
                  >
                    <label htmlFor="genBirthRelId" className="labelIdentif">
                      Identidade em relação ao gênero designado na nascença:
                      <select
                        name="genBirthRelName"
                        id="genBirthRelId"
                        className="form-select inpIdentif noInvert"
                        data-title="identidade_genero_nascenca"
                        defaultValue="cis"
                        required
                      >
                        <option
                          className="optIdentif optgenBirthRel"
                          value="cis"
                        >
                          Cisgênero | Cissexual
                        </option>
                        <option
                          className="optIdentif optgenBirthRel"
                          value="trans"
                        >
                          Transgênero | Transsexual
                        </option>
                        <option
                          className="optIdentif optgenBirthRel"
                          value="outros"
                        >
                          Outros
                        </option>
                        <option
                          className="optIdentif optgenBirthRel"
                          value="undefined"
                        >
                          Não deseja declarar
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>

                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt genSpan"
                    id="spanFsAnamG15"
                    hidden
                    defaultValue="avancado"
                  >
                    <label htmlFor="genTransId" className="labelIdentif">
                      Estágio da Transição Hormonal:
                      <select
                        name="genTransName"
                        id="genTransId"
                        className="form-select inpIdentif noInvert"
                        data-title="stg_transicao_hormonal"
                        defaultValue={`avancado`}
                      >
                        <option
                          className="optIdentif optgenTrans"
                          value="undefined"
                        >
                          Indefinido
                        </option>
                        <option className="optIdentif optgenTrans" value="no">
                          Não está em transição
                        </option>
                        <option
                          className="optIdentif optgenTrans"
                          value="inicial"
                        >
                          Inicial
                        </option>
                        <option
                          className="optIdentif optgenTrans"
                          value="intermediario"
                        >
                          Intermediário
                        </option>
                        <option
                          className="optIdentif optgenTrans"
                          value="avancado"
                        >
                          Avançado
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>

                  <span
                    role="group"
                    id="spanFsAnamG16"
                    className="fsAnamGSpan flexAlItCt genSpan inpIdentif noInvert"
                    hidden
                  >
                    <label htmlFor="genFisAlinId" className="labelIdentif">
                      Alinhamento de características físicas predominante:
                      <select
                        name="genFisAlinName"
                        id="genFisAlinId"
                        className="form-select inpIdentif noInvert"
                        data-title="corpo_align"
                      >
                        <option
                          className="optIdentif optgenFisAlin"
                          value="masculinizado"
                        >
                          Masculinizado
                        </option>
                        <option
                          className="optIdentif optgenFisAlin"
                          value="feminilizado"
                        >
                          Feminilizado
                        </option>
                        <option
                          className="optIdentif optgenFisAlin"
                          value="neutro"
                        >
                          Indeterminado | Neutro
                        </option>
                      </select>
                    </label>
                    <br role="presentation" />
                  </span>
                </div>
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
                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="febrRSpan"
                  >
                    <strong>Febre Reumática</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="febrRSpanSub"
                    >
                      <input
                        type="radio"
                        name="febrRName"
                        id="febrRYes"
                        className="noInvert radOp radYes form-check-input"
                        tabIndex={0}
                        data-title="sim_feb_reumatica"
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
                        htmlFor="febrRYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="febrRName"
                        id="febrRNo"
                        className="noInvert radOp radNo"
                        tabIndex={0}
                        data-title="nao_feb_reumatica"
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
                        htmlFor="febrRNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="hepSpan"
                  >
                    <strong>Hepatite ou Outra(s) Doença(s) Hepática(s)</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="hepSpanSub"
                    >
                      <input
                        type="radio"
                        name="hepName"
                        id="CpbHepYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_hepatite"
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
                        htmlFor="CpbHepYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="hepName"
                        id="CpbHepNo"
                        className="noInvert radOp radNo"
                        data-title="nao_hepatite"
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
                        htmlFor="CpbHepNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <div className="divAdd gridTwoCol" id="divAddHep" role="list">
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepAName"
                        id="hepAId"
                        className="cpbOp indivOp opHep"
                        data-title="hepA"
                      />{" "}
                      A
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepBName"
                        id="hepBId"
                        className="cpbOp indivOp opHep"
                        data-title="hepB"
                      />{" "}
                      B
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepCName"
                        id="hepCId"
                        className="cpbOp indivOp opHep"
                        data-title="hepC"
                      />{" "}
                      C
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepDName"
                        id="hepDId"
                        className="cpbOp indivOp opHep"
                        data-title="hepD"
                      />{" "}
                      D
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepEName"
                        id="hepEId"
                        className="cpbOp indivOp opHep"
                        data-title="hepE"
                      />{" "}
                      E
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepInfcName"
                        id="hepInfcId"
                        className="cpbOp indivOp opHep"
                        data-title="hep_outras"
                      />{" "}
                      Induzida por Outras Infecções
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepImunName"
                        id="hepImunId"
                        className="cpbOp indivOp opHep"
                        data-title="hep_autoimune"
                      />{" "}
                      Autoimune
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepOncName"
                        id="hepOncId"
                        className="cpbOp indivOp opHep"
                        data-title="hep_oncologica"
                      />{" "}
                      Oncológica
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepAlcName"
                        id="hepAlcId"
                        className="cpbOp indivOp opHep"
                        data-title="hep_alcoolica"
                      />{" "}
                      Alcoólica
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="hepDrgName"
                        id="hepDrgId"
                        className="cpbOp indivOp opHep"
                        data-title="hep_intoxicacao"
                      />{" "}
                      Induzida por Toxinas, Medicamentos ou Outra(s) Droga(s)
                    </span>
                  </div>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="CpbDiabSpan"
                  >
                    <strong>Diabetes</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="CpbDiabSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbDiabName"
                        id="CpbDiabYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_diabete"
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
                        htmlFor="CpbDiabYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbDiabName"
                        id="CpbDiabNo"
                        className="noInvert radOp radNo"
                        data-title="nao_diabete"
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
                        htmlFor="CpbDiabNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <div
                    className="divAdd gridTwoCol"
                    id="divAddDiab"
                    role="list"
                  >
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diabTipo1Name"
                        id="diabTipo1Id"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="diabete1"
                      />{" "}
                      Tipo 1
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diabTipo2Name"
                        id="diabTipo2Id"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="diabete2"
                      />{" "}
                      Tipo 2
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diabGestName"
                        id="diabGestId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="diabete_gestacional"
                      />{" "}
                      Gestacional
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diabInsName"
                        id="diabInsId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="diabete_insipida"
                      />{" "}
                      Insípido
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diabLadaName"
                        id="diabLadaId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="diabete_lada"
                      />{" "}
                      LADA
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="diabModyName"
                        id="diabModyId"
                        className="cpbOp indivOp opDiab opDiabIndiv"
                        data-title="diabete_mody"
                      />{" "}
                      MODY
                    </span>
                  </div>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="hivSpan"
                  >
                    <strong>Portador de HIV</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="hivSpanSub"
                    >
                      <input
                        type="radio"
                        name="hivName"
                        id="CpbHivYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_hiv"
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
                        htmlFor="CpbHivYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="hivName"
                        id="CpbHivNo"
                        className="noInvert radOp radNo"
                        data-title="no_hiv"
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
                        htmlFor="CpbHivNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
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
                          name="hepAName"
                          id="hivCargId"
                          className="form-control cpbOp indivOp opHiv"
                          data-title="hiv_carga"
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
                        name="hivDateDiagName"
                        id="hivDateDiagId"
                        className="form-control cpbOp indivOp opHiv maxCurrDate"
                        data-title="hiv_diagnostico"
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
                        name="hivDateExamName"
                        id="hivDateExamId"
                        className="form-control cpbOp indivOp opHiv maxCurrDate"
                        data-title="hiv_ultimo_exame"
                      />
                    </div>
                  </div>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="tSangSpan"
                  >
                    <strong>Tranfusão de Sangue</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="tSangSpanSub"
                    >
                      <input
                        type="radio"
                        name="tSangName"
                        id="tSangYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_transfusao"
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
                        htmlFor="tSangYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="tSangName"
                        id="tSangNo"
                        className="noInvert radOp radNo"
                        data-title="nao_transfusao"
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
                        htmlFor="tSangNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="prAltaSpan"
                  >
                    <strong>Hipertensão Arterial Sistêmica</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="prAltaSpanSub"
                    >
                      <input
                        type="radio"
                        name="prAltaName"
                        id="CpbPrAltaYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_hipertensao"
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
                        htmlFor="CpbPrAltaYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="prAltaName"
                        id="CpbPrAltaNo"
                        className="noInvert radOp radNo"
                        data-title="nao_hipertensao"
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
                        htmlFor="CpbPrAltaNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <div
                    className="divAdd gridTwoCol"
                    id="divAddPrAlta"
                    role="list"
                  >
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="radio"
                        name="HASStgName"
                        id="HASPreId"
                        className="cpbOp indivOp opHAS"
                        data-title="pre_hipertensao"
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
                        name="HASStgName"
                        id="HASStg1Id"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_estagio1"
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
                        name="HASStgName"
                        id="HASStg2Id"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_estagio2"
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
                        name="HASStgName"
                        id="HASStg3Id"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_estagio3"
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
                        name="HASLvlName"
                        id="HASPrimId"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_prim"
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
                        name="HASLvlName"
                        id="HASSecId"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_sec"
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
                        name="HASResName"
                        id="HASResId"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_resist"
                      />{" "}
                      Resistente
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="HASIsolName"
                        id="HASIsolId"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_sistolica_isolada"
                      />{" "}
                      Sistólica Isolada
                    </span>
                    <span role="listitem" className="cbDoencaSubt">
                      <input
                        type="checkbox"
                        name="HASMalName"
                        id="HASMalId"
                        className="cpbOp indivOp opHAS"
                        data-title="hipertensao_maligna"
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
                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbCardSpan"
                  >
                    <strong>Problema(s) Cardíacos</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbCardSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbCardName"
                        id="pbCardYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_card"
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
                        htmlFor="pbCardYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbCardName"
                        id="pbCardNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_card"
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
                        htmlFor="pbCardNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp taCard divAdd"
                    id="textAddCard"
                    maxLength={1000}
                    placeholder="Escreva aqui os Problemas Cardíacos específicos"
                    data-title="desc_prob_card"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbRenSpan"
                  >
                    <strong>Problema(s) Renais</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbRenSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbRenName"
                        id="pbRenYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_renal"
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
                        htmlFor="pbRenYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbRenName"
                        id="pbRenNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_renal"
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
                        htmlFor="pbRenNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddRen"
                    maxLength={1000}
                    placeholder="Escreva aqui os Problemas Renais específicos"
                    data-title="desc_prob_renal"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbGastSpan"
                  >
                    <strong>Problema(s) Gástricos</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbGastSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbGastName"
                        id="pbGastYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_gast"
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
                        htmlFor="pbGastYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbGastName"
                        id="pbGastNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_gast"
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
                        htmlFor="pbGastNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddGast"
                    maxLength={1000}
                    placeholder="Escreva aqui os Problemas Gástricos específicos"
                    data-title="desc_prob_gast"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbRespSpan"
                  >
                    <strong>Problema(s) Respiratórios</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbRespSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbRespName"
                        id="pbRespYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_resp"
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
                        htmlFor="pbRespYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbRespName"
                        id="pbRespNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_resp"
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
                        htmlFor="pbRespNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp taResp divAdd"
                    id="textAddResp"
                    maxLength={1000}
                    placeholder="Escreva aqui os Problemas Respiratórios específicos"
                    data-title="desc_prob_resp"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbAlergSpan"
                  >
                    <strong>Problema(s) Alérgicos</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbAlergSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbAlergName"
                        id="pbAlergYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_alerg"
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
                        htmlFor="pbAlergYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbAlergName"
                        id="pbAlergNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_alerg"
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
                        htmlFor="pbAlergNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddAlerg"
                    maxLength={1000}
                    placeholder="Escreva aqui os Problemas Alérgicos específicos"
                    data-title="desc_prob_alerg"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbArtReumSpan"
                  >
                    <strong>Problema(s) Articular(es) ou Reumatismo</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbArtReumSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbArtReumName"
                        id="pbArtReumYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_alerg"
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
                        htmlFor="pbArtReumYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbArtReumName"
                        id="pbArtReumNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_alerg"
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
                        htmlFor="pbArtReumNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddArtReum"
                    maxLength={1000}
                    placeholder="Escreva aqui os Problemas Articulares específicos"
                    data-title="desc_prob_art"
                  ></textarea>
                </div>

                <div
                  id="fsAGRadDiv3"
                  className="flexDiv flexColumn fsAGRadDiv"
                  role="group"
                >
                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbSistSpan"
                  >
                    <strong>Alguma Outra Doença Sistêmica</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbSistSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbSistName"
                        id="pbSistYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_prob_sistem"
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
                        htmlFor="pbSistYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbSistName"
                        id="pbSistNo"
                        className="noInvert radOp radNo"
                        data-title="no_prob_sistem"
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
                        htmlFor="pbSistNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddSist"
                    maxLength={1000}
                    placeholder="Escreva aqui os nomes específicos das Doenças Sistêmicas"
                    data-title="desc_prob_sistem"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbAlcSpan"
                  >
                    <strong>Uso de Bebidas Alcoólicas</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbAlcSpanSub"
                    >
                      <input
                        type="radio"
                        name="pbAlcName"
                        id="pbAlcYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_alcool"
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
                        htmlFor="pbAlcYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbAlcName"
                        id="pbAlcNo"
                        className="noInvert radOp radNo"
                        data-title="no_alcool"
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
                        htmlFor="pbAlcNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddAlc"
                    maxLength={1000}
                    placeholder="Escreva aqui os detalhes sobre o uso de bebida alcoólicas, se necessários"
                    data-title="desc_alcool"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="CpbFumoSpan"
                  >
                    <strong>É fumante</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="CpbFumoSpanSub"
                    >
                      <input
                        type="radio"
                        name="CpbFumoName"
                        id="CpbFumoYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_fumo"
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
                        htmlFor="CpbFumoYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="CpbFumoName"
                        id="CpbFumoNo"
                        className="noInvert radOp radNo"
                        data-title="nao_fumo"
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
                        htmlFor="CpbFumoNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
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
                            name="nivelFumo"
                            id="fumoLeveId"
                            className="radOp radAdd radFumo"
                            data-title="fumo_leve"
                          />{" "}
                          Leve
                        </div>
                        <div role="listitem">
                          <input
                            type="radio"
                            name="nivelFumo"
                            id="fumoModId"
                            className="radOp radAdd radFumo"
                            data-title="fumo_moderado"
                          />{" "}
                          Moderado
                        </div>
                        <div role="listitem">
                          <input
                            type="radio"
                            name="nivelFumo"
                            id="fumoAltoId"
                            className="radOp radAdd radFumo"
                            data-title="fumo_alto"
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
                          name="fumNameTab"
                          id="fumIdTab"
                          data-title="fumo_tabaco"
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
                          name="fumNameCan"
                          id="fumIdCan"
                          data-title="fumo_cannabis"
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
                          name="fumNameOther"
                          id="fumIdOther"
                          data-title="fumo_outros"
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
                        name="tempApFumoName"
                        className="form-control"
                        id="tempApFumoId"
                        min="0"
                        data-title="fumo_tempo"
                      />
                    </label>
                    <br role="presentation" />
                  </div>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbDrgSpan"
                  >
                    <strong>Uso de Outras Drogas</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbDrgSpan"
                    >
                      <input
                        type="radio"
                        name="pbDrgName"
                        id="pbDrgYes"
                        className="radOp radYes form-check-input"
                        data-title="sim_drogas"
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
                        htmlFor="pbDrgYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbDrgName"
                        id="pbDrgNo"
                        className="radOp radNo"
                        data-title="no_drogas"
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
                        htmlFor="pbDrgNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddDrg"
                    maxLength={1000}
                    placeholder="Qual ou quais Drogas?"
                    data-title="desc_drogas"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert gridTwoCol"
                    id="CpbGrvSpan"
                  >
                    <strong>Gravidez</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="CpbGrvSpan"
                    >
                      <input
                        type="radio"
                        name="CpbGrvName"
                        id="CpbGrvYes"
                        className="radOp radYes form-check-input"
                        data-title="sim_gravidez"
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
                        htmlFor="CpbGrvYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="CpbGrvName"
                        id="CpbGrvNo"
                        className="radOp radNo"
                        data-title="no_gravidez"
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
                        htmlFor="CpbGrvNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
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

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbAntCSpan"
                  >
                    <strong>Uso de Anticoncepional</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbAntCSpan"
                    >
                      <input
                        type="radio"
                        name="pbAntCName"
                        id="pbAntCYes"
                        className="radOp radYes form-check-input"
                        data-title="anticoncep_sim"
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
                        htmlFor="pbAntCYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbAntCName"
                        id="pbAntCNo"
                        className="radOp radNo"
                        data-title="anticoncep_nao"
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
                        htmlFor="pbAntCNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddAntC"
                    maxLength={1000}
                    placeholder="Qual Anticoncepcional?"
                    data-title="desc_anticoncep"
                  ></textarea>
                </div>

                <div
                  id="fsAGRadDiv4"
                  className="flexDiv flexColumn fsAGRadDiv"
                  role="group"
                >
                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbOpSpan"
                  >
                    <strong>Operação ou Extração de Dente</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbOpSpan"
                    >
                      <input
                        type="radio"
                        name="pbOpName"
                        id="pbOpYes"
                        className="radOp radYes form-check-input"
                        data-title="sim_extracao"
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
                        htmlFor="pbOpYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbOpName"
                        id="pbOpNo"
                        className="radOp radNo"
                        data-title="nao_extracao"
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
                        htmlFor="pbOpNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddOp"
                    maxLength={1000}
                    placeholder="Qual ou quais Dente(s) Operado(s) e/ou Extraído(s)?"
                    data-title="desc_extracao"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbCicSpan"
                  >
                    <strong>Problema(s) com Cicatrização</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbCicSpan"
                    >
                      <input
                        type="radio"
                        name="pbCicName"
                        id="pbCicYes"
                        className="radOp radYes form-check-input"
                        data-title="sim_prob_cicatr"
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
                        htmlFor="pbCicYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbCicName"
                        id="pbCicNo"
                        className="radOp radNo"
                        data-title="nao_prob_cicatr"
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
                        htmlFor="pbCicNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddCic"
                    maxLength={1000}
                    placeholder="Qual ou quais Problema(s) com Cicatrização?"
                    data-title="desc_prob_cicatr"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbAnstSpan"
                  >
                    <strong>Problema(s) com Anestesia</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbAnstSpan"
                    >
                      <input
                        type="radio"
                        name="pbAnstName"
                        id="pbAnstYes"
                        className="radOp radYes form-check-input"
                        data-title="sim_prob_anest"
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
                        htmlFor="pbAnstYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbAnstName"
                        id="pbAnstNo"
                        className="radOp radNo"
                        data-title="nao_prob_anest"
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
                        htmlFor="pbAnstNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddAnst"
                    maxLength={1000}
                    placeholder="Qual ou quais Problema(s) com Anestesia?"
                    data-title="desc_prob_anest"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbHemSpan"
                  >
                    <strong>Problema(s) com Hemorragia</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbHemSpan"
                    >
                      <input
                        type="radio"
                        name="pbHemName"
                        id="pbHemYes"
                        className="radOp radYes form-check-input"
                        data-title="sim_prob_hemo"
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
                        htmlFor="pbHemYes"
                        className="labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbHemName"
                        id="pbHemNo"
                        className="radOp radNo"
                        data-title="nao_prob_hemo"
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
                        htmlFor="pbHemNo"
                        className="labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddHem"
                    maxLength={1000}
                    placeholder="Qual ou quais Problema(s) com Hemorragia?"
                    data-title="desc_prob_home"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbIntrnpan"
                  >
                    <strong>Internação Recente</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbIntrnSpan"
                    >
                      <input
                        type="radio"
                        name="pbIntrnName"
                        id="pbIntrnYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_internacao"
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
                        htmlFor="pbIntrnYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbIntrnName"
                        id="pbIntrnNo"
                        className="noInvert radOp radNo"
                        data-title="nao_internacao"
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
                        htmlFor="pbIntrnNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddIntrn"
                    maxLength={1000}
                    placeholder="Tempo aproximado de Internação"
                    data-title="desc_internacao"
                  ></textarea>

                  <span
                    role="group"
                    className="spanMain spanMainFsAnamGRad noInvert"
                    id="pbMedSpan"
                  >
                    <strong>Uso Atual de Medicação Controlada</strong>
                    <span
                      role="group"
                      className="spanSub spanSubFsAnamGRad form-check"
                      id="pbMedSubSpan"
                    >
                      <input
                        type="radio"
                        name="pbMedName"
                        id="pbMedYes"
                        className="noInvert radOp radYes form-check-input"
                        data-title="sim_medicacao_controlada"
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
                        htmlFor="pbMedYes"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Sim
                      </label>
                      <input
                        type="radio"
                        name="pbMedName"
                        id="pbMedNo"
                        className="noInvert radOp radNo"
                        data-title="nao_medicacao_controlada"
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
                        htmlFor="pbMedNo"
                        className="noInvert labOp boolOp form-check-label"
                      >
                        Não
                      </label>
                    </span>
                  </span>
                  <textarea
                    className="form-control taOp divAdd"
                    id="textAddMed"
                    maxLength={1000}
                    placeholder="Qual ou quais Medicações Controladas?"
                    data-title="desc_medicacao_controlada"
                  ></textarea>
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
                        name="candName"
                        id="candId"
                        className="radOD"
                        data-title="candidiase"
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
                        name="gonName"
                        id="gonId"
                        className="radOD"
                        data-title="gonorreia"
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
                        name="herpName"
                        id="herpId"
                        className="radOD"
                        data-title="herpes"
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
                        name="herpZName"
                        id="herpZId"
                        className="radOD"
                        data-title="herpes_zoster"
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
                        name="pneuName"
                        id="pneuId"
                        className="radOD"
                        data-title="pneumonia"
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
                        name="sifName"
                        id="sifId"
                        className="radOD"
                        data-title="sifilis"
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
                        name="toxopName"
                        id="toxopId"
                        className="radOD noExpandRad"
                        data-title="toxoplasmose"
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
                        name="tubercName"
                        id="tubercId"
                        className="radOD noExpandRad"
                        data-title="tuberculose"
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
                      maxLength={1000}
                      placeholder="Qual ou quais?"
                      data-title="desc_outras_doencas"
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
                          name="FamDiabName"
                          id="antFamDiabId"
                          className="cbFam"
                          data-title="familia_diabetes"
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
                      <strong>Subtipo:</strong>
                      <br role="presentation" />
                      <div
                        className="divAdd gridThreeCol divAntFamCheck"
                        role="list"
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
                      <span
                        role="group"
                        className="spanSub spanSectAnt"
                        id="spanDiabFamG"
                      >
                        <strong>
                          Geradores Anteriores com Diagnóstico ou Suspeita:
                        </strong>
                      </span>
                      <br role="presentation" />
                      <div
                        className="divAdd gridThreeCol divAntFamCheck"
                        role="list"
                      >
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamG1Name"
                            id="diabFamMaeId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="mae_diabetes"
                          />{" "}
                          Mãe
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamG1Name"
                            id="diabFamPaitId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="pai_diabetes"
                          />{" "}
                          Pai
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamAvóMatName"
                            id="diabFamAvóMatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="avom_diabetes"
                          />{" "}
                          Avó Materna
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamAvóPatName"
                            id="diabFamAvóPatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="avop_diabetes"
                          />{" "}
                          Avó Paterna
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamAvoMatName"
                            id="diabFamAvoMatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="avôm_diabetes"
                          />{" "}
                          Avô Materno
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamAvóPatName"
                            id="diabFamAvoPatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="avôp_diabetes"
                          />{" "}
                          Avô Paterno
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavóMatMatName"
                            id="diabFamBisavóMatMatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavomm_diabetes"
                          />{" "}
                          Bisavó Mater-materna
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavóMatPatName"
                            id="diabFamBisavóMatPatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavomp_diabetes"
                          />{" "}
                          Bisavó Mater-paterna
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavóPatMatName"
                            id="diabFamBisavóPatMatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavopm_diabetes"
                          />{" "}
                          Bisavó Pater-materna
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavóPatPatName"
                            id="diabFamBisavóPatPatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavopp_diabetes"
                          />{" "}
                          Bisavó Pater-paterna
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavoMatMatName"
                            id="diabFamBisavoMatMatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavômm_diabetes"
                          />{" "}
                          Bisavô Mater-materno
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavoMatPatName"
                            id="diabFamBisavoMatPatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavômp_diabetes"
                          />{" "}
                          Bisavô Mater-paterno
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavoPatMatName"
                            id="diabFamBisavoPatMatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavôpm_diabetes"
                          />{" "}
                          Bisavô Pater-materno
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamBisavoPatPatName"
                            id="diabFamBisavoPatPatId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="bisavôpp_diabetes"
                          />{" "}
                          Bisavô Pater-paterno
                        </span>
                        <span role="listitem" className="cbDoencaSubt">
                          <input
                            type="checkbox"
                            name="diabFamOtherName"
                            id="diabFamOtherId"
                            className="cpbOp famOp opDiab opDiabFam opDiabGFam"
                            data-title="trisavo_diabetes"
                          />{" "}
                          Trisavós ou anteriores
                        </span>
                      </div>
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
                          name="FamDislipName"
                          id="antFamDislipId"
                          className="cbFam"
                          data-title="fam_dislip"
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
                      <div
                        className="divGen container-lg"
                        id="divGenDislip"
                        role="group"
                      >
                        <span
                          role="group"
                          className="spanSub spanSectAnt"
                          id="spanDislipFamG"
                        >
                          <strong>
                            Geradores Anteriores com Diagnóstico ou Suspeita:
                          </strong>
                        </span>
                        <div
                          className="divAdd gridThreeCol divAntFamCheck"
                          role="list"
                        >
                          <span role="listitem" className="cbDoencaSubt">
                            <input
                              type="checkbox"
                              name="dislipFamG1Name"
                              id="dislipFamMaeId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="mae_dislip"
                            />{" "}
                            Mãe
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamG1Name"
                              id="dislipFamPaitId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="pai_dislip"
                            />{" "}
                            Pai
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamAvóMatName"
                              id="dislipFamAvóMatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="avom_dislip"
                            />{" "}
                            Avó Materna
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamAvóPatName"
                              id="dislipFamAvóPatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="avop_dislip"
                            />{" "}
                            Avó Paterna
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamAvoMatName"
                              id="dislipFamAvoMatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="avôm_dislip"
                            />{" "}
                            Avô Materno
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamAvóPatName"
                              id="dislipFamAvoPatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="avôp_dislip"
                            />{" "}
                            Avô Paterno
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavóMatMatName"
                              id="dislipFamBisavóMatMatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavomm_dislip"
                            />{" "}
                            Bisavó Mater-materna
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavóMatPatName"
                              id="dislipFamBisavóMatPatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavomp_dislip"
                            />{" "}
                            Bisavó Mater-paterna
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavóPatMatName"
                              id="dislipFamBisavóPatMatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavopm_dislip"
                            />{" "}
                            Bisavó Pater-materna
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavóPatPatName"
                              id="dislipFamBisavóPatPatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavopp_dislip"
                            />{" "}
                            Bisavó Pater-paterna
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavoMatMatName"
                              id="dislipFamBisavoMatMatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavômm_dislip"
                            />{" "}
                            Bisavô Mater-materno
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavoMatPatName"
                              id="dislipFamBisavoMatPatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavômp_dislip"
                            />{" "}
                            Bisavô Mater-paterno
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavoPatMatName"
                              id="dislipFamBisavoPatMatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavôpm_dislip"
                            />{" "}
                            Bisavô Pater-materno
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamBisavoPatPatName"
                              id="dislipFamBisavoPatPatId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="bisavôpp_dislip"
                            />{" "}
                            Bisavô Pater-paterno
                          </span>
                          <span role="listitem" className="cbDoencSubt">
                            <input
                              type="checkbox"
                              name="dislipFamOtherName"
                              id="dislipFamOtherId"
                              className="cpbOp famOp opDislip opDislipFam opDislipGFam"
                              data-title="trisavo_dislip"
                            />{" "}
                            Trisavós ou anteriores
                          </span>
                        </div>
                      </div>
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
                          name="FamCardName"
                          id="antFamCardId"
                          className="cbFam"
                          data-title="fam_card"
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
                    <div
                      className="divAdd divAntFam"
                      id="divAddFamCard"
                      role="group"
                    >
                      <textarea
                        name="cardFamGeralName"
                        id="cardFamGeralId"
                        className="form-control taOp taCard"
                        placeholder="Escreva aqui sobre a(s) Doença(s) Cardíaca(s)"
                        data-title="desc_fam_card"
                      ></textarea>
                      <br role="presentation" />
                      <span
                        role="group"
                        className="spanSub spanSectAnt"
                        id="spanCardFamG"
                      >
                        <strong>
                          Geradores Anteriores com Diagnóstico ou Suspeita:
                        </strong>
                      </span>
                      <div
                        className="divAdd gridThreeCol divAntFamCheck"
                        role="list"
                      >
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamG1Name"
                            id="cardFamMaeId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="mae_card"
                          />{" "}
                          Mãe
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamG1Name"
                            id="cardFamPaitId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="pai_card"
                          />{" "}
                          Pai
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamAvóMatName"
                            id="cardFamAvóMatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="avom_card"
                          />{" "}
                          Avó Materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamAvóPatName"
                            id="cardFamAvóPatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="avop_card"
                          />{" "}
                          Avó Paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamAvoMatName"
                            id="cardFamAvoMatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="avôm_card"
                          />{" "}
                          Avô Materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamAvóPatName"
                            id="cardFamAvoPatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="avôp_card"
                          />{" "}
                          Avô Paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavóMatMatName"
                            id="cardFamBisavóMatMatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavomm_card"
                          />{" "}
                          Bisavó Mater-materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavóMatPatName"
                            id="cardFamBisavóMatPatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavomp_card"
                          />{" "}
                          Bisavó Mater-paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavóPatMatName"
                            id="cardFamBisavóPatMatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavopm_card"
                          />{" "}
                          Bisavó Pater-materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavóPatPatName"
                            id="cardFamBisavóPatPatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavopp_card"
                          />{" "}
                          Bisavó Pater-paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavoMatMatName"
                            id="cardFamBisavoMatMatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavômm_card"
                          />{" "}
                          Bisavô Mater-materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavoMatPatName"
                            id="cardFamBisavoMatPatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavômp_card"
                          />{" "}
                          Bisavô Mater-paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavoPatMatName"
                            id="cardFamBisavoPatMatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavôpm_card"
                          />{" "}
                          Bisavô Pater-materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamBisavoPatPatName"
                            id="cardFamBisavoPatPatId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="bisavôpp_card"
                          />{" "}
                          Bisavô Pater-paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="cardFamOtherName"
                            id="cardFamOtherId"
                            className="cpbOp famOp opCard opCardFam opCardGFam"
                            data-title="trisavo_card"
                          />{" "}
                          Trisavós ou anteriores
                        </span>
                      </div>
                    </div>

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
                          name="FamPulmName"
                          id="antFamPulmId"
                          className="cbFam"
                          data-title="fam_pulm"
                        />
                      </div>
                      <label
                        htmlFor="antFamPulmId"
                        className="famLabel input-group-text"
                        id="labAntFamPulm"
                      >
                        Doença(s) Pulmonare(s)
                      </label>
                      <br role="presentation" />
                    </span>
                    <div
                      className="divAdd divAntFam"
                      id="divAddFamPulm"
                      role="group"
                    >
                      <textarea
                        name="RespFamGeralName"
                        id="RespFamGeralId"
                        className="form-control taOp taResp"
                        placeholder="Escreva aqui sobre a(s) Doença(s) Pulmonar(es)"
                        data-title="desc_fam_pulm"
                      ></textarea>
                      <br role="presentation" />
                      <span
                        role="group"
                        className="spanSub spanSectAnt"
                        id="spanRespFamG"
                      >
                        <strong>
                          Geradores Anteriores com Diagnóstico ou Suspeita:
                        </strong>
                      </span>
                      <div
                        className="divAdd gridThreeCol divAntFamCheck"
                        role="list"
                      >
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamG1Name"
                            id="RespFamMaeId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="mae_pulm"
                          />{" "}
                          Mãe
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamG1Name"
                            id="RespFamPaitId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="pai_pulm"
                          />{" "}
                          Pai
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamAvóMatName"
                            id="RespFamAvóMatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="avom_pulm"
                          />{" "}
                          Avó Materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamAvóPatName"
                            id="RespFamAvóPatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="avop_pulm"
                          />{" "}
                          Avó Paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamAvoMatName"
                            id="RespFamAvoMatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="avôm_pulm"
                          />{" "}
                          Avô Materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamAvóPatName"
                            id="RespFamAvoPatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="avôp_pulm"
                          />{" "}
                          Avô Paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavóMatMatName"
                            id="RespFamBisavóMatMatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavomm_pulm"
                          />{" "}
                          Bisavó Mater-materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavóMatPatName"
                            id="RespFamBisavóMatPatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavomp_pulm"
                          />{" "}
                          Bisavó Mater-paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavóPatMatName"
                            id="RespFamBisavóPatMatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavopm_pulm"
                          />{" "}
                          Bisavó Pater-materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavóPatPatName"
                            id="RespFamBisavóPatPatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavopp_pulm"
                          />{" "}
                          Bisavó Pater-paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavoMatMatName"
                            id="RespFamBisavoMatMatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavômm_pulm"
                          />{" "}
                          Bisavô Mater-materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavoMatPatName"
                            id="RespFamBisavoMatPatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavômp_pulm"
                          />{" "}
                          Bisavô Mater-paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavoPatMatName"
                            id="RespFamBisavoPatMatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavôpm_pulm"
                          />{" "}
                          Bisavô Pater-materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamBisavoPatPatName"
                            id="RespFamBisavoPatPatId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="bisavôpp_pulm"
                          />{" "}
                          Bisavô Pater-paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="RespFamOtherName"
                            id="RespFamOtherId"
                            className="cpbOp famOp opResp opRespFam opRespGFam"
                            data-title="trisavo_pulm"
                          />{" "}
                          Trisavós ou anteriores
                        </span>
                      </div>
                    </div>

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
                          name="FamOncName"
                          id="antFamOncId"
                          className="cbFam"
                          data-title="fam_oncologica"
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
                    <div
                      className="divMain divAdd divAntFam"
                      id="divAddFamOnc"
                      role="group"
                    >
                      <textarea
                        name="OncFamGeralName"
                        id="OncFamGeralId"
                        className="form-control taOp taOnc"
                        placeholder="Escreva aqui sobre a(s) Doença(s) Oncológica(s)"
                        data-title="desc_fam_oncologica"
                      ></textarea>
                      <br role="presentation" />
                      <span
                        role="group"
                        className="spanSub spanSectAnt"
                        id="spanOncFamG"
                      >
                        <strong>
                          Geradores Anteriores com Diagnóstico ou Suspeita:
                        </strong>
                      </span>
                      <div
                        className="divAdd gridThreeCol divAntFamCheck"
                        role="list"
                      >
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamG1Name"
                            id="OncFamMaeId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="mae_oncologica"
                          />{" "}
                          Mãe
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamG1Name"
                            id="OncFamPaitId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="pai_oncologica"
                          />{" "}
                          Pai
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamAvóMatName"
                            id="OncFamAvóMatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="avom_oncologica"
                          />{" "}
                          Avó Materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamAvóPatName"
                            id="OncFamAvóPatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="avop_oncologica"
                          />{" "}
                          Avó Paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamAvoMatName"
                            id="OncFamAvoMatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="avôm_oncologica"
                          />{" "}
                          Avô Materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamAvóPatName"
                            id="OncFamAvoPatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="avôp_oncologica"
                          />{" "}
                          Avô Paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavóMatMatName"
                            id="OncFamBisavóMatMatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavomm_oncologica"
                          />{" "}
                          Bisavó Mater-materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavóMatPatName"
                            id="OncFamBisavóMatPatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavomp_oncologica"
                          />{" "}
                          Bisavó Mater-paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavóPatMatName"
                            id="OncFamBisavóPatMatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavopm_oncologica"
                          />{" "}
                          Bisavó Pater-materna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavóPatPatName"
                            id="OncFamBisavóPatPatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavopp_oncologica"
                          />{" "}
                          Bisavó Pater-paterna
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavoMatMatName"
                            id="OncFamBisavoMatMatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavômm_oncologica"
                          />{" "}
                          Bisavô Mater-materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavoMatPatName"
                            id="OncFamBisavoMatPatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavômp_oncologica"
                          />{" "}
                          Bisavô Mater-paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavoPatMatName"
                            id="OncFamBisavoPatMatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavôpm_oncologica"
                          />{" "}
                          Bisavô Pater-materno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamBisavoPatPatName"
                            id="OncFamBisavoPatPatId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="bisavôpp_oncologica"
                          />{" "}
                          Bisavô Pater-paterno
                        </span>
                        <span role="listitem" className="cbDoencSubt">
                          <input
                            type="checkbox"
                            name="OncFamOtherName"
                            id="OncFamOtherId"
                            className="cpbOp famOp opOnc opOncFam opOncGFam"
                            data-title="trisavo_oncologica"
                          />{" "}
                          Trisavós ou anteriores
                        </span>
                      </div>
                    </div>
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
                      name="escovNName"
                      id="escovNId"
                      className="form-control freqInpList"
                      data-title="n_escovacoes"
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
                      name="fioNName"
                      id="fioNId"
                      className="form-control freqInpList"
                      data-title="n_fio_dental"
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
                      name="enxgNName"
                      id="enxgNId"
                      className="form-control freqInpList"
                      data-title="n_enxaguante"
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
                          name="pbAlmName"
                          id="pbAlmYes"
                          className="freqRad freqAlmRad boolOp form-check-input"
                          data-title="sim_doces"
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
                          name="pbAlmName"
                          id="pbAlmNo"
                          className="freqRad freqAlmRad boolOp"
                          data-title="nao_doces"
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
                      maxLength={1000}
                      placeholder="Qual ou quais?"
                      className="divAdd form-control"
                      data-title="desc_doces"
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
                <blockquote className="declr" id="declrEnd">
                  <span>
                    &#34;DECLARO SEREM VERDADEIRAS AS INFORMAÇÕES ACIMA&#34;
                  </span>
                  <label
                    htmlFor="confirmId"
                    className="labConfirm noInvert"
                  ></label>
                  <input
                    type="checkbox"
                    className="form-check-input confirmName"
                    id="confirmId"
                    data-title="concordancia"
                    required
                  />
                </blockquote>
                <div className="divMain" id="divConfirm" role="group">
                  <button
                    type="button"
                    className="btn btn-info bolded mg-1t widThird widHalf900Q widFull600Q"
                    id="btnConform"
                    onClick={() => setDeclaration(!shouldShowDeclaration)}
                  >
                    Abrir Declaração de Concordância
                  </button>
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
                      <input
                        type="text"
                        name="confirmLocName"
                        id="confirmLocId"
                        className="inpConfirm form-control noInvert"
                        defaultValue="Rio de Janeiro, Rio de Janeiro"
                        data-title="assinatura_local"
                        required
                        onInput={ev => handleEventReq(ev.currentTarget)}
                      />
                    </label>

                    <label
                      htmlFor="confirmDatId"
                      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC htHalf900Q bolded"
                      id="labConfirmDate"
                    >
                      {" "}
                      <span>Data:</span>
                      <div
                        className="widFull flexQ900NoW htFull900Q"
                        id="divConfirmDat"
                        role="group"
                      >
                        <input
                          type="date"
                          name="confirmDatName"
                          id="confirmDatId"
                          className="inpConfirm inpDate form-control noInvert minCurrDate"
                          data-title="assinatura_data"
                          required
                        />
                        <button
                          type="button"
                          className="datBtn confirmBtn btn btn-secondary widFull"
                          id="confirmDatBtn"
                        >
                          Usar data atual
                        </button>
                      </div>
                    </label>
                    <hr />
                  </div>

                  <div
                    className="divSub divConfirm flexEl"
                    id="divConfirm3"
                    role="group"
                  >
                    <span
                      role="group"
                      id="spanAstPct"
                      className="labConfirm labAst widHalf bolded"
                    >
                      <span>Assinatura do Paciente:</span>
                      <canvas id="inpAstConfirmId"></canvas>
                      <button
                        type="button"
                        className="astDigtBtn autocorrect confirmBtn btn btn-secondary"
                        id="confirmAstDigtBtn"
                      >
                        Usar Assinatura Digital
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        id="resetAstBtn"
                      >
                        Resetar
                      </button>
                    </span>
                  </div>
                </div>
                <hr />
              </section>
              <section
                className="sectionMain sectionConfirm"
                id="sectConfirmBut"
              >
                <button
                  type="submit"
                  name="submitFormButName"
                  id="submitFormButId"
                  className="confirmBut btn btn-success forceInvert"
                  formAction="_self"
                  formMethod="POST"
                  accessKey="enter"
                  onClick={ev => subForm(ev.currentTarget)}
                >
                  Submeter
                </button>
                <button
                  type="reset"
                  className="confirmBut btn btn-warning forceInvert"
                  id="resetFormBtn"
                >
                  Resetar
                </button>
                <button
                  type="button"
                  id="btnExport"
                  className="btn btn-secondary forceInvert"
                  style={{
                    backgroundColor: "rgba(0, 0, 255, 0.904)",
                    borderColor: "rgba(0, 0, 255, 0.904)",
                  }}
                >
                  Gerar Planilha
                </button>
              </section>
              <hr />
            </fieldset>
          </form>
        </main>
      </div>
    </ErrorBoundary>
  );
}
