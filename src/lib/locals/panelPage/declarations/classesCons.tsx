import { user } from "@/pages/panel";
import {
  elementNotFound,
  extLine,
  inputNotFound,
  stringError,
} from "../../../global/handlers/errorHandler";
import {
  checkConfirmApt,
  handleAptBtnClick,
  replaceBtnSlot,
  verifyAptCheck,
} from "../handlers/consHandlerCmn";

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
      ].forEach(form => {
        sessionStorage.getItem(form) && sessionStorage.setItem(form, "");
      });
    });
  }
  initPersist(
    element: HTMLElement,
    componentProvider: DataProvider,
    gscopeProvider: DataProvider
  ) {
    setTimeout(() => {
      if (sessionStorage[element!.id])
        gscopeProvider.parseSessionStorage(element!, element!.id);
      else
        setTimeout(() => {
          if (sessionStorage[element!.id])
            gscopeProvider.parseSessionStorage(element!, element!.id);
        }, 300);
    }, 100);
    const storageTimeout = setTimeout(() => {
      if (!(document.getElementById(`${element.id}`) || !element))
        clearTimeout(storageTimeout);
      const storageInterval = setInterval(() => {
        DataProvider.checkForm(element.id, storageInterval);
        componentProvider.cicleSessionStorage(element!);
      }, 1_000);
      componentProvider.cicleSessionStorage(element!);
    }, 500);
    try {
      const panelSelect = document.getElementById("coordPanelSelect");
      if (!(panelSelect instanceof HTMLSelectElement))
        throw inputNotFound(
          panelSelect,
          "Panel selector when fetching for session storage cicles",
          extLine(new Error())
        );
      let isTargPanelRendered = true;
      const handleSessionPanelChange = (elementId: string): void => {
        try {
          const scope = document.getElementById(elementId);
          if (!(scope instanceof HTMLElement))
            throw elementNotFound(
              scope,
              `Scope for Handling Session Panel Change`,
              extLine(new Error())
            );
          const persisters = sessionStorage.getItem(elementId);
          if (!persisters)
            throw stringError(
              `Persisting elements for ${elementId}`,
              persisters,
              extLine(new Error())
            );
          DataProvider.initStorageParsing(
            document.getElementById(elementId)!,
            elementId
          );
        } catch (err) {
          console.error(`Error handling Panel Change:
              ${(err as Error).message};`);
        }
        !DataProvider.checkForm(elementId)
          ? (isTargPanelRendered = false)
          : (isTargPanelRendered = true);
        !isTargPanelRendered &&
          (() => {
            panelSelect.removeEventListener("change", () =>
              handleSessionPanelChange(elementId)
            );
            console.warn(
              `event listener removido para handleSessionPanelChange`
            );
          })();
      };
      panelSelect.addEventListener("change", () =>
        handleSessionPanelChange(element.id)
      );
    } catch (err) {
      console.error(`Error on initiation of Panel Change Listening:
          ${(err as Error).message}`);
    }
  }
  async cicleSessionStorage(
    scope: HTMLElement | Document = document
  ): Promise<{ [key: string]: string }> {
    this.#sessionDataState = await DataProvider.persistSessionEntries(scope);
    if (scope instanceof HTMLElement)
      sessionStorage.setItem(
        `${scope.id}`,
        JSON.stringify(this.#sessionDataState)
      );
    return this.#sessionDataState;
  }
  static async persistSessionEntries(
    scope: HTMLElement | Document = document
  ): Promise<{ [key: string]: string }> {
    const persisters = [
      ...scope.querySelectorAll(".ssPersist"),
      ...scope.querySelectorAll(".lcPersist"),
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
      else if (
        persister instanceof HTMLInputElement &&
        (persister.type === "radio" || persister.type === "checkbox")
      )
        sessionData[`${persister.id || persister.name}`] =
          persister.checked.toString();
      else if (persister instanceof HTMLElement)
        sessionData[
          `${
            persister.id ||
            (persister instanceof HTMLSlotElement && persister.name)
          }`
        ] = persister.innerHTML;
    }
    return sessionData;
  }
  parseSessionStorage(
    scope: HTMLElement | Document = document,
    scopeRef: string
  ): void {
    const persisters =
      sessionStorage.getItem(scopeRef) ||
      JSON.stringify(this.#sessionDataState);
    if (persisters) {
      Object.entries(JSON.parse(persisters)).forEach(entry => {
        const fetchedEl =
          scope.querySelector(`#${entry[0]}`) ||
          document.querySelector(`#${entry[0]}`);
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
          entry[1] === "true" || entry[1] === true
            ? (fetchedEl.checked = true)
            : (fetchedEl.checked = false);
        } else if (fetchedEl instanceof HTMLElement)
          fetchedEl.innerHTML = entry[1] as string;
      });
    }
  }
  static initStorageParsing(
    scope: HTMLElement | Document = document,
    scopeRef: string
  ): void {
    const persisters = sessionStorage.getItem(scopeRef);
    if (persisters) {
      Object.entries(JSON.parse(persisters)).forEach(entry => {
        const fetchedEl =
          scope.querySelector(`#${entry[0]}`) ||
          document.querySelector(`#${entry[0]}`);
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
          entry[1] === "true" || entry[1] === true
            ? (fetchedEl.checked = true)
            : (fetchedEl.checked = false);
        } else if (fetchedEl instanceof HTMLElement) {
          fetchedEl.innerHTML = entry[1] as string;
          if (fetchedEl.classList.contains("consSlot")) {
            const aptBtn = fetchedEl.querySelector(".appointmentBtn");
            if (aptBtn) {
              aptBtn.addEventListener("click", ev =>
                handleAptBtnClick(ev as MouseEvent, user.userClass)
              );
            }
            if (
              user.userClass === "coordenador" ||
              user.userClass === "supervisor"
            ) {
              const eraser = fetchedEl.querySelector(".btn-close");
              if (eraser) {
                eraser.addEventListener("click", () => {
                  const relCel = eraser.closest("slot");
                  relCel instanceof HTMLElement && eraser instanceof HTMLElement
                    ? replaceBtnSlot(
                        relCel.querySelector("[id*=appointmentBtn]"),
                        relCel,
                        eraser
                      )
                    : elementNotFound(
                        relCel,
                        `Table cell related to button for erasing day/hour appointment id ${eraser.id}`,
                        extLine(new Error())
                      );
                });
              }
              const dayCheck = fetchedEl.querySelector(".apptCheck");
              if (dayCheck) {
                dayCheck.addEventListener("change", () => {
                  dayCheck instanceof HTMLInputElement &&
                  (dayCheck.type === "checkbox" || dayCheck.type === "radio")
                    ? checkConfirmApt(dayCheck)
                    : inputNotFound(
                        dayCheck,
                        `dayCheck id ${dayCheck?.id || "UNIDENTIFIED"}`,
                        extLine(new Error())
                      );
                });
                verifyAptCheck(dayCheck);
              }
            }
          }
        }
      });
    }
  }
  static checkForm(elementId: string, storageInterval?: NodeJS.Timer): boolean {
    if (!document.getElementById(elementId) || !elementId) {
      console.warn(`Persistência em sessão cílica interrompida`);
      //@ts-ignore
      storageInterval && clearInterval(storageInterval);
      return false;
    }
    return true;
  }
}
