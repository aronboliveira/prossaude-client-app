import { handleClientPermissions } from "../../../../locals/panelPage/handlers/consHandlerUsers";
import { typeError, elementNotPopulated } from "../../../../global/handlers/errorHandler";
import { ConsoleMethod } from "@/lib/tests/testVars";
jest.mock(
  "../../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    typeError: jest.Mock<any, any, any>;
    elementNotPopulated: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn() as jest.Mock,
    typeError: jest.fn() as jest.Mock,
    elementNotPopulated: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("handleClientPermissions", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks() as typeof jest;
    document.body.innerHTML = "";
  }) as void;
  test("should disable elements if userClass is not in allowedClasses", (): void => {
    document.body.innerHTML = `
      <input id="input1" class="btn" />
      <button id="button1" class="btn" />
      <select id="select1"></select>
      <textarea id="textarea1"></textarea>
    `;
    const input = document.getElementById("input1") as HTMLInputElement;
    const button = document.getElementById("button1") as HTMLButtonElement;
    const select = document.getElementById("select1") as HTMLSelectElement;
    const textarea = document.getElementById("textarea1") as HTMLTextAreaElement;
    handleClientPermissions("estudante", ["coordenador"], input, button, select, textarea);
    expect(input.disabled).toBe<boolean>(true) as void;
    expect(button.disabled).toBe<boolean>(true) as void;
    expect(select.disabled).toBe<boolean>(true) as void;
    expect(textarea.disabled).toBe<boolean>(true) as void;
    expect(button.classList).toContain<string>("btn-secondary") as void;
    expect(button.classList).toContain<string>("blocked") as void;
  }) as void;
  test("should enable elements if userClass is in allowedClasses", (): void => {
    document.body.innerHTML = `
      <input id="input1" class="btn btn-secondary blocked" />
      <button id="button1" class="btn btn-secondary blocked" />
    `;
    const input = document.getElementById("input1") as HTMLInputElement;
    const button = document.getElementById("button1") as HTMLButtonElement;
    handleClientPermissions("coordenador", ["coordenador"], input, button);
    expect(input.disabled).toBe<boolean>(false) as void;
    expect(button.disabled).toBe<boolean>(false) as void;
    expect(button.classList).not.toContain<string>("btn-secondary") as void;
    expect(button.classList).not.toContain<string>("blocked") as void;
  }) as void;
  test("should remove elements that are not inputs, buttons, selects, or textareas if userClass is not in allowedClasses", (): void => {
    document.body.innerHTML = `
      <datalist id="datalist1"></datalist>
      <table id="table1"></table>
    `;
    handleClientPermissions(
      "estudante",
      ["coordenador"],
      document.getElementById("datalist1") as HTMLDataListElement,
      document.getElementById("table1") as HTMLTableElement
    );
    expect(document.getElementById("datalist1")).toBeNull() as void;
    expect(document.getElementById("table1")).toBeNull() as void;
  }) as void;
  test("should not remove elements if userClass is in allowedClasses", (): void => {
    document.body.innerHTML = `
      <datalist id="datalist1"></datalist>
      <table id="table1"></table>
    `;
    handleClientPermissions(
      "coordenador",
      ["coordenador"],
      document.getElementById("datalist1") as HTMLDataListElement,
      document.getElementById("table1") as HTMLTableElement
    );
    expect(document.getElementById("datalist1")).toBeTruthy() as void;
    expect(document.getElementById("table1")).toBeTruthy() as void;
  }) as void;
  test("should throw a typeError if userClass is not a string", (): void => {
    handleClientPermissions(123 as any, ["coordenador"]);
    expect(typeError).toHaveBeenCalledWith<Parameters<typeof typeError>>(
      "validating type of userClass in handleClientPermissions",
      123,
      "string",
      expect.any(Function)
    );
  }) as void;
  test("should throw an elementNotPopulated error if allowedClasses is not an array of strings", (): void => {
    handleClientPermissions("estudante", [123 as any]);
    expect(elementNotPopulated).toHaveBeenCalledWith<Parameters<typeof elementNotPopulated>>(
      "[123]",
      "allowedClasses",
      expect.any(Function)
    );
  }) as void;
  test("should throw an elementNotPopulated error if elements are not valid HTML elements", (): void => {
    handleClientPermissions("estudante", ["coordenador"], {} as Element);
    expect(elementNotPopulated).toHaveBeenCalledWith<Parameters<typeof elementNotPopulated>>(
      [""],
      "Elements for handleSupervisionCredential",
      expect.any(Function)
    );
  }) as void;
  test("should log an error if an unexpected error occurs", (): void => {
    const consoleSpy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation() as jest.SpyInstance;
    handleClientPermissions(null as any);
    expect(consoleSpy).toHaveBeenCalledWith<[any]>(expect.stringContaining("ERROR:")) as void;
    consoleSpy.mockRestore() as void;
  }) as void;
}) as void;
