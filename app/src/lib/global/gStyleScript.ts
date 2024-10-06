import { parseNotNaN } from "./gModel";
import { targEl, entryEl } from "./declarations/types";
import {
  extLine,
  elementNotFound,
  elementNotPopulated,
  multipleElementsNotFound,
  inputNotFound,
} from "./handlers/errorHandler";
export function dinamicGridAdjust(gridDivs: Array<targEl>): void {
  if (gridDivs?.length > 0 && gridDivs.every(div => div instanceof HTMLElement)) {
    gridDivs.forEach(gridDiv => {
      if (gridDiv instanceof HTMLElement && !gridDiv.classList.contains("noEqualize")) {
        switch (getComputedStyle(gridDiv).display) {
          case "grid":
            const nColumns = (gridDiv.style.gridTemplateColumns || getComputedStyle(gridDiv).gridTemplateColumns)
              .trim()
              .split(/\s+/g).length;
            !isFinite(nColumns) && nColumns > 0
              ? (gridDiv.style.width = (25 * (nColumns + 1)).toFixed(1) + "vw")
              : console.warn(`nColumns returned as NaN or not a natural number. Value obtained: ${nColumns}`);
            break;
          case "flex":
            switch (gridDiv.style.flexDirection) {
              case "row":
                gridDiv.style.width = "60%";
                break;
              case "row-reverse":
                gridDiv.style.width = "60%";
                break;
              case "column":
                gridDiv.style.width = "90%";
                break;
              case "column-reverse":
                gridDiv.style.width = "90%";
                break;
              default:
                gridDiv.style.width = "70%";
            }
            break;
          default:
            gridDiv.style.width = "70%";
        }
      } else elementNotFound(gridDiv, `gridDiv id ${gridDiv?.id || "UNIDENTIFIED"}`, extLine(new Error()));
    });
  } else elementNotPopulated(gridDivs, "gridDivs in dinamicGridAjust()", extLine(new Error()));
}
export function equalizeFlexSibilings(
  flexEls: Array<targEl> | NodeListOf<Element>,
  contexts: Array<Array<string>> = [["width", "px"]],
): void {
  if (flexEls.length > 0) {
    flexEls.forEach(el => {
      if (
        el instanceof HTMLElement &&
        getComputedStyle(el).display === "flex" &&
        el.classList.toString().match(/flexTwin/g) &&
        el.previousElementSibling instanceof HTMLElement
      ) {
        const elChildren = Array.from(el.children);
        Array.from(el.previousElementSibling.children)
          .filter(child => child instanceof HTMLInputElement && (child.type === "checkbox" || child.type === "radio"))
          .forEach((previousChild, i) => {
            if (elChildren[i] instanceof HTMLElement) {
              contexts.forEach(context => {
                (elChildren[i] as HTMLElement).style[context[0] as any] = el
                  .previousElementSibling!.getBoundingClientRect()
                  .width.toString();
                (elChildren[i] as HTMLElement).style[
                  `min${(context[0] as string).slice(0, 1).toUpperCase()}${context[0].slice(1)}` as any
                ] = getComputedStyle(el.previousElementSibling!).width.toString();
                const previousChildRect = previousChild.getBoundingClientRect();
                if (el.classList.contains(`flexTwin-${context[0]}`) && context[0] in previousChildRect) {
                  (elChildren[i] as any).style.width = `${(previousChildRect as any)[context[0]].toFixed(4)}${
                    context[1]
                  }`;
                  (elChildren[i] as any).style.minWidth = `${(previousChildRect as any)[context[0]].toFixed(4)}${
                    context[1]
                  }`;
                } else
                  console.warn(`Error validating objects for Geometry:
                flexTwin type applied: el.classList.contains(flexTwin-${context[0]});
                ${context[0]} in elChildren${i}, id ${elChildren[i]?.id || "UNIDENTIFIED"}: ${
                    context[0] in elChildren[i]
                  };
                ${context[0]} in previousChildRect, id ${previousChild ?? "UNIDENTIFIED"}: ${
                    context[0] in previousChildRect
                  }.`);
              });
            } else
              console.warn(`Error validating instance of child in index ${i}:
          Obtained instance: ${Object.prototype.toString.call(el.children[i]).slice(8, -1)}`);
          });
      } else
        console.warn(`Error calling equalizeFlexSibilings() for Element id ${el?.id}:
        Instance of current Element: ${el instanceof HTMLElement}
        Instance of previousElementSibling: ${Object.prototype.toString.call(el?.previousElementSibling).slice(8, -1)};
        Match as flexTwin: ${/flexTwin/gi.test(el?.classList?.toString() ?? "")}
        Display value: ${getComputedStyle(el!)?.display}.`);
    });
  }
}
export function equalizeTabCells(tab: HTMLTableElement | null): void {
  if (tab instanceof HTMLTableElement) {
    const parentEl = tab.closest("section") || tab.closest("dialog") || tab.closest("form");
    if (parentEl instanceof HTMLElement) {
      const relatedTabs = parentEl.querySelectorAll("table");
      const largestTabWid = Math.max(
        ...(Array.from(relatedTabs) ?? []).map(cel => {
          let relTab = parseFloat(getComputedStyle(cel).width);
          if (Number.isNaN(relTab) || Math.abs(relTab) === Infinity || relTab < 0) relTab = 0;
          return relTab;
        }),
      )?.toString();
      for (const relTab of relatedTabs) {
        relTab.style.minWidth = largestTabWid;
        relTab.style.width = largestTabWid;
      }
      const tabCells = [...parentEl.querySelectorAll("td"), ...parentEl.querySelectorAll("th")];
      if (tabCells.length > 0 && tabCells.every(cel => cel instanceof HTMLElement)) {
        const largestCellWid = Math.max(
          ...tabCells.map(cel => {
            let widCell = parseFloat(getComputedStyle(cel).width);
            const tabCells = [
              ...parentEl.querySelectorAll("td"),
              ...parentEl.querySelectorAll("th"),
              ...parentEl.querySelectorAll("tr"),
              ...parentEl.querySelectorAll("tbody"),
              ...parentEl.querySelectorAll("thead"),
              ...parentEl.querySelectorAll("tfoot"),
              ...parentEl.querySelectorAll("caption"),
            ];
            if (tabCells.length > 0 && tabCells.every(cel => cel instanceof HTMLElement)) {
              const largestCellWid = Math.max(
                ...tabCells.map(cel => {
                  let widCell = parseFloat(getComputedStyle(cel).width);
                  if (Number.isNaN(widCell) || Math.abs(widCell) === Infinity || widCell < 0) widCell = 0;
                  return widCell;
                }),
              );
              for (const cel of tabCells) {
                Object.assign(cel.style, {
                  minWidth: "15ch",
                  width: `${
                    parseFloat(largestCellWid.toFixed(1)) /
                    parseFloat(window.getComputedStyle(document.querySelector("html")!).fontSize)
                  }rem`,
                  height: "fit-content",
                  verticalAlign: "text-top",
                });
              }
            } else elementNotPopulated(tabCells, "tabCells in equalizeTabCells()", extLine(new Error()));
            if (Number.isNaN(widCell) || Math.abs(widCell) === Infinity || widCell < 0) widCell = 0;
            return widCell;
          }),
        );
        for (const cel of tabCells) {
          Object.assign(cel.style, {
            minWidth: "15ch",
            width: largestCellWid.toString(),
            height: "max-content",
            verticalAlign: "text-top",
          });
        }
      } else elementNotPopulated(tabCells, "tabCells in equalizeTabCells()", extLine(new Error()));
    } else elementNotFound(parentEl, `parentEl for tab id ${tab?.id || "UNIDENTIFIED"}`, extLine(new Error()));
  } else
    elementNotFound(tab, `tab id ${(tab as any)?.id || "UNIDENTIFIED in equalizeTabCells()"}`, extLine(new Error()));
}
export function isClickOutside(event: MouseEvent | React.MouseEvent, dlgInBtn: Element): boolean[] {
  try {
    if (!document.querySelector(`#${dlgInBtn.id}` || "dialog"))
      throw new Error(`Modal for outside click not in screen anymore.`);
    const rect = dlgInBtn.getBoundingClientRect();
    const { clientX, clientY } = event;
    return [clientX < rect.left, clientX > rect.right, clientY < rect.top, clientY > rect.bottom];
  } catch (e) {
    console.error(`Error executing isClickOutside:\n${(e as Error).message}`);
    return [false, false, false, false];
  }
}
export function fadeElement(el: targEl, opacity: string = "1", timer: string = "0.5", timeout: number = 500): void {
  if (el instanceof HTMLElement) {
    el.style.opacity = opacity;
    setTimeout(() => {
      el.style.transition = `opacity ${timer}s ease-in`;
    }, timeout);
  } else elementNotFound(el, `element ${el?.id || "UNDEFINED ELEMENT"}`, extLine(new Error()));
}
export function highlightChange(el: targEl, color: string = "red", context: string = "both"): void {
  if (el instanceof HTMLElement && typeof color === "string") {
    const iniColor = "rgb(222, 226, 230)";
    const iniFontColor = "rgb(33, 37, 41)";
    const pulseBColor = (el: HTMLElement): void => {
      setTimeout(() => {
        el.style.borderColor = color;
        setTimeout(() => {
          el.style.transition = "border-color 0.5s ease-in";
          setTimeout(() => {
            el.style.borderColor = iniColor;
            setTimeout(() => {
              el.style.transition = "border-color 0.5s ease-in";
            }, 500);
          }, 250);
        }, 500);
      }, 250);
    };
    const pulseFColor = (el: HTMLElement): void => {
      setTimeout(() => {
        el.style.color = color;
        setTimeout(() => {
          el.style.transition = "color 0.5s ease-in";
          setTimeout(() => {
            el.style.color = iniFontColor;
            setTimeout(() => {
              el.style.transition = "color 0.5s ease-in";
            }, 500);
          }, 250);
        }, 500);
      }, 250);
    };

    if (context === "both" || context === "border") {
      pulseBColor(el);
      setTimeout(() => {
        pulseBColor(el);
      }, 1600);
    }
    if (context === "both" || context === "font") {
      // if (el )
      pulseFColor(el);
      setTimeout(() => {
        pulseFColor(el);
      }, 1600);
    }
  } else multipleElementsNotFound(extLine(new Error()), "arguments for highlightChange()", el, color);
}
export function switchBtnBS(
  bsBtns: Array<targEl>,
  bsClasses: Array<string> = ["btn-warning"],
  bsClassesToRemove: Array<string> = ["btn-success"],
): void {
  if (Array.isArray(bsBtns) && bsBtns.every(btn => btn instanceof HTMLElement)) {
    bsBtns.forEach(bsBtn => {
      if (bsBtn instanceof HTMLButtonElement) {
        fadeElement(bsBtn, "0.5", "3", 3000);
        if (bsClasses.some(bsClass => /warn/gi.test(bsClass) || /danger/gi.test(bsClass))) {
          highlightChange(bsBtn, "yellow");
          if (!bsBtn.querySelector(".bi-exclamation")) {
            const rootSize = parseFloat(getComputedStyle(document.querySelector("html")!).fontSize);
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("width", "1rem");
            svg.style.setProperty("height", "1.25rem", "important");
            svg.setAttribute("fill", "currentColor");
            svg.setAttribute("class", "bi bi-exclamation");
            svg.setAttribute("viewBox", "0 0 16 16");
            svg.style.setProperty("padding-bottom", `${(rootSize * 0.03) / rootSize}rem`, "!important");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute(
              "d",
              "M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z",
            );
            svg.appendChild(path);
            bsBtn.appendChild(svg);
            bsBtn.style.paddingLeft = `${
              parseFloat(getComputedStyle(bsBtn).paddingLeft) / rootSize +
              parseFloat(getComputedStyle(svg).width) / rootSize
            }rem`;
          }
        }
        if (!bsBtn.classList.contains("btn")) bsBtn.classList.add("btn");
        for (const _ of bsClasses) {
          bsBtn.classList.add(...bsClasses);
          bsBtn.classList.remove(...bsClassesToRemove);
        }
      } else elementNotFound(bsBtn, `button id ${bsBtn?.id || "UNIDENTIFIED"}`, extLine(new Error()));
    });
  } else elementNotPopulated(bsBtns, "argument for switchBtnBS()", extLine(new Error()));
}
export function clearDefInvalidMsg(
  form: HTMLFormElement | null,
  inps: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)[],
): void {
  if (Array.isArray(inps) && inps.every(inp => inp instanceof HTMLElement)) {
    const inpsValidity: boolean[] = [];
    const submitBtns = Array.from(document.querySelectorAll('button[type="submit"]'));
    if (submitBtns.every(btn => btn instanceof HTMLElement)) {
      submitBtns.forEach(subBtn => {
        subBtn.addEventListener("click", () => {
          for (const inp of inps) {
            if (
              inp instanceof HTMLInputElement ||
              inp instanceof HTMLSelectElement ||
              inp instanceof HTMLTextAreaElement
            ) {
              if (!inp.checkValidity()) console.warn(`Error validating data in field id ${inp?.id || "UNDEFINED ID"}`);
              inpsValidity.push(inp.checkValidity());
            } else
              inputNotFound(inp, `entry field id ${(inp as any)?.id || "UNDEFINED ID"} invalid`, extLine(new Error()));
          }
        });
      });
    } else elementNotPopulated(submitBtns, "submitBtns in clearDefInvalidMsg()", extLine(new Error()));
    inps.forEach(inp => {
      if (inp instanceof HTMLInputElement || inp instanceof HTMLSelectElement || inp instanceof HTMLTextAreaElement) {
        inp.addEventListener("invalid", ev => {
          ev.preventDefault();
        });
      }
    });
    if (form instanceof HTMLFormElement) {
      form.addEventListener("submit", ev => {
        if (inpsValidity.some(validity => validity === false)) {
          ev.preventDefault();
          console.warn(`Error validating fields in the form. Submission prevented.`);
        }
      });
    } else elementNotFound(form, "form in clearDefInvalidMsg()", extLine(new Error()));
  }
}
export function fillCustomValidityWarn(inpId: string, customMsg: string = "Campo inválido"): void {
  const warnEl = document.getElementById(`${inpId}Warn`);
  if (warnEl instanceof HTMLElement) {
    try {
      let relatedInp: Element | null | undefined = warnEl.previousElementSibling;
      if (!(relatedInp instanceof HTMLElement)) {
        relatedInp = warnEl.parentElement?.previousElementSibling;
        if (!relatedInp) throw new Error();
      } else {
        const rectLeft = relatedInp.getBoundingClientRect().left + scrollX;
        warnEl.style.position = "relative";
        if (innerWidth > 1250) warnEl.style.left = rectLeft / 3 + "px";
        else warnEl.style.left = rectLeft / 2 + "px";
      }
    } catch (err) {
      console.error(`Error finding related Input`);
    }
    warnEl.textContent = customMsg;
    setTimeout(() => {
      warnEl.textContent = "";
    }, 3000);
  } else
    elementNotFound(
      warnEl,
      `warnEl id ${(warnEl as any)?.id || "UNDEFINED"} in fillCustomValidityWarn()`,
      extLine(new Error()),
    );
}
export function addListenerForValidities(inps: Array<targEl>, pattern?: RegExp): boolean {
  if (Array.isArray(inps) && inps.length > 0 && inps.every(inp => inp instanceof HTMLElement)) {
    inps.forEach(inp => {
      if (inp instanceof HTMLInputElement || inp instanceof HTMLTextAreaElement) {
        inp.addEventListener("input", () => {
          let inpValidity = true;
          if (inp.value.length > 10) inp.value = inp.value.slice(0, 11);
          if (pattern && !pattern.test(inp.value)) {
            inpValidity = false;
            inp.onsubmit = (): boolean => false;
          }
          if (inpValidity === false || !inp.checkValidity()) {
            if (inp.parentElement) {
              const alertSpan = inp.parentElement.querySelector(".spanAlert");
              if (alertSpan instanceof HTMLElement) {
                Object.assign(alertSpan.style, {
                  display: "flex",
                  flexAlign: "center",
                  justifyContent: "space-evenly",
                  height: getComputedStyle(inp).fontSize,
                  minHeight: getComputedStyle(inp).fontSize,
                  maxHeight: getComputedStyle(inp).fontSize,
                  maxWidth: "5ch",
                  marginBottom: getComputedStyle(inp).marginBottom,
                  marginTop: getComputedStyle(inp).marginTop,
                });
                Object.assign(inp.parentElement.style, {
                  display: "flex",
                  flexAlign: "center",
                  justifyContent: "space-evenly",
                });
                alertSpan.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"/>
                </svg>
                `;
                fadeElement(alertSpan.querySelector("svg"), "0");
              } else console.warn(`No alert span found for input id ${inp.id}`);
            }
          } else {
            inpValidity = true;
            inp.onsubmit = (): boolean => true;
            inp.style.color = "initial";
            if (inp.parentElement) {
              const alertSpan = inp.parentElement.querySelector(".spanAlert");
              if (alertSpan && alertSpan.querySelector("svg")) {
                fadeElement(alertSpan.children[0], "0");
                setTimeout(() => {
                  alertSpan.innerHTML = ``;
                }, 2000);
              } else console.warn(`No alert span found for input id ${inp.id}`);
            }
          }
          return inpValidity;
        });
      } else inputNotFound(inp, `input id ${inp?.id || "UNIDENFITIED"}`, extLine(new Error()));
    });
  } else elementNotPopulated(inps, "argument for addListenerForValidites()", extLine(new Error()));
  return false;
}
export function clearPhDates(dateInps: Array<targEl>): void {
  if (Array.isArray(dateInps) && dateInps.every(inp => inp instanceof HTMLElement)) {
    dateInps.forEach(inp => {
      if (inp instanceof HTMLInputElement && inp.type === "date") {
        inp.style.color = "transparent";
        if (inp.parentElement!.querySelector(".datBtn")) {
          inp.parentElement!.querySelector(".datBtn")?.addEventListener("click", () => {
            inp.value.length === 0 ? (inp.style.color = "transparent") : (inp.style.color = "black");
          });
        }
        inp.addEventListener("input", () => {
          inp.value.length === 0 ? (inp.style.color = "transparent") : (inp.style.color = "black");
        });
      } else inputNotFound(inp, `date input id ${inp?.id || "UNIDENTIFIED"}`, extLine(new Error()));
    });
  } else elementNotPopulated(dateInps, "dateInps in clearPhDates()", extLine(new Error()));
}
export function resetPhs(inps: Array<entryEl>, phs: { [key: string]: string }): void {
  if (Array.isArray(inps) && inps.every(inp => inp instanceof HTMLElement)) {
    for (const inp of inps) {
      const ph = phs[inp.id] ?? "";
      if (inp instanceof HTMLInputElement || inp instanceof HTMLTextAreaElement) {
        inp.placeholder = ph;
        ["click", "input"].forEach(ev => {
          inp.addEventListener(ev, () => {
            inp.placeholder = "";
            if (inp.value === "")
              setTimeout(() => {
                inp.placeholder = ph;
              }, 3000);
          });
        });
      } else inputNotFound(inp, `inp id ${inp?.id || "UNIDENFITIED"}`, extLine(new Error()));
    }
  } else elementNotPopulated(inps, "argument for cleanLoginPhs()", extLine(new Error()));
}
export function equalizeWidWithPhs(els: Array<targEl>): void {
  if (Array.isArray(els) && els.length > 0 && els.every(el => el instanceof HTMLElement)) {
    const chReferenceCanva = document.getElementById("chreference");
    if (document.getElementById("chreference") && chReferenceCanva instanceof HTMLCanvasElement) {
      const chWid = chReferenceCanva.getContext("2d")?.measureText(chReferenceCanva.textContent ?? "0").width ?? 16;
      els.forEach(el => {
        if (
          ((el instanceof HTMLInputElement && (el.type === "text" || el.type === "number" || el.type === "search")) ||
            el instanceof HTMLTextAreaElement) &&
          el.placeholder.length > 4
        ) {
          el.style.minWidth = `${el.placeholder.length + 8}ch`;
        } else if (el instanceof HTMLSelectElement) {
          const options = Array.from(el.querySelectorAll("option"));
          if (options.length > 0) {
            if (options.some(option => option.selected === true)) {
              options
                .filter(options => options.selected === true)
                .forEach(option => {
                  el.style.minWidth = `${
                    ((option.textContent?.length || 0) +
                      10 +
                      parseFloat(getComputedStyle(el).paddingLeft) +
                      parseFloat(getComputedStyle(el).paddingRight)) /
                      chWid ||
                    (option.value.length +
                      10 +
                      parseFloat(getComputedStyle(el).paddingLeft) +
                      parseFloat(getComputedStyle(el).paddingRight)) /
                      chWid
                  }ch`;
                  if (
                    parseFloat(getComputedStyle(el).width) < (option.textContent?.length ?? 0) + 8 ||
                    parseFloat(getComputedStyle(el).width) < (option.value.length ?? 0) + 8
                  )
                    console.warn(
                      `Failed to apply Placeholder equalization for ${el.id || "UNIDENTIFIED"} in equalizeWidWithPhs()`,
                      extLine(new Error()),
                    );
                });
            } else {
              el.style.minWidth = `${
                ((options[0].textContent?.length ?? 0) +
                  parseFloat(getComputedStyle(el).paddingLeft) +
                  parseFloat(getComputedStyle(el).paddingRight)) /
                  chWid ||
                (options[0].value.length +
                  10 +
                  parseFloat(getComputedStyle(el).paddingLeft) +
                  parseFloat(getComputedStyle(el).paddingRight)) /
                  chWid
              }ch`;
            }
            if (
              parseFloat(getComputedStyle(el).width) < (options[0].textContent?.length ?? 0) + 8 ||
              parseFloat(getComputedStyle(el).width) < (options[0].value.length ?? 0) + 8
            )
              console.warn(
                `Failed to apply Placeholder equalization for ${el.id || "UNIDENTIFIED"} in equalizeWidWithPhs()`,
                extLine(new Error()),
              );
          } else
            console.warn(
              `No <${
                options[0]?.tagName.toLowerCase() ?? "UNDEFINED TAG"
              }> found for <${el.tagName.toLowerCase()}> id ${el?.id || "UNIDENTIFIED"} in equalizeWidWithPhs()`,
            );
        } else if (el instanceof HTMLInputElement && (el.type === "date" || el.type === "hour")) {
          el.style.minWidth = `${
            10 + parseFloat(getComputedStyle(el).paddingLeft) + parseFloat(getComputedStyle(el).paddingRight)
          }ch`;
          if (parseFloat(getComputedStyle(el).width) < 16)
            console.warn(
              `Failed to apply Placeholder equalization for ${el.id || "UNIDENTIFIED"} in equalizeWidWithPhs()`,
              extLine(new Error()),
            );
        } else if (
          !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)
        )
          elementNotFound(el, `Element id ${el?.id || "UNIDENTIFIED"}`, extLine(new Error()));
      });
    } else
      console.error(`No ch measure reference. Results for equalizeWidWithPhs may be misleading. Aborting process.`);
  } else elementNotPopulated(els, "els in balanceWidWithPhs()", extLine(new Error()));
}
export function strikeNulls(els: Array<targEl>): void {
  if (Array.isArray(els) && els.length > 0 && els.every(el => el instanceof HTMLElement)) {
    els.forEach(el => {
      if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
        if (/nul[ol]/gi.test(el.value) || /[ui]ndefin[ei]d/gi.test(el.value) || /NaN/g.test(el.value))
          el.style.textDecoration = "line-through";
      } else if (el instanceof HTMLElement) {
        if (
          el.textContent &&
          (/nul[ol]/gi.test(el.textContent) || /[ui]ndefin[ei]d/gi.test(el.textContent) || /NaN/g.test(el.textContent))
        )
          el.style.textDecoration = "line-through";
      } else elementNotFound(el, `el id ${(el as any)?.id || "UNIDENTIFIED"} in strikeNulls()`, extLine(new Error()));
    });
  } else elementNotPopulated(els, "argument for strikeNulls()", extLine(new Error()));
}
export function normalizeSizeSb(
  els: Array<targEl>,
  includeChilds: [boolean, number] = [true, 1],
  includeHeight: boolean = false,
  elsToCurrent?: Array<targEl>,
): void {
  if (Array.isArray(els) && els.length > 0 && els.every(el => el instanceof HTMLElement)) {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    els.forEach(el => {
      if (el instanceof HTMLElement) {
        const normalizeScb = (element: HTMLElement, shouldNormCurrent: boolean = false): void => {
          const iniWid = parseFloat(getComputedStyle(element).width);
          const iniHt = parseFloat(getComputedStyle(element).height);
          const scrollDiv = document.createElement("div") as HTMLDivElement;
          scrollDiv.className = "scrollbar-measure";
          document.body.appendChild(scrollDiv);
          const scbWidAppend = scrollDiv.offsetWidth - scrollDiv.clientWidth;
          const scbHtAppend = scrollDiv.offsetWidth - scrollDiv.clientHeight;
          document.body.removeChild(scrollDiv);
          const scbWidWindow = window.innerWidth - document.body.clientWidth + "px";
          const scbHtWindow = window.innerHeight - document.body.clientHeight + "px";
          const validScbWid = Math.max(parseNotNaN(scbWidWindow), scbWidAppend);
          const validScbHt = Math.max(parseNotNaN(scbHtWindow), scbHtAppend);
          element.style.minWidth = `${(iniWid + validScbWid) / rem}rem`;
          includeHeight && (element.style.minHeight = `${(iniHt + validScbHt) / rem}rem`);
          if (shouldNormCurrent && elsToCurrent && elsToCurrent.length > 0) {
            for (let c = 0; c < elsToCurrent.length; c++) {
              if (elsToCurrent[c] instanceof HTMLElement) {
                (elsToCurrent[c] as HTMLElement).style.width = `${(iniWid + validScbWid) / rem}rem`;
                includeHeight && ((elsToCurrent[c] as HTMLElement).style.height = `${(iniHt + validScbHt) / rem}rem`);
              } else
                elementNotFound(
                  elsToCurrent[c],
                  "Element for defining current width in scrollbar normalization",
                  extLine(new Error()),
                );
            }
          }
        };
        normalizeScb(el, true);
        let safeAcc = 0;
        if (includeChilds && el.firstElementChild instanceof HTMLElement) {
          el = el.firstElementChild;
          do {
            normalizeScb(el as HTMLElement, false);
            if (safeAcc >= 100) break;
            if (
              safeAcc < includeChilds[1] &&
              Array.from(el.children).some(
                child => getComputedStyle(child).overflow === "auto" && child.classList.contains("form-padded"),
              )
            ) {
              Array.from(el.children)
                .filter(children => children.classList.contains("form-padded") && children instanceof HTMLElement)
                .forEach(formPadded => {
                  (formPadded as HTMLElement).style.overflow = "unset";
                });
            }
            if (el.firstElementChild instanceof HTMLElement) el = el.firstElementChild;
            ++safeAcc;
          } while (
            safeAcc <= includeChilds[1] &&
            el instanceof HTMLElement &&
            el.hasChildNodes() &&
            Array.from(el.children).some(el => el instanceof HTMLElement)
          );
        }
      }
    });
  } else
    elementNotPopulated(els, "Elements for normalization of size based on scrollbar display", extLine(new Error()));
}
export function convertToHex(
  arrColors: Array<[string, Map<string, string>]>,
): [Array<boolean>, Array<[string, Map<string, string>]>] {
  const hexValidations: Array<boolean> = [];
  const rgbaToHex = (numValues: number[], alpha: number = 1): string => {
    return `#${((1 << 24) + (numValues[0] << 16) + (numValues[1] << 8) + numValues[2])
      .toString(16)
      .toUpperCase()}${Math.round(alpha * 255)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0")}`;
  };
  const hslaToRgba = (h: number, s: number, l: number, a: number = 1): number[] => {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
  };
  // let acc = 0;
  for (let j = 0; j < arrColors.length; j++) {
    //array geral
    const elValidations: boolean[] = [];
    for (let e = 0; e < arrColors[j].length; e++) {
      //array de elementos individuais
      const propsValidations: boolean[] = [];
      for (let [key, value] of arrColors[j][1].entries()) {
        if (!/^\s?#/.test(value) && !/^\d/.test(value) && !/inset/g.test(value)) {
          if (/none/g.test(value)) value = "rgba(0, 0, 0, 0)";
          if (/\s?rgba\(/.test(value)) {
            const numValues = value.match(/\d+/g)!.map(stNum => parseInt(stNum.trim()));
            arrColors[j][1].set(key, rgbaToHex(numValues, numValues[3]));
            propsValidations.push(true);
            elValidations.push(true);
            hexValidations.push(true);
          } else if (/\s?rgb\(/.test(value)) {
            const numValues = value.match(/\d+/g)!.map(stNum => parseInt(stNum.trim()));
            arrColors[j][1].set(key, rgbaToHex(numValues));
            propsValidations.push(true);
            elValidations.push(true);
            hexValidations.push(true);
          } else if (/\s?hsla\(/.test(value)) {
            const hslaNumValues = value.match(/\d+/g)!.map(stNum => parseInt(stNum.trim()));
            const rgbaNumValues = hslaToRgba(
              hslaNumValues[0],
              hslaNumValues[1] / 100,
              hslaNumValues[2] / 100,
              hslaNumValues[3],
            );
            arrColors[j][1].set(key, rgbaToHex(rgbaNumValues, rgbaNumValues[3]));
            propsValidations.push(true);
            elValidations.push(true);
            hexValidations.push(true);
          } else if (/\s?hsl\(/.test(value)) {
            const hslNumValues = value.match(/\d+/g)!.map(stNum => parseInt(stNum.trim()));
            const rgbaNumValues = hslaToRgba(hslNumValues[0], hslNumValues[1] / 100, hslNumValues[2] / 100);
            arrColors[j][1].set(key, rgbaToHex(rgbaNumValues));
            propsValidations.push(true);
            elValidations.push(true);
            hexValidations.push(true);
          } else {
            console.error(`Value for color scheme not supported. Aborting process`);
            propsValidations.push(false);
            elValidations.push(false);
            hexValidations.push(false);
          }
        }
      }
      if (propsValidations.some(propValidity => propValidity === false)) {
        elValidations.push(false);
        hexValidations.push(false);
      }
    }
    if (elValidations.some(elValidity => elValidity === false)) hexValidations.push(false);
  }
  return [hexValidations, arrColors];
}
export function expandContent(el: targEl): void {
  if (el instanceof HTMLElement) {
    el.style.opacity = "0";
    if (el.parentElement) el.parentElement.style.opacity = "0";
    const outputs = el.querySelectorAll("output");
    if (outputs.length > 0) {
      for (const output of outputs) {
        output.style.overflow = "hidden";
        output.style.width = "0";
      }
    }
    setTimeout(() => {
      if (!el.parentElement) return;
      if (el.parentElement.querySelector(".profileIcon") instanceof HTMLElement)
        (el.parentElement.querySelector(".profileIcon") as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        let safeAcc = 0;
        Array.from(el.children).forEach(child => {
          if (child instanceof HTMLElement) child.style.opacity = "0";
        });
        el.style.width = "0";
        let opcAcc = 0,
          widthAcc = 0;
        const interval = setInterval(() => {
          if (!el.parentElement) return;
          const maxWidth = (document.getElementById("nameLogin")?.innerText.length || 12) * 10.6;
          if (!maxWidth || maxWidth < 0 || !Number.isFinite(maxWidth)) return;
          if (
            parseInt(getComputedStyle(el).opacity) < 1 ||
            parseInt(getComputedStyle(el.parentElement).opacity) < 1 ||
            (el.parentElement.querySelector(".profileIcon") instanceof HTMLElement &&
              parseInt(getComputedStyle(el.parentElement.querySelector(".profileIcon") as HTMLElement).opacity) < 1)
          ) {
            opcAcc += 0.003;
            if (parseInt(getComputedStyle(el).opacity) < 1) el.style.opacity = opcAcc.toString();
            if (parseInt(getComputedStyle(el.parentElement).opacity) < 1)
              el.parentElement.style.opacity = opcAcc.toString();
            if (
              el.parentElement.querySelector(".profileIcon") instanceof HTMLElement &&
              parseInt((el.parentElement!.querySelector(".profileIcon") as HTMLElement).style.opacity) < 1
            )
              (el.parentElement!.querySelector(".profileIcon") as HTMLElement).style.opacity = (
                (opcAcc * 2) /
                3
              ).toString();
            Array.from(el.children).forEach(child => {
              if (child instanceof HTMLElement) child.style.opacity = opcAcc.toString();
            });
            if (parseFloat(getComputedStyle(el).width.replace("px", "").trim()) < maxWidth) {
              widthAcc += 1;
              el.style.width = `${widthAcc}px`;
            }
            if (parseFloat(getComputedStyle(el).width.replace("px", "").trim()) >= maxWidth)
              el.style.width = `${maxWidth}px`;
            safeAcc++;
            for (const output of outputs) {
              if (parseFloat(getComputedStyle(output).width.replace("px", "").trim()) < 120)
                output.style.width = `${widthAcc}px`;
              if (parseFloat(getComputedStyle(output).width.replace("px", "").trim()) >= 120)
                output.style.width = "100%";
            }
          }
        }, 5);
        setTimeout(() => {
          let maxWidth = (document.getElementById("nameLogin")?.innerText.length || 12) * 10.6;
          if (!maxWidth || maxWidth < 0 || !Number.isFinite(maxWidth)) maxWidth = 120;
          el.style.width = `${parseNotNaN(`${maxWidth}px`)}`;
          el.style.maxWidth = `100%`;
          clearInterval(interval);
        }, 6000);
      }, 100);
    }, 100);
  } else elementNotFound(el, `element for applying expandContent()`, extLine(new Error()));
}
