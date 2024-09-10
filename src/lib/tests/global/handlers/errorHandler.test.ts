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
describe("Error Handlers Tests", () => {
  describe("extLine", () => {
    it("should return the correct line number from the error stack", () => {
      const error = new Error();
      const line = extLine(error);
      expect(typeof line).toBe("string");
      expect(line).toBeDefined();
    });
  });
  describe("elementNotFound", () => {
    it("should log and return the correct error for HTMLElement", () => {
      const element = document.createElement("input");
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = elementNotFound(element, "inputElement", "42");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("ELEMENT NOT FOUND, LINE 42")
      );
      spy.mockRestore();
    });
  });
  describe("inputNotFound", () => {
    it("should log and return the correct error for input element", () => {
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = inputNotFound(inputElement, "inputElement", "52");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("INPUT NOT FOUND, LINE 52")
      );
      spy.mockRestore();
    });
  });
  describe("elementWithArrayError", () => {
    it("should log and return the correct error when an element is not found within an array", () => {
      const element = document.createElement("div");
      const array = [element];
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = elementWithArrayError(
        "Testing",
        array,
        "testArray",
        element,
        "testElement",
        "32"
      );
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("ELEMENT WITH ARRAY ERROR, LINE 32")
      );
      spy.mockRestore();
    });
  });
  describe("elementWithObjectError", () => {
    it("should log and return the correct error for an object", () => {
      const obj = { key: "value" };
      const element = document.createElement("span");
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = elementWithObjectError(
        "Context",
        obj,
        element,
        "testElement",
        "45"
      );
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("ELEMENT WITH OBJECT ERROR, LINE 45")
      );
      spy.mockRestore();
    });
  });
  describe("elementNotPopulated", () => {
    it("should log and return an error when an array is empty", () => {
      const array: any[] = [];
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = elementNotPopulated(array, "testArray", "64");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("ELEMENT POPULATION ERROR, LINE 64")
      );
      spy.mockRestore();
    });
  });
  describe("multipleElementsNotFound", () => {
    it("should log and return the correct error for multiple elements", () => {
      const element1 = document.createElement("input");
      const element2 = document.createElement("textarea");
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = multipleElementsNotFound(
        "72",
        "TestingMultipleElements",
        element1,
        element2
      );
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("MULTIPLE ELEMENTS NOT FOUND, LINE 72")
      );
      spy.mockRestore();
    });
  });
  describe("elementsNotFoundFunction", () => {
    it("should log and return an error when elements are not found for a specific function", () => {
      const element = document.createElement("button");
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = elementsNotFoundFunction("82", "testFunction", element);
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("ELEMENTS NOT FOUND FOR FUNCTION, LINE 82")
      );
      spy.mockRestore();
    });
  });
  describe("maxNumberError", () => {
    it("should log and return an error for an invalid number", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = maxNumberError(999, "MaxValueTest", "100");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("MAX NUMBER ERROR, LINE 100")
      );
      spy.mockRestore();
    });
  });
  describe("stringError", () => {
    it("should log and return an error for a string validation failure", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = stringError("Testing", "InvalidString", "120");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("STRING ERROR, LINE 120")
      );
      spy.mockRestore();
    });
  });
  describe("matchError", () => {
    it("should log and return a match error", () => {
      const element = document.createElement("div");
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = matchError(
        "ContextMatch",
        element,
        "MatchingError",
        "132"
      );
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("MATCH ERROR, LINE 132")
      );
      spy.mockRestore();
    });
  });
  describe("typeError", () => {
    it("should log and return a type error", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = typeError("ContextType", 123, "string", "142");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("TYPE ERROR, LINE 142")
      );
      spy.mockRestore();
    });
  });
  describe("objectError", () => {
    it("should log and return an object validation error", () => {
      const object = { key: "value" };
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const result = objectError("ContextObj", object, "TestObject", 5, "150");
      expect(result).toBeInstanceOf(Error);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("OBJECT ERROR, LINE 150")
      );
      spy.mockRestore();
    });
  });
});
