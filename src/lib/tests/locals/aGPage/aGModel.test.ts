//v1.0.0
import { addDblQuotes } from "../../../locals/aGPage/aGModel";
describe("addDblQuotes", () => {
  let inputElement: HTMLInputElement;
  let textareaElement: HTMLTextAreaElement;
  beforeEach(() => {
    inputElement = document.createElement("input");
    textareaElement = document.createElement("textarea");
    jest.clearAllMocks();
  });
  it("should add double quotes to an empty input field and set cursor between the quotes", () => {
    inputElement.value = "";
    addDblQuotes(inputElement);
    expect(inputElement.value).toBe('""');
    expect(inputElement.selectionStart).toBe(1);
    expect(inputElement.selectionEnd).toBe(1);
  });
  it("should append a double quote when the input field only contains a single quote", () => {
    inputElement.value = '"';
    addDblQuotes(inputElement);
    expect(inputElement.value).toBe('""');
    expect(inputElement.selectionStart).toBe(1);
    expect(inputElement.selectionEnd).toBe(1);
  });
  it("should return the input value when input contains text", () => {
    inputElement.value = "test";
    expect(addDblQuotes(inputElement)).toBe("test");
    expect(inputElement.value).toBe("test");
  });
  it("should return the textarea value when textarea contains text", () => {
    textareaElement.value = "textarea test";
    expect(addDblQuotes(textareaElement)).toBe("textarea test");
    expect(textareaElement.value).toBe("textarea test");
  });
  it("should call inputNotFound when element is not input or textarea", () => {
    const divElement = document.createElement("div");
    addDblQuotes(divElement as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalledWith(
      divElement,
      "UNDEFINED ID QUOTED CONTAINER",
      expect.any(String)
    );
  });
});
