//v1.0.0
import { resetAvDentValue, orderLabels } from "../../../locals/odPage/odModel";
import { inputNotFound, elementNotFound, elementNotPopulated } from "../../../global/handlers/errorHandler";
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    elementNotFound: jest.Mock<any, any, any>;
    elementNotPopulated: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn(),
    inputNotFound: jest.fn(),
    elementNotFound: jest.fn(),
    elementNotPopulated: jest.fn(),
  })
) as typeof jest;
describe("resetAvDentValue", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  test("should reset the value and set placeholder for predefined value", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="predefinedValue">
      <option class="elemOp" value="predefinedValue"></option>
    `;
    const input = document.querySelector(".inpAvDent") as HTMLInputElement;
    expect(resetAvDentValue(input)).toBe<boolean>(true);
    setTimeout(() => {
      expect(input.value).toBe<string>("");
      expect(input.getAttribute("placeholder")).toBe<string>("Apagado");
      expect(input.classList.contains("placeholder-hidden")).toBe<boolean>(true);
    }, 150);
  });
  test("should not reset for non-predefined value", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="nonPredefinedValue">
      <option class="elemOp" value="predefinedValue"></option>
    `;
    const input = document.querySelector(".inpAvDent") as HTMLInputElement;
    expect(resetAvDentValue(input)).toBe<boolean>(false);
    expect(input.value).toBe<string>("nonPredefinedValue");
  });
  test("should call inputNotFound if targInp is not an input, select, or textarea", (): void => {
    const div = document.createElement("div") as HTMLDivElement;
    resetAvDentValue(div);
    expect(inputNotFound).toHaveBeenCalledWith<Parameters<typeof inputNotFound>>(
      div,
      "targInp",
      expect.anything() as any
    );
  });
  test("should call inputNotFound if dlOptionsArray contains invalid elements", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="predefinedValue">
      <div class="elemOp"></div>
    `;
    const input = document.querySelector(".inpAvDent") as HTMLInputElement;
    resetAvDentValue(input);
    expect(inputNotFound).toHaveBeenCalledWith<Parameters<typeof inputNotFound>>(
      expect.anything() as any,
      "UNDEFINED ID DLOPTION",
      expect.anything() as any
    );
  });
});
describe("orderLabels", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  test("should set correct order for label elements", (): void => {
    document.body.innerHTML = `
      <div class="subDiv">
        <label class="labelAvDent" id="label1"></label>
        <label class="labelAvDent" id="label2"></label>
        <label class="labelAvDent" id="label3"></label>
      </div>
    `;
    const subDiv = document.querySelector(".subDiv") as HTMLElement;
    orderLabels(subDiv);
    const labels = document.querySelectorAll(".labelAvDent");
    labels.forEach((label, i): void => {
      label instanceof HTMLElement && expect(label.style.getPropertyValue("order")).toBe<string>((i + 1).toString());
    });
  });
  test("should call elementNotPopulated when labsNList is empty or invalid", (): void => {
    document.body.innerHTML = `
      <div class="subDiv">
        <label class="labelAvDent" id="label1"></label>
      </div>
    `;
    document.getElementById("label1")?.removeAttribute("id");
    orderLabels(document.querySelector(".subDiv") as HTMLElement);
    expect(elementNotPopulated).toHaveBeenCalledWith<Parameters<typeof elementNotPopulated>>(
      expect.anything() as any,
      "labsNList in orderLabels",
      expect.anything() as any
    );
  });
  test("should call elementNotFound when subDiv is not an HTMLElement", (): void => {
    const div = document.createElement("input") as HTMLInputElement;
    orderLabels(div);
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      div,
      "subDiv in orderLabels",
      expect.anything() as any
    );
  });
});
