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
    formatCEP: jest.fn(),
    formatCPF: jest.fn(),
    formatTel: jest.fn(),
    addEmailExtension: jest.fn(),
  })
);
jest.mock(
  "../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
    elementNotPopulated: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn(),
    inputNotFound: jest.fn(),
    multipleElementsNotFound: jest.fn(),
    elementNotPopulated: jest.fn(),
  })
);
jest.mock(
  "./aGHandlers",
  (): {
    enableCEPBtn: jest.Mock<any, any, any>;
    searchCEP: jest.Mock<any, any, any>;
    searchCEPXML: jest.Mock<any, any, any>;
  } => ({
    enableCEPBtn: jest.fn(),
    searchCEP: jest.fn().mockResolvedValue("success"),
    searchCEPXML: jest.fn(),
  })
);
describe("addListenerTelInputs", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  it("should add event listeners to all tel inputs and format them on input", (): void => {
    const telInput = document.createElement("input");
    telInput.type = "text";
    telInput.id = "telInput1";
    document.body.appendChild(telInput);
    const telInputs = addListenerTelInputs();
    expect(telInputs.length).toBe<number>(1);
    expect(telInputs[0]).toBe<HTMLInputElement>(telInput);
    telInput.dispatchEvent(new Event("input"));
    expect(formatTel).toHaveBeenCalledWith<Parameters<typeof formatTel>>(telInput);
  });
  it("should call elementNotPopulated if no tel inputs are found", (): void => {
    addListenerTelInputs();
    expect(elementNotPopulated).toHaveBeenCalled();
  });
  it("should call inputNotFound if target input is not found", (): void => {
    const telInput = document.createElement("textarea");
    telInput.id = "telInput1";
    document.body.appendChild(telInput);
    addListenerTelInputs();
    telInput.dispatchEvent(new Event("input"));
    expect(inputNotFound).toHaveBeenCalled();
  });
});
describe("addListenersEmailInputs", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  it("should add event listeners to email inputs and format them on click and input", (): void => {
    const emailInput = document.createElement("input");
    emailInput.id = "emailInput1";
    emailInput.type = "text";
    document.body.appendChild(emailInput);
    const emailInputs = addListenersEmailInputs();
    expect(emailInputs.length).toBe<number>(1);
    expect(emailInputs[0]).toBe<HTMLInputElement>(emailInput);
    emailInput.click();
    expect(addEmailExtension).toHaveBeenCalledWith<Parameters<typeof addEmailExtension>>(emailInput);
    emailInput.dispatchEvent(new Event("input"));
    expect(addEmailExtension).toHaveBeenCalledWith<Parameters<typeof addEmailExtension>>(emailInput);
  });
  it("should call elementNotPopulated if no email inputs are found", (): void => {
    addListenersEmailInputs();
    expect(elementNotPopulated).toHaveBeenCalled();
  });
  it("should call inputNotFound if the target is not an input", (): void => {
    const invalidInput = document.createElement("textarea");
    invalidInput.id = "emailInput1";
    document.body.appendChild(invalidInput);
    addListenersEmailInputs();
    invalidInput.click();
    expect(inputNotFound).toHaveBeenCalled();
  });
});
describe("addListenerCPFCont", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  it("should add input event listener to CPF input and format CPF", (): void => {
    const inpCPF = document.createElement("input");
    inpCPF.id = "inpCPF";
    document.body.appendChild(inpCPF);
    expect(addListenerCPFCont()).toBe<HTMLInputElement>(inpCPF);
    inpCPF.dispatchEvent(new Event("input"));
    expect(formatCPF).toHaveBeenCalledWith<Parameters<typeof formatCPF>>(inpCPF);
  });
  it("should call inputNotFound if the CPF input is not found", (): void => {
    addListenerCPFCont();
    expect(inputNotFound).toHaveBeenCalled();
  });
});
describe("addListenersCepElements", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  it("should add event listeners to the CEP input and button, and handle input correctly", async (): Promise<void> => {
    const cepElement = document.createElement("input");
    cepElement.id = "cepId";
    document.body.appendChild(cepElement);
    const cepElementBtn = document.createElement("button");
    cepElementBtn.id = "autoCompCepBtn";
    document.body.appendChild(cepElementBtn);
    const [returnedCepElement, returnedCepElementBtn] = addListenersCepElements();
    expect(returnedCepElement).toBe<HTMLInputElement>(cepElement);
    expect(returnedCepElementBtn).toBe<HTMLButtonElement>(cepElementBtn);
    cepElement.dispatchEvent(new Event("input"));
    expect(formatCEP).toHaveBeenCalledWith<Parameters<typeof formatCEP>>(cepElement);
    cepElementBtn.dispatchEvent(new Event("click"));
    expect(AGHandlers.enableCEPBtn).toHaveBeenCalledWith<Parameters<typeof AGHandlers.enableCEPBtn>>(
      cepElementBtn,
      cepElement.value.length
    );
    expect(AGHandlers.searchCEP).toHaveBeenCalled();
  });

  it("should call multipleElementsNotFound if the CEP input or button is not found", (): void => {
    addListenersCepElements();
    expect(multipleElementsNotFound).toHaveBeenCalled();
  });
});
