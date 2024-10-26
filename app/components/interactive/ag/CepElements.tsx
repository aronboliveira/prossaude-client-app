"use client";
import { compProp, formatCEP, parseNotNaN } from "@/lib/global/gModel";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useCallback, useEffect, useRef } from "react";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { enableCEPBtn, searchCEP, searchCEPXML } from "@/lib/locals/aGPage/aGHandlers";
import { toast } from "react-hot-toast";
import { navigatorVars } from "@/vars";
import { looseNum, nlBtn, nlInp } from "@/lib/global/declarations/types";
import sAg from "@/styles/modules/agStyles.module.scss";
export default function CepElements(): JSX.Element {
  const inpRef = useRef<nlInp>(null),
    btnRef = useRef<nlBtn | HTMLInputElement>(null),
    equalizeCepElements = useCallback((): void => {
      try {
        inpRef.current ??= document.getElementById("cepId") as nlInp;
        const cepInp = inpRef.current;
        if (!(cepInp instanceof HTMLInputElement))
          throw inputNotFound(cepInp, `validation of Input for CEP`, extLine(new Error()));
        btnRef.current ??=
          (document.getElementById("autoCompCepBtn") as nlBtn) ||
          (cepInp.nextElementSibling as nlBtn) ||
          (cepInp.parentElement?.querySelector("button") as nlBtn);
        const cepBtn = btnRef.current;
        if (!(cepBtn instanceof HTMLButtonElement || (cepBtn instanceof HTMLInputElement && cepBtn.type === "button")))
          throw elementNotFound(cepBtn, `Validation of Button for CEP`, extLine(new Error()));
        let width: looseNum = `${parseNotNaN(compProp(cepInp, "width"))}`;
        width = parseNotNaN(width);
        if (!Number.isFinite(width) && width <= 0) return;
        width = width.toFixed(4);
        cepBtn.style.maxWidth = `${width}px`;
      } catch (e) {
        console.error(`Error executing equalizeCepElements:\n${(e as Error).message}`);
      }
    }, [inpRef, btnRef]);
  useEffect(() => {
    equalizeCepElements();
    addEventListener("resize", equalizeCepElements);
    return (): void => removeEventListener("resize", equalizeCepElements);
  }, [equalizeCepElements]);
  return (
    <label htmlFor='cepId' className={`labelIdentif noInvert flexWC ${sAg.cepIdLab}`}>
      CEP:
      <input
        ref={inpRef}
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
      <button ref={btnRef as any} type='button' id='autoCompCepBtn' className='btn btn-secondary' disabled>
        Preencher com CEP
      </button>
      <div className='min20H' id='divProgCEP' style={{ height: "1rem" }} role='separator'></div>
      <div className='min20H customBlValidityWarn' id='divCEPWarn' style={{ height: "1.6rem" }} role='separator'></div>
    </label>
  );
}
