import { entryEl, targEl, voidVal } from "./declarations/types";
import * as GlobalHandler from "./handlers/gHandlers";
import * as GlobalModel from "./gModel";
import {
  extLine,
  elementNotFound,
  inputNotFound,
  multipleElementsNotFound,
  elementNotPopulated,
} from "./handlers/errorHandler";
import { ExportHandler } from "./declarations/classes";
export function getGlobalEls(isAutocorrectOn: boolean = true, context: string = "notNum"): boolean {
  const textConts = [...document.querySelectorAll("textarea"), ...document.querySelectorAll('input[type="text"]')],
    radioInps = Array.from(document.querySelectorAll('input[type="radio"]')),
    dateBtns = Array.from(document.querySelectorAll('button[id$="DatBtn"]')),
    deactAutocorrectBtns = [
      ...document.querySelectorAll('button[id^="deactAutocorrectBtn"]'),
      ...document.querySelectorAll('input[id^="deactAutocorrectBtn"]'),
    ];
  textConts?.length > 0
    ? addListenerTexts(textConts, isAutocorrectOn)
    : elementNotPopulated(textConts, "textConts", extLine(new Error()));
  radioInps?.length > 0
    ? addListenerRadios(radioInps, "ed")
    : elementNotPopulated(radioInps, "radioInps", extLine(new Error()));
  dateBtns?.length > 0
    ? addListenerDateBtns(dateBtns)
    : elementNotPopulated(dateBtns, "dateBtns", extLine(new Error()));
  if (context === "num") {
    const numInps = Array.from(document.querySelectorAll('input[type="number"]'));
    numInps?.length > 0 ? addListenerNumInps(numInps) : elementNotPopulated(numInps, "numInps", extLine(new Error()));
  }
  deactAutocorrectBtns?.length > 0
    ? (isAutocorrectOn = addListenerAutocorrectBtns(deactAutocorrectBtns, isAutocorrectOn))
    : elementNotPopulated(deactAutocorrectBtns, "deactAutoCorrectBtns", extLine(new Error()));
  return isAutocorrectOn || true;
}
export function addListenerTexts(textConts: targEl[], isAutocorrectOn: boolean = true): void {
  if (textConts.every(el => el instanceof HTMLElement)) {
    textConts.forEach(textCont => {
      if (textCont?.classList.contains("autocorrect")) {
        textCont instanceof HTMLTextAreaElement || (textCont instanceof HTMLInputElement && textCont.type === "text")
          ? textCont.addEventListener("input", (): void => {
              isAutocorrectOn = GlobalModel.checkAutoCorrect(
                document.querySelector('button[id^="deactAutocorrectBtn"]') ||
                  document.querySelector('input[id^="deactAutocorrectBtn"]'),
              );
              GlobalModel.autoCapitalizeInputs(textCont, isAutocorrectOn);
            })
          : inputNotFound(
              textCont,
              `target textCont id ${JSON.stringify(textCont?.id || "UNIDENTIFIED TEXTCONT")}`,
              extLine(new Error()),
            );
      }
    });
  } else console.error(`Erro validando instâncias em textConts`);
}
export function addListenerNumInps(numInps: targEl[]): void {
  if (numInps.every(el => el instanceof HTMLElement)) {
    numInps.forEach(numInp => {
      numInp instanceof HTMLInputElement && numInp.type === "number"
        ? numInp.addEventListener("input", (): void => {
            GlobalModel.numberLimit(numInp);
          })
        : inputNotFound(
            numInp,
            `target numInp id ${JSON.stringify(numInp?.id || "UNIDENTIFIED TEXTCONT")}`,
            extLine(new Error()),
          );
    });
  } else console.error(`Erro validando instâncias em numInps`);
}
export function addListenerRadios(radioInps: targEl[], context: string = "od"): void {
  if (radioInps.every(el => el instanceof HTMLElement) && (context === "od" || context === "ed" || context === "ag")) {
    radioInps.forEach(radio => {
      if (radio instanceof HTMLInputElement && radio.type === "radio") {
        radio.addEventListener("dblclick", () => GlobalHandler.doubleClickHandler(radio));
        if (context === "ed" || context === "ag") {
          radio.addEventListener("change", (change): void => GlobalHandler.cpbInpHandler(change, radio));
          radio.addEventListener("keydown", (keydown): void => GlobalHandler.cpbInpHandler(keydown, radio));
          context === "ag" &&
            radio.addEventListener("change", (): void =>
              GlobalHandler.deactTextInput(
                document.querySelectorAll('input[type="number"][id$=NumId]'),
                document.querySelectorAll("input[id$=NullId]"),
              ),
            );
        }
        // radio.addEventListener("touchstart", GlobalHandler.touchStartHandler);
      } else inputNotFound(radio, `target radio id ${radio?.id || "UNDEFINED ID RADIO"}`, extLine(new Error()));
    });
  } else console.error(`Erro validando instâncias em radioInps`);
}
export function addListenerDateBtns(dateBtns: targEl[]): void {
  if (dateBtns.every(el => el instanceof HTMLElement)) {
    dateBtns.forEach(dateBtn => {
      dateBtn instanceof HTMLButtonElement
        ? dateBtn.addEventListener("click", (activation): void => {
            GlobalHandler.useCurrentDate(activation, dateBtn);
          })
        : elementNotFound(dateBtn, `target dateBtn id ${dateBtn?.id || "UNDEFINED ID DATEBTN"}`, extLine(new Error()));
    });
  } else console.error(`Erro validando instâncias em dateBtns`);
}
export function addListenersGenConts(genElement: targEl, genValue: string = "masculino"): string {
  const genBirthRel = document.getElementById("genBirthRelId"),
    genTrans = document.getElementById("genTransId"),
    genFisAlin = document.getElementById("genFisAlinId");
  if (GlobalModel.checkAllGenConts(genElement, genBirthRel, genTrans, genFisAlin) && typeof genValue === "string") {
    const arrGenConts = [genElement, genBirthRel, genTrans, genFisAlin] as entryEl[];
    arrGenConts.forEach(genCont => {
      genCont.addEventListener("change", (): string => {
        genValue = GlobalModel.fluxGen(arrGenConts, (genElement as entryEl)?.value) || "masculino";
        return genValue || "masculino";
      });
    });
  } else multipleElementsNotFound(extLine(new Error()), "gen Elements", genElement, genBirthRel, genTrans, genFisAlin);
  return genValue || "masculino";
}
export function addListenerAutocorrectBtns(deactAutocorrectBtns: targEl[], isAutocorrectOn: boolean = true): boolean {
  if (deactAutocorrectBtns.every(el => el instanceof HTMLElement)) {
    deactAutocorrectBtns.forEach(deactAutocorrectBtn => {
      deactAutocorrectBtn instanceof HTMLButtonElement ||
      (deactAutocorrectBtn instanceof HTMLInputElement &&
        (deactAutocorrectBtn.type === "checkbox" || deactAutocorrectBtn.type === "radio"))
        ? deactAutocorrectBtn.addEventListener("click", (click): boolean => {
            isAutocorrectOn = GlobalModel.switchAutocorrect(click, deactAutocorrectBtn, isAutocorrectOn);
            return isAutocorrectOn;
          })
        : elementNotPopulated(
            deactAutocorrectBtns,
            `target deactAutocorrectBtn id ${deactAutocorrectBtn?.id || "UNDEFINED ID BUTTON"}`,
            extLine(new Error()),
          );
    });
  } else console.error(`Erro validando instâncias em deactAutocorrectBtns`);
  return isAutocorrectOn || true;
}
export function addListenerAstDigitBtns(astDigtBtns: targEl[]): void {
  if (astDigtBtns.every(el => el instanceof HTMLElement)) {
    astDigtBtns.forEach(astDigtBtn => {
      astDigtBtn instanceof HTMLButtonElement
        ? astDigtBtn.addEventListener("click", (): void => {
            GlobalHandler.changeToAstDigit(astDigtBtn);
          })
        : elementNotFound(astDigtBtn, astDigtBtn?.id || "UNDEFINED ID BUTTON", extLine(new Error()));
    });
  } else console.error(`Erro validando instâncias em astDigtBtns`);
}
export const exportSignaler = new AbortController();
export function addListenerExportBtn(
  context: string = "undefined",
  scope: Document | Element | voidVal = document,
  namer?: HTMLElement | string | voidVal,
): targEl {
  const btnExport =
    (scope ?? document).querySelector(`[id*="btnExport"]`) || (scope ?? document).querySelector(`[name*="btnExport"]`);
  Array.from((scope ?? document).querySelectorAll("button")).filter(
    btn => /btnexport/gi.test(btn.id) || /exportbtn/gi.test(btn.id),
  )[0];
  if (
    btnExport instanceof HTMLButtonElement ||
    (btnExport instanceof HTMLInputElement && (btnExport.type === "radio" || btnExport.type === "checkbox"))
  ) {
    const exporter = new ExportHandler(),
      interv = exporter.autoResetTimer(600000),
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
    if (!btnExport.dataset.active || btnExport.dataset.active !== "true") {
      btnExport.addEventListener("click", ev => exporter.handleExportClick(ev as MouseEvent, context, scope, namer), {
        signal: exportSignaler.signal,
      });
      btnExport.dataset.active = "true";
    }
  } else elementNotFound(btnExport, "argument for addListenerExportBtn()", extLine(new Error()));
  return btnExport;
}
export function addResetAstListener(): void {
  try {
    const resetBtn = document.getElementById("resetAstBtn");
    if (!(resetBtn instanceof HTMLButtonElement))
      throw elementNotFound(resetBtn, `Button for reseting signature`, extLine(new Error()));
    resetBtn.addEventListener("click", () => {
      try {
        const divConfirm = resetBtn.closest(".divConfirm");
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
          astEl.parentElement!.replaceChild(replaceCanvas, astEl);
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
          astEl.parentElement!.replaceChild(replaceInp, astEl);
        }
      } catch (e2) {
        console.error(`Error handling click on Reset signature button`);
      }
    });
  } catch (e) {
    console.error(`Error executing addResetAstListener:
    ${(e as Error).message}`);
  }
}
export function addCustomSbListeners(container: targEl, content: targEl): void {
  try {
    if (!(container instanceof HTMLElement))
      throw elementNotFound(container, `Main Element for addCustomSbListeners()`, extLine(new Error()));
    if (!(content instanceof HTMLElement))
      throw elementNotFound(content, `Content Element for addCustomSbListeners()`, extLine(new Error()));
    const updateThumb = (): void => {
        const percentage = container.clientHeight / content.scrollHeight,
          thumbHeight = percentage * container.clientHeight;
        thumb.style.height = `${thumbHeight}px`;
      },
      onMouseMove = (e: MouseEvent): void => {
        if (!isScrolling) return;
        const deltaY = e.clientY - startY,
          percentage = deltaY / container.clientHeight;
        container.scrollTop = percentage * (content.scrollHeight - container.clientHeight);
      },
      onMouseUp = (): void => {
        isScrolling = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      },
      scrollbar = document.createElement("div") as HTMLDivElement,
      thumb = document.createElement("div") as HTMLDivElement;
    let isScrolling = false,
      startY = 0;
    updateThumb();
    scrollbar.classList.add("scrollbar");
    container.appendChild(scrollbar);
    thumb.classList.add("scroll-thumb");
    scrollbar.appendChild(thumb);
    addEventListener("resize", updateThumb);
    thumb.addEventListener("mousedown", e => {
      isScrolling = true;
      startY = e.clientY - thumb.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  } catch (e) {
    console.error(`Error executing addCustomSbListeners():
    ${(e as Error).message}`);
  }
}
let isDrawing = false;
export function addCanvasListeners(): void {
  try {
    const canvas = document.getElementById("inpAstConfirmId");
    if (!(canvas instanceof HTMLCanvasElement))
      throw elementNotFound(canvas, `Canvas for executing addCanvasListeners()`, extLine(new Error()));
    canvas.width = innerWidth / 3.5;
    addEventListener("resize", () => {
      canvas.width = innerWidth / 3.5;
    });
    canvas.height = 80;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error(`Error validating canvas context:
      Obtained value: ${ctx ?? "nullish"}`);
    ctx.fillRect(10, canvas.height - 10, canvas.width - 20, 1.5);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#222";
    const startDrawing = (e: MouseEvent | Touch): void => {
        isDrawing = true;
        draw(e);
      },
      draw = (e: MouseEvent | Touch): void => {
        try {
          if (!(ctx instanceof CanvasRenderingContext2D))
            throw new Error(`Error getting Canvas Context:
          Obtained Value: ${ctx ?? "nullish"}`);
          if (!isDrawing) return;
          const rect = canvas.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
        } catch (e) {
          console.error(`Error executing draw():
        ${(e as Error).message}`);
        }
      };
    const stopDrawing = (): void => {
      isDrawing = false;
      ctx?.beginPath();
    };
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("touchstart", e => startDrawing(e.touches[0]), { passive: true });
    canvas.addEventListener("mousemove", draw, { capture: true });
    canvas.addEventListener(
      "touchmove",
      e => {
        draw(e.touches[0]);
      },
      { passive: true },
    );
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    canvas.addEventListener("touchend", stopDrawing);
  } catch (e) {
    console.error(`Error executing addCanvasListteners:
    ${(e as Error).message}`);
  }
}
export function watchLabels(): void {
  setTimeout(() => {
    try {
      document.querySelectorAll("label").forEach(label => {
        label.dataset[`watched`] = "true";
        let relInp: targEl = label.querySelector("input") ?? label.querySelector("textarea");
        if (!(relInp instanceof HTMLInputElement || relInp instanceof HTMLTextAreaElement))
          relInp = label.nextElementSibling;
        if (!(relInp instanceof HTMLInputElement || relInp instanceof HTMLTextAreaElement))
          relInp = label.previousElementSibling;
        if (!label.parentElement) return;
        if (!(relInp instanceof HTMLInputElement || relInp instanceof HTMLTextAreaElement))
          relInp = label.parentElement.querySelector("input") ?? label.parentElement.querySelector("textarea");
        if (!relInp) return;
        if (relInp.id === "" && label.htmlFor === "") {
          const labelNum = document.querySelectorAll("label").length;
          relInp.id = `filledInput${labelNum}`;
        }
        if (label.htmlFor !== relInp.id) label.htmlFor = relInp.id;
      });
    } catch (e) {
      console.error(`Error executing interval for watchLabels:\n${(e as Error).message}`);
    }
  }, 3000);
}
