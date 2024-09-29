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
    extLine: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
    elementNotFound: jest.fn() as jest.Mock,
    elementNotPopulated: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("resetAvDentValue", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  test("should reset the value and set placeholder for predefined value", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="predefinedValue">
      <option class="elemOp" value="predefinedValue"></option>
    `;
    const input = document.querySelector<HTMLInputElement>(".inpAvDent") as HTMLInputElement;
    (expect(resetAvDentValue(input)) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
    setTimeout((): void => {
      (expect(input.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("") as void;
      (expect(input.getAttribute("placeholder") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
        "Apagado"
      ) as void;
      (expect(input.classList.contains("placeholder-hidden")) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(
        true
      ) as void;
    }, 150);
  }) as void;
  test("should not reset for non-predefined value", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="nonPredefinedValue">
      <option class="elemOp" value="predefinedValue"></option>
    `;
    const input = document.querySelector<HTMLInputElement>(".inpAvDent") as HTMLInputElement;
    (expect(resetAvDentValue(input)) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
    (expect(input.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("nonPredefinedValue") as void;
  }) as void;
  test("should call inputNotFound if targInp is not an input, select, or textarea", (): void => {
    const div = document.createElement("div") as HTMLDivElement;
    resetAvDentValue(div);
    (expect(inputNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof inputNotFound>
    >(div, "targInp", expect.anything() as any);
  }) as void;
  test("should call inputNotFound if dlOptionsArray contains invalid elements", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" value="predefinedValue">
      <div class="elemOp"></div>
    `;
    const input = document.querySelector<HTMLInputElement>(".inpAvDent") as HTMLInputElement;
    resetAvDentValue(input);
    (expect(inputNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof inputNotFound>
    >(expect.anything() as any, "UNDEFINED ID DLOPTION", expect.anything() as any);
  }) as void;
}) as void;
describe("orderLabels", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  test("should set correct order for label elements", (): void => {
    document.body.innerHTML = `
      <div class="subDiv">
        <label class="labelAvDent" id="label1"></label>
        <label class="labelAvDent" id="label2"></label>
        <label class="labelAvDent" id="label3"></label>
      </div>
    `;
    const subDiv = document.querySelector<HTMLElement>(".subDiv") as HTMLElement;
    orderLabels(subDiv) as void;
    const labels = document.querySelectorAll(".labelAvDent") as NodeListOf<HTMLLabelElement>;
    labels.forEach((label, i): void => {
      label instanceof HTMLElement &&
        expect(
          ((label as HTMLLabelElement).style as CSSStyleDeclaration).getPropertyValue("order") as string
        ).toBe<string>((i + 1).toString());
    }) as void;
  }) as void;
  test("should call elementNotPopulated when labsNList is empty or invalid", (): void => {
    document.body.innerHTML = `
      <div class="subDiv">
        <label class="labelAvDent" id="label1"></label>
      </div>
    `;
    document.getElementById("label1")?.removeAttribute("id");
    orderLabels(document.querySelector<HTMLElement>(".subDiv"));
    (expect(elementNotPopulated) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof elementNotPopulated>
    >(expect.anything() as any, "labsNList in orderLabels", expect.anything() as any);
  }) as void;
  test("should call elementNotFound when subDiv is not an HTMLElement", (): void => {
    const div = document.createElement("input") as HTMLInputElement;
    orderLabels(div) as void;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof elementNotFound>
    >(div, "subDiv in orderLabels", expect.anything() as any);
  }) as void;
}) as void;
