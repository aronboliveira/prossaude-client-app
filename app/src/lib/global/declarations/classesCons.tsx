import {
  checkConfirmApt,
  handleAptBtnClick,
  handleScheduleChange,
  replaceBtnSlot,
  verifyAptCheck,
} from "../../locals/panelPage/handlers/consHandlerCmn";
import { panelFormsVariables } from "@/vars";
import { defUser } from "@/redux/slices/userSlice";
import { privilege } from "@/lib/locals/basePage/declarations/serverInterfaces";
import { providers } from "@/vars";
import { queryableNode, voidVal } from "./types";
const clearFlags: { [k: string]: boolean } = {};
export class DataProvider {
  #sessionDataState: { [key: string]: any };
  constructor(_dataSessionState: { [key: string]: any }) {
    this.#sessionDataState = _dataSessionState;
    addEventListener("beforeunload", () => {
      this.#sessionDataState = {};
      [
        "formSched",
        "formAddStud",
        "formAddProf",
        "regstPacDlg",
        "CPFFillerDiv",
        "formAnamGId",
        "formOdont",
        "formEdFis",
      ].forEach(form => {
        if (sessionStorage.getItem(form)) {
          const prevPath = location.pathname;
          setTimeout(() => !location.pathname.includes(prevPath) && sessionStorage.removeItem(form), 1000);
        }
      });
    });
  }
  public initPersist(
    element: HTMLElement,
    provider: DataProvider | voidVal = providers.globalDataProvider,
    userClass: privilege = "student",
  ): void {
    const checkTimer = 500;
    provider ??= new DataProvider(element);
    setTimeout(() => {
      provider ??= new DataProvider(element);
      const storageTimeout = setTimeout(() => {
        if (!(document.getElementById(`${element.id}`) || !element)) {
          clearTimeout(storageTimeout);
          return;
        }
        clearFlags[`${element.id}`] = true;
        this.#evaluatePersistence(element);
        const persistInterv = setInterval(interv => {
          if (!clearFlags[`${element.id}`] || !this.#checkForm(element.id, interv))
            setTimeout(() => {
              clearInterval(interv);
              return;
            }, 200);
          else this.#evaluatePersistence(element);
        }, 1000);
        if (
          element.id === "formSched" ||
          element.id === "formAddStud" ||
          element.id === "formAddProf" ||
          element.id === "regstPacDlg" ||
          element.id === "CPFFillerDiv"
        ) {
          (() => {
            try {
              const panelSelect = document.getElementById("coordPanelSelect");
              if (!(panelSelect instanceof HTMLSelectElement)) return;
              let isTargPanelRendered = true;
              const handleSessionPanelChange = (elementId: string): void => {
                try {
                  const scope = document.getElementById(elementId);
                  if (!(scope instanceof HTMLElement)) {
                    clearInterval(persistInterv);
                    return;
                  }
                  const persisters = sessionStorage.getItem(elementId);
                  if (!persisters) return;
                  this.#initSelectParsing(document.getElementById(elementId)!, elementId);
                } catch (err) {
                  return;
                }
                !this.#checkForm(elementId) ? (isTargPanelRendered = false) : (isTargPanelRendered = true);
                !isTargPanelRendered &&
                  ((): void => {
                    panelSelect.removeEventListener("change", () => handleSessionPanelChange(elementId));
                  })();
              };
              panelSelect.addEventListener("change", () => handleSessionPanelChange(element.id));
            } catch (err) {
              return;
            }
          })();
        }
      }, checkTimer);
      setTimeout(() => {
        if (sessionStorage[element.id]) {
          provider ??= new DataProvider(element);
          provider.#parseSessionStorage(element, element.id, userClass);
        }
      }, checkTimer * 2);
    }, 300);
  }
  #checkForm(elementId: string, storageInterval?: NodeJS.Timer): boolean {
    if (!document.getElementById(elementId)) {
      //@ts-ignore
      storageInterval && clearInterval(storageInterval);
      clearFlags[`${elementId}`] = false;
      return false;
    }
    return true;
  }
  #evaluatePersistence(scope: queryableNode = document): {
    [key: string]: string;
  } {
    if (scope instanceof HTMLElement && sessionStorage.getItem(scope.id) && scope.dataset.start === "true") {
      this.#parseSessionStorage(scope, scope.id);
      delete scope.dataset.start;
    }
    this.#sessionDataState = DataProvider.#persistSessionEntries(scope as HTMLElement | Document | undefined);
    if (scope instanceof HTMLElement) sessionStorage.setItem(`${scope.id}`, JSON.stringify(this.#sessionDataState));
    return this.#sessionDataState;
  }
  static #persistSessionEntries(scope: queryableNode = document): {
    [k: string]: string;
  } {
    const persisters = [
      ...(scope?.querySelectorAll(".ssPersist") ?? []),
      ...(scope?.querySelectorAll(".lcPersist") ?? []),
    ];
    const sessionData: { [key: string]: string } = {};
    for (const persister of persisters) {
      if (
        (persister instanceof HTMLInputElement &&
          !(
            persister.type === "radio" ||
            persister.type === "checkbox" ||
            persister.type === "button" ||
            persister.type === "reset" ||
            persister.type === "submit"
          )) ||
        persister instanceof HTMLTextAreaElement ||
        persister instanceof HTMLSelectElement
      )
        sessionData[`${persister.id || persister.name}`] = persister.value;
      else if (persister instanceof HTMLInputElement && (persister.type === "radio" || persister.type === "checkbox"))
        sessionData[`${persister.id || persister.name}`] = persister.checked.toString();
      else if (persister instanceof HTMLElement) {
        sessionData[`${persister.id || (persister instanceof HTMLSlotElement && persister.name)}`] =
          persister.innerHTML;
      }
    }
    return sessionData;
  }
  #parseSessionStorage(scope: queryableNode = document, scopeRef: string, userClass: string = "student"): void {
    const persisters = sessionStorage.getItem(scopeRef) || JSON.stringify(this.#sessionDataState);
    if (persisters) {
      Object.entries(JSON.parse(persisters)).forEach(entry => {
        const fetchedEl = scope?.querySelector(`#${entry[0]}`) || document.querySelector(`#${entry[0]}`);
        if (
          (fetchedEl instanceof HTMLInputElement &&
            !(
              fetchedEl.type === "radio" ||
              fetchedEl.type === "checkbox" ||
              fetchedEl.type === "button" ||
              fetchedEl.type === "reset" ||
              fetchedEl.type === "submit"
            )) ||
          fetchedEl instanceof HTMLTextAreaElement ||
          fetchedEl instanceof HTMLSelectElement
        ) {
          fetchedEl.value = entry[1] as string;
        } else if (
          fetchedEl instanceof HTMLInputElement &&
          (fetchedEl.type === "radio" || fetchedEl.type === "checkbox")
        ) {
          entry[1] === "true" || entry[1] === true ? (fetchedEl.checked = true) : (fetchedEl.checked = false);
        } else if (fetchedEl instanceof HTMLElement) {
          fetchedEl.innerHTML = entry[1] as string;
          const monthSelector = document.getElementById("monthSelector");
          (monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement) &&
            userClass &&
            handleScheduleChange(
              monthSelector,
              document.getElementById("tbSchedule"),
              userClass,
              panelFormsVariables.isAutoFillMonthOn,
            );
        }
      });
    }
  }
  #initSelectParsing(scope: queryableNode = document, scopeRef: string): void {
    const persisters = sessionStorage.getItem(scopeRef);
    if (persisters) {
      Object.entries(JSON.parse(persisters)).forEach(entry => {
        const fetchedEl = scope?.querySelector(`#${entry[0]}`) || document.querySelector(`#${entry[0]}`);
        if (
          (fetchedEl instanceof HTMLInputElement &&
            !(
              fetchedEl.type === "radio" ||
              fetchedEl.type === "checkbox" ||
              fetchedEl.type === "button" ||
              fetchedEl.type === "reset" ||
              fetchedEl.type === "submit"
            )) ||
          fetchedEl instanceof HTMLTextAreaElement ||
          fetchedEl instanceof HTMLSelectElement
        ) {
          fetchedEl.value = entry[1] as string;
        } else if (
          fetchedEl instanceof HTMLInputElement &&
          (fetchedEl.type === "radio" || fetchedEl.type === "checkbox")
        ) {
          entry[1] === "true" || entry[1] === true ? (fetchedEl.checked = true) : (fetchedEl.checked = false);
        } else if (fetchedEl instanceof HTMLElement) {
          fetchedEl.innerHTML = entry[1] as string;
          if (fetchedEl.classList.contains("consSlot")) {
            const aptBtn = fetchedEl.querySelector(".appointmentBtn");
            if (aptBtn) {
              aptBtn.addEventListener("click", ev => handleAptBtnClick(ev as MouseEvent, user.userClass));
            }
            const user = localStorage.getItem("activeUser") ? JSON.parse(localStorage.getItem("activeUser")!) : defUser;
            if (user.userClass === "coordenador" || user.userClass === "supervisor") {
              const eraser = fetchedEl.querySelector(".btn-close");
              if (eraser) {
                eraser.addEventListener("click", () => {
                  const relCel = eraser.closest("slot");
                  if (relCel instanceof HTMLElement && eraser instanceof HTMLElement)
                    replaceBtnSlot(relCel.querySelector("[id*=appointmentBtn]"), relCel);
                });
              }
              const dayCheck = fetchedEl.querySelector(".apptCheck");
              if (dayCheck) {
                dayCheck.addEventListener("change", () => {
                  if (
                    dayCheck instanceof HTMLInputElement &&
                    (dayCheck.type === "checkbox" || dayCheck.type === "radio")
                  )
                    checkConfirmApt(dayCheck);
                });
                verifyAptCheck(dayCheck);
              }
            }
          }
        }
      });
    }
  }
}
