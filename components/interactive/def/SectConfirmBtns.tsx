"use client";

import { addCanvasListeners } from "@/lib/global/gController";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
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
        onClick={ev => {
          try {
            const divConfirm = ev.currentTarget.closest(".divConfirm");
            if (!(divConfirm instanceof HTMLElement))
              throw elementNotFound(
                divConfirm,
                `Main ancestral div for resetAstBtn`,
                extLine(new Error())
              );
            const astEl = divConfirm.querySelector("#inpAstConfirmId");
            if (
              !(
                astEl instanceof HTMLCanvasElement ||
                astEl instanceof HTMLInputElement
              )
            )
              throw elementNotFound(
                astEl,
                `Element for patient signing`,
                extLine(new Error())
              );
            if (astEl instanceof HTMLCanvasElement) {
              const replaceCanvas = Object.assign(
                document.createElement("canvas"),
                {
                  id: "inpAstConfirmId",
                }
              );
              replaceCanvas.dataset.title = "Assinatura do Paciente";
              astEl.parentElement!.replaceChild(replaceCanvas, astEl);
              addCanvasListeners();
            }
            if (astEl instanceof HTMLInputElement) {
              const replaceInp = Object.assign(
                Object.assign(document.createElement("input"), {
                  type: "file",
                  id: "inpAstConfirmId",
                  accept: "image/*",
                })
              );
              replaceInp.dataset.title = "Assinatura do Paciente";
              replaceInp.classList.add("inpAst", "mg-07t", "form-control");
              astEl.parentElement!.replaceChild(replaceInp, astEl);
            }
          } catch (e2) {
            console.error(`Error handling click on Reset signature button`);
          }
        }}
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
