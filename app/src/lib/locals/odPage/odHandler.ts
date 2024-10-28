import { autoCapitalizeInputs, checkAutoCorrect } from "../../global/gModel";
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout

import {
  searchNextSiblings,
  searchPreviousSiblings,
  searchParents,
  useCurrentDate,
  changeToAstDigit,
  syncAriaStates,
} from "../../global/handlers/gHandlers";
import { rDragEvent, rMouseEvent, targEl, textEl } from "../../global/declarations/types";
export function showInspSpanSub(ev: rMouseEvent): void {
  try {
    if (
      !(
        ev.currentTarget instanceof HTMLInputElement &&
        (ev.currentTarget.type === "radio" || ev.currentTarget.type === "checkbox")
      )
    )
      return;
    const validSibling = searchNextSiblings(ev.currentTarget, "inspSpanSub");
    if (ev.currentTarget?.parentElement?.classList.contains("inspSpanMain") && validSibling) {
      if (ev.currentTarget.classList.contains("radYes"))
        ev.currentTarget.checked && validSibling.removeAttribute("hidden");
      else if (ev.currentTarget.classList.contains("radNo") && ev.currentTarget.checked)
        validSibling.setAttribute("hidden", "");
    }
  } catch (e) {
    return;
  }
}
export function showInspDialogs(click: rMouseEvent, isDialogCalled: boolean = false): boolean {
  try {
    if (!(click.currentTarget instanceof HTMLButtonElement)) return isDialogCalled;
    const calledDialog =
      click.currentTarget.nextElementSibling || click.currentTarget.parentElement?.querySelector("dialog");
    if (calledDialog instanceof HTMLDialogElement) {
      if (!isDialogCalled) {
        calledDialog.show();
        click.currentTarget.textContent = "Esconder Sugestões";
      } else {
        calledDialog.close();
        click.currentTarget.textContent = "Mostrar Sugestões";
      }
    }
  } catch (e) {
    return isDialogCalled;
  }
  return isDialogCalled;
}
export function addTextToObs(click: rMouseEvent): void {
  try {
    if (!(click.currentTarget instanceof HTMLButtonElement)) return;
    const fixedTextParent = click.currentTarget.parentElement?.innerText?.slice(0, -9) ?? "";
    const validParent = searchParents(click.currentTarget, "inspDialog");
    const validParentSibling = searchPreviousSiblings(validParent, "inspTa");
    if (!(validParentSibling instanceof HTMLTextAreaElement || validParentSibling instanceof HTMLInputElement)) return;
    //textContent é cumulativo persistente, mesmo após remoção de conteúdo em input/ta, logo usar .value
    validParentSibling.value?.length === 0
      ? (validParentSibling.value += fixedTextParent)
      : (validParentSibling.value += fixedTextParent?.toLowerCase());
  } catch (e) {
    return;
  }
}
export function dragHover(quadrTo: targEl): void {
  if (quadrTo instanceof HTMLElement) {
    setTimeout(() => {
      quadrTo.style.cursor = "grabbing";
      setTimeout(() => {
        if (quadrTo?.style.cursor === "grabbing") quadrTo.style.cursor = "grab";
      }, 2000);
    }, 2000);
  }
}
let odIsDragging = false,
  odFbTouch: Touch,
  odInitialX = 0,
  odInitialY = 0,
  odOffsetX = 0,
  odOffsetY = 0;
export function dragStart(
  move: DragEvent | TouchEvent | React.DragEvent | React.TouchEvent,
  quadrsTe: Element[],
): void {
  try {
    let validSrcEl =
      move instanceof TouchEvent
        ? Array.from(move.touches).find(touch => {
            if (touch.target instanceof HTMLElement && touch.target.classList.contains("quadrMainDiv"))
              return touch.target;
          })
        : move.currentTarget;
    if (validSrcEl instanceof HTMLElement) {
      const contInQuadrs = document.querySelectorAll(".contInQuadrs");
      if (move instanceof DragEvent || "dataTransfer" in move) {
        move.dataTransfer?.setData("text/plain", "");
        contInQuadrs.forEach(contInQuadr => contInQuadr.setAttribute("draggable", "true"));
        const dropHandler = (drop: Event): void => {
          const quadrsTe = Array.from(document.getElementsByClassName("quadrMainDiv"));
          dragDrop(drop, validSrcEl as Element, quadrsTe, dropHandler);
        };
        quadrsTe.forEach(quadrTo => quadrTo.addEventListener("drop", dropHandler));
      } else if (move instanceof TouchEvent || "touches" in move) {
        const handleTouchDrag = (ev: TouchEvent): void => {
          if (!odIsDragging) return;
          ev.preventDefault();
          const touch = ev.targetTouches[0];
          odOffsetX = touch.clientX - odInitialX;
          odOffsetY = touch.clientY - odInitialY;
          (validSrcEl as HTMLElement).style.transform = `translate(${odOffsetX}px, ${odOffsetY}px)`;
        };
        validSrcEl.addEventListener("touchstart", ev => {
          odIsDragging = true;
          odFbTouch = Array.from(ev.touches).find(
            touch => touch.target instanceof HTMLElement && touch.target.classList.contains("appointmentBtn"),
          ) as any;
          if (!(odFbTouch instanceof Touch)) odFbTouch = ev.touches[0];
          if (odFbTouch) {
            const touch = odFbTouch;
            odInitialX = touch.clientX - odOffsetX;
            odInitialY = touch.clientY - odOffsetY;
            (validSrcEl as HTMLElement).style.position = "absolute";
            (validSrcEl as HTMLElement).style.zIndex = "100";
          }
          const handleTouchEnd = (end: TouchEvent): void => {
            if (odIsDragging) {
              try {
                const targ = odFbTouch;
                if (!(targ instanceof Touch)) throw new Error(`Failed to fetch touch target`);
                const validTargEl = Array.from(end.targetTouches).find(
                  touch => touch instanceof HTMLElement && touch.classList.contains("quadrAvDent"),
                );
                if (
                  validSrcEl instanceof HTMLElement &&
                  validTargEl instanceof HTMLElement &&
                  validTargEl.classList.contains("quadrAvDent")
                ) {
                  const targCSt = window.getComputedStyle(validTargEl); //captura estilos do target na área de drop
                  const targCStCol = targCSt.getPropertyValue("grid-column");
                  const targCStRow = targCSt.getPropertyValue("grid-row");
                  const srcCSt = window.getComputedStyle(validSrcEl); //captura estilos da source
                  const srcCStCol = srcCSt.getPropertyValue("grid-column");
                  const srcCStRow = srcCSt.getPropertyValue("grid-row");
                  //faz a inversão
                  validSrcEl.style.setProperty("grid-column", targCStCol);
                  validSrcEl.style.setProperty("grid-row", targCStRow);
                  validTargEl.style.setProperty("grid-column", srcCStCol);
                  validTargEl.style.setProperty("grid-row", srcCStRow);
                  (validSrcEl as HTMLElement).style.position = "static";
                  (validSrcEl as HTMLElement).style.zIndex = "10";
                  (validSrcEl as HTMLElement).style.transform = `translate(0, 0)`;
                }
              } catch (e) {
                odIsDragging = false;
                return;
              }
              odIsDragging = false;
            }
            document.removeEventListener("touchmove", handleTouchDrag);
            document.removeEventListener("touchend", handleTouchEnd);
          };
          document.addEventListener("touchend", handleTouchEnd, { once: true });
        });
        document.addEventListener("touchmove", handleTouchDrag, {
          passive: false,
        });
      }
    }
  } catch (e) {
    return;
  }
}
export function dragEnter(move: rDragEvent): void {
  if ("dataTransfer" in move && move.target instanceof HTMLElement) move.preventDefault();
}
export function dragOver(move: rDragEvent): void {
  if ("dataTransfer" in move && move.target instanceof HTMLElement) move.preventDefault();
}
export function dragLeave(move: rDragEvent): void {
  if ("dataTransfer" in move && move.target instanceof HTMLElement) move.preventDefault();
}
export function dragDrop(
  drop: Event,
  srcEl: targEl,
  quadrsTe: Element[],
  dropHandler: (drop: DragEvent) => void,
): void {
  let validSrcEl = srcEl || (drop.target as HTMLElement);
  let validTargEl = drop.currentTarget;
  while (validTargEl instanceof HTMLElement && !validTargEl.classList.contains("quadrAvDent")) {
    validTargEl = validTargEl.parentElement;
    if (validTargEl instanceof HTMLDivElement && validTargEl.classList.contains("quadrAvDent")) break;
  }
  if (
    validSrcEl instanceof HTMLElement &&
    validTargEl instanceof HTMLElement &&
    validTargEl.classList.contains("quadrAvDent")
  ) {
    const targCSt = window.getComputedStyle(validTargEl); //captura estilos do target na área de drop
    const targCStCol = targCSt.getPropertyValue("grid-column");
    const targCStRow = targCSt.getPropertyValue("grid-row");
    const srcCSt = window.getComputedStyle(validSrcEl); //captura estilos da source
    const srcCStCol = srcCSt.getPropertyValue("grid-column");
    const srcCStRow = srcCSt.getPropertyValue("grid-row");
    //faz a inversão
    validSrcEl.style.setProperty("grid-column", targCStCol);
    validSrcEl.style.setProperty("grid-row", targCStRow);
    validTargEl.style.setProperty("grid-column", srcCStCol);
    validTargEl.style.setProperty("grid-row", srcCStRow);
  }
  quadrsTe.forEach(
    quadrTo =>
      drop instanceof DragEvent &&
      //@ts-ignore
      quadrTo.removeEventListener("drop", dropHandler),
  );
  dragEnd(validSrcEl);
}
export function dragEnd(movingSrcEl: targEl): void {
  const contInQuadrs = document.querySelectorAll(".contInQuadrs");
  if (movingSrcEl instanceof HTMLElement) dragEndChilds(contInQuadrs);
}
export function dragStartChilds(contInQuadrs: Element[] | NodeListOf<Element>): void {
  contInQuadrs.forEach(contInQuadr => contInQuadr.setAttribute("draggable", "true"));
}
export function dragEndChilds(contInQuadrs: Element[] | NodeListOf<Element>): void {
  contInQuadrs.forEach(contInQuadr => {
    contInQuadr.setAttribute("draggable", "false");
  });
}
export function clearQuadrInps(quadrInp: targEl): void {
  if (
    quadrInp instanceof HTMLInputElement ||
    quadrInp instanceof HTMLTextAreaElement ||
    quadrInp instanceof HTMLSelectElement
  ) {
    if (quadrInp.nextElementSibling) {
      const dlOptionsValues: string[] = [];
      Array.from(quadrInp.nextElementSibling.children).forEach(dlOp => {
        dlOp instanceof HTMLOptionElement && dlOptionsValues.push(dlOp.value);
      });
      if (dlOptionsValues.includes(quadrInp.value)) {
        quadrInp.value = "";
        if (quadrInp instanceof HTMLInputElement || quadrInp instanceof HTMLTextAreaElement)
          quadrInp.placeholder = "Apagado";
      }
    }
  }
}
export function resetLabels(quadrBtn: targEl): void {
  const parentDiv = quadrBtn?.closest(".quadrMainDiv");
  const innerDivInps = parentDiv?.querySelectorAll("input[id^=inpD]");
  if (quadrBtn instanceof HTMLButtonElement && parentDiv && innerDivInps && innerDivInps?.length > 0) {
    if (!(innerDivInps.length < 8))
      innerDivInps.forEach(innerDivInp => {
        if (innerDivInp instanceof HTMLInputElement) innerDivInp.value = "Hígido";
      });
  }
}
export function addSubDivTrat(click: Event | React.MouseEvent, addSubDivBtn: targEl, blockCount: number = 1): number {
  if (click.currentTarget === addSubDivBtn && addSubDivBtn instanceof HTMLButtonElement) {
    if (addSubDivBtn.classList.contains("addTrat")) {
      const newBlock = document.createElement("tr");
      newBlock.className = "divSub divSubTrat";
      newBlock.id = `divSubTrat${blockCount}`;
      newBlock.innerHTML = `
          <tr class="divSub divSubTrat" id="divSubTrat${blockCount}">
          <th class="spanMain tratMainSpan tratNumSpan noInvert" id="tratNumSpan${blockCount}"> 
            ${blockCount}&#41
          </td>
          <td class="spanMain tratMainSpan tratTypeSpan" id="tratTypeSpan${blockCount}">
            <textarea name="trat_${
              blockCount - 1
            }" id="taTratId${blockCount}" class="inlinebTa taTrat" data-title="Tratamento ${blockCount}" required></textarea>
          </td>
          <td class="spanMain tratMainSpan tratDateSpan" id="tratDateSpan${blockCount}">
              <input type="date" name="date_${
                blockCount - 1
              }" id="tratDateInpId${blockCount}" class="inpDate inpTrat tratDate maxCurrDate" data-title="Data do Tratamento ${blockCount}" required />
              <button type="button" class="tratBtn datBtn btn btn-secondary forceInvert" id="trat2DatBtn">Usar data atual</button>
          </td>
          <td class="spanMain tratMainSpan tratFileSpan" id="tratFileSpan${blockCount}">
            <input type="text" name="sig_${blockCount - 1}" id="inpAstTratId${blockCount}"
            class="inpTrat inpAst tratAst form-control" data-title="Assinatura do Tratamento ${blockCount}" />
            <button type="button" class="tratBtn astDigtBtn confirmBtn btn btn-secondary forceInvert" 
            id="trat${blockCount}AstDigtBtn" class="tratBtn confirmBtn btn btn-secondary">Usar Assinatura Digital</button>
          </td>
        </tr>
        `;
      document.getElementById("tratContainer")?.appendChild(newBlock);
      newBlock.querySelectorAll(".datBtn")?.forEach(dateBtn => {
        dateBtn.addEventListener("click", activation => useCurrentDate(activation, dateBtn as HTMLButtonElement));
      });
      newBlock.querySelectorAll(".countTrat")?.forEach(tratBtn => {
        tratBtn.addEventListener(
          "click",
          click => tratBtn instanceof HTMLButtonElement && addSubDivTrat(click, tratBtn, blockCount),
        );
      });
      [...newBlock.querySelectorAll('input[type="text"]'), ...newBlock.querySelectorAll("textarea")].forEach(
        textCont => {
          textCont.addEventListener("input", () =>
            autoCapitalizeInputs(
              textCont as textEl,
              checkAutoCorrect(document.querySelector('button[id^="deactAutocorrectBtn"]')),
            ),
          );
        },
      );
      newBlock.querySelectorAll('button[id$="AstDigtBtn')?.forEach(astDigtBtn => {
        astDigtBtn.addEventListener("click", ev => changeToAstDigit(ev.currentTarget as HTMLButtonElement));
      });
      if (document.querySelector(`divSubTrat${blockCount}`)) {
        syncAriaStates([
          ...document.querySelector(`divSubTrat${blockCount}`)!.querySelectorAll("*"),
          document.querySelector(`divSubTrat${blockCount}`)!,
        ]);
      }
    } else if (addSubDivBtn.classList.contains("removeTrat")) {
      const divToRemove = Array.from(document.querySelectorAll(".divSubTrat")).at(-1);
      if (divToRemove && blockCount > 1 && divToRemove?.id !== "divSubTrat1") divToRemove.remove() as void;
    }
  }
  return blockCount;
}
