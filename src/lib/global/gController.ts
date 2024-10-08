import { entryEl, queryableNode, targEl, voidVal } from "./declarations/types";
import {
  extLine,
  elementNotFound,
  inputNotFound,
  multipleElementsNotFound,
  elementNotPopulated,
} from "./handlers/errorHandler";
import { ExportHandler } from "./declarations/classes";
import {
  autoCapitalizeInputs,
  checkAllGenConts,
  checkAutoCorrect,
  fluxGen,
  numberLimit,
  switchAutocorrect,
} from "./gModel";
import { changeToAstDigit, cpbInpHandler, doubleClickHandler, useCurrentDate } from "./handlers/gHandlers";
export function getGlobalEls(isAutocorrectOn: boolean = true, context: string = "notNum"): boolean {
  setTimeout(() => {
    const textConts = [...document.querySelectorAll("textarea"), ...document.querySelectorAll('input[type="text"]')],
      radioInps = Array.from(document.querySelectorAll('input[type="radio"]')),
      dateBtns = Array.from(document.querySelectorAll('button[id$="DatBtn"]')),
      deactAutocorrectBtns = [
        ...document.querySelectorAll('button[id^="deactAutocorrectBtn"]'),
        ...document.querySelectorAll('input[id^="deactAutocorrectBtn"]'),
      ];
    deactAutocorrectBtns?.length > 0
      ? (isAutocorrectOn = addListenerAutocorrectBtns(deactAutocorrectBtns, isAutocorrectOn))
      : elementNotPopulated(deactAutocorrectBtns, "deactAutoCorrectBtns", extLine(new Error()));
    textConts.length > 0
      ? addListenerTexts(textConts, isAutocorrectOn)
      : elementNotPopulated(textConts, "textConts", extLine(new Error()));
    radioInps.length > 0
      ? addListenerRadios(radioInps, "ed")
      : elementNotPopulated(radioInps, "radioInps", extLine(new Error()));
    dateBtns.length > 0
      ? addListenerDateBtns(dateBtns)
      : elementNotPopulated(dateBtns, "dateBtns", extLine(new Error()));
    if (context === "num") {
      const numInps = Array.from(document.querySelectorAll('input[type="number"]'));
      numInps?.length > 0 ? addListenerNumInps(numInps) : elementNotPopulated(numInps, "numInps", extLine(new Error()));
    }
  }, 500);
  return isAutocorrectOn || true;
}
export function addListenerTexts(textConts: targEl[], isAutocorrectOn: boolean = true): void {
  textConts.forEach(textCont => {
    if (textCont?.classList.contains("autocorrect")) {
      if (
        (textCont instanceof HTMLTextAreaElement ||
          (textCont instanceof HTMLInputElement && textCont.type === "text")) &&
        !(textCont.dataset.active && textCont.dataset.active === "true")
      ) {
        textCont.addEventListener("input", (): void => {
          isAutocorrectOn = checkAutoCorrect(
            document.querySelector('button[id^="deactAutocorrectBtn"]') ||
              document.querySelector('input[id^="deactAutocorrectBtn"]'),
          );
          autoCapitalizeInputs(textCont, isAutocorrectOn);
        });
        textCont.dataset.active = "true";
      } else if (
        !(textCont instanceof HTMLTextAreaElement || (textCont instanceof HTMLInputElement && textCont.type === "text"))
      )
        inputNotFound(
          textCont,
          `target textCont id ${JSON.stringify(textCont?.id || "UNIDENTIFIED TEXTCONT")}`,
          extLine(new Error()),
        );
    }
  });
}
export function addListenerNumInps(numInps: targEl[]): void {
  numInps.forEach(numInp => {
    if (
      numInp instanceof HTMLInputElement &&
      numInp.type === "number" &&
      !(numInp.dataset.active && numInp.dataset.active === "true")
    ) {
      numInp.addEventListener("input", (): void => numberLimit(numInp));
      numInp.dataset.active = "true";
    } else if (!(numInp instanceof HTMLInputElement && numInp.type === "number"))
      inputNotFound(
        numInp,
        `target numInp id ${JSON.stringify(numInp?.id || "UNIDENTIFIED TEXTCONT")}`,
        extLine(new Error()),
      );
  });
}
export function addListenerRadios(radioInps: targEl[], context: string = "od"): void {
  if (context === "od" || context === "ed" || context === "ag") {
    radioInps.forEach(radio => {
      if (
        radio instanceof HTMLInputElement &&
        radio.type === "radio" &&
        !(radio.dataset.active && radio.dataset.active === "true")
      ) {
        radio.addEventListener("dblclick", () => doubleClickHandler(radio));
        if (context === "ed" || context === "ag") {
          radio.addEventListener("change", (change): void => cpbInpHandler(change, radio));
          radio.addEventListener("keydown", (keydown): void => cpbInpHandler(keydown, radio));
        }
        // radio.addEventListener("touchstart", GlobalHandler.touchStartHandler);
        radio.dataset.active = "true";
      } else if (!(radio instanceof HTMLInputElement && radio.type === "radio"))
        inputNotFound(radio, `target radio id ${radio?.id || "UNDEFINED ID RADIO"}`, extLine(new Error()));
    });
  } else console.error(`Error validating context`);
}
export function addListenerDateBtns(dateBtns: targEl[]): void {
  dateBtns.forEach(dateBtn => {
    if (dateBtn instanceof HTMLButtonElement && !(dateBtn.dataset.active && dateBtn.dataset.active === "true")) {
      dateBtn.addEventListener("click", (activation): void => useCurrentDate(activation, dateBtn));
      dateBtn.dataset.active = "true";
    } else if (!(dateBtn instanceof HTMLButtonElement))
      elementNotFound(dateBtn, `target dateBtn id ${dateBtn?.id || "UNDEFINED ID DATEBTN"}`, extLine(new Error()));
  });
}
export function addListenersGenConts(g: targEl, genValue: string = "masculino"): string {
  const gb = document.getElementById("genBirthRelId") as HTMLSelectElement,
    gt = document.getElementById("genTransId") as HTMLSelectElement,
    ga = document.getElementById("genFisAlinId") as HTMLSelectElement;
  if (checkAllGenConts(g, gb, gt, ga) && typeof genValue === "string") {
    const arrGenConts = [g, gb, gt, ga] as HTMLSelectElement[];
    arrGenConts.forEach(genCont => {
      if (!(genCont.dataset.active && genCont.dataset.active === "true")) {
        genCont.addEventListener("change", (): string => {
          genValue = fluxGen({ g: g as HTMLSelectElement, gb, gt, ga }, (g as entryEl)?.value) || "masculino";
          return genValue || "masculino";
        });
        genCont.dataset.active = "true";
      }
    });
  } else multipleElementsNotFound(extLine(new Error()), "gen Elements", g, gb, gt, ga);
  return genValue || "masculino";
}
export function addListenerAutocorrectBtns(deactAutocorrectBtns: targEl[], isAutocorrectOn: boolean = true): boolean {
  deactAutocorrectBtns.forEach(deactAutocorrectBtn => {
    if (
      (deactAutocorrectBtn instanceof HTMLButtonElement ||
        (deactAutocorrectBtn instanceof HTMLInputElement &&
          (deactAutocorrectBtn.type === "checkbox" ||
            deactAutocorrectBtn.type === "radio" ||
            deactAutocorrectBtn.type === "button"))) &&
      !(deactAutocorrectBtn.dataset.active && deactAutocorrectBtn.dataset.active === "true")
    ) {
      deactAutocorrectBtn.addEventListener("click", (click): boolean => {
        isAutocorrectOn = switchAutocorrect(click, deactAutocorrectBtn, isAutocorrectOn);
        return isAutocorrectOn;
      });
      deactAutocorrectBtn.dataset.active = "true";
    } else if (
      !(
        deactAutocorrectBtn instanceof HTMLButtonElement ||
        (deactAutocorrectBtn instanceof HTMLInputElement &&
          (deactAutocorrectBtn.type === "checkbox" ||
            deactAutocorrectBtn.type === "radio" ||
            deactAutocorrectBtn.type === "button"))
      )
    )
      elementNotFound(deactAutocorrectBtn, "Button for deactive autocorrection", extLine(new Error()));
  });
  return isAutocorrectOn || true;
}
export function addListenerAstDigitBtns(astDigtBtns: targEl[]): void {
  astDigtBtns.forEach(astDigtBtn => {
    if (
      astDigtBtn instanceof HTMLButtonElement &&
      !(astDigtBtn.dataset.active && astDigtBtn.dataset.active === "true")
    ) {
      astDigtBtn.addEventListener("click", (): void => changeToAstDigit(astDigtBtn));
      astDigtBtn.dataset.active = "true";
    } else elementNotFound(astDigtBtn, astDigtBtn?.id || "UNDEFINED ID BUTTON", extLine(new Error()));
  });
}
export const exportSignaler = new AbortController();
export function addExportFlags(
  scope: queryableNode | voidVal = document,
  btnExport?: HTMLButtonElement | HTMLInputElement | null,
): targEl {
  btnExport ??=
    ((scope ?? document).querySelector(`[id*="btnExport"]`) as HTMLButtonElement | null) ||
    ((scope ?? document).querySelector(`[name*="btnExport"]`) as HTMLButtonElement | null);
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
      btnExport.dataset.active = "true";
    }
  } else elementNotFound(btnExport, "argument for addExportFlags()", extLine(new Error()));
  return btnExport;
}
export function addResetAstListener(): void {
  try {
    const resetBtn = document.getElementById("resetAstBtn");
    if (!(resetBtn instanceof HTMLButtonElement))
      throw elementNotFound(resetBtn, `Button for reseting signature`, extLine(new Error()));
    if (!(resetBtn.dataset.active && resetBtn.dataset.active === "true")) {
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
      });
      resetBtn.dataset.active = "true";
    }
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
          const { x, y } = getCanvasCoords(e.clientX, e.clientY, canvas);
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
export function getCanvasCoords(
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
): {
  x: number;
  y: number;
} {
  const rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
  return {
    x: (x - rect.left) * (Number.isFinite(scaleX) ? scaleX : canvas.width * 0.5),
    y: (y - rect.top) * (Number.isFinite(scaleY) ? scaleY : canvas.height * 0.5),
  };
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
