"use client";
import { formatCEP } from "@/lib/global/gModel";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useEffect } from "react";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { enableCEPBtn, searchCEP, searchCEPXML } from "@/lib/locals/aGPage/aGHandlers";
import { toast } from "react-hot-toast";
import { navigatorVars } from "@/vars";
export default function CepElements(): JSX.Element {
  const equalizeCepElements = (): void => {
    try {
      const cepInp = document.getElementById("cepId");
      if (!(cepInp instanceof HTMLInputElement))
        throw inputNotFound(cepInp, `validation of Input for CEP`, extLine(new Error()));
      const cepBtn =
        document.getElementById("autoCompCepBtn") ||
        cepInp.nextElementSibling ||
        cepInp.parentElement?.querySelector("button");
      if (!(cepBtn instanceof HTMLButtonElement || (cepBtn instanceof HTMLInputElement && cepBtn.type === "button")))
        throw elementNotFound(cepBtn, `Validation of Button for CEP`, extLine(new Error()));
      cepBtn.style.width = `${
        getComputedStyle(cepInp).width + getComputedStyle(cepInp).paddingLeft + getComputedStyle(cepInp).paddingRight
      }px`;
      cepBtn.style.maxWidth = `${
        getComputedStyle(cepInp).width + getComputedStyle(cepInp).paddingLeft + getComputedStyle(cepInp).paddingRight
      }px`;
    } catch (e) {
      console.error(`Error executing equalizeCepElements:\n${(e as Error).message}`);
    }
  };
  useEffect(() => {
    equalizeCepElements();
    addEventListener("resize", equalizeCepElements);
    return (): void => removeEventListener("resize", equalizeCepElements);
  }, []);
  return (
    <label htmlFor='cepId' className='labelIdentif noInvert flexWC'>
      CEP:
      <input
        type='text'
        name='cep'
        id='cepId'
        className='form-control inpIdentif noInvert minText maxText patternText'
        minLength={3}
        maxLength={11}
        data-xls='CEP'
        data-title='cep'
        data-reqlength='3'
        data-maxlength='11'
        data-pattern='^\d{2}[\s.-]?\d{3}[\s.-]?\d{2,3}$'
        required
        onInput={ev => {
          const cepElementBtn = document.getElementById("autoCompCepBtn");
          formatCEP(ev.currentTarget);
          handleEventReq(ev.currentTarget);
          if (!enableCEPBtn(cepElementBtn, ev.currentTarget.value.length)) return;
          toast.promise(
            searchCEP(ev.currentTarget).then(res => {
              if (res === "fail") return searchCEPXML(ev.currentTarget);
              return res;
            }),
            {
              loading: navigatorVars.pt ? "Pesquisando CEP..." : "Searching CEP...",
              success: () => (navigatorVars.pt ? "Sucesso carregando os dados!" : "Success on loading data!"),
              error: err =>
                navigatorVars.pt
                  ? `Erro obtendo dados para o CEP: Código ${err?.status || "indefinido"}`
                  : `Failed to retrieve CEP information: Code ${err?.status || "undefined"}`,
            },
          );
          setTimeout(() => toast.dismiss(), 4000);
        }}
      />
      <button type='button' id='autoCompCepBtn' className='btn btn-secondary' disabled>
        Preencher com CEP
      </button>
      <div className='min20H' id='divProgCEP' style={{ height: "1rem" }} role='separator'></div>
      <div className='min20H customBlValidityWarn' id='divCEPWarn' style={{ height: "1.6rem" }} role='separator'></div>
    </label>
  );
}
