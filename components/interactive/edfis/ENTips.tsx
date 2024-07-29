import { DlgProps } from "@/lib/global/declarations/interfaces";
import { nullishDlg } from "@/lib/global/declarations/types";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { useRef, useEffect } from "react";

export default function ENTips({ state, dispatch }: DlgProps): JSX.Element {
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
          `${ENTips.prototype.constructor.name}`,
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
  useEffect(() => {
    try {
      const mathFirstBlock = document.getElementById("mathFirstBlock");
      if (!(mathFirstBlock instanceof HTMLElement))
        throw elementNotFound(
          mathFirstBlock,
          "mathFirstBlock",
          extLine(new Error())
        );
      mathFirstBlock.innerHTML = `
      <math className="italic math-lg">
      <mfrac>
        <mrow>
          <mi>Peso</mi>
        </mrow>
        <msup>
          <mi>(Altura)</mi>
          <mn>2</mn>
        </msup>
      </mfrac>
    </math>
      `;
    } catch (e) {
      console.error(
        `Error executing procedure for adding first math block:\n${
          (e as Error).message
        }`
      );
    }
    try {
      const mathSecondBlock = document.getElementById("mathSecondBlock");
      if (!(mathSecondBlock instanceof HTMLElement))
        throw elementNotFound(
          mathSecondBlock,
          "mathSecondBlock",
          extLine(new Error())
        );
      mathSecondBlock.innerHTML = `
      <summary className="noInvert">Fórmula</summary>
      <br />
      <math className="italic math">
        <mfrac>
          <mrow>
            <mn>495</mn>
          </mrow>
          <mrow>
            <munder>
              <mi>C1</mi>
              <mo>&#x23DF</mo>
            </munder>
            <mo>-</mo>
            <munder>
              <mi>C2</mi>
              <mo>&#x23DF</mo>
            </munder>
            <mo>x</mo>
            <mi>SDC</mi>
            <mo>+</mo>
            <munder>
              <mi>C3</mi>
              <mo>&#x23DF</mo>
            </munder>
            <mo>x</mo>
            <msup>
              <mi>SDC</mi>
              <mn>2</mn>
            </msup>
            <mo>-</mo>
            <munder>
              <mn>C4</mn>
              <mo>&#x23DF</mo>
            </munder>
            <mo>x</mo>
            <mi>Idade</mi>
          </mrow>
        </mfrac>
        <mo>-</mo>
        <mn>450</mn>
      </math>
      `;
    } catch (e) {
      console.error(
        `Error executing procedure for adding second math block:\n${
          (e as Error).message
        }`
      );
    }
    try {
      const mathThirdBlock = document.getElementById("mathThirdBlock");
      if (!(mathThirdBlock instanceof HTMLElement))
        throw elementNotFound(
          mathThirdBlock,
          "mathThirdBlock",
          extLine(new Error())
        );
      mathThirdBlock.innerHTML = `
      <math className="italic math-sm">
      <munder>
        <mn>C1</mn>
        <mo>&#x23DF</mo>
      </munder>
      <mo>+</mo>
      <mi>(</mi>
      <munder>
        <mn>C2</mn>
        <mo>&#x23DF</mo>
      </munder>
      <mn>&nbsp;x&nbsp;</mn>
      <mn>Peso</mn>
      <mo>+</mo>
      <munder>
        <mn>C3</mn>
        <mo>&#x23DF</mo>
      </munder>
      <mo>-</mo>
      <mn>Altura</mn>
      <mo>x</mo>
      <mn>Idade</mn>
      <mi>)</mi>
    </math>
      `;
    } catch (e) {
      console.error(
        `Error executing procedure for adding third math block:\n${
          (e as Error).message
        }`
      );
    }
    try {
      const mathFourthBlock = document.getElementById("mathFourthBlock");
      if (!(mathFourthBlock instanceof HTMLElement))
        throw elementNotFound(
          mathFourthBlock,
          "mathFourthBlock",
          extLine(new Error())
        );
      mathFourthBlock.innerHTML = `
      <math className="italic math-sm">
      <mn>10</mn>
      <mo>x</mo>
      <mi>Peso</mi>
      <mo>+</mo>
      <mn>6.25</mn>
      <mo>x</mo>
      <mi>Altura</mi>
      <mo>-</mo>
      <mn>5</mn>
      <mo>x</mo>
      <mi>Idade</mi>
      <mo>+</mo>
      <munder>
        <mi>C1</mi>
        <mo>&#x23DF</mo>
      </munder>
    </math>
      `;
    } catch (e) {
      console.error(
        `Error executing procedure for adding fourth math block:\n${
          (e as Error).message
        }`
      );
    }
    try {
      const mathLastBlock = document.getElementById("mathLastBlock");
      if (!(mathLastBlock instanceof HTMLElement))
        throw elementNotFound(
          mathLastBlock,
          "mathLastBlock",
          extLine(new Error())
        );
      mathLastBlock.innerHTML = `
      <math className="italic math-sm">
      <mi>TMB</mi>
      <mo>x</mo>
      <munder>
        <mi>Fator de Atividade</mi>
        <mo>&#x23DF</mo>
      </munder>
    </math>
      `;
    } catch (e) {
      console.error(
        `Error executing procedure for adding last math block:\n${
          (e as Error).message
        }`
      );
    }
    try {
      const hbFormula = document.getElementById("hbFormula");
      if (!(hbFormula instanceof HTMLElement))
        throw elementNotFound(
          hbFormula,
          `Harris-Benedict formula div`,
          extLine(new Error())
        );
      hbFormula.innerHTML = `
      <math>
        <munder>
          <mn>C1</mn>
          <mo>&#x23DF</mo>
        </munder>
        <mo>+</mo>
        <mi>&#40</mi>
        <munder>
          <mn>C2</mn>
          <mo>&#x23DF</mo>
        </munder>
        <mn>&nbsp;x&nbsp;</mn>
        <mn>Peso</mn>
        <mo>+</mo>
        <munder>
          <mn>C3</mn>
          <mo>&#x23DF</mo>
        </munder>
        <mo>-</mo>
        <mn>Altura</mn>
        <mo>x</mo>
        <mn>Idade</mn>
        <mi>&#41</mi>
      </math>
      `;
    } catch (e) {
      console.error(`Error executing hbFormula:\n${(e as Error).message}`);
    }
  }, []);
  return !state ? (
    <></>
  ) : (
    <dialog
      ref={dlgRef}
      onClick={ev => {
        if (
          isClickOutside(ev, ev.currentTarget).some(coord => coord === true)
        ) {
          ev.currentTarget.close();
          dispatch(!state);
        }
      }}
      className="modal-content-fit defDp wid50v"
      id="tipsDlg"
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
        <section className="odTipsSect" id="fillTips">
          <h4 className="bolded mg-2bv">1. Controle de Entradas</h4>
          <div className="flexNoWC pdL1v">
            <p className="dicas" id="dicaUppercase">
              <strong>1.1. </strong>
              <em>
                As primeiras letras, exceto conjunções, são capitalizadas
                automaticamente por padrão. Outras correções de campos complexos
                podem precisar de mais texto — Continue digitando!
              </em>
            </p>
          </div>
        </section>
        <hr className="noInvert" />
        <section className="odTipsSect" id="mathTips">
          <div>
            <h4 className="bolded mg-2bv noInvert">2. Cálculos</h4>
            <hr className="noInvert" />
            <details>
              <summary className="mg-1b">Siglas</summary>
              <small>
                <ul>
                  <li>
                    <abbr className="noInvert">C: </abbr>
                    <dfn className="noInvert">Constante</dfn>
                  </li>
                  <li>
                    <abbr className="noInvert">IMC: </abbr>
                    <dfn className="noInvert">Índice de Massa Corporal</dfn>
                  </li>
                  <li>
                    <abbr className="noInvert">PGC: </abbr>
                    <dfn className="noInvert">
                      Percentual de Gordura Corporal
                    </dfn>
                  </li>
                  <li>
                    <abbr className="noInvert">MLG: </abbr>
                    <dfn className="noInvert">Massa Livre de Gordura</dfn>
                  </li>
                  <li>
                    <abbr className="noInvert">SDC: </abbr>
                    <dfn className="noInvert">Soma de Dobras Cutâneas</dfn>
                  </li>
                  <li>
                    <abbr className="noInvert">TMB: </abbr>
                    <dfn className="noInvert">Taxa Metabólica Basal</dfn>
                  </li>
                  <li>
                    <abbr className="noInvert">GET: </abbr>
                    <dfn className="noInvert">Gasto Energético Total</dfn>
                  </li>
                </ul>
              </small>
            </details>
          </div>
          <hr />
          <div className="gridAt rGap5v">
            <div className="flexNoWC pdL1v noInvert">
              <span className="dicas" id="dicaIMC">
                <strong>2.1. IMC:</strong>
              </span>
              <br />
              <details>
                <summary>Fórmula</summary>
                <br />
                <div id="mathFirstBlock"></div>
              </details>
            </div>
            <div className="flexNoWC pdL1v noInvert">
              <span className="dicas" id="dicaPGC">
                <strong>2.2. PGC:</strong>
              </span>
              <br />
              <details className="noInvert" id="mathSecondBlock">
                <summary className="noInvert">Fórmula</summary>
                <br />
              </details>
              <br />
              <div>
                <details className="noInvert">
                  <summary className="mg-1b">Constantes</summary>
                  <small>
                    <ul>
                      <li>
                        <p>
                          <em>Homem</em>
                          <span>
                            : 1.10938; 0.0008267; 0.0000016; 0.0002574
                          </span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Mulher</em>
                          <span>
                            : 1.0994921; 0.0009929; 0.0000023; 0.0001392
                          </span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Neutro</em>
                          <span>
                            : 1.10443605; 0.0009098; 0.00000195; 0.0001983
                          </span>
                        </p>
                      </li>
                    </ul>
                  </small>
                </details>
              </div>
            </div>
            <div className="flexNoWC pdL1v">
              <span className="dicas" id="dicaTMB">
                <strong>2.3. TMB:</strong>
              </span>
              <br />
              <div>
                <p>
                  <strong>Harris-Benedict</strong>
                </p>
                <details>
                  <br />
                  <summary>Fórmula</summary>
                  <div id="hbFormula"></div>
                  <br />
                </details>
                <br />
                <details>
                  <summary className="mg-1b">Constantes</summary>
                  <small>
                    <ul>
                      <li>
                        <p>
                          <em>Homem</em>
                          <span>: 13.8; 5.0; 6,8</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Mulher</em>
                          <span>: 9.6; 1.9; 4.7</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Neutro</em>
                          <span>: 11.7; 3.45; 5.75</span>
                        </p>
                      </li>
                    </ul>
                  </small>
                </details>
              </div>
              <br />
              <div>
                <p>
                  <strong>Tinsley</strong>
                </p>
                <details>
                  <br />
                  <summary>Fórmula</summary>
                  <div id="mathThirdBlock"></div>
                  <br />
                </details>
                <br />
                <details>
                  <summary>Constantes</summary>
                  <br />
                  <small>
                    <ul>
                      <li>
                        <p>
                          <span>Fator&nbsp;</span>
                          <em>Peso:</em>
                          <span> 24.8; 10</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Fator&nbsp;</span>
                          <em>MLG:</em>
                          <span> 25.9; 284</span>
                        </p>
                      </li>
                    </ul>
                  </small>
                </details>
              </div>
              <br />
              <div>
                <p>
                  <strong>Mifflin-St. Jeor</strong>
                </p>
                <details>
                  <br />
                  <summary className="mg-1b">Fórmula</summary>
                  <div id="mathFourthBlock"></div>
                  <br />
                </details>
                <br />
                <details>
                  <br />
                  <summary className="mg-1b">Constantes</summary>
                  <div className="noInvert">
                    <small>
                      <ul>
                        <li>
                          <p>
                            <em>Homem</em>
                            <span>: 5</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <em>Mulher</em>
                            <span>: -161</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <em>Neutro</em>
                            <span>: -78</span>
                          </p>
                        </li>
                      </ul>
                    </small>
                  </div>
                  <br />
                </details>
              </div>
            </div>
            <div className="flexNoWC pdL1v noInvert">
              <span className="dicas" id="dicaGET">
                <strong>2.4. GET:</strong>
              </span>
              <br />
              <details>
                <br />
                <summary>Fórmula</summary>
                <div id="mathLastBlock"></div>
                <br />
              </details>
              <br />
              <details>
                <br />
                <summary className="mg-1b">Fatores</summary>
                <div>
                  <small className="noInvert">
                    <ul>
                      <li>
                        <p>
                          <em>Sedentário</em>
                          <span>: 1.2</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Leve</em>
                          <span>: 1.4</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Moderado</em>
                          <span>: 1.6</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Intenso</em>
                          <span>: 1.9</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <em>Muito intenso</em>
                          <span>: 2.2</span>
                        </p>
                      </li>
                    </ul>
                  </small>
                </div>
                <br />
              </details>
            </div>
          </div>
        </section>
      </article>
    </dialog>
  );
}
