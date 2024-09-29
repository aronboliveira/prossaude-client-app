"use client";
import {
  handleCondtReq,
  handleEventReq,
} from "@/lib/global/handlers/gHandlers";
export default function Name(): JSX.Element {
  return (
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
            name="first_name"
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
        <label htmlFor="additionalNameId" className="labelIdentif">
          Sobrenome(s) do Meio, se presente(s):
          <input
            type="text"
            name="additional_name"
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
            name="family_name"
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
  );
}
