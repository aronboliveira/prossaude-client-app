//v1.0.0
import * as gController from "../../global/gController";
import * as errorHandler from "../../global/handlers/errorHandler";
import * as gModel from "../../global/gModel";
import * as gHandlers from "../../global/handlers/gHandlers";
import { utils, writeFile } from "xlsx";
import { WorkBook } from "xlsx-js-style";
import {
  CanvasMethod,
  ConsoleMethod,
  DOMEvent,
  ErrorHandler,
  EventTargetMethod,
  Gender,
  GlobalControlMethod,
  GlobalHandler,
  GlobalModeler,
  NodeMethod,
  PseudoBool,
  xlsHandler,
} from "../testVars";
//@ts-ignore
import { targEl } from "@/lib/global/declarations/types";
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
  }) as void;
  it("should call addListenerTexts when textConts are found", (): void => {
    document.querySelectorAll = (jest.fn() as jest.Mock).mockReturnValue([
      document.createElement("textarea"),
    ]) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    (expect(addListenerTextsSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated when no textConts are found", (): void => {
    document.querySelectorAll = (jest.fn() as jest.Mock).mockReturnValue([]) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    (expect(addListenerTextsSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
    (
      expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[Array<any>, string, any]>([], "textConts", expect.any(Error) as any) as void;
  }) as void;
  it("should call addListenerRadios when radioInps are found", (): void => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValueOnce([document.createElement("input") as HTMLInputElement]) as jest.Mock;
    gController.getGlobalEls(true, "notNum");
    (expect(addListenerRadiosSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotPopulated for radioInps when none are found", (): void => {
    document.querySelectorAll = (jest.fn() as jest.Mock).mockReturnValue([]) as jest.Mock;
    gController.getGlobalEls(true, "notNum");
    (
      expect(addListenerRadiosSpy) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).not.toHaveBeenCalled() as void;
    (
      expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance> as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[Array<any>, string, any]>([], "radioInps", expect.any(Error) as any) as void;
  }) as void;
  it("should call addListenerDateBtns when dateBtns are found", (): void => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValueOnce([document.createElement("button") as HTMLButtonElement]) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    (expect(addListenerDateBtnsSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should add a click listener to resetFormBtn", (): void => {
    document.getElementById = jest
      .fn()
      .mockReturnValue(document.createElement("button") as HTMLButtonElement) as jest.Mock;
    gController.getGlobalEls(true, "notNum");
    (
      expect(
        jest.spyOn<HTMLButtonElement, EventTargetMethod>(
          document.getElementById("resetFormBtn")! as HTMLButtonElement,
          "addEventListener",
        ),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound for resetFormBtn when not found", (): void => {
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(null) as jest.Mock;
    gController.getGlobalEls(true, "notNum") as boolean;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "resetFormBtn",
      expect.any(Error) as any,
    ) as void;
  }) as void;
  it('should call addListenerNumInps when context is "num" and numInps are found', (): void => {
    document.querySelectorAll = jest
      .fn()
      .mockReturnValueOnce([document.createElement("input") as HTMLInputElement]) as jest.Mock;
    gController.getGlobalEls(true, "num");
    (expect(gController.addListenerNumInps) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it('should call elementNotPopulated for numInps when context is "num" and none are found', (): void => {
    document.querySelectorAll = (jest.fn() as jest.Mock).mockReturnValue([]) as jest.Mock;
    gController.getGlobalEls(true, "num");
    (expect(gController.addListenerNumInps) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      [],
      "numInps",
      expect.any(Error) as any,
    ) as void;
  }) as void;
}) as void;
describe("addListenerTexts", (): void => {
  it("should add an input listener to text areas with autocorrect", (): void => {
    const mockTextArea = document.createElement("textarea");
    mockTextArea.classList.add("autocorrect") as void;
    jest.spyOn<HTMLTextAreaElement, EventTargetMethod>(mockTextArea, "addEventListener") as jest.SpyInstance;
    gController.addListenerTexts([mockTextArea], true);
    (expect(mockTextArea.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockTextArea.addEventListener>
    >("input", expect.any(Function) as any) as void;
  }) as void;
  it("should log an error when textConts contains non-HTMLElement elements", (): void => {
    (
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}) as jest.Mock,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em textConts");
  }) as void;
}) as void;
describe("addListenerNumInps", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error("Input nof found.")) as jest.Mock;
    jest.spyOn<any, GlobalModeler>(gModel, "numberLimit").mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add an input listener for number inputs", (): void => {
    const mockNumberInput = document.createElement("input") as HTMLInputElement;
    mockNumberInput.type = "number";
    jest.spyOn<HTMLInputElement, EventTargetMethod>(mockNumberInput, "addEventListener") as jest.SpyInstance;
    gController.addListenerNumInps([mockNumberInput]) as void;
    (expect(mockNumberInput.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockNumberInput.addEventListener>
    >("input", expect.any(Function) as any) as void;
    (expect(gModel.numberLimit) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
    mockNumberInput.dispatchEvent(new Event("input")) as boolean;
    (expect(gModel.numberLimit) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof gModel.numberLimit>
    >(mockNumberInput) as void;
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should call inputNotFound if the element is not an input of type number", (): void => {
    const mockTextInput = document.createElement("input") as HTMLInputElement;
    mockTextInput.type = "text";
    gController.addListenerNumInps([mockTextInput]);
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [HTMLInputElement, string, any]
    >(
      mockTextInput,
      `target numInp id ${JSON.stringify(mockTextInput.id || "UNIDENTIFIED TEXTCONT")}`,
      expect.any(Error),
    ) as any;
  }) as void;
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerNumInps([null as any]);
    (
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}) as jest.Mock,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em numInps") as void;
  }) as void;
}) as void;
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
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add a dblclick listener for radio inputs", (): void => {
    const mockRadioInput = document.createElement("input") as HTMLInputElement;
    mockRadioInput.type = "radio";
    jest.spyOn<HTMLInputElement, EventTargetMethod>(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "od") as void;
    (expect(mockRadioInput.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [DOMEvent, any]
    >("dblclick", expect.any(Function) as any) as void;
    mockRadioInput.dispatchEvent(new Event("dblclick")) as boolean;
    (expect(gHandlers.doubleClickHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof gHandlers.doubleClickHandler>
    >(mockRadioInput) as void;
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should add change and keydown listeners if context is ed", (): void => {
    const mockRadioInput = document.createElement("input") as HTMLInputElement;
    mockRadioInput.type = "radio";
    jest.spyOn<HTMLInputElement, EventTargetMethod>(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "ed") as void;
    (expect(mockRadioInput.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockRadioInput.addEventListener>
    >("change", expect.any(Function) as any) as void;
    (expect(mockRadioInput.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockRadioInput.addEventListener>
    >("keydown", expect.any(Function) as any) as void;
    mockRadioInput.dispatchEvent(new Event("change")) as boolean;
    (expect(gHandlers.cpbInpHandler) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      (expect.anything() as any, mockRadioInput),
    ) as void;
  }) as void;
  it("should add a change listener", (): void => {
    const mockRadioInput = document.createElement("input") as HTMLInputElement;
    mockRadioInput.type = "radio";
    jest.spyOn<HTMLInputElement, EventTargetMethod>(mockRadioInput, "addEventListener");
    gController.addListenerRadios([mockRadioInput], "ag") as void;
    (expect(mockRadioInput.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockRadioInput.addEventListener>
    >("change", expect.any(Function) as any) as void;
    mockRadioInput.dispatchEvent(new Event("change")) as boolean;
  }) as void;
  it("should call inputNotFound if the element is not a valid radio input", (): void => {
    const mockTextInput = document.createElement("input") as HTMLInputElement;
    mockTextInput.type = "text";
    gController.addListenerRadios([mockTextInput]) as void;
    (expect(inputNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [HTMLInputElement, string, any]
    >(mockTextInput, `target radio id ${mockTextInput.id || "UNDEFINED ID RADIO"}`, expect.any(Error));
  }) as void;
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerRadios([null as any]) as void;
    (
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "error") as jest.SpyInstance,
      ) as jest.JestMatchers<jest.SpyInstance>
    )
      //@ts-ignore
      .mockImplementation((): void => {})
      .toHaveBeenCalledWith<[string]>("Erro validando instâncias em radioInps");
  }) as void;
}) as void;
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
  }) as void;
  it("should add a click listener for button elements", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener");
    gController.addListenerDateBtns([mockButton]) as void;
    (expect(mockButton.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[DOMEvent, any]>(
      "click",
      expect.any(Function) as any,
    ) as void;
    mockButton.dispatchEvent(new Event("click")) as boolean;
    (expect(gHandlers.useCurrentDate) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      (expect.anything() as any, mockButton),
    ) as void;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).not.toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound if the element is not a button", (): void => {
    const mockTextInput = document.createElement("input") as HTMLInputElement;
    gController.addListenerDateBtns([mockTextInput]) as void;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [HTMLInputElement, string, any]
    >(mockTextInput, `target dateBtn id ${mockTextInput.id || "UNDEFINED ID DATEBTN"}`, expect.any(Error));
  }) as void;
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerDateBtns([null as any]) as void;
    expect(
      jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}),
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em dateBtns");
  }) as void;
}) as void;
describe("addListenersGenConts", (): void => {
  let fluxGenSpy: jest.SpyInstance;
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    fluxGenSpy = jest.spyOn<typeof gModel, "fluxGen">(gModel, "fluxGen").mockImplementation((): string => "masculino");
    multipleElementsNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple elements not found.`)) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  }) as void;
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
      mockElement.value,
    ) as void;
    expect(gController.addListenersGenConts(mockElement, "feminino")).toBe<Gender>("masculino") as void;
  }) as void;
  it("should call multipleElementsNotFound if elements are missing", (): void => {
    //@ts-ignore
    jest.spyOn<typeof gModel, GlobalModeler>(gModel, "checkAllGenConts").mockReturnValue(false) as jest.Mock;
    gController.addListenersGenConts(document.createElement("input") as HTMLInputElement, "feminino");
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addListenerAutocorrectBtns", (): void => {
  let switchAutocorrectSpy: jest.SpyInstance;
  let elementNotPopulatedSpy: jest.SpyInstance;
  beforeEach((): void => {
    switchAutocorrectSpy = jest
      .spyOn<typeof gModel, GlobalModeler>(gModel, "switchAutocorrect")
      .mockImplementation((): boolean => true) as jest.Mock;
    elementNotPopulatedSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotPopulated")
      .mockImplementation((): Error => new Error(`Element not populated.`));
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add a click listener for valid buttons and update autocorrect status", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener") as jest.Mock;
    (expect(mockButton.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockButton.addEventListener>
    >("click", expect.any(Function) as any) as void;
    mockButton.dispatchEvent(new Event("click")) as boolean;
    (expect(switchAutocorrectSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      (expect.anything() as any, mockButton, true),
    ) as void;
    (expect(gController.addListenerAutocorrectBtns([mockButton])) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(
      true,
    ) as void;
  }) as void;

  it("should call elementNotPopulated for invalid elements", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    gController.addListenerAutocorrectBtns([mockInput]) as boolean;
    (expect(elementNotPopulatedSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [Array<HTMLInputElement>, string, any]
    >([mockInput], `target deactAutocorrectBtn id ${mockInput?.id || "UNDEFINED ID BUTTON"}`, expect.any(Error));
  }) as void;
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerAutocorrectBtns([null as any]);
    (
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em deactAutocorrectBtns");
  }) as void;
}) as void;
describe("addListenerAstDigitBtns", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  let changeToAstDigitSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    changeToAstDigitSpy = jest
      .spyOn<typeof gHandlers, GlobalHandler>(gHandlers, "changeToAstDigit")
      .mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add click listeners to valid button elements", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener");
    gController.addListenerAstDigitBtns([mockButton]) as void;
    expect(mockButton.addEventListener).toHaveBeenCalledWith<[DOMEvent, any]>(
      "click",
      expect.any(Function) as any,
    ) as void;
    mockButton.dispatchEvent(new Event("click")) as boolean;
    expect(changeToAstDigitSpy).toHaveBeenCalledWith<[HTMLButtonElement]>(mockButton) as void;
  }) as void;
  it("should call elementNotFound for non-button elements", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    gController.addListenerAstDigitBtns([mockInput]) as void;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      [HTMLInputElement, string, any]
    >(mockInput, mockInput?.id || "UNDEFINED ID BUTTON", expect.any(Error));
  }) as void;
  it("should log an error if the array contains invalid elements", (): void => {
    gController.addListenerAstDigitBtns([null as any]);
    (
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {}),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[string]>("Erro validando instâncias em astDigtBtns");
  }) as void;
}) as void;
describe("addExportFlags", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.spyOn<typeof utils, xlsHandler>(utils, "book_new").mockReturnValue({
      SheetNames: [],
      Sheets: {},
    } as WorkBook);
    jest.mock("xlsx", (): any => ({
      ...jest.requireActual("xlsx"),
      writeFile: jest.fn() as jest.Mock,
    })) as typeof jest;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add a click listener to export button", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener");
    document.querySelector = (jest.fn() as jest.Mock).mockReturnValue(mockButton) as jest.Mock;
    (expect(mockButton.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockButton.addEventListener>
    >("click", expect.any(Function) as any) as void;
    (expect(gController.addExportFlags() as targEl) as jest.JestMatchers<jest.SpyInstance>).toBe<HTMLButtonElement>(
      mockButton,
    ) as void;
  }) as void;
  it("should handle spreadsheet creation on click", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "Sample Input";
    jest.spyOn<HTMLButtonElement, EventTargetMethod>(mockButton, "addEventListener");
    document.querySelector = (jest.fn() as jest.Mock).mockReturnValue(mockButton) as jest.Mock;
    document.querySelectorAll = (jest.fn() as jest.Mock).mockReturnValue([mockInput]) as jest.Mock;
    gController.addExportFlags() as targEl;
    mockButton.dispatchEvent(new Event("click")) as boolean;
    (expect(writeFile) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any]>(
      (expect.anything() as any, expect.stringContaining("data_undefinedform_")),
    ) as void;
  }) as void;
  it("should call elementNotFound when export button is missing", (): void => {
    document.querySelector = (jest.fn() as jest.Mock).mockReturnValue(null) as jest.Mock;
    gController.addExportFlags() as targEl;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "argument for addExportFlags()",
      expect.any(Error) as any,
    );
  }) as void;
}) as void;
describe("addResetAstListener", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest
      .spyOn<typeof gController, GlobalControlMethod>(gController, "addCanvasListeners")
      .mockImplementation((): void => {}) as jest.Mock;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add a click listener to reset button and replace canvas element", (): void => {
    const mockResetButton = document.createElement("button") as HTMLButtonElement;
    const mockDivConfirm = document.createElement("div") as HTMLDivElement;
    const mockCanvas = document.createElement("canvas") as HTMLCanvasElement;
    mockDivConfirm.classList.add("divConfirm") as void;
    mockDivConfirm.appendChild<HTMLCanvasElement>(mockCanvas);
    mockResetButton.closest = (jest.fn() as jest.Mock).mockReturnValue(mockDivConfirm) as jest.Mock;
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(mockResetButton) as jest.Mock;
    gController.addResetAstListener() as void;
    (expect(mockResetButton.addEventListener) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockResetButton.addEventListener>
    >("click", expect.any(Function) as any) as void;
    mockResetButton.dispatchEvent(new Event("click")) as boolean;
    (
      expect(mockDivConfirm.querySelector<HTMLInputElement>("#inpAstConfirmId")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeTruthy() as void;
    (expect(gController.addCanvasListeners) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should replace input element with a new file input", (): void => {
    const mockResetButton = document.createElement("button") as HTMLButtonElement;
    const mockDivConfirm = document.createElement("div") as HTMLDivElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "file";
    mockDivConfirm.classList.add("divConfirm") as void;
    mockDivConfirm.appendChild<HTMLInputElement>(mockInput);
    mockResetButton.closest = (jest.fn() as jest.Mock).mockReturnValue(mockDivConfirm) as jest.Mock;
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(mockResetButton) as jest.Mock;
    gController.addResetAstListener() as void;
    mockResetButton.dispatchEvent(new Event("click")) as boolean;
    const newInput = mockDivConfirm.querySelector<HTMLElement>("#inpAstConfirmId");
    (expect(newInput) as jest.JestMatchers<jest.SpyInstance>).toBeInstanceOf<{
      new (): HTMLInputElement;
      prototype: HTMLInputElement;
    }>(HTMLInputElement);
    (expect(newInput?.id) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("inpAstConfirmId") as void;
  }) as void;
  it("should call elementNotFound if reset button is not found", (): void => {
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(null) as jest.Mock;
    gController.addResetAstListener() as void;
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "Button for reseting signature",
      expect.any(Error) as any,
    ) as void;
  }) as void;
}) as void;
describe("addCustomSbListeners", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should throw an error if container is not an HTMLElement", (): void => {
    gController.addCustomSbListeners(null as any, document.createElement("div") as HTMLDivElement);
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "Main Element for addCustomSbListeners()",
      expect.any(Error) as any,
    );
  }) as void;
  it("should throw an error if content is not an HTMLElement", (): void => {
    gController.addCustomSbListeners(document.createElement("div") as HTMLDivElement, null as any);
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "Content Element for addCustomSbListeners()",
      expect.any(Error),
    );
  }) as void;
  it("should correctly create and append the scrollbar and thumb", (): void => {
    const mockContainer = document.createElement("div") as HTMLDivElement;
    const mockContent = document.createElement("div") as HTMLDivElement;
    jest.spyOn<HTMLElement, NodeMethod>(mockContainer, "appendChild");
    gController.addCustomSbListeners(mockContainer, mockContent);
    (expect(mockContainer.appendChild) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    const scrollbar = mockContainer.querySelector<HTMLElement>(".scrollbar");
    (expect(scrollbar) as jest.JestMatchers<jest.SpyInstance>).not.toBeNull() as void;
    (
      expect(scrollbar?.querySelector<HTMLElement>(".scroll-thumb")) as jest.JestMatchers<jest.SpyInstance>
    ).not.toBeNull() as void;
  }) as void;
  it("should add mouse and resize event listeners", (): void => {
    const mockContainer = document.createElement("div") as HTMLDivElement;
    gController.addCustomSbListeners(mockContainer, document.createElement("div") as HTMLDivElement);
    const thumb = mockContainer.querySelector<HTMLElement>(".scroll-thumb");
    const thumbMouseDownSpy = jest.spyOn<HTMLElement, EventTargetMethod>(
      thumb as HTMLElement,
      "addEventListener",
    ) as jest.SpyInstance;
    thumb?.dispatchEvent(new MouseEvent("mousedown", { clientY: 50 })) as boolean;
    (expect(thumbMouseDownSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[DOMEvent, any]>(
      "mousedown",
      expect.any(Function) as any,
    ) as void;
    (
      expect(
        jest.spyOn<Window, EventTargetMethod>(window, "addEventListener") as jest.SpyInstance,
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[DOMEvent, any]>("resize", expect.any(Function) as any) as void;
  }) as void;
}) as void;
describe("addCanvasListeners", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should throw an error if canvas is not found", (): void => {
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(null) as jest.Mock;
    gController.addCanvasListeners();
    (expect(elementNotFoundSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, string, any]>(
      null,
      "Canvas for executing addCanvasListeners()",
      expect.any(Error),
    );
  }) as void;
  it("should initialize canvas and set drawing listeners", (): void => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      fillRect: jest.fn() as jest.Mock,
      lineTo: jest.fn() as jest.Mock,
      stroke: jest.fn() as jest.Mock,
      beginPath: jest.fn() as jest.Mock,
      moveTo: jest.fn() as jest.Mock,
    } as unknown as CanvasRenderingContext2D;
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(mockCanvas) as jest.Mock;
    jest.spyOn<HTMLCanvasElement, CanvasMethod>(mockCanvas, "getContext").mockReturnValue(mockContext) as jest.Mock;
    gController.addCanvasListeners() as void;
    expect(mockCanvas.width).toBe<number>(innerWidth) as void;
    expect(mockContext.fillRect).toHaveBeenCalled() as void;
  }) as void;
  it("should call draw function on mousedown and mousemove", (): void => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      fillRect: jest.fn() as jest.Mock,
      lineTo: jest.fn() as jest.Mock,
      stroke: jest.fn() as jest.Mock,
      beginPath: jest.fn() as jest.Mock,
      moveTo: jest.fn() as jest.Mock,
    } as unknown as CanvasRenderingContext2D;
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(mockCanvas) as jest.Mock;
    jest.spyOn<HTMLCanvasElement, CanvasMethod>(mockCanvas, "getContext").mockReturnValue(mockContext) as jest.Mock;
    gController.addCanvasListeners() as void;
    mockCanvas.dispatchEvent(new MouseEvent("mousedown", { clientX: 50, clientY: 50 })) as boolean;
    mockCanvas.dispatchEvent(new MouseEvent("mousemove", { clientX: 60, clientY: 60 })) as boolean;
    (expect(mockContext.lineTo) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof mockContext.lineTo>
    >(50, expect.any(Number) as any) as void;
    (expect(mockContext.stroke) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should stop drawing on mouseup", (): void => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      fillRect: jest.fn() as jest.Mock,
      lineTo: jest.fn() as jest.Mock,
      stroke: jest.fn() as jest.Mock,
      beginPath: jest.fn() as jest.Mock,
      moveTo: jest.fn() as jest.Mock,
    } as unknown as CanvasRenderingContext2D;
    document.getElementById = (jest.fn() as jest.Mock).mockReturnValue(mockCanvas) as jest.Mock;
    jest.spyOn<HTMLCanvasElement, CanvasMethod>(mockCanvas, "getContext").mockReturnValue(mockContext) as jest.Mock;
    gController.addCanvasListeners() as void;
    mockCanvas.dispatchEvent(new MouseEvent("mousedown", { clientX: 50, clientY: 50 })) as boolean;
    mockCanvas.dispatchEvent(new MouseEvent("mouseup")) as boolean;
    expect(mockContext.beginPath).toHaveBeenCalledTimes(2) as void;
  }) as void;
}) as void;
describe('getCanvasCoords', () => {
  let canvas: HTMLCanvasElement, getBoundingClientRectMock: jest.Mock;
  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 300;
    getBoundingClientRectMock = jest.fn().mockReturnValue({
      left: 100,
      top: 50,
      width: 500,
      height: 300,
    });
    canvas.getBoundingClientRect = getBoundingClientRectMock;
  });
  it('should calculate correct coordinates based on canvas and screen position', () => {
    expect(gController.getCanvasCoords(150, 100, canvas)).toEqual({ x: 50, y: 50 });
  });
  it('should handle scale factors when the canvas is scaled', () => {
    getBoundingClientRectMock.mockReturnValue({
      left: 100,
      top: 50,
      width: 1000,
      height: 600,
    });
    expect(gController.getCanvasCoords(200, 150, canvas)).toEqual({ x: 50, y: 50 });
  });
  it('should use canvas width/height as fallback when scale factors are not finite', () => {
    getBoundingClientRectMock.mockReturnValue({
      left: 100,
      top: 50,
      width: 0,
      height: 0,
    });
    expect(gController.getCanvasCoords(200, 150, canvas)).toEqual({ x: 200, y: 150 });
  });
  it('should return (0, 0) if x and y are the same as rect.left and rect.top', () => {
    expect(gController.getCanvasCoords(100, 50, canvas)).toEqual({ x: 0, y: 0 });
  });
}) as void;
describe("watchLabels", (): void => {
  it("should set data-watched attribute to labels", (): void => {
    const mockLabel = document.createElement("label") as HTMLLabelElement;
    document.body.appendChild<HTMLLabelElement>(mockLabel);
    gController.watchLabels() as void;
    setTimeout((): void => {
      expect(mockLabel.dataset.watched).toBe<PseudoBool>("true") as void;
    }, 3000);
  }) as void;
  it("should correctly assign ids to inputs and link them with labels", (): void => {
    const mockLabel = document.createElement("label") as HTMLLabelElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockLabel.appendChild<HTMLInputElement>(mockInput);
    document.body.appendChild<HTMLLabelElement>(mockLabel);
    gController.watchLabels() as void;
    setTimeout((): void => {
      expect(mockInput.id).toBeTruthy() as void;
      expect(mockLabel.htmlFor).toBe<string>(mockInput.id) as void;
    }, 3000);
  }) as void;
  it("should assign ids even if input is sibling of label", (): void => {
    const mockLabel = document.createElement("label") as HTMLLabelElement;
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockLabel.insertAdjacentElement("afterend", mockInput);
    document.body.appendChild<HTMLLabelElement>(mockLabel);
    gController.watchLabels();
    setTimeout((): void => {
      expect(mockInput.id).toBeTruthy() as void;
      expect(mockLabel.htmlFor).toBe<string>(mockInput.id) as void;
    }, 3000);
  }) as void;
}) as void;
