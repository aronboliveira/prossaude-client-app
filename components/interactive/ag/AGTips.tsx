"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
import { isClickOutside } from "@/lib/global/gStyleScript";
import useDialog from "@/lib/hooks/useDialog";
export default function AGTips({ state, dispatch }: DlgProps): JSX.Element {
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
          onClick={(ev): void => {
            dispatch(!state);
            !state && ev.currentTarget.closest("dialog")?.close();
          }}></button>
      </div>
      <hr />
      <article className='flexNoWC noInvert'>
        <section className='tipsSect' id='fillTips'>
          <h4 className='bolded mg-2bv'>1. Controle de Entradas</h4>
          <div className='flexNoWC'>
            <p className='dicas' id='dicaKb' style={{ textAlign: "justify" }}>
              <strong>1.1.</strong>
              <em>
                {" "}
                Apertar Alt + Y para &quot;Sim&quot; ou Alt + N para &quot;Não&quot; no próximo campo após iniciar o
                foco com Tab para preencher automaticamente
              </em>
            </p>
            <p className='dicas' id='dicaUppercase' style={{ textAlign: "justify" }}>
              <strong>1.2. </strong>
              <em>
                As primeiras letras, exceto conjunções, são capitalizadas automaticamente por padrão. Outras correções
                de campos complexos podem precisar de mais texto — Continue digitando!
              </em>
            </p>
          </div>
        </section>
        <section className='tipsSect' id='genderSect'>
          <h4 className='bolded'>2. Definições de Gênero</h4>
          <p
            style={{
              textAlign: "justify",
              paddingLeft: "0.03rem",
            }}>
            <dfn>
              <strong>Gênero: </strong>
            </dfn>
            <em>
              refere-se à identificação da pessoa quanto a <strong>papéis sociais</strong> associados primariamente (na
              nascença) ao sexo biológico.
              <br />
              <br />
              Biologicamente, indivíduos possuem um genótipo resultante da combinação dos alossomos (crossomos X e Y),
              que possuem o padrão XY: macho; XX: fêmea; no entanto, muitas outras variações genotípicas são possíveis,
              ainda que raras.
              <br />
              <br />
              Se os alossomos adicionais são reprimidos (como nos interessexuais genéticos), em geral não causam
              manifestações físicas; a sua ativação expressiva, porém, em geral resulta em interssexuais físicos e/ou
              indivíduos com síndromes diversas. As condições em que apenas um ou nenhum alossomos são expressivos
              também desencadeiam em síndromes, muitas vezes fatais.
              <br />
              <br />É importante salientar que a única definição confiável para a biologia de macho ou fêmea é somente o{" "}
              <strong>tipo de gameta</strong> e, consequentemente, a genitália em animais;
              <br />
              <br />
              Todas as demais características (e.g.: variações ósseas e adiposas) são consideradas secundárias e podem
              ou não se manifestar.
              <br />
              <br />O fenótipo físico resultante da expressão genética pode ou não ser aceito psicologicamente pelo
              indivíduo no seu processo de desenvolvimento e socialização. O caso de rejeição é conhecido como{" "}
              <strong>
                <dfn>Disforia</dfn>
              </strong>
              .
              <br />
              <br />
              Indivíduos que adotam o papel social previsto pelo padrão normativo ao sexo biológico de nascença são
              denominados de
              <strong>
                <dfn> Cissexuais/Cisgênero </dfn>
              </strong>{" "}
              (abreviação: <abbr>cis</abbr>); Indivíduos que rejeitam o papel social previsto pelo padrão normativo ao
              seu sexo biológio de nascença se enquadram em pessoas
              <strong>
                <dfn> Transsexuais/Transgênero </dfn>
              </strong>{" "}
              (abreviação: <abbr>trans</abbr>). É crucial entender que nem todos os indivíduos Transsexuais apresentam
              disforia genital, mas possivelmente somente física em algum nível.
              <br />
              <br />
              No caso de <dfn>pessoas trans</dfn>, o indivíduo se identifica, ao menos predominantemente, com o papel
              previsto ao sexo biológico oposto ao de sua nascença (e.g.: machos biológicos que não se identificam com o
              papel de homem, mas de mulher);
              <br />
              <br />
              No segundo caso (
              <strong>
                <dfn>não-binário</dfn>
              </strong>
              ), o indivíduo não se identifica totalmente com nenhum dos dois papéis, se vendo em um
              &quot;meio-termo&quot;, e diversas denominações são usadas para as possíveis combinações.
              <br />
              <br />É comum a adoção de{" "}
              <em>
                <strong>pronomes alternativos</strong>
              </em>{" "}
              para o tratamento pessoal de indivíduos não-binários.
              <br />
              <br />A combinação de transsexualidade e não-binaridade ocorre em pessoas que se identificam
              predominantemente com o papel oposto ao seu sexo biológico de nascença, mas não o suficiente para que se
              vejam como <strong>pessoas binárias</strong> (<dfn>somente homem ou somente mulher</dfn>).
            </em>
          </p>
        </section>
      </article>
    </dialog>
  );
}
