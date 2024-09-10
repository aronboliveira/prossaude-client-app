//v1.0.0
import { resetAvDentValue, orderLabels } from "../../../locals/odPage/odModel";
import {
  inputNotFound,
  elementNotFound,
  elementNotPopulated,
} from "../../../global/handlers/errorHandler";
jest.mock("../../../global/handlers/errorHandler", () => ({
  extLine: jest.fn(),
  inputNotFound: jest.fn(),
  elementNotFound: jest.fn(),
  elementNotPopulated: jest.fn(),
}));
describe("resetAvDentValue", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should reset the value and set placeholder for predefined value", () => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="predefinedValue">
      <option class="elemOp" value="predefinedValue"></option>
    `;
    const input = document.querySelector(".inpAvDent") as HTMLInputElement;
    expect(resetAvDentValue(input)).toBe(true);
    setTimeout(() => {
      expect(input.value).toBe("");
      expect(input.getAttribute("placeholder")).toBe("Apagado");
      expect(input.classList.contains("placeholder-hidden")).toBe(true);
    }, 150);
  });
  test("should not reset for non-predefined value", () => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="nonPredefinedValue">
      <option class="elemOp" value="predefinedValue"></option>
    `;
    const input = document.querySelector(".inpAvDent") as HTMLInputElement;
    expect(resetAvDentValue(input)).toBe(false);
    expect(input.value).toBe("nonPredefinedValue");
  });
  test("should call inputNotFound if targInp is not an input, select, or textarea", () => {
    const div = document.createElement("div");
    resetAvDentValue(div);
    expect(inputNotFound).toHaveBeenCalledWith(
      div,
      "targInp",
      expect.anything()
    );
  });
  test("should call inputNotFound if dlOptionsArray contains invalid elements", () => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="predefinedValue">
      <div class="elemOp"></div>
    `;
    const input = document.querySelector(".inpAvDent") as HTMLInputElement;
    resetAvDentValue(input);
    expect(inputNotFound).toHaveBeenCalledWith(
      expect.anything(),
      "UNDEFINED ID DLOPTION",
      expect.anything()
    );
  });
});
describe("orderLabels", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should set correct order for label elements", () => {
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
    labels.forEach((label, i) => {
      label instanceof HTMLElement &&
        expect(label.style.getPropertyValue("order")).toBe((i + 1).toString());
    });
  });
  test("should call elementNotPopulated when labsNList is empty or invalid", () => {
    document.body.innerHTML = `
      <div class="subDiv">
        <label class="labelAvDent" id="label1"></label>
      </div>
    `;
    document.getElementById("label1")?.removeAttribute("id");
    orderLabels(document.querySelector(".subDiv") as HTMLElement);
    expect(elementNotPopulated).toHaveBeenCalledWith(
      expect.anything(),
      "labsNList in orderLabels",
      expect.anything()
    );
  });
  test("should call elementNotFound when subDiv is not an HTMLElement", () => {
    const div = document.createElement("input");
    orderLabels(div);
    expect(elementNotFound).toHaveBeenCalledWith(
      div,
      "subDiv in orderLabels",
      expect.anything()
    );
  });
});
