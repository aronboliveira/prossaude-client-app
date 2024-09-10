//v1.0.0
import {
  addListenerTelInputs,
  addListenersEmailInputs,
  addListenerCPFCont,
  addListenersCepElements,
} from "../../../locals/aGPage/aGController";
import {
  formatCEP,
  formatCPF,
  formatTel,
  addEmailExtension,
} from "../../../global/gModel";
import {
  inputNotFound,
  multipleElementsNotFound,
  elementNotPopulated,
} from "../../../global/handlers/errorHandler";
import * as AGHandlers from "../../../locals/aGPage/aGHandlers";
jest.mock("../../global/gModel", () => ({
  formatCEP: jest.fn(),
  formatCPF: jest.fn(),
  formatTel: jest.fn(),
  addEmailExtension: jest.fn(),
}));
jest.mock("../../global/handlers/errorHandler", () => ({
  extLine: jest.fn(),
  inputNotFound: jest.fn(),
  multipleElementsNotFound: jest.fn(),
  elementNotPopulated: jest.fn(),
}));
jest.mock("./aGHandlers", () => ({
  enableCEPBtn: jest.fn(),
  searchCEP: jest.fn().mockResolvedValue("success"),
  searchCEPXML: jest.fn(),
}));
describe("addListenerTelInputs", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("should add event listeners to all tel inputs and format them on input", () => {
    const telInput = document.createElement("input");
    telInput.type = "text";
    telInput.id = "telInput1";
    document.body.appendChild(telInput);
    const telInputs = addListenerTelInputs();
    expect(telInputs.length).toBe(1);
    expect(telInputs[0]).toBe(telInput);
    telInput.dispatchEvent(new Event("input"));
    expect(formatTel).toHaveBeenCalledWith(telInput);
  });
  it("should call elementNotPopulated if no tel inputs are found", () => {
    addListenerTelInputs();
    expect(elementNotPopulated).toHaveBeenCalled();
  });
  it("should call inputNotFound if target input is not found", () => {
    const telInput = document.createElement("textarea");
    telInput.id = "telInput1";
    document.body.appendChild(telInput);
    addListenerTelInputs();
    telInput.dispatchEvent(new Event("input"));
    expect(inputNotFound).toHaveBeenCalled();
  });
});
describe("addListenersEmailInputs", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("should add event listeners to email inputs and format them on click and input", () => {
    const emailInput = document.createElement("input");
    emailInput.id = "emailInput1";
    emailInput.type = "text";
    document.body.appendChild(emailInput);
    const emailInputs = addListenersEmailInputs();
    expect(emailInputs.length).toBe(1);
    expect(emailInputs[0]).toBe(emailInput);
    emailInput.click();
    expect(addEmailExtension).toHaveBeenCalledWith(emailInput);
    emailInput.dispatchEvent(new Event("input"));
    expect(addEmailExtension).toHaveBeenCalledWith(emailInput);
  });
  it("should call elementNotPopulated if no email inputs are found", () => {
    addListenersEmailInputs();
    expect(elementNotPopulated).toHaveBeenCalled();
  });
  it("should call inputNotFound if the target is not an input", () => {
    const invalidInput = document.createElement("textarea");
    invalidInput.id = "emailInput1";
    document.body.appendChild(invalidInput);
    addListenersEmailInputs();
    invalidInput.click();
    expect(inputNotFound).toHaveBeenCalled();
  });
});
describe("addListenerCPFCont", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("should add input event listener to CPF input and format CPF", () => {
    const inpCPF = document.createElement("input");
    inpCPF.id = "inpCPF";
    document.body.appendChild(inpCPF);
    expect(addListenerCPFCont()).toBe(inpCPF);
    inpCPF.dispatchEvent(new Event("input"));
    expect(formatCPF).toHaveBeenCalledWith(inpCPF);
  });
  it("should call inputNotFound if the CPF input is not found", () => {
    addListenerCPFCont();
    expect(inputNotFound).toHaveBeenCalled();
  });
});
describe("addListenersCepElements", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("should add event listeners to the CEP input and button, and handle input correctly", async () => {
    const cepElement = document.createElement("input");
    cepElement.id = "cepId";
    document.body.appendChild(cepElement);
    const cepElementBtn = document.createElement("button");
    cepElementBtn.id = "autoCompCepBtn";
    document.body.appendChild(cepElementBtn);
    const [returnedCepElement, returnedCepElementBtn] =
      addListenersCepElements();
    expect(returnedCepElement).toBe(cepElement);
    expect(returnedCepElementBtn).toBe(cepElementBtn);
    cepElement.dispatchEvent(new Event("input"));
    expect(formatCEP).toHaveBeenCalledWith(cepElement);
    cepElementBtn.dispatchEvent(new Event("click"));
    expect(AGHandlers.enableCEPBtn).toHaveBeenCalledWith(
      cepElementBtn,
      cepElement.value.length
    );
    expect(AGHandlers.searchCEP).toHaveBeenCalled();
  });

  it("should call multipleElementsNotFound if the CEP input or button is not found", () => {
    addListenersCepElements();
    expect(multipleElementsNotFound).toHaveBeenCalled();
  });
});
