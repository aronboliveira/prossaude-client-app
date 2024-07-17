import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState, memo } from "react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import {
  addCanvasListeners,
  addListenerExportBtn,
  addResetAstListener,
  getGlobalEls,
  watchLabels,
} from "@/lib/global/gController";
import { dinamicGridAdjust } from "@/lib/global/gStyleScript";
import {
  addListenerAvElemenDents,
  addListenerInspDialogBtns,
  addListenerInspLIBtns,
  addListenerInspRadios,
  addListenerQuadrInps,
  addListenerQuadrsTe,
  addListenerResetDivsQuadrs,
  addListenersSubDivsQuadrs,
} from "@/lib/locals/odPage/odController";
import {
  changeToAstDigit,
  handleCondtReq,
  handleEventReq,
  validateForm,
  syncAriaStates,
} from "@/lib/global/handlers/gHandlers";
import TratFs from "../../components/interactive/od/TratFs";
import OdTips from "../../components/interactive/od/OdTips";
import OdDeclaration from "../../components/interactive/od/OdDeclaration";
import ConfirmLocId from "../../components/interactive/def/ConfirmLocId";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";

let odIsAutoCorrectOn = true,
  odIsDialogCalled = false,
  odIsValuePreDef = false;
const MemoLoc = memo(ConfirmLocId);

export default function OdPage(): JSX.Element {
  const [shouldShowTips, setTips] = useState<boolean>(false);
  const [shouldShowDeclaration, setDeclaration] = useState<boolean>(false);
  useEffect(() => {
    handleLinkChanges("od", "Od Page Style");
    odIsAutoCorrectOn = getGlobalEls(odIsAutoCorrectOn, "notNum");
    dinamicGridAdjust(Array.from(document.querySelectorAll(".fsAnamGDiv")));
    addListenerInspRadios();
    [odIsDialogCalled] = addListenerInspDialogBtns(odIsDialogCalled);
    addListenerInspLIBtns();
    addListenerQuadrsTe();
    [odIsValuePreDef] = addListenerAvElemenDents(odIsValuePreDef);
    addListenerQuadrInps();
    addListenerResetDivsQuadrs();
    addListenersSubDivsQuadrs();
    addListenerExportBtn("od");
    addCanvasListeners();
    addResetAstListener();
    syncAriaStates(document.querySelectorAll("*"));
    watchLabels();
    document.querySelectorAll(".inpAvDent").forEach((inpAvDent, i) => {
      try {
        if (!(inpAvDent instanceof HTMLInputElement))
          throw inputNotFound(
            inpAvDent,
            `Validation of Input instance`,
            extLine(new Error())
          );
        inpAvDent.value = "Hígido";
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for defaulting values to inpAvDents:\n${
            (e as Error).message
          }`
        );
      }
    });
  }, []);
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
      <div role="group" className="pad1pc" id="bgDiv">
        <header>
          <div
            role="group"
            className="flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC"
            id="hDiv"
          >
            <div role="group" id="hTextDiv">
              <div>
                <h1 className="bolded flexJBt" id="hForm">
                  <strong>Exame Clínico: Odontologia</strong>
                </h1>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
              </div>
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
                <OdTips state={shouldShowTips} dispatch={setTips} />
              )}
              <dialog className="modal-content-fit defDp wid50v" id="tipsDlg">
                <div className="flexNoW flexAlItCt flexJBt">
                  <h3 className="bolded">Manual para controle de formulário</h3>
                  <button
                    className="btn btn-close forceInvert"
                    id="tipsClose"
                  ></button>
                </div>
                <hr />
                <article className="flexNoWC noInvert">
                  <section className="odTipsSect" id="fillTips">
                    <h4 className="bolded mg-2bv">1. Controle de Entradas</h4>
                    <div className="flexNoWC pdL1v">
                      <p className="dicas" id="dicaKb">
                        <strong>1.1.</strong>
                        <em>
                          Apertar Alt + Y para &#34;Sim&#34; ou Alt + N para
                          &#34;Não&#34; no próximo campo após iniciar o foco com
                          Tab para preencher automaticamente
                        </em>
                      </p>
                      <p className="dicas" id="dicaUppercase">
                        <strong>1.2.</strong>
                        <em>
                          As primeiras letras, exceto conjunções, são
                          capitalizadas automaticamente por padrão. Outras
                          correções de campos complexos podem precisar de mais
                          texto — Continue digitando!
                        </em>
                      </p>
                    </div>
                  </section>
                  <section className="odTipsSect" id="quadrTips">
                    <h4 className="bolded mg-2bv">2. Controle de Quadrantes</h4>
                    <div className="flexNoWC pdL1v">
                      <p className="dicas" id="dicaDrag">
                        <strong>2.1.</strong>
                        <em>
                          Arrastar as caixas dos quadrantes irá reorganizá-las
                        </em>
                      </p>
                      <p className="dicas" id="dicaDrag">
                        <strong className="noInvert">2.2.</strong>
                        <em className="noInvert">
                          Clicar nos valores pré-definidos dos quadrantes irá
                          apagá-los
                        </em>
                      </p>
                      <p className="dicas" id="dicaDatalist">
                        <strong>2.3.</strong>
                        <em>
                          Clicar em campos vazios nos quadrantes irá fornecer
                          uma lista de valores padrão para seleção
                        </em>
                      </p>
                    </div>
                  </section>
                </article>
              </dialog>
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
                data-title="Data no cabeçalho"
                required
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
          <div role="group" className="switchDiv flexQ900NoWC">
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
                data-title="Autocorreção"
                defaultChecked
              />{" "}
              <strong>Autocorreção</strong>
            </span>
          </div>
          <hr />
          <form
            name="formOdontName"
            action="#"
            method="post"
            target="_top"
            id="formOdont"
          >
            <fieldset name="fsAnamGName" id="fsAnamGId" className="fsMain">
              <legend id="fsAnamGLeg" className="legMain form-padded">
                Identificação
              </legend>

              <section className="sectionMain" id="fsAnamGSect">
                <div role="group" className="flexQ900NoWC" id="div1_div2flex">
                  <div
                    role="group"
                    className="fsAnamGDiv alItSt900Q flexQ900NoWC flexAlItE flexNoW flexSimple wsNoW cGap0 ws900N"
                    id="fsAnamGDiv1"
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
                          className="form-control noInvert autocorrect inpIdentif minText maxText patternText"
                          autoComplete="given-name"
                          data-title="Primeiro nome"
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
                          className="form-control noInvert autocorrect inpIdentif"
                          data-title="Nome do meio"
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
                          className="form-control noInvert autocorrect inpIdentif minText maxText patternText"
                          autoComplete="family-name"
                          required
                          data-title="Último nome"
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

                  <span
                    role="group"
                    className="fsAnamGSpan flexAlItCt col noInvert"
                    id="fsAnamGSpan4"
                  >
                    <label htmlFor="socialNameId" className="labelIdentif">
                      Nome Social:
                      <input
                        type="text"
                        name="socialNameName"
                        id="socialNameId"
                        className="form-control noInvert autocorrect inpIdentif"
                        data-title="Nome social"
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
                </div>
              </section>
              <hr />
            </fieldset>
            <fieldset
              name="fsInspBocFacName"
              id="fsInspBocFacId"
              className="fsMain"
            >
              <legend id="fsInspBocFacLeg" className="legMain inspLeg">
                Inspeção da Boca e da Face
              </legend>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs1">
                <legend className="legSub inspLeg" id="inspLegSub1">
                  Lábios e Mucosa Labial
                </legend>
                <div role="group" className="inspDiv" id="inspDiv1">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain1"
                  >
                    <input
                      type="radio"
                      name="labInpName1"
                      id="labInpYes1"
                      className="radOp radYes"
                      data-title="Inspeção de Lábios e Mucosa Labial (Sim)"
                    />
                    <label htmlFor="labInpYes1" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="labInpName1"
                      id="labInpNo1"
                      className="radOp radNo"
                      data-title="Inspeção de Lábios e Mucosa Labial(Não)"
                    />
                    <label htmlFor="labInpNo1" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub1"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert1"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Lábios e Mucosa Labial"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn1"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog1"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList1">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI1_1">
                              Textura
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn1_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI1_2">
                              Coloração
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn1_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI1_3">
                              Presença de Glândulas Salivares Acessórias
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn1_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI1_4">
                              Grânulos de Fordyce
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn1_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI1_5">
                              Fossetas
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn1_5"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs2">
                <legend className="legSub inspLeg" id="inspLegSub2">
                  Mucosa Jugal
                </legend>
                <div role="group" className="inspDiv" id="inspDiv2">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain2"
                  >
                    <input
                      type="radio"
                      name="jugInpName2"
                      id="jugInpYes2"
                      className="radOp radYes"
                      data-title="Inspeção de Mucosa Jugal (Sim)"
                    />
                    <label htmlFor="jugInpYes2" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName2"
                      id="jugInpNo2"
                      className="radOp radNo"
                      data-title="Inspeção de Mucosa Jugal (Não)"
                    />
                    <label htmlFor="jugInpNo2" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub2"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert2"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Mucosa Jugal"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn2"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog2"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList2">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI2_1">
                              Textura
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI2_2">
                              Coloração
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI2_3">
                              Papila do ducto da Parótida
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI2_4">
                              Grânulos de Fordyce
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI2_5">
                              Linha alba
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_5"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI2_6">
                              Leucoedema
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_6"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI2_7">
                              Pigmentações
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn2_7"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs3">
                <legend className="legSub inspLeg" id="inspLegSub3">
                  Fundo de Vestíbulo
                </legend>
                <div role="group" className="inspDiv" id="inspDiv3">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain3"
                  >
                    <input
                      type="radio"
                      name="jugInpName3"
                      id="jugInpYes3"
                      className="radOp radYes"
                      data-title="Inspeção de Fundo de Vestíbulo (Sim)"
                    />
                    <label htmlFor="jugInpYes3" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName3"
                      id="jugInpNo3"
                      className="radOp radNo"
                      data-title="Inspeção de Fundo de Vestíbulo (Não)"
                    />
                    <label htmlFor="jugInpNo3" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub3"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert3"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Fundo de Vestíbulo"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn3"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog3"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList3">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI3_1">
                              Bridas
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn3_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI3_2">
                              Freio labial
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn3_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI3_3">
                              Coloração
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn3_3"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs4">
                <legend className="legSub inspLeg" id="inspLegSub4">
                  Palato Duro
                </legend>
                <div role="group" className="inspDiv" id="inspDiv4">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain4"
                  >
                    <input
                      type="radio"
                      name="jugInpName4"
                      id="jugInpYes4"
                      className="radOp radYes"
                      data-title="Inspeção de Palatado Duro (Sim)"
                    />
                    <label htmlFor="jugInpYes4" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName4"
                      id="jugInpNo4"
                      className="radOp radNo"
                      data-title="Inspeção de Palato Duro (Não)"
                    />
                    <label htmlFor="jugInpNo4" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub4"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert4"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Palato Duro"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn4"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog4"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList4">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI4_1">
                              Papila incisiva
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn4_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI4_2">
                              Rugosidade Palatina
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn4_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI4_3">
                              Rafe Mediana
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn4_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI4_4">
                              Tórus Palatino
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn4_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI4_5">
                              Glândulas Salivares
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn4_5"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI4_6">
                              Fóvea Palatina
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn4_6"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs5">
                <legend className="legSub inspLeg" id="inspLegSub5">
                  Palato Mole e Úvula
                </legend>
                <div role="group" className="inspDiv" id="inspDiv5">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain5"
                  >
                    <input
                      type="radio"
                      name="jugInpName5"
                      id="jugInpYes5"
                      className="radOp radYes"
                      data-title="Inspeção de Palato Mole e Úvula (Sim)"
                    />
                    <label htmlFor="jugInpYes5" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName5"
                      id="jugInpNo5"
                      className="radOp radNo"
                      data-title="Inspeção de Palato Mole e Úvula (Não)"
                    />
                    <label htmlFor="jugInpNo5" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub5"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert5"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Palato Mole e Úvula"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn5"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog5"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList5">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI5_1">
                              Textura
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn5_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI5_2">
                              Coloração
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn5_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI5_3">
                              Movimentação
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn5_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI5_4">
                              Detalhes da Úvula
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn5_4"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs6">
                <legend className="legSub inspLeg" id="inspLegSub6">
                  Orofaringe
                </legend>
                <div role="group" className="inspDiv" id="inspDiv6">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain6"
                  >
                    <input
                      type="radio"
                      name="jugInpName6"
                      id="jugInpYes6"
                      className="radOp radYes"
                      data-title="Inspeção de Orofaringe (Sim)"
                    />
                    <label htmlFor="jugInpYes6" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName6"
                      id="jugInpNo6"
                      className="radOp radNo"
                      data-title="Inspeção de Orofaringe (Não)"
                    />
                    <label htmlFor="jugInpNo6" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub6"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert6"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Orofaringe"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn6"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog6"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList6">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI6_1">
                              Coloração
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn6_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI6_2">
                              Presença das Tonsilas
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn6_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI6_3">
                              Nódulos linfoides
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn6_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI6_4">
                              Pilares (Palatoglosso)
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn6_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI6_5">
                              Palatofaríngeo
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn6_5"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs7">
                <legend className="legSub inspLeg" id="inspLegSub7">
                  Língua
                </legend>
                <div role="group" className="inspDiv" id="inspDiv7">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain7"
                  >
                    <input
                      type="radio"
                      name="jugInpName7"
                      id="jugInpYes7"
                      className="radOp radYes"
                      data-title="Inspeção de Língua (Sim)"
                    />
                    <label htmlFor="jugInpYes7" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName7"
                      id="jugInpNo7"
                      className="radOp radNo"
                      data-title="Inspeção de Língua (Não)"
                    />
                    <label htmlFor="jugInpNo7" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub7"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert7"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Língua"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn7"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog7"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList7">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI7_1">
                              Textura
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_2">
                              Coloração
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_3">
                              Papilas filiformes
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_4">
                              Paplias fungiformes
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_5">
                              Paplias calciformes (circunvaladas)
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_5"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_6">
                              Fissuras
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_6"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_7">
                              Glossite migratória benigna
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_7"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_8">
                              Veias linguais
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_8"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_9">
                              Varizes linguais
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_9"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_10">
                              Fímbrias
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_10"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI7_11">
                              Papilas Foliadas
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn7_11"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs8">
                <legend className="legSub inspLeg" id="inspLegSub8">
                  Assoalho da Boca
                </legend>
                <div role="group" className="inspDiv" id="inspDiv8">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain8"
                  >
                    <input
                      type="radio"
                      name="jugInpName8"
                      id="jugInpYes8"
                      className="radOp radYes"
                      data-title="Inspeção de Assoalho da Boca (Sim)"
                    />
                    <label htmlFor="jugInpYes8" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName8"
                      id="jugInpNo8"
                      className="radOp radNo"
                      data-title="Inspeção de Assoalho da Boca (Não)"
                    />
                    <label htmlFor="jugInpNo8" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub8"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert8"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Assoalho da Boca"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn8"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog8"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList8">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI8_1">
                              Carúncula
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn8_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI8_2">
                              Glândulas Submandibulares
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn8_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI8_3">
                              Glândulas Sublinguais
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn8_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI8_4">
                              Freio Lingual (implantação)
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn8_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI8_5">
                              Fímbrias
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn8_5"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI8_6">
                              Agregados Linfoides
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn8_6"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs9">
                <legend className="legSub inspLeg" id="inspLegSub9">
                  Músculos da Mastigação — Palpação
                </legend>
                <div role="group" className="inspDiv" id="inspDiv9">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain9"
                  >
                    <input
                      type="radio"
                      name="jugInpName9"
                      id="jugInpYes9"
                      className="radOp radYes"
                      data-title="Inspeção de Músculos da Mastigação (Sim)"
                    />
                    <label htmlFor="jugInpYes9" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName9"
                      id="jugInpNo9"
                      className="radOp radNo"
                      data-title="Inspeção de Músculos da Mastigação (Não)"
                    />
                    <label htmlFor="jugInpNo9" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub9"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert9"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Músculos da Mastigação"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn9"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog9"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList9">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI9_1">
                              Pterigoideo lateral
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn9_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI9_2">
                              Temporal
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn9_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI9_3">
                              Masseter
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn9_3"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>

              <fieldset className="fsSub fsInsp noInvert" id="inspFs10">
                <legend className="legSub inspLeg" id="inspLegSub10">
                  Gengiva Marginal e Inserida (Periodonto)
                </legend>
                <div role="group" className="inspDiv" id="inspDiv10">
                  Há alteração?
                  <span
                    role="group"
                    className="spanMain inspSpanMain"
                    id="inspSpanMain10"
                  >
                    <input
                      type="radio"
                      name="jugInpName10"
                      id="jugInpYes10"
                      className="radOp radYes"
                      data-title="Inspeção de Gengiva Marginal e Inserida (Sim)"
                    />
                    <label htmlFor="jugInpYes10" className="labOp labInsp">
                      Sim
                    </label>
                    <input
                      type="radio"
                      name="jugInpName10"
                      id="jugInpNo10"
                      className="radOp radNo"
                      data-title="Inspeção de Gengiva Marginal e Inserida (Não)"
                    />
                    <label htmlFor="jugInpNo10" className="labOp labInsp">
                      Não
                    </label>
                    <br role="presentation" />
                    <span
                      role="group"
                      className="spanSub inspSpanSub"
                      id="inspSpanSub10"
                      hidden
                    >
                      <textarea
                        className="form-control inspTa noInvert"
                        id="inspTa noInvert10"
                        placeholder="Insira aqui as observações"
                        data-title="Observações: Gengiva Marginal e Inserida"
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-secondary inspBtn inspBtnDialog"
                        id="inspDialogBtn10"
                      >
                        Mostrar Sugestões
                      </button>
                      <dialog
                        className="inspDialog modal-content"
                        id="inspDialog10"
                        draggable="true"
                      >
                        <ol className="inspList" id="inspList10">
                          <span
                            role="group"
                            className="inspLITitle modal-title noInvert"
                          >
                            Considere observar:
                          </span>
                          <div role="group" className="modal-body">
                            <li className="inspLI form-control" id="inspLI10_1">
                              Níveis de Inserção
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_1"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI10_2">
                              Presença de Inflamação
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_2"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI10_3">
                              Fístulas
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_3"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI10_4">
                              Abscessos
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_4"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI10_5">
                              Exostoses
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_5"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI10_6">
                              Tórus Mandibular
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_6"
                              >
                                Adicionar
                              </button>
                            </li>
                            <li className="inspLI form-control" id="inspLI10_7">
                              Pigmentações
                              <button
                                type="button"
                                className="inspLIBtn btn btn-secondary"
                                id="inspLIBtn10_7"
                              >
                                Adicionar
                              </button>
                            </li>
                          </div>
                        </ol>
                      </dialog>
                    </span>
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <hr />

            <fieldset name="fsAvDentName" id="fsAvDentId" className="fsMain">
              <legend className="legMain" id="fsAvDentLeg">
                <span className="mgr-1v bolded">Avaliação Dentária</span>
              </legend>

              <section
                className="sectionMain"
                id="sectAvDentId"
                itemScope
                itemProp="dentComp"
              >
                <div
                  role="group"
                  className="quadrAvDent quadrMainDiv form-control"
                  id="divMainSupDir"
                  itemProp="dentQuadr"
                  draggable="true"
                >
                  <div role="group" className="flexDiv headQuadr tabCelTop">
                    <p className="pQuadr">SUPERIOR DIREITO</p>
                    <button
                      type="button"
                      className="resetBut btn btn-secondary"
                      id="resetSupDir"
                    >
                      Resetar
                    </button>
                  </div>
                  <div
                    role="group"
                    className="contInQuadrs divSub quadrAvDent quadrSubDiv tabCelBottom"
                    id="divSubSupDir"
                    itemProp="dentQuadr"
                  >
                    <label className="labelAvDent" id="labD18">
                      <span role="group" className="spanMain" id="spanMainD18">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD18"
                        >
                          18
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD18"
                        id="inpD18"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        required
                        data-title="Estado do Dente 18"
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD18" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD17">
                      <span role="group" className="spanMain" id="spanMainD17">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD17"
                        >
                          17
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD17"
                        id="inpD17"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 17"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD17" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD16">
                      <span role="group" className="spanMain" id="spanMainD16">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD16"
                        >
                          16
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD16"
                        id="inpD16"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 16"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD16" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD15">
                      <span role="group" className="spanMain" id="spanMainD15">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD15"
                        >
                          15
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD15"
                        id="inpD15"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 15"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD15" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD14">
                      <span role="group" className="spanMain" id="spanMainD14">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD14"
                        >
                          14
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD14"
                        id="inpD14"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 14"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD14" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD13">
                      <span role="group" className="spanMain" id="spanMainD13">
                        <span
                          role="group"
                          className="contSpanSub DNum"
                          id="spanSubD13"
                        >
                          13
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD13"
                        id="inpD13"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 13"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD13" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD12">
                      <span role="group" className="spanMain" id="spanMainD12">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD12"
                        >
                          12
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemDentD12"
                        id="inpD12"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 12"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemDentD12" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD11">
                      <span role="group" className="spanMain" id="spanMainD11">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD11"
                        >
                          11
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD11"
                        id="inpD11"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 11"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD11" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>
                  </div>
                </div>

                <div
                  role="group"
                  className="quadrAvDent quadrMainDiv form-control"
                  id="divMainInfEsq"
                  itemProp="dentQuadr"
                  draggable="true"
                >
                  <div role="group" className="flexDiv headQuadr">
                    <p className="pQuadr">INFERIOR ESQUERDO</p>
                    <button
                      type="button"
                      className="resetBut btn btn-secondary"
                      id="resetInEsq"
                    >
                      Resetar
                    </button>
                  </div>
                  <div
                    role="group"
                    className="contInQuadrs divSub quadrAvDent quadrSubDiv"
                    id="divSubInfEsq"
                    itemProp="dentQuadr"
                  >
                    <label className="labelAvDent" id="labD31">
                      <span role="group" className="spanMain" id="spanMainD31">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD31"
                        >
                          31
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD31"
                        id="inpD31"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 31"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD31" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD32">
                      <span role="group" className="spanMain" id="spanMainD32">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD32"
                        >
                          32
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD32"
                        id="inpD32"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 32"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD32" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD33">
                      <span role="group" className="spanMain" id="spanMainD33">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD33"
                        >
                          33
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD33"
                        id="inpD33"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 33"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD33" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD34">
                      <span role="group" className="spanMain" id="spanMainD34">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD34"
                        >
                          34
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD34"
                        id="inpD34"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 34"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD34" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD35">
                      <span role="group" className="spanMain" id="spanMainD35">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD35"
                        >
                          35
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD35"
                        id="inpD35"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 35"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD35" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD36">
                      <span role="group" className="spanMain" id="spanMainD36">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD36"
                        >
                          36
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD36"
                        id="inpD36"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 36"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD36" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD37">
                      <span role="group" className="spanMain" id="spanMainD37">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD37"
                        >
                          37
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD37"
                        id="inpD37"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 37"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD37" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD38">
                      <span role="group" className="spanMain" id="spanMainD38">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD38"
                        >
                          38
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD38"
                        id="inpD38"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 38"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD38" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>
                  </div>
                </div>

                <div
                  role="group"
                  className="quadrAvDent quadrMainDiv form-control"
                  id="divMainSupEsq"
                  itemProp="dentQuadr"
                  draggable="true"
                >
                  <div role="group" className="flexDiv headQuadr">
                    <p className="pQuadr">SUPERIOR ESQUERDO</p>
                    <button
                      type="button"
                      className="resetBut btn btn-secondary"
                      id="resetSupEsq"
                    >
                      Resetar
                    </button>
                  </div>
                  <div
                    role="group"
                    className="contInQuadrs divSub quadrAvDent quadrSubDiv"
                    id="divSubSupEsq"
                    itemProp="dentQuadr"
                  >
                    <label className="labelAvDent" id="labD21">
                      <span role="group" className="spanMain" id="spanMainD21">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD21"
                        >
                          21
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD21"
                        id="inpD21"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 21"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD21" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD22">
                      <span role="group" className="spanMain" id="spanMainD22">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD22"
                        >
                          22
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD22"
                        id="inpD22"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 22"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD22" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD23">
                      <span role="group" className="spanMain" id="spanMainD23">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD23"
                        >
                          23
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD23"
                        id="inpD23"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 23"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD23" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD24">
                      <span role="group" className="spanMain" id="spanMainD24">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD24"
                        >
                          24
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD24"
                        id="inpD24"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 24"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD24" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD25">
                      <span role="group" className="spanMain" id="spanMainD25">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD25"
                        >
                          25
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD25"
                        id="inpD25"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 25"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD25" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD26">
                      <span role="group" className="spanMain" id="spanMainD26">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD26"
                        >
                          26
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD26"
                        id="inpD26"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 26"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD26" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD27">
                      <span role="group" className="spanMain" id="spanMainD27">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD27"
                        >
                          27
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD27"
                        id="inpD27"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 27"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD27" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD28">
                      <span role="group" className="spanMain" id="spanMainD28">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD28"
                        >
                          28
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD28"
                        id="inpD28"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 28"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD28" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>
                  </div>
                </div>

                <div
                  role="group"
                  className="quadrAvDent quadrMainDiv form-control"
                  id="divMainInfDir"
                  itemProp="dentQuadr"
                  draggable="true"
                >
                  <div role="group" className="flexDiv headQuadr">
                    <p className="pQuadr">INFERIOR DIREITO</p>
                    <button
                      type="button"
                      className="resetBut btn btn-secondary"
                      id="resetInfDir"
                    >
                      Resetar
                    </button>
                  </div>
                  <div
                    role="group"
                    className="contInQuadrs contQuadr divSub quadrAvDent quadrSubDiv"
                    id="divSubInfDir"
                    itemProp="dentQuadr"
                  >
                    <label className="labelAvDent" id="labD41">
                      <span role="group" className="spanMain" id="spanMainD41">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD41"
                        >
                          41
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD41"
                        id="inpD41"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 41"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD41" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD42">
                      <span role="group" className="spanMain" id="spanMainD42">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD42"
                        >
                          42
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD42"
                        id="inpD42"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 42"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD42" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD43">
                      <span role="group" className="spanMain" id="spanMainD43">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD43"
                        >
                          43
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD43"
                        id="inpD43"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 43"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD43" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD44">
                      <span role="group" className="spanMain" id="spanMainD44">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD44"
                        >
                          44
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD44"
                        id="inpD44"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 44"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD44" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD45">
                      <span role="group" className="spanMain" id="spanMainD45">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD45"
                        >
                          45
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD45"
                        id="inpD45"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 45"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD45" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD46">
                      <span role="group" className="spanMain" id="spanMainD46">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD46"
                        >
                          46
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD46"
                        id="inpD46"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 46"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD46" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD47">
                      <span role="group" className="spanMain" id="spanMainD47">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD47"
                        >
                          47
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD47"
                        id="inpD47"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 47"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD47" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>

                    <label className="labelAvDent" id="labD48">
                      <span role="group" className="spanMain" id="spanMainD48">
                        <span
                          role="textbox"
                          className="spanSub DNum"
                          id="spanSubD48"
                        >
                          48
                        </span>
                      </span>
                      <input
                        type="text"
                        list="avElemD48"
                        id="inpD48"
                        className="inpAvDent form-control noInvert minText patternText"
                        onInput={ev => handleEventReq(ev.currentTarget)}
                        data-title="Estado do Dente 48"
                        required
                        data-reqlength="6"
                        data-pattern="amálgama|careado|hígido|trincado|ausente"
                        data-flags="gi"
                      />
                      <datalist id="avElemD48" className="dlAvDent">
                        <option value="Amálgama" className="elemOp">
                          Amálgama
                        </option>
                        <option value="Careado" className="elemOp">
                          Careado
                        </option>
                        <option value="Hígido" className="elemOp">
                          Hígido
                        </option>
                        <option value="Trincado" className="elemOp">
                          Trincado
                        </option>
                        <option value="Ausente" className="elemOp">
                          Ausente
                        </option>
                      </datalist>
                    </label>
                  </div>
                </div>
              </section>
            </fieldset>
            <hr />

            <fieldset
              name="fsPlanName"
              id="fsPlanId"
              className="fsMain noInvert"
            >
              <legend className="legMain">Plano de Tratamento</legend>
              <textarea
                name="taPlanName"
                id="taPlanId"
                className="taPlan form-control"
                placeholder="Escreva o Plano de Tratamento aqui"
                data-title="Plano de Tratamento"
                required
              ></textarea>
            </fieldset>
            <br role="presentation" />
            <hr />
            <TratFs />
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
                    &#34;DECLARO QUE CONCORDO COM OS TRATAMENTOS PROPOSTOS
                    ACIMA&#34;
                  </span>
                  <label
                    htmlFor="confirmId"
                    className="labConfirm noInvert"
                  ></label>
                  <input
                    type="checkbox"
                    name="confirmName"
                    id="confirmId"
                    data-title="Concordância"
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
                    <OdDeclaration
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
                    <label
                      htmlFor="confirmDatId"
                      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC htHalf900Q bolded"
                      id="labConfirmDate"
                    >
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
                        onClick={ev => {
                          changeToAstDigit(ev.currentTarget);
                        }}
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
              <br role="presentation" />
              <section
                className="sectionMain sectionConfirm"
                id="sectConfirmBut"
              >
                <button
                  type="submit"
                  name="submitFormButName"
                  id="submitFormButId"
                  className="confirmBut btn btn-success"
                  formAction="_self"
                  formMethod="POST"
                  accessKey="enter"
                  onClick={ev => validateForm(ev.currentTarget)}
                >
                  Submeter
                </button>
                <button
                  type="reset"
                  className="confirmBut btn btn-warning"
                  id="resetFormBtn"
                >
                  Resetar
                </button>
                <button
                  type="button"
                  id="btnExport"
                  className="btn btn-secondary"
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
