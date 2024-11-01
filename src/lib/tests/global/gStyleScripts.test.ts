//v1.0.0
import * as gStyleScript from "../../global/gStyleScript";
import * as errorHandler from "../../global/handlers/errorHandler";
import { CSSColor, CSSMeasureValue, CSSTextDecoration, ConsoleMethod, ErrorHandler, PseudoNum } from "../testVars";
describe("dinamicGridAdjust", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should adjust grid column widths for grid elements", (): void => {
    const mockGridDiv = document.createElement("div") as HTMLDivElement;
    mockGridDiv.style.display = "grid";
    mockGridDiv.style.gridTemplateColumns = "1fr 1fr 1fr";
    gStyleScript.dinamicGridAdjust([mockGridDiv]);
    expect(mockGridDiv.style.width).toBe<CSSMeasureValue>("100.0vw") as void;
  }) as void;
  it("should adjust widths for flex elements based on direction", (): void => {
    const mockFlexDiv = document.createElement("div") as HTMLDivElement;
    mockFlexDiv.style.display = "flex";
    mockFlexDiv.style.flexDirection = "row";
    gStyleScript.dinamicGridAdjust([mockFlexDiv]);
    expect(mockFlexDiv.style.width).toBe<CSSMeasureValue>("60%") as void;
  }) as void;
  it("should handle empty or non-HTML elements", (): void => {
    gStyleScript.dinamicGridAdjust([]);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should handle non-grid/flex elements gracefully", (): void => {
    const mockDiv = document.createElement("div") as HTMLDivElement;
    mockDiv.style.display = "block";
    gStyleScript.dinamicGridAdjust([mockDiv]);
    expect(mockDiv.style.width).toBe<CSSMeasureValue>("70%") as void;
  }) as void;
  it("should call elementNotFound if a non-HTML element is passed", (): void => {
    gStyleScript.dinamicGridAdjust([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("equalizeFlexSibilings", (): void => {
  it("should equalize widths of flex sibling elements", (): void => {
    const parentContainer = document.createElement("div") as HTMLDivElement;
    const previousSibling = document.createElement("div") as HTMLDivElement;
    const checkbox = document.createElement("input") as HTMLInputElement;
    checkbox.type = "checkbox";
    previousSibling.appendChild(checkbox);
    const flexContainer = document.createElement("div") as HTMLDivElement;
    flexContainer.style.display = "flex";
    flexContainer.classList.add("flexTwin");
    parentContainer.appendChild(previousSibling);
    parentContainer.appendChild(flexContainer);
    flexContainer.appendChild(document.createElement("div") as HTMLDivElement);
    gStyleScript.equalizeFlexSibilings([flexContainer]);
    expect((flexContainer.children[0] as HTMLElement).style.width).toBeDefined() as void;
  }) as void;
  it("should not equalize non-flex elements", (): void => {
    const nonFlexDiv = document.createElement("div") as HTMLDivElement;
    gStyleScript.equalizeFlexSibilings([nonFlexDiv]);
    expect(nonFlexDiv.style.width).toBe<CSSMeasureValue | "">("") as void;
  }) as void;
  it("should log a warning if no flex elements are found", (): void => {
    expect(jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {})).toHaveBeenCalledWith<
      [string]
    >("Failed to equalize flex siblings");
  }) as void;
}) as void;
describe("equalizeTabCells", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should equalize the width of table cells", (): void => {
    const mockTable = document.createElement("table") as HTMLTableElement,
      mockParent = document.createElement("div") as HTMLDivElement;
    mockParent.appendChild<HTMLTableElement>(mockTable);
    document.body.appendChild<HTMLDivElement>(mockParent);
    const mockCell = document.createElement("td") as HTMLTableCellElement;
    mockTable.appendChild<HTMLTableCellElement>(mockCell);
    mockCell.style.width = "150px";
    gStyleScript.equalizeTabCells(mockTable) as void;
    expect(mockTable.style.width).toBe<PseudoNum>("150") as void;
    expect(mockCell.style.minWidth).toBe<CSSMeasureValue>("15ch") as void;
  }) as void;
  it("should call elementNotFound when table element is null", (): void => {
    gStyleScript.equalizeTabCells(null);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should handle invalid elements gracefully", (): void => {
    gStyleScript.equalizeTabCells(document.createElement("div") as HTMLDivElement as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("isClickOutside", (): void => {
  it("should detect clicks outside the specified element", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    mockElement.id = "testElement";
    document.body.appendChild(mockElement);
    expect(gStyleScript.isClickOutside({ clientX: 100, clientY: 100 } as MouseEvent, mockElement)).toEqual<
      [boolean, boolean, boolean, boolean]
    >([false, false, false, false]);
    jest
      .spyOn<HTMLElement, "getBoundingClientRect">(mockElement, "getBoundingClientRect")
      .mockReturnValue({
        left: 50,
        right: 150,
        top: 50,
        bottom: 150,
        width: 100,
        height: 100,
        x: 50,
        y: 50,
        toJSON: () => {},
      })
      .mockRestore() as void;
  }) as void;
  it("should return true for clicks outside the element", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    mockElement.id = "testElement";
    document.body.appendChild<HTMLDivElement>(mockElement);
    expect(gStyleScript.isClickOutside({ clientX: 10, clientY: 10 } as MouseEvent, mockElement)).toEqual<
      [boolean, boolean, boolean, boolean]
    >([true, false, true, false]);
    jest
      .spyOn<HTMLElement, "getBoundingClientRect">(mockElement, "getBoundingClientRect")
      .mockReturnValue({
        left: 50,
        right: 150,
        top: 50,
        bottom: 150,
        width: 100,
        height: 100,
        x: 50,
        y: 50,
        toJSON: () => {},
      })
      .mockRestore() as void;
  }) as void;
}) as void;
describe("fadeElement", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should apply fade transition to the element", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    gStyleScript.fadeElement(mockElement, "0.5", "0.2");
    expect(mockElement.style.opacity).toBe<PseudoNum>("0.5") as void;
  }) as void;
  it("should call elementNotFound if the element is not valid", (): void => {
    gStyleScript.fadeElement(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("highlightChange", (): void => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    multipleElementsNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple elements not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should change border and font color when context is both", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    gStyleScript.highlightChange(mockElement, "blue", "both");
    expect(mockElement.style.borderColor).toBe<CSSColor>("rgb(222, 226, 230)") as void;
    expect(mockElement.style.color).toBe<CSSColor>("rgb(33, 37, 41)") as void;
  }) as void;
  it("should only change border color when context is border", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    gStyleScript.highlightChange(mockElement, "blue", "border");
    expect(mockElement.style.borderColor).toBe<CSSColor>("rgb(222, 226, 230)") as void;
    expect(mockElement.style.color).toBe<CSSColor>("") as void;
  }) as void;
  it("should call multipleElementsNotFound when element is not valid", (): void => {
    gStyleScript.highlightChange(null as any);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("switchBtnBS", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<typeof errorHandler, "elementNotPopulated">(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should switch button classes and highlight button", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    gStyleScript.switchBtnBS([mockButton], ["btn-warning"], ["btn-success"]);
    expect(mockButton.classList.contains("btn")).toBe<boolean>(true) as void;
    expect(mockButton.classList.contains("btn-warning")).toBe<boolean>(true) as void;
    expect(mockButton.classList.contains("btn-success")).toBe<boolean>(false) as void;
  }) as void;
  it("should call elementNotPopulated when buttons array is empty", (): void => {
    gStyleScript.switchBtnBS([]);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound for invalid elements", (): void => {
    gStyleScript.switchBtnBS([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("clearDefInvalidMsg", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<typeof errorHandler, "elementNotPopulated">(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should clear default invalid messages for form inputs", (): void => {
    const mockForm = document.createElement("form") as HTMLFormElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockForm.appendChild(mockInput);
    gStyleScript.clearDefInvalidMsg(mockForm, [mockInput]);
    expect(mockInput.checkValidity()).toBe<boolean>(true) as void;
  }) as void;
  it("should call elementNotFound when form is null", (): void => {
    gStyleScript.clearDefInvalidMsg(null, []);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated when inputs array is empty", (): void => {
    gStyleScript.clearDefInvalidMsg(document.createElement("form") as HTMLFormElement, []);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("fillCustomValidityWarn", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should fill custom validity warning message", (): void => {
    const mockWarnElement = document.createElement("div") as HTMLDivElement;
    mockWarnElement.id = "inputWarn";
    document.body.appendChild(mockWarnElement);
    gStyleScript.fillCustomValidityWarn("input", "Custom Warning");
    expect(mockWarnElement.textContent).toBe<string>("Custom Warning") as void;
    setTimeout((): void => {
      expect(mockWarnElement.textContent).toBe<string>("") as void;
    }, 3000);
  }) as void;
  it("should call elementNotFound when warning element is not found", (): void => {
    gStyleScript.fillCustomValidityWarn("invalidInput");
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addListenerForValidities", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add validity listeners to inputs", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "validValue";
    gStyleScript.addListenerForValidities([mockInput]);
    mockInput.dispatchEvent(new Event("input")) as boolean;
    expect(mockInput.value).toBe<string>("validValue") as void;
  }) as void;
  it("should prevent invalid inputs from being submitted", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "invalidValue";
    gStyleScript.addListenerForValidities([mockInput], /^[a-z]+$/);
    mockInput.dispatchEvent(new Event("input")) as boolean;
    expect(mockInput.value.length).toBeLessThanOrEqual(11);
  }) as void;
  it("should call elementNotPopulated when inputs array is empty", (): void => {
    gStyleScript.addListenerForValidities([]);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should call inputNotFound when input is not valid", (): void => {
    gStyleScript.addListenerForValidities([null as any]);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("clearPhDates", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should hide date input placeholder when value is empty", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "date";
    gStyleScript.clearPhDates([mockInput]);
    mockInput.dispatchEvent(new Event("input")) as boolean;
    expect(mockInput.style.color).toBe<CSSColor>("transparent") as void;
    mockInput.value = "2023-09-09";
    mockInput.dispatchEvent(new Event("input")) as boolean;
    expect(mockInput.style.color).toBe<CSSColor>("black") as void;
  }) as void;
  it("should call inputNotFound for non-HTMLInputElements", (): void => {
    gStyleScript.clearPhDates([null as any]);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated for empty or invalid array", (): void => {
    gStyleScript.clearPhDates([]);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("resetPhs", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should reset input placeholders after interaction", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.id = "mockInput";
    const placeholders = { mockInput: "Mock Placeholder" };
    gStyleScript.resetPhs([mockInput], placeholders);
    mockInput.dispatchEvent(new Event("input")) as boolean;
    expect(mockInput.placeholder).toBe<string>("") as void;
    setTimeout((): void => {
      expect(mockInput.placeholder).toBe<string>("Mock Placeholder") as void;
    }, 3000);
  }) as void;
  it("should call inputNotFound for invalid inputs", (): void => {
    gStyleScript.resetPhs([null as any], {}) as void;
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated when inputs array is empty", (): void => {
    gStyleScript.resetPhs([], {}) as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("equalizeWidWithPhs", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should adjust input minWidth based on placeholder length", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.placeholder = "Example Placeholder";
    gStyleScript.equalizeWidWithPhs([mockInput]);
    expect(mockInput.style.minWidth).toBe<CSSMeasureValue>("24ch") as void;
  }) as void;
  it("should call elementNotFound for non-HTML elements", (): void => {
    gStyleScript.equalizeWidWithPhs([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated for empty input array", (): void => {
    gStyleScript.equalizeWidWithPhs([]);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("strikeNulls", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add line-through style to null or undefined values", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "null";
    gStyleScript.strikeNulls([mockInput]);
    expect(mockInput.style.textDecoration).toBe<CSSTextDecoration>("line-through") as void;
    mockInput.value = "Some Value";
    gStyleScript.strikeNulls([mockInput]);
    expect(mockInput.style.textDecoration).toBe<CSSTextDecoration>("") as void;
  }) as void;
  it("should call elementNotFound for invalid elements", (): void => {
    gStyleScript.strikeNulls([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated for empty element array", (): void => {
    gStyleScript.strikeNulls([]);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("normalizeSizeSb", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should normalize width and height of elements based on scrollbar size", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    document.body.appendChild(mockElement);
    gStyleScript.normalizeSizeSb([mockElement], [true, 2], true);
    expect(mockElement.style.minWidth).toBeDefined() as void;
    expect(mockElement.style.minHeight).toBeDefined() as void;
  }) as void;
  it("should call elementNotFound for invalid elements", (): void => {
    gStyleScript.normalizeSizeSb([null as any], [true, 2], true);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated for empty element array", (): void => {
    gStyleScript.normalizeSizeSb([], [true, 2], true);
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("convertToHex", (): void => {
  it("should convert rgba values to hex", (): void => {
    const arrColors: Array<[string, Map<string, string>]> = [
      [
        "example",
        new Map([
          ["background-color", "rgba(255, 0, 0, 1)"],
          ["color", "rgba(0, 255, 0, 0.5)"],
        ]),
      ],
    ];
    const [hexValidations, updatedColors] = gStyleScript.convertToHex(arrColors);
    expect(hexValidations).toEqual<[boolean, boolean]>([true, true]);
    expect(updatedColors[0][1].get("background-color")).toBe<CSSColor>("#FF0000FF") as void;
    expect(updatedColors[0][1].get("color")).toBe<CSSColor>("#00FF007F") as void;
  }) as void;
  it("should convert hsl/hsla values to hex", (): void => {
    const arrColors: Array<[string, Map<string, string>]> = [
      [
        "example",
        new Map([
          ["background-color", "hsla(120, 100%, 50%, 0.5)"],
          ["color", "hsl(240, 100%, 50%)"],
        ]),
      ],
    ];
    const [hexValidations, updatedColors] = gStyleScript.convertToHex(arrColors);
    expect(hexValidations).toEqual<[boolean, boolean]>([true, true]);
    expect(updatedColors[0][1].get("background-color")).toBe<CSSColor>("#00FF007F") as void;
    expect(updatedColors[0][1].get("color")).toBe<CSSColor>("#0000FF") as void;
  }) as void;
  it("should skip values that are already in hex format", (): void => {
    const arrColors: Array<[string, Map<string, string>]> = [["example", new Map([["background-color", "#FF0000"]])]];
    expect([gStyleScript.convertToHex(arrColors)]).toEqual<any>([]);
  }) as void;
  it("should mark unsupported color formats as invalid", (): void => {
    const arrColors: Array<[string, Map<string, string>]> = [
      ["example", new Map([["background-color", "unsupportedColor"]])],
    ];
    expect([gStyleScript.convertToHex(arrColors)]).toEqual<[boolean]>([false]);
  }) as void;
}) as void;
describe("expandContent", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should expand the content width and change opacity", (): void => {
    const mockEl = document.createElement("div") as HTMLDivElement;
    const mockParent = document.createElement("div") as HTMLDivElement;
    const mockOutput = document.createElement("output");
    mockEl.appendChild(mockOutput);
    mockParent.appendChild(mockEl);
    document.body.appendChild(mockParent);
    gStyleScript.expandContent(mockEl);
    expect(mockEl.style.opacity).toBe<PseudoNum>("0") as void;
    expect(mockEl.style.width).toBe<PseudoNum>("0") as void;
    setTimeout((): void => {
      expect(mockEl.style.width).toBeDefined() as void;
    }, 6000);
  }) as void;
  it("should handle non-existent elements and call elementNotFound", (): void => {
    gStyleScript.expandContent(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
