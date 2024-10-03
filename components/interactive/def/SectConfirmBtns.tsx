"use client";
import { ExportHandler } from "@/lib/global/declarations/classes";
import { nullishBtn } from "@/lib/global/declarations/types";
import { addCanvasListeners, addExportFlags } from "@/lib/global/gController";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { exporters } from "@/vars";
import { useEffect, useRef } from "react";
let exporter: ExportHandler | undefined = undefined;
export default function SectConfirmBtns(): JSX.Element {
  const btnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    exporter = (() => {
      if (/ag/gi.test(location.pathname)) {
        if (!exporters.agExporter) exporters.agExporter = new ExportHandler();
        return exporters.agExporter;
      } else if (/ed/gi.test(location.pathname)) {
        if (!exporters.edExporter) exporters.edExporter = new ExportHandler();
        return exporters.edExporter;
      } else if (/od/gi.test(location.pathname)) {
        if (!exporters.odExporter) exporters.odExporter = new ExportHandler();
        return exporters.odExporter;
      } else return new ExportHandler();
    })();
    const interv = exporter.autoResetTimer(600000),
      path = location.pathname,
      handleUnload = (): void => interv && clearInterval(interv),
      handlePop = (): boolean => {
        if (location.pathname !== path) {
          interv && clearInterval(interv);
          return true;
        }
        return false;
      };
    addEventListener(
      "beforeunload",
      () => {
        handleUnload();
        removeEventListener("beforeunload", handleUnload);
      },
      { once: true },
    );
    addEventListener("popstate", () => {
      handlePop() && removeEventListener("popstate", handlePop);
    });
    addExportFlags(btnRef.current?.closest("form") ?? document);
    (): void => {
      handlePop();
      removeEventListener("popstate", handlePop);
      handleUnload();
      removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <section className='sectionMain sectionConfirm' id='sectConfirmBut'>
      <button
        type='submit'
        name='submitFormButName'
        id='submitFormButId'
        className='confirmBut btn btn-success forceInvert'
        formAction='_self'
        formMethod='POST'
        accessKey='enter'>
        Submeter
      </button>
      <button
        type='button'
        style={{
          background: "linear-gradient(to right, rgba(255, 200, 0, 0.5058823529), rgba(255, 153, 44, 0.6705882353))",
        }}
        className='confirmBut btn btn-warning forceInvert'
        id='resetFormBtn'
        onClick={ev => {
          const res = prompt("Digite CONFIRMAR para resetar o formulário");
          if (res === "CONFIRMAR") {
            try {
              ev.currentTarget.closest("form")?.reset();
              const divConfirm = ev.currentTarget.closest(".divConfirm");
              if (!(divConfirm instanceof HTMLElement))
                throw elementNotFound(divConfirm, `Main ancestral div for resetAstBtn`, extLine(new Error()));
              const astEl = divConfirm.querySelector("#inpAstConfirmId");
              if (!(astEl instanceof HTMLCanvasElement || astEl instanceof HTMLInputElement))
                throw elementNotFound(astEl, `Element for patient signing`, extLine(new Error()));
              if (astEl instanceof HTMLCanvasElement) {
                const replaceCanvas = Object.assign(document.createElement("canvas"), {
                  id: "inpAstConfirmId",
                });
                replaceCanvas.dataset.title = "Assinatura do Paciente";
                astEl.parentElement?.replaceChild(replaceCanvas, astEl);
                addCanvasListeners();
              }
              if (astEl instanceof HTMLInputElement) {
                const replaceInp = Object.assign(
                  Object.assign(document.createElement("input") as HTMLInputElement, {
                    type: "file",
                    id: "inpAstConfirmId",
                    accept: "image/*",
                  }),
                );
                replaceInp.dataset.title = "Assinatura do Paciente";
                replaceInp.classList.add("inpAst", "mg-07t", "form-control");
                astEl.parentElement?.replaceChild(replaceInp, astEl);
              }
            } catch (e2) {
              console.error(`Error handling click on Reset signature button`);
            }
          }
        }}>
        Resetar
      </button>
      <button
        ref={btnRef}
        type='button'
        id='btnExport'
        data-active='false'
        className='btn btn-secondary forceInvert'
        style={{
          backgroundColor: "rgba(0, 0, 255, 0.904)",
          borderColor: "rgba(0, 0, 255, 0.904)",
        }}
        onClick={ev => {
          if (!exporter) {
            exporter = (() => {
              if (/ag/gi.test(location.pathname)) {
                if (!exporters.agExporter) exporters.agExporter = new ExportHandler();
                return exporters.agExporter;
              } else if (/ed/gi.test(location.pathname)) {
                if (!exporters.edExporter) exporters.edExporter = new ExportHandler();
                return exporters.edExporter;
              } else if (/od/gi.test(location.pathname)) {
                if (!exporters.odExporter) exporters.odExporter = new ExportHandler();
                return exporters.odExporter;
              } else return new ExportHandler();
            })();
          }
          exporter.handleExportClick(
            ev,
            (() => {
              if (/ag/gi.test(location.pathname)) return "anamnese";
              else if (/ed/gi.test(location.pathname)) return "educacaoFisica__Nutricao";
              else if (/od/gi.test(location.pathname)) return "odontologia";
              else return "indefinido";
            })(),
            ev.currentTarget.closest("form") ?? document,
            `${localStorage.getItem("name")?.replace(/\s/g, "-") ?? ""}_${
              localStorage.getItem("secondName")?.replace(/\s/g, "-") ?? ""
            }_${localStorage.getItem("lastName")?.replace(/\s/g, "-") ?? ""}`,
          ),
            { signal: new AbortController().signal };
        }}>
        Gerar Planilha
      </button>
    </section>
  );
}
