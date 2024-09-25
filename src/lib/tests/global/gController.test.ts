//v1.0.0
import * as gController from "../../global/gController";
import * as errorHandler from "../../global/handlers/errorHandler";
import * as gModel from "../../global/gModel";
import * as gHandlers from "../../global/handlers/gHandlers";
import { utils, writeFile } from "xlsx";
import { WorkBook } from "xlsx-js-style";
import {
  ConsoleMethod,
  DOMEvent,
  ErrorHandler,
  EventTargetMethod,
  Gender,
  GlobalControlMethod,
  GlobalHandler,
  GlobalModeler,
  PseudoBool,
} from "../testVars";
describe("getGlobalEls", (): void => {
  let addListenerTextsSpy: jest.SpyInstance,
    addListenerRadiosSpy: jest.SpyInstance,
    addListenerDateBtnsSpy: jest.SpyInstance,
    elementNotPopulatedSpy: jest.SpyInstance,
    elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    addListenerTextsSpy = jest
      .spyOn<any, GlobalControlMethod>(gController, "addListenerTexts")
      .mockImplementation((): void => {}) as jest.Mock;
    addListenerRadiosSpy = jest
      .spyOn<any, GlobalControlMethod>(gController, "addListenerRadios")
      .mockImplementation((): void => {}) as jest.Mock;
    addListenerDateBtnsSpy = jest
      .spyOn<any, GlobalControlMethod>(gController, "addListenerDateBtns")
      .mockImplementation((): void => {}) as jest.Mock;
    elementNotPopulatedSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error("Not populated.")) as jest.Mock;
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error("Element not found.")) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should call addListenerTexts when textConts are found", (): void => {
    document.querySelectorAll = jest.fn().mockReturnValue([document.createElement("textarea")]) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    expect(addListenerTextsSpy).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  });
  it("should call elementNotPopulated when no textConts are found", (): void => {
    document.querySelectorAll = jest.fn().mockReturnValue([]) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    (expect(addListenerTextsSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
    (
      expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[Array<any>, string, any]>([], "textConts", expect.any(Error) as any) as void;
  });
  it("should call addListenerRadios when radioInps are found", (): void => {
    document.querySelectorAll = jest.fn().mockReturnValueOnce([document.createElement("input") as HTMLInputElement]);
    gController.getGlobalEls(true, "notNum");
    (expect(addListenerRadiosSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  });
  it("should call elementNotPopulated for radioInps when none are found", (): void => {
    document.querySelectorAll = jest.fn().mockReturnValue([]);
    gController.getGlobalEls(true, "notNum");
    (
      expect(addListenerRadiosSpy) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).not.toHaveBeenCalled() as void;
    (
      expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[Array<any>, string, any]>([], "radioInps", expect.any(Error) as any) as void;
  });
  it("should call addListenerDateBtns when dateBtns are found", (): void => {
    document.querySelectorAll = jest.fn().mockReturnValueOnce([document.createElement("button") as HTMLButtonElement]);
    gController.getGlobalEls(true, "notNum") as boolean;
    expect(addListenerDateBtnsSpy).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  });
  it("should add a click listener to resetFormBtn", (): void => {
    document.getElementById = jest.fn().mockReturnValue(document.createElement("button") as HTMLButtonElement);
    gController.getGlobalEls(true, "notNum");
    expect(
      jest.spyOn<HTMLButtonElement, EventTargetMethod>(
        document.getElementById("resetFormBtn")! as HTMLButtonElement,
        "addEventListener"
      )
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
    expect(elementNotFoundSpy).not.toHaveBeenCalled() as void;
  });
  it("should call elementNotFound for resetFormBtn when not found", (): void => {
    document.getElementById = jest.fn().mockReturnValue(null) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    expect(elementNotFoundSpy).toHaveBeenCalledWith(null, "resetFormBtn", expect.any(Error) as any) as void;
  });
  it('should call addListenerNumInps when context is "num" and numInps are found', (): void => {
    document.querySelectorAll = jest.fn().mockReturnValueOnce([document.createElement("input") as HTMLInputElement]);
    gController.getGlobalEls(true, "num");
    expect(gController.addListenerNumInps).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  });
  it('should call elementNotPopulated for numInps when context is "num" and none are found', (): void => {
    document.querySelectorAll = jest.fn().mockReturnValue([]) as jest.Mock;
    gController.getGlobalEls(true, "num");
    expect(gController.addListenerNumInps).not.toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(
      [],
      "numInps",
      expect.any(Error) as any
    ) as void;
  });
});
describe("addListenerTexts", (): void => {
  it("should add an input listener to text areas with autocorrect", (): void => {
    const mockTextArea = document.createElement("textarea");
    mockTextArea.classList.add("autocorrect") as void;
    jest.spyOn<HTMLTextAreaElement, EventTargetMethod>(mockTextArea, "addEventListener") as jest.SpyInstance;
    gController.addListenerTexts([mockTextArea], true);
    (expect(mockTextArea.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(
      "input",
      expect.any(Function) as any
    ) as void;
  });
  it("should log an error when textConts contains non-HTMLElement elements", (): void => {
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}) as jest.Mock
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em textConts");
  });
});
describe("addListenerNumInps", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error("Input nof found.")) as jest.Mock;
    jest.spyOn<any, GlobalModeler>(gModel, "numberLimit").mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add an input listener for number inputs", (): void => {
    const mockNumberInput = document.createElement("input") as HTMLInputElement;
    mockNumberInput.type = "number";
    jest.spyOn<HTMLInputElement, EventTargetMethod>(mockNumberInput, "addEventListener") as jest.SpyInstance;
    gController.addListenerNumInps([mockNumberInput]) as void;
    expect(mockNumberInput.addEventListener).toHaveBeenCalledWith("input", expect.any(Function) as any) as void;
    expect(gModel.numberLimit).not.toHaveBeenCalled() as void;
    mockNumberInput.dispatchEvent(new Event("input")) as boolean;
    expect(gModel.numberLimit).toHaveBeenCalledWith(mockNumberInput) as void;
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  });
  it("should call inputNotFound if the element is not an input of type number", (): void => {
    const mockTextInput = document.createElement("input") as HTMLInputElement;
    mockTextInput.type = "text";
    gController.addListenerNumInps([mockTextInput]);
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(
      mockTextInput,
      `target numInp id ${JSON.stringify(mockTextInput.id || "UNIDENTIFIED TEXTCONT")}`,
      expect.any(Error)
    ) as any;
  });
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerNumInps([null as any]);
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}) as jest.Mock
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em numInps") as void;
  });
});
describe("addListenerRadios", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error("Input not found.")) as jest.Mock;
    jest
      .spyOn<typeof gHandlers, GlobalHandler>(gHandlers, "doubleClickHandler")
      .mockImplementation((): void => {}) as jest.Mock;
    jest
      .spyOn<typeof gHandlers, GlobalHandler>(gHandlers, "cpbInpHandler")
      .mockImplementation((): void => {}) as jest.Mock;
    jest
      .spyOn<typeof gHandlers, GlobalHandler>(gHandlers, "deactTextInput")
      .mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add a dblclick listener for radio inputs", (): void => {
    const mockRadioInput = document.createElement("input") as HTMLInputElement;
    mockRadioInput.type = "radio";
    jest.spyOn<HTMLInputElement, EventTargetMethod>(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "od") as void;
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith("dblclick", expect.any(Function) as any) as void;
    mockRadioInput.dispatchEvent(new Event("dblclick"));
    expect(gHandlers.doubleClickHandler).toHaveBeenCalledWith(mockRadioInput) as void;
    expect(inputNotFoundSpy).not.toHaveBeenCalled() as void;
  });
  it("should add change and keydown listeners if context is ed", (): void => {
    const mockRadioInput = document.createElement("input") as HTMLInputElement;
    mockRadioInput.type = "radio";
    jest.spyOn(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "ed");
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith("change", expect.any(Function) as any) as void;
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function) as any) as void;
    mockRadioInput.dispatchEvent(new Event("change"));
    expect(gHandlers.cpbInpHandler).toHaveBeenCalledWith((expect.anything() as any, mockRadioInput)) as void;
  });
  it("should add a change listener and call deactTextInput if context is ag", (): void => {
    const mockRadioInput = document.createElement("input") as HTMLInputElement;
    mockRadioInput.type = "radio";
    jest.spyOn(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "ag");
    expect(mockRadioInput.addEventListener).toHaveBeenCalledWith("change", expect.any(Function) as any) as void;
    mockRadioInput.dispatchEvent(new Event("change"));
    expect(gHandlers.deactTextInput).toHaveBeenCalled() as void;
  });
  it("should call inputNotFound if the element is not a valid radio input", (): void => {
    const mockTextInput = document.createElement("input") as HTMLInputElement;
    mockTextInput.type = "text";
    gController.addListenerRadios([mockTextInput]) as void;
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [HTMLInputElement, string, any]
    >(mockTextInput, `target radio id ${mockTextInput.id || "UNDEFINED ID RADIO"}`, expect.any(Error));
  });
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerRadios([null as any]);
    (
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "error") as jest.SpyInstance
      ) as jest.JestMatchers<jest.SpyInstance>
    )
      //@ts-ignore
      .mockImplementation((): void => {})
      .toHaveBeenCalledWith<[string]>("Erro validando instâncias em radioInps");
  });
});
describe("addListenerDateBtns", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error("Element not found.")) as jest.Mock;
    jest
      .spyOn<typeof gHandlers, GlobalHandler>(gHandlers, "useCurrentDate")
      .mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add a click listener for button elements", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener");
    gController.addListenerDateBtns([mockButton]) as void;
    (expect(mockButton.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[DOMEvent, any]>(
      "click",
      expect.any(Function) as any
    ) as void;
    mockButton.dispatchEvent(new Event("click"));
    (expect(gHandlers.useCurrentDate) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      (expect.anything() as any, mockButton)
    ) as void;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  });
  it("should call elementNotFound if the element is not a button", (): void => {
    const mockTextInput = document.createElement("input") as HTMLInputElement;
    gController.addListenerDateBtns([mockTextInput]) as void;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [HTMLInputElement, string, any]
    >(mockTextInput, `target dateBtn id ${mockTextInput.id || "UNDEFINED ID DATEBTN"}`, expect.any(Error));
  });
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerDateBtns([null as any]) as void;
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em dateBtns");
  });
});
describe("addListenersGenConts", (): void => {
  let fluxGenSpy: jest.SpyInstance;
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    fluxGenSpy = jest.spyOn(gModel, "fluxGen").mockImplementation((): string => "masculino");
    multipleElementsNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple elements not found.`)) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add a change listener to gen elements and update genValue", (): void => {
    const mockElement = document.createElement("input") as HTMLInputElement;
    mockElement.value = "feminino";
    const mockBirthRel = document.createElement("input") as HTMLInputElement;
    const mockTrans = document.createElement("input") as HTMLInputElement;
    const mockFisAlin = document.createElement("input") as HTMLInputElement;
    document.getElementById = jest
      .fn()
      .mockReturnValueOnce(mockBirthRel)
      .mockReturnValueOnce(mockTrans)
      .mockReturnValueOnce(mockFisAlin) as jest.Mock;
    mockElement.dispatchEvent(new Event("change")) as boolean;
    (expect(fluxGenSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[HTMLElement[], string]>(
      [mockElement, mockBirthRel, mockTrans, mockFisAlin],
      mockElement.value
    ) as void;
    expect(gController.addListenersGenConts(mockElement, "feminino")).toBe<Gender>("masculino");
  });
  it("should call multipleElementsNotFound if elements are missing", (): void => {
    //@ts-ignore
    jest.spyOn<typeof gModel, GlobalModeler>(gModel, "checkAllGenConts").mockReturnValue(false);
    gController.addListenersGenConts(document.createElement("input") as HTMLInputElement, "feminino");
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled() as void;
  });
});
describe("addListenerAutocorrectBtns", (): void => {
  let switchAutocorrectSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    switchAutocorrectSpy = jest.spyOn(gModel, "switchAutocorrect").mockImplementation((): boolean => true) as jest.Mock;
    elementNotPopulatedSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks() as typeof jest;
  });
  it("should add a click listener for valid buttons and update autocorrect status", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener") as jest.Mock;
    expect(mockButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function) as any) as void;
    mockButton.dispatchEvent(new Event("click")) as boolean;
    expect(switchAutocorrectSpy).toHaveBeenCalledWith((expect.anything() as any, mockButton, true)) as void;
    expect(gController.addListenerAutocorrectBtns([mockButton])).toBe<boolean>(true) as void;
  });

  it("should call elementNotPopulated for invalid elements", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    gController.addListenerAutocorrectBtns([mockInput]) as boolean;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith(
      [mockInput],
      `target deactAutocorrectBtn id ${mockInput?.id || "UNDEFINED ID BUTTON"}`,
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerAutocorrectBtns([null as any]);
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em deactAutocorrectBtns");
  });
});
describe("addListenerAstDigitBtns", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let changeToAstDigitSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    changeToAstDigitSpy = jest.spyOn(gHandlers, "changeToAstDigit").mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add click listeners to valid button elements", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn(mockButton, "addEventListener");
    gController.addListenerAstDigitBtns([mockButton]);
    expect(mockButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function) as any) as void;
    mockButton.dispatchEvent(new Event("click"));
    expect(changeToAstDigitSpy).toHaveBeenCalledWith(mockButton) as void;
  });
  it("should call elementNotFound for non-button elements", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    gController.addListenerAstDigitBtns([mockInput]);
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      mockInput,
      mockInput?.id || "UNDEFINED ID BUTTON",
      expect.any(Error)
    );
  });
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerAstDigitBtns([null as any]);
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {})
    ).toHaveBeenCalledWith("Erro validando instâncias em astDigtBtns");
  });
});
describe("addListenerExportBtn", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.spyOn(utils, "book_new").mockReturnValue({
      SheetNames: [],
      Sheets: {},
    } as WorkBook);
    jest.mock("xlsx", (): any => ({
      ...jest.requireActual("xlsx"),
      writeFile: jest.fn(),
    })) as typeof jest;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add a click listener to export button", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn(mockButton, "addEventListener");
    document.querySelector = jest.fn().mockReturnValue(mockButton);
    expect(mockButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function) as any) as void;
    expect(gController.addListenerExportBtn()).toBe<HTMLButtonElement>(mockButton);
  });
  it("should handle spreadsheet creation on click", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "Sample Input";
    jest.spyOn(mockButton, "addEventListener");
    document.querySelector = jest.fn().mockReturnValue(mockButton);
    document.querySelectorAll = jest.fn().mockReturnValue([mockInput]);
    gController.addListenerExportBtn();
    mockButton.dispatchEvent(new Event("click"));
    expect(writeFile).toHaveBeenCalledWith(
      (expect.anything() as any, expect.stringContaining("data_undefinedform_"))
    ) as void;
  });
  it("should call elementNotFound when export button is missing", (): void => {
    document.querySelector = jest.fn().mockReturnValue(null);
    gController.addListenerExportBtn();
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "argument for addListenerExportBtn()",
      expect.any(Error) as any
    );
  });
});
describe("addResetAstListener", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.spyOn(gController, "addCanvasListeners").mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  });
  it("should add a click listener to reset button and replace canvas element", (): void => {
    const mockResetButton = document.createElement("button") as HTMLButtonElement;
    const mockDivConfirm = document.createElement("div") as HTMLDivElement;
    const mockCanvas = document.createElement("canvas");
    mockDivConfirm.classList.add("divConfirm");
    mockDivConfirm.appendChild(mockCanvas);
    mockResetButton.closest = jest.fn().mockReturnValue(mockDivConfirm);
    document.getElementById = jest.fn().mockReturnValue(mockResetButton);
    gController.addResetAstListener();
    expect(mockResetButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function) as any) as void;
    mockResetButton.dispatchEvent(new Event("click"));
    expect(mockDivConfirm.querySelector("#inpAstConfirmId")).toBeTruthy() as void;
    expect(gController.addCanvasListeners).toHaveBeenCalled() as void;
  });
  it("should replace input element with a new file input", (): void => {
    const mockResetButton = document.createElement("button") as HTMLButtonElement;
    const mockDivConfirm = document.createElement("div") as HTMLDivElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "file";
    mockDivConfirm.classList.add("divConfirm");
    mockDivConfirm.appendChild(mockInput);
    mockResetButton.closest = jest.fn().mockReturnValue(mockDivConfirm);
    document.getElementById = jest.fn().mockReturnValue(mockResetButton);
    gController.addResetAstListener();
    mockResetButton.dispatchEvent(new Event("click"));
    const newInput = mockDivConfirm.querySelector("#inpAstConfirmId");
    expect(newInput).toBeInstanceOf<{
      new (): HTMLInputElement;
      prototype: HTMLInputElement;
    }>(HTMLInputElement);
    expect(newInput?.id).toBe<string>("inpAstConfirmId");
  });
  it("should call elementNotFound if reset button is not found", (): void => {
    document.getElementById = jest.fn().mockReturnValue(null);
    gController.addResetAstListener();
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Button for reseting signature",
      expect.any(Error) as any
    ) as void;
  });
});
describe("addCustomSbListeners", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks() as typeof jest;
  });
  it("should throw an error if container is not an HTMLElement", (): void => {
    gController.addCustomSbListeners(null as any, document.createElement("div") as HTMLDivElement);
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Main Element for addCustomSbListeners()",
      expect.any(Error) as any
    );
  });
  it("should throw an error if content is not an HTMLElement", (): void => {
    gController.addCustomSbListeners(document.createElement("div") as HTMLDivElement, null as any);
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Content Element for addCustomSbListeners()",
      expect.any(Error)
    );
  });
  it("should correctly create and append the scrollbar and thumb", (): void => {
    const mockContainer = document.createElement("div") as HTMLDivElement;
    const mockContent = document.createElement("div") as HTMLDivElement;
    jest.spyOn(mockContainer, "appendChild");
    gController.addCustomSbListeners(mockContainer, mockContent);
    expect(mockContainer.appendChild).toHaveBeenCalled() as void;
    const scrollbar = mockContainer.querySelector(".scrollbar");
    expect(scrollbar).not.toBeNull();
    expect(scrollbar?.querySelector(".scroll-thumb")).not.toBeNull();
  });
  it("should add mouse and resize event listeners", (): void => {
    const mockContainer = document.createElement("div") as HTMLDivElement;
    gController.addCustomSbListeners(mockContainer, document.createElement("div") as HTMLDivElement);
    const thumb = mockContainer.querySelector(".scroll-thumb");
    const thumbMouseDownSpy = jest.spyOn(thumb as HTMLElement, "addEventListener");
    thumb?.dispatchEvent(new MouseEvent("mousedown", { clientY: 50 }));
    expect(thumbMouseDownSpy).toHaveBeenCalledWith("mousedown", expect.any(Function) as any) as void;
    expect(jest.spyOn(window, "addEventListener")).toHaveBeenCalledWith("resize", expect.any(Function) as any) as void;
  });
});
describe("addCanvasListeners", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks() as typeof jest;
  });
  it("should throw an error if canvas is not found", (): void => {
    document.getElementById = jest.fn().mockReturnValue(null);
    gController.addCanvasListeners();
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "Canvas for executing addCanvasListeners()",
      expect.any(Error)
    );
  });
  it("should initialize canvas and set drawing listeners", (): void => {
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
    expect(mockCanvas.width).toBe<number>(innerWidth);
    expect(mockContext.fillRect).toHaveBeenCalled() as void;
  });
  it("should call draw function on mousedown and mousemove", (): void => {
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
    mockCanvas.dispatchEvent(new MouseEvent("mousedown", { clientX: 50, clientY: 50 }));
    mockCanvas.dispatchEvent(new MouseEvent("mousemove", { clientX: 60, clientY: 60 }));
    expect(mockContext.lineTo).toHaveBeenCalledWith(50, expect.any(Number) as any) as void;
    expect(mockContext.stroke).toHaveBeenCalled() as void;
  });
  it("should stop drawing on mouseup", (): void => {
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
    mockCanvas.dispatchEvent(new MouseEvent("mousedown", { clientX: 50, clientY: 50 }));
    mockCanvas.dispatchEvent(new MouseEvent("mouseup"));
    expect(mockContext.beginPath).toHaveBeenCalledTimes(2) as void;
  });
});
describe("watchLabels", (): void => {
  it("should set data-watched attribute to labels", (): void => {
    const mockLabel = document.createElement("label") as HTMLLabelElement;
    document.body.appendChild(mockLabel);
    gController.watchLabels();
    setTimeout(() => {
      expect(mockLabel.dataset.watched).toBe<PseudoBool>("true");
    }, 3000);
  });
  it("should correctly assign ids to inputs and link them with labels", (): void => {
    const mockLabel = document.createElement("label") as HTMLLabelElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockLabel.appendChild(mockInput);
    document.body.appendChild(mockLabel);
    gController.watchLabels();
    setTimeout(() => {
      expect(mockInput.id).toBeTruthy() as void;
      expect(mockLabel.htmlFor).toBe<string>(mockInput.id);
    }, 3000);
  });
  it("should assign ids even if input is sibling of label", (): void => {
    const mockLabel = document.createElement("label") as HTMLLabelElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockLabel.insertAdjacentElement("afterend", mockInput);
    document.body.appendChild(mockLabel);
    gController.watchLabels();
    setTimeout(() => {
      expect(mockInput.id).toBeTruthy() as void;
      expect(mockLabel.htmlFor).toBe<string>(mockInput.id);
    }, 3000);
  });
});
