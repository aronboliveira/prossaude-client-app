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
      expect(typeof line).toBe<string>("string");
      expect(line).toBeDefined();
    });
  });
  describe("elementNotFound", (): void => {
    it("should log and return the correct error for HTMLElement", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(elementNotFound(document.createElement("input"), "inputElement", "42")).toBeInstanceOf<ErrorConstructor>(
        Error
      );
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT NOT FOUND, LINE 42"));
      spy.mockRestore();
    });
  });
  describe("inputNotFound", (): void => {
    it("should log and return the correct error for input element", (): void => {
      const inputElement = document.createElement("input"),
        spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      inputElement.type = "text";
      expect(inputNotFound(inputElement, "inputElement", "52")).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("INPUT NOT FOUND, LINE 52"));
      spy.mockRestore();
    });
  });
  describe("elementWithArrayError", (): void => {
    it("should log and return the correct error when an element is not found within an array", (): void => {
      const element = document.createElement("div"),
        spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(
        elementWithArrayError("Testing", [element], "testArray", element, "testElement", "32")
      ).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT WITH ARRAY ERROR, LINE 32"));
      spy.mockRestore();
    });
  });
  describe("elementWithObjectError", (): void => {
    it("should log and return the correct error for an object", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(
        elementWithObjectError("Context", { key: "value" }, document.createElement("span"), "testElement", "45")
      ).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT WITH OBJECT ERROR, LINE 45"));
      spy.mockRestore();
    });
  });
  describe("elementNotPopulated", (): void => {
    it("should log and return an error when an array is empty", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(elementNotPopulated([], "testArray", "64")).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENT POPULATION ERROR, LINE 64"));
      spy.mockRestore();
    });
  });
  describe("multipleElementsNotFound", (): void => {
    it("should log and return the correct error for multiple elements", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(
        multipleElementsNotFound(
          "72",
          "TestingMultipleElements",
          document.createElement("input"),
          document.createElement("textarea")
        )
      ).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("MULTIPLE ELEMENTS NOT FOUND, LINE 72"));
      spy.mockRestore();
    });
  });
  describe("elementsNotFoundFunction", (): void => {
    it("should log and return an error when elements are not found for a specific function", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(
        elementsNotFoundFunction("82", "testFunction", document.createElement("button"))
      ).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ELEMENTS NOT FOUND FOR FUNCTION, LINE 82"));
      spy.mockRestore();
    });
  });
  describe("maxNumberError", (): void => {
    it("should log and return an error for an invalid number", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(maxNumberError(999, "MaxValueTest", "100")).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("MAX NUMBER ERROR, LINE 100"));
      spy.mockRestore();
    });
  });
  describe("stringError", (): void => {
    it("should log and return an error for a string validation failure", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(stringError("Testing", "InvalidString", "120")).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("STRING ERROR, LINE 120"));
      spy.mockRestore();
    });
  });
  describe("matchError", (): void => {
    it("should log and return a match error", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(
        matchError("ContextMatch", document.createElement("div"), "MatchingError", "132")
      ).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("MATCH ERROR, LINE 132"));
      spy.mockRestore();
    });
  });
  describe("typeError", (): void => {
    it("should log and return a type error", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(typeError("ContextType", 123, "string", "142")).toBeInstanceOf<ErrorConstructor>(Error);
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("TYPE ERROR, LINE 142"));
      spy.mockRestore();
    });
  });
  describe("objectError", (): void => {
    it("should log and return an object validation error", (): void => {
      const spy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {});
      expect(objectError("ContextObj", { key: "value" }, "TestObject", 5, "150")).toBeInstanceOf<ErrorConstructor>(
        Error
      );
      expect(spy).toHaveBeenCalledWith<[any]>(expect.stringContaining("OBJECT ERROR, LINE 150"));
      spy.mockRestore();
    });
  });
});
