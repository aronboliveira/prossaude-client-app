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
      .mockImplementation((): Error => new Error(`Element not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should adjust grid column widths for grid elements", (): void => {
    const mockGridDiv = document.createElement("div");
    mockGridDiv.style.display = "grid";
    mockGridDiv.style.gridTemplateColumns = "1fr 1fr 1fr";
    gStyleScript.dinamicGridAdjust([mockGridDiv]);
    expect(mockGridDiv.style.width).toBe<CSSMeasureValue>("100.0vw");
  });
  it("should adjust widths for flex elements based on direction", (): void => {
    const mockFlexDiv = document.createElement("div");
    mockFlexDiv.style.display = "flex";
    mockFlexDiv.style.flexDirection = "row";
    gStyleScript.dinamicGridAdjust([mockFlexDiv]);
    expect(mockFlexDiv.style.width).toBe<CSSMeasureValue>("60%");
  });
  it("should handle empty or non-HTML elements", (): void => {
    gStyleScript.dinamicGridAdjust([]);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
  it("should handle non-grid/flex elements gracefully", (): void => {
    const mockDiv = document.createElement("div");
    mockDiv.style.display = "block";
    gStyleScript.dinamicGridAdjust([mockDiv]);
    expect(mockDiv.style.width).toBe<CSSMeasureValue>("70%");
  });
  it("should call elementNotFound if a non-HTML element is passed", (): void => {
    gStyleScript.dinamicGridAdjust([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("equalizeFlexSibilings", (): void => {
  it("should equalize widths of flex sibling elements", (): void => {
    const parentContainer = document.createElement("div");
    const previousSibling = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    previousSibling.appendChild(checkbox);
    const flexContainer = document.createElement("div");
    flexContainer.style.display = "flex";
    flexContainer.classList.add("flexTwin");
    parentContainer.appendChild(previousSibling);
    parentContainer.appendChild(flexContainer);
    flexContainer.appendChild(document.createElement("div"));
    gStyleScript.equalizeFlexSibilings([flexContainer]);
    expect((flexContainer.children[0] as HTMLElement).style.width).toBeDefined();
  });
  it("should not equalize non-flex elements", (): void => {
    const nonFlexDiv = document.createElement("div");
    gStyleScript.equalizeFlexSibilings([nonFlexDiv]);
    expect(nonFlexDiv.style.width).toBe<CSSMeasureValue | "">("");
  });
  it("should log a warning if no flex elements are found", (): void => {
    expect(jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {})).toHaveBeenCalledWith<
      [string]
    >("Failed to equalize flex siblings");
  });
});
describe("equalizeTabCells", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should equalize the width of table cells", (): void => {
    const mockTable = document.createElement("table"),
      mockParent = document.createElement("div");
    mockParent.appendChild(mockTable);
    document.body.appendChild(mockParent);
    const mockCell = document.createElement("td");
    mockTable.appendChild(mockCell);
    mockCell.style.width = "150px";
    gStyleScript.equalizeTabCells(mockTable);
    expect(mockTable.style.width).toBe<PseudoNum>("150");
    expect(mockCell.style.minWidth).toBe<CSSMeasureValue>("15ch");
  });
  it("should call elementNotFound when table element is null", (): void => {
    gStyleScript.equalizeTabCells(null);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
  it("should handle invalid elements gracefully", (): void => {
    gStyleScript.equalizeTabCells(document.createElement("div") as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("isClickOutside", (): void => {
  it("should detect clicks outside the specified element", (): void => {
    const mockElement = document.createElement("div");
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
      .mockRestore();
  });
  it("should return true for clicks outside the element", (): void => {
    const mockElement = document.createElement("div");
    mockElement.id = "testElement";
    document.body.appendChild(mockElement);
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
      .mockRestore();
  });
});
describe("fadeElement", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should apply fade transition to the element", (): void => {
    const mockElement = document.createElement("div");
    gStyleScript.fadeElement(mockElement, "0.5", "0.2");
    expect(mockElement.style.opacity).toBe<PseudoNum>("0.5");
  });
  it("should call elementNotFound if the element is not valid", (): void => {
    gStyleScript.fadeElement(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("highlightChange", (): void => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    multipleElementsNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple elements not found.`));
    jest.clearAllMocks();
  });
  it("should change border and font color when context is both", (): void => {
    const mockElement = document.createElement("div");
    gStyleScript.highlightChange(mockElement, "blue", "both");
    expect(mockElement.style.borderColor).toBe<CSSColor>("rgb(222, 226, 230)");
    expect(mockElement.style.color).toBe<CSSColor>("rgb(33, 37, 41)");
  });
  it("should only change border color when context is border", (): void => {
    const mockElement = document.createElement("div");
    gStyleScript.highlightChange(mockElement, "blue", "border");
    expect(mockElement.style.borderColor).toBe<CSSColor>("rgb(222, 226, 230)");
    expect(mockElement.style.color).toBe<CSSColor>("");
  });
  it("should call multipleElementsNotFound when element is not valid", (): void => {
    gStyleScript.highlightChange(null as any);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
  });
});
describe("switchBtnBS", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<typeof errorHandler, "elementNotPopulated">(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should switch button classes and highlight button", (): void => {
    const mockButton = document.createElement("button");
    gStyleScript.switchBtnBS([mockButton], ["btn-warning"], ["btn-success"]);
    expect(mockButton.classList.contains("btn")).toBe<boolean>(true);
    expect(mockButton.classList.contains("btn-warning")).toBe<boolean>(true);
    expect(mockButton.classList.contains("btn-success")).toBe<boolean>(false);
  });
  it("should call elementNotPopulated when buttons array is empty", (): void => {
    gStyleScript.switchBtnBS([]);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
  it("should call elementNotFound for invalid elements", (): void => {
    gStyleScript.switchBtnBS([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("clearDefInvalidMsg", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<typeof errorHandler, "elementNotPopulated">(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should clear default invalid messages for form inputs", (): void => {
    const mockForm = document.createElement("form");
    const mockInput = document.createElement("input");
    mockForm.appendChild(mockInput);
    gStyleScript.clearDefInvalidMsg(mockForm, [mockInput]);
    expect(mockInput.checkValidity()).toBe<boolean>(true);
  });
  it("should call elementNotFound when form is null", (): void => {
    gStyleScript.clearDefInvalidMsg(null, []);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
  it("should call elementNotPopulated when inputs array is empty", (): void => {
    gStyleScript.clearDefInvalidMsg(document.createElement("form"), []);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
});
describe("fillCustomValidityWarn", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should fill custom validity warning message", (): void => {
    const mockWarnElement = document.createElement("div");
    mockWarnElement.id = "inputWarn";
    document.body.appendChild(mockWarnElement);
    gStyleScript.fillCustomValidityWarn("input", "Custom Warning");
    expect(mockWarnElement.textContent).toBe<string>("Custom Warning");
    setTimeout(() => {
      expect(mockWarnElement.textContent).toBe<string>("");
    }, 3000);
  });
  it("should call elementNotFound when warning element is not found", (): void => {
    gStyleScript.fillCustomValidityWarn("invalidInput");
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("addListenerForValidities", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should add validity listeners to inputs", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "validValue";
    gStyleScript.addListenerForValidities([mockInput]);
    mockInput.dispatchEvent(new Event("input"));
    expect(mockInput.value).toBe<string>("validValue");
  });
  it("should prevent invalid inputs from being submitted", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "invalidValue";
    gStyleScript.addListenerForValidities([mockInput], /^[a-z]+$/);
    mockInput.dispatchEvent(new Event("input"));
    expect(mockInput.value.length).toBeLessThanOrEqual(11);
  });
  it("should call elementNotPopulated when inputs array is empty", (): void => {
    gStyleScript.addListenerForValidities([]);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
  it("should call inputNotFound when input is not valid", (): void => {
    gStyleScript.addListenerForValidities([null as any]);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("clearPhDates", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should hide date input placeholder when value is empty", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "date";
    gStyleScript.clearPhDates([mockInput]);
    mockInput.dispatchEvent(new Event("input"));
    expect(mockInput.style.color).toBe<CSSColor>("transparent");
    mockInput.value = "2023-09-09";
    mockInput.dispatchEvent(new Event("input"));
    expect(mockInput.style.color).toBe<CSSColor>("black");
  });
  it("should call inputNotFound for non-HTMLInputElements", (): void => {
    gStyleScript.clearPhDates([null as any]);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
  it("should call elementNotPopulated for empty or invalid array", (): void => {
    gStyleScript.clearPhDates([]);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
});
describe("resetPhs", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should reset input placeholders after interaction", (): void => {
    const mockInput = document.createElement("input");
    mockInput.id = "mockInput";
    const placeholders = { mockInput: "Mock Placeholder" };
    gStyleScript.resetPhs([mockInput], placeholders);
    mockInput.dispatchEvent(new Event("input"));
    expect(mockInput.placeholder).toBe<string>("");
    setTimeout(() => {
      expect(mockInput.placeholder).toBe<string>("Mock Placeholder");
    }, 3000);
  });
  it("should call inputNotFound for invalid inputs", (): void => {
    gStyleScript.resetPhs([null as any], {});
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
  it("should call elementNotPopulated when inputs array is empty", (): void => {
    gStyleScript.resetPhs([], {});
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
});
describe("equalizeWidWithPhs", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should adjust input minWidth based on placeholder length", (): void => {
    const mockInput = document.createElement("input");
    mockInput.placeholder = "Example Placeholder";
    gStyleScript.equalizeWidWithPhs([mockInput]);
    expect(mockInput.style.minWidth).toBe<CSSMeasureValue>("24ch");
  });
  it("should call elementNotFound for non-HTML elements", (): void => {
    gStyleScript.equalizeWidWithPhs([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
  it("should call elementNotPopulated for empty input array", (): void => {
    gStyleScript.equalizeWidWithPhs([]);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
});
describe("strikeNulls", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should add line-through style to null or undefined values", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "null";
    gStyleScript.strikeNulls([mockInput]);
    expect(mockInput.style.textDecoration).toBe<CSSTextDecoration>("line-through");
    mockInput.value = "Some Value";
    gStyleScript.strikeNulls([mockInput]);
    expect(mockInput.style.textDecoration).toBe<CSSTextDecoration>("");
  });
  it("should call elementNotFound for invalid elements", (): void => {
    gStyleScript.strikeNulls([null as any]);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
  it("should call elementNotPopulated for empty element array", (): void => {
    gStyleScript.strikeNulls([]);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
});
describe("normalizeSizeSb", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should normalize width and height of elements based on scrollbar size", (): void => {
    const mockElement = document.createElement("div");
    document.body.appendChild(mockElement);
    gStyleScript.normalizeSizeSb([mockElement], [true, 2], true);
    expect(mockElement.style.minWidth).toBeDefined();
    expect(mockElement.style.minHeight).toBeDefined();
  });
  it("should call elementNotFound for invalid elements", (): void => {
    gStyleScript.normalizeSizeSb([null as any], [true, 2], true);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
  it("should call elementNotPopulated for empty element array", (): void => {
    gStyleScript.normalizeSizeSb([], [true, 2], true);
    expect(elementNotPopulatedSpy).toHaveBeenCalled();
  });
});
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
    expect(updatedColors[0][1].get("background-color")).toBe<CSSColor>("#FF0000FF");
    expect(updatedColors[0][1].get("color")).toBe<CSSColor>("#00FF007F");
  });
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
    expect(updatedColors[0][1].get("background-color")).toBe<CSSColor>("#00FF007F");
    expect(updatedColors[0][1].get("color")).toBe<CSSColor>("#0000FF");
  });
  it("should skip values that are already in hex format", (): void => {
    const arrColors: Array<[string, Map<string, string>]> = [["example", new Map([["background-color", "#FF0000"]])]];
    expect([gStyleScript.convertToHex(arrColors)]).toEqual<any>([]);
  });
  it("should mark unsupported color formats as invalid", (): void => {
    const arrColors: Array<[string, Map<string, string>]> = [
      ["example", new Map([["background-color", "unsupportedColor"]])],
    ];
    expect([gStyleScript.convertToHex(arrColors)]).toEqual<[boolean]>([false]);
  });
});
describe("expandContent", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should expand the content width and change opacity", (): void => {
    const mockEl = document.createElement("div");
    const mockParent = document.createElement("div");
    const mockOutput = document.createElement("output");
    mockEl.appendChild(mockOutput);
    mockParent.appendChild(mockEl);
    document.body.appendChild(mockParent);
    gStyleScript.expandContent(mockEl);
    expect(mockEl.style.opacity).toBe<PseudoNum>("0");
    expect(mockEl.style.width).toBe<PseudoNum>("0");
    setTimeout((): void => {
      expect(mockEl.style.width).toBeDefined();
    }, 6000);
  });
  it("should handle non-existent elements and call elementNotFound", (): void => {
    gStyleScript.expandContent(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
