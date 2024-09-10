//v1.0.0
import * as gController from "../../global/gController";
import * as errorHandler from "../../global/handlers/errorHandler";
import * as gModel from "../../global/gModel";
import * as gHandlers from "../../global/handlers/gHandlers";
import { utils, writeFile } from "xlsx";
import { WorkBook } from "xlsx-js-style";
describe("getGlobalEls", () => {
  let addListenerTextsSpy: jest.SpyInstance;
  let addListenerRadiosSpy: jest.SpyInstance;
  let addListenerDateBtnsSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    addListenerTextsSpy = jest
      .spyOn(gController, "addListenerTexts")
      .mockImplementation(() => {});
    addListenerRadiosSpy = jest
      .spyOn(gController, "addListenerRadios")
      .mockImplementation(() => {});
    addListenerDateBtnsSpy = jest
      .spyOn(gController, "addListenerDateBtns")
      .mockImplementation(() => {});
    elementNotPopulatedSpy = jest
      .spyOn(errorHandler, "elementNotPopulated")
      .mockImplementation(() => new Error("Not populated."));
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error("Element not found."));
    jest.clearAllMocks();
  });
  it("should call addListenerTexts when textConts are found", () => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValue([document.createElement("textarea")]);
    gController.getGlobalEls(true, "notNum");
    expect(addListenerTextsSpy).toHaveBeenCalled();
    expect(elementNotPopulatedSpy).not.toHaveBeenCalled();
  });
  it("should call elementNotPopulated when no textConts are found", () => {
    document.querySelectorAll = jest.fn().mockReturnValue([]);
    gController.getGlobalEls(true, "notNum");
    expect(addListenerTextsSpy).not.toHaveBeenCalled();
    expect(elementNotPopulatedSpy).toHaveBeenCalledWith(
      [],
      "textConts",
      expect.any(Error)
    );
  });
  it("should call addListenerRadios when radioInps are found", () => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValueOnce([document.createElement("input")]);
    gController.getGlobalEls(true, "notNum");
    expect(addListenerRadiosSpy).toHaveBeenCalled();
    expect(elementNotPopulatedSpy).not.toHaveBeenCalled();
  });
  it("should call elementNotPopulated for radioInps when none are found", () => {
    document.querySelectorAll = jest.fn().mockReturnValue([]);
    gController.getGlobalEls(true, "notNum");
    expect(addListenerRadiosSpy).not.toHaveBeenCalled();
    expect(elementNotPopulatedSpy).toHaveBeenCalledWith(
      [],
      "radioInps",
      expect.any(Error)
    );
  });
  it("should call addListenerDateBtns when dateBtns are found", () => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValueOnce([document.createElement("button")]);
    gController.getGlobalEls(true, "notNum");
    expect(addListenerDateBtnsSpy).toHaveBeenCalled();
    expect(elementNotPopulatedSpy).not.toHaveBeenCalled();
  });
  it("should add a click listener to resetFormBtn", () => {
    document.getElementById = jest
      .fn()
      .mockReturnValue(document.createElement("button"));
    gController.getGlobalEls(true, "notNum");
    expect(
      jest.spyOn(document.getElementById("resetFormBtn")!, "addEventListener")
    ).toHaveBeenCalledWith("click", expect.any(Function));
    expect(elementNotFoundSpy).not.toHaveBeenCalled();
  });
  it("should call elementNotFound for resetFormBtn when not found", () => {
    document.getElementById = jest.fn().mockReturnValue(null);
    gController.getGlobalEls(true, "notNum");
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "resetFormBtn",
      expect.any(Error)
    );
  });
  it('should call addListenerNumInps when context is "num" and numInps are found', () => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValueOnce([document.createElement("input")]);
    gController.getGlobalEls(true, "num");
    expect(gController.addListenerNumInps).toHaveBeenCalled();
    expect(elementNotPopulatedSpy).not.toHaveBeenCalled();
  });
  it('should call elementNotPopulated for numInps when context is "num" and none are found', () => {
    document.querySelectorAll = jest.fn().mockReturnValue([]);
    gController.getGlobalEls(true, "num");
    expect(gController.addListenerNumInps).not.toHaveBeenCalled();
    expect(elementNotPopulatedSpy).toHaveBeenCalledWith(
      [],
      "numInps",
      expect.any(Error)
    );
  });
});
describe("addListenerTexts", () => {
  it("should add an input listener to text areas with autocorrect", () => {
    const mockTextArea = document.createElement("textarea");
    mockTextArea.classList.add("autocorrect");
    jest.spyOn(mockTextArea, "addEventListener");
    gController.addListenerTexts([mockTextArea], true);
    expect(mockTextArea.addEventListener).toHaveBeenCalledWith(
      "input",
      expect.any(Function)
    );
  });
  it("should log an error when textConts contains non-HTMLElement elements", () => {
    expect(
      jest.spyOn(console, "error").mockImplementation(() => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em textConts");
  });
});
describe("addListenerNumInps", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error("Input nof found."));
    jest.spyOn(gModel, "numberLimit").mockImplementation(() => {});
    jest.clearAllMocks();
  });
  it("should add an input listener for number inputs", () => {
    const mockNumberInput = document.createElement("input");
    mockNumberInput.type = "number";
    jest.spyOn(mockNumberInput, "addEventListener");
    gController.addListenerNumInps([mockNumberInput]);
    expect(mockNumberInput.addEventListener).toHaveBeenCalledWith(
      "input",
      expect.any(Function)
    );
    expect(gModel.numberLimit).not.toHaveBeenCalled();
    mockNumberInput.dispatchEvent(new Event("input"));
    expect(gModel.numberLimit).toHaveBeenCalledWith(mockNumberInput);
    expect(inputNotFoundSpy).not.toHaveBeenCalled();
  });
  it("should call inputNotFound if the element is not an input of type number", () => {
    const mockTextInput = document.createElement("input");
    mockTextInput.type = "text";
    gController.addListenerNumInps([mockTextInput]);
    expect(inputNotFoundSpy).toHaveBeenCalledWith(
      mockTextInput,
      `target numInp id ${JSON.stringify(
        mockTextInput.id || "UNIDENTIFIED TEXTCONT"
      )}`,
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", () => {
    gController.addListenerNumInps([null as any]);
    expect(
      jest.spyOn(console, "error").mockImplementation(() => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em numInps");
  });
});
describe("addListenerRadios", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error("Input not found."));
    jest.spyOn(gHandlers, "doubleClickHandler").mockImplementation(() => {});
    jest.spyOn(gHandlers, "cpbInpHandler").mockImplementation(() => {});
    jest.spyOn(gHandlers, "deactTextInput").mockImplementation(() => {});
    jest.clearAllMocks();
  });
  it("should add a dblclick listener for radio inputs", () => {
    const mockRadioInput = document.createElement("input");
    mockRadioInput.type = "radio";
    jest.spyOn(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "od");
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith(
      "dblclick",
      expect.any(Function)
    );
    mockRadioInput.dispatchEvent(new Event("dblclick"));
    expect(gHandlers.doubleClickHandler).toHaveBeenCalledWith(mockRadioInput);
    expect(inputNotFoundSpy).not.toHaveBeenCalled();
  });
  it("should add change and keydown listeners if context is ed", () => {
    const mockRadioInput = document.createElement("input");
    mockRadioInput.type = "radio";
    jest.spyOn(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "ed");
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    mockRadioInput.dispatchEvent(new Event("change"));
    expect(gHandlers.cpbInpHandler).toHaveBeenCalledWith(
      expect.anything(),
      mockRadioInput
    );
  });
  it("should add a change listener and call deactTextInput if context is ag", () => {
    const mockRadioInput = document.createElement("input");
    mockRadioInput.type = "radio";
    jest.spyOn(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "ag");
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
    mockRadioInput.dispatchEvent(new Event("change"));
    expect(gHandlers.deactTextInput).toHaveBeenCalled();
  });
  it("should call inputNotFound if the element is not a valid radio input", () => {
    const mockTextInput = document.createElement("input");
    mockTextInput.type = "text";
    gController.addListenerRadios([mockTextInput]);
    expect(inputNotFoundSpy).toHaveBeenCalledWith(
      mockTextInput,
      `target radio id ${mockTextInput.id || "UNDEFINED ID RADIO"}`,
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", () => {
    gController.addListenerRadios([null as any]);
    expect(
      jest.spyOn(console, "error").mockImplementation(() => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em radioInps");
  });
});
describe("addListenerDateBtns", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error("Element not found."));
    jest.spyOn(gHandlers, "useCurrentDate").mockImplementation(() => {});
    jest.clearAllMocks();
  });
  it("should add a click listener for button elements", () => {
    const mockButton = document.createElement("button");
    jest.spyOn(mockButton, "addEventListener");
    gController.addListenerDateBtns([mockButton]);
    expect(mockButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
    mockButton.dispatchEvent(new Event("click"));
    expect(gHandlers.useCurrentDate).toHaveBeenCalledWith(
      expect.anything(),
      mockButton
    );
    expect(elementNotFoundSpy).not.toHaveBeenCalled();
  });
  it("should call elementNotFound if the element is not a button", () => {
    const mockTextInput = document.createElement("input");
    gController.addListenerDateBtns([mockTextInput]);
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      mockTextInput,
      `target dateBtn id ${mockTextInput.id || "UNDEFINED ID DATEBTN"}`,
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", () => {
    gController.addListenerDateBtns([null as any]);
    expect(
      jest.spyOn(console, "error").mockImplementation(() => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em dateBtns");
  });
});
describe("addListenersGenConts", () => {
  let fluxGenSpy: jest.SpyInstance;
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    fluxGenSpy = jest
      .spyOn(gModel, "fluxGen")
      .mockImplementation(() => "masculino");
    multipleElementsNotFoundSpy = jest
      .spyOn(errorHandler, "multipleElementsNotFound")
      .mockImplementation(() => new Error(`Multiple elements not found.`));
    jest.clearAllMocks();
  });
  it("should add a change listener to gen elements and update genValue", () => {
    const mockElement = document.createElement("input");
    mockElement.value = "feminino";
    const mockBirthRel = document.createElement("input");
    const mockTrans = document.createElement("input");
    const mockFisAlin = document.createElement("input");
    document.getElementById = jest
      .fn()
      .mockReturnValueOnce(mockBirthRel)
      .mockReturnValueOnce(mockTrans)
      .mockReturnValueOnce(mockFisAlin);
    mockElement.dispatchEvent(new Event("change"));
    expect(fluxGenSpy).toHaveBeenCalledWith(
      [mockElement, mockBirthRel, mockTrans, mockFisAlin],
      mockElement.value
    );
    expect(gController.addListenersGenConts(mockElement, "feminino")).toBe(
      "masculino"
    );
  });
  it("should call multipleElementsNotFound if elements are missing", () => {
    jest.spyOn(gModel, "checkAllGenConts").mockReturnValue(false);
    gController.addListenersGenConts(
      document.createElement("input"),
      "feminino"
    );
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
  });
});
describe("addListenerAutocorrectBtns", () => {
  let switchAutocorrectSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach(() => {
    switchAutocorrectSpy = jest
      .spyOn(gModel, "switchAutocorrect")
      .mockImplementation(() => true);
    elementNotPopulatedSpy = jest
      .spyOn(errorHandler, "elementNotPopulated")
      .mockImplementation(() => new Error(`Element not populated.`));
    jest.clearAllMocks();
  });
  it("should add a click listener for valid buttons and update autocorrect status", () => {
    const mockButton = document.createElement("button");
    jest.spyOn(mockButton, "addEventListener");
    const result = gController.addListenerAutocorrectBtns([mockButton]);
    expect(mockButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
    mockButton.dispatchEvent(new Event("click"));
    expect(switchAutocorrectSpy).toHaveBeenCalledWith(
      expect.anything(),
      mockButton,
      true
    );
    expect(result).toBe(true);
  });

  it("should call elementNotPopulated for invalid elements", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    gController.addListenerAutocorrectBtns([mockInput]);
    expect(elementNotPopulatedSpy).toHaveBeenCalledWith(
      [mockInput],
      `target deactAutocorrectBtn id ${mockInput?.id || "UNDEFINED ID BUTTON"}`,
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", () => {
    gController.addListenerAutocorrectBtns([null as any]);
    expect(
      jest.spyOn(console, "error").mockImplementation(() => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em deactAutocorrectBtns");
  });
});
describe("addListenerAstDigitBtns", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  let changeToAstDigitSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    changeToAstDigitSpy = jest
      .spyOn(gHandlers, "changeToAstDigit")
      .mockImplementation(() => {});
    jest.clearAllMocks();
  });
  it("should add click listeners to valid button elements", () => {
    const mockButton = document.createElement("button");
    jest.spyOn(mockButton, "addEventListener");
    gController.addListenerAstDigitBtns([mockButton]);
    expect(mockButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
    mockButton.dispatchEvent(new Event("click"));
    expect(changeToAstDigitSpy).toHaveBeenCalledWith(mockButton);
  });
  it("should call elementNotFound for non-button elements", () => {
    const mockInput = document.createElement("input");
    gController.addListenerAstDigitBtns([mockInput]);
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      mockInput,
      mockInput?.id || "UNDEFINED ID BUTTON",
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", () => {
    gController.addListenerAstDigitBtns([null as any]);
    expect(
      jest.spyOn(console, "error").mockImplementation(() => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em astDigtBtns");
  });
});
describe("addListenerExportBtn", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.spyOn(utils, "book_new").mockReturnValue({
      SheetNames: [],
      Sheets: {},
    } as WorkBook);
    jest.mock("xlsx", () => ({
      ...jest.requireActual("xlsx"),
      writeFile: jest.fn(),
    }));
    jest.clearAllMocks();
  });
  it("should add a click listener to export button", () => {
    const mockButton = document.createElement("button");
    jest.spyOn(mockButton, "addEventListener");
    document.querySelector = jest.fn().mockReturnValue(mockButton);
    expect(mockButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
    expect(gController.addListenerExportBtn()).toBe(mockButton);
  });
  it("should handle spreadsheet creation on click", () => {
    const mockButton = document.createElement("button");
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "Sample Input";
    jest.spyOn(mockButton, "addEventListener");
    document.querySelector = jest.fn().mockReturnValue(mockButton);
    document.querySelectorAll = jest.fn().mockReturnValue([mockInput]);
    gController.addListenerExportBtn();
    mockButton.dispatchEvent(new Event("click"));
    expect(writeFile).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("data_undefinedform_")
    );
  });
  it("should call elementNotFound when export button is missing", () => {
    document.querySelector = jest.fn().mockReturnValue(null);
    gController.addListenerExportBtn();
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "argument for addListenerExportBtn()",
      expect.any(Error)
    );
  });
});
describe("addResetAstListener", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.spyOn(gController, "addCanvasListeners").mockImplementation(() => {});
    jest.clearAllMocks();
  });
  it("should add a click listener to reset button and replace canvas element", () => {
    const mockResetButton = document.createElement("button");
    const mockDivConfirm = document.createElement("div");
    const mockCanvas = document.createElement("canvas");
    mockDivConfirm.classList.add("divConfirm");
    mockDivConfirm.appendChild(mockCanvas);
    mockResetButton.closest = jest.fn().mockReturnValue(mockDivConfirm);
    document.getElementById = jest.fn().mockReturnValue(mockResetButton);
    gController.addResetAstListener();
    expect(mockResetButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
    mockResetButton.dispatchEvent(new Event("click"));
    expect(mockDivConfirm.querySelector("#inpAstConfirmId")).toBeTruthy();
    expect(gController.addCanvasListeners).toHaveBeenCalled();
  });
  it("should replace input element with a new file input", () => {
    const mockResetButton = document.createElement("button");
    const mockDivConfirm = document.createElement("div");
    const mockInput = document.createElement("input");
    mockInput.type = "file";
    mockDivConfirm.classList.add("divConfirm");
    mockDivConfirm.appendChild(mockInput);
    mockResetButton.closest = jest.fn().mockReturnValue(mockDivConfirm);
    document.getElementById = jest.fn().mockReturnValue(mockResetButton);
    gController.addResetAstListener();
    mockResetButton.dispatchEvent(new Event("click"));
    const newInput = mockDivConfirm.querySelector("#inpAstConfirmId");
    expect(newInput).toBeInstanceOf(HTMLInputElement);
    expect(newInput?.id).toBe("inpAstConfirmId");
  });
  it("should call elementNotFound if reset button is not found", () => {
    document.getElementById = jest.fn().mockReturnValue(null);
    gController.addResetAstListener();
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Button for reseting signature",
      expect.any(Error)
    );
  });
});
describe("addCustomSbListeners", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should throw an error if container is not an HTMLElement", () => {
    gController.addCustomSbListeners(
      null as any,
      document.createElement("div")
    );
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Main Element for addCustomSbListeners()",
      expect.any(Error)
    );
  });
  it("should throw an error if content is not an HTMLElement", () => {
    gController.addCustomSbListeners(
      document.createElement("div"),
      null as any
    );
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Content Element for addCustomSbListeners()",
      expect.any(Error)
    );
  });
  it("should correctly create and append the scrollbar and thumb", () => {
    const mockContainer = document.createElement("div");
    const mockContent = document.createElement("div");
    jest.spyOn(mockContainer, "appendChild");
    gController.addCustomSbListeners(mockContainer, mockContent);
    expect(mockContainer.appendChild).toHaveBeenCalled();
    const scrollbar = mockContainer.querySelector(".scrollbar");
    expect(scrollbar).not.toBeNull();
    expect(scrollbar?.querySelector(".scroll-thumb")).not.toBeNull();
  });
  it("should add mouse and resize event listeners", () => {
    const mockContainer = document.createElement("div");
    gController.addCustomSbListeners(
      mockContainer,
      document.createElement("div")
    );
    const thumb = mockContainer.querySelector(".scroll-thumb");
    const thumbMouseDownSpy = jest.spyOn(
      thumb as HTMLElement,
      "addEventListener"
    );
    thumb?.dispatchEvent(new MouseEvent("mousedown", { clientY: 50 }));
    expect(thumbMouseDownSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(jest.spyOn(window, "addEventListener")).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
describe("addCanvasListeners", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should throw an error if canvas is not found", () => {
    document.getElementById = jest.fn().mockReturnValue(null);
    gController.addCanvasListeners();
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Canvas for executing addCanvasListeners()",
      expect.any(Error)
    );
  });
  it("should initialize canvas and set drawing listeners", () => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      fillRect: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
    document.getElementById = jest.fn().mockReturnValue(mockCanvas);
    jest.spyOn(mockCanvas, "getContext").mockReturnValue(mockContext);
    gController.addCanvasListeners();
    expect(mockCanvas.width).toBe(innerWidth);
    expect(mockContext.fillRect).toHaveBeenCalled();
  });
  it("should call draw function on mousedown and mousemove", () => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      fillRect: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
    document.getElementById = jest.fn().mockReturnValue(mockCanvas);
    jest.spyOn(mockCanvas, "getContext").mockReturnValue(mockContext);
    gController.addCanvasListeners();
    mockCanvas.dispatchEvent(
      new MouseEvent("mousedown", { clientX: 50, clientY: 50 })
    );
    mockCanvas.dispatchEvent(
      new MouseEvent("mousemove", { clientX: 60, clientY: 60 })
    );
    expect(mockContext.lineTo).toHaveBeenCalledWith(50, expect.any(Number));
    expect(mockContext.stroke).toHaveBeenCalled();
  });
  it("should stop drawing on mouseup", () => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      fillRect: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
    document.getElementById = jest.fn().mockReturnValue(mockCanvas);
    jest.spyOn(mockCanvas, "getContext").mockReturnValue(mockContext);
    gController.addCanvasListeners();
    mockCanvas.dispatchEvent(
      new MouseEvent("mousedown", { clientX: 50, clientY: 50 })
    );
    mockCanvas.dispatchEvent(new MouseEvent("mouseup"));
    expect(mockContext.beginPath).toHaveBeenCalledTimes(2);
  });
});
describe("watchLabels", () => {
  it("should set data-watched attribute to labels", () => {
    const mockLabel = document.createElement("label");
    document.body.appendChild(mockLabel);
    gController.watchLabels();
    setTimeout(() => {
      expect(mockLabel.dataset.watched).toBe("true");
    }, 3000);
  });
  it("should correctly assign ids to inputs and link them with labels", () => {
    const mockLabel = document.createElement("label");
    const mockInput = document.createElement("input");
    mockLabel.appendChild(mockInput);
    document.body.appendChild(mockLabel);
    gController.watchLabels();
    setTimeout(() => {
      expect(mockInput.id).toBeTruthy();
      expect(mockLabel.htmlFor).toBe(mockInput.id);
    }, 3000);
  });
  it("should assign ids even if input is sibling of label", () => {
    const mockLabel = document.createElement("label");
    const mockInput = document.createElement("input");
    mockLabel.insertAdjacentElement("afterend", mockInput);
    document.body.appendChild(mockLabel);
    gController.watchLabels();
    setTimeout(() => {
      expect(mockInput.id).toBeTruthy();
      expect(mockLabel.htmlFor).toBe(mockInput.id);
    }, 3000);
  });
});
