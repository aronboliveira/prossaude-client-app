import {
  elementNotFound,
  extLine,
  inputNotFound,
  stringError,
} from "../../../global/handlers/errorHandler";
import {
  checkConfirmApt,
  handleAptBtnClick,
  handleScheduleChange,
  replaceBtnSlot,
  verifyAptCheck,
} from "../handlers/consHandlerCmn";
import { panelFormsVariables } from "../../../../../components/panelForms/panelFormsData";
import { defUser } from "@/redux/slices/userSlice";

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
      ].forEach(form => {
        sessionStorage.getItem(form) && sessionStorage.setItem(form, "");
      });
    });
  }
  initPersist(
    element: HTMLElement,
    gscopeProvider: DataProvider,
    userClass: string = "student"
  ) {
    setTimeout(() => {
      // console.log("Initing persistence...");
      if (sessionStorage[element.id])
        gscopeProvider.parseSessionStorage(element, element.id, userClass);
      else
        setTimeout(
          () =>
            sessionStorage[element.id] &&
            gscopeProvider.parseSessionStorage(element, element.id, userClass),
          300
        );
    }, 100);
    //timeout for checking if element is out of DOM and then sets interval for keeping check in DOM
    const storageTimeout = setTimeout(() => {
      if (!(document.getElementById(`${element.id}`) || !element)) {
        console.log("Initial DOM fetch rejected. Clearing timeout");
        clearTimeout(storageTimeout);
        return;
      }
      clearFlags[`${element.id}`] = true;
      const persistInterv = setInterval(interv => {
        if (
          !clearFlags[`${element.id}`] ||
          !this.checkForm(element.id, interv)
        ) {
          setTimeout(() => clearInterval(interv), 200);
          return;
        } else this.checkForPersist(element);
      }, 1_000);
      this.checkForPersist(element);
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
            if (!(scope instanceof HTMLElement)) {
              console.warn(
                `Could not find scopped element for handling panel change`
              );
              clearInterval(persistInterv);
              return;
            }
            const persisters = sessionStorage.getItem(elementId);
            if (!persisters)
              throw stringError(
                `Persisting elements for ${elementId}`,
                persisters,
                extLine(new Error())
              );
            this.initStorageParsing(
              document.getElementById(elementId)!,
              elementId
            );
          } catch (err) {
            console.error(`Error handling Panel Change:
                ${(err as Error).message};`);
          }
          !this.checkForm(elementId)
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
    }, 500);
  }
  initStorageParsing(
    scope: HTMLElement | Document = document,
    scopeRef: string
  ): void {
    const persisters = sessionStorage.getItem(scopeRef);
    if (persisters) {
      console.log("Init storage parsing...");
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
          // console.log(
          //   `HTML string parsed at init for ${
          //     fetchedEl.id || fetchedEl.className || fetchedEl.tagName
          //   }:`
          // );
          // console.log(entry[1]);
          fetchedEl.innerHTML = entry[1] as string;
          if (fetchedEl.classList.contains("consSlot")) {
            const aptBtn = fetchedEl.querySelector(".appointmentBtn");
            if (aptBtn) {
              aptBtn.addEventListener("click", ev =>
                handleAptBtnClick(ev as MouseEvent, user.userClass)
              );
            }
            const user = localStorage.getItem("activeUser")
              ? JSON.parse(localStorage.getItem("activeUser")!)
              : defUser;
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
  parseSessionStorage(
    scope: HTMLElement | Document = document,
    scopeRef: string,
    userClass: string = "student"
  ): void {
    const persisters =
      sessionStorage.getItem(scopeRef) ||
      JSON.stringify(this.#sessionDataState);
    if (persisters) {
      console.log("Parsing session storage...");
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
          const monthSelector = document.getElementById("monthSelector");
          (monthSelector instanceof HTMLSelectElement ||
            monthSelector instanceof HTMLInputElement) &&
            userClass &&
            handleScheduleChange(
              monthSelector,
              document.getElementById("tbSchedule"),
              userClass,
              panelFormsVariables.isAutoFillMonthOn
            );
          // console.log(
          //   `innerHTML parsed for ${
          //     fetchedEl.id || fetchedEl.className || fetchedEl.tagName
          //   }`
          // );
          // console.log(entry[1]);
        }
      });
    }
  }
  checkForPersist(scope: HTMLElement | Document = document): {
    [key: string]: string;
  } {
    this.#sessionDataState = DataProvider.persistSessionEntries(scope);
    scope instanceof HTMLElement
      ? sessionStorage.setItem(
          `${scope.id}`,
          JSON.stringify(this.#sessionDataState)
        )
      : console.log("Failed to fetch scope when checking for persistence...");
    return this.#sessionDataState;
  }
  static persistSessionEntries(scope: HTMLElement | Document = document): {
    [k: string]: string;
  } {
    const persisters = [
      ...scope.querySelectorAll(".ssPersist"),
      ...scope.querySelectorAll(".lcPersist"),
    ];
    const sessionData: { [key: string]: string } = {};
    // console.log("Persisting session entries...");
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
      else if (persister instanceof HTMLElement) {
        sessionData[
          `${
            persister.id ||
            (persister instanceof HTMLSlotElement && persister.name)
          }`
        ] = persister.innerHTML;
        // console.log(
        //   `InnerHTML assigned to session data id ${
        //     persister.id ||
        //     (persister instanceof HTMLSlotElement && persister.name)
        //   }`
        // );
        // console.log(persister.innerHTML);
      }
    }
    // console.log("Session Storage:");
    // console.log(sessionStorage);
    return sessionData;
  }
  checkForm(elementId: string, storageInterval?: NodeJS.Timer): boolean {
    if (!document.getElementById(elementId)) {
      console.warn(`Failed to fetch form for persistence`);
      //@ts-ignore
      storageInterval && clearInterval(storageInterval);
      clearFlags[`${elementId}`] = false;
      return false;
    }
    // console.log("Form fetch was sucessfull. Checking por persistence...");
    return true;
  }
}
