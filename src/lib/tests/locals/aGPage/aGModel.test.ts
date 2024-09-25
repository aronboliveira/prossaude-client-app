//v1.0.0
import { addDblQuotes } from "../../../locals/aGPage/aGModel";
import { ErrorHandler } from "../../testVars";
describe("addDblQuotes", (): void => {
  let inputElement: HTMLInputElement;
  let textareaElement: HTMLTextAreaElement;
  beforeEach((): void => {
    inputElement = document.createElement("input") as HTMLInputElement;
    textareaElement = document.createElement("textarea");
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add double quotes to an empty input field and set cursor between the quotes", (): void => {
    inputElement.value = "";
    addDblQuotes(inputElement);
    (expect(inputElement.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>('""') as void;
    (expect(inputElement.selectionStart) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(1) as void;
    (expect(inputElement.selectionEnd) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(1) as void;
  }) as void;
  it("should append a double quote when the input field only contains a single quote", (): void => {
    inputElement.value = '"';
    addDblQuotes(inputElement);
    (expect(inputElement.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>('""') as void;
    (expect(inputElement.selectionStart) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(1) as void;
    (expect(inputElement.selectionEnd) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(1) as void;
  }) as void;
  it("should return the input value when input contains text", (): void => {
    inputElement.value = "test";
    (expect(addDblQuotes(inputElement)) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("test") as void;
    (expect(inputElement.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("test") as void;
  }) as void;
  it("should return the textarea value when textarea contains text", (): void => {
    textareaElement.value = "textarea test";
    (expect(addDblQuotes(textareaElement)) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "textarea test"
    ) as void;
    (expect(textareaElement.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("textarea test") as void;
  }) as void;
  it("should call inputNotFound when element is not input or textarea", (): void => {
    const divElement = document.createElement("div") as HTMLDivElement;
    addDblQuotes(divElement as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalledWith<[HTMLElement, string, any]>(
      divElement,
      "UNDEFINED ID QUOTED CONTAINER",
      expect.any(String) as any
    );
  }) as void;
}) as void;
