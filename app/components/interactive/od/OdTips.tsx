"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
import { isClickOutside } from "@/lib/global/gStyleScript";
import useDialog from "@/lib/hooks/useDialog";
export default function OdTips({ state, dispatch }: DlgProps): JSX.Element {
  const { mainRef } = useDialog({ state, dispatch, param: "tips" });
  return !state ? (
    <></>
  ) : (
    <dialog
      className='modal-content-fit defDp wid50v'
      id='tipsDlg'
      ref={mainRef}
      onClick={ev => {
        if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
          ev.currentTarget.close();
          dispatch(!state);
        }
      }}>
      <div className='flexNoW flexAlItCt flexJBt'>
        <h3 className='bolded'>Manual para controle de formulário</h3>
        <button
          className='btn btn-close forceInvert'
          id='tipsClose'
          onClick={ev => {
            dispatch(!state);
            !state && ev.currentTarget.closest("dialog")?.close();
          }}></button>
      </div>
      <hr />
      <article className='flexNoWC noInvert'>
        <section className='odTipsSect' id='fillTips'>
          <h4 className='bolded mg-2bv'>1. Controle de Entradas</h4>
          <div className='flexNoWC pdL1v'>
            <p className='dicas' id='dicaKb'>
              <strong>1.1.</strong>
              <em>
                Apertar Alt + Y para &quot;Sim&quot; ou Alt + N para &quot;Não&quot; no próximo campo após iniciar o
                foco com Tab para preencher automaticamente
              </em>
            </p>
            <p className='dicas' id='dicaUppercase'>
              <strong>1.2.</strong>
              <em>
                As primeiras letras, exceto conjunções, são capitalizadas automaticamente por padrão. Outras correções
                de campos complexos podem precisar de mais texto — Continue digitando!
              </em>
            </p>
          </div>
        </section>
        <section className='odTipsSect' id='quadrTips'>
          <h4 className='bolded mg-2bv'>2. Controle de Quadrantes</h4>
          <div className='flexNoWC pdL1v'>
            <p className='dicas' id='dicaDrag'>
              <strong>2.1.</strong>
              <em>Arrastar as caixas dos quadrantes irá reorganizá-las</em>
            </p>
            <p className='dicas' id='dicaDrag'>
              <strong className='noInvert'>2.2.</strong>
              <em className='noInvert'>Clicar nos valores pré-definidos dos quadrantes irá apagá-los</em>
            </p>
            <p className='dicas' id='dicaDatalist'>
              <strong>2.3.</strong>
              <em>Clicar em campos vazios nos quadrantes irá fornecer uma lista de valores padrão para seleção</em>
            </p>
          </div>
        </section>
      </article>
    </dialog>
  );
}
