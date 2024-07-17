import { fluxGen } from "@/lib/global/gModel";
import {
  elementNotFound,
  extLine,
  inputNotFound,
} from "@/lib/global/handlers/errorHandler";
import { person } from "@/pages/edfis";

export default function GenDiv({
  flux = false,
}: {
  flux?: boolean;
}): JSX.Element {
  return (
    <div className="gridTwoCol noInvert" id="genDiv" role="group">
      <span
        role="group"
        className="fsAnamGSpan flexAlItCt genSpan"
        id="spanFsAnamG13"
      >
        <label htmlFor="genId" className="labelIdentif">
          Gênero:
          <select
            name="gen"
            id="genId"
            className="form-select inpIdentif noInvert"
            data-title="genero"
            required
            onChange={ev => {
              if (flux === true) {
                const genBirthRel = document.getElementById("genBirthRelId");
                const genTrans = document.getElementById("genTransId");
                const genFisAlin = document.getElementById("genFisAlinId");
                const textBodytype = document.getElementById("textBodytype");
                try {
                  if (
                    !(
                      genBirthRel instanceof HTMLSelectElement ||
                      genBirthRel instanceof HTMLInputElement
                    )
                  )
                    throw elementNotFound(
                      genBirthRel,
                      `Gen Birth Relation Element`,
                      extLine(new Error())
                    );
                  if (
                    !(
                      genTrans instanceof HTMLSelectElement ||
                      genTrans instanceof HTMLInputElement
                    )
                  )
                    throw elementNotFound(
                      genTrans,
                      `Gen Trans Element`,
                      extLine(new Error())
                    );
                  if (
                    !(
                      genFisAlin instanceof HTMLSelectElement ||
                      genFisAlin instanceof HTMLInputElement
                    )
                  )
                    throw elementNotFound(
                      genFisAlin,
                      `Gen Physical Alignment Element`,
                      extLine(new Error())
                    );
                  person.gen =
                    fluxGen(
                      [ev.currentTarget, genBirthRel, genTrans, genFisAlin],
                      ev.currentTarget.value
                    ) || "masculino";
                  if (
                    (genTrans.value !== "avancado" ||
                      ev.currentTarget.value === "naoBinario") &&
                    genTrans.hidden === false &&
                    genFisAlin.hidden === false
                  ) {
                    textBodytype instanceof HTMLInputElement ||
                    textBodytype instanceof HTMLSelectElement
                      ? (textBodytype.value = person.gen)
                      : inputNotFound(
                          textBodytype,
                          "textBodyType in callback for gender Elements",
                          extLine(new Error())
                        );
                  }
                } catch (e) {
                  console.error(
                    `Error executing callback for Gen Elements:\n${
                      (e as Error).message
                    }`
                  );
                }
              }
            }}
          >
            <option className="optIdentif optGen" value="masculino">
              Masculino | Homem binário
            </option>
            <option className="optIdentif optGen" value="feminino">
              Feminino | Mulher binária
            </option>
            <option className="optIdentif optGen" value="naoBinario">
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
            name="gen_birth_rel"
            id="genBirthRelId"
            className="form-select inpIdentif noInvert"
            data-title="identidade_genero_nascenca"
            required
          >
            <option className="optIdentif optgenBirthRel" value="cis">
              Cisgênero | Cissexual
            </option>
            <option className="optIdentif optgenBirthRel" value="trans">
              Transgênero | Transsexual
            </option>
            <option className="optIdentif optgenBirthRel" value="outros">
              Outros
            </option>
            <option className="optIdentif optgenBirthRel" value="undefined">
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
      >
        <label htmlFor="genTransId" className="labelIdentif">
          Estágio da Transição Hormonal:
          <select
            name="gen_trans"
            id="genTransId"
            className="form-select inpIdentif noInvert"
            data-title="stg_transicao_hormonal"
          >
            <option className="optIdentif optgenTrans" value="avancado">
              Avançado
            </option>
            <option className="optIdentif optgenTrans" value="undefined">
              Indefinido
            </option>
            <option className="optIdentif optgenTrans" value="no">
              Não está em transição
            </option>
            <option className="optIdentif optgenTrans" value="inicial">
              Inicial
            </option>
            <option className="optIdentif optgenTrans" value="intermediario">
              Intermediário
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
            name="gen_fis_alin"
            id="genFisAlinId"
            className="form-select inpIdentif noInvert"
            data-title="corpo_align"
          >
            <option className="optIdentif optgenFisAlin" value="masculinizado">
              Masculinizado
            </option>
            <option className="optIdentif optgenFisAlin" value="feminilizado">
              Feminilizado
            </option>
            <option className="optIdentif optgenFisAlin" value="neutro">
              Indeterminado | Neutro
            </option>
          </select>
        </label>
        <br role="presentation" />
      </span>
    </div>
  );
}
