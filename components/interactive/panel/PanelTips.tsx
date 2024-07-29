"use client";

import { DlgProps } from "@/lib/global/declarations/interfaces";
import { nullishDlg } from "@/lib/global/declarations/types";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { useRef, useEffect } from "react";

export default function PanelTips({ state, dispatch }: DlgProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  const handleEscape = (ev: KeyboardEvent) => {
    if (ev.key === "ESCAPE") {
      dispatch(!state);
      !state && dlgRef.current?.close();
    }
  };
  //push em history
  useEffect(() => {
    history.pushState(
      {},
      "",
      `${location.origin}${location.pathname}${location.search}&tips=open`
    );
    setTimeout(() => {
      history.pushState(
        {},
        "",
        `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")
      );
    }, 300);
    return () => {
      history.pushState(
        {},
        "",
        `${location.origin}${location.pathname}${location.search}`.replaceAll(
          "&tips=open",
          ""
        )
      );
      setTimeout(() => {
        history.pushState(
          {},
          "",
          `${location.href}`.replaceAll("/?", "?").replaceAll("/#", "#")
        );
      }, 300);
    };
  }, []);
  useEffect(() => {
    try {
      if (!(dlgRef.current instanceof HTMLDialogElement))
        throw elementNotFound(
          dlgRef.current,
          `${PanelTips.prototype.constructor.name}`,
          extLine(new Error())
        );
      dlgRef.current.showModal();
      addEventListener("keypress", handleEscape);
    } catch (e) {
      console.error(
        `Error executing useEffect for PanelTips:\n${(e as Error).message}`
      );
    }
    return () => removeEventListener("keypress", handleEscape);
  }, [dlgRef]);
  return !state ? (
    <></>
  ) : (
    <dialog
      className="modal-content-fit defDp wid50v widQ460MinFull"
      id="tipsDlg"
      ref={dlgRef}
      onClick={ev => {
        if (
          isClickOutside(ev, ev.currentTarget).some(coord => coord === true)
        ) {
          ev.currentTarget.close();
          dispatch(!state);
        }
      }}
    >
      <section className="flexNoW flexAlItCt flexJBt">
        <h3 className="bolded">Manual para controle de formulário</h3>
        <button
          className="btn btn-close forceInvert"
          id="tipsClose"
          onClick={ev => {
            dispatch(!state);
            !state && ev.currentTarget.closest("dialog")?.close();
          }}
        ></button>
      </section>
      <hr className="noInvert" />
      <article className="flexNoWC noInvert">
        <section className="tipsSect" id="fillTips">
          <h4 className="bolded mg-2bv">1. Controle de Entradas</h4>
          <details className="noInvert">
            <summary className="bolded mg-2bv">1.1. Autocorreção</summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p className="dicas" id="dicaUppercase">
                    As <strong className="noInvert">primeiras letras</strong>,
                    exceto conjunções, são capitalizadas automaticamente por
                    padrão. Outras correções de campos complexos podem precisar
                    de mais texto — Continue digitando!
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details className="noInvert">
            <summary className="bolded mg-2bv">1.2. Autopreenchimento</summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    O{" "}
                    <strong className="noInvert">
                      Preenchimento Automático
                    </strong>{" "}
                    permite que campos{" "}
                    <em className="noInvert">padronizados</em>
                    (como CPF e telefone) passem por correção automática de
                    acordo com o padrão formal do dado tratado.
                  </p>
                </li>
              </ul>
            </div>
          </details>
        </section>
        <hr className="noInvert" />
        <section className="tipsSect noInvert" id="consTips">
          <h4 className="mg-2bv noInvert bolded">2. Agenda e Consultas</h4>
          <details>
            <summary className="bolded mg-2bv">2.1. Preenchimento</summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    O{" "}
                    <strong className="noInvert">
                      Registro de Consulta Nova
                    </strong>{" "}
                    deve ser feito com o preenchimento do formulário aberto ao
                    clicar no botão rotulado{" "}
                    <kbd className="kbd kbd-success">Adicionar Consulta</kbd>
                    ;
                    <br />
                  </p>
                </li>
                <li>
                  <p>
                    A <strong className="noInvert">Alocação</strong> pode ser
                    agilizada com o uso de botões para
                    <kbd className="kbd kbd-primary">Consultar Listas</kbd>, os
                    quais abrem as tabelas de dados dos pacientes, estudantes ou
                    profissionais e permitem preenchimento automático de campos
                    com <kbd className="kbd kbd-success">Alocar</kbd>;
                  </p>
                </li>
                <li>
                  <p>
                    Também são disponibilizações{" "}
                    <strong className="noInvert">Listas de dados</strong> para
                    preenchimento ágil, com montagem baseada nos dados do{" "}
                    <em className="noInvert">navegador</em> (como as informações
                    da conta Google, no Google chrome) e comunicação com o banco
                    de dados;
                  </p>
                </li>
                <li>
                  <p>
                    As{" "}
                    <strong className="noInvert">Alocações invalidadas</strong>{" "}
                    são exibidas com cor diferente, aparecendo como&nbsp;
                    <kbd className="kbd kbd-warning">Alocar&nbsp;!</kbd>;
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details>
            <summary className="bolded mg-2bv">2.2. Registro</summary>
            <ul>
              <li>
                <p>
                  O <strong className="noInvert">Registro inicial</strong> da
                  consulta pode ser feito na agenda e no sistema através do{" "}
                  <kbd className="kbd kbd-success">Finalizar</kbd>
                  no final da <em className="noInvert">Janela de Registro</em>;
                </p>
              </li>
              <li>
                <p>
                  O <strong className="noInvert">Botão de Rótulo</strong> da
                  consulta é produzido com a{" "}
                  <em className="noInvert">finalização de registro</em>,
                  ocupando a{" "}
                  <strong className="noInvert">Área de transferência</strong>;
                </p>
              </li>
              <li>
                <p>
                  Os <em className="noInvert">Botões de Rótulo</em> apresentam a{" "}
                  <strong className="noInvert">Ficha de Consulta</strong>
                  correspondente ao ser clicado;
                </p>
              </li>
              <li>
                <p>
                  O <strong className="noInvert">Download</strong> das
                  informações do registro de consulta para{" "}
                  <em className="noInvert">armazenamento</em> pode ser feito
                  através de
                  <kbd className="kbd kbd-primary">Gerar planilha</kbd>, o qual
                  exporta um <code>.xlsx</code>;
                </p>
              </li>
              <li>
                <p>
                  O <strong className="noInvert">Agendamento</strong> é feito
                  através na seção de agendamento, onde pode ocorrer de duas
                  formas:
                  <ol>
                    <li>
                      <p>
                        Através do{" "}
                        <strong className="noInvert">
                          Preenchimento de informações
                        </strong>
                        com o dia e horário desejados e clique em{" "}
                        <kbd className="kbd kbd-primary">Agendar Consulta</kbd>;
                      </p>
                    </li>
                    <li>
                      <p>
                        Através do{" "}
                        <strong className="noInvert">Arraste&nbsp;</strong>
                        para um <em className="noInvert">espaço livre</em> na
                        agenda;
                      </p>
                    </li>
                  </ol>
                </p>
              </li>
            </ul>
          </details>
          <details>
            <summary className="bolded mg-2bv">2.3. Confirmação</summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    A <strong className="noInvert">Confirmação</strong> de
                    consultas na agenda só pode ser feita por Coordenadores e
                    Supervisores do projeto, sendo feita pelo clique na checkbox{" "}
                    <kbd className="kbd-check-input">
                      <input
                        className="kbd-check-input-img"
                        id="kbd-check-ex_1"
                        checked
                        disabled
                      />
                    </kbd>{" "}
                    ao lado de todo espaço para agendamento;
                  </p>
                </li>
                <li>
                  <p>
                    Usuários de{" "}
                    <strong className="noInvert">outras classes</strong>
                    podem alocar novos agendamentos, mas estem ficarão pendentes
                    para confirmação visualmente e na leitura do sistema;
                  </p>
                </li>
                <li>
                  <p>
                    A confirmação pode ser feita inicialmente,{" "}
                    <em className="noInvert">antes mesmo do agendamento</em>
                    através da checkbox{" "}
                    <kbd className="kbd-check-input">
                      <input
                        className="kbd-check-input-img"
                        id="kbd-check-ex_2"
                        checked
                        disabled
                      />
                    </kbd>{" "}
                    ao lado, rotulada como{" "}
                    <strong className="noInvert">"Consulta Confirmada"</strong>;
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details>
            <summary className="bolded mg-2bv">2.4. Cancelamento</summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    O <strong className="noInvert">Cancelamento</strong> de
                    consultas na agenda só pode ser feito por Coordenadores e
                    Supervisores do projeto, sendo feito através do{" "}
                    <kbd className="kbd-rounded">
                      <span>×</span>
                    </kbd>{" "}
                    ao lado de um botão agendado
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details>
            <summary className="bolded mg-2bv">
              2.5. Montagem e ajuste de agenda
            </summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    Para que qualquer{" "}
                    <strong className="noInvert">Ajuste automático</strong>{" "}
                    tenha efeito, é necessário que o{" "}
                    <em className="noInvert">Auto-ajuste de mês</em> esteja
                    ativado;
                  </p>
                </li>
                <li>
                  <p>
                    Os{" "}
                    <strong className="noInvert">
                      Dias de trabalho semanais
                    </strong>{" "}
                    são manipuláveis e reajustáveis através dos campos de
                    seleção correspondentes;
                  </p>
                </li>
                <li>
                  <p>
                    O <strong className="noInvert">Mês de trabalho</strong> é
                    ajustável através do campo de seleção correspondente;
                  </p>
                </li>
                <li>
                  <p>
                    Os espaços na agenda pode ser preenchida através de{" "}
                    <strong className="noInvert">Preenchimento direto</strong>,
                    porém a consulta só é lida pelo sistema com confirmação e{" "}
                    <em className="noInvert">não retornará ficha</em>;
                  </p>
                </li>
                <li>
                  <p>
                    Os <strong className="noInvert">Dias do Mês</strong> na
                    agenda são ajustáveis através do ícone de agenda;
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details>
            <summary className="bolded mg-2bv">2.6. Controle Geral</summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    <strong className="noInvert">Planilhas</strong> com as
                    entradas referentes aos formulários em tela são obtidos
                    através de{" "}
                    <kbd className="kbd kbd-success">Gerar Planilha</kbd>
                  </p>
                </li>
                <li>
                  <p>
                    Formulários podem ser completamente reiniciados através de{" "}
                    <kbd className="kbd kbd-warning">Resetar Formulário</kbd>
                  </p>
                </li>
              </ul>
            </div>
          </details>
        </section>
        <hr className="noInvert" />
        <section className="tipsSect" id="panelTips">
          <h4 className="bolded mg-2bv">3. Painel de Usuário</h4>
          <details>
            <summary className="bolded mg-2bv noInvert">
              3.1. Dados Fixos em Leitura
            </summary>
            <div>
              <ul>
                <li>
                  <p>
                    O painel disponibiliza um{" "}
                    <strong className="noInvert">ícone</strong> dinamicamente
                    escolhido com base na{" "}
                    <em className="noInvert">área de trabalho</em> do usuário;
                  </p>
                </li>
                <li>
                  <p>
                    O <strong className="noInvert">ícone</strong> da área de
                    trabalho pode ser clicado para exibir um{" "}
                    <em className="noInvert">dropdown</em> contendo informações
                    adicionais sobre o usuário, assim como{" "}
                    <strong className="noInvert">
                      acesso a janelas adicionais
                    </strong>
                    representadas através de{" "}
                    <em className="noInvert">ícones</em>;
                  </p>
                </li>
                <li>
                  <p>
                    O <strong className="noInvert">nome</strong> do usuário é
                    listado à esquerda do ícone da sua área de trabalho;
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details>
            <summary className="bolded mg-2bv noInvert">
              3.2. Dropdown de Usuário
            </summary>
            <div className="noInvert">
              <ul className="noInvert">
                <li>
                  <p>
                    As{" "}
                    <strong className="noInvert">
                      Informações adicionais do usuário
                    </strong>{" "}
                    são disponibilizadas no dropdown aberto pelo{" "}
                    <em className="noInvert">clique no ícone de área</em>;
                  </p>
                </li>
                <li>
                  <p>
                    Há icones de acesso para outras janelas, em ordem:
                    <ol className="noInvert">
                      <li>
                        <strong className="noInvert">Alteração</strong>:
                        Solicitação de{" "}
                        <em className="noInvert">
                          Alteração de Dados do Usuário ativo
                        </em>
                        ;
                      </li>
                      <li>
                        <strong className="noInvert">Logout</strong>:{" "}
                        <em className="noInvert">Saída</em> do sistema,
                        retornando à tela de login;
                      </li>
                      <li>
                        <strong className="noInvert">Contato</strong>:
                        Solicitação de{" "}
                        <em className="noInvert">
                          contato para reportar problemas
                        </em>{" "}
                        no sistema;
                      </li>
                    </ol>
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details>
            <summary className="bolded mg-2bv noInvert">
              3.3. Modo Noturno
            </summary>
            <div className="noInvert">
              <ul className="noInvert">
                <li>
                  <p>
                    O <strong className="noInvert">Modo Noturno</strong> pode
                    ser ativado ou desativado através do{" "}
                    <em className="noInvert">Alternador&nbsp;</em>
                    <input
                      type="checkbox"
                      role="switch"
                      className="form-check-input"
                      id="switch_ex_1"
                      checked
                      disabled
                    />{" "}
                    ao lado do{" "}
                    <strong className="noInvert">ícone de lua</strong>;
                  </p>
                </li>
              </ul>
            </div>
          </details>
        </section>
        <hr />
        <section className="tipsSect" id="modalTips">
          <h4 className="bolded mg-2bv">4. Janelas</h4>
          <details className="noInvert">
            <summary className="bolded mg-2bv">
              4.1. Entendendo Janelas Modais
            </summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    <dfn className="noInvert">
                      Janelas <strong className="noInvert">Modais</strong>
                    </dfn>{" "}
                    são as que
                    <em className="noInvert">cobrem parcialmente</em> uma tela
                    principal, colocando-a em segundo plano.
                  </p>
                </li>
              </ul>
            </div>
          </details>
          <details className="noInvert">
            <summary className="bolded mg-2bv">
              4.2. Fechando Janelas Modais
            </summary>
            <div className="noInvert">
              <ul>
                <li>
                  <p>
                    Para <strong className="noInvert">fechar</strong> janelas
                    modais, há quatro opções possíveis:
                    <ol>
                      <li>
                        <p>
                          Clicar no{" "}
                          <kbd className="kbd-rounded">
                            <span>×</span>
                          </kbd>{" "}
                          no cabeçalho da janela;
                        </p>
                      </li>
                      <li>
                        <p>
                          Clicar{" "}
                          <strong className="noInvert">
                            fora da janela modal
                          </strong>
                          ;
                        </p>
                      </li>
                      <li>
                        <p>
                          Apertar <kbd className="kbd noInvert">Esc</kbd> no
                          teclado;
                        </p>
                      </li>
                      <li>
                        <p>
                          Clicar em{" "}
                          <strong className="noInvert">
                            algum <kbd className="kbd noInvert">Botão</kbd>
                            &nbsp;de submissão
                          </strong>
                          ;
                        </p>
                      </li>
                    </ol>
                  </p>
                </li>
              </ul>
            </div>
          </details>
        </section>
        <hr />
        <section className="tipsSect" id="errorTips">
          <h4 className="bolded mg-2bv">5. Erros</h4>
          <div>
            <details>
              <summary className="bolded mg-2bv">
                5.1. Erros de Preenchimento
              </summary>
              <ul>
                <li>
                  <p>
                    Considere{" "}
                    <strong className="noInvert">
                      Desativar a Autocorreção e/ou o Autopreenchimento
                    </strong>{" "}
                    em casos de erro no preenchimento automático através dos{" "}
                    <em className="noInvert">Alternadores</em>&nbsp;
                    <input
                      type="checkbox"
                      role="switch"
                      className="form-check-input"
                      id="switch_ex_2"
                      checked
                      disabled
                    />
                    &nbsp;respectivos;
                  </p>
                </li>
              </ul>
            </details>
            <details>
              <summary className="bolded mg-2bv">
                5.2. Erros na montagem da Agenda
              </summary>
              <ul>
                <li>
                  <p>
                    Considere{" "}
                    <strong className="noInvert">
                      Desativar o Auto-ajuste de mês
                    </strong>{" "}
                    em casos de erro na montagem dinâmica da agenda de{" "}
                    <em className="noInvert">Atendimento Diário</em>;
                  </p>
                </li>
              </ul>
            </details>
            <details>
              <summary className="bolded mg-2bv">
                5.3. Erros no Modo Noturno
              </summary>
              <ul>
                <li>
                  <p>
                    Em casos de cores com{" "}
                    <strong className="noInvert">
                      visualização prejudicada
                    </strong>{" "}
                    ou <strong className="noInvert">contraste excessivo</strong>
                    , considere{" "}
                    <em className="noInvert">
                      trocar o painel de trabalho e/ou reiniciar o Modo Noturno
                    </em>{" "}
                    através do Alternador&nbsp;
                    <input
                      type="checkbox"
                      role="switch"
                      className="form-check-input"
                      id="switch_ex_3"
                      checked
                      disabled
                    />
                    ;
                  </p>
                </li>
              </ul>
            </details>
            <details>
              <summary className="bolded mg-2bv">
                5.4. Erros no display do Dropdown de usuário
              </summary>
              <ul>
                <li>
                  <p>
                    No caso de{" "}
                    <strong className="noInvert">
                      erros na interação com o dropdown
                    </strong>
                    , considere clicar no{" "}
                    <em className="noInvert">ícone de janela modal</em>;
                  </p>
                </li>
              </ul>
            </details>
            <details>
              <summary className="bolded mg-2bv">
                5.5. Erros no carregamento de telas
              </summary>
              <ul>
                <li>
                  <p>
                    No caso de{" "}
                    <strong className="noInvert">erros de carregamento</strong>,
                    clique em{" "}
                    <kbd className="kbd kbd-primary">Tentar novamente</kbd> para
                    forçar nova tentativa e/ou{" "}
                    <em className="noInvert">
                      permitir escape para outras telas
                    </em>
                    , ou clique insistentemente pelo menos 3 vezes para{" "}
                    <em className="noInvert">recarregar a tela</em>;
                  </p>
                </li>
              </ul>
            </details>
          </div>
        </section>
      </article>
    </dialog>
  );
}
