import { RootCtxType, DlgProps } from "@/lib/global/declarations/interfaces";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { NlMRef, nlDiv, nlSpan } from "@/lib/global/declarations/types";
import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import { RootCtx } from "@/pages/_app";
import useDialog from "@/lib/hooks/useDialog";
import sT from "@/styles/modules/tipsStyles.module.scss";
const ENTips = memo(({ state, dispatch }: DlgProps): JSX.Element => {
  let divModal: NlMRef<nlSpan | HTMLDivElement> = null;
  const m1 = useRef<nlDiv>(null),
    m2 = useRef<HTMLDetailsElement | null>(null),
    m3 = useRef<nlDiv>(null),
    m4 = useRef<nlDiv>(null),
    m5 = useRef<nlDiv>(null),
    hb = useRef<nlDiv>(null),
    { mainRef } = useDialog({ state, dispatch, param: "tips" }),
    render = useCallback(() => {
      try {
        const mathFirstBlock = m1.current ?? document.getElementById("mathFirstBlock");
        if (mathFirstBlock)
          mathFirstBlock.innerHTML = `
        <math className="italic math-lg">
        <mfrac>
          <mrow>
            <mi>Peso</mi>
          </mrow>
          <msuP>
            <mi>(Altura)</mi>
            <mn>2</mn>
          </msuP>
        </mfrac>
      </math>
        `;
        const mathSecondBlock = m2.current ?? document.getElementById("mathSecondBlock");
        if (mathSecondBlock)
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
              <msuP>
                <mi>SDC</mi>
                <mn>2</mn>
              </msuP>
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
        const mathThirdBlock = m3.current ?? document.getElementById("mathThirdBlock");
        if (mathThirdBlock)
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
        const mathFourthBlock = m4.current ?? document.getElementById("mathFourthBlock");
        if (mathFourthBlock)
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
        const mathLastBlock = m5.current ?? document.getElementById("mathLastBlock");
        if (mathLastBlock)
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
        const hbFormula = hb.current ?? document.getElementById("hbFormula");
        if (hbFormula)
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
        return;
      }
    }, [m1, m2, m3, m4, m5, hb]),
    ctx = useContext<RootCtxType>(RootCtx);
  if (ctx) divModal = ctx.divModal;
  useEffect(render, [render]);
  return createPortal(
    !state ? (
      <></>
    ) : (
      <dialog
        ref={mainRef}
        onClick={ev => {
          if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
            ev.currentTarget.close();
            dispatch(!state);
          }
        }}
        className={`modalContent__fit defDp wid50v ${sT.tipsDlg}`}
        id='tipsDlg'>
        <section className='flexNoW flexAlItCt flexJBt'>
          <h3 className='bolded'>Manual para controle de formulário</h3>
          <button
            className='btn btn-close forceInvert'
            id='tipsClose'
            onClick={ev => {
              dispatch(!state);
              !state && ev.currentTarget.closest("dialog")?.close();
            }}></button>
        </section>
        <hr className='noInvert' />
        <article className='flexNoWC noInvert'>
          <section className='odTipsSect' id='fillTips'>
            <h4 className='bolded mg__2bv'>1. Controle de Entradas</h4>
            <div className='flexNoWC pdL1v'>
              <p className={`${sT.dicas}`} id='dicaUppercase'>
                <strong>1.1. </strong>
                <em>
                  As primeiras letras, exceto conjunções, são capitalizadas automaticamente por padrão. Outras correções
                  de campos complexos podem precisar de mais texto — Continue digitando!
                </em>
              </p>
            </div>
          </section>
          <hr className='noInvert' />
          <section className='odTipsSect' id='mathTips'>
            <div>
              <h4 className='bolded mg__2bv noInvert'>2. Cálculos</h4>
              <hr className='noInvert' />
              <details>
                <summary className='mg__1b'>Siglas</summary>
                <small>
                  <ul>
                    <li>
                      <abbr className='noInvert'>C: </abbr>
                      <dfn className='noInvert'>Constante</dfn>
                    </li>
                    <li>
                      <abbr className='noInvert'>IMC: </abbr>
                      <dfn className='noInvert'>Índice de Massa Corporal</dfn>
                    </li>
                    <li>
                      <abbr className='noInvert'>PGC: </abbr>
                      <dfn className='noInvert'>Percentual de Gordura Corporal</dfn>
                    </li>
                    <li>
                      <abbr className='noInvert'>MLG: </abbr>
                      <dfn className='noInvert'>Massa Livre de Gordura</dfn>
                    </li>
                    <li>
                      <abbr className='noInvert'>SDC: </abbr>
                      <dfn className='noInvert'>Soma de Dobras Cutâneas</dfn>
                    </li>
                    <li>
                      <abbr className='noInvert'>TMB: </abbr>
                      <dfn className='noInvert'>Taxa Metabólica Basal</dfn>
                    </li>
                    <li>
                      <abbr className='noInvert'>GET: </abbr>
                      <dfn className='noInvert'>Gasto Energético Total</dfn>
                    </li>
                  </ul>
                </small>
              </details>
            </div>
            <hr />
            <div className='gridAt rGap5v'>
              <div className='flexNoWC pdL1v noInvert'>
                <span className={`${sT.dicas}`} id='dicaIMC'>
                  <strong>2.1. IMC:</strong>
                </span>
                <br />
                <details>
                  <summary>Fórmula</summary>
                  <br />
                  <div id='mathFirstBlock' ref={m1}></div>
                </details>
              </div>
              <div className='flexNoWC pdL1v noInvert'>
                <span className={`${sT.dicas}`} id='dicaPGC'>
                  <strong>2.2. PGC:</strong>
                </span>
                <br />
                <details className='noInvert' id='mathSecondBlock' ref={m2}>
                  <summary className='noInvert'>Fórmula</summary>
                  <br />
                </details>
                <br />
                <div>
                  <details className='noInvert'>
                    <summary className='mg__1b'>Constantes</summary>
                    <small>
                      <ul>
                        <li>
                          <p>
                            <em>Homem</em>
                            <span>: 1.10938; 0.0008267; 0.0000016; 0.0002574</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <em>Mulher</em>
                            <span>: 1.0994921; 0.0009929; 0.0000023; 0.0001392</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <em>Neutro</em>
                            <span>: 1.10443605; 0.0009098; 0.00000195; 0.0001983</span>
                          </p>
                        </li>
                      </ul>
                    </small>
                  </details>
                </div>
              </div>
              <div className='flexNoWC pdL1v'>
                <span className={`${sT.dicas}`} id='dicaTMB'>
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
                    <div ref={hb} id='hbFormula'></div>
                    <br />
                  </details>
                  <br />
                  <details>
                    <summary className='mg__1b'>Constantes</summary>
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
                    <div ref={m3} id='mathThirdBlock'></div>
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
                    <summary className='mg__1b'>Fórmula</summary>
                    <div ref={m4} id='mathFourthBlock'></div>
                    <br />
                  </details>
                  <br />
                  <details>
                    <br />
                    <summary className='mg__1b'>Constantes</summary>
                    <div className='noInvert'>
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
              <div className='flexNoWC pdL1v noInvert'>
                <span className={`${sT.dicas}`} id='dicaGET'>
                  <strong>2.4. GET:</strong>
                </span>
                <br />
                <details>
                  <br />
                  <summary>Fórmula</summary>
                  <div ref={m5} id='mathLastBlock'></div>
                  <br />
                </details>
                <br />
                <details>
                  <br />
                  <summary className='mg__1b'>Fatores</summary>
                  <div>
                    <small className='noInvert'>
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
    ),
    divModal?.current ?? document.getElementById("divModal") ?? document.body,
  );
});
export default ENTips;
