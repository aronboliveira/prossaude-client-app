import { MutableRefObject } from "react";
import { nlDlg, nlHtEl, personAbrvClasses, personAbrvUpperClasses, targEl } from "../../../global/declarations/types";
import { parseNotNaN } from "../../../global/gModel";
import { switchBtnBS } from "../../../global/gStyleScript";
import {
  multipleElementsNotFound,
  extLine,
  elementNotPopulated,
  elementNotFound,
  stringError,
} from "../../../global/handlers/errorHandler";
import { toast } from "react-hot-toast";

//nesse arquivo estão as funções para handling de casos dos modais de listas tabeladas

export function checkIntervDate(arrEls: Array<targEl>): void {
  if (Array.isArray(arrEls) && arrEls.length > 0 && arrEls.every(el => el instanceof Element)) {
    arrEls.forEach(el => {
      if (el instanceof Element && el.closest("tr")) {
        const relatedOutpInterv = el.closest("tr")?.querySelector("[id*=outpInterv]")?.textContent ?? "";
        const intervMaxDate = relatedOutpInterv.slice(relatedOutpInterv.lastIndexOf(" ")).trim().toLowerCase();
        const today = new Date();
        if (
          (parseFloat(intervMaxDate.slice(-4)) < today.getFullYear() && !intervMaxDate.match(/[A-Za-z]/gi)) ||
          (parseFloat(intervMaxDate.slice(-4)) === today.getFullYear() &&
            parseFloat(intervMaxDate.slice(-7, -4)) < today.getMonth()) ||
          (parseFloat(intervMaxDate.slice(-4)) === today.getFullYear() &&
            parseFloat(intervMaxDate.slice(-7, -4)) === today.getMonth() &&
            parseFloat(intervMaxDate.slice(-10, -7)) < today.getDate())
        ) {
          switchBtnBS([el]);
        }
      }
    });
  } else elementNotPopulated(arrEls, "arrEls in checkIntervDate()", extLine(new Error()));
}
export function checkLocalIntervs(mainRef: HTMLElement): void {
  const btnsAloc = Array.from(mainRef.querySelectorAll("[id*='btnAloc']")).filter(
    btn => btn instanceof HTMLButtonElement,
  );
  btnsAloc.length > 0
    ? checkIntervDate(btnsAloc)
    : elementNotPopulated(btnsAloc, "btnsAloc in useEffect() for sectTabRef", extLine(new Error()));
}
export function transferDataAloc(
  btn: targEl,
  mainAncestral: HTMLElement,
  ancestral: Exclude<HTMLElement, HTMLTableElement>,
  pattern: personAbrvClasses = "stud",
): boolean {
  if (btn instanceof HTMLButtonElement) {
    //alocação ocorre aqui
    const relTr =
      mainAncestral.querySelector(`[id$=row${btn.id.slice(-1) ?? "1"}]`) ??
      mainAncestral.querySelector(`[id$=row-${btn.id.slice(-1) ?? "1"}]`) ??
      btn.closest("tr") ??
      btn.parentElement?.parentElement;
    if (relTr instanceof HTMLTableRowElement) {
      const arrOutpData = Array.from(relTr.querySelectorAll("output")).map(outp => {
        let data = [
          (outp.dataset.aloc || outp.dataset.title || outp.id)
            .replaceAll(/\sd[aeiouAEIOU]\s/gi, "")
            .trim()
            .replaceAll(/[:\(\)\-_/\s']/gi, "")
            .toLowerCase()
            .trim()
            .replaceAll(/row[0-9]+/g, "")
            .replaceAll(/primeiro/g, "")
            .replaceAll(/first/gi, "")
            .replaceAll(/nome/g, "name")
            .replace(new RegExp(pattern), ""),
          outp.innerText,
        ];
        if (/tel/gi.test(data[0]) && /\s/g.test(data[1])) {
          const telParts = ["nac", "ddd", "tel"],
            splitTel = data[1].split(" "),
            mappedTel: Array<string[][]> = [];
          if (splitTel.length === 2) {
            const pairParts = data[1].split(" ").map((split, i) => {
              return [telParts[i + 1], split];
            });
            mappedTel.push(pairParts);
          } else if (splitTel.length === 3) {
            const thirdParts = data[1].split(" ").map((split, i) => {
              return [telParts[i], split];
            });
            mappedTel.push(thirdParts);
          }
          // @ts-ignore
          data = mappedTel.flat(1);
        }
        if (pattern === "pac" && /name/gi.test(data[0]) && /\s/g.test(data[1])) {
          const nameParts = ["first", "family"];
          const slicedName = [
            data[1].slice(0, data[1].indexOf(" ")),
            data[1].slice(data[1].indexOf(" "), data[1].length),
          ];
          const mappedName: Array<string[]> = [];
          for (let n = 0; n <= nameParts.length; n++) mappedName.push([nameParts[n], slicedName[n]]);
          // @ts-ignore
          data = mappedName;
        }
        return data;
      });
      const thirdLevels = arrOutpData
        .map(entry => entry.filter(subentry => Array.isArray(subentry)))
        .filter(subentry => subentry.length > 0);
      // @ts-ignore
      const arrFinalData: Array<string[]> = [...arrOutpData, ...thirdLevels.flat(1)]
        .filter(entry => Array.isArray(entry))
        .filter(entry => !/,/g.test(entry[0]))
        .map(entry => {
          if (/\+/g.test(entry[1])) entry[1].replace("+", "");
          if (/status/gi.test(entry[0]) && typeof entry[1] === "string") {
            if (/emerg[eê]ncia/gi.test(entry[1])) (entry[1] as string) = "emergência";
            else if (/avalia[çc][aã]o/gi.test(entry[1])) (entry[1] as string) = "avaliacao";
            else if (/tratamento/gi.test(entry[1])) (entry[1] as string) = "tratamento";
            else if (/alta/gi.test(entry[1])) {
              if (/odont/gi.test(entry[1]) && /educa[cç][aã]o/gi.test(entry[1]) && /nutri[cç][aã]o/gi.test(entry[1]))
                (entry[1] as string) = "altaOdontologiaEducacaoFisicaNutricao";
              else if (/odont/gi.test(entry[1]) && /educa[cç][aã]o/gi.test(entry[1])) {
                (entry[1] as string) = "altaOdontologiaEducaoFisica";
              } else if (/educa[cç][aã]o/gi.test(entry[1]) && /nutri[cç][aã]o/gi.test(entry[1])) {
                (entry[1] as string) = "altaEducaoFisicaNutricao";
              } else if (/odont/gi.test(entry[1]) && /nutri[cç][aã]o/gi.test(entry[1])) {
                (entry[1] as string) = "altaOdontologiaNutricao";
              } else if (/odont/gi.test(entry[1])) {
                (entry[1] as string) = "altaOdontologia";
              } else if (/educa[cç][aã]o/gi.test(entry[1])) {
                (entry[1] as string) = "altaEducacaoFisica";
              } else if (/nutri[cç][aã]o/gi.test(entry[1])) {
                (entry[1] as string) = "altaNutricao";
              }
            }
          }
          return entry;
        });
      const outpData: { [key: string]: Array<string[]> } = Object.fromEntries(arrFinalData);
      const allInps = [
        ...ancestral!.querySelectorAll("input"),
        ...ancestral!.querySelectorAll("textarea"),
        ...ancestral!.querySelectorAll("select"),
      ];
      const allInpTitles = allInps
        .map(inp => inp.dataset.title || inp.id || inp.name || "")
        .filter(title => new RegExp(pattern, "gi").test(title));
      const matches: Array<boolean> = [];
      allInpTitles.forEach(title => {
        const patternBefore = `${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1)}${title
          .slice(0, 1)
          .toUpperCase()}${title
          .slice(1, title.indexOf(" "))
          .replace(/ome/gi, "ame")
          .replace(/first/gi, "")
          .slice(0, 4)}`;
        const patternAfter = `${title.slice(0, 1).toUpperCase()}${title
          .slice(1, title.indexOf(" "))
          .replace(/ome/gi, "ame")}${pattern.slice(0, 1).toUpperCase()}${pattern
          .slice(1)
          .replace(/first/gi, "")
          .slice(0, 4)}`;
        const matchedInps = [
          //nome
          ancestral!.querySelector(`input[data-aloc^="name-${pattern}"]`) ||
            ancestral!.querySelector(`input[data-title*=${patternBefore}]`) ||
            ancestral!.querySelector(`select[data-title*=${patternBefore}]`) ||
            ancestral!.querySelector(`input[data-title*=${patternAfter}]`) ||
            ancestral!.querySelector(`select[data-title*=${patternAfter}]`),
          //cpf
          ancestral!.querySelector(`input[data-aloc*="cpf-${pattern}"]`) ||
            ancestral!.querySelector(`input[id*=${patternBefore.replace("cpf", "CPF")}]`) ||
            ancestral!.querySelector(`select[id*=${patternBefore.replace("cpf", "CPF")}]`) ||
            ancestral!.querySelector(
              `input[id*=${patternAfter.replace("cpf", "CPF")}] 
               `,
            ),
          //nacional
          ancestral!.querySelector(`input[data-aloc*="nac-${pattern}"]`) ||
            ancestral!.querySelector(
              `input[data-title*="Nacional ${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1, pattern.length)}"]`,
            ) ||
            ancestral!.querySelector(
              `input[id*="nac${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1, pattern.length)}"]`,
            ),
          //tel
          ancestral!.querySelector(`input[data-aloc*="tel-${pattern}"]`) ||
            ancestral!.querySelector(
              `input[data-title*="Tel ${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1, pattern.length)}"]`,
            ),
          //ddd
          ancestral!.querySelector(`input[data-aloc*="ddd-${pattern}"]`) ||
            ancestral!.querySelector(
              `input[data-title*="DDD ${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1, pattern.length)}"]`,
            ),
          //email
          ancestral!.querySelector(`input[data-aloc*="email-${pattern}"]`) ||
            ancestral!.querySelector(
              `input[id*="email-${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1, pattern.length)}"]`,
            ) ||
            ancestral!.querySelector(
              `input[data-title*="Email ${pattern.slice(0, 1).toUpperCase()}${pattern.slice(1, pattern.length)}"]`,
            ),
        ];
        if (pattern === "stud") {
          //dre
          matchedInps.push(
            ancestral!.querySelector(`input[data-aloc*="dre-${pattern}"]`) ||
              ancestral!.querySelector(`input[id*=${patternBefore.replace("dre", "DRE")}] `) ||
              ancestral!.querySelector(`select[id*=${patternBefore.replace("dre", "DRE")}]`) ||
              ancestral!.querySelector(`select[id*=${patternAfter.replace("dre", "DRE")}]`) ||
              ancestral!.querySelector(`input[id*=${patternAfter.replace("dre", "DRE")}]`),
          );
        }
        if (pattern === "pac") {
          matchedInps.push(
            //primeiro nome
            ancestral!.querySelector(`input[data-aloc*="firstname-${pattern}"]`) ||
              ancestral!.querySelector(`input[data-aloc*="first-name-${pattern}"]`) ||
              ancestral!.querySelector(`input[id*=${patternBefore}Name]`) ||
              ancestral!.querySelector(`input[id*=name${patternAfter}]`) ||
              ancestral!.querySelector(`input[data-title*=Primeiro]`) ||
              ancestral!.querySelector(`input[data-title*=Sobrenome]`),
            //sobrenome
            ancestral!.querySelector(`input[data-aloc*="familyname-${pattern}"]`) ||
              ancestral!.querySelector(`input[data-aloc*="family-name-${pattern}"]`) ||
              ancestral!.querySelector(`input[id*=family]`) ||
              ancestral!.querySelector(`input[data-title*=Sobrenome]`),
            //status
            ancestral!.querySelector(`select[data-aloc*="status-${pattern}"]`) ||
              ancestral!.querySelector(`select[id*=status]`) ||
              ancestral!.querySelector(`select[data-title*=Status]`) ||
              ancestral!.querySelector(`input[data-aloc*="status"]`) ||
              ancestral!.querySelector(`input[id*=status]`) ||
              ancestral!.querySelector(`input[data-title*=Status]`),
          );
        }
        matchedInps.forEach(matchedInp => {
          if (matchedInp) {
            Object.keys(outpData).forEach(key => {
              if (matchedInp.id.toLowerCase().match(new RegExp(`${key.replace("int", "").replace("ext", "")}`, "gi"))) {
                if (matchedInp instanceof HTMLInputElement && matchedInp.type === "number") {
                  // @ts-ignore
                  (matchedInp as HTMLInputElement).value =
                    //@ts-ignore
                    parseNotNaN(outpData[`${key}`].replace("+", ""));
                }
                //
                else if (
                  matchedInp instanceof HTMLInputElement ||
                  matchedInp instanceof HTMLSelectElement ||
                  matchedInp instanceof HTMLTextAreaElement
                ) {
                  // @ts-ignore
                  matchedInp.value = outpData[`${key}`];
                }
              }
            });
            matches.push(true);
          } else matches.push(false);
        });
      });
      if (matches.length === 0) console.error(`Error finding matches for alocation in context of ${pattern}`);
      return matches.filter(matchbool => matchbool === true).length > 0 ? true : false;
    } else
      elementNotFound(relTr, `tr id ${relTr?.id || "UNIDENTIFIED"} for gathering student data`, extLine(new Error()));
  } else
    elementNotFound(btn, `btn id ${btn?.id || "UNIDENTIFIED"} for gathering student row data`, extLine(new Error()));
  return false;
}
export function addListenerAlocation(
  alocBtn: targEl,
  parentRef: Exclude<targEl, HTMLTableElement>,
  forwardedRef: nlHtEl,
  context: personAbrvUpperClasses | personAbrvClasses = "Stud",
  state: boolean = true,
  dispatch: (state: boolean) => void,
  userClass: string = "estudante",
): void {
  try {
    if (!(alocBtn instanceof HTMLButtonElement || (alocBtn instanceof HTMLInputElement && alocBtn.type === "button")))
      throw new Error(`Failed to validate Alocation Button reference`);
    if (!(parentRef instanceof HTMLElement)) throw new Error(`Failed to validate instance of Parent Element reference`);
    if (!(forwardedRef instanceof HTMLElement))
      throw new Error(`Failed to validate instance of Forwarded Reference to Ancestral Element`);
    const tabs = parentRef.querySelectorAll(`table[id*=av${context}]`);
    tabs.length > 0
      ? tabs.forEach(tab => {
          const btnAloc = tab.querySelectorAll(`button[class*=btnAloc${context}]`) || `button[id*=btnAloc${context}]`;
          btnAloc.forEach(btn => {
            (userClass === "coordenador" || userClass === "supervisor") &&
              btn.addEventListener("click", () => {
                state = transferDataAloc(btn, parentRef, forwardedRef, context.toLowerCase() as personAbrvClasses);
                if (typeof state === "boolean" && dispatch) dispatch(!state);
                else {
                  toast.error(`Erro obtendo dados para alocação selecionada. Feche manualmente.`);
                }
              });
          });
        })
      : elementNotPopulated(tabs, `tabs in addListenerAlocation(), context ${context}`, extLine(new Error()));
  } catch (e) {
    console.error(`Error executing addListenerAlocation:\n${(e as Error).message}`);
  }
}
export function addListenerAvMembers(
  dialogRef: MutableRefObject<nlDlg | HTMLDivElement>,
  shouldAddListener: boolean = true,
): void {
  const typeCons = document.getElementById("typeConsSel");
  if (typeCons instanceof HTMLSelectElement) {
    const gAvStudsOpGrps = document.getElementById("avStuds")?.querySelectorAll("optgroup");
    const gAvProfsOpGrps = document.getElementById("avProfs")?.querySelectorAll("optgroup");
    const gAvCPFStudsOpGrps = document.getElementById("listCPFStudsCons")?.querySelectorAll("optgroup");
    const gAvDREStudsOpGrps = document.getElementById("listDREStudsCons")?.querySelectorAll("optgroup");
    if (gAvStudsOpGrps && gAvProfsOpGrps) {
      filterAvMembers(gAvStudsOpGrps, gAvProfsOpGrps, gAvCPFStudsOpGrps, gAvDREStudsOpGrps);
      if (shouldAddListener)
        typeCons.addEventListener("change", () => {
          filterAvMembers(gAvStudsOpGrps, gAvProfsOpGrps, gAvCPFStudsOpGrps, gAvDREStudsOpGrps);
        });
    } else {
      console.error(`Error finding inputs with datalists for autofilling. Emptying lists`);
      dialogRef.current?.querySelectorAll("datalist").forEach((dl: HTMLDataListElement) => (dl.innerHTML = ``));
    }
  } else elementNotFound(typeCons, "<select> for defining type of possible appointments", extLine(new Error()));
}
export function filterAvMembers(
  gAvStudsOpGrps: NodeListOf<HTMLOptGroupElement>,
  gAvProfsOpGrps: NodeListOf<HTMLOptGroupElement>,
  gAvCPFStudsOpGrps?: NodeListOf<HTMLOptGroupElement>,
  gAvDREStudsOpGrps?: NodeListOf<HTMLOptGroupElement>,
): void {
  const studName = document.getElementById("relStudName");
  const profName = document.getElementById("relProfName");
  const avStuds = document.getElementById("avStuds");
  const avStudsCPF = document.getElementById("listCPFStudsCons");
  const avStudsDRE = document.getElementById("listDREStudsCons");
  const avProfs = document.getElementById("avProfs");
  const typeCons = document.getElementById("typeConsSel");
  if (
    studName instanceof HTMLInputElement &&
    profName instanceof HTMLInputElement &&
    typeCons instanceof HTMLSelectElement &&
    avStuds instanceof HTMLDataListElement &&
    avProfs instanceof HTMLDataListElement
  ) {
    const typeConsOpGrps = typeCons.querySelectorAll("optgroup");
    if (typeConsOpGrps.length > 1) {
      const selectedTypeConsGrpLab = Array.from(typeCons.querySelectorAll("option"))
        .find(option => option.selected === true)
        ?.closest("optgroup")?.label;
      const hideOptions = (optgroup: HTMLOptGroupElement): void => {
        const closestList = optgroup.closest("datalist")!;
        if (optgroup.label !== selectedTypeConsGrpLab && selectedTypeConsGrpLab !== "Geral")
          closestList.removeChild(optgroup);
      };
      [gAvStudsOpGrps, gAvProfsOpGrps, gAvCPFStudsOpGrps ?? [], gAvDREStudsOpGrps ?? []].forEach((arrOptGrp, i) => {
        if (i === 0) {
          avStuds.innerHTML = ``;
          arrOptGrp.forEach(optgroup => {
            avStuds.appendChild(optgroup);
          });
        }
        if (i === 1) {
          avProfs.innerHTML = ``;
          arrOptGrp.forEach(optgroup => {
            avProfs.appendChild(optgroup);
          });
        }
        if (i === 2 && avStudsCPF instanceof HTMLElement) {
          avStudsCPF.innerHTML = ``;
          arrOptGrp.forEach(optgroup => {
            avStudsCPF.appendChild(optgroup);
          });
        }
        if (i === 3 && avStudsDRE instanceof HTMLElement) {
          avStudsDRE.innerHTML = ``;
          arrOptGrp.forEach(optgroup => {
            avStudsDRE.appendChild(optgroup);
          });
        }
        arrOptGrp.forEach(optgroup => {
          hideOptions(optgroup);
        });
      });
    }
  } else
    multipleElementsNotFound(
      extLine(new Error()),
      "Elements for filterAvMembers",
      studName,
      profName,
      typeCons,
      avStuds,
      avStudsCPF,
      avStudsDRE,
      avProfs,
    );
}
export function filterTabMembers(tab: targEl, area: string): void {
  if (tab instanceof HTMLTableElement) {
    const allTrs = Array.from(tab.querySelectorAll("tr")).slice(1);
    if (!/geral/gi.test(area)) {
      allTrs.forEach(tr => {
        tr.hidden = true;
        const btnAloc = tr.querySelector('[id*="btnAloc"]');
        btnAloc instanceof HTMLButtonElement
          ? (btnAloc.disabled = true)
          : elementNotFound(btnAloc, `btn for alocation in <tr> ${tr?.id || "UNIDENTIFIED"}`, extLine(new Error()));
        const outpArea = tr.querySelector('[class*="celArea"]')?.querySelector('output[data-title*="area"]');

        if (outpArea instanceof HTMLOutputElement) {
          if (/educação física(?: & nutrição)|nutrição|educação física/gi.test(area)) {
            ["educação", "nutrição"].forEach(areaFrag => {
              if (
                new RegExp(areaFrag, "gi").test(outpArea.innerText.toLowerCase()) &&
                new RegExp(areaFrag, "gi").test(area)
              ) {
                tr.hidden = false;
                btnAloc instanceof HTMLButtonElement
                  ? (btnAloc.disabled = false)
                  : elementNotFound(
                      btnAloc,
                      `btn for alocation in <tr> ${tr?.id || "UNIDENTIFIED"}`,
                      extLine(new Error()),
                    );
              }
            });
          } else if (/odontologia/gi.test(area) && /odontologia/gi.test(outpArea.innerText.toLowerCase())) {
            tr.hidden = false;
            btnAloc instanceof HTMLButtonElement
              ? (btnAloc.disabled = false)
              : elementNotFound(btnAloc, `btn for alocation in <tr> ${tr?.id || "UNIDENTIFIED"}`, extLine(new Error()));
          }
        } else
          elementNotFound(
            outpArea,
            `<output> for defining working field in <tr> id ${tr?.id || "UNIDENTIFIED"}`,
            extLine(new Error()),
          );
      });
    } else {
      allTrs.forEach(tr => {
        tr.hidden = false;
        tr.querySelectorAll("button").forEach(btn => {
          btn.disabled = false;
        });
      });
    }
  } else elementNotFound(tab, `table id ${tab?.id || "UNIDENTIFIED"}`, extLine(new Error()));
}
export function fillTabAttr(tab: targEl, context: string = "pac"): void {
  if (tab instanceof HTMLTableElement) {
    tab.querySelectorAll("tr").forEach(row => {
      const rowIndex = Array.from(tab.rows).findIndex(anyRow => row === anyRow);
      for (const attribute of row.attributes) {
        if (/Unfilled0/gi.test(attribute.value)) {
          attribute.value = attribute.value.replace(/Unfilled0/gi, `${rowIndex + 1}` || "NotFound0");
        } else if (/Unfilled1/gi.test(attribute.value)) {
          attribute.value = attribute.value.replace(/Unfilled1/gi, `${rowIndex + 1}` || "NotFound1");
        }
      }
      let celCount = 0;
      Array.from(row.querySelectorAll("*"))
        .filter(element => element instanceof Element)
        .forEach(child => {
          for (const attribute of child.attributes) {
            if (/Unfilled0/gi.test(attribute.value)) {
              attribute.value = attribute.value.replaceAll(/Unfilled0/gi, `${rowIndex + 1}` || "NotFound0");
            }
            if (/Unfilled1/gi.test(attribute.value)) {
              attribute.value = attribute.value.replaceAll(/Unfilled1/gi, `${rowIndex + 1}` || "NotFound1");
            }
            if (/UnfilledText/gi.test(attribute.value)) {
              attribute.value = attribute.value.replaceAll(
                /* eslint-disable */
                /UnfilledText/gi,
                `${tab
                  .querySelector("thead")
                  ?.querySelector("tr")
                  ?.getElementsByTagName("th")
                  [celCount]?.innerText?.replace(" ", "-")}`,
                /* eslint-enable */
              );
            }
            if (/tagPh/gi.test(attribute.value)) {
              attribute.value = attribute.value.replaceAll(/tagPh/gi, child.tagName.toLowerCase());
            }
            if (/tagP4/gi.test(attribute.value)) {
              attribute.value = attribute.value.replace(/tagP4/gi, child.tagName.toLowerCase().slice(0, 4));
            }
          }
          if (child instanceof HTMLOutputElement) celCount++;
        });
    });
    switch (context) {
      case "pac":
        tab.querySelectorAll(".astAnchor").forEach(anchor => {
          if (anchor instanceof HTMLLinkElement) {
            /\.pdf/gi.test(anchor.href)
              ? (anchor.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
              </svg>
              `)
              : (anchor.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z"/>
              </svg>
              `);
          }
        });
        break;
      case "stud":
        break;
      case "prof":
        break;
      default:
        stringError("Reading context for fillTabAttr()", context, extLine(new Error()));
    }
  } else elementNotFound(tab, "Table called in fillTabAttr()", extLine(new Error()));
}
