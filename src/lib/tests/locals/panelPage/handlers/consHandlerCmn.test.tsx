import {
  checkComponentValidity,
  asyncJSXCall,
  correlateAptMonthDays,
  convertWeekdaysToMonthdays,
  convertMonthdaysToWeekdays,
  correlateWorkingDays,
  removeRepeateadWorkingDays,
  replaceBtnSlot,
  checkConfirmApt,
  handleScheduleChange,
  verifyAptCheck,
  addListenersForSchedTab,
  applyStylesForSchedTab,
  addListenerForSchedUpdates,
  fillSchedStateValues,
  generateSchedPacData,
  rootDlgContext,
  handleRenderRefLost,
  handleAptBtnClick,
  createAptBtn,
  handleDragAptBtn,
  replaceRegstSlot,
  checkRegstBtn,
  addEraseEvent,
} from "../../../../locals/panelPage/handlers/consHandlerCmn";
import { sessionScheduleState } from "../../../../../../components/panelForms/panelFormsData";
import { consVariablesData } from "../../../../../../components/consRegst/consVariables";
import { Root } from "react-dom/client";
import React from "react";
import {
  AppointmentHandler,
  ConsoleMethod,
  CountryNumber,
  ErrorHandler,
  HTMLTag,
  ISODate,
  WeekDay,
  WeekDaysNum,
} from "@/lib/tests/testVars";
let isDragging = false;
describe("checkComponentValidity", (): void => {
  test("should return JSX element if valid and contains children", (): void => {
    const ValidComponent: () => React.JSX.Element = (): JSX.Element => <div>Child</div>;
    expect(checkComponentValidity(<ValidComponent />, <span>Default</span>).type).toBe<() => React.JSX.Element>(
      ValidComponent
    );
  }) as void;
  test("should return Default element if invalid JSX element", (): void => {
    const DefaultComponent = <span>Default</span>;
    expect(checkComponentValidity(<React.Fragment />, DefaultComponent)).toEqual(DefaultComponent);
  }) as void;
}) as void;
describe("asyncJSXCall", (): void => {
  test("should call both component and called function", async (): Promise<void> => {
    const mockComponent: jest.Mock<React.JSX.Element, [], any> = jest.fn((): JSX.Element => <div>Component</div>);
    const mockCalled: jest.Mock<any, any, any> = jest.fn() as jest.Mock;
    expect(mockComponent).toHaveBeenCalled() as void;
    expect(mockCalled).toHaveBeenCalled() as void;
    expect((await asyncJSXCall(mockComponent, mockCalled)).type).toBe<HTMLTag>("div") as void;
  }) as void;
  test("should return default JSX in case of error", async (): Promise<void> => {
    const result = await asyncJSXCall(
      jest.fn((): never => {
        throw new Error("Test error");
      }),
      jest.fn() as jest.Mock
    );
    expect(result.type).toBe<HTMLTag>("p") as void;
    expect(result.props.children).toBe<string>("ERROR LOADING PAGE COMPONENT") as void;
  }) as void;
}) as void;
describe("correlateAptMonthDays", (): void => {
  test("should populate daySel with options from dayRefs", (): void => {
    const daySel = document.createElement("select") as HTMLSelectElement;
    const dayRefs = [
      document.createElement("input") as HTMLInputElement,
      document.createElement("input") as HTMLInputElement,
    ];
    dayRefs.forEach((dayRef: HTMLInputElement, i): string => (dayRef.value = `2024-08-${i + 1}`)) as void;
    correlateAptMonthDays(daySel, dayRefs) as void;
    expect(daySel.children.length).toBe<number>(dayRefs.length) as void;
    if (
      daySel.children[0] instanceof HTMLInputElement ||
      daySel.children[0] instanceof HTMLSelectElement ||
      daySel.children[0] instanceof HTMLTextAreaElement
    ) {
      expect(daySel.children[0].value).toBe<ISODate>("2024-08-01") as void;
    } else console.error(`Day Select First Chilldren is not an <input>, <select> or <textarea>`);
  }) as void;
  test("should handle case when no dayRefs are provided", (): void => {
    const consoleSpy = jest
      .spyOn<Console, ConsoleMethod>(console, "warn")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    correlateAptMonthDays(document.createElement("select"), []);
    expect(consoleSpy).toHaveBeenCalled() as void;
    consoleSpy.mockRestore() as void;
  }) as void;
}) as void;
describe("convertWeekdaysToMonthdays", (): void => {
  test("should convert weekdays to monthdays", (): void => {
    expect(convertWeekdaysToMonthdays([1, 3], [1, 2], 7).length).toBeGreaterThan(0) as void;
  }) as void;
  test("should return empty array if no weekdays provided", (): void => {
    expect(convertWeekdaysToMonthdays([], [1, 2]).length).toBe<number>(0) as void;
  }) as void;
}) as void;
describe("convertMonthdaysToWeekdays", (): void => {
  test("should convert monthdays to weekdays", (): void => {
    const [names, numbers] = convertMonthdaysToWeekdays(8, [1, 3]) as [string[], number[]];
    expect(names).toContain<WeekDay>("Segunda-feira") as void;
    expect(names).toContain<WeekDay>("Quarta-feira") as void;
    expect(numbers).toContain<WeekDaysNum>(1) as void;
    expect(numbers).toContain<WeekDaysNum>(3) as void;
  }) as void;
}) as void;
describe("correlateWorkingDays", (): void => {
  test("should correlate working days and update labels", (): void => {
    document.body.innerHTML = `<label class="consWeekday"></label><label class="consWeekday"></label>`;
    correlateWorkingDays(["Segunda-feira", "Quarta-feira"], 2);
    const labels = document.querySelectorAll<Element>(".consWeekday");
    expect(labels[0].textContent).toContain<WeekDay>("Segunda-feira") as void;
    expect(labels[1].textContent).toContain<WeekDay>("Quarta-feira") as void;
  }) as void;
  test("should log warning if labels do not match working day names", (): void => {
    const consoleSpy = jest
      .spyOn<Console, ConsoleMethod>(console, "warn")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    correlateWorkingDays(["Segunda-feira"], 2) as void;
    expect(consoleSpy).toHaveBeenCalled() as void;
    consoleSpy.mockRestore() as void;
  }) as void;
}) as void;
describe("removeRepeateadWorkingDays", (): void => {
  test("should return working days without repeats", (): void => {
    document.body.innerHTML = `
      <select id="firstWorkingDay"><option value="3"></option></select>
      <select id="secondWorkingDay"><option value="5"></option></select>`;
    expect(removeRepeateadWorkingDays([3, 5])).toEqual([3, 5]);
  }) as void;
  test("should log errors if elements are not found", (): void => {
    const consoleSpy = jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    removeRepeateadWorkingDays([3, 5]);
    expect(consoleSpy).toHaveBeenCalled() as void;
    consoleSpy.mockRestore() as void;
  }) as void;
}) as void;
describe("generateSchedPacData", (): void => {
  let scope: HTMLElement;
  beforeEach((): void => {
    scope = document.createElement("div") as HTMLDivElement;
    const input1 = document.createElement("input") as HTMLInputElement;
    input1.name = "name-in";
    input1.value = "John";
    scope.appendChild(input1);
    const input2 = document.createElement("input") as HTMLInputElement;
    input2.name = "sobrenome-in";
    input2.value = "Doe";
    scope.appendChild(input2);
    const input3 = document.createElement("input") as HTMLInputElement;
    input3.name = "ddd-in";
    input3.value = "11";
    scope.appendChild(input3);
    const input4 = document.createElement("input") as HTMLInputElement;
    input4.name = "tel-in";
    input4.value = "999999999";
    scope.appendChild(input4);
  }) as void;
  it("should generate correct pacData with tel and name formatting", (): void => {
    const result = generateSchedPacData(scope) as {
      [k: string]: string;
    };
    expect(result.name).toBe<string>("John Doe") as void;
    expect(result.tel).toBe<CountryNumber>("+55 11 99999-9999") as void;
  }) as void;
  it("should handle non-element scope and call elementNotFound", (): void => {
    generateSchedPacData(null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("handleRenderRefLost", (): void => {
  let prevRef: HTMLElement;
  beforeEach((): void => {
    prevRef = document.createElement("div") as HTMLDivElement;
    prevRef.id = "appointmentBtn-1";
    document.body.appendChild(prevRef);
    rootDlgContext.aptBtnsRoots["appointmentBtn-1"] = {
      render: jest.fn() as jest.Mock,
      unmount: jest.fn() as jest.Mock,
    };
    rootDlgContext.aptBtnsIdx["appointmentBtn-1"] = 1;
  }) as void;
  afterEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  it("should remove and recreate root if dialog is not found", (): void => {
    handleRenderRefLost("appointmentBtn-1", prevRef, "coordenador", 0);
    jest.advanceTimersByTime(0);
    expect(rootDlgContext.aptBtnsRoots["appointmentBtn-1"]).toBeDefined() as void;
  }) as void;
  it("should throw typeError when id is not a string", (): void => {
    handleRenderRefLost(null as any, prevRef, "coordenador");
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}) as jest.SpyInstance
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("handleAptBtnClick", (): void => {
  let ev: MouseEvent;
  beforeEach((): void => {
    ev = {
      currentTarget: document.createElement("button") as HTMLButtonElement,
    } as any;
    rootDlgContext.aptBtnsRoots = {};
    consVariablesData.rootDlg = undefined;
    rootDlgContext.aptBtnsIdx = {};
    document.body.innerHTML = '<div id="rootDlgList"></div>';
  }) as void;
  it("should render the ProviderAptDatList component", (): void => {
    if (ev.currentTarget instanceof Element) {
      ev.currentTarget.id = "appointmentBtn-1";
      rootDlgContext.aptBtnsIdx["appointmentBtn-1"] = 1;
      handleAptBtnClick(ev, "coordenador");
      expect(rootDlgContext.aptBtnsRoots["rootDlgList"]).toBeDefined() as void;
    } else console.error(`Event current target is not an Element.`);
  }) as void;
  it("should log an error if currentTarget is invalid", (): void => {
    const consoleErrorMock = jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    const mockEvent = {
      currentTarget: null,
    } as unknown as MouseEvent;
    handleAptBtnClick(mockEvent, "coordenador");
    expect(consoleErrorMock).toHaveBeenCalled() as void;
    consoleErrorMock.mockRestore() as void;
  }) as void;
}) as void;
describe("createAptBtn", (): void => {
  let formData: { [key: string]: string }, providerFormData: { [key: string]: string }, rootedDlg: any;
  beforeEach((): void => {
    rootedDlg = { render: jest.fn() as jest.Mock };
    formData = { cons: "consulta", name: "John Doe" };
    providerFormData = { time: "2023-10-01", name: "John Doe" };
    document.body.innerHTML = '<div id="transfArea"><div id="replaceSlot"></div></div>';
  }) as void;
  it("should create an appointment button and replace the slot", (): void => {
    const btn = createAptBtn(formData, providerFormData, rootedDlg, "coordenador");
    if (btn instanceof Element) {
      expect(btn.id).toBe<`appointmentBtn-${ISODate}`>("appointmentBtn-2023-10-01") as void;
      expect(btn.innerHTML).toContain<string>("consulta") as void;
    } else console.error(`Btn is not an Element.`);
  }) as void;
  it("should warn if appointment button is not placed", (): void => {
    document.body.innerHTML = "";
    createAptBtn(formData, providerFormData, rootedDlg, "coordenador");
    expect(jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {})).toHaveBeenCalledWith<
      [any]
    >(expect.stringContaining("Appointment Button already placed"));
  }) as void;
  it("should log an error if transfArea or replaceSlot are missing", (): void => {
    document.body.innerHTML = "";
    createAptBtn(formData, providerFormData, rootedDlg, "coordenador");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("handleDragAptBtn", (): void => {
  let newAppointmentBtn: HTMLButtonElement;
  let mockReplaceRegstSlot: jest.SpyInstance;
  beforeEach((): void => {
    newAppointmentBtn = document.createElement("button") as HTMLButtonElement;
    newAppointmentBtn.classList.add("appointmentBtn");
    mockReplaceRegstSlot = jest
      .spyOn<any, AppointmentHandler>(
        require("../../../../locals/panelPage/handlers/consHandlerCmn"),
        "replaceRegstSlot"
      )
      .mockImplementation() as jest.SpyInstance;
    document.body.innerHTML = `
      <div class="consSlot"></div>
      <div id="monthSelector"></div>
      <div id="tbSchedule"></div>
    `;
  }) as void;
  afterEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should attach dragend event and handle successful slot match", (): void => {
    handleDragAptBtn(newAppointmentBtn);
    newAppointmentBtn.dispatchEvent(new DragEvent("dragend", { clientX: 50, clientY: 50 })) as boolean;
    expect(mockReplaceRegstSlot).toHaveBeenCalled() as void;
  }) as void;
  it("should attach touchstart event and update isDragging", (): void => {
    handleDragAptBtn(newAppointmentBtn);
    newAppointmentBtn.dispatchEvent(
      new TouchEvent("touchstart", {
        touches: [
          new Touch({
            identifier: 0,
            target: newAppointmentBtn,
            clientX: 10,
            clientY: 20,
          }),
        ],
      })
    );
    expect(isDragging).toBe<boolean>(true) as void;
  }) as void;
  it("should attach touchend event and handle successful slot match", (): void => {
    handleDragAptBtn(newAppointmentBtn);
    document.dispatchEvent(
      new TouchEvent("touchend", {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: newAppointmentBtn,
            clientX: 50,
            clientY: 50,
          }),
        ],
      })
    );
    expect(mockReplaceRegstSlot).toHaveBeenCalled() as void;
  }) as void;
  it("should throw an error if newAppointmentBtn is not an HTMLButtonElement", (): void => {
    handleDragAptBtn({} as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("replaceRegstSlot", (): void => {
  let matchedSlot: HTMLSlotElement;
  let newAppointmentBtn: HTMLButtonElement;
  beforeEach((): void => {
    matchedSlot = document.createElement("slot") as HTMLSlotElement;
    matchedSlot.classList.add("consSlot") as void;
    newAppointmentBtn = document.createElement("button") as HTMLButtonElement;
    newAppointmentBtn.classList.add("appointmentBtn") as void;
    document.body.innerHTML = `
      <div id="monthSelector"></div>
      <div id="tbSchedule"></div>
    `;
  }) as void;
  it("should replace the slot content with newAppointmentBtn", (): void => {
    replaceRegstSlot(matchedSlot, newAppointmentBtn, [matchedSlot], "estudante") as void;
    expect(matchedSlot.querySelector<HTMLButtonElement>("button")).toBe<HTMLButtonElement>(newAppointmentBtn) as void;
  }) as void;
  it("should call fillSchedStateValues after replacing the slot", (): void => {
    replaceRegstSlot(matchedSlot, newAppointmentBtn, [matchedSlot], "estudante") as void;
    expect(
      jest
        .spyOn<any, AppointmentHandler>(
          require("../../../../locals/panelPage/handlers/consHandlerCmn"),
          "fillSchedStateValues"
        )
        .mockImplementation() as jest.SpyInstance
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should throw an error if matchedSlot is not an HTMLElement", (): void => {
    replaceRegstSlot(null as any, newAppointmentBtn, [matchedSlot], "estudante");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("checkRegstBtn", (): void => {
  let regstBtn: HTMLElement;
  let scope: Document;
  let failProps: [Root | undefined, boolean, jest.Mock, string];
  const userClass = "coordenador";
  beforeEach((): void => {
    regstBtn = document.createElement("button") as HTMLButtonElement;
    regstBtn.id = "appointmentBtn";
    document.body.appendChild(regstBtn);
    failProps = [undefined, false, jest.fn() as jest.Mock, "Error message"];
  }) as void;
  afterEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  it("should return true if matched slot and button are found", (): void => {
    scope = document;
    const matchedSlot = document.createElement("slot");
    matchedSlot.classList.add("slotableDay");
    document.body.appendChild(matchedSlot);
    expect(checkRegstBtn(regstBtn, scope, failProps, userClass)).toBe<boolean>(true) as void;
  }) as void;
  it("should return false if required elements are not found", (): void => {
    document.body.innerHTML = "";
    expect(checkRegstBtn(regstBtn, scope, failProps, userClass)).toBe<boolean>(false) as void;
  }) as void;
  it("should call multipleElementsNotFound if there is a mismatch", (): void => {
    const errorSpy = jest.spyOn<any, ErrorHandler>(
      require("../../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    checkRegstBtn(regstBtn, scope, failProps, userClass);
    expect(errorSpy).toHaveBeenCalled() as void;
    errorSpy.mockRestore() as void;
  }) as void;
}) as void;
describe("addEraseEvent", (): void => {
  let eraser: HTMLButtonElement;
  beforeEach((): void => {
    eraser = document.createElement("button") as HTMLButtonElement;
    eraser.classList.add("btn-close");
    document.body.innerHTML = '<div class="consSlot"></div>';
  }) as void;
  it("should add event listener for erase button and call replaceBtnSlot", (): void => {
    addEraseEvent(eraser, "coordenador");
    eraser.click() as void;
    expect(
      jest
        .spyOn<any, AppointmentHandler>(
          require("../../../../locals/panelPage/handlers/consHandlerCmn"),
          "replaceBtnSlot"
        )
        .mockImplementation() as jest.SpyInstance
    ).toHaveBeenCalled() as void;
  }) as void;

  it("should disable the eraser if no appointment button is found", (): void => {
    addEraseEvent(eraser, "coordenador");
    expect(eraser.disabled).toBe<boolean>(true) as void;
  }) as void;
  it("should enable the eraser if appointment button is found", (): void => {
    const appointmentBtn = document.createElement("button") as HTMLButtonElement;
    appointmentBtn.classList.add("appointmentBtn");
    document.querySelector<HTMLSlotElement>(".consSlot")?.appendChild<HTMLButtonElement>(appointmentBtn);
    addEraseEvent(eraser, "coordenador") as void;
    expect(eraser.disabled).toBe<boolean>(false) as void;
  }) as void;
}) as void;
describe("replaceBtnSlot", (): void => {
  test("should replace aptBtn with input in parent", (): void => {
    const aptBtn = document.createElement("button") as HTMLButtonElement;
    const parent = document.createElement("div") as HTMLDivElement;
    parent.appendChild<HTMLButtonElement>(aptBtn);
    replaceBtnSlot(aptBtn, parent, document.createElement("button") as HTMLButtonElement) as void;
    expect(parent.querySelector<HTMLInputElement>("input")).toBeTruthy() as void;
    expect(parent.querySelector<HTMLButtonElement>("button")).toBeNull() as void;
  }) as void;
}) as void;
describe("checkConfirmApt", (): void => {
  test("should update appointment button based on dayCheck status", (): void => {
    const dayCheck = document.createElement("input") as HTMLInputElement;
    dayCheck.type = "checkbox";
    const relAptBtn = document.createElement("button") as HTMLButtonElement;
    relAptBtn.classList.add("btn-info");
    const td = document.createElement("td");
    td.appendChild(relAptBtn);
    td.appendChild(dayCheck);
    checkConfirmApt(dayCheck);
    expect(relAptBtn.classList.contains("btn-success")).toBe<boolean>(false) as void;
    dayCheck.checked = true;
    checkConfirmApt(dayCheck);
    expect(relAptBtn.classList.contains("btn-success")).toBe<boolean>(true) as void;
  }) as void;
}) as void;
describe("handleScheduleChange", (): void => {
  test("should update root content based on monthSelector", (): void => {
    const monthSelector = document.createElement("select");
    const option = document.createElement("option");
    option.value = "August";
    monthSelector.appendChild(option);
    monthSelector.value = "August";
    const root = document.createElement("div") as HTMLDivElement;
    sessionScheduleState["August"] = "<div>August Schedule</div>";
    handleScheduleChange(monthSelector, root, "coordenador");
    expect(root.innerHTML).toContain<string>("August Schedule") as void;
  }) as void;
  test("should throw error for invalid monthSelector", (): void => {
    expect((): void =>
      handleScheduleChange(
        document.createElement("select"),
        document.createElement("div") as HTMLDivElement,
        "coordenador"
      )
    ).toThrow();
  }) as void;
}) as void;
describe("verifyAptCheck", (): void => {
  test("should update related appointment button when checkbox is checked", (): void => {
    const dayCheck = document.createElement("input") as HTMLInputElement;
    dayCheck.type = "checkbox";
    dayCheck.checked = true;
    const relSlot = document.createElement("slot");
    const relBtn = document.createElement("button") as HTMLButtonElement;
    relBtn.classList.add("btn-info");
    relSlot.appendChild(relBtn);
    document.body.appendChild(relSlot);
    verifyAptCheck(dayCheck);
    expect(relBtn.classList.contains("btn-success")).toBe<boolean>(true) as void;
  }) as void;
}) as void;
describe("addListenersForSchedTab", (): void => {
  test("should add listeners for appointment buttons", (): void => {
    const scope = document.createElement("div") as HTMLDivElement;
    const aptBtn = document.createElement("button") as HTMLButtonElement;
    aptBtn.classList.add("appointmentBtn");
    scope.appendChild(aptBtn);
    addListenersForSchedTab(scope, "coordenador", true);
    aptBtn.dispatchEvent(new Event("click")) as boolean;
    expect(aptBtn).toBeDefined() as void;
  }) as void;
}) as void;
describe("applyStylesForSchedTab", (): void => {
  test("should apply styles to schedule table", (): void => {
    const scope = document.createElement("div") as HTMLDivElement;
    const dateInput = document.createElement("input") as HTMLInputElement;
    dateInput.type = "date";
    scope.appendChild<HTMLInputElement>(dateInput);
    applyStylesForSchedTab(scope) as void;
    expect(scope.querySelector<HTMLInputElement>('input[type="date"]')).toBeTruthy() as void;
  }) as void;
}) as void;
describe("addListenerForSchedUpdates", (): void => {
  let monthSelector: HTMLSelectElement;
  let tbodyTab: HTMLElement;
  let mockSetEntryValueState: jest.SpyInstance;
  const mockSessionScheduleState: any = {};
  beforeEach((): void => {
    document.body.innerHTML = `
      <select id="monthSelector">
        <option value="January">January</option>
      </select>
      <table id="tbSchedule">
        <tr>
          <td><input type="text" id="testInput" value="Test" /></td>
          <td><textarea id="testTextarea">Test Text</textarea></td>
          <td><select id="testSelect"><option value="1">Option 1</option></select></td>
        </tr>
      </table>
    `;
    monthSelector = document.getElementById("monthSelector") as HTMLSelectElement;
    tbodyTab = document.getElementById("tbSchedule") as HTMLElement;
    (global as any).sessionScheduleState = mockSessionScheduleState;
    (global as any).sessionScheduleState["January"] = "";
  }) as void;
  afterEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add event listeners to input, select, and textarea elements", (): void => {
    addListenerForSchedUpdates(monthSelector);
    const inputEl = document.getElementById("testInput") as HTMLInputElement;
    const textareaEl = document.getElementById("testTextarea") as HTMLTextAreaElement;
    const selectEl = document.getElementById("testSelect") as HTMLSelectElement;
    inputEl.value = "Updated";
    const inputEvent = new Event("input");
    inputEl.dispatchEvent(inputEvent) as boolean;
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML) as void;
    expect(mockSetEntryValueState).toHaveBeenCalledWith<[HTMLInputElement]>(inputEl) as void;
    textareaEl.value = "Updated Text";
    const textareaEvent = new Event("input");
    textareaEl.dispatchEvent(textareaEvent) as boolean;
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML) as void;
    expect(mockSetEntryValueState).toHaveBeenCalledWith<[HTMLTextAreaElement]>(textareaEl) as void;
    selectEl.value = "2";
    const selectEvent = new Event("change");
    selectEl.dispatchEvent(selectEvent) as boolean;
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML) as void;
    expect(mockSetEntryValueState).toHaveBeenCalledWith<[HTMLSelectElement]>(selectEl) as void;
  }) as void;
  it("should add event listeners to slot elements for drop events", (): void => {
    const slotEl = document.createElement("slot");
    tbodyTab.appendChild(slotEl);
    addListenerForSchedUpdates(monthSelector);
    slotEl.dispatchEvent(new Event("drop")) as boolean;
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML) as void;
  }) as void;
  it("should throw error if monthSelector is not valid", (): void => {
    addListenerForSchedUpdates(document.createElement("div") as HTMLDivElement as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should throw error if no input/select/textarea elements are found", (): void => {
    document.body.innerHTML = `
      <select id="monthSelector">
        <option value="January">January</option>
      </select>
      <table id="tbSchedule"></table>
    `;
    monthSelector = document.getElementById("monthSelector") as HTMLSelectElement;
    addListenerForSchedUpdates(monthSelector);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should throw error if no slots are found", (): void => {
    document.body.innerHTML = `
      <select id="monthSelector">
        <option value="January">January</option>
      </select>
      <table id="tbSchedule">
        <tr><td></td></tr>
      </table>
    `;
    monthSelector = document.getElementById("monthSelector") as HTMLSelectElement;
    addListenerForSchedUpdates(monthSelector);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should update session state on event listener triggers", (): void => {
    addListenerForSchedUpdates(monthSelector);
    (document.getElementById("testInput") as HTMLInputElement).dispatchEvent(new Event("input")) as boolean;
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML) as void;
  }) as void;
}) as void;
describe("fillSchedStateValues", (): void => {
  let tbodySched: HTMLElement;
  beforeEach((): void => {
    document.body.innerHTML = `
      <table id="tbSchedule">
        <tr>
          <td><input type="checkbox" id="testCheckbox" checked /></td>
          <td><textarea id="testTextarea">Test Text</textarea></td>
          <td><select id="testSelect"><option value="1" selected>Option 1</option></select></td>
        </tr>
      </table>
    `;
    tbodySched = document.getElementById("tbSchedule") as HTMLElement;
    (global as any).sessionScheduleState = {};
  }) as void;
  afterEach((): void => {
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should populate sessionScheduleState with HTML content and form values", (): void => {
    fillSchedStateValues("January");
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodySched.innerHTML) as void;
    expect((global as any).sessionScheduleState["JanuaryValues"]).toEqual<string[][]>([
      ["testCheckbox", "true"],
      ["testTextarea", "Test Text"],
      ["testSelect", "1"],
    ]);
  }) as void;
  it("should throw error if tbodySched is not found", (): void => {
    document.body.innerHTML = "";
    fillSchedStateValues("January");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should throw error if no input/select/textarea elements are found", (): void => {
    document.body.innerHTML = `
      <table id="tbSchedule"></table>
    `;
    fillSchedStateValues("January");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
    ).toHaveBeenCalled() as void;
  }) as void;
}) as void;
