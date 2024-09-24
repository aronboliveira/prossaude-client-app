//v1.0.0
import { addDblQuotes } from "../../../locals/aGPage/aGModel";
import { ErrorHandler } from "../../testVars";
describe("addDblQuotes", (): void => {
  let inputElement: HTMLInputElement;
  let textareaElement: HTMLTextAreaElement;
  beforeEach((): void => {
    inputElement = document.createElement("input");
    textareaElement = document.createElement("textarea");
    jest.clearAllMocks();
  });
  it("should add double quotes to an empty input field and set cursor between the quotes", (): void => {
    inputElement.value = "";
    addDblQuotes(inputElement);
    expect(inputElement.value).toBe<string>('""');
    expect(inputElement.selectionStart).toBe<number>(1);
    expect(inputElement.selectionEnd).toBe<number>(1);
  });
  it("should append a double quote when the input field only contains a single quote", (): void => {
    inputElement.value = '"';
    addDblQuotes(inputElement);
    expect(inputElement.value).toBe<string>('""');
    expect(inputElement.selectionStart).toBe<number>(1);
    expect(inputElement.selectionEnd).toBe<number>(1);
  });
  it("should return the input value when input contains text", (): void => {
    inputElement.value = "test";
    expect(addDblQuotes(inputElement)).toBe<string>("test");
    expect(inputElement.value).toBe<string>("test");
  });
  it("should return the textarea value when textarea contains text", (): void => {
    textareaElement.value = "textarea test";
    expect(addDblQuotes(textareaElement)).toBe<string>("textarea test");
    expect(textareaElement.value).toBe<string>("textarea test");
  });
  it("should call inputNotFound when element is not input or textarea", (): void => {
    const divElement = document.createElement("div");
    addDblQuotes(divElement as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalledWith<[HTMLElement, string, any]>(divElement, "UNDEFINED ID QUOTED CONTAINER", expect.any(String));
  });
});
