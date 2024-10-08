import * as OdHandler from "./odHandler";
import * as OdModel from "./odModel";
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM

import { extLine, elementNotFound, inputNotFound, elementNotPopulated } from "../../global/handlers/errorHandler";
export function addListenerInspRadios(): Element[] {
  const inspRadios = [...document.querySelectorAll(".radYes"), ...document.querySelectorAll(".radNo")];
  if (inspRadios?.length > 0) {
    inspRadios.forEach(inspRadio => {
      inspRadio instanceof HTMLInputElement && (inspRadio.type === "radio" || inspRadio.type === "checkbox")
        ? inspRadio.addEventListener("click", OdHandler.showInspSpanSub)
        : inputNotFound(inspRadio, `${inspRadio?.id || "UNDEFINED INSPRADIO INPUT"}`, extLine(new Error()));
    });
  } else elementNotPopulated(inspRadios, "inspRadio", extLine(new Error()));
  return inspRadios;
}
export function addListenerInspDialogBtns(isDialogCalled: boolean = false): [boolean, Element[]] {
  const inspDialogsBtns = document.querySelectorAll('button[id^="inspDialogBtn"]');
  if (inspDialogsBtns?.length > 0) {
    inspDialogsBtns.forEach(inspDialogBtn => {
      inspDialogBtn instanceof HTMLButtonElement
        ? inspDialogBtn.addEventListener("click", (click): boolean => {
            isDialogCalled = OdHandler.showInspDialogs(click, isDialogCalled);
            return isDialogCalled || false;
          })
        : elementNotFound(inspDialogBtn, `${inspDialogBtn?.id || "UNDEFINED ID DIALOG BUTTON"}`, extLine(new Error()));
    });
  } else elementNotPopulated(inspDialogsBtns, "inspDialogsBtns", extLine(new Error()));
  return [isDialogCalled || false, Array.from(inspDialogsBtns)];
}
export function addListenerInspLIBtns(): Element[] {
  const inspLIBtns = document.querySelectorAll('button[id^="inspLIBtn"]');
  if (inspLIBtns?.length > 0) {
    inspLIBtns.forEach(inspLIBtn => {
      inspLIBtn instanceof HTMLButtonElement
        ? inspLIBtn.addEventListener("click", OdHandler.addTextToObs)
        : elementNotFound(inspLIBtn, `${inspLIBtn?.id || "UNDEFINED ID LI BUTTON"}`, extLine(new Error()));
    });
  } else elementNotPopulated(inspLIBtns, "inspLIBtns", extLine(new Error()));
  return Array.from(inspLIBtns);
}
export function addListenerQuadrsTe(): Element[] {
  const quadrsTe = Array.from(document.getElementsByClassName("quadrMainDiv"));
  if (quadrsTe?.length > 0) {
    quadrsTe.forEach(quadrTo => {
      if (quadrTo instanceof HTMLElement) {
        quadrTo.addEventListener("mousemove", () => OdHandler.dragHover(quadrTo));
        quadrTo.addEventListener("dragstart", dragstart => OdHandler.dragStart(dragstart, quadrsTe));
        quadrTo.addEventListener("touchstart", touchstart => OdHandler.dragStart(touchstart, quadrsTe));
        quadrTo.addEventListener("dragenter", OdHandler.dragEnter);
        quadrTo.addEventListener("dragover", OdHandler.dragOver);
        quadrTo.addEventListener("dragleave", OdHandler.dragLeave);
        quadrTo.addEventListener("dragend", () => OdHandler.dragEnd(quadrTo));
        quadrTo.addEventListener("touchend", () => OdHandler.dragEnd(quadrTo));
      } else elementNotFound(quadrTo, `${quadrTo?.id ?? "UNDEFINED QUADRANT ID"}`, extLine(new Error()));
    });
  } else elementNotPopulated(quadrsTe, "quadrsDents in odController", extLine(new Error()));
  return quadrsTe;
}
export function addListenerAvElemenDents(isValuePreDef: boolean = false): [boolean, Element[]] {
  const avElemDentsArray = Array.from(document.getElementsByClassName("inpAvDent"));
  if (avElemDentsArray?.length > 0) {
    avElemDentsArray.forEach(avElemDent => {
      avElemDent instanceof HTMLButtonElement ||
      avElemDent instanceof HTMLSelectElement ||
      avElemDent instanceof HTMLInputElement
        ? avElemDent?.addEventListener("click", (): boolean => {
            isValuePreDef = OdModel.resetAvDentValue(avElemDent);
            return isValuePreDef || false;
          })
        : elementNotFound(avElemDent, `${avElemDent?.id ?? "UNDEFINED ID ELEMENT"}`, extLine(new Error()));
    });
  } else elementNotPopulated(avElemDentsArray, "avElemDentsArray", extLine(new Error()));
  return [isValuePreDef || false, avElemDentsArray];
}
export function addListenerQuadrInps(): Element[] {
  const quadrInps = document.querySelectorAll('input[id^="inpD"]');
  if (quadrInps?.length > 0) {
    quadrInps.forEach(quadrInp => {
      quadrInp instanceof HTMLInputElement
        ? quadrInp.addEventListener("click", () => OdHandler.clearQuadrInps(quadrInp))
        : inputNotFound(quadrInp, `${quadrInp?.id ?? "UNDEFINED QUADRANT INPUT ID"}`, extLine(new Error()));
    });
  } else elementNotPopulated(quadrInps, "quadrInps", extLine(new Error()));
  return Array.from(quadrInps);
}
export function addListenerResetDivsQuadrs(): Element[] {
  const resetDivsQuadrs = document.querySelectorAll(".resetBut");
  if (resetDivsQuadrs?.length > 0) {
    resetDivsQuadrs.forEach(resetBtn => {
      resetBtn instanceof HTMLButtonElement
        ? resetBtn.addEventListener("click", () => {
            OdHandler.resetLabels(resetBtn);
          })
        : elementNotFound(resetBtn, `${resetBtn?.id ?? "UNDEFINED ID RESET BUTTON"}`, extLine(new Error()));
    });
  } else elementNotPopulated(resetDivsQuadrs, "resetDivsQaudrs", extLine(new Error()));
  return Array.from(resetDivsQuadrs);
}
export function addListenersSubDivsQuadrs(): Element[] {
  const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
  document.addEventListener("DOMContentLoaded", () => {
    if (subDivsQuadrs?.length > 0) {
      subDivsQuadrs.forEach(subDiv => {
        subDiv instanceof HTMLElement
          ? OdModel.orderLabels(subDiv)
          : elementNotFound(subDiv, "subDiv in odController", extLine(new Error()));
      });
    } else elementNotPopulated(subDivsQuadrs, "subDivsQuadrs", extLine(new Error()));
  });
  return Array.from(subDivsQuadrs);
}
export function addListenerTratContainer(blockCount: number = 1): [number, Element[]] {
  const tratBtns = document.querySelectorAll(".countTrat");
  if (tratBtns?.length > 0) {
    tratBtns.forEach(tratBtn => {
      tratBtn.addEventListener("click", (click): number => {
        tratBtn instanceof HTMLButtonElement
          ? (blockCount = OdHandler.addSubDivTrat(click, tratBtn, blockCount))
          : elementNotFound(tratBtn, "tratContainer", extLine(new Error()));
        return blockCount;
      });
    });
  } else elementNotPopulated(tratBtns, "tratBtns", extLine(new Error()));
  return [blockCount, Array.from(tratBtns)];
}
