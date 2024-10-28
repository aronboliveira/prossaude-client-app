import {
  assignFormatedValue,
  checkReturnIndex,
  addListenerInnerTabs,
} from "../../../locals/edFisNutPage/edFisNutController";
import { parseNotNaN } from "../../../global/gModel";
import { updateSimpleProperty } from "../../../global/handlers/gHandlers";
import { tabProps } from "../../../../vars";

jest.mock("../../global/gModel");
jest.mock("../../global/handlers/gHandlers");
jest.mock("./edFisNutModel");

describe("assignFormatedValue", () => {
  let inputElement;

  beforeEach(() => {
    inputElement = document.createElement("input");
    parseNotNaN.mockImplementation(val => parseFloat(val) || 0);
  });

  test("assigns a parsed number to a number input field", () => {
    inputElement.type = "number";
    assignFormatedValue(inputElement, 123.45678, 2);
    expect(inputElement.value).toBe("123.46");
  });

  test("assigns a formatted number to a text input field in pt-BR locale", () => {
    inputElement.type = "text";
    assignFormatedValue(inputElement, 1234.5, 2);
    expect(inputElement.value).toBe("1.234,50");
  });

  test('defaults to "0" when input is not a number', () => {
    inputElement.type = "text";
    assignFormatedValue(inputElement, "not a number", 2);
    expect(inputElement.value).toBe("0,00");
  });
});

describe("checkReturnIndex", () => {
  let inputElement;

  beforeEach(() => {
    inputElement = document.createElement("input");
    updateSimpleProperty.mockReturnValue(123.456);
  });

  test("returns the parsed property from updateSimpleProperty", () => {
    const result = checkReturnIndex(inputElement);
    expect(result).toBeCloseTo(123.456, 4);
  });

  test("returns the default prop if updateSimpleProperty returns null", () => {
    updateSimpleProperty.mockReturnValue(null);
    const result = checkReturnIndex(inputElement, 42);
    expect(result).toBe(42);
  });

  test("parses returned property to two decimal places if valid", () => {
    updateSimpleProperty.mockReturnValue(50.12345);
    const result = checkReturnIndex(inputElement, 0);
    expect(result).toBeCloseTo(50.1234, 4);
  });
});

describe("addListenerInnerTabs", () => {
  let containerElement, inputElement;

  beforeEach(() => {
    containerElement = document.createElement("div");
    inputElement = document.createElement("input");
    containerElement.appendChild(inputElement);
    tabProps.areColGroupsSimilar = true;
  });

  test("adds an input event listener to each input within a valid container", () => {
    addListenerInnerTabs(containerElement);
    inputElement.value = "-5";
    inputElement.dispatchEvent(new Event("input"));
    expect(inputElement.value).toBe("0");
  });

  test("does not re-add event listeners if dataset.isreal is set", () => {
    inputElement.dataset.isreal = "true";
    addListenerInnerTabs(containerElement);
    inputElement.value = "-10";
    inputElement.dispatchEvent(new Event("input"));
    expect(inputElement.value).toBe("-10"); // Value remains the same since listener wasn't added
  });

  test("handles cases where input fields are missing gracefully", () => {
    const emptyDiv = document.createElement("div");
    addListenerInnerTabs(emptyDiv);
    expect(emptyDiv.querySelectorAll("input").length).toBe(0);
  });
});
