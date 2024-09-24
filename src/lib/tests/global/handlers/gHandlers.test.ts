//v1.0.0
import {
  updateSimpleProperty,
  cursorCheckTimer,
  opRadioHandler,
  cpbInpHandler,
  deactTextInput,
  doubleClickHandler,
  useCurrentDate,
  searchNextSiblings,
  searchPreviousSiblings,
  searchPreviousSiblingsById,
  changeToAstDigit,
  defineLabId,
  resetarFormulario,
  enableCPFBtn,
  syncAriaStates,
  toggleTips,
  toggleConformDlg,
  validateForm,
  submitForm,
  handleCondtReq,
  handleEventReq,
} from "../../../global/handlers/gHandlers";
import {
  inputNotFound,
  multipleElementsNotFound,
  elementNotFound,
  elementNotPopulated,
} from "../../../global/handlers/errorHandler";
import { handleSubmit } from "../../../../pages/api/ts/handlers";
import { formCases } from "@/lib/global/declarations/types";
import {
  BirthRelation,
  CSSColor,
  ErrorHandler,
  HTMLDialogElementMethod,
  HTMLInputElementMethod,
  ISODate,
  InputType,
  PseudoBool,
  PseudoNum,
  SearchFunction,
  TransitionLevel,
  WindowMethods,
} from "../../testVars";
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    multipleElementsNotFound: jest.Mock<any, any, any>;
  } => ({
    extLine: jest.fn().mockReturnValue("test-line"),
    inputNotFound: jest.fn(),
    multipleElementsNotFound: jest.fn(),
  })
);
describe("gHandlers Tests", (): void => {
  describe("updateSimpleProperty", (): void => {
    it("should return the checked state for a radio or checkbox input", () => {
      const input = document.createElement("input");
      input.type = "checkbox" as InputType;
      input.checked = true;
      expect(updateSimpleProperty(input)).toBe<PseudoBool>("true");
    });
    it("should return the parsed value of a number input", () => {
      const input = document.createElement("input");
      input.type = "number" as InputType;
      input.value = "123" as PseudoNum;
      expect(updateSimpleProperty(input)).toBe<number>(123);
    });
    it("should return the text value for a regular input", () => {
      const input = document.createElement("input");
      input.type = "text" as InputType;
      input.value = "test";
      expect(updateSimpleProperty(input)).toBe<string>("test");
    });
    it("should call inputNotFound if the element is not recognized", () => {
      const element = document.createElement("div");
      updateSimpleProperty(element);
      expect(inputNotFound).toHaveBeenCalledWith<Parameters<typeof inputNotFound>>(
        element,
        "el in updateSimpleProperty",
        "test-line"
      );
    });
  });
  describe("cursorCheckTimer", (): void => {
    it("should return the start offset after 3 seconds if selection exists", done => {
      document.getSelection = jest.fn().mockReturnValue({
        focusNode: true,
        getRangeAt: jest.fn().mockReturnValue({ startOffset: 5 }),
      } as any);
      setTimeout((): void => {
        expect(cursorCheckTimer()).toBe<number>(5);
        done();
      }, 3000);
    });
    it("should return 0 if no selection exists", () => {
      document.getSelection = jest.fn().mockReturnValue(null);
      expect(cursorCheckTimer()).toBe<number>(0);
    });
  });
  describe("opRadioHandler", (): void => {
    let keydownEvent: KeyboardEvent;
    let radioYes: HTMLInputElement;
    let radioNo: HTMLInputElement;
    beforeEach((): void => {
      keydownEvent = new KeyboardEvent("keydown", {
        altKey: true,
        key: "y",
      });
      radioYes = document.createElement("input");
      radioYes.type = "radio" as InputType;
      radioNo = document.createElement("input");
      radioNo.type = "radio" as InputType;
    });
    it("should check the 'Yes' radio when alt+y is pressed", () => {
      opRadioHandler(keydownEvent, [radioYes, radioNo]);
      expect(radioYes.checked).toBe<boolean>(true);
    });
    it("should call multipleElementsNotFound if validation fails", () => {
      const invalidRadio = document.createElement("div");
      opRadioHandler(keydownEvent, [invalidRadio, radioNo]);
      expect(multipleElementsNotFound).toHaveBeenCalledWith<Parameters<typeof multipleElementsNotFound>>(
        "test-line",
        "validando radioYes id UNDEFINED ID or radiosNo id UNDEFINED ID",
        invalidRadio,
        radioNo
      );
    });
  });
  describe("cpbInpHandler", (): void => {
    let radio: HTMLInputElement;
    let event: Event;
    beforeEach((): void => {
      radio = document.createElement("input");
      radio.type = "radio";
      event = new Event("click");
    });
    it("should fade in the divAdd element when the radio is checked", () => {
      const divAdd = document.createElement("div");
      divAdd.classList.add("divAdd");
      radio.id = "testYes";
      radio.checked = true;
      const parentDiv = document.createElement("div");
      parentDiv.appendChild(radio);
      parentDiv.appendChild(divAdd);
      document.body.appendChild(parentDiv);
      const setTimeoutSpy = jest
        //@ts-ignore
        .spyOn<Window, WindowMethods>(window, "setTimeout")
        //@ts-ignore
        .mockImplementation((callback: (...args: any[]) => void): any => {
          callback();
          return {} as any;
        });
      cpbInpHandler(event, radio);
      expect(setTimeoutSpy).toHaveBeenCalled();
      setTimeoutSpy.mockRestore();
    });
    it("should set inputs in divAdd to required when radio is checked", () => {
      const divAdd = document.createElement("div");
      divAdd.classList.add("divAdd");
      radio.id = "testYes";
      radio.checked = true;
      const parentDiv = document.createElement("div");
      parentDiv.appendChild(radio);
      parentDiv.appendChild(divAdd);
      const textInput = document.createElement("input");
      textInput.type = "text";
      divAdd.appendChild(textInput);
      document.body.appendChild(parentDiv);
      cpbInpHandler(event, radio);
      expect(textInput.required).toBe<boolean>(true);
    });
    it("should fade out the divAdd element when the radio is unchecked", () => {
      const divAdd = document.createElement("div");
      divAdd.classList.add("divAdd");
      radio.id = "testYes";
      radio.checked = false;
      const parentDiv = document.createElement("div");
      parentDiv.appendChild(radio);
      parentDiv.appendChild(divAdd);
      document.body.appendChild(parentDiv);
      const setTimeoutSpy = jest
        //@ts-ignore
        .spyOn<Window, WindowMethods>(window, "setTimeout")
        //@ts-ignore
        .mockImplementation((callback: (...args: any[]) => void): any => {
          callback();
          return {} as any;
        });
      cpbInpHandler(event, radio);
      expect(setTimeoutSpy).toHaveBeenCalled();
      setTimeoutSpy.mockRestore();
    });
    it("should call multipleElementsNotFound if the element structure is invalid", () => {
      const multipleElementsNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "multipleElementsNotFound"
      );
      cpbInpHandler(event, radio);
      expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
      multipleElementsNotFoundSpy.mockRestore();
    });
  });
  describe("deactTextInput", (): void => {
    let addressInps: HTMLInputElement[], nullRadios: HTMLInputElement[], blockableInput: HTMLInputElement;
    beforeEach((): void => {
      addressInps = [document.createElement("input"), document.createElement("input")];
      nullRadios = [document.createElement("input"), document.createElement("input")];
      blockableInput = document.createElement("input");
      const parentDiv1 = document.createElement("div"),
        parentDiv2 = document.createElement("div"),
        grandParentDiv1 = document.createElement("div"),
        grandParentDiv2 = document.createElement("div");
      parentDiv1.appendChild(blockableInput);
      grandParentDiv1.appendChild(parentDiv1);
      grandParentDiv2.appendChild(parentDiv2);
      blockableInput.classList.add("inpLocNum");
      parentDiv1.appendChild(nullRadios[0]);
      parentDiv2.appendChild(nullRadios[1]);
      grandParentDiv1.appendChild(addressInps[0]);
      grandParentDiv2.appendChild(addressInps[1]);
      document.body.appendChild(grandParentDiv1);
      document.body.appendChild(grandParentDiv2);
    });
    it("should disable the input when the corresponding radio is clicked", () => {
      nullRadios[0].checked = true;
      deactTextInput(addressInps, nullRadios);
      nullRadios[0].dispatchEvent(new Event("click"));
      expect(blockableInput.disabled).toBe<boolean>(true);
    });
    it("should re-enable the input when the radio is unchecked", () => {
      nullRadios[0].checked = false;
      deactTextInput(addressInps, nullRadios);
      nullRadios[0].dispatchEvent(new Event("click"));
      expect(blockableInput.disabled).toBe<boolean>(false);
    });
  });
  describe("doubleClickHandler", (): void => {
    let radio: HTMLInputElement;
    beforeEach((): void => {
      radio = document.createElement("input");
      radio.type = "radio";
    });
    it("should toggle the radio's checked property and call cpbInpHandler", () => {
      const cpbInpHandlerSpy = jest.spyOn<any, "cpbInpHandler">(
        require("../../../global/handlers/gHandlers"),
        "cpbInpHandler"
      );
      radio.checked = false;
      doubleClickHandler(radio);
      expect(radio.checked).toBe<boolean>(true);
      expect(cpbInpHandlerSpy).toHaveBeenCalledWith<[any, HTMLInputElement]>(expect.any(Event), radio);
      doubleClickHandler(radio);
      expect(radio.checked).toBe<boolean>(false);
      cpbInpHandlerSpy.mockRestore();
    });
    it("should call inputNotFound if the element is not a checkbox or radio input", () => {
      const inputNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      );
      doubleClickHandler(document.createElement("div"));
      expect(inputNotFoundSpy).toHaveBeenCalled();
      inputNotFoundSpy.mockRestore();
    });
  });
  describe("useCurrentDate", (): void => {
    let dateBtn: HTMLButtonElement;
    let event: Event;
    beforeEach((): void => {
      dateBtn = document.createElement("button");
      event = new Event("click");
    });
    it("should set the current date to the target input when the button is clicked", () => {
      const dateInput = document.createElement("input");
      dateInput.type = "date" as InputType;
      jest
        .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
        .mockReturnValue(dateInput);
      useCurrentDate(event, dateBtn);
      const currentDate = new Date();
      const expectedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
      expect(dateInput.value).toBe<ISODate>(expectedDate as ISODate);
    });
    it("should call inputNotFound if the target input is not found", () => {
      const inputNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      );
      jest
        .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
        .mockReturnValue(null);
      useCurrentDate(event, dateBtn);
      expect(inputNotFoundSpy).toHaveBeenCalled();
      inputNotFoundSpy.mockRestore();
    });
    it("should call elementNotFound if activation target does not match the button", () => {
      const elementNotFoundSpy = jest.spyOn<any, ErrorHandler>(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      );
      dateBtn.dispatchEvent(new Event("click"));
      useCurrentDate(new Event("click"), dateBtn);
      expect(elementNotFoundSpy).toHaveBeenCalled();
      elementNotFoundSpy.mockRestore();
    });
  });
  describe("Sibling Search Functions", (): void => {
    let parentElement: HTMLElement, currentElement: HTMLElement;
    beforeEach((): void => {
      parentElement = document.createElement("div");
      currentElement = document.createElement("div");
      currentElement.classList.add("currentElement");
      const sibling1 = document.createElement("div"),
        sibling2 = document.createElement("div");
      sibling2.classList.add("searchedClass");
      parentElement.append(currentElement, sibling1, sibling2);
    });
    it("should find the next sibling with the specified class", () => {
      expect(searchNextSiblings(currentElement, "searchedClass").classList.contains("searchedClass")).toBe<boolean>(
        true
      );
    });
    it("should find the previous sibling with the specified class", () => {
      expect(
        searchPreviousSiblings(parentElement.lastElementChild as any, "searchedClass").classList.contains(
          "searchedClass"
        )
      ).toBe<boolean>(true);
    });
  });
  describe("searchPreviousSiblingsById", (): void => {
    let parentElement: HTMLElement, currentElement: HTMLElement, targetSibling: HTMLElement;
    beforeEach((): void => {
      parentElement = document.createElement("div");
      targetSibling = document.createElement("div");
      targetSibling.id = "targetSibling";
      currentElement = document.createElement("div");
      parentElement.appendChild(targetSibling);
      parentElement.appendChild(currentElement);
    });
    it("should return the sibling element with the specified ID", () => {
      expect(searchPreviousSiblingsById(currentElement, "targetSibling")).toBe<HTMLElement>(targetSibling);
    });
    it("should stop and return when the loop accumulator exceeds 999", () => {
      let tempElement: HTMLElement;
      for (let i = 0; i < 1000; i++) {
        tempElement = document.createElement("div");
        document.createElement("div").appendChild(tempElement);
        expect(searchPreviousSiblingsById(tempElement, "nonexistentId")).toBe<HTMLElement>(tempElement);
      }
    });
    it("should return the current element if no matching sibling is found", () => {
      expect(searchPreviousSiblingsById(currentElement, "nonexistentId")).toBe<HTMLElement>(currentElement);
    });
  });
  describe("changeToAstDigit", (): void => {
    let toFileInpBtn: HTMLButtonElement;
    beforeEach((): void => {
      toFileInpBtn = document.createElement("button");
      toFileInpBtn.textContent = "Usar Assinatura Digital";
    });
    it("should replace the current element with a file input and add listeners", () => {
      const inpAst = document.createElement("input");
      inpAst.type = "text" as InputType;
      inpAst.classList.add("inpAst");
      toFileInpBtn.parentElement?.insertBefore(inpAst, toFileInpBtn);
      changeToAstDigit(toFileInpBtn);
      const fileInput = toFileInpBtn.previousElementSibling;
      expect(fileInput).toBeDefined();
      expect(fileInput?.tagName).toBe<string>("INPUT");
      expect(fileInput?.getAttribute("type")).toBe<InputType>("file");
    });
    it("should call elementNotFound if the required element is not found", () => {
      const elementNotFoundSpy = jest.spyOn<any, ErrorHandler>(require("./errorHandler"), "elementNotFound");
      toFileInpBtn.classList.add("tratBtn");
      changeToAstDigit(toFileInpBtn);
      expect(elementNotFoundSpy).toHaveBeenCalled();
      elementNotFoundSpy.mockRestore();
    });
  });
  describe("defineLabId", (): void => {
    let labelElement: HTMLLabelElement, buttonElement: HTMLButtonElement, inputElement: HTMLInputElement;
    beforeEach((): void => {
      labelElement = document.createElement("label");
      buttonElement = document.createElement("button");
      inputElement = document.createElement("input");
    });
    it('should set the id of the label element to "spanAstPct" when valid arguments are provided', () => {
      defineLabId(labelElement, buttonElement, inputElement);
      expect(labelElement.id).toBe<string>("spanAstPct");
    });
    it("should call multipleElementsNotFound if the arguments are invalid", () => {
      defineLabId(null, buttonElement, inputElement);
      expect(multipleElementsNotFound).toHaveBeenCalled();
    });
    it("should call elementNotFound if the button or input element is not valid", () => {
      defineLabId(labelElement, document.createElement("div") as any, inputElement);
      expect(elementNotFound).toHaveBeenCalled();
    });
  });
  describe("resetarFormulario", (): void => {
    let clickEvent: MouseEvent, resetFormBtn: HTMLButtonElement, fileBtns: HTMLButtonElement[];
    beforeEach((): void => {
      resetFormBtn = document.createElement("button");
      clickEvent = new MouseEvent("click");
      Object.defineProperty(clickEvent, "target", { value: resetFormBtn });
      fileBtns = [document.createElement("button"), document.createElement("button")];
      document.body.innerHTML = `
				<form id="formAnamGId"></form>
				<cite contenteditable="true">Old Name</cite>
				<input id="genBirthRelId">
				<input id="genTransId">
			`;
    });
    afterEach((): void => {
      jest.clearAllMocks();
    });
    it("should reset the form and set default values for editable elements", () => {
      resetarFormulario(clickEvent, fileBtns);
      expect(document.getElementById("formAnamGId") as HTMLFormElement).toBeTruthy();
      expect((document.querySelector('cite[contenteditable="true"]') as HTMLElement).textContent).toBe<string>(
        "--Nome"
      );
      expect((document.getElementById("genBirthRelId") as HTMLInputElement).value).toBe<BirthRelation>("cis");
      expect((document.getElementById("genTransId") as HTMLInputElement).value).toBe<TransitionLevel>("avancado");
    });
    it('should call changeToAstDigit for buttons with "Retornar" in textContent', () => {
      fileBtns[0].textContent = "Retornar à Assinatura Escrita";
      resetarFormulario(clickEvent, fileBtns);
      expect(changeToAstDigit).toHaveBeenCalledWith<Parameters<typeof changeToAstDigit>>(fileBtns[0]);
    });
    it("should call elementNotFound when form is not found", () => {
      document.getElementById("formAnamGId")?.remove();
      resetarFormulario(clickEvent, fileBtns);
      expect(elementNotFound).toHaveBeenCalled();
    });
    it("should call multipleElementsNotFound when button elements are invalid", () => {
      resetarFormulario(clickEvent, []);
      expect(multipleElementsNotFound).toHaveBeenCalled();
    });
  });
  describe("enableCPFBtn", (): void => {
    let cpfBtn: HTMLButtonElement;
    beforeEach((): void => {
      cpfBtn = document.createElement("button");
      document.body.appendChild(cpfBtn);
    });
    afterEach((): void => {
      jest.clearAllMocks();
    });
    it("should disable the button if CPF length is less than 11", () => {
      expect(cpfBtn.disabled).toBe<boolean>(true);
      expect(cpfBtn.style.backgroundColor).toBe<CSSColor>("gray");
      expect(cpfBtn.style.borderColor).toBe<CSSColor>("gray");
      expect(enableCPFBtn(cpfBtn, "123")).toBe<boolean>(true);
    });
    it("should enable the button if CPF length is 11 or more", () => {
      expect(cpfBtn.disabled).toBe<boolean>(false);
      expect(cpfBtn.style.backgroundColor).toBe<CSSColor>("#0a58ca");
      expect(cpfBtn.style.borderColor).toBe<CSSColor>("#0a58ca");
      expect(enableCPFBtn(cpfBtn, "12345678901")).toBe<boolean>(false);
    });
    it("should call multipleElementsNotFound if invalid arguments are provided", () => {
      enableCPFBtn(null, "123");
      expect(multipleElementsNotFound).toHaveBeenCalled();
    });
  });
  describe("syncAriaStates", (): void => {
    let elements: HTMLElement[];
    beforeEach((): void => {
      elements = [document.createElement("input"), document.createElement("button"), document.createElement("select")];
    });
    afterEach((): void => {
      jest.clearAllMocks();
    });
    it("should sync aria attributes for elements", () => {
      syncAriaStates(elements);
      elements.forEach(el => {
        if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement)
          expect(el.ariaRequired).toBe<PseudoBool>("false");
      });
    });
    it("should not modify elements inside the head", () => {
      const metaElement = document.createElement("meta");
      document.head.appendChild(metaElement);
      syncAriaStates([metaElement]);
      expect(metaElement.ariaHidden).toBeUndefined();
    });
    it("should call elementNotPopulated if the elements array is empty", () => {
      syncAriaStates([]);
      expect(elementNotPopulated).toHaveBeenCalled();
    });
  });
  describe("toggleTips", (): void => {
    let tipsDialog: HTMLDialogElement;
    let tipsBtn: HTMLButtonElement;
    beforeEach((): void => {
      tipsDialog = document.createElement("dialog");
      tipsDialog.id = "tipsDlg";
      document.body.appendChild(tipsDialog);
      tipsBtn = document.createElement("button");
      tipsBtn.id = "tipsBtn";
      document.body.appendChild(tipsBtn);
    });
    afterEach((): void => {
      jest.clearAllMocks();
    });
    it("should open the dialog when the button is clicked", () => {
      toggleTips();
      tipsBtn.click();
      expect(tipsDialog.open).toBe<boolean>(true);
    });
    it("should close the dialog when the button is clicked again", () => {
      toggleTips();
      tipsBtn.click();
      tipsBtn.click();
      expect(tipsDialog.open).toBe<boolean>(false);
    });
    it("should call elementNotFound if the tips dialog is not found", () => {
      document.getElementById("tipsDlg")?.remove();
      toggleTips();
      expect(elementNotFound).toHaveBeenCalled();
    });
  });
  describe("toggleConformDlg", (): void => {
    let conformDlg: HTMLDialogElement;
    let btnConform: HTMLButtonElement;
    beforeEach((): void => {
      conformDlg = document.createElement("dialog");
      conformDlg.id = "conformDlg";
      document.body.appendChild(conformDlg);
      btnConform = document.createElement("button");
      btnConform.id = "btnConform";
      document.body.appendChild(btnConform);
      jest.spyOn<HTMLDialogElement, HTMLDialogElementMethod>(conformDlg, "showModal");
      jest.spyOn<HTMLDialogElement, HTMLDialogElementMethod>(conformDlg, "close");
    });
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks();
    });
    it("should open the dialog when the button is clicked", () => {
      toggleConformDlg();
      btnConform.click();
      expect(conformDlg.showModal).toHaveBeenCalled();
    });
    it("should close the dialog when clicked outside", () => {
      toggleConformDlg();
      conformDlg.dispatchEvent(new MouseEvent("click"));
      expect(conformDlg.close).toHaveBeenCalled();
    });
    it("should close the dialog when Escape key is pressed", () => {
      toggleConformDlg();
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escapeEvent);
      expect(conformDlg.close).toHaveBeenCalled();
    });
    it("should call multipleElementsNotFound if conformDlg or btnConform is not found", () => {
      document.getElementById("conformDlg")?.remove();
      toggleConformDlg();
      expect(multipleElementsNotFound).toHaveBeenCalled();
    });
  });
  describe("validateForm", (): void => {
    let form: HTMLFormElement;
    let inputText: HTMLInputElement;
    let inputNumber: HTMLInputElement;
    let inputDate: HTMLInputElement;
    let textarea: HTMLTextAreaElement;
    let select: HTMLSelectElement;
    let canvas: HTMLCanvasElement;
    let submitButton: HTMLButtonElement;
    beforeEach((): void => {
      form = document.createElement("form");
      inputText = document.createElement("input");
      inputText.type = "text";
      inputText.name = "textInput";
      inputText.value = "valid text";
      inputNumber = document.createElement("input");
      inputNumber.type = "number";
      inputNumber.name = "numberInput";
      inputNumber.value = "10";
      inputDate = document.createElement("input");
      inputDate.type = "date";
      inputDate.name = "dateInput";
      inputDate.value = new Date().toISOString().split("T")[0];
      textarea = document.createElement("textarea");
      textarea.name = "textareaInput";
      textarea.value = "valid text";
      select = document.createElement("select");
      select.name = "selectInput";
      const option = document.createElement("option");
      option.value = "valid";
      select.appendChild(option);
      select.value = "valid";
      canvas = document.createElement("canvas");
      submitButton = document.createElement("button");
      submitButton.type = "submit";
      form.append(inputText, inputNumber, inputDate, textarea, select, canvas, submitButton);
      document.body.appendChild(form);
    });
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks();
    });
    it("should validate a form with valid entries", async () => {
      const [isValid, invalidEntries, validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(invalidEntries).toEqual<never[]>([]);
      expect(validEntries).toEqual<string[][]>([
        ["textInput", "valid text"],
        ["numberInput", "10"],
        ["dateInput", inputDate.value],
        ["textareaInput", "valid text"],
        ["selectInput", "valid"],
      ]);
    });
    it("should mark invalid entries and return invalid entries list", async () => {
      inputText.value = "";
      inputNumber.value = "abc";
      inputDate.value = "2020-01-01";
      select.value = "";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("textInput");
      expect(invalidEntries).toContain<string>("numberInput");
      expect(invalidEntries).toContain<string>("selectInput");
    });
    it("should validate when submit button is clicked", async () => {
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      submitButton.click();
      const [isValid] = await validateForm(submitEvent as any, document, true);
      expect(isValid).toBe<boolean>(true);
    });
    it("should invalidate form if required fields are empty", async () => {
      inputText.required = true;
      inputText.value = "";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("textInput");
    });
    it("should reset placeholder for invalid inputs", async () => {
      inputText.required = true;
      inputText.value = "";
      const [isValid] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(inputText.placeholder).toBe<string>("Entrada inválida");
    });
    it("should handle file inputs correctly", async () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      form.appendChild(fileInput);
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      const [isValid, , validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(validEntries).toContainEqual<(string | File)[]>(["", file]);
    });
    it("should validate radio button groups correctly", async () => {
      const radioGroupDiv = document.createElement("div");
      const radio1 = document.createElement("input");
      radio1.type = "radio";
      radio1.name = "radioGroup";
      radio1.value = "option1";
      const radio2 = document.createElement("input");
      radio2.type = "radio";
      radio2.name = "radioGroup";
      radio2.value = "option2";
      radioGroupDiv.append(radio1, radio2);
      form.appendChild(radioGroupDiv);
      radio1.checked = true;
      const [isValid, , validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(validEntries).toContainEqual<string[]>(["radioGroup", "true"]);
    });
    it("should validate checkbox groups correctly", async () => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "checkboxGroup";
      checkbox.checked = true;
      form.appendChild(checkbox);
      const [isValid, , validEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(true);
      expect(validEntries).toContainEqual<string[]>(["checkboxGroup", "true"]);
    });
    it("should handle minCurrDate validation for date input", async () => {
      inputDate.classList.add("minCurrDate");
      inputDate.value = "1990-01-01";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("dateInput");
    });
    it("should handle maxCurrDate validation for date input", async () => {
      inputDate.classList.add("maxCurrDate");
      inputDate.value = "2050-01-01";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("dateInput");
    });
    it("should handle custom patterns for input", async () => {
      inputText.classList.add("patternText");
      inputText.dataset.pattern = "^[A-Za-z]+$";
      inputText.value = "123";
      const [isValid, invalidEntries] = await validateForm(form, document, false);
      expect(isValid).toBe<boolean>(false);
      expect(invalidEntries).toContain<string>("textInput");
    });
  });
  describe("submitForm", (): void => {
    let form: HTMLFormElement;
    let ep = "ag";
    beforeEach((): void => {
      form = document.createElement("form");
      const input = document.createElement("input");
      input.type = "text";
      input.name = "name";
      form.appendChild(input);
      document.body.appendChild(form);
    });
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks();
    });
    it("should call handleSubmit with FormData when valid form is submitted", async () => {
      await submitForm(form, ep as formCases);
      expect(handleSubmit).toHaveBeenCalledWith<Parameters<typeof handleSubmit>>(
        ep as formCases,
        expect.any(FormData),
        true
      );
    });
    it("should throw an error if form is not an HTMLFormElement", async () => {
      const invalidForm = null;
      await submitForm(invalidForm as any, ep as formCases);
      expect(elementNotFound).toHaveBeenCalled();
    });
    it("should throw an error if ep is not a string", async () => {
      await expect(submitForm(form, 123 as any)).rejects.toThrow("Incorret type for ep argument in submitForm");
    });
  });
  describe("handleCondtReq", (): void => {
    let input: HTMLInputElement;
    const options = {
      pattern: /^[A-Za-z]+$/,
      min: 5,
      max: 10,
      minNum: 1,
      maxNum: 100,
    };
    beforeEach((): void => {
      input = document.createElement("input");
      input.type = "text";
      document.body.appendChild(input);
    });
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks();
    });
    it("should set the correct attributes when options are provided", () => {
      handleCondtReq(input, options);
      expect(input.dataset.reqlength).toBe<PseudoNum>("5");
      expect(input.minLength).toBe<number>(5);
      expect(input.dataset.maxlength).toBe<PseudoNum>("10");
      expect(input.maxLength).toBe<number>(10);
      expect(input.dataset.minnum).toBe<PseudoNum>("1");
      expect(input.min).toBe<PseudoNum>("1");
      expect(input.dataset.maxnum).toBe<PseudoNum>("100");
      expect(input.max).toBe<PseudoNum>("100");
    });

    it("should remove attributes if the input value is empty", () => {
      input.value = "";
      handleCondtReq(input, options);
      expect(input.dataset.reqlength).toBeUndefined();
      expect(input.dataset.maxlength).toBeUndefined();
      expect(input.min).toBe<string>("");
      expect(input.max).toBe<string>("");
    });
    it("should call inputNotFound when input is invalid", () => {
      const invalidInput = document.createElement("div");
      handleCondtReq(invalidInput as any, options);
      expect(inputNotFound).toHaveBeenCalled();
    });
  });
  describe("handleEventReq", (): void => {
    let input: HTMLInputElement;
    let textarea: HTMLTextAreaElement;
    beforeEach((): void => {
      input = document.createElement("input");
      textarea = document.createElement("textarea");
      document.body.appendChild(input);
      document.body.appendChild(textarea);
    });
    afterEach((): void => {
      document.body.innerHTML = "";
      jest.clearAllMocks();
    });
    it("should throw error if input is not a valid element", () => {
      const invalidElement = document.createElement("div");
      expect((): void => handleEventReq(invalidElement as any)).toThrow();
    });
    it("should skip validation if event target is not a valid input or textarea", () => {
      const invalidEvent = new Event("change");
      expect((): void => handleEventReq(invalidEvent)).not.toThrow();
    });
    it('should set alert color if input is invalid and type is "text"', () => {
      input.type = "text" as InputType;
      input.value = "";
      jest.spyOn<HTMLInputElement, HTMLInputElementMethod>(input, "checkValidity").mockReturnValue(false);
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    });
    it("should reset color after 2000ms", () => {
      jest.useFakeTimers();
      input.type = "text" as InputType;
      input.value = "";
      jest.spyOn<HTMLInputElement, HTMLInputElementMethod>(input, "checkValidity").mockReturnValue(false);
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
      jest.advanceTimersByTime(2000);
      expect(input.style.color).toBe<CSSColor>("rgb(33, 37, 41)");
      jest.useRealTimers();
    });
    it('should validate input type for "number" and "date"', () => {
      input.type = "number" as InputType;
      input.step = "";
      handleEventReq(input);
      expect(input.step).toBe<string>("any");
    });
    it("should validate date with minCurrDate class", () => {
      input.type = "date" as InputType;
      input.classList.add("minCurrDate");
      input.value = new Date().toISOString().split("T")[0];
      handleEventReq(input);
      expect(input.style.color).toBe<string>("");
    });
    it("should validate date with maxCurrDate class", () => {
      input.type = "date" as InputType;
      input.classList.add("maxCurrDate");
      input.value = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    });
    it("should check validity for patternText", () => {
      input.type = "text" as InputType;
      input.classList.add("patternText");
      input.dataset.pattern = "^[A-Za-z]+$";
      input.value = "123";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    });
    it("should check validity for minText", () => {
      input.type = "text" as InputType;
      input.classList.add("minText");
      input.dataset.reqlength = "5";
      input.value = "123";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    });
    it("should check validity for maxText", () => {
      input.type = "text" as InputType;
      input.classList.add("maxText");
      input.dataset.maxlength = "5";
      input.value = "123456";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    });
    it("should check validity for minNum and maxNum", () => {
      input.type = "number" as InputType;
      input.classList.add("minNum", "maxNum");
      input.dataset.minnum = "1";
      input.dataset.maxnum = "100";
      input.value = "150";
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("#e52626");
    });
    it("should skip check for unsupported input types", () => {
      input.type = "radio" as InputType;
      handleEventReq(input);
      expect(input.style.color).toBe<CSSColor>("");
    });
  });
});
