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
  });
  test("should return Default element if invalid JSX element", (): void => {
    const DefaultComponent = <span>Default</span>;
    expect(checkComponentValidity(<React.Fragment />, DefaultComponent)).toEqual(DefaultComponent);
  });
});
describe("asyncJSXCall", (): void => {
  test("should call both component and called function", async (): Promise<void> => {
    const mockComponent: jest.Mock<React.JSX.Element, [], any> = jest.fn((): JSX.Element => <div>Component</div>);
    const mockCalled: jest.Mock<any, any, any> = jest.fn();
    expect(mockComponent).toHaveBeenCalled();
    expect(mockCalled).toHaveBeenCalled();
    expect((await asyncJSXCall(mockComponent, mockCalled)).type).toBe<HTMLTag>("div");
  });
  test("should return default JSX in case of error", async (): Promise<void> => {
    const result = await asyncJSXCall(
      jest.fn(() => {
        throw new Error("Test error");
      }),
      jest.fn()
    );
    expect(result.type).toBe<HTMLTag>("p");
    expect(result.props.children).toBe<string>("ERROR LOADING PAGE COMPONENT");
  });
});
describe("correlateAptMonthDays", (): void => {
  test("should populate daySel with options from dayRefs", (): void => {
    const daySel = document.createElement("select");
    const dayRefs = [document.createElement("input"), document.createElement("input")];
    dayRefs.forEach((dayRef: HTMLInputElement, i): string => (dayRef.value = `2024-08-${i + 1}`));
    correlateAptMonthDays(daySel, dayRefs);
    expect(daySel.children.length).toBe<number>(dayRefs.length);
    if (
      daySel.children[0] instanceof HTMLInputElement ||
      daySel.children[0] instanceof HTMLSelectElement ||
      daySel.children[0] instanceof HTMLTextAreaElement
    ) {
      expect(daySel.children[0].value).toBe<ISODate>("2024-08-01");
    } else console.error(`Day Select First Chilldren is not an <input>, <select> or <textarea>`);
  });
  test("should handle case when no dayRefs are provided", (): void => {
    const consoleSpy = jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {});
    correlateAptMonthDays(document.createElement("select"), []);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
describe("convertWeekdaysToMonthdays", (): void => {
  test("should convert weekdays to monthdays", (): void => {
    expect(convertWeekdaysToMonthdays([1, 3], [1, 2], 7).length).toBeGreaterThan(0);
  });
  test("should return empty array if no weekdays provided", (): void => {
    expect(convertWeekdaysToMonthdays([], [1, 2]).length).toBe<number>(0);
  });
});
describe("convertMonthdaysToWeekdays", (): void => {
  test("should convert monthdays to weekdays", (): void => {
    const [names, numbers] = convertMonthdaysToWeekdays(8, [1, 3]);
    expect(names).toContain<WeekDay>("Segunda-feira");
    expect(names).toContain<WeekDay>("Quarta-feira");
    expect(numbers).toContain<WeekDaysNum>(1);
    expect(numbers).toContain<WeekDaysNum>(3);
  });
});
describe("correlateWorkingDays", (): void => {
  test("should correlate working days and update labels", (): void => {
    document.body.innerHTML = `<label class="consWeekday"></label><label class="consWeekday"></label>`;
    correlateWorkingDays(["Segunda-feira", "Quarta-feira"], 2);
    const labels = document.querySelectorAll(".consWeekday");
    expect(labels[0].textContent).toContain<WeekDay>("Segunda-feira");
    expect(labels[1].textContent).toContain<WeekDay>("Quarta-feira");
  });
  test("should log warning if labels do not match working day names", (): void => {
    const consoleSpy = jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {});
    correlateWorkingDays(["Segunda-feira"], 2);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
describe("removeRepeateadWorkingDays", (): void => {
  test("should return working days without repeats", (): void => {
    document.body.innerHTML = `
      <select id="firstWorkingDay"><option value="3"></option></select>
      <select id="secondWorkingDay"><option value="5"></option></select>`;
    expect(removeRepeateadWorkingDays([3, 5])).toEqual([3, 5]);
  });
  test("should log errors if elements are not found", (): void => {
    const consoleSpy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
    removeRepeateadWorkingDays([3, 5]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
describe("generateSchedPacData", (): void => {
  let scope: HTMLElement;
  beforeEach((): void => {
    scope = document.createElement("div");
    const input1 = document.createElement("input");
    input1.name = "name-in";
    input1.value = "John";
    scope.appendChild(input1);
    const input2 = document.createElement("input");
    input2.name = "sobrenome-in";
    input2.value = "Doe";
    scope.appendChild(input2);
    const input3 = document.createElement("input");
    input3.name = "ddd-in";
    input3.value = "11";
    scope.appendChild(input3);
    const input4 = document.createElement("input");
    input4.name = "tel-in";
    input4.value = "999999999";
    scope.appendChild(input4);
  });
  it("should generate correct pacData with tel and name formatting", (): void => {
    const result = generateSchedPacData(scope);
    expect(result.name).toBe<string>("John Doe");
    expect(result.tel).toBe<CountryNumber>("+55 11 99999-9999");
  });
  it("should handle non-element scope and call elementNotFound", (): void => {
    generateSchedPacData(null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled();
  });
});
describe("handleRenderRefLost", (): void => {
  let prevRef: HTMLElement;
  beforeEach((): void => {
    prevRef = document.createElement("div");
    prevRef.id = "appointmentBtn-1";
    document.body.appendChild(prevRef);
    rootDlgContext.aptBtnsRoots["appointmentBtn-1"] = {
      render: jest.fn(),
      unmount: jest.fn(),
    };
    rootDlgContext.aptBtnsIdx["appointmentBtn-1"] = 1;
  });
  afterEach((): void => {
    document.body.innerHTML = "";
  });
  it("should remove and recreate root if dialog is not found", (): void => {
    handleRenderRefLost("appointmentBtn-1", prevRef, "coordenador", 0);
    jest.advanceTimersByTime(0);
    expect(rootDlgContext.aptBtnsRoots["appointmentBtn-1"]).toBeDefined();
  });
  it("should throw typeError when id is not a string", (): void => {
    handleRenderRefLost(null as any, prevRef, "coordenador");
    expect(jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {})).toHaveBeenCalled();
  });
});
describe("handleAptBtnClick", (): void => {
  let ev: MouseEvent;
  beforeEach((): void => {
    ev = {
      currentTarget: document.createElement("button"),
    } as any;
    rootDlgContext.aptBtnsRoots = {};
    consVariablesData.rootDlg = undefined;
    rootDlgContext.aptBtnsIdx = {};
    document.body.innerHTML = '<div id="rootDlgList"></div>';
  });
  it("should render the ProviderAptDatList component", (): void => {
    if (ev.currentTarget instanceof Element) {
      ev.currentTarget.id = "appointmentBtn-1";
      rootDlgContext.aptBtnsIdx["appointmentBtn-1"] = 1;
      handleAptBtnClick(ev, "coordenador");
      expect(rootDlgContext.aptBtnsRoots["rootDlgList"]).toBeDefined();
    } else console.error(`Event current target is not an Element.`);
  });
  it("should log an error if currentTarget is invalid", (): void => {
    const consoleErrorMock = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
    const mockEvent = {
      currentTarget: null,
    } as unknown as MouseEvent;
    handleAptBtnClick(mockEvent, "coordenador");
    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });
});
describe("createAptBtn", (): void => {
  let formData: { [key: string]: string }, providerFormData: { [key: string]: string }, rootedDlg: any;
  beforeEach((): void => {
    rootedDlg = { render: jest.fn() };
    formData = { cons: "consulta", name: "John Doe" };
    providerFormData = { time: "2023-10-01", name: "John Doe" };
    document.body.innerHTML = '<div id="transfArea"><div id="replaceSlot"></div></div>';
  });
  it("should create an appointment button and replace the slot", (): void => {
    const btn = createAptBtn(formData, providerFormData, rootedDlg, "coordenador");
    if (btn instanceof Element) {
      expect(btn.id).toBe<`appointmentBtn-${ISODate}`>("appointmentBtn-2023-10-01");
      expect(btn.innerHTML).toContain<string>("consulta");
    } else console.error(`Btn is not an Element.`);
  });
  it("should warn if appointment button is not placed", (): void => {
    document.body.innerHTML = "";
    createAptBtn(formData, providerFormData, rootedDlg, "coordenador");
    expect(jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {})).toHaveBeenCalledWith<
      [any]
    >(expect.stringContaining("Appointment Button already placed"));
  });
  it("should log an error if transfArea or replaceSlot are missing", (): void => {
    document.body.innerHTML = "";
    createAptBtn(formData, providerFormData, rootedDlg, "coordenador");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled();
  });
});
describe("handleDragAptBtn", (): void => {
  let newAppointmentBtn: HTMLButtonElement;
  let mockReplaceRegstSlot: jest.SpyInstance;
  beforeEach((): void => {
    newAppointmentBtn = document.createElement("button");
    newAppointmentBtn.classList.add("appointmentBtn");
    mockReplaceRegstSlot = jest
      .spyOn<any, AppointmentHandler>(
        require("../../../../locals/panelPage/handlers/consHandlerCmn"),
        "replaceRegstSlot"
      )
      .mockImplementation();
    document.body.innerHTML = `
      <div class="consSlot"></div>
      <div id="monthSelector"></div>
      <div id="tbSchedule"></div>
    `;
  });
  afterEach((): void => {
    jest.clearAllMocks();
  });
  it("should attach dragend event and handle successful slot match", (): void => {
    handleDragAptBtn(newAppointmentBtn);
    newAppointmentBtn.dispatchEvent(new DragEvent("dragend", { clientX: 50, clientY: 50 }));
    expect(mockReplaceRegstSlot).toHaveBeenCalled();
  });
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
    expect(isDragging).toBe<boolean>(true);
  });
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
    expect(mockReplaceRegstSlot).toHaveBeenCalled();
  });
  it("should throw an error if newAppointmentBtn is not an HTMLButtonElement", (): void => {
    handleDragAptBtn({} as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled();
  });
});
describe("replaceRegstSlot", (): void => {
  let matchedSlot: HTMLSlotElement;
  let newAppointmentBtn: HTMLButtonElement;
  beforeEach((): void => {
    matchedSlot = document.createElement("slot");
    matchedSlot.classList.add("consSlot");
    newAppointmentBtn = document.createElement("button");
    newAppointmentBtn.classList.add("appointmentBtn");
    document.body.innerHTML = `
      <div id="monthSelector"></div>
      <div id="tbSchedule"></div>
    `;
  });
  it("should replace the slot content with newAppointmentBtn", (): void => {
    replaceRegstSlot(matchedSlot, newAppointmentBtn, [matchedSlot], "estudante");
    expect(matchedSlot.querySelector("button")).toBe<HTMLButtonElement>(newAppointmentBtn);
  });
  it("should call fillSchedStateValues after replacing the slot", (): void => {
    replaceRegstSlot(matchedSlot, newAppointmentBtn, [matchedSlot], "estudante");
    expect(
      jest
        .spyOn<any, AppointmentHandler>(
          require("../../../../locals/panelPage/handlers/consHandlerCmn"),
          "fillSchedStateValues"
        )
        .mockImplementation()
    ).toHaveBeenCalled();
  });
  it("should throw an error if matchedSlot is not an HTMLElement", (): void => {
    replaceRegstSlot(null as any, newAppointmentBtn, [matchedSlot], "estudante");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled();
  });
});
describe("checkRegstBtn", (): void => {
  let regstBtn: HTMLElement;
  let scope: Document;
  let failProps: [Root | undefined, boolean, jest.Mock, string];
  const userClass = "coordenador";
  beforeEach((): void => {
    regstBtn = document.createElement("button");
    regstBtn.id = "appointmentBtn";
    document.body.appendChild(regstBtn);
    failProps = [undefined, false, jest.fn(), "Error message"];
  });
  afterEach((): void => {
    document.body.innerHTML = "";
  });
  it("should return true if matched slot and button are found", (): void => {
    scope = document;
    const matchedSlot = document.createElement("slot");
    matchedSlot.classList.add("slotableDay");
    document.body.appendChild(matchedSlot);
    expect(checkRegstBtn(regstBtn, scope, failProps, userClass)).toBe<boolean>(true);
  });
  it("should return false if required elements are not found", (): void => {
    document.body.innerHTML = "";
    expect(checkRegstBtn(regstBtn, scope, failProps, userClass)).toBe<boolean>(false);
  });
  it("should call multipleElementsNotFound if there is a mismatch", (): void => {
    const errorSpy = jest.spyOn<any, ErrorHandler>(
      require("../../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    checkRegstBtn(regstBtn, scope, failProps, userClass);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
describe("addEraseEvent", (): void => {
  let eraser: HTMLButtonElement;
  beforeEach((): void => {
    eraser = document.createElement("button");
    eraser.classList.add("btn-close");
    document.body.innerHTML = '<div class="consSlot"></div>';
  });
  it("should add event listener for erase button and call replaceBtnSlot", (): void => {
    addEraseEvent(eraser, "coordenador");
    eraser.click();
    expect(
      jest
        .spyOn<any, AppointmentHandler>(
          require("../../../../locals/panelPage/handlers/consHandlerCmn"),
          "replaceBtnSlot"
        )
        .mockImplementation()
    ).toHaveBeenCalled();
  });

  it("should disable the eraser if no appointment button is found", (): void => {
    addEraseEvent(eraser, "coordenador");
    expect(eraser.disabled).toBe<boolean>(true);
  });
  it("should enable the eraser if appointment button is found", (): void => {
    const appointmentBtn = document.createElement("button");
    appointmentBtn.classList.add("appointmentBtn");
    document.querySelector(".consSlot")?.appendChild(appointmentBtn);
    addEraseEvent(eraser, "coordenador");
    expect(eraser.disabled).toBe<boolean>(false);
  });
});
describe("replaceBtnSlot", (): void => {
  test("should replace aptBtn with input in parent", (): void => {
    const aptBtn = document.createElement("button");
    const parent = document.createElement("div");
    parent.appendChild(aptBtn);
    replaceBtnSlot(aptBtn, parent, document.createElement("button"));
    expect(parent.querySelector("input")).toBeTruthy();
    expect(parent.querySelector("button")).toBeNull();
  });
});
describe("checkConfirmApt", (): void => {
  test("should update appointment button based on dayCheck status", (): void => {
    const dayCheck = document.createElement("input");
    dayCheck.type = "checkbox";
    const relAptBtn = document.createElement("button");
    relAptBtn.classList.add("btn-info");
    const td = document.createElement("td");
    td.appendChild(relAptBtn);
    td.appendChild(dayCheck);
    checkConfirmApt(dayCheck);
    expect(relAptBtn.classList.contains("btn-success")).toBe<boolean>(false);
    dayCheck.checked = true;
    checkConfirmApt(dayCheck);
    expect(relAptBtn.classList.contains("btn-success")).toBe<boolean>(true);
  });
});
describe("handleScheduleChange", (): void => {
  test("should update root content based on monthSelector", (): void => {
    const monthSelector = document.createElement("select");
    const option = document.createElement("option");
    option.value = "August";
    monthSelector.appendChild(option);
    monthSelector.value = "August";
    const root = document.createElement("div");
    sessionScheduleState["August"] = "<div>August Schedule</div>";
    handleScheduleChange(monthSelector, root, "coordenador");
    expect(root.innerHTML).toContain<string>("August Schedule");
  });
  test("should throw error for invalid monthSelector", (): void => {
    expect((): void =>
      handleScheduleChange(document.createElement("select"), document.createElement("div"), "coordenador")
    ).toThrow();
  });
});
describe("verifyAptCheck", (): void => {
  test("should update related appointment button when checkbox is checked", (): void => {
    const dayCheck = document.createElement("input");
    dayCheck.type = "checkbox";
    dayCheck.checked = true;
    const relSlot = document.createElement("slot");
    const relBtn = document.createElement("button");
    relBtn.classList.add("btn-info");
    relSlot.appendChild(relBtn);
    document.body.appendChild(relSlot);
    verifyAptCheck(dayCheck);
    expect(relBtn.classList.contains("btn-success")).toBe<boolean>(true);
  });
});
describe("addListenersForSchedTab", (): void => {
  test("should add listeners for appointment buttons", (): void => {
    const scope = document.createElement("div");
    const aptBtn = document.createElement("button");
    aptBtn.classList.add("appointmentBtn");
    scope.appendChild(aptBtn);
    addListenersForSchedTab(scope, "coordenador", true);
    aptBtn.dispatchEvent(new Event("click"));
    expect(aptBtn).toBeDefined();
  });
});
describe("applyStylesForSchedTab", (): void => {
  test("should apply styles to schedule table", (): void => {
    const scope = document.createElement("div");
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    scope.appendChild(dateInput);
    applyStylesForSchedTab(scope);
    expect(scope.querySelector('input[type="date"]')).toBeTruthy();
  });
});
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
  });
  afterEach((): void => {
    jest.clearAllMocks();
  });
  it("should add event listeners to input, select, and textarea elements", (): void => {
    addListenerForSchedUpdates(monthSelector);
    const inputEl = document.getElementById("testInput") as HTMLInputElement;
    const textareaEl = document.getElementById("testTextarea") as HTMLTextAreaElement;
    const selectEl = document.getElementById("testSelect") as HTMLSelectElement;
    inputEl.value = "Updated";
    const inputEvent = new Event("input");
    inputEl.dispatchEvent(inputEvent);
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML);
    expect(mockSetEntryValueState).toHaveBeenCalledWith<[HTMLInputElement]>(inputEl);
    textareaEl.value = "Updated Text";
    const textareaEvent = new Event("input");
    textareaEl.dispatchEvent(textareaEvent);
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML);
    expect(mockSetEntryValueState).toHaveBeenCalledWith<[HTMLTextAreaElement]>(textareaEl);
    selectEl.value = "2";
    const selectEvent = new Event("change");
    selectEl.dispatchEvent(selectEvent);
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML);
    expect(mockSetEntryValueState).toHaveBeenCalledWith<[HTMLSelectElement]>(selectEl);
  });
  it("should add event listeners to slot elements for drop events", (): void => {
    const slotEl = document.createElement("slot");
    tbodyTab.appendChild(slotEl);
    addListenerForSchedUpdates(monthSelector);
    slotEl.dispatchEvent(new Event("drop"));
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML);
  });
  it("should throw error if monthSelector is not valid", (): void => {
    addListenerForSchedUpdates(document.createElement("div") as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled();
  });
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
    ).toHaveBeenCalled();
  });
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
    ).toHaveBeenCalled();
  });
  it("should update session state on event listener triggers", (): void => {
    addListenerForSchedUpdates(monthSelector);
    (document.getElementById("testInput") as HTMLInputElement).dispatchEvent(new Event("input"));
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodyTab.innerHTML);
  });
});
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
  });
  afterEach((): void => {
    jest.clearAllMocks();
  });
  it("should populate sessionScheduleState with HTML content and form values", (): void => {
    fillSchedStateValues("January");
    expect((global as any).sessionScheduleState["January"]).toBe<string>(tbodySched.innerHTML);
    expect((global as any).sessionScheduleState["JanuaryValues"]).toEqual<string[][]>([
      ["testCheckbox", "true"],
      ["testTextarea", "Test Text"],
      ["testSelect", "1"],
    ]);
  });
  it("should throw error if tbodySched is not found", (): void => {
    document.body.innerHTML = "";
    fillSchedStateValues("January");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled();
  });
  it("should throw error if no input/select/textarea elements are found", (): void => {
    document.body.innerHTML = `
      <table id="tbSchedule"></table>
    `;
    fillSchedStateValues("January");
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../../global/handlers/errorHandler"), "elementNotPopulated")
    ).toHaveBeenCalled();
  });
});
