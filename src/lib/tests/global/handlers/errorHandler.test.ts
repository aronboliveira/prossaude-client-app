//v1.0.0
import {
  extLine,
  elementNotFound,
  inputNotFound,
  elementWithArrayError,
  elementWithObjectError,
  elementNotPopulated,
  multipleElementsNotFound,
  elementsNotFoundFunction,
  maxNumberError,
  stringError,
  matchError,
  typeError,
  objectError,
} from "../../../global/handlers/errorHandler";
import { ConsoleMethod } from "../../testVars";
describe("Error Handlers Tests", (): void => {
  describe("extLine", (): void => {
    it("should return the correct line number from the error stack", (): void => {
      const line = extLine(new Error());
      expect(typeof line).toBe<string>("string") as void;
      expect(line).toBeDefined() as void;
    }) as void;
  }) as void;
  describe("elementNotFound", (): void => {
    it("should log and return the correct error for HTMLElement", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(
        elementNotFound(document.createElement("input") as HTMLInputElement, "inputElement", "42")
      ).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT NOT FOUND, LINE 42")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("inputNotFound", (): void => {
    it("should log and return the correct error for input element", (): void => {
      const inputElement = document.createElement("input") as HTMLInputElement,
        spy = jest
          .spyOn<Console, ConsoleMethod>(console, "error")
          .mockImplementation((): void => {}) as jest.SpyInstance;
      inputElement.type = "text";
      expect(inputNotFound(inputElement, "inputElement", "52")).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("INPUT NOT FOUND, LINE 52")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("elementWithArrayError", (): void => {
    it("should log and return the correct error when an element is not found within an array", (): void => {
      const element = document.createElement("div") as HTMLDivElement,
        spy = jest
          .spyOn<Console, ConsoleMethod>(console, "error")
          .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(
        elementWithArrayError("Testing", [element], "testArray", element, "testElement", "32")
      ).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT WITH ARRAY ERROR, LINE 32")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("elementWithObjectError", (): void => {
    it("should log and return the correct error for an object", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(
        elementWithObjectError("Context", { key: "value" }, document.createElement("span"), "testElement", "45")
      ).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT WITH OBJECT ERROR, LINE 45")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("elementNotPopulated", (): void => {
    it("should log and return an error when an array is empty", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(elementNotPopulated([], "testArray", "64")).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT POPULATION ERROR, LINE 64")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("multipleElementsNotFound", (): void => {
    it("should log and return the correct error for multiple elements", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(
        multipleElementsNotFound(
          "72",
          "TestingMultipleElements",
          document.createElement("input") as HTMLInputElement,
          document.createElement("textarea")
        )
      ).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("MULTIPLE ELEMENTS NOT FOUND, LINE 72")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("elementsNotFoundFunction", (): void => {
    it("should log and return an error when elements are not found for a specific function", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(
        elementsNotFoundFunction("82", "testFunction", document.createElement("button") as HTMLButtonElement)
      ).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("ELEMENTS NOT FOUND FOR FUNCTION, LINE 82")
      ) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("maxNumberError", (): void => {
    it("should log and return an error for an invalid number", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(maxNumberError(999, "MaxValueTest", "100")).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("MAX NUMBER ERROR, LINE 100")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("stringError", (): void => {
    it("should log and return an error for a string validation failure", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(stringError("Testing", "InvalidString", "120")).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("STRING ERROR, LINE 120")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("matchError", (): void => {
    it("should log and return a match error", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(
        matchError("ContextMatch", document.createElement("div") as HTMLDivElement, "MatchingError", "132")
      ).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("MATCH ERROR, LINE 132")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("typeError", (): void => {
    it("should log and return a type error", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(typeError("ContextType", 123, "string", "142")).toBeInstanceOf<ErrorConstructor>(Error) as void;
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("TYPE ERROR, LINE 142")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
  describe("objectError", (): void => {
    it("should log and return an object validation error", (): void => {
      const spy = jest
        .spyOn<Console, ConsoleMethod>(console, "error")
        .mockImplementation((): void => {}) as jest.SpyInstance;
      expect(objectError("ContextObj", { key: "value" }, "TestObject", 5, "150")).toBeInstanceOf<ErrorConstructor>(
        Error
      );
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("OBJECT ERROR, LINE 150")) as void;
      spy.mockRestore() as void;
    }) as void;
  }) as void;
}) as void;
