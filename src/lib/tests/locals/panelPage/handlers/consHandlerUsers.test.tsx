import { handleClientPermissions } from "../../../../locals/panelPage/handlers/consHandlerUsers";
import {
  typeError,
  elementNotPopulated,
} from "../../../../global/handlers/errorHandler";
jest.mock("../../../../global/handlers/errorHandler", () => ({
  extLine: jest.fn(),
  typeError: jest.fn(),
  elementNotPopulated: jest.fn(),
}));
describe("handleClientPermissions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });
  test("should disable elements if userClass is not in allowedClasses", () => {
    document.body.innerHTML = `
      <input id="input1" class="btn" />
      <button id="button1" class="btn" />
      <select id="select1"></select>
      <textarea id="textarea1"></textarea>
    `;
    const input = document.getElementById("input1") as HTMLInputElement;
    const button = document.getElementById("button1") as HTMLButtonElement;
    const select = document.getElementById("select1") as HTMLSelectElement;
    const textarea = document.getElementById(
      "textarea1"
    ) as HTMLTextAreaElement;
    handleClientPermissions(
      "estudante",
      ["coordenador"],
      input,
      button,
      select,
      textarea
    );
    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);
    expect(select.disabled).toBe(true);
    expect(textarea.disabled).toBe(true);
    expect(button.classList).toContain("btn-secondary");
    expect(button.classList).toContain("blocked");
  });
  test("should enable elements if userClass is in allowedClasses", () => {
    document.body.innerHTML = `
      <input id="input1" class="btn btn-secondary blocked" />
      <button id="button1" class="btn btn-secondary blocked" />
    `;
    const input = document.getElementById("input1") as HTMLInputElement;
    const button = document.getElementById("button1") as HTMLButtonElement;
    handleClientPermissions("coordenador", ["coordenador"], input, button);
    expect(input.disabled).toBe(false);
    expect(button.disabled).toBe(false);
    expect(button.classList).not.toContain("btn-secondary");
    expect(button.classList).not.toContain("blocked");
  });
  test("should remove elements that are not inputs, buttons, selects, or textareas if userClass is not in allowedClasses", () => {
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
    expect(document.getElementById("datalist1")).toBeNull();
    expect(document.getElementById("table1")).toBeNull();
  });
  test("should not remove elements if userClass is in allowedClasses", () => {
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
    expect(document.getElementById("datalist1")).toBeTruthy();
    expect(document.getElementById("table1")).toBeTruthy();
  });
  test("should throw a typeError if userClass is not a string", () => {
    handleClientPermissions(123 as any, ["coordenador"]);
    expect(typeError).toHaveBeenCalledWith(
      "validating type of userClass in handleClientPermissions",
      123,
      "string",
      expect.any(Function)
    );
  });
  test("should throw an elementNotPopulated error if allowedClasses is not an array of strings", () => {
    handleClientPermissions("estudante", [123 as any]);
    expect(elementNotPopulated).toHaveBeenCalledWith(
      "[123]",
      "allowedClasses",
      expect.any(Function)
    );
  });
  test("should throw an elementNotPopulated error if elements are not valid HTML elements", () => {
    handleClientPermissions("estudante", ["coordenador"], {} as Element);
    expect(elementNotPopulated).toHaveBeenCalledWith(
      [{}],
      "Elements for handleSupervisionCredential",
      expect.any(Function)
    );
  });
  test("should log an error if an unexpected error occurs", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    handleClientPermissions(null as any);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("ERROR:"));
    consoleSpy.mockRestore();
  });
});
