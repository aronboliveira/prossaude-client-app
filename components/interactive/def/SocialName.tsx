import { handleCondtReq } from "@/lib/global/handlers/gHandlers";

export default function SocialName(): JSX.Element {
  return (
    <span role="group" className="fsAnamGSpan flexAlItCt col" id="fsAnamGSpan4">
      <label htmlFor="socialNameId" className="labelIdentif">
        Nome Social:
        <input
          type="text"
          name="social_name"
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
  );
}
