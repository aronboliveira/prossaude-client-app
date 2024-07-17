import { validateForm } from "@/lib/global/handlers/gHandlers";

export default function SectConfirmBtns(): JSX.Element {
  return (
    <section className="sectionMain sectionConfirm" id="sectConfirmBut">
      <button
        type="submit"
        name="submitFormButName"
        id="submitFormButId"
        className="confirmBut btn btn-success forceInvert"
        formAction="_self"
        formMethod="POST"
        accessKey="enter"
        onClick={ev =>
          validateForm(ev.currentTarget).then(
            validation => !validation[0] && ev.preventDefault()
          )
        }
      >
        Submeter
      </button>
      <button
        type="reset"
        className="confirmBut btn btn-warning forceInvert"
        id="resetFormBtn"
      >
        Resetar
      </button>
      <button
        type="button"
        id="btnExport"
        className="btn btn-secondary forceInvert"
        style={{
          backgroundColor: "rgba(0, 0, 255, 0.904)",
          borderColor: "rgba(0, 0, 255, 0.904)",
        }}
      >
        Gerar Planilha
      </button>
    </section>
  );
}
