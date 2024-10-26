//v1.0.0
import {
  addListenerTelInputs,
  addListenersEmailInputs,
  addListenerCPFCont,
  addListenersCepElements,
} from "../../../locals/aGPage/aGController";
import { formatCEP, formatCPF, formatTel, addEmailExtension } from "../../../global/gModel";
import { inputNotFound, multipleElementsNotFound, elementNotPopulated } from "../../../global/handlers/errorHandler";
import * as AGHandlers from "../../../locals/aGPage/aGHandlers";
jest.mock(
  "../../global/gModel",
  (): {
    formatCEP: jest.Mock<any, any, any>;
    formatCPF: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
    addEmailExtension: jest.Mock<any, any, any>;
  } => ({
    formatCEP: jest.fn() as jest.Mock,
    formatCPF: jest.fn() as jest.Mock,
    formatTel: jest.fn() as jest.Mock,
    addEmailExtension: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
    elementNotPopulated: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
    multipleElementsNotFound: jest.fn() as jest.Mock,
    elementNotPopulated: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "./aGHandlers",
  (): {
    enableCEPBtn: jest.Mock<any, any, any>;
    searchCEP: jest.Mock<any, any, any>;
    searchCEPXML: jest.Mock<any, any, any>;
  } => ({
    enableCEPBtn: jest.fn() as jest.Mock,
    searchCEP: (jest.fn() as jest.Mock).mockResolvedValue("success"),
    searchCEPXML: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("addListenerTelInputs", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  it("should add event listeners to all tel inputs and format them on input", (): void => {
    const telInput = document.createElement("input") as HTMLInputElement;
    telInput.type = "text";
    telInput.id = "telInput1";
    document.body.appendChild(telInput);
    const telInputs = addListenerTelInputs();
    expect(telInputs.length).toBe<number>(1) as void;
    expect(telInputs[0]).toBe<HTMLInputElement>(telInput) as void;
    telInput.dispatchEvent(new Event("input")) as boolean;
    expect(formatTel).toHaveBeenCalledWith<Parameters<typeof formatTel>>(telInput) as void;
  }) as void;
  it("should call elementNotPopulated if no tel inputs are found", (): void => {
    addListenerTelInputs();
    expect(elementNotPopulated).toHaveBeenCalled() as void;
  }) as void;
  it("should call inputNotFound if target input is not found", (): void => {
    const telInput = document.createElement("textarea");
    telInput.id = "telInput1";
    document.body.appendChild(telInput);
    addListenerTelInputs();
    telInput.dispatchEvent(new Event("input")) as boolean;
    expect(inputNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addListenersEmailInputs", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  it("should add event listeners to email inputs and format them on click and input", (): void => {
    const emailInput = document.createElement("input") as HTMLInputElement;
    emailInput.id = "emailInput1";
    emailInput.type = "text";
    document.body.appendChild(emailInput);
    const emailInputs = addListenersEmailInputs();
    expect(emailInputs.length).toBe<number>(1) as void;
    expect(emailInputs[0]).toBe<HTMLInputElement>(emailInput) as void;
    emailInput.click() as void;
    expect(addEmailExtension).toHaveBeenCalledWith<Parameters<typeof addEmailExtension>>(emailInput) as void;
    emailInput.dispatchEvent(new Event("input")) as boolean;
    expect(addEmailExtension).toHaveBeenCalledWith<Parameters<typeof addEmailExtension>>(emailInput) as void;
  }) as void;
  it("should call elementNotPopulated if no email inputs are found", (): void => {
    addListenersEmailInputs();
    expect(elementNotPopulated).toHaveBeenCalled() as void;
  }) as void;
  it("should call inputNotFound if the target is not an input", (): void => {
    const invalidInput = document.createElement("textarea");
    invalidInput.id = "emailInput1";
    document.body.appendChild(invalidInput);
    addListenersEmailInputs();
    invalidInput.click() as void;
    expect(inputNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addListenerCPFCont", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  it("should add input event listener to CPF input and format CPF", (): void => {
    const inpCPF = document.createElement("input") as HTMLInputElement;
    inpCPF.id = "inpCPF";
    document.body.appendChild(inpCPF);
    expect(addListenerCPFCont()).toBe<HTMLInputElement>(inpCPF) as void;
    inpCPF.dispatchEvent(new Event("input")) as boolean;
    expect(formatCPF).toHaveBeenCalledWith<Parameters<typeof formatCPF>>(inpCPF) as void;
  }) as void;
  it("should call inputNotFound if the CPF input is not found", (): void => {
    addListenerCPFCont();
    expect(inputNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addListenersCepElements", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as void;
  it("should add event listeners to the CEP input and button, and handle input correctly", (): void => {
    const cepElement = document.createElement("input") as HTMLInputElement;
    cepElement.id = "cepId";
    document.body.appendChild(cepElement);
    const cepElementBtn = document.createElement("button") as HTMLButtonElement;
    cepElementBtn.id = "autoCompCepBtn";
    document.body.appendChild(cepElementBtn);
    const [returnedCepElement, returnedCepElementBtn] = addListenersCepElements();
    expect(returnedCepElement).toBe<HTMLInputElement>(cepElement) as void;
    expect(returnedCepElementBtn).toBe<HTMLButtonElement>(cepElementBtn) as void;
    cepElement.dispatchEvent(new Event("input")) as boolean;
    expect(formatCEP).toHaveBeenCalledWith<Parameters<typeof formatCEP>>(cepElement) as void;
    cepElementBtn.dispatchEvent(new Event("click")) as boolean;
    expect(AGHandlers.enableCEPBtn).toHaveBeenCalledWith<Parameters<typeof AGHandlers.enableCEPBtn>>(
      cepElementBtn,
      cepElement.value.length,
    );
    expect(AGHandlers.searchCEP).toHaveBeenCalled() as void;
  }) as void;

  it("should call multipleElementsNotFound if the CEP input or button is not found", (): void => {
    addListenersCepElements();
    expect(multipleElementsNotFound).toHaveBeenCalled() as void;
  }) as void;
}) as void;
