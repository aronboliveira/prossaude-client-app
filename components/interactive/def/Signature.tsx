import { changeToAstDigit } from "@/lib/global/handlers/gHandlers";

export default function Signature(): JSX.Element {
  return (
    <div className="divSub divConfirm flexEl" id="divConfirm3" role="group">
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
          onClick={ev => changeToAstDigit(ev.currentTarget)}
        >
          Usar Assinatura Digital
        </button>
        <button type="button" className="btn btn-secondary" id="resetAstBtn">
          Resetar
        </button>
      </span>
    </div>
  );
}
